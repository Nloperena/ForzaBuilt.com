#!/usr/bin/env python3
"""
Product Database Extractor
Extracts technical data from all products in the directory structure
and organizes them into a comprehensive JSON database.
"""

import os
import json
import re
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Any, Optional

class ProductDatabaseExtractor:
    def __init__(self, root_directory: str):
        self.root_directory = Path(root_directory)
        self.database = {
            "metadata": {
                "extraction_date": datetime.now().isoformat(),
                "total_products": 0,
                "categories": {},
                "version": "1.0"
            },
            "categories": {},
            "products": {}
        }
        
    def extract_product_info(self, product_path: Path, category: str, subcategory: str = None) -> Dict[str, Any]:
        """Extract product information from directory structure and files."""
        product_name = product_path.name
        
        # Parse product code and type from directory name
        product_code = self._extract_product_code(product_name)
        product_type = self._extract_product_type(product_name)
        
        product_info = {
            "id": f"{category}_{product_code}",
            "name": product_name,
            "code": product_code,
            "type": product_type,
            "category": category,
            "subcategory": subcategory,
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
            }
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
        print("Starting product database extraction...")
        
        # Process each category
        for category_path in self.root_directory.iterdir():
            if category_path.is_dir() and not category_path.name.startswith('.'):
                print(f"Processing category: {category_path.name}")
                category_info = self.extract_category(category_path)
                self.database["categories"][category_path.name] = category_info
                
                # Add products to main products dictionary
                for product_id, product_info in category_info["products"].items():
                    self.database["products"][product_id] = product_info
        
        # Update metadata
        self.database["metadata"]["total_products"] = len(self.database["products"])
        self.database["metadata"]["categories"] = {
            name: {
                "product_count": info["statistics"]["total_products"],
                "file_count": info["statistics"]["total_files"]
            }
            for name, info in self.database["categories"].items()
        }
        
        print(f"Extraction complete! Found {self.database['metadata']['total_products']} products across {len(self.database['categories'])} categories.")
        return self.database
    
    def save_database(self, output_file: str = "product_database.json"):
        """Save the database to a JSON file."""
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(self.database, f, indent=2, ensure_ascii=False)
        print(f"Database saved to {output_file}")
    
    def generate_summary(self) -> Dict[str, Any]:
        """Generate a summary of the database."""
        summary = {
            "total_products": self.database["metadata"]["total_products"],
            "total_categories": len(self.database["categories"]),
            "category_breakdown": {},
            "file_type_breakdown": {
                "sds": 0,
                "tds": 0,
                "other": 0
            },
            "product_types": {}
        }
        
        for category_name, category_info in self.database["categories"].items():
            summary["category_breakdown"][category_name] = {
                "product_count": category_info["statistics"]["total_products"],
                "file_count": category_info["statistics"]["total_files"]
            }
        
        for product_id, product_info in self.database["products"].items():
            # Count file types
            for file_type, files in product_info["files"].items():
                summary["file_type_breakdown"][file_type] += len(files)
            
            # Count product types
            product_type = product_info["type"]
            summary["product_types"][product_type] = summary["product_types"].get(product_type, 0) + 1
        
        return summary

def main():
    """Main function to extract the product database."""
    # Initialize extractor
    extractor = ProductDatabaseExtractor(".")
    
    # Extract all data
    database = extractor.extract_all()
    
    # Save database
    extractor.save_database("product_database.json")
    
    # Generate and save summary
    summary = extractor.generate_summary()
    with open("database_summary.json", 'w', encoding='utf-8') as f:
        json.dump(summary, f, indent=2, ensure_ascii=False)
    
    print("\nDatabase Summary:")
    print(f"Total Products: {summary['total_products']}")
    print(f"Total Categories: {summary['total_categories']}")
    print(f"File Types: {summary['file_type_breakdown']}")
    print(f"Product Types: {summary['product_types']}")

if __name__ == "__main__":
    main() 