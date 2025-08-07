#!/usr/bin/env python3
"""
Analyze chemistry data and create a summary of available information
"""

import csv
import json
import os
from collections import defaultdict

def analyze_chemistry_data(csv_file="comprehensive_chemistry_table - Revised.csv"):
    """Analyze the chemistry data from the CSV file"""
    
    # Check if file exists
    if not os.path.exists(csv_file):
        print(f"Error: File {csv_file} not found")
        return
    
    # Load data from CSV
    products = []
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            products.append(row)
    
    print(f"Loaded {len(products)} products from CSV file")
    
    # Analyze chemistry types
    chemistry_counts = defaultdict(int)
    category_counts = defaultdict(int)
    
    for product in products:
        chemistry_type = product.get("Chemistry Type", "Unknown")
        category = product.get("Category", "Unknown")
        
        chemistry_counts[chemistry_type] += 1
        category_counts[category] += 1
    
    # Print summary
    print("\n=== CHEMISTRY TYPES ===")
    for chemistry, count in sorted(chemistry_counts.items(), key=lambda x: x[1], reverse=True):
        percentage = (count / len(products)) * 100
        print(f"{chemistry}: {count} products ({percentage:.1f}%)")
    
    print("\n=== CATEGORIES ===")
    for category, count in sorted(category_counts.items(), key=lambda x: x[1], reverse=True):
        percentage = (count / len(products)) * 100
        print(f"{category}: {count} products ({percentage:.1f}%)")
    
    # Analyze by category and chemistry
    category_chemistry = defaultdict(lambda: defaultdict(int))
    
    for product in products:
        chemistry_type = product.get("Chemistry Type", "Unknown")
        category = product.get("Category", "Unknown")
        
        category_chemistry[category][chemistry_type] += 1
    
    print("\n=== CHEMISTRY BY CATEGORY ===")
    for category, chemistries in sorted(category_chemistry.items()):
        print(f"\n{category}:")
        total = sum(chemistries.values())
        for chemistry, count in sorted(chemistries.items(), key=lambda x: x[1], reverse=True):
            percentage = (count / total) * 100
            print(f"  {chemistry}: {count} products ({percentage:.1f}%)")
    
    # Create a detailed table
    create_detailed_table(products, "chemistry_detailed_table.csv")
    
    return products

def create_detailed_table(products, output_file):
    """Create a detailed table with all products"""
    
    # Sort by category and product name
    products.sort(key=lambda x: (x.get("Category", ""), x.get("Product Name", "")))
    
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        fieldnames = ["Product ID", "Product Name", "Product Code", "Category", "Chemistry Type"]
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        
        for product in products:
            writer.writerow({
                "Product ID": product.get("Product ID", ""),
                "Product Name": product.get("Product Name", ""),
                "Product Code": product.get("Product Code", ""),
                "Category": product.get("Category", ""),
                "Chemistry Type": product.get("Chemistry Type", "")
            })
    
    print(f"\nDetailed table saved to {output_file}")

def main():
    """Main function"""
    print("📊 CHEMISTRY DATA ANALYSIS")
    print("=" * 50)
    
    analyze_chemistry_data()
    
    print("\n✅ Analysis complete!")

if __name__ == "__main__":
    main()