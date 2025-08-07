#!/usr/bin/env python3
"""
Comprehensive Chemistry Analysis Script
Analyzes PDF files to identify product chemistries based on content and naming patterns.
"""

import os
import json
import re
from pathlib import Path
from collections import defaultdict, Counter
import csv

# Chemistry keywords and patterns for identification
CHEMISTRY_PATTERNS = {
    "Acrylic (incl. PSA)": {
        "keywords": ["acrylic", "acrylate", "psa", "pressure sensitive", "acrylic polymer", "acrylic resin"],
        "product_patterns": ["T", "TA", "A"],  # Tape and Adhesive products
        "confidence_boosters": ["pressure sensitive adhesive", "acrylic adhesive", "tape adhesive"]
    },
    "Epoxy": {
        "keywords": ["epoxy", "epoxide", "amine", "hardener", "part a", "part b", "two component"],
        "product_patterns": ["R", "IC"],  # Resin and Industrial Canister products
        "confidence_boosters": ["epoxy resin", "epoxy adhesive", "two-part epoxy"]
    },
    "Modified Epoxies": {
        "keywords": ["modified epoxy", "flexible epoxy", "epoxy blend", "epoxy hybrid"],
        "product_patterns": ["R"],
        "confidence_boosters": ["modified epoxy", "flexible epoxy resin"]
    },
    "Modified Silane (MS Polymer/ Hybrid Polymer)": {
        "keywords": ["silane", "ms polymer", "hybrid polymer", "silyl", "moisture cure", "hybrid adhesive"],
        "product_patterns": ["OA"],  # Oil Adhesive products
        "confidence_boosters": ["silane terminated", "hybrid polymer", "ms polymer"]
    },
    "Cyanoacrylates": {
        "keywords": ["cyanoacrylate", "super glue", "instant adhesive", "ca glue", "cyano"],
        "product_patterns": [],
        "confidence_boosters": ["cyanoacrylate adhesive", "instant bond", "super glue"]
    },
    "Polyurethane (PU)": {
        "keywords": ["polyurethane", "pu", "isocyanate", "polyol", "urethane"],
        "product_patterns": [],
        "confidence_boosters": ["polyurethane adhesive", "pu adhesive", "urethane adhesive"]
    },
    "Solvent Based": {
        "keywords": ["solvent", "solvent based", "organic solvent", "volatile", "evaporate"],
        "product_patterns": ["H"],  # Hot Melt products
        "confidence_boosters": ["solvent based adhesive", "organic solvent"]
    },
    "Water Based": {
        "keywords": ["water based", "aqueous", "emulsion", "latex", "waterborne"],
        "product_patterns": [],
        "confidence_boosters": ["water based adhesive", "aqueous adhesive", "emulsion adhesive"]
    },
    "Silicone": {
        "keywords": ["silicone", "siloxane", "polysiloxane", "silicone sealant"],
        "product_patterns": ["OS"],  # Oil Seal products
        "confidence_boosters": ["silicone sealant", "silicone adhesive", "polysiloxane"]
    },
    "Methacrylate/MMA": {
        "keywords": ["methacrylate", "mma", "methyl methacrylate", "structural adhesive"],
        "product_patterns": [],
        "confidence_boosters": ["methacrylate adhesive", "mma adhesive", "structural adhesive"]
    },
    "HotMelt": {
        "keywords": ["hot melt", "hotmelt", "thermoplastic", "melt adhesive"],
        "product_patterns": ["H"],  # Hot Melt products
        "confidence_boosters": ["hot melt adhesive", "thermoplastic adhesive"]
    }
}

def extract_text_from_pdf(pdf_path):
    """Extract text content from PDF file."""
    try:
        import PyPDF2
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + " "
            return text.lower()
    except ImportError:
        print(f"PyPDF2 not available, skipping text extraction for {pdf_path}")
        return ""
    except Exception as e:
        print(f"Error reading PDF {pdf_path}: {e}")
        return ""

def analyze_product_chemistry(product_folder, product_name, category):
    """Analyze a product folder to determine its chemistry type."""
    
    # Initialize analysis results
    chemistry_scores = defaultdict(int)
    reasoning = []
    confidence = "Low"
    
    # Check product naming patterns
    for chemistry_type, patterns in CHEMISTRY_PATTERNS.items():
        for pattern in patterns["product_patterns"]:
            if product_name.startswith(pattern):
                chemistry_scores[chemistry_type] += 5
                reasoning.append(f"Product name pattern '{pattern}' suggests {chemistry_type}")
    
    # Analyze PDF files in the folder
    pdf_files = []
    for root, dirs, files in os.walk(product_folder):
        for file in files:
            if file.lower().endswith('.pdf'):
                pdf_files.append(os.path.join(root, file))
    
    # Extract text from PDFs and analyze
    all_text = ""
    for pdf_file in pdf_files:
        text = extract_text_from_pdf(pdf_file)
        all_text += text + " "
    
    # Score based on keyword matches
    for chemistry_type, patterns in CHEMISTRY_PATTERNS.items():
        for keyword in patterns["keywords"]:
            if keyword in all_text:
                chemistry_scores[chemistry_type] += 2
                reasoning.append(f"Found keyword '{keyword}' in PDF content")
        
        for booster in patterns["confidence_boosters"]:
            if booster in all_text:
                chemistry_scores[chemistry_type] += 5
                reasoning.append(f"Found strong indicator '{booster}' in PDF content")
    
    # Determine the best chemistry type
    if chemistry_scores:
        best_chemistry = max(chemistry_scores.items(), key=lambda x: x[1])
        chemistry_type = best_chemistry[0]
        score = best_chemistry[1]
        
        # Set confidence based on score
        if score >= 10:
            confidence = "High"
        elif score >= 5:
            confidence = "Medium"
        else:
            confidence = "Low"
            chemistry_type = "Unknown"
    else:
        chemistry_type = "Unknown"
        reasoning.append("No chemistry indicators found in product files")
    
    return {
        "chemistry_type": chemistry_type,
        "confidence": confidence,
        "reasoning": reasoning,
        "score": max(chemistry_scores.values()) if chemistry_scores else 0
    }

def scan_all_products():
    """Scan all product folders and analyze chemistries."""
    
    results = []
    categories = ["1. Industrial", "2. Marine", "3. Transportation", "4. Composites", "6. Insulation", "7. Construction"]
    
    for category in categories:
        category_path = Path(category)
        if not category_path.exists():
            continue
            
        print(f"Analyzing category: {category}")
        
        for product_folder in category_path.iterdir():
            if product_folder.is_dir():
                product_name = product_folder.name
                
                # Skip empty or system folders
                if product_name.startswith('.') or product_name in ['TDS', 'SDS']:
                    continue
                
                print(f"  Analyzing product: {product_name}")
                
                # Analyze the product
                analysis = analyze_product_chemistry(
                    str(product_folder), 
                    product_name, 
                    category
                )
                
                # Create product record
                product_record = {
                    "product_id": f"{category}_{product_name}",
                    "product_name": product_name,
                    "product_code": product_name,
                    "category": category,
                    "chemistry_type": analysis["chemistry_type"],
                    "confidence": analysis["confidence"],
                    "reasoning": "; ".join(analysis["reasoning"]),
                    "score": analysis["score"]
                }
                
                results.append(product_record)
    
    return results

def generate_chemistry_table(results, output_file="comprehensive_chemistry_table.csv"):
    """Generate a comprehensive chemistry table from analysis results."""
    
    # Sort results by category and product name
    results.sort(key=lambda x: (x["category"], x["product_name"]))
    
    # Write to CSV
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = [
            "Product ID", "Product Name", "Product Code", "Category", 
            "Chemistry Type", "Confidence Level", "Score", "Reasoning"
        ]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        
        for result in results:
            writer.writerow({
                "Product ID": result["product_id"],
                "Product Name": result["product_name"],
                "Product Code": result["product_code"],
                "Category": result["category"],
                "Chemistry Type": result["chemistry_type"],
                "Confidence Level": result["confidence"],
                "Score": result["score"],
                "Reasoning": result["reasoning"]
            })
    
    print(f"Chemistry table saved to {output_file}")
    
    # Generate summary statistics
    chemistry_counts = Counter(result["chemistry_type"] for result in results)
    confidence_counts = Counter(result["confidence"] for result in results)
    
    print(f"\n📊 CHEMISTRY BREAKDOWN:")
    total_products = len(results)
    for chemistry_type, count in chemistry_counts.most_common():
        percentage = (count / total_products) * 100
        print(f"   {chemistry_type}: {count} products ({percentage:.1f}%)")
    
    print(f"\n🎯 CONFIDENCE LEVELS:")
    for confidence, count in confidence_counts.most_common():
        percentage = (count / total_products) * 100
        print(f"   {confidence}: {count} products ({percentage:.1f}%)")
    
    return results

def main():
    """Main function to run the comprehensive chemistry analysis."""
    
    print("🔬 COMPREHENSIVE CHEMISTRY ANALYSIS")
    print("=" * 50)
    
    # Scan all products
    results = scan_all_products()
    
    # Generate chemistry table
    generate_chemistry_table(results)
    
    # Save detailed results to JSON
    with open("comprehensive_chemistry_results.json", 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Analysis complete! Found {len(results)} products.")
    print("📁 Results saved to:")
    print("   - comprehensive_chemistry_table.csv")
    print("   - comprehensive_chemistry_results.json")

if __name__ == "__main__":
    main() 