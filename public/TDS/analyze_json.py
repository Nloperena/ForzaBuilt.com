#!/usr/bin/env python3
"""
Analyze the JSON file created by the scraper
"""

import json
import os

def analyze_json(file_path):
    """Analyze the JSON file and print statistics"""
    
    print(f"Analyzing {file_path}...")
    
    # Check if file exists
    if not os.path.exists(file_path):
        print(f"Error: File {file_path} not found")
        return
    
    # Load JSON data
    with open(file_path, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
            print(f"Successfully loaded JSON data with {len(data)} records")
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {str(e)}")
            return
    
    # Count products with titles (pages that exist)
    products_with_titles = [p for p in data if p.get('title') is not None]
    print(f"Products with titles: {len(products_with_titles)} out of {len(data)}")
    
    # Count products with sections
    section_counts = {}
    common_sections = ['description', 'applications', 'benefits', 'how_to_use', 'sizing']
    
    for section in common_sections:
        products_with_section = [p for p in data if p.get(section) is not None]
        section_counts[section] = len(products_with_section)
    
    print("\nSection statistics:")
    for section, count in section_counts.items():
        print(f"  {section}: {count} products ({count/len(data)*100:.1f}%)")
    
    # Print example of a product with content
    print("\nExample of a product with content:")
    example_products = [p for p in data if any(p.get(section) is not None for section in common_sections)]
    
    if example_products:
        example = example_products[0]
        print(f"Product Code: {example.get('product_code')}")
        print(f"Title: {example.get('title')}")
        print(f"Chemistry Type: {example.get('chemistry_type')}")
        print(f"Category: {example.get('category')}")
        
        for section in common_sections:
            if example.get(section):
                print(f"\n{section.capitalize()}:")
                print(example.get(section))
    else:
        print("No products with content found")
    
    # Check for IC934 specifically
    ic934_products = [p for p in data if p.get('product_code') == 'IC934']
    print("\nIC934 product data:")
    if ic934_products:
        ic934 = ic934_products[0]
        print(json.dumps(ic934, indent=2))
    else:
        print("IC934 product not found")

if __name__ == "__main__":
    analyze_json("forza_products_data.json")