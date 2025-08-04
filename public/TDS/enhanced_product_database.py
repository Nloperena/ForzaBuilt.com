#!/usr/bin/env python3
"""
Enhanced Product Database Extractor
Extracts technical data and classifies products by chemistry/technology type.
"""

import os
import json
import re
import csv
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Any, Optional

class ChemistryClassifier:
    def __init__(self):
        self.chemistry_data = {
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
            "Cyanoacrylates": {
                "description": "'Super glue' class. Rapid anionic polymerization with water/moisture. Forms rigid, strong bonds quickly.",
                "main_attributes": ["fast cure (seconds)", "High strength, thin bond lines", "Brittle"],
                "best_used_for": ["plastics, Metal, rubber, ceramics, skin", "Small parts, instant Bonds", "low temp, low flex"],
                "example_uses": ["electronics, medical (wound closure), Quick repairs, model assembly"]
            },
            "Polyurethane (PU)": {
                "description": "Isocyanate and polyol reaction. Forms flexible, durable polymers. One- & two-part options.",
                "main_attributes": ["strong, elastic", "Handles movement", "Resists weather & Moisture"],
                "best_used_for": ["many substrates: wood, concrete, plastics, Metal, glass", "High/low temp", "Good for flex joints"],
                "example_uses": ["Construction, wood/flooring, automotive, insulation, panel lamination, packaging"]
            },
            "Solvent Based": {
                "description": "polymers dissolved in solvent. Forms film as solvent evaporates. Wide range of chemistries.",
                "main_attributes": ["fast dry", "Good initial tack", "Old school tech"],
                "best_used_for": ["Porous and non-Porous", "Flexible and Rigid Bonds", "Faster handling time"],
                "example_uses": ["Shoes, upholstery, signage, arts/crafts, automotive interior trim"]
            },
            "Water Based": {
                "description": "Emulsion or latex of polymer in water. Dries/Cures as water evaporates. Eco-friendly alternatives.",
                "main_attributes": ["low VOC, safe", "Repositionable until dry", "Limited water resistance"],
                "best_used_for": ["Paper, textiles, wood, foam, Porous substrates", "Not for constant wet/freeze-thaw"],
                "example_uses": ["packaging, bookbinding, furniture, textile lamination, label adhesives"]
            },
            "Silicone": {
                "description": "Polysiloxane base. Cures via Moisture to form Flexible rubber. Remains elastomeric.",
                "main_attributes": ["Extreme temp stability", "Remains Flexible", "UV, Chemical, weather resistant"],
                "best_used_for": ["Glass, metal, ceramic, plastic, stone", "Joint sealing (expansion/contraction)", "High temp, wet environments"],
                "example_uses": ["Construction sealants, electronics, glazing, kitchens/baths, automotive"]
            },
            "Methacrylate/MMA": {
                "description": "acrylic-based, fast-cure adhesives. Cures via free radical mechanism. structural Bonds, some flexibility.",
                "main_attributes": ["strong, impact resistance", "Bonds plastics/composites", "fast fixture"],
                "best_used_for": ["bonding fiberglass, plastics (thermoplastics), composite parts, Metals"],
                "example_uses": ["marine, transportation, sign making, automotive panel bonding"]
            }
        }
    
    def classify_product_chemistry(self, product_name: str, product_code: str, product_type: str) -> Dict[str, Any]:
        """Classify product chemistry based on name, code, and type."""
        
        # Convert to lowercase for easier matching
        name_lower = product_name.lower()
        code_lower = product_code.lower()
        
        # Classification logic based on product patterns
        chemistry_classification = {
            "chemistry_type": "Unknown",
            "confidence": "Low",
            "reasoning": []
        }
        
        # Check for specific chemistry indicators
        if any(indicator in name_lower for indicator in ["silicone", "sil", "si"]):
            chemistry_classification.update({
                "chemistry_type": "Silicone",
                "confidence": "High",
                "reasoning": ["Contains silicone indicators in name"]
            })
        
        elif any(indicator in name_lower for indicator in ["epoxy", "epox"]):
            if any(indicator in name_lower for indicator in ["modified", "flex", "hybrid"]):
                chemistry_classification.update({
                    "chemistry_type": "Modified Epoxies",
                    "confidence": "High",
                    "reasoning": ["Contains epoxy with modification indicators"]
                })
            else:
                chemistry_classification.update({
                    "chemistry_type": "Epoxy",
                    "confidence": "High",
                    "reasoning": ["Contains epoxy indicators"]
                })
        
        elif any(indicator in name_lower for indicator in ["acrylic", "acryl", "psa"]):
            chemistry_classification.update({
                "chemistry_type": "Acrylic (incl. PSA)",
                "confidence": "High",
                "reasoning": ["Contains acrylic/PSA indicators"]
            })
        
        elif any(indicator in name_lower for indicator in ["polyurethane", "pu", "urethane"]):
            chemistry_classification.update({
                "chemistry_type": "Polyurethane (PU)",
                "confidence": "High",
                "reasoning": ["Contains polyurethane indicators"]
            })
        
        elif any(indicator in name_lower for indicator in ["cyanoacrylate", "super glue", "instant"]):
            chemistry_classification.update({
                "chemistry_type": "Cyanoacrylates",
                "confidence": "High",
                "reasoning": ["Contains cyanoacrylate indicators"]
            })
        
        elif any(indicator in name_lower for indicator in ["methacrylate", "mma"]):
            chemistry_classification.update({
                "chemistry_type": "Methacrylate/MMA",
                "confidence": "High",
                "reasoning": ["Contains methacrylate indicators"]
            })
        
        elif any(indicator in name_lower for indicator in ["water", "aqueous", "latex"]):
            chemistry_classification.update({
                "chemistry_type": "Water Based",
                "confidence": "Medium",
                "reasoning": ["Contains water-based indicators"]
            })
        
        elif any(indicator in name_lower for indicator in ["solvent", "solv"]):
            chemistry_classification.update({
                "chemistry_type": "Solvent Based",
                "confidence": "Medium",
                "reasoning": ["Contains solvent-based indicators"]
            })
        
        # Check for MS Polymer/Hybrid indicators
        elif any(indicator in name_lower for indicator in ["ms polymer", "hybrid", "silane", "ms"]):
            chemistry_classification.update({
                "chemistry_type": "Modified Silane (MS Polymer/ Hybrid Polymer)",
                "confidence": "High",
                "reasoning": ["Contains MS polymer/hybrid indicators"]
            })
        
        # Product type-based classification
        elif product_type == "Tape":
            chemistry_classification.update({
                "chemistry_type": "Acrylic (incl. PSA)",
                "confidence": "Medium",
                "reasoning": ["Classified as tape - likely pressure-sensitive adhesive"]
            })
        
        elif product_type == "Hot Melt":
            chemistry_classification.update({
                "chemistry_type": "Solvent Based",
                "confidence": "Medium",
                "reasoning": ["Hot melt products typically use solvent-based technology"]
            })
        
        elif product_type == "Resin":
            chemistry_classification.update({
                "chemistry_type": "Epoxy",
                "confidence": "Medium",
                "reasoning": ["Resin products often use epoxy chemistry"]
            })
        
        elif product_type == "Oil Seal":
            chemistry_classification.update({
                "chemistry_type": "Silicone",
                "confidence": "Medium",
                "reasoning": ["Oil seal products often use silicone chemistry"]
            })
        
        elif product_type == "Oil Adhesive":
            chemistry_classification.update({
                "chemistry_type": "Modified Silane (MS Polymer/ Hybrid Polymer)",
                "confidence": "Medium",
                "reasoning": ["Oil adhesive products often use hybrid polymer technology"]
            })
        
        elif product_type == "Industrial Canister":
            chemistry_classification.update({
                "chemistry_type": "Epoxy",
                "confidence": "Low",
                "reasoning": ["Industrial canister products may use various chemistries"]
            })
        
        # Add chemistry data if classification was found
        if chemistry_classification["chemistry_type"] != "Unknown":
            chemistry_type = chemistry_classification["chemistry_type"]
            if chemistry_type in self.chemistry_data:
                chemistry_classification["chemistry_data"] = self.chemistry_data[chemistry_type]
        
        return chemistry_classification

class EnhancedProductDatabaseExtractor:
    def __init__(self, root_directory: str):
        self.root_directory = Path(root_directory)
        self.chemistry_classifier = ChemistryClassifier()
        self.database = {
            "metadata": {
                "extraction_date": datetime.now().isoformat(),
                "total_products": 0,
                "categories": {},
                "version": "2.0",
                "chemistry_classification": True
            },
            "categories": {},
            "products": {},
            "chemistry_summary": {
                "chemistry_types": {},
                "confidence_levels": {}
            }
        }
        
    def extract_product_info(self, product_path: Path, category: str, subcategory: str = None) -> Dict[str, Any]:
        """Extract product information with chemistry classification."""
        product_name = product_path.name
        
        # Parse product code and type from directory name
        product_code = self._extract_product_code(product_name)
        product_type = self._extract_product_type(product_name)
        
        # Classify chemistry
        chemistry_info = self.chemistry_classifier.classify_product_chemistry(
            product_name, product_code, product_type
        )
        
        product_info = {
            "id": f"{category}_{product_code}",
            "name": product_name,
            "code": product_code,
            "type": product_type,
            "category": category,
            "subcategory": subcategory,
            "chemistry": chemistry_info,
            "files": {
                "sds": [],
                "tds": [],
                "other": []
            },
            "technical_specs": {},
            "metadata": {
                "directory_path": str(product_path),
                "last_modified": datetime.fromtimestamp(product_path.stat().st_mtime).isoformat()
            }
        }
        
        # Extract files
        for file_path in product_path.rglob("*"):
            if file_path.is_file():
                file_info = self._extract_file_info(file_path, product_path)
                if file_info:
                    file_type = file_info["type"]
                    product_info["files"][file_type].append(file_info)
        
        return product_info
    
    def _extract_product_code(self, product_name: str) -> str:
        """Extract product code from directory name."""
        # Handle different naming patterns
        if product_name.startswith("M-") or product_name.startswith("T-") or product_name.startswith("C-"):
            # Marine, Transportation, Construction products
            match = re.search(r'[MT]?C?-([A-Z0-9]+)', product_name)
            if match:
                return match.group(1)
        
        # Handle IC, CA, H, R, T, OS, OA series
        patterns = [
            r'^([A-Z]{1,2}\d{2,4})',  # IC932, CA1000, H103, etc.
            r'^(\d{2}-\d{4})',         # 81-0389
            r'^([A-Z]{2,3}\d{2,4})',   # OS24, OA4, etc.
        ]
        
        for pattern in patterns:
            match = re.search(pattern, product_name)
            if match:
                return match.group(1)
        
        return product_name
    
    def _extract_product_type(self, product_name: str) -> str:
        """Extract product type from directory name."""
        if "IC" in product_name:
            return "Industrial Canister"
        elif "CA" in product_name:
            return "Construction Adhesive"
        elif "H" in product_name and any(c.isdigit() for c in product_name):
            return "Hot Melt"
        elif "R" in product_name and any(c.isdigit() for c in product_name):
            return "Resin"
        elif "T" in product_name and any(c.isdigit() for c in product_name):
            return "Tape"
        elif "OS" in product_name:
            return "Oil Seal"
        elif "OA" in product_name:
            return "Oil Adhesive"
        elif "A" in product_name and any(c.isdigit() for c in product_name):
            return "Adhesive"
        elif "C" in product_name and any(c.isdigit() for c in product_name):
            return "Coating"
        elif "W" in product_name and any(c.isdigit() for c in product_name):
            return "Waterproofing"
        else:
            return "General"
    
    def _extract_file_info(self, file_path: Path, product_path: Path) -> Optional[Dict[str, Any]]:
        """Extract information about a file."""
        file_name = file_path.name.lower()
        relative_path = file_path.relative_to(product_path)
        
        file_info = {
            "name": file_path.name,
            "path": str(relative_path),
            "size_mb": round(file_path.stat().st_size / (1024 * 1024), 2),
            "last_modified": datetime.fromtimestamp(file_path.stat().st_mtime).isoformat()
        }
        
        # Categorize files
        if "sds" in file_name:
            file_info["type"] = "sds"
            file_info["document_type"] = "Safety Data Sheet"
        elif "tds" in file_name:
            file_info["type"] = "tds"
            file_info["document_type"] = "Technical Data Sheet"
        elif file_name.endswith('.pdf'):
            file_info["type"] = "other"
            file_info["document_type"] = "PDF Document"
        else:
            return None
        
        return file_info
    
    def extract_category(self, category_path: Path) -> Dict[str, Any]:
        """Extract all products from a category."""
        category_name = category_path.name
        category_info = {
            "name": category_name,
            "display_name": self._get_category_display_name(category_name),
            "description": self._get_category_description(category_name),
            "products": {},
            "statistics": {
                "total_products": 0,
                "total_files": 0,
                "sds_count": 0,
                "tds_count": 0
            },
            "chemistry_breakdown": {}
        }
        
        # Process each product directory
        for item in category_path.iterdir():
            if item.is_dir() and not item.name.startswith('.'):
                product_info = self.extract_product_info(item, category_name)
                category_info["products"][product_info["id"]] = product_info
                
                # Update statistics
                category_info["statistics"]["total_products"] += 1
                for file_type, files in product_info["files"].items():
                    category_info["statistics"]["total_files"] += len(files)
                    if file_type == "sds":
                        category_info["statistics"]["sds_count"] += len(files)
                    elif file_type == "tds":
                        category_info["statistics"]["tds_count"] += len(files)
                
                # Update chemistry breakdown
                chemistry_type = product_info["chemistry"]["chemistry_type"]
                if chemistry_type not in category_info["chemistry_breakdown"]:
                    category_info["chemistry_breakdown"][chemistry_type] = 0
                category_info["chemistry_breakdown"][chemistry_type] += 1
        
        return category_info
    
    def _get_category_display_name(self, category_name: str) -> str:
        """Get display name for category."""
        display_names = {
            "1. Industrial": "Industrial",
            "2. Marine": "Marine",
            "3. Transportation": "Transportation",
            "4. Composites": "Composites",
            "6. Insulation": "Insulation",
            "7. Construction": "Construction"
        }
        return display_names.get(category_name, category_name)
    
    def _get_category_description(self, category_name: str) -> str:
        """Get description for category."""
        descriptions = {
            "1. Industrial": "Industrial adhesives and sealants for manufacturing and assembly applications",
            "2. Marine": "Marine-grade adhesives and sealants for boat building and repair",
            "3. Transportation": "Transportation adhesives for automotive, aerospace, and vehicle assembly",
            "4. Composites": "Composite materials and adhesives for advanced material applications",
            "6. Insulation": "Insulation materials and adhesives for thermal and acoustic applications",
            "7. Construction": "Construction adhesives and sealants for building and infrastructure"
        }
        return descriptions.get(category_name, "Product category")
    
    def extract_all(self) -> Dict[str, Any]:
        """Extract all product data from the root directory."""
        print("Starting enhanced product database extraction...")
        
        # Process each category
        for category_path in self.root_directory.iterdir():
            if category_path.is_dir() and not category_path.name.startswith('.'):
                print(f"Processing category: {category_path.name}")
                category_info = self.extract_category(category_path)
                self.database["categories"][category_path.name] = category_info
                
                # Add products to main products dictionary
                for product_id, product_info in category_info["products"].items():
                    self.database["products"][product_id] = product_info
        
        # Update metadata and generate chemistry summary
        self.database["metadata"]["total_products"] = len(self.database["products"])
        self.database["metadata"]["categories"] = {
            name: {
                "product_count": info["statistics"]["total_products"],
                "file_count": info["statistics"]["total_files"]
            }
            for name, info in self.database["categories"].items()
        }
        
        # Generate chemistry summary
        self._generate_chemistry_summary()
        
        print(f"Extraction complete! Found {self.database['metadata']['total_products']} products across {len(self.database['categories'])} categories.")
        return self.database
    
    def _generate_chemistry_summary(self):
        """Generate summary of chemistry classifications."""
        chemistry_counts = {}
        confidence_counts = {}
        
        for product_id, product_info in self.database["products"].items():
            chemistry_type = product_info["chemistry"]["chemistry_type"]
            confidence = product_info["chemistry"]["confidence"]
            
            if chemistry_type not in chemistry_counts:
                chemistry_counts[chemistry_type] = 0
            chemistry_counts[chemistry_type] += 1
            
            if confidence not in confidence_counts:
                confidence_counts[confidence] = 0
            confidence_counts[confidence] += 1
        
        self.database["chemistry_summary"]["chemistry_types"] = chemistry_counts
        self.database["chemistry_summary"]["confidence_levels"] = confidence_counts
    
    def save_database(self, output_file: str = "enhanced_product_database.json"):
        """Save the database to a JSON file."""
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(self.database, f, indent=2, ensure_ascii=False)
        print(f"Enhanced database saved to {output_file}")
    
    def generate_chemistry_report(self, output_file: str = "chemistry_report.json"):
        """Generate a detailed chemistry report."""
        report = {
            "summary": self.database["chemistry_summary"],
            "chemistry_details": {},
            "category_chemistry": {},
            "recommendations": []
        }
        
        # Add chemistry details
        for chemistry_type, count in self.database["chemistry_summary"]["chemistry_types"].items():
            if chemistry_type in self.chemistry_classifier.chemistry_data:
                report["chemistry_details"][chemistry_type] = {
                    "count": count,
                    "percentage": (count / self.database["metadata"]["total_products"]) * 100,
                    "data": self.chemistry_classifier.chemistry_data[chemistry_type]
                }
        
        # Add category chemistry breakdown
        for category_name, category_info in self.database["categories"].items():
            report["category_chemistry"][category_name] = {
                "display_name": category_info["display_name"],
                "chemistry_breakdown": category_info["chemistry_breakdown"]
            }
        
        # Generate recommendations
        unknown_count = self.database["chemistry_summary"]["chemistry_types"].get("Unknown", 0)
        if unknown_count > 0:
            report["recommendations"].append(f"Review {unknown_count} products with unknown chemistry classification")
        
        low_confidence_count = self.database["chemistry_summary"]["confidence_levels"].get("Low", 0)
        if low_confidence_count > 0:
            report["recommendations"].append(f"Review {low_confidence_count} products with low confidence chemistry classification")
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        print(f"Chemistry report saved to {output_file}")

def main():
    """Main function to extract the enhanced product database."""
    # Initialize extractor
    extractor = EnhancedProductDatabaseExtractor(".")
    
    # Extract all data
    database = extractor.extract_all()
    
    # Save database
    extractor.save_database("enhanced_product_database.json")
    
    # Generate chemistry report
    extractor.generate_chemistry_report("chemistry_report.json")
    
    # Print summary
    print("\nEnhanced Database Summary:")
    print(f"Total Products: {database['metadata']['total_products']}")
    print(f"Chemistry Types: {len(database['chemistry_summary']['chemistry_types'])}")
    print(f"Chemistry Breakdown: {database['chemistry_summary']['chemistry_types']}")
    print(f"Confidence Levels: {database['chemistry_summary']['confidence_levels']}")

if __name__ == "__main__":
    main() 