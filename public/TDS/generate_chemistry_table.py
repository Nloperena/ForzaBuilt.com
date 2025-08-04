#!/usr/bin/env python3
"""
Chemistry Table Generator
Generates a comprehensive table showing each product and its chemistry classification.
"""

import json
from pathlib import Path

def generate_chemistry_table(database_file: str = "enhanced_product_database.json", output_file: str = "chemistry_table.csv"):
    """Generate a CSV table of all products with their chemistry classifications."""
    
    with open(database_file, 'r', encoding='utf-8') as f:
        database = json.load(f)
    
    # Prepare CSV data
    csv_data = []
    csv_data.append([
        "Product ID",
        "Product Name", 
        "Product Code",
        "Product Type",
        "Category",
        "Chemistry Type",
        "Confidence Level",
        "Reasoning",
        "SDS Files",
        "TDS Files"
    ])
    
    # Sort products by category and name for better organization
    sorted_products = []
    for product_id, product_info in database["products"].items():
        sorted_products.append((product_id, product_info))
    
    # Sort by category, then by product name
    sorted_products.sort(key=lambda x: (x[1]["category"], x[1]["name"]))
    
    for product_id, product_info in sorted_products:
        chemistry_info = product_info["chemistry"]
        reasoning = "; ".join(chemistry_info["reasoning"]) if chemistry_info["reasoning"] else "N/A"
        
        csv_data.append([
            product_id,
            product_info["name"],
            product_info["code"],
            product_info["type"],
            product_info["category"],
            chemistry_info["chemistry_type"],
            chemistry_info["confidence"],
            reasoning,
            len(product_info["files"]["sds"]),
            len(product_info["files"]["tds"])
        ])
    
    # Write CSV file
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        import csv
        writer = csv.writer(f)
        writer.writerows(csv_data)
    
    print(f"Chemistry table saved to {output_file}")
    return csv_data

def generate_markdown_table(database_file: str = "enhanced_product_database.json", output_file: str = "chemistry_table.md"):
    """Generate a markdown table of all products with their chemistry classifications."""
    
    with open(database_file, 'r', encoding='utf-8') as f:
        database = json.load(f)
    
    # Prepare markdown content
    md_content = []
    md_content.append("# Product Chemistry Classification Table")
    md_content.append("")
    md_content.append("| Product ID | Product Name | Product Code | Product Type | Category | Chemistry Type | Confidence | SDS | TDS |")
    md_content.append("|------------|--------------|--------------|--------------|----------|----------------|------------|-----|-----|")
    
    # Sort products by category and name
    sorted_products = []
    for product_id, product_info in database["products"].items():
        sorted_products.append((product_id, product_info))
    
    sorted_products.sort(key=lambda x: (x[1]["category"], x[1]["name"]))
    
    for product_id, product_info in sorted_products:
        chemistry_info = product_info["chemistry"]
        
        # Truncate long names for table readability
        product_name = product_info["name"]
        if len(product_name) > 20:
            product_name = product_name[:17] + "..."
        
        md_content.append(f"| {product_id} | {product_name} | {product_info['code']} | {product_info['type']} | {product_info['category']} | {chemistry_info['chemistry_type']} | {chemistry_info['confidence']} | {len(product_info['files']['sds'])} | {len(product_info['files']['tds'])} |")
    
    # Add summary statistics
    md_content.append("")
    md_content.append("## Summary Statistics")
    md_content.append("")
    
    chemistry_summary = database["chemistry_summary"]
    total_products = database["metadata"]["total_products"]
    
    md_content.append("### Chemistry Breakdown")
    for chemistry_type, count in chemistry_summary["chemistry_types"].items():
        percentage = (count / total_products) * 100
        md_content.append(f"- **{chemistry_type}**: {count} products ({percentage:.1f}%)")
    
    md_content.append("")
    md_content.append("### Confidence Levels")
    for confidence, count in chemistry_summary["confidence_levels"].items():
        percentage = (count / total_products) * 100
        md_content.append(f"- **{confidence}**: {count} products ({percentage:.1f}%)")
    
    # Write markdown file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(md_content))
    
    print(f"Markdown table saved to {output_file}")

def generate_detailed_table(database_file: str = "enhanced_product_database.json", output_file: str = "detailed_chemistry_table.txt"):
    """Generate a detailed text table with full information."""
    
    with open(database_file, 'r', encoding='utf-8') as f:
        database = json.load(f)
    
    # Prepare detailed content
    content = []
    content.append("=" * 120)
    content.append("DETAILED PRODUCT CHEMISTRY CLASSIFICATION TABLE")
    content.append("=" * 120)
    content.append("")
    
    # Sort products by category and name
    sorted_products = []
    for product_id, product_info in database["products"].items():
        sorted_products.append((product_id, product_info))
    
    sorted_products.sort(key=lambda x: (x[1]["category"], x[1]["name"]))
    
    current_category = None
    for product_id, product_info in sorted_products:
        # Add category header
        if product_info["category"] != current_category:
            current_category = product_info["category"]
            content.append("")
            content.append(f"📁 {product_info['category']}")
            content.append("-" * 80)
            content.append("")
        
        chemistry_info = product_info["chemistry"]
        reasoning = "; ".join(chemistry_info["reasoning"]) if chemistry_info["reasoning"] else "N/A"
        
        content.append(f"Product: {product_info['name']}")
        content.append(f"  ID: {product_id}")
        content.append(f"  Code: {product_info['code']}")
        content.append(f"  Type: {product_info['type']}")
        content.append(f"  Chemistry: {chemistry_info['chemistry_type']}")
        content.append(f"  Confidence: {chemistry_info['confidence']}")
        content.append(f"  Reasoning: {reasoning}")
        content.append(f"  Files: {len(product_info['files']['sds'])} SDS, {len(product_info['files']['tds'])} TDS")
        content.append("")
    
    # Add summary at the end
    content.append("=" * 120)
    content.append("SUMMARY")
    content.append("=" * 120)
    content.append("")
    
    chemistry_summary = database["chemistry_summary"]
    total_products = database["metadata"]["total_products"]
    
    content.append("Chemistry Breakdown:")
    for chemistry_type, count in chemistry_summary["chemistry_types"].items():
        percentage = (count / total_products) * 100
        content.append(f"  {chemistry_type}: {count} products ({percentage:.1f}%)")
    
    content.append("")
    content.append("Confidence Levels:")
    for confidence, count in chemistry_summary["confidence_levels"].items():
        percentage = (count / total_products) * 100
        content.append(f"  {confidence}: {count} products ({percentage:.1f}%)")
    
    # Write detailed file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(content))
    
    print(f"Detailed table saved to {output_file}")

def generate_chemistry_summary_table(database_file: str = "enhanced_product_database.json", output_file: str = "chemistry_summary_table.txt"):
    """Generate a summary table organized by chemistry type."""
    
    with open(database_file, 'r', encoding='utf-8') as f:
        database = json.load(f)
    
    # Group products by chemistry type
    chemistry_groups = {}
    for product_id, product_info in database["products"].items():
        chemistry_type = product_info["chemistry"]["chemistry_type"]
        if chemistry_type not in chemistry_groups:
            chemistry_groups[chemistry_type] = []
        chemistry_groups[chemistry_type].append(product_info)
    
    # Prepare summary content
    content = []
    content.append("=" * 100)
    content.append("PRODUCTS BY CHEMISTRY TYPE")
    content.append("=" * 100)
    content.append("")
    
    # Sort chemistry types by count (descending)
    sorted_chemistry_types = sorted(chemistry_groups.items(), key=lambda x: len(x[1]), reverse=True)
    
    for chemistry_type, products in sorted_chemistry_types:
        content.append(f"🧪 {chemistry_type} ({len(products)} products)")
        content.append("-" * 60)
        content.append("")
        
        # Sort products by category and name
        products.sort(key=lambda x: (x["category"], x["name"]))
        
        for product in products:
            confidence = product["chemistry"]["confidence"]
            content.append(f"  • {product['name']} ({product['type']}) - {product['category']} - {confidence} confidence")
        
        content.append("")
    
    # Write summary file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(content))
    
    print(f"Chemistry summary table saved to {output_file}")

def main():
    """Generate all chemistry tables."""
    print("Generating chemistry classification tables...")
    
    # Generate different table formats
    generate_chemistry_table()
    generate_markdown_table()
    generate_detailed_table()
    generate_chemistry_summary_table()
    
    print("\nAll chemistry tables generated successfully!")
    print("Files created:")
    print("  - chemistry_table.csv (CSV format)")
    print("  - chemistry_table.md (Markdown format)")
    print("  - detailed_chemistry_table.txt (Detailed text format)")
    print("  - chemistry_summary_table.txt (Summary by chemistry type)")

if __name__ == "__main__":
    main() 