#!/usr/bin/env python3
"""
Chemistry Summary Table Generator
Creates a clean, readable summary table from chemistry analysis results.
"""

import csv
import json
from collections import Counter, defaultdict

def load_chemistry_data():
    """Load chemistry data from CSV file."""
    results = []
    try:
        with open("comprehensive_chemistry_table.csv", 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                results.append(row)
    except FileNotFoundError:
        print("No chemistry table found. Please run the analysis first.")
        return []
    
    return results

def generate_summary_table(results):
    """Generate a clean summary table."""
    
    # Group by chemistry type
    chemistry_groups = defaultdict(list)
    for result in results:
        chemistry_type = result["Chemistry Type"]
        chemistry_groups[chemistry_type].append(result)
    
    # Create summary table
    summary_data = []
    
    for chemistry_type, products in chemistry_groups.items():
        # Count by category
        category_counts = Counter(product["Category"] for product in products)
        
        # Get confidence levels
        confidence_counts = Counter(product["Confidence Level"] for product in products)
        
        # Get sample products (first 5)
        sample_products = [p["Product Name"] for p in products[:5]]
        
        summary_data.append({
            "Chemistry Type": chemistry_type,
            "Total Products": len(products),
            "High Confidence": confidence_counts.get("High", 0),
            "Medium Confidence": confidence_counts.get("Medium", 0),
            "Low Confidence": confidence_counts.get("Low", 0),
            "Sample Products": ", ".join(sample_products),
            "Categories": ", ".join([f"{cat}: {count}" for cat, count in category_counts.items()])
        })
    
    # Sort by total products (descending)
    summary_data.sort(key=lambda x: x["Total Products"], reverse=True)
    
    return summary_data

def save_summary_table(summary_data, filename="chemistry_summary_table.csv"):
    """Save summary table to CSV."""
    
    with open(filename, 'w', newline='', encoding='utf-8') as f:
        fieldnames = [
            "Chemistry Type", "Total Products", "High Confidence", 
            "Medium Confidence", "Low Confidence", "Sample Products", "Categories"
        ]
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        
        for row in summary_data:
            writer.writerow(row)
    
    print(f"Summary table saved to {filename}")

def print_summary_report(summary_data):
    """Print a formatted summary report."""
    
    print("=" * 80)
    print("CHEMISTRY ANALYSIS SUMMARY REPORT")
    print("=" * 80)
    
    total_products = sum(row["Total Products"] for row in summary_data)
    
    print(f"\n📊 OVERALL STATISTICS:")
    print(f"   Total Products Analyzed: {total_products}")
    print(f"   Chemistry Types Identified: {len(summary_data)}")
    
    print(f"\n🧪 CHEMISTRY BREAKDOWN:")
    for row in summary_data:
        percentage = (row["Total Products"] / total_products) * 100
        print(f"   {row['Chemistry Type']}: {row['Total Products']} products ({percentage:.1f}%)")
        print(f"     - High Confidence: {row['High Confidence']}")
        print(f"     - Medium Confidence: {row['Medium Confidence']}")
        print(f"     - Low Confidence: {row['Low Confidence']}")
        print(f"     - Sample Products: {row['Sample Products']}")
        print(f"     - Categories: {row['Categories']}")
        print()
    
    # Confidence summary
    total_high = sum(row["High Confidence"] for row in summary_data)
    total_medium = sum(row["Medium Confidence"] for row in summary_data)
    total_low = sum(row["Low Confidence"] for row in summary_data)
    
    print(f"🎯 CONFIDENCE SUMMARY:")
    print(f"   High Confidence: {total_high} products ({(total_high/total_products)*100:.1f}%)")
    print(f"   Medium Confidence: {total_medium} products ({(total_medium/total_products)*100:.1f}%)")
    print(f"   Low Confidence: {total_low} products ({(total_low/total_products)*100:.1f}%)")

def create_detailed_table(results):
    """Create a detailed table with all products."""
    
    # Sort by category and product name
    results.sort(key=lambda x: (x["Category"], x["Product Name"]))
    
    with open("detailed_chemistry_table.csv", 'w', newline='', encoding='utf-8') as f:
        fieldnames = [
            "Category", "Product Name", "Chemistry Type", "Confidence Level", 
            "Score", "Reasoning"
        ]
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        
        for result in results:
            writer.writerow({
                "Category": result["Category"],
                "Product Name": result["Product Name"],
                "Chemistry Type": result["Chemistry Type"],
                "Confidence Level": result["Confidence Level"],
                "Score": result["Score"],
                "Reasoning": result["Reasoning"]
            })
    
    print("Detailed table saved to detailed_chemistry_table.csv")

def main():
    """Main function."""
    
    print("📋 CHEMISTRY SUMMARY TABLE GENERATOR")
    print("=" * 50)
    
    # Load data
    results = load_chemistry_data()
    
    if not results:
        return
    
    print(f"Loaded {len(results)} product records")
    
    # Generate summary
    summary_data = generate_summary_table(results)
    
    # Save summary table
    save_summary_table(summary_data)
    
    # Print report
    print_summary_report(summary_data)
    
    # Create detailed table
    create_detailed_table(results)
    
    print(f"\n✅ Summary generation complete!")
    print("📁 Files created:")
    print("   - chemistry_summary_table.csv")
    print("   - detailed_chemistry_table.csv")

if __name__ == "__main__":
    main() 