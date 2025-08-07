#!/usr/bin/env python3
"""
Forza Product Scraper
Scrapes product information from forzabuilt.com/products/ and combines with chemistry data
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
OUTPUT_FILE = "forza_products_data.json"
CHEMISTRY_DATA_FILE = "comprehensive_chemistry_table - Revised.csv"
DELAY = 1  # Delay between requests to avoid overloading the server

# Common section headings to look for (case insensitive)
COMMON_SECTIONS = [
    "Description", 
    "Applications", 
    "Benefits", 
    "Features",
    "How to Use", 
    "Instructions",
    "Sizing", 
    "Available Sizes",
    "Technical Data",
    "Specifications",
    "Properties",
    "Storage",
    "Shelf Life",
    "Safety",
    "Warranty"
]

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

def extract_section_content(soup, heading_text):
    """Extract content from a section with the given heading."""
    # Find the heading (case insensitive)
    heading = soup.find(lambda tag: tag.name in ['h1', 'h2', 'h3', 'h4', 'h5', 'strong'] and 
                                   heading_text.lower() in tag.text.strip().lower())
    
    if not heading:
        return None
    
    # Get the content following the heading until the next heading
    content = []
    current = heading.find_next_sibling()
    
    # If no siblings, check if the heading is inside a div and get content from there
    if not current:
        parent_div = heading.find_parent('div')
        if parent_div:
            elements = parent_div.find_all(['p', 'ul', 'ol', 'div'], recursive=False)
            for elem in elements:
                if elem != heading and not elem.find(['h1', 'h2', 'h3', 'h4', 'h5', 'strong']):
                    if elem.name == 'ul' or elem.name == 'ol':
                        for li in elem.find_all('li'):
                            content.append(li.text.strip())
                    else:
                        content.append(elem.text.strip())
            return content if content else None
    
    # Process siblings until next heading
    while current and not current.name in ['h1', 'h2', 'h3', 'h4', 'h5'] and not (current.name == 'strong' and len(current.text.strip()) > 3):
        if current.name == 'p':
            content.append(current.text.strip())
        elif current.name == 'ul' or current.name == 'ol':
            for li in current.find_all('li'):
                content.append("• " + li.text.strip())
        elif current.name == 'div' and not current.find(['h1', 'h2', 'h3', 'h4', 'h5']):
            # Handle div that might contain content but not headings
            text = current.text.strip()
            if text:
                content.append(text)
        
        current = current.find_next_sibling()
    
    return content if content else None

def find_all_sections(soup):
    """Find all sections on the page and extract their content."""
    sections = {}
    
    # Look for common section headings
    for section_name in COMMON_SECTIONS:
        content = extract_section_content(soup, section_name)
        if content:
            sections[section_name.lower().replace(" ", "_")] = content
    
    # Look for any other headings that might be sections
    all_headings = soup.find_all(['h2', 'h3', 'h4', 'h5'])
    for heading in all_headings:
        heading_text = heading.text.strip()
        # Skip if already processed or too short
        if heading_text.lower() in [s.lower() for s in COMMON_SECTIONS] or len(heading_text) < 3:
            continue
            
        content = extract_section_content(soup, heading_text)
        if content:
            section_key = heading_text.lower().replace(" ", "_").replace(":", "")
            sections[section_key] = content
    
    return sections

def scrape_product_page(product_code, url):
    """Scrape a single product page."""
    print(f"Scraping {product_code} from {url}")
    
    try:
        response = requests.get(url)
        if response.status_code != 200:
            print(f"Failed to fetch {url}: Status code {response.status_code}")
            return None
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract product data
        product_data = {
            "product_code": product_code,
            "url": url,
            "title": soup.find('h1').text.strip() if soup.find('h1') else None,
        }
        
        # Find and extract all sections
        sections = find_all_sections(soup)
        product_data.update(sections)
        
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
        
        if product_data:
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
    print("🌐 FORZA PRODUCT SCRAPER")
    print("=" * 50)
    
    # Scrape all products
    all_products = scrape_all_products()
    
    # Save to JSON
    save_json(all_products)
    
    print(f"\n✅ Scraping complete! Processed {len(all_products)} products.")

if __name__ == "__main__":
    main()