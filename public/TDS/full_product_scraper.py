#!/usr/bin/env python3
"""
Full Product Scraper for Forza Products
Scrapes all products from the chemistry data file and combines with chemistry information
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import csv
import os
from urllib.parse import urljoin

# Configuration
BASE_URL = "https://forzabuilt.com/product/"
OUTPUT_FILE = "forza_complete_product_data.json"
CHEMISTRY_DATA_FILE = "comprehensive_chemistry_table - Revised.csv"
DELAY = 1  # Delay between requests
MAX_RETRIES = 3  # Maximum number of retries for failed requests

def load_chemistry_data():
    """Load chemistry data from CSV file."""
    chemistry_data = {}
    
    with open(CHEMISTRY_DATA_FILE, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            product_code = row["Product Code"]
            chemistry_data[product_code] = {
                "product_id": row["Product ID"],
                "product_name": row["Product Name"],
                "product_code": product_code,
                "category": row["Category"],
                "chemistry_type": row["Chemistry Type"]
            }
    
    print(f"Loaded chemistry data for {len(chemistry_data)} products")
    return chemistry_data

def generate_product_urls(chemistry_data):
    """Generate product URLs from chemistry data."""
    product_urls = []
    
    for product_code in chemistry_data.keys():
        # Clean up product code to match URL format (remove spaces, parentheses, etc)
        clean_code = product_code.strip().lower()
        clean_code = clean_code.replace(" ", "-")
        clean_code = clean_code.replace("(", "").replace(")", "")
        
        # Handle special cases
        if "(" in product_code or ")" in product_code:
            # Try both with and without parentheses content
            base_code = product_code.split("(")[0].strip().lower()
            product_urls.append({
                "code": product_code,
                "url": urljoin(BASE_URL, base_code)
            })
        
        product_urls.append({
            "code": product_code,
            "url": urljoin(BASE_URL, clean_code)
        })
    
    # Remove duplicates while preserving order
    unique_urls = []
    seen = set()
    for item in product_urls:
        if item["code"] not in seen:
            unique_urls.append(item)
            seen.add(item["code"])
    
    return unique_urls

def scrape_product(product, retry_count=0):
    """Scrape a single product page."""
    print(f"Scraping {product['code']} from {product['url']}")
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(product['url'], headers=headers, timeout=10)
        
        if response.status_code != 200:
            print(f"Failed to fetch {product['url']}: Status code {response.status_code}")
            if retry_count < MAX_RETRIES:
                print(f"Retrying ({retry_count + 1}/{MAX_RETRIES})...")
                time.sleep(2)  # Wait a bit before retrying
                return scrape_product(product, retry_count + 1)
            return None
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract product title
        title = soup.find('h1', class_='product_title')
        if not title:
            title = soup.find('h1')  # Try any h1 if specific class not found
        
        if not title:
            print(f"No content found for {product['code']}")
            return None
        
        # Create product data
        product_data = {
            "product_code": product['code'],
            "url": product['url'],
            "title": title.text.strip() if title else product['code'],
        }
        
        # Look for the product description tab content
        tab_content = soup.find('div', id='tab-description')
        if tab_content:
            # Extract sections directly
            sections = {
                "description": "Description",
                "applications": "Applications",
                "benefits": "Benefits",
                "how_to_use": "How to Use",
                "sizing": "Sizing"
            }
            
            for section_key, section_name in sections.items():
                # First try to find by premium-title-text
                title_elements = tab_content.find_all('span', class_='premium-title-text')
                section_content = None
                
                for title_elem in title_elements:
                    if section_name.lower() in title_elem.text.strip().lower():
                        # Find the parent section
                        section = title_elem.find_parent('section')
                        if section:
                            # Find the text editor div
                            text_editor = section.find('div', class_='elementor-widget-text-editor')
                            if text_editor:
                                # Extract content
                                if text_editor.find('ul'):
                                    # It's a list
                                    items = []
                                    for li in text_editor.find_all('li'):
                                        items.append(f"• {li.text.strip()}")
                                    section_content = items
                                else:
                                    # It's paragraphs or plain text
                                    section_content = [text_editor.text.strip()]
                                break
                
                if section_content:
                    product_data[section_key] = section_content
        else:
            # Alternative approach: look for section headers directly
            for section_name in ["Description", "Applications", "Benefits", "How to Use", "Sizing"]:
                headers = soup.find_all(['h2', 'h3', 'h4', 'h5', 'h6'])
                for header in headers:
                    if section_name.lower() in header.text.strip().lower():
                        # Get the next element
                        content = []
                        next_elem = header.find_next(['p', 'ul', 'ol', 'div'])
                        if next_elem:
                            if next_elem.name == 'ul' or next_elem.name == 'ol':
                                for li in next_elem.find_all('li'):
                                    content.append(f"• {li.text.strip()}")
                            else:
                                content.append(next_elem.text.strip())
                            
                            section_key = section_name.lower().replace(" ", "_")
                            product_data[section_key] = content
                        break
        
        # Clean up data - convert lists to strings for better readability
        for key, value in product_data.items():
            if isinstance(value, list):
                product_data[key] = "\n".join(value) if value else None
        
        return product_data
    
    except requests.exceptions.RequestException as e:
        print(f"Request error for {product['url']}: {str(e)}")
        if retry_count < MAX_RETRIES:
            print(f"Retrying ({retry_count + 1}/{MAX_RETRIES})...")
            time.sleep(2)  # Wait a bit before retrying
            return scrape_product(product, retry_count + 1)
        return None
    except Exception as e:
        print(f"Error scraping {product['url']}: {str(e)}")
        return None

def scrape_all_products(chemistry_data):
    """Scrape all product pages."""
    product_urls = generate_product_urls(chemistry_data)
    all_products = []
    
    print(f"Attempting to scrape {len(product_urls)} products...")
    
    successful = 0
    failed = 0
    
    for i, product in enumerate(product_urls):
        print(f"Processing {i+1}/{len(product_urls)}: {product['code']}")
        
        # Scrape product page
        product_data = scrape_product(product)
        
        # Create a base product data even if scraping failed
        if not product_data:
            product_data = {
                "product_code": product['code'],
                "url": product['url'],
                "title": None,
                "scrape_status": "failed"
            }
            failed += 1
        else:
            product_data["scrape_status"] = "success"
            successful += 1
            
            # Print a sample of the data
            print(f"Successfully scraped {product['code']}")
            for key, value in product_data.items():
                if key not in ['product_code', 'url', 'title', 'scrape_status']:
                    print(f"  {key.capitalize()}: {value[:50]}..." if value and len(value) > 50 else f"  {key.capitalize()}: {value}")
        
        # Combine with chemistry data
        if product['code'] in chemistry_data:
            product_data.update(chemistry_data[product['code']])
        
        all_products.append(product_data)
        
        # Delay to avoid overloading the server
        time.sleep(DELAY)
    
    print(f"\nScraping summary:")
    print(f"  Successful: {successful}")
    print(f"  Failed: {failed}")
    print(f"  Total: {len(product_urls)}")
    
    return all_products

def save_json(data, filename=OUTPUT_FILE):
    """Save data to JSON file."""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"Saved {len(data)} products to {filename}")

def main():
    """Main function."""
    print("🌐 FULL FORZA PRODUCT SCRAPER")
    print("=" * 50)
    
    # Load chemistry data
    chemistry_data = load_chemistry_data()
    
    # Scrape all products
    all_products = scrape_all_products(chemistry_data)
    
    # Save to JSON
    save_json(all_products)
    
    # Count products with content
    products_with_content = [p for p in all_products if p.get("description") or p.get("applications") or p.get("benefits")]
    print(f"\n✅ Scraping complete! Processed {len(all_products)} products.")
    print(f"Found content for {len(products_with_content)} products.")

if __name__ == "__main__":
    main()