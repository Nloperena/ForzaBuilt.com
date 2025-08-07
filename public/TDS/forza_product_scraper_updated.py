#!/usr/bin/env python3
"""
Forza Product Scraper (Updated)
Scrapes product information from forzabuilt.com/products/ with improved HTML parsing
"""

import csv
import json
import requests
from bs4 import BeautifulSoup
import re
import time
from urllib.parse import urljoin
import os

# Configuration
BASE_URL = "https://forzabuilt.com/products/"
OUTPUT_FILE = "forza_products_data_updated.json"
CHEMISTRY_DATA_FILE = "comprehensive_chemistry_table - Revised.csv"
DELAY = 1  # Delay between requests to avoid overloading the server

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

def get_product_urls():
    """Get all product URLs from the main products page."""
    # In a real implementation, we would scrape the main products page
    # For now, we'll use the product codes from our chemistry data
    
    chemistry_data = load_chemistry_data()
    product_urls = []
    
    for product_code in chemistry_data.keys():
        # Clean up product code to match URL format (remove spaces, etc)
        clean_code = product_code.strip().replace(" ", "-").lower()
        product_url = urljoin(BASE_URL, clean_code)
        product_urls.append((product_code, product_url))
    
    return product_urls

def extract_section_content_from_elementor(soup, section_name):
    """Extract content from the specific Elementor section structure."""
    
    # First, try to find the section by its anchor ID
    section_id = f"prod_{section_name.lower()[:4]}"
    anchor = soup.find('div', {'id': section_id})
    
    if not anchor:
        # If no anchor, try to find by the section title
        title_elements = soup.find_all('span', {'class': 'premium-title-text'})
        for title_elem in title_elements:
            if section_name.lower() in title_elem.text.strip().lower():
                # Found the title, now get the parent sections
                section = title_elem.find_parent('section')
                if section:
                    break
        else:
            return None
    else:
        # Found the anchor, get the parent section
        section = anchor.find_parent('section')
        if not section:
            return None
    
    # Find the text content in this section
    text_editor = section.find('div', {'class': 'elementor-widget-text-editor'})
    if not text_editor:
        return None
    
    # Extract content based on structure
    content = []
    
    # Check if there's a list
    list_items = text_editor.find_all('li')
    if list_items:
        for li in list_items:
            content.append(f"• {li.text.strip()}")
    else:
        # Otherwise, get paragraphs
        paragraphs = text_editor.find_all('p')
        if paragraphs:
            for p in paragraphs:
                content.append(p.text.strip())
        else:
            # If no specific elements, just get the text
            text = text_editor.text.strip()
            if text:
                content.append(text)
    
    return content

def scrape_product_page(product_code, url):
    """Scrape a single product page with the specific Elementor structure."""
    print(f"Scraping {product_code} from {url}")
    
    try:
        response = requests.get(url)
        if response.status_code != 200:
            print(f"Failed to fetch {url}: Status code {response.status_code}")
            return None
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Check if the page exists (has content)
        title = soup.find('h1')
        if not title:
            print(f"No content found for {product_code}")
            return None
        
        # Extract product data
        product_data = {
            "product_code": product_code,
            "url": url,
            "title": title.text.strip() if title else None,
        }
        
        # Extract sections using the Elementor structure
        sections = ["Description", "Applications", "Benefits", "How to Use", "Sizing"]
        for section_name in sections:
            content = extract_section_content_from_elementor(soup, section_name)
            if content:
                section_key = section_name.lower().replace(" ", "_")
                product_data[section_key] = content
        
        # Clean up data - convert lists to strings for better readability
        for key, value in product_data.items():
            if isinstance(value, list):
                product_data[key] = "\n".join(value) if value else None
        
        return product_data
    
    except Exception as e:
        print(f"Error scraping {url}: {str(e)}")
        return None

def scrape_all_products():
    """Scrape all product pages."""
    chemistry_data = load_chemistry_data()
    product_urls = get_product_urls()
    all_products = []
    
    for i, (product_code, url) in enumerate(product_urls):
        print(f"Processing {i+1}/{len(product_urls)}: {product_code}")
        
        # Scrape product page
        product_data = scrape_product_page(product_code, url)
        
        # Create a base product data even if scraping failed
        if not product_data:
            product_data = {
                "product_code": product_code,
                "url": url,
                "title": None
            }
        
        # Combine with chemistry data
        if product_code in chemistry_data:
            product_data.update(chemistry_data[product_code])
        
        all_products.append(product_data)
        
        # Delay to avoid overloading the server
        time.sleep(DELAY)
    
    return all_products

def save_json(data, filename=OUTPUT_FILE):
    """Save data to JSON file."""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"Saved {len(data)} products to {filename}")

def main():
    """Main function."""
    print("🌐 FORZA PRODUCT SCRAPER (UPDATED)")
    print("=" * 50)
    
    # Scrape all products
    all_products = scrape_all_products()
    
    # Save to JSON
    save_json(all_products)
    
    # Count products with content
    products_with_content = [p for p in all_products if p.get("description") or p.get("applications") or p.get("benefits")]
    print(f"\n✅ Scraping complete! Processed {len(all_products)} products.")
    print(f"Found content for {len(products_with_content)} products.")
    
    if products_with_content:
        print("\nExample of a product with content:")
        example = products_with_content[0]
        print(f"Product: {example.get('product_code')}")
        print(f"Chemistry: {example.get('chemistry_type')}")
        if example.get('description'):
            print(f"\nDescription: {example.get('description')}")

if __name__ == "__main__":
    main()