#!/usr/bin/env python3
"""
Focused scraper for specific Forza products
Extracts detailed content from product pages and saves to JSON
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import re

# Configuration
OUTPUT_FILE = "forza_product_details.json"
DELAY = 1  # Delay between requests

# List of specific products to scrape
PRODUCTS_TO_SCRAPE = [
    {"code": "IC934", "url": "https://forzabuilt.com/product/ic934/"},
    {"code": "IC933", "url": "https://forzabuilt.com/product/ic933/"},
    {"code": "OS2", "url": "https://forzabuilt.com/product/os2/"},
    {"code": "T215", "url": "https://forzabuilt.com/product/t215/"},
    {"code": "OA4", "url": "https://forzabuilt.com/product/oa4/"}
]

def extract_section_content(soup, section_name):
    """Extract content from a section with the given heading."""
    # Try to find section by premium-title-text
    section_titles = soup.find_all('span', class_='premium-title-text')
    target_section = None
    
    for title in section_titles:
        if section_name.lower() in title.text.strip().lower():
            target_section = title
            break
    
    if not target_section:
        return None
    
    # Find the parent section
    section_container = target_section.find_parent('section')
    if not section_container:
        return None
    
    # Find the text editor in this section
    text_editor = section_container.find('div', class_='elementor-widget-text-editor')
    if not text_editor:
        return None
    
    # Extract content
    content = []
    
    # Check for lists
    list_items = text_editor.find_all('li')
    if list_items:
        for li in list_items:
            content.append(f"• {li.text.strip()}")
    else:
        # Check for paragraphs
        paragraphs = text_editor.find_all('p')
        if paragraphs:
            for p in paragraphs:
                content.append(p.text.strip())
        else:
            # Just get the text
            text = text_editor.text.strip()
            if text:
                content.append(text)
    
    return content

def scrape_product(product):
    """Scrape a single product page."""
    print(f"Scraping {product['code']} from {product['url']}")
    
    try:
        response = requests.get(product['url'])
        if response.status_code != 200:
            print(f"Failed to fetch {product['url']}: Status code {response.status_code}")
            return None
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract product title
        title = soup.find('h1', class_='product_title')
        if not title:
            title = soup.find('h1')  # Try any h1 if specific class not found
        
        # Create product data
        product_data = {
            "product_code": product['code'],
            "url": product['url'],
            "title": title.text.strip() if title else product['code'],
        }
        
        # Extract sections
        sections = ["Description", "Applications", "Benefits", "How to Use", "Sizing"]
        for section_name in sections:
            content = extract_section_content(soup, section_name)
            if content:
                section_key = section_name.lower().replace(" ", "_")
                product_data[section_key] = content
        
        # Clean up data - convert lists to strings for better readability
        for key, value in product_data.items():
            if isinstance(value, list):
                product_data[key] = "\n".join(value) if value else None
        
        return product_data
    
    except Exception as e:
        print(f"Error scraping {product['url']}: {str(e)}")
        return None

def main():
    """Main function."""
    print("🌐 FOCUSED FORZA PRODUCT SCRAPER")
    print("=" * 50)
    
    # Scrape products
    product_details = []
    
    for product in PRODUCTS_TO_SCRAPE:
        product_data = scrape_product(product)
        if product_data:
            product_details.append(product_data)
            print(f"Successfully scraped {product['code']}")
            
            # Print a sample of the data
            if 'description' in product_data:
                print(f"Description: {product_data['description'][:100]}...")
            
            # Delay to avoid overloading the server
            time.sleep(DELAY)
    
    # Save to JSON
    if product_details:
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(product_details, f, indent=2, ensure_ascii=False)
        
        print(f"\n✅ Scraping complete! Saved {len(product_details)} products to {OUTPUT_FILE}")
    else:
        print("\n❌ No products were successfully scraped.")

if __name__ == "__main__":
    main()