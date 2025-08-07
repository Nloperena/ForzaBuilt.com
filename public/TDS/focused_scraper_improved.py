#!/usr/bin/env python3
"""
Improved focused scraper for specific Forza products
Extracts detailed content from product pages and saves to JSON
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import re

# Configuration
OUTPUT_FILE = "forza_product_details_improved.json"
DELAY = 1  # Delay between requests

# List of specific products to scrape
PRODUCTS_TO_SCRAPE = [
    {"code": "IC934", "url": "https://forzabuilt.com/product/ic934/"},
    {"code": "IC933", "url": "https://forzabuilt.com/product/ic933/"},
    {"code": "OS2", "url": "https://forzabuilt.com/product/os2/"},
    {"code": "T215", "url": "https://forzabuilt.com/product/t215/"},
    {"code": "OA4", "url": "https://forzabuilt.com/product/oa4/"}
]

def scrape_product(product):
    """Scrape a single product page."""
    print(f"Scraping {product['code']} from {product['url']}")
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(product['url'], headers=headers)
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
        
        # Print the HTML structure to help with debugging
        print(f"Page structure for {product['code']}:")
        
        # Look for the product description tab content
        tab_content = soup.find('div', id='tab-description')
        if tab_content:
            print("Found tab description content")
            
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
                        print(f"Found {section_name} section")
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
            print("Could not find tab description content")
            
            # Alternative approach: look for section headers directly
            for section_name in ["Description", "Applications", "Benefits", "How to Use", "Sizing"]:
                headers = soup.find_all(['h2', 'h3', 'h4', 'h5', 'h6'])
                for header in headers:
                    if section_name.lower() in header.text.strip().lower():
                        print(f"Found {section_name} header")
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
    
    except Exception as e:
        print(f"Error scraping {product['url']}: {str(e)}")
        return None

def main():
    """Main function."""
    print("🌐 IMPROVED FOCUSED FORZA PRODUCT SCRAPER")
    print("=" * 50)
    
    # Scrape products
    product_details = []
    
    for product in PRODUCTS_TO_SCRAPE:
        product_data = scrape_product(product)
        if product_data:
            product_details.append(product_data)
            print(f"Successfully scraped {product['code']}")
            
            # Print a sample of the data
            for key, value in product_data.items():
                if key not in ['product_code', 'url', 'title']:
                    print(f"{key.capitalize()}: {value[:100]}..." if value and len(value) > 100 else f"{key.capitalize()}: {value}")
            
            print("-" * 30)
            
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