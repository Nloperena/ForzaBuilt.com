#!/usr/bin/env python3
"""
Database Analysis Script
Provides detailed insights and analysis of the extracted product database.
"""

import json
from collections import Counter
from pathlib import Path

def analyze_database(database_file: str = "product_database.json"):
    """Analyze the product database and provide detailed insights."""
    
    with open(database_file, 'r', encoding='utf-8') as f:
        database = json.load(f)
    
    print("=" * 60)
    print("PRODUCT DATABASE ANALYSIS")
    print("=" * 60)
    
    # Basic statistics
    metadata = database["metadata"]
    print(f"\n📊 BASIC STATISTICS:")
    print(f"   Total Products: {metadata['total_products']}")
    print(f"   Total Categories: {len(database['categories'])}")
    print(f"   Extraction Date: {metadata['extraction_date']}")
    
    # Category analysis
    print(f"\n📁 CATEGORY BREAKDOWN:")
    for category_name, category_info in database["categories"].items():
        stats = category_info["statistics"]
        print(f"   {category_info['display_name']}:")
        print(f"     - Products: {stats['total_products']}")
        print(f"     - Files: {stats['total_files']}")
        print(f"     - SDS: {stats['sds_count']}")
        print(f"     - TDS: {stats['tds_count']}")
    
    # Product type analysis
    product_types = Counter()
    file_types = Counter()
    
    for product_id, product_info in database["products"].items():
        product_types[product_info["type"]] += 1
        
        for file_type, files in product_info["files"].items():
            file_types[file_type] += len(files)
    
    print(f"\n🏷️  PRODUCT TYPE DISTRIBUTION:")
    for product_type, count in product_types.most_common():
        percentage = (count / metadata['total_products']) * 100
        print(f"   {product_type}: {count} ({percentage:.1f}%)")
    
    print(f"\n📄 FILE TYPE DISTRIBUTION:")
    total_files = sum(file_types.values())
    for file_type, count in file_types.most_common():
        percentage = (count / total_files) * 100
        print(f"   {file_type.upper()}: {count} ({percentage:.1f}%)")
    
    # File size analysis
    print(f"\n💾 FILE SIZE ANALYSIS:")
    sds_sizes = []
    tds_sizes = []
    
    for product_id, product_info in database["products"].items():
        for file_type, files in product_info["files"].items():
            for file_info in files:
                if file_type == "sds":
                    sds_sizes.append(file_info["size_mb"])
                elif file_type == "tds":
                    tds_sizes.append(file_info["size_mb"])
    
    if sds_sizes:
        print(f"   SDS Files:")
        print(f"     - Average Size: {sum(sds_sizes)/len(sds_sizes):.2f} MB")
        print(f"     - Largest: {max(sds_sizes):.2f} MB")
        print(f"     - Smallest: {min(sds_sizes):.2f} MB")
    
    if tds_sizes:
        print(f"   TDS Files:")
        print(f"     - Average Size: {sum(tds_sizes)/len(tds_sizes):.2f} MB")
        print(f"     - Largest: {max(tds_sizes):.2f} MB")
        print(f"     - Smallest: {min(tds_sizes):.2f} MB")
    
    # Product code patterns
    print(f"\n🔍 PRODUCT CODE PATTERNS:")
    code_patterns = Counter()
    
    for product_id, product_info in database["products"].items():
        code = product_info["code"]
        if code:
            # Extract pattern (e.g., IC, CA, H, R, T, OS, OA)
            pattern = ''.join(c for c in code if c.isalpha())
            if pattern:
                code_patterns[pattern] += 1
    
    for pattern, count in code_patterns.most_common():
        print(f"   {pattern} series: {count} products")
    
    # Recent updates
    print(f"\n🕒 RECENT UPDATES:")
    recent_products = []
    
    for product_id, product_info in database["products"].items():
        last_modified = product_info["metadata"]["last_modified"]
        recent_products.append((product_id, last_modified))
    
    # Sort by modification date (most recent first)
    recent_products.sort(key=lambda x: x[1], reverse=True)
    
    print("   Most recently updated products:")
    for product_id, date in recent_products[:5]:
        print(f"     - {product_id}: {date[:10]}")
    
    # Generate recommendations
    print(f"\n💡 RECOMMENDATIONS:")
    
    # Check for products with missing TDS
    products_without_tds = []
    for product_id, product_info in database["products"].items():
        if not product_info["files"]["tds"]:
            products_without_tds.append(product_id)
    
    if products_without_tds:
        print(f"   ⚠️  {len(products_without_tds)} products missing TDS files")
        for product_id in products_without_tds[:5]:
            print(f"     - {product_id}")
        if len(products_without_tds) > 5:
            print(f"     ... and {len(products_without_tds) - 5} more")
    
    # Check for products with missing SDS
    products_without_sds = []
    for product_id, product_info in database["products"].items():
        if not product_info["files"]["sds"]:
            products_without_sds.append(product_id)
    
    if products_without_sds:
        print(f"   ⚠️  {len(products_without_sds)} products missing SDS files")
        for product_id in products_without_sds[:5]:
            print(f"     - {product_id}")
        if len(products_without_sds) > 5:
            print(f"     ... and {len(products_without_sds) - 5} more")
    
    # Category completeness
    print(f"\n📈 CATEGORY COMPLETENESS:")
    for category_name, category_info in database["categories"].items():
        stats = category_info["statistics"]
        completeness = (stats['sds_count'] + stats['tds_count']) / (stats['total_products'] * 2) * 100
        print(f"   {category_info['display_name']}: {completeness:.1f}% complete")
    
    print(f"\n" + "=" * 60)
    print("Analysis complete!")
    print("=" * 60)

def generate_sample_products(database_file: str = "product_database.json", num_samples: int = 5):
    """Generate sample product entries for each category."""
    
    with open(database_file, 'r', encoding='utf-8') as f:
        database = json.load(f)
    
    print(f"\n📋 SAMPLE PRODUCTS BY CATEGORY:")
    
    for category_name, category_info in database["categories"].items():
        print(f"\n{category_info['display_name']} Products:")
        print("-" * 40)
        
        products = list(category_info["products"].values())
        for i, product in enumerate(products[:num_samples], 1):
            print(f"  {i}. {product['name']} ({product['type']})")
            print(f"     Code: {product['code']}")
            print(f"     Files: {len(product['files']['sds'])} SDS, {len(product['files']['tds'])} TDS")
            
            # Show sample files
            if product['files']['sds']:
                print(f"     SDS: {product['files']['sds'][0]['name'][:50]}...")
            if product['files']['tds']:
                print(f"     TDS: {product['files']['tds'][0]['name'][:50]}...")
            print()

if __name__ == "__main__":
    analyze_database()
    generate_sample_products() 