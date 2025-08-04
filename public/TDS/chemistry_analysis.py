#!/usr/bin/env python3
"""
Chemistry Analysis Script
Provides detailed analysis of product chemistry classifications.
"""

import json
from collections import Counter

def analyze_chemistry_classifications(database_file: str = "enhanced_product_database.json"):
    """Analyze the chemistry classifications in detail."""
    
    with open(database_file, 'r', encoding='utf-8') as f:
        database = json.load(f)
    
    print("=" * 80)
    print("CHEMISTRY CLASSIFICATION ANALYSIS")
    print("=" * 80)
    
    # Basic chemistry statistics
    chemistry_summary = database["chemistry_summary"]
    print(f"\n📊 CHEMISTRY BREAKDOWN:")
    total_products = database["metadata"]["total_products"]
    
    for chemistry_type, count in chemistry_summary["chemistry_types"].items():
        percentage = (count / total_products) * 100
        print(f"   {chemistry_type}: {count} products ({percentage:.1f}%)")
    
    print(f"\n🎯 CONFIDENCE LEVELS:")
    for confidence, count in chemistry_summary["confidence_levels"].items():
        percentage = (count / total_products) * 100
        print(f"   {confidence}: {count} products ({percentage:.1f}%)")
    
    # Category chemistry breakdown
    print(f"\n📁 CHEMISTRY BY CATEGORY:")
    for category_name, category_info in database["categories"].items():
        print(f"\n   {category_info['display_name']}:")
        chemistry_breakdown = category_info["chemistry_breakdown"]
        for chemistry_type, count in chemistry_breakdown.items():
            percentage = (count / category_info["statistics"]["total_products"]) * 100
            print(f"     - {chemistry_type}: {count} ({percentage:.1f}%)")
    
    # Show sample products for each chemistry type
    print(f"\n🔬 SAMPLE PRODUCTS BY CHEMISTRY TYPE:")
    
    chemistry_products = {}
    for product_id, product_info in database["products"].items():
        chemistry_type = product_info["chemistry"]["chemistry_type"]
        if chemistry_type not in chemistry_products:
            chemistry_products[chemistry_type] = []
        chemistry_products[chemistry_type].append(product_info)
    
    for chemistry_type, products in chemistry_products.items():
        print(f"\n   {chemistry_type} ({len(products)} products):")
        for i, product in enumerate(products[:5], 1):
            confidence = product["chemistry"]["confidence"]
            reasoning = ", ".join(product["chemistry"]["reasoning"])
            print(f"     {i}. {product['name']} ({product['type']}) - {confidence} confidence")
            print(f"        Reasoning: {reasoning}")
        if len(products) > 5:
            print(f"        ... and {len(products) - 5} more products")
    
    # Show products with unknown chemistry
    unknown_products = chemistry_products.get("Unknown", [])
    if unknown_products:
        print(f"\n❓ PRODUCTS WITH UNKNOWN CHEMISTRY ({len(unknown_products)}):")
        for i, product in enumerate(unknown_products[:10], 1):
            print(f"     {i}. {product['name']} ({product['type']}) - {product['category']}")
        if len(unknown_products) > 10:
            print(f"        ... and {len(unknown_products) - 10} more")
    
    # Show products with low confidence
    low_confidence_products = []
    for product_id, product_info in database["products"].items():
        if product_info["chemistry"]["confidence"] == "Low":
            low_confidence_products.append(product_info)
    
    if low_confidence_products:
        print(f"\n⚠️  PRODUCTS WITH LOW CONFIDENCE ({len(low_confidence_products)}):")
        for i, product in enumerate(low_confidence_products[:10], 1):
            chemistry_type = product["chemistry"]["chemistry_type"]
            reasoning = ", ".join(product["chemistry"]["reasoning"])
            print(f"     {i}. {product['name']} ({product['type']}) - {chemistry_type}")
            print(f"        Reasoning: {reasoning}")
        if len(low_confidence_products) > 10:
            print(f"        ... and {len(low_confidence_products) - 10} more")
    
    # Chemistry data for each type
    print(f"\n🧪 CHEMISTRY TECHNOLOGY DETAILS:")
    
    chemistry_data = {
        "Acrylic (incl. PSA)": {
            "description": "Made from acrylic polymers/resins. Bonds via free radical polymerization. Often pressure-sensitive (PSA).",
            "main_attributes": ["Durable", "Good UV/weather resistance", "Flexible"],
            "best_used_for": ["Metal, glass, plastics, rubber", "High/low temp tolerant", "Moisture, UV resistant", "Quick handling & fast strength"],
            "example_uses": ["Construction, labeling, automotive, tape, electronic assembly, medical devices, advertising"]
        },
        "Epoxy": {
            "description": "Thermosetting resin with amine/acid hardener. Chemical crosslinking during cure. Very strong covalent bonds.",
            "main_attributes": ["High strength & durability", "Excellent Chemical resistance", "Rigid"],
            "best_used_for": ["Metals, composites, concrete, wood, some plastics", "High/low temp", "Minimal flex", "Slow to moderate cure time"],
            "example_uses": ["Aerospace, automotive, electronics, Construction, marine, electrical potting"]
        },
        "Modified Epoxies": {
            "description": "Epoxy resin blended with flexibility modifiers or fillers.",
            "main_attributes": ["Combines Epoxy strength with improved flexibility or speed"],
            "best_used_for": ["Metal, composites needing more flexibility or peel strength"],
            "example_uses": ["automotive, Construction, Flexible joints, pumpable Epoxy coatings"]
        },
        "Modified Silane (MS Polymer/ Hybrid Polymer)": {
            "description": "Silane-terminated polyether or polyurethane blends. Chemically Bonds to many substrates. Cures with moisture.",
            "main_attributes": ["Blends flexibility, strength, & weatherability", "Paintable"],
            "best_used_for": ["Wide range: glass, Metal, plastics, concrete, composites", "Alt for silicone or PU", "Exterior and interior use"],
            "example_uses": ["Construction, marine, automotive, panel bonding, structural sealing"]
        },
        "Silicone": {
            "description": "Polysiloxane base. Cures via Moisture to form Flexible rubber. Remains elastomeric.",
            "main_attributes": ["Extreme temp stability", "Remains Flexible", "UV, Chemical, weather resistant"],
            "best_used_for": ["Glass, metal, ceramic, plastic, stone", "Joint sealing (expansion/contraction)", "High temp, wet environments"],
            "example_uses": ["Construction sealants, electronics, glazing, kitchens/baths, automotive"]
        },
        "Solvent Based": {
            "description": "polymers dissolved in solvent. Forms film as solvent evaporates. Wide range of chemistries.",
            "main_attributes": ["fast dry", "Good initial tack", "Old school tech"],
            "best_used_for": ["Porous and non-Porous", "Flexible and Rigid Bonds", "Faster handling time"],
            "example_uses": ["Shoes, upholstery, signage, arts/crafts, automotive interior trim"]
        }
    }
    
    for chemistry_type, data in chemistry_data.items():
        count = chemistry_summary["chemistry_types"].get(chemistry_type, 0)
        if count > 0:
            print(f"\n   {chemistry_type} ({count} products):")
            print(f"     Description: {data['description']}")
            print(f"     Main Attributes: {', '.join(data['main_attributes'])}")
            print(f"     Best Used For: {', '.join(data['best_used_for'])}")
            print(f"     Example Uses: {', '.join(data['example_uses'])}")
    
    print(f"\n" + "=" * 80)
    print("Chemistry analysis complete!")
    print("=" * 80)

def generate_chemistry_recommendations(database_file: str = "enhanced_product_database.json"):
    """Generate recommendations for improving chemistry classifications."""
    
    with open(database_file, 'r', encoding='utf-8') as f:
        database = json.load(f)
    
    print(f"\n💡 CHEMISTRY CLASSIFICATION RECOMMENDATIONS:")
    
    # Check for unknown classifications
    unknown_count = database["chemistry_summary"]["chemistry_types"].get("Unknown", 0)
    if unknown_count > 0:
        print(f"   ⚠️  {unknown_count} products have unknown chemistry classification")
        print(f"      - Review product names and codes for chemistry indicators")
        print(f"      - Consider manual classification for these products")
    
    # Check for low confidence classifications
    low_confidence_count = database["chemistry_summary"]["confidence_levels"].get("Low", 0)
    if low_confidence_count > 0:
        print(f"   ⚠️  {low_confidence_count} products have low confidence chemistry classification")
        print(f"      - Review product documentation for chemistry information")
        print(f"      - Consider updating product naming conventions")
    
    # Check for category-specific patterns
    print(f"\n   📊 Category Chemistry Patterns:")
    for category_name, category_info in database["categories"].items():
        chemistry_breakdown = category_info["chemistry_breakdown"]
        dominant_chemistry = max(chemistry_breakdown.items(), key=lambda x: x[1])
        print(f"      {category_info['display_name']}: {dominant_chemistry[0]} ({dominant_chemistry[1]} products)")
    
    # Suggest improvements
    print(f"\n   🔧 Suggested Improvements:")
    print(f"      - Add chemistry indicators to product names where possible")
    print(f"      - Standardize product naming conventions")
    print(f"      - Review SDS/TDS documents for chemistry information")
    print(f"      - Consider adding chemistry tags to product metadata")

if __name__ == "__main__":
    analyze_chemistry_classifications()
    generate_chemistry_recommendations() 