#!/usr/bin/env python3
"""
Create a combined product data file that merges chemistry data with scraped product details
"""

import json
import csv
import os

def load_chemistry_data(file_path="comprehensive_chemistry_table - Revised.csv"):
    """Load chemistry data from CSV file."""
    chemistry_data = {}
    
    with open(file_path, 'r', encoding='utf-8') as f:
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

def load_scraped_data(file_path="forza_complete_product_data.json"):
    """Load scraped product data from JSON file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Convert to dictionary for easier lookup
    scraped_data = {}
    for product in data:
        product_code = product["product_code"]
        scraped_data[product_code] = product
    
    print(f"Loaded scraped data for {len(scraped_data)} products")
    return scraped_data

def create_combined_data(chemistry_data, scraped_data, output_file="combined_product_data.json"):
    """Create a combined data file."""
    combined_data = []
    
    # Go through all chemistry products
    for product_code, chem_info in chemistry_data.items():
        product_data = {
            "product_id": chem_info["product_id"],
            "product_name": chem_info["product_name"],
            "product_code": product_code,
            "category": chem_info["category"],
            "chemistry_type": chem_info["chemistry_type"],
            "has_web_page": False
        }
        
        # Add scraped data if available
        if product_code in scraped_data:
            scrape_info = scraped_data[product_code]
            
            # Check if scraping was successful
            if scrape_info.get("scrape_status") == "success" and scrape_info.get("title"):
                product_data["has_web_page"] = True
                product_data["url"] = scrape_info.get("url")
                product_data["title"] = scrape_info.get("title")
                
                # Add content sections if available
                for section in ["description", "applications", "benefits", "how_to_use", "sizing"]:
                    if section in scrape_info:
                        product_data[section] = scrape_info[section]
        
        combined_data.append(product_data)
    
    # Sort by category and product name
    combined_data.sort(key=lambda x: (x["category"], x["product_name"]))
    
    # Save to JSON
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(combined_data, f, indent=2, ensure_ascii=False)
    
    # Count products with web pages
    products_with_pages = [p for p in combined_data if p.get("has_web_page")]
    
    print(f"Created combined data file with {len(combined_data)} products")
    print(f"Products with web pages: {len(products_with_pages)}")
    print(f"Products without web pages: {len(combined_data) - len(products_with_pages)}")
    
    return combined_data

def create_web_ready_data(combined_data, output_file="web_ready_product_data.json"):
    """Create a web-ready version of the data."""
    web_ready = []
    
    for product in combined_data:
        # Only include products with web pages
        if product.get("has_web_page"):
            # Create a simplified structure for web use
            web_product = {
                "id": product["product_id"],
                "name": product["product_name"],
                "code": product["product_code"],
                "category": product["category"],
                "chemistry": product["chemistry_type"],
                "url": product.get("url", ""),
                "title": product.get("title", product["product_name"]),
                "details": {}
            }
            
            # Add details if available
            for section in ["description", "applications", "benefits", "how_to_use", "sizing"]:
                if section in product:
                    web_product["details"][section] = product[section]
            
            web_ready.append(web_product)
    
    # Save to JSON
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(web_ready, f, indent=2, ensure_ascii=False)
    
    print(f"Created web-ready data file with {len(web_ready)} products")
    return web_ready

def main():
    """Main function."""
    print("📊 CREATING COMBINED PRODUCT DATA")
    print("=" * 50)
    
    # Load data
    chemistry_data = load_chemistry_data()
    scraped_data = load_scraped_data()
    
    # Create combined data
    combined_data = create_combined_data(chemistry_data, scraped_data)
    
    # Create web-ready data
    web_ready = create_web_ready_data(combined_data)
    
    print("\n✅ Data processing complete!")
    print("📁 Files created:")
    print("   - combined_product_data.json (all products)")
    print("   - web_ready_product_data.json (only products with web pages)")

if __name__ == "__main__":
    main()