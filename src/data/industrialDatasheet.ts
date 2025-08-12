export interface ProductDatasheet {
  id: string;
  name: string;
  category: 'BOND' | 'SEAL' | 'TAPE';
  industry: string; // Now a single string // Array of industries this product serves
  description: string;
  image: string;
  url: string;
  specifications: {
    type: string;
    viscosity?: string;
    solids?: string;
    flashPoint?: string;
    potLife?: string;
    cureTime?: string;
    temperatureRange?: string;
    // Tape-specific properties
    thickness?: string;
    width?: string;
    length?: string;
    substrates?: string[];
    applications?: string[];
    features?: string[];
    certifications?: string[];
    packaging?: string[];
  };
  technicalData?: {
    density?: string;
    pH?: string;
    color?: string;
    odor?: string;
    shelfLife?: string;
    storageConditions?: string;
    temperatureRange?: string;
    // Tape-specific properties
    adhesiveType?: string;
    foamType?: string;
    peelStrength?: string;
    shearStrength?: string;
  };
  // Additional detailed product information
  benefits?: string[];
  howToUse?: string[];
  colors?: string[];
  sizing?: string[];
  cleanup?: string[];
}

export const industrialDatasheet: ProductDatasheet[] = [
  {
    "id": "tac-734g",
    "name": "TAC-734G – WEB SPRAY HIGH TACK INFUSION MOLDING ADHESIVE",
    "category": "BOND",
    "industry": "composites",
    "description": "High tack infusion molding adhesive specifically designed for marine applications requiring superior bonding strength.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-734G-NEW.png",
    "url": "https://forzabuilt.com/product/tac-734g-web-spray-high-tack-infusion-molding-adhesive/",
    "specifications": {
      "type": "Web Spray Infusion Molding Adhesive",
      "viscosity": "600-900 cps",
      "solids": "18-25%",
      "flashPoint": ">180°F",
      "potLife": "6 hours",
      "cureTime": "8-16 hours",
      "temperatureRange": "-30°F to +160°F",
      "substrates": [
        "Fiberglass",
        "Carbon Fiber",
        "Marine Composites",
        "Structural Foam"
      ],
      "applications": [
        "Boat Hulls",
        "Deck Construction",
        "Marine Equipment",
        "Offshore Structures"
      ],
      "features": [
        "High Tack",
        "Marine Grade",
        "Salt Water Resistant",
        "UV Stable"
      ],
      "certifications": [
        "Marine Approved",
        "VOC Compliant"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.6 lbs/gal",
      "pH": "6.8-7.2",
      "color": "Clear to Light Amber",
      "odor": "Low",
      "shelfLife": "15 months",
      "storageConditions": "Store at 50-80°F, avoid direct sunlight"
    }
  },
  {
    "id": "tac-735r",
    "name": "TAC-735R – MIST SPRAY NO HAPS INFUSION MOLDING ADHESIVE",
    "category": "BOND",
    "industry": "composites",
    "description": "No HAPS infusion molding adhesive for environmentally conscious marine applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-735R-NEW-1024x1024.png",
    "url": "https://forzabuilt.com/product/tac-735r-mist-spray-no-haps-infusion-molding-adhesive/",
    "specifications": {
      "type": "Mist Spray No HAPS Adhesive",
      "viscosity": "400-700 cps",
      "solids": "15-20%",
      "flashPoint": ">160°F",
      "potLife": "4 hours",
      "cureTime": "6-12 hours",
      "temperatureRange": "-20°F to +150°F",
      "substrates": [
        "Fiberglass",
        "Carbon Fiber",
        "Marine Composites"
      ],
      "applications": [
        "Marine Construction",
        "Automotive Parts",
        "Aerospace Components"
      ],
      "features": [
        "No HAPS",
        "Environmentally Friendly",
        "Fast Drying",
        "Resin Compatible"
      ],
      "certifications": [
        "HAPS Free",
        "VOC Compliant"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.2 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "tac-738r",
    "name": "TAC-738R – WEB SPRAY ZERO VOC INFUSION MOLDING ADHESIVE",
    "category": "BOND",
    "industry": "composites",
    "description": "Zero VOC infusion molding adhesive for clean manufacturing in marine applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-738R-NEW.png",
    "url": "https://forzabuilt.com/product/tac-738r-web-spray-zero-voc-infusion-molding-adhesive/",
    "specifications": {
      "type": "Web Spray Zero VOC Adhesive",
      "viscosity": "500-800 cps",
      "solids": "18-25%",
      "flashPoint": ">160°F",
      "potLife": "6 hours",
      "cureTime": "8-16 hours",
      "temperatureRange": "-30°F to +160°F",
      "substrates": [
        "Fiberglass",
        "Carbon Fiber",
        "Marine Composites"
      ],
      "applications": [
        "Marine Construction",
        "Automotive Parts",
        "Aerospace Components"
      ],
      "features": [
        "Zero VOC",
        "Clean Manufacturing",
        "Marine Grade",
        "High Performance"
      ],
      "certifications": [
        "Zero VOC",
        "Marine Approved"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.4 lbs/gal",
      "pH": "6.8-7.2",
      "color": "Clear to Light Amber",
      "odor": "Minimal",
      "shelfLife": "15 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "tac-739r",
    "name": "TAC-739R – MIST SPRAY INFUSION MOLDING ADHESIVE",
    "category": "BOND",
    "industry": "marine",
    "description": "Mist spray infusion molding adhesive for marine and composite applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-739R-NEW-1024x1024.png",
    "url": "https://forzabuilt.com/product/tac-739r-mist-spray-infusion-molding-adhesive/",
    "specifications": {
      "type": "Mist Spray Infusion Molding Adhesive",
      "viscosity": "300-600 cps",
      "solids": "15-20%",
      "flashPoint": ">150°F",
      "potLife": "4 hours",
      "cureTime": "6-12 hours",
      "temperatureRange": "-20°F to +150°F",
      "substrates": [
        "Fiberglass",
        "Carbon Fiber",
        "Marine Composites"
      ],
      "applications": [
        "Marine Construction",
        "Automotive Parts",
        "Aerospace Components"
      ],
      "features": [
        "Low Viscosity",
        "Fast Drying",
        "Resin Compatible",
        "Marine Grade"
      ],
      "certifications": [
        "VOC Compliant",
        "Marine Approved"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.0 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "mc722",
    "name": "MC722 – WEB SPRAY NON-FLAM/NON-METHYLENE CHLORIDE CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "marine",
    "description": "Non-flammable, non-methylene chloride contact adhesive for marine and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/06/MC722-single-5-1024x1024.png",
    "url": "https://forzabuilt.com/product/mc722-web-spray-contact-adhesive-for-infusion-molding/",
    "specifications": {
      "type": "Non-Flammable Contact Adhesive",
      "viscosity": "800-1200 cps",
      "solids": "25-30%",
      "flashPoint": "Non-Flammable",
      "potLife": "8 hours",
      "cureTime": "24-48 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Fiberglass",
        "Metal",
        "Plastic",
        "Wood",
        "Fabric"
      ],
      "applications": [
        "Marine Assembly",
        "Industrial Bonding",
        "Composite Construction"
      ],
      "features": [
        "Non-Flammable",
        "Safe Handling",
        "Marine Grade",
        "Chemical Resistant"
      ],
      "certifications": [
        "Non-Flammable",
        "Marine Approved"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "8.0 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Blue",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container closed"
    }
  },
  {
    "id": "mc723",
    "name": "MC723 – WEB SPRAY CA COMPLIANT MULTI-PURPOSE CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "marine",
    "description": "CA compliant multi-purpose contact adhesive for marine and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/06/MC723-bundle-New-1024x1024.png",
    "url": "https://forzabuilt.com/product/mc723-web-spray-ca-compliant-multi-purpose-contact-adhesive/",
    "specifications": {
      "type": "CA Compliant Contact Adhesive",
      "viscosity": "800-1200 cps",
      "solids": "25-30%",
      "flashPoint": ">200°F",
      "potLife": "8 hours",
      "cureTime": "24-48 hours",
      "temperatureRange": "-40°F to +180°F",
      "substrates": [
        "Wood",
        "Metal",
        "Plastic",
        "Fabric",
        "Foam"
      ],
      "applications": [
        "Marine Assembly",
        "Furniture Manufacturing",
        "Automotive Interior"
      ],
      "features": [
        "CA Compliant",
        "High Bond Strength",
        "Fast Grab",
        "Low VOC"
      ],
      "certifications": [
        "CARB Compliant",
        "VOC Exempt"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "8.2 lbs/gal",
      "pH": "6.5-7.5",
      "color": "Clear to Amber",
      "odor": "Mild",
      "shelfLife": "12 months",
      "storageConditions": "Store at 60-80°F, keep container closed"
    }
  },
  {
    "id": "mc724",
    "name": "MC724 – WEB SPRAY PRESSURE SENSITIVE ADHESIVE",
    "category": "BOND",
    "industry": "marine",
    "description": "Web spray pressure sensitive adhesive for marine and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/10/MC724-bundle-1024x1024.png",
    "url": "https://forzabuilt.com/product/web-spray-pressure-sensitive-adhesive/",
    "specifications": {
      "type": "Pressure Sensitive Adhesive",
      "viscosity": "600-900 cps",
      "solids": "20-25%",
      "flashPoint": ">180°F",
      "potLife": "6 hours",
      "cureTime": "12-24 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Polystyrene",
        "Polyethylene",
        "Polypropylene",
        "Paper",
        "Cardboard"
      ],
      "applications": [
        "Marine Assembly",
        "Packaging",
        "Labeling",
        "Temporary Bonding"
      ],
      "features": [
        "Pressure Sensitive",
        "Low Tack",
        "Repositionable",
        "Clean Release"
      ],
      "certifications": [
        "Food Safe",
        "Low VOC"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.8 lbs/gal",
      "pH": "6.0-7.0",
      "color": "Clear",
      "odor": "Minimal",
      "shelfLife": "18 months",
      "storageConditions": "Store at 50-80°F, avoid freezing"
    }
  },
  {
    "id": "mc737",
    "name": "MC737 – WEB SPRAY STYRENE SAFE PRESSURE SENSITIVE ADHESIVE",
    "category": "BOND",
    "industry": "marine",
    "description": "Styrene safe pressure sensitive adhesive for marine and composite applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/06/A_FORZA_MC737_Canister22L-NEW1-1024x1024.png",
    "url": "https://forzabuilt.com/product/mc737-web-spray-styrene-safe-pressure-sensitive-adhesive/",
    "specifications": {
      "type": "Styrene Safe Pressure Sensitive Adhesive",
      "viscosity": "600-900 cps",
      "solids": "20-25%",
      "flashPoint": ">180°F",
      "potLife": "6 hours",
      "cureTime": "12-24 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Polystyrene",
        "Polyethylene",
        "Polypropylene",
        "Marine Composites"
      ],
      "applications": [
        "Marine Assembly",
        "Composite Construction",
        "Packaging",
        "Labeling"
      ],
      "features": [
        "Styrene Safe",
        "Pressure Sensitive",
        "Marine Grade",
        "Chemical Resistant"
      ],
      "certifications": [
        "Styrene Safe",
        "Marine Approved"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.8 lbs/gal",
      "pH": "6.0-7.0",
      "color": "Clear",
      "odor": "Minimal",
      "shelfLife": "18 months",
      "storageConditions": "Store at 50-80°F, avoid freezing"
    }
  },
  {
    "id": "mc741",
    "name": "MC741 – CA COMPLIANT MULTI-PURPOSE CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "marine",
    "description": "CA compliant multi-purpose contact adhesive for marine and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2025/01/canister-mockup-MC741-1024x1024.png",
    "url": "https://forzabuilt.com/product/mc741-ca-compliant-multi-purpose-contact-adhesive/",
    "specifications": {
      "type": "CA Compliant Contact Adhesive",
      "viscosity": "800-1200 cps",
      "solids": "25-30%",
      "flashPoint": ">200°F",
      "potLife": "8 hours",
      "cureTime": "24-48 hours",
      "temperatureRange": "-40°F to +180°F",
      "substrates": [
        "Wood",
        "Metal",
        "Plastic",
        "Fabric",
        "Foam"
      ],
      "applications": [
        "Marine Assembly",
        "Furniture Manufacturing",
        "Automotive Interior"
      ],
      "features": [
        "CA Compliant",
        "High Bond Strength",
        "Fast Grab",
        "Low VOC"
      ],
      "certifications": [
        "CARB Compliant",
        "VOC Exempt"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "8.2 lbs/gal",
      "pH": "6.5-7.5",
      "color": "Clear to Amber",
      "odor": "Mild",
      "shelfLife": "12 months",
      "storageConditions": "Store at 60-80°F, keep container closed"
    }
  },
  {
    "id": "m-os764",
    "name": "M-OS764 – ULTRA HIGH-STRENGTH HYBRID POLYMER STRUCTURAL ADHESIVE",
    "category": "BOND",
    "industry": "marine",
    "description": "Ultra high-strength hybrid polymer structural adhesive for marine and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/06/AP749_M-OS764_Sausage_NEW-1024x1024.png",
    "url": "https://forzabuilt.com/product/m-os764-non-hazardous-moisture-cure-structural-adhesive/",
    "specifications": {
      "type": "Hybrid Polymer Structural Adhesive",
      "viscosity": "Thixotropic Paste",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "30 minutes",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete"
      ],
      "applications": [
        "Marine Assembly",
        "Automotive Assembly",
        "Construction",
        "Industrial Bonding"
      ],
      "features": [
        "Ultra High Strength",
        "Moisture Cure",
        "Marine Grade",
        "Versatile"
      ],
      "certifications": [
        "VOC Compliant",
        "Marine Approved"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "12.8 lbs/gal",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 40-80°F, keep container sealed"
    }
  },
  {
    "id": "m-oa755",
    "name": "M-OA755 – HIGH-STRENGTH SINGLE-PART HYBRID POLYMER ADHESIVE/SEALANT",
    "category": "BOND",
    "industry": "marine",
    "description": "High-strength single-part hybrid polymer adhesive and sealant for marine applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/06/M-OA755-New.png",
    "url": "https://forzabuilt.com/product/m-oa755-high-strength-single-part-hybrid-performance-polymer/",
    "specifications": {
      "type": "Hybrid Polymer Adhesive/Sealant",
      "viscosity": "Thixotropic Paste",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "30 minutes",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete"
      ],
      "applications": [
        "Marine Assembly",
        "Automotive Assembly",
        "Construction",
        "Industrial Bonding"
      ],
      "features": [
        "High Strength",
        "Single Part",
        "Marine Grade",
        "Versatile"
      ],
      "certifications": [
        "VOC Compliant",
        "Marine Approved"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "12.5 lbs/gal",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 40-80°F, keep container sealed"
    }
  },
  {
    "id": "m-r420",
    "name": "M-R420 – EPOXY QUICK-SET TWO-PART ADHESIVE",
    "category": "BOND",
    "industry": "marine",
    "description": "Epoxy quick-set two-part adhesive for rapid marine and industrial assembly.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/06/M-R420-NEW.png",
    "url": "https://forzabuilt.com/product/m-r420-epoxy-quick-set-two-part-adhesive/",
    "specifications": {
      "type": "Two-Part Epoxy Adhesive",
      "viscosity": "Paste",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "5 minutes",
      "cureTime": "30 minutes",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Wood",
        "Ceramic",
        "Glass"
      ],
      "applications": [
        "Marine Assembly",
        "Industrial Assembly",
        "Equipment Repair",
        "Automotive Repair"
      ],
      "features": [
        "Quick Setting",
        "High Tack Strength",
        "Structural Bond",
        "Chemical Resistant"
      ],
      "certifications": [
        "Structural Bond",
        "Marine Approved"
      ],
      "packaging": [
        "50 ml Dual Cartridge",
        "200 ml Dual Cartridge",
        "400 ml Dual Cartridge"
      ]
    },
    "technicalData": {
      "density": "12.0 lbs/gal",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 40-80°F, keep container sealed"
    }
  },
  {
    "id": "m-r445",
    "name": "M-R445 – TWO-PART EPOXY ADHESIVE",
    "category": "BOND",
    "industry": "marine",
    "description": "Two-part epoxy adhesive for marine and industrial structural bonding.",
    "image": "https://forzabuilt.com/wp-content/uploads/2025/03/M-R445-.png",
    "url": "https://forzabuilt.com/product/m-r445-two-part-modified-epoxy-adhesive/",
    "specifications": {
      "type": "Two-Part Epoxy Adhesive",
      "viscosity": "Paste",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "20 minutes",
      "cureTime": "4-8 hours",
      "temperatureRange": "-40°F to +250°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Wood",
        "Ceramic",
        "Composite"
      ],
      "applications": [
        "Marine Assembly",
        "Structural Bonding",
        "Industrial Assembly",
        "Equipment Repair"
      ],
      "features": [
        "1:1 Mix Ratio",
        "High Strength",
        "Chemical Resistant",
        "Temperature Resistant"
      ],
      "certifications": [
        "Structural Bond",
        "Marine Approved"
      ],
      "packaging": [
        "50 ml Dual Cartridge",
        "200 ml Dual Cartridge",
        "400 ml Dual Cartridge"
      ]
    },
    "technicalData": {
      "density": "11.8 lbs/gal",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "15 months",
      "storageConditions": "Store at 40-80°F, keep container sealed"
    }
  },
  {
    "id": "m-osa783",
    "name": "M-OSA783 – ADHESIVE PRIMER & PROMOTER",
    "category": "BOND",
    "industry": "marine",
    "description": "Adhesive primer and promoter for enhanced bonding performance in marine applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/06/M-OSA783-NEW.png",
    "url": "https://forzabuilt.com/product/m-osa783-adhesive-primer-and-promoter/",
    "specifications": {
      "type": "Adhesive Primer and Promoter",
      "viscosity": "Low Viscosity Liquid",
      "solids": "15-20%",
      "flashPoint": ">150°F",
      "potLife": "4 hours",
      "cureTime": "10-15 minutes",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Ceramic",
        "Difficult Surfaces"
      ],
      "applications": [
        "Marine Assembly",
        "Automotive Assembly",
        "Electronics",
        "Industrial Bonding"
      ],
      "features": [
        "Surface Preparation",
        "Enhanced Adhesion",
        "Fast Drying",
        "Marine Grade"
      ],
      "certifications": [
        "Surface Preparation",
        "Marine Approved"
      ],
      "packaging": [
        "8 oz Bottle",
        "1 Gallon",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.5 lbs/gal",
      "pH": "6.0-7.0",
      "color": "Clear to Amber",
      "odor": "Mild",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container closed"
    }
  },
  {
    "id": "m-s750",
    "name": "M-S750 – TAPE PRIMER AND ADHESION PROMOTER",
    "category": "BOND",
    "industry": "marine",
    "description": "Tape primer and adhesion promoter for enhanced bonding performance in marine applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/M-S750.png",
    "url": "https://forzabuilt.com/product/m-s750-tape-primer-and-adhesion-promoter/",
    "specifications": {
      "type": "Tape Primer and Adhesion Promoter",
      "viscosity": "Low Viscosity Liquid",
      "solids": "15-20%",
      "flashPoint": ">150°F",
      "potLife": "4 hours",
      "cureTime": "10-15 minutes",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Ceramic",
        "Difficult Surfaces"
      ],
      "applications": [
        "Marine Assembly",
        "Surface Preparation",
        "Electronics",
        "Industrial Bonding"
      ],
      "features": [
        "Surface Preparation",
        "Enhanced Adhesion",
        "Fast Drying",
        "Marine Grade"
      ],
      "certifications": [
        "Surface Preparation",
        "Marine Approved"
      ],
      "packaging": [
        "8 oz Bottle",
        "1 Gallon",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.5 lbs/gal",
      "pH": "6.0-7.0",
      "color": "Clear to Amber",
      "odor": "Mild",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container closed"
    }
  },
  {
    "id": "m-c280",
    "name": "M-C280 – NEOPRENE CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "marine",
    "description": "Neoprene contact adhesive for marine and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/06/M-C280-NEW.png",
    "url": "https://forzabuilt.com/product/m-c280-neoprene-contact-adhesive/",
    "specifications": {
      "type": "Neoprene Contact Adhesive",
      "viscosity": "1200-1800 cps",
      "solids": "30-35%",
      "flashPoint": ">220°F",
      "potLife": "12 hours",
      "cureTime": "24-48 hours",
      "temperatureRange": "-40°F to +250°F",
      "substrates": [
        "Metal",
        "Rubber",
        "Plastic",
        "Fabric",
        "Leather"
      ],
      "applications": [
        "Marine Assembly",
        "Automotive Assembly",
        "HVAC Systems",
        "High-Temp Bonding"
      ],
      "features": [
        "High Heat Resistance",
        "Chemical Resistant",
        "Flexible Bond",
        "Marine Grade"
      ],
      "certifications": [
        "Heat Resistant",
        "Marine Approved"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "8.8 lbs/gal",
      "pH": "6.5-7.5",
      "color": "Clear to Amber",
      "odor": "Mild",
      "shelfLife": "18 months",
      "storageConditions": "Store at 60-80°F, keep container closed"
    }
  },
  {
    "id": "m-c285",
    "name": "M-C285 – PREMIUM HIGH TEMP NEOPRENE CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "marine",
    "description": "Premium high temperature neoprene contact adhesive for demanding marine applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/06/M-C285-NEW.png",
    "url": "https://forzabuilt.com/product/m-c285-premium-high-temp-neoprene-contact-adhesive/",
    "specifications": {
      "type": "Premium High Temp Neoprene Contact Adhesive",
      "viscosity": "1500-2200 cps",
      "solids": "35-40%",
      "flashPoint": ">250°F",
      "potLife": "12 hours",
      "cureTime": "24-48 hours",
      "temperatureRange": "-40°F to +300°F",
      "substrates": [
        "Metal",
        "Rubber",
        "Plastic",
        "Fabric",
        "Leather"
      ],
      "applications": [
        "Marine Assembly",
        "Automotive Assembly",
        "HVAC Systems",
        "High-Temp Bonding"
      ],
      "features": [
        "Premium Grade",
        "High Heat Resistance",
        "Chemical Resistant",
        "Marine Grade"
      ],
      "certifications": [
        "High Heat Resistant",
        "Marine Approved"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "9.2 lbs/gal",
      "pH": "6.5-7.5",
      "color": "Clear to Amber",
      "odor": "Mild",
      "shelfLife": "18 months",
      "storageConditions": "Store at 60-80°F, keep container closed"
    }
  },
  {
    "id": "ic933",
    "name": "IC933 – CA COMPLIANT MULTI-PURPOSE CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "High-strength contact adhesive compliant with California regulations for industrial bonding applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/03/IC933-bundle-1024x1024.png",
    "url": "https://forzabuilt.com/product/p307-ca-compliant-multi-purpose-contact-adhesive/",
    "specifications": {
      "type": "Contact Adhesive",
      "viscosity": "800-1200 cps",
      "solids": "25-30%",
      "flashPoint": ">200°F",
      "potLife": "8 hours",
      "cureTime": "24-48 hours",
      "temperatureRange": "-40°F to +180°F",
      "substrates": [
        "Wood",
        "Metal",
        "Plastic",
        "Fabric",
        "Foam"
      ],
      "applications": [
        "Furniture Assembly",
        "Automotive Interior",
        "Textile Bonding",
        "Industrial Lamination"
      ],
      "features": [
        "CA Compliant",
        "High Bond Strength",
        "Fast Grab",
        "Low VOC"
      ],
      "certifications": [
        "CARB Compliant",
        "VOC Exempt"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "8.2 lbs/gal",
      "pH": "6.5-7.5",
      "color": "Clear to Amber",
      "odor": "Mild",
      "shelfLife": "12 months",
      "storageConditions": "Store at 60-80°F, keep container closed"
    }
  },
  {
    "id": "ic934",
    "name": "IC934 – SEMI-PRESSURE SENSITIVE WEB SPRAY",
    "category": "BOND",
    "industry": "construction",
    "description": "Semi-pressure sensitive adhesive designed for web spray applications in industrial manufacturing.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/03/IC934-bundle-1024x1024.png",
    "url": "https://forzabuilt.com/product/p322-pressure-sensitive-polystyrene-safe-spray-adhesive/",
    "specifications": {
      "type": "Semi-Pressure Sensitive",
      "viscosity": "600-900 cps",
      "solids": "20-25%",
      "flashPoint": ">180°F",
      "potLife": "6 hours",
      "cureTime": "12-24 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Polystyrene",
        "Polyethylene",
        "Polypropylene",
        "Paper",
        "Cardboard"
      ],
      "applications": [
        "Packaging",
        "Labeling",
        "Temporary Bonding",
        "Assembly"
      ],
      "features": [
        "Polystyrene Safe",
        "Low Tack",
        "Repositionable",
        "Clean Release"
      ],
      "certifications": [
        "Food Safe",
        "Low VOC"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.8 lbs/gal",
      "pH": "6.0-7.0",
      "color": "Clear",
      "odor": "Minimal",
      "shelfLife": "18 months",
      "storageConditions": "Store at 50-80°F, avoid freezing"
    }
  },
  {
    "id": "ic946",
    "name": "IC946 – CA COMPLIANT PRESSURE-SENSITIVE CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "High-solids pressure-sensitive contact adhesive meeting California compliance standards.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/03/IC946-bundle-1024x1024.png",
    "url": "https://forzabuilt.com/product/p329-ca-compliant-high-solids-pressure-sensative-contact-adhesive/",
    "specifications": {
      "type": "Pressure-Sensitive Contact Adhesive",
      "viscosity": "1000-1500 cps",
      "solids": "35-40%",
      "flashPoint": ">200°F",
      "potLife": "10 hours",
      "cureTime": "48-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Wood",
        "Glass",
        "Ceramic"
      ],
      "applications": [
        "Automotive Assembly",
        "Electronics",
        "Construction",
        "Industrial Bonding"
      ],
      "features": [
        "High Solids",
        "CA Compliant",
        "Excellent Adhesion",
        "Chemical Resistance"
      ],
      "certifications": [
        "CARB Compliant",
        "VOC Exempt"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "8.5 lbs/gal",
      "pH": "6.8-7.2",
      "color": "Amber",
      "odor": "Low",
      "shelfLife": "15 months",
      "storageConditions": "Store at 60-80°F, keep sealed"
    }
  },
  {
    "id": "mc739",
    "name": "MC739 – MIST SPRAY ADHESIVE FOR FIBERGLASS INFUSION MOLDING",
    "category": "BOND",
    "industry": "marine",
    "description": "Specialized mist spray adhesive designed for fiberglass infusion molding processes.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/04/ForzaBond-MC739.png",
    "url": "https://forzabuilt.com/product/m30-mist-spray-adhesive-for-fibreglass-infusion-molding/",
    "specifications": {
      "type": "Mist Spray Adhesive",
      "viscosity": "200-400 cps",
      "solids": "15-20%",
      "flashPoint": ">150°F",
      "potLife": "4 hours",
      "cureTime": "6-12 hours",
      "temperatureRange": "-20°F to +150°F",
      "substrates": [
        "Fiberglass",
        "Carbon Fiber",
        "Kevlar",
        "Composite Materials"
      ],
      "applications": [
        "Marine Construction",
        "Automotive Parts",
        "Aerospace Components",
        "Wind Energy"
      ],
      "features": [
        "Low Viscosity",
        "Fast Drying",
        "Resin Compatible",
        "No HAPS"
      ],
      "certifications": [
        "VOC Compliant",
        "HAPS Free"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.2 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "c130",
    "name": "C130 – HIGH HEAT NEOPRENE ADHESIVE",
    "category": "BOND",
    "industry": "industrial",
    "description": "High-temperature neoprene adhesive for demanding industrial applications requiring heat resistance.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/C130-Clear-55-Gallon-1024x1024.png",
    "url": "https://forzabuilt.com/product/c130-high-heat-neoprene-adhesive/",
    "specifications": {
      "type": "Neoprene Contact Adhesive",
      "viscosity": "1200-1800 cps",
      "solids": "30-35%",
      "flashPoint": ">220°F",
      "potLife": "12 hours",
      "cureTime": "24-48 hours",
      "temperatureRange": "-40°F to +250°F",
      "substrates": [
        "Metal",
        "Rubber",
        "Plastic",
        "Fabric",
        "Leather"
      ],
      "applications": [
        "Automotive Assembly",
        "Industrial Equipment",
        "HVAC Systems",
        "High-Temp Bonding"
      ],
      "features": [
        "High Heat Resistance",
        "Chemical Resistant",
        "Flexible Bond",
        "Durable"
      ],
      "certifications": [
        "Heat Resistant",
        "Chemical Resistant"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "8.8 lbs/gal",
      "pH": "6.5-7.5",
      "color": "Clear to Amber",
      "odor": "Mild",
      "shelfLife": "18 months",
      "storageConditions": "Store at 60-80°F, keep container closed"
    }
  },
  {
    "id": "c150",
    "name": "C150 – CA COMPLIANT HIGH SOLIDS CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "industrial",
    "description": "High-solids contact adhesive meeting California compliance standards for industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/C150-CA-COMPLIANT-HIGH-SOLIDS-CONTACT-ADHESIVE-1024x1024.png",
    "url": "https://forzabuilt.com/product/c150-ca-compliant-high-solids-contact-adhesive/",
    "specifications": {
      "type": "High Solids Contact Adhesive",
      "viscosity": "1500-2200 cps",
      "solids": "40-45%",
      "flashPoint": ">200°F",
      "potLife": "10 hours",
      "cureTime": "24-48 hours",
      "temperatureRange": "-40°F to +180°F",
      "substrates": [
        "Wood",
        "Metal",
        "Plastic",
        "Fabric",
        "Foam"
      ],
      "applications": [
        "Furniture Manufacturing",
        "Automotive Interior",
        "Industrial Assembly",
        "Construction"
      ],
      "features": [
        "High Solids Content",
        "CA Compliant",
        "Excellent Adhesion",
        "Low VOC"
      ],
      "certifications": [
        "CARB Compliant",
        "VOC Exempt"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "9.2 lbs/gal",
      "pH": "6.8-7.2",
      "color": "Amber",
      "odor": "Low",
      "shelfLife": "15 months",
      "storageConditions": "Store at 60-80°F, keep sealed"
    }
  },
  {
    "id": "c331",
    "name": "C331 – NON-FLAMMABLE CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "industrial",
    "description": "Non-flammable contact adhesive for safe industrial use in sensitive environments.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/C331-Blue-55-Gallon.png",
    "url": "https://forzabuilt.com/product/c331-non-flammable-contact-adhesive/",
    "specifications": {
      "type": "Non-Flammable Contact Adhesive",
      "viscosity": "800-1200 cps",
      "solids": "25-30%",
      "flashPoint": "Non-Flammable",
      "potLife": "8 hours",
      "cureTime": "24-48 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Wood",
        "Fabric",
        "Paper"
      ],
      "applications": [
        "Electronics Assembly",
        "Aerospace",
        "Medical Equipment",
        "Clean Room Applications"
      ],
      "features": [
        "Non-Flammable",
        "Safe Handling",
        "Low Toxicity",
        "Clean Application"
      ],
      "certifications": [
        "Non-Flammable",
        "Safety Approved"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "8.0 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Blue",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container closed"
    }
  },
  {
    "id": "frp",
    "name": "FRP – ROLLABLE ADHESIVE",
    "category": "BOND",
    "industry": "composites",
    "description": "Hybrid polymer rollable adhesive specifically designed for FRP (Fiber Reinforced Plastic) applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/FRP-Rollable-Adhesive-v2-1024x1024.png",
    "url": "https://forzabuilt.com/product/frp-rollable-adhesive/",
    "specifications": {
      "type": "Hybrid Polymer Rollable Adhesive",
      "viscosity": "2000-3000 cps",
      "solids": "45-50%",
      "flashPoint": ">200°F",
      "potLife": "4 hours",
      "cureTime": "12-24 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "FRP Panels",
        "Fiberglass",
        "Composite Materials",
        "Metal",
        "Wood"
      ],
      "applications": [
        "FRP Installation",
        "Composite Bonding",
        "Industrial Paneling",
        "Structural Bonding"
      ],
      "features": [
        "Rollable Application",
        "High Bond Strength",
        "Chemical Resistant",
        "Weather Resistant"
      ],
      "certifications": [
        "FRP Approved",
        "Structural Bond"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "9.5 lbs/gal",
      "pH": "6.8-7.2",
      "color": "Gray",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 60-80°F, keep container sealed"
    }
  },
  {
    "id": "i1000",
    "name": "I1000 – LOW-MEDIUM VISCOSITY LAMINATING ADHESIVE",
    "category": "BOND",
    "industry": "industrial",
    "description": "Low to medium viscosity laminating adhesive for industrial lamination processes.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/I1000_Tote-1024x1024.png",
    "url": "https://forzabuilt.com/product/i1000-low-medium-viscosity-laminating-adhesive/",
    "specifications": {
      "type": "Laminating Adhesive",
      "viscosity": "500-1000 cps",
      "solids": "20-25%",
      "flashPoint": ">180°F",
      "potLife": "6 hours",
      "cureTime": "8-16 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Paper",
        "Fabric",
        "Film",
        "Foil",
        "Plastic"
      ],
      "applications": [
        "Flexible Packaging",
        "Label Manufacturing",
        "Textile Lamination",
        "Industrial Coating"
      ],
      "features": [
        "Low Viscosity",
        "Fast Drying",
        "Good Penetration",
        "Flexible Bond"
      ],
      "certifications": [
        "Food Safe",
        "Low VOC"
      ],
      "packaging": [
        "5 Gallon",
        "55 Gallon",
        "Totes"
      ]
    },
    "technicalData": {
      "density": "7.8 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Amber",
      "odor": "Low",
      "shelfLife": "15 months",
      "storageConditions": "Store at 50-80°F, keep container closed"
    }
  },
  {
    "id": "oa4",
    "name": "OA4 – HIGH-STRENGTH MOISTURE CURE ECO-FRIENDLY ADHESIVE / SEALANT",
    "category": "BOND",
    "industry": "industrial",
    "description": "High-strength moisture-cure adhesive and sealant with eco-friendly formulation.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/OA4-Cartridge-.png",
    "url": "https://forzabuilt.com/product/oa4-high-strength-eco-friendly-adhesive-sealant/",
    "specifications": {
      "type": "Moisture Cure Adhesive/Sealant",
      "viscosity": "Thixotropic Paste",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "30 minutes",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete"
      ],
      "applications": [
        "Automotive Assembly",
        "Construction",
        "Industrial Bonding",
        "Sealing"
      ],
      "features": [
        "Moisture Cure",
        "Eco-Friendly",
        "High Strength",
        "Versatile"
      ],
      "certifications": [
        "VOC Compliant",
        "Green Product"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "12.5 lbs/gal",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 40-80°F, keep container sealed"
    }
  },
  {
    "id": "oa75",
    "name": "OA75 – TROWELLABLE FLOORING ADHESIVE",
    "category": "BOND",
    "industry": "industrial",
    "description": "Trowellable adhesive specifically formulated for flooring installation applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/OA75-Flooring-Adhesive-v2-1024x1024.png",
    "url": "https://forzabuilt.com/product/trowellable-flooring-adhesive/",
    "specifications": {
      "type": "Trowellable Flooring Adhesive",
      "viscosity": "Thick Paste",
      "solids": "85-90%",
      "flashPoint": "Non-Flammable",
      "potLife": "2 hours",
      "cureTime": "24-48 hours",
      "temperatureRange": "-20°F to +180°F",
      "substrates": [
        "Concrete",
        "Wood Subfloor",
        "Plywood",
        "OSB"
      ],
      "applications": [
        "Flooring Installation",
        "Carpet Bonding",
        "Tile Adhesive",
        "Industrial Flooring"
      ],
      "features": [
        "Trowellable",
        "High Bond Strength",
        "Moisture Resistant",
        "Flexible"
      ],
      "certifications": [
        "Flooring Approved",
        "Moisture Resistant"
      ],
      "packaging": [
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "14.2 lbs/gal",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "oa99",
    "name": "OA99 – BONDING PUTTY",
    "category": "BOND",
    "industry": "industrial",
    "description": "Versatile bonding putty for industrial assembly and repair applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/OA99-55-gal-drum-1024x1024.png",
    "url": "https://forzabuilt.com/product/bonding-putty/",
    "specifications": {
      "type": "Bonding Putty",
      "viscosity": "Putty Consistency",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "45 minutes",
      "cureTime": "4-8 hours",
      "temperatureRange": "-40°F to +250°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Wood",
        "Ceramic",
        "Glass"
      ],
      "applications": [
        "Industrial Assembly",
        "Equipment Repair",
        "Automotive Repair",
        "Construction"
      ],
      "features": [
        "Easy Application",
        "Fast Curing",
        "High Strength",
        "Chemical Resistant"
      ],
      "certifications": [
        "Industrial Grade",
        "Chemical Resistant"
      ],
      "packaging": [
        "1 lb Cartridge",
        "5 lb Cartridge",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "13.5 lbs/gal",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "18 months",
      "storageConditions": "Store at 40-80°F, keep container sealed"
    }
  },
  {
    "id": "osa",
    "name": "OSA – ADHESIVE PRIMER AND PROMOTER",
    "category": "BOND",
    "industry": "industrial",
    "description": "Adhesive primer and promoter for enhanced bonding performance on difficult substrates.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/OSA-Mockup-Dual-Cartridge-1.png",
    "url": "https://forzabuilt.com/product/osa-adhesive-primer-and-promoter/",
    "specifications": {
      "type": "Adhesive Primer and Promoter",
      "viscosity": "Low Viscosity Liquid",
      "solids": "15-20%",
      "flashPoint": ">150°F",
      "potLife": "4 hours",
      "cureTime": "10-15 minutes",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Ceramic",
        "Difficult Surfaces"
      ],
      "applications": [
        "Automotive Assembly",
        "Electronics",
        "Industrial Bonding",
        "Surface Preparation"
      ],
      "features": [
        "Surface Preparation",
        "Enhanced Adhesion",
        "Fast Drying",
        "Versatile"
      ],
      "certifications": [
        "Surface Preparation",
        "Adhesion Promoter"
      ],
      "packaging": [
        "8 oz Bottle",
        "1 Gallon",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.5 lbs/gal",
      "pH": "6.0-7.0",
      "color": "Clear to Amber",
      "odor": "Mild",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container closed"
    }
  },
  {
    "id": "os24",
    "name": "OS24 – HIGH-STRENGTH MOISTURE-CURE SINGLE-PART THIXOTROPIC STRUCTURAL ADHESIVE / SEALANT",
    "category": "BOND",
    "industry": "industrial",
    "description": "High-strength structural adhesive and sealant with thixotropic properties for demanding applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/03/OS24-sausage-1024x1024.png",
    "url": "https://forzabuilt.com/product/os24-moisture-cure-single-part-thixotropic-structural-adhesive-sealant/",
    "specifications": {
      "type": "Structural Adhesive/Sealant",
      "viscosity": "Thixotropic Paste",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "30 minutes",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete"
      ],
      "applications": [
        "Structural Bonding",
        "Automotive Assembly",
        "Construction",
        "Industrial Sealing"
      ],
      "features": [
        "Structural Strength",
        "Moisture Cure",
        "Thixotropic",
        "Versatile"
      ],
      "certifications": [
        "Structural Bond",
        "VOC Compliant"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "12.8 lbs/gal",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 40-80°F, keep container sealed"
    }
  },
  {
    "id": "r160",
    "name": "R160 – EPOXY QUICK-SET HIGH STRENGTH TACK STRENGTH ADHESIVE",
    "category": "BOND",
    "industry": "industrial",
    "description": "Quick-setting epoxy adhesive with high tack strength for rapid industrial assembly.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/R160-Dual-Cartridge-.png",
    "url": "https://forzabuilt.com/product/r160-epoxy-quick-set-high-strength-tack-strip-adhesive/",
    "specifications": {
      "type": "Two-Part Epoxy Adhesive",
      "viscosity": "Paste",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "5 minutes",
      "cureTime": "30 minutes",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Wood",
        "Ceramic",
        "Glass"
      ],
      "applications": [
        "Industrial Assembly",
        "Equipment Repair",
        "Automotive Repair",
        "Construction"
      ],
      "features": [
        "Quick Setting",
        "High Tack Strength",
        "Structural Bond",
        "Chemical Resistant"
      ],
      "certifications": [
        "Structural Bond",
        "Quick Set"
      ],
      "packaging": [
        "50 ml Dual Cartridge",
        "200 ml Dual Cartridge",
        "400 ml Dual Cartridge"
      ]
    },
    "technicalData": {
      "density": "12.0 lbs/gal",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 40-80°F, keep container sealed"
    }
  },
  {
    "id": "r221",
    "name": "R221 – TWO-PART 1:1 MODIFIED EPOXY ADHESIVE",
    "category": "BOND",
    "industry": "industrial",
    "description": "Two-part modified epoxy adhesive with 1:1 mix ratio for structural bonding applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/R221-Dual-Cartridge-1024x1024.png",
    "url": "https://forzabuilt.com/product/r221-two-part-modified-epoxy-adhesive/",
    "specifications": {
      "type": "Two-Part Modified Epoxy",
      "viscosity": "Paste",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "20 minutes",
      "cureTime": "4-8 hours",
      "temperatureRange": "-40°F to +250°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Wood",
        "Ceramic",
        "Composite"
      ],
      "applications": [
        "Structural Bonding",
        "Industrial Assembly",
        "Equipment Repair",
        "Construction"
      ],
      "features": [
        "1:1 Mix Ratio",
        "High Strength",
        "Chemical Resistant",
        "Temperature Resistant"
      ],
      "certifications": [
        "Structural Bond",
        "Chemical Resistant"
      ],
      "packaging": [
        "50 ml Dual Cartridge",
        "200 ml Dual Cartridge",
        "400 ml Dual Cartridge"
      ]
    },
    "technicalData": {
      "density": "11.8 lbs/gal",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "15 months",
      "storageConditions": "Store at 40-80°F, keep container sealed"
    }
  },
  {
    "id": "r519",
    "name": "R519 – FAST ACTING TWO-PART METHACRYLATE ADHESIVE",
    "category": "BOND",
    "industry": "industrial",
    "description": "Fast-acting two-part methacrylate adhesive for rapid industrial assembly and bonding.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/R519-Dual-Cartridge-1024x1024.png",
    "url": "https://forzabuilt.com/product/r519-two-part-methacrylate-adhesive/",
    "specifications": {
      "type": "Two-Part Methacrylate",
      "viscosity": "Liquid",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "3 minutes",
      "cureTime": "10-15 minutes",
      "temperatureRange": "-40°F to +180°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Wood",
        "Ceramic",
        "Glass"
      ],
      "applications": [
        "Rapid Assembly",
        "Industrial Bonding",
        "Equipment Repair",
        "Automotive Assembly"
      ],
      "features": [
        "Fast Acting",
        "High Strength",
        "Rapid Cure",
        "Versatile"
      ],
      "certifications": [
        "Fast Cure",
        "High Strength"
      ],
      "packaging": [
        "50 ml Dual Cartridge",
        "200 ml Dual Cartridge",
        "400 ml Dual Cartridge"
      ]
    },
    "technicalData": {
      "density": "9.2 lbs/gal",
      "pH": "Neutral",
      "color": "Clear to Amber",
      "odor": "Mild",
      "shelfLife": "12 months",
      "storageConditions": "Store at 40-80°F, keep container sealed"
    }
  },
  {
    "id": "r529",
    "name": "R529 – STRUCTURAL ANCHORING EPOXY",
    "category": "BOND",
    "industry": "industrial",
    "description": "Structural anchoring epoxy for heavy-duty industrial anchoring and bonding applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/R529-Structural-Adhesive--240x300.png",
    "url": "https://forzabuilt.com/product/r529-structural-anchoring-epoxy/",
    "specifications": {
      "type": "Structural Anchoring Epoxy",
      "viscosity": "Thick Paste",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "15 minutes",
      "cureTime": "6-12 hours",
      "temperatureRange": "-40°F to +250°F",
      "substrates": [
        "Concrete",
        "Steel",
        "Masonry",
        "Stone",
        "Metal"
      ],
      "applications": [
        "Structural Anchoring",
        "Concrete Repair",
        "Heavy Equipment",
        "Construction"
      ],
      "features": [
        "Structural Strength",
        "High Load Capacity",
        "Chemical Resistant",
        "Weather Resistant"
      ],
      "certifications": [
        "Structural Anchor",
        "High Load"
      ],
      "packaging": [
        "400 ml Dual Cartridge",
        "1 Gallon Kit",
        "5 Gallon Kit"
      ]
    },
    "technicalData": {
      "density": "13.5 lbs/gal",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "18 months",
      "storageConditions": "Store at 40-80°F, keep container sealed"
    }
  },
  {
    "id": "s228",
    "name": "S228 – ADHESIVE PRIMER AND PROMOTER",
    "category": "BOND",
    "industry": "industrial",
    "description": "Adhesive primer and promoter for enhanced bonding performance on various substrates.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/S228-paintcan-mockup-1024x1024.png",
    "url": "https://forzabuilt.com/product/s228-adhesive-primer-and-promoter/",
    "specifications": {
      "type": "Adhesive Primer and Promoter",
      "viscosity": "Low Viscosity Liquid",
      "solids": "15-20%",
      "flashPoint": ">150°F",
      "potLife": "4 hours",
      "cureTime": "10-15 minutes",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Ceramic",
        "Difficult Surfaces"
      ],
      "applications": [
        "Surface Preparation",
        "Automotive Assembly",
        "Electronics",
        "Industrial Bonding"
      ],
      "features": [
        "Surface Preparation",
        "Enhanced Adhesion",
        "Fast Drying",
        "Versatile"
      ],
      "certifications": [
        "Surface Preparation",
        "Adhesion Promoter"
      ],
      "packaging": [
        "1 Quart",
        "1 Gallon",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.5 lbs/gal",
      "pH": "6.0-7.0",
      "color": "Clear to Amber",
      "odor": "Mild",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container closed"
    }
  },
  {
    "id": "fc-car",
    "name": "FC-CAR – CITRUS-BASED ADHESIVE REMOVER / CLEANER",
    "category": "BOND",
    "industry": "industrial",
    "description": "Citrus-based adhesive remover and cleaner for safe removal of adhesives and surface preparation.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/03/FC-CAR-bundle.png",
    "url": "https://forzabuilt.com/product/FC-CAR-citrus-based-adhesive-remover-cleaner/",
    "specifications": {
      "type": "Adhesive Remover and Cleaner",
      "viscosity": "Liquid",
      "solids": "0%",
      "flashPoint": ">150°F",
      "potLife": "Unlimited",
      "cureTime": "N/A",
      "temperatureRange": "40°F to +120°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Fabric"
      ],
      "applications": [
        "Adhesive Removal",
        "Surface Cleaning",
        "Equipment Maintenance",
        "Surface Preparation"
      ],
      "features": [
        "Citrus Based",
        "Safe Handling",
        "Effective Removal",
        "Low Toxicity"
      ],
      "certifications": [
        "Safe Handling",
        "Low Toxicity"
      ],
      "packaging": [
        "16 oz Spray",
        "1 Gallon",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.8 lbs/gal",
      "pH": "6.5-7.5",
      "color": "Clear to Amber",
      "odor": "Citrus",
      "shelfLife": "24 months",
      "storageConditions": "Store at 40-80°F, keep container closed"
    }
  },
  {
    "id": "m-os789",
    "name": "M-OS789 – MULTI-PURPOSE HYBRID POLYMER SEALANT",
    "category": "SEAL",
    "industry": "marine",
    "description": "Multi-purpose hybrid polymer sealant designed for marine applications requiring superior sealing performance.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/06/sausagem-os789-NEW-USE-1024x1024.png",
    "url": "https://forzabuilt.com/product/m-os789-multi-purpose-hybrid-polymer-sealant/",
    "specifications": {
      "type": "Hybrid Polymer Sealant",
      "viscosity": "Thixotropic Paste",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "30 minutes",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Fiberglass"
      ],
      "applications": [
        "Marine Sealing",
        "Boat Hulls",
        "Deck Sealing",
        "Marine Equipment",
        "Offshore Structures"
      ],
      "features": [
        "Marine Grade",
        "Salt Water Resistant",
        "UV Stable",
        "Flexible",
        "Weather Resistant"
      ],
      "certifications": [
        "Marine Approved",
        "VOC Compliant"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "12.8 lbs/gal",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 40-80°F, keep container sealed"
    }
  },
  {
    "id": "m-os796",
    "name": "M-OS796 – FAST-SKIN MULTI-PURPOSE HYBRID POLYMER SEALANT",
    "category": "SEAL",
    "industry": "marine",
    "description": "Fast-skin multi-purpose hybrid polymer sealant for rapid marine sealing applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/06/M-OS796-NEW-819x1024.png",
    "url": "https://forzabuilt.com/product/m-os796-fast-kin-multi-purpose-hybrid-polymer-sealant/",
    "specifications": {
      "type": "Fast-Skin Hybrid Polymer Sealant",
      "viscosity": "Thixotropic Paste",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "20 minutes",
      "cureTime": "12-48 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Fiberglass"
      ],
      "applications": [
        "Marine Sealing",
        "Boat Hulls",
        "Deck Sealing",
        "Marine Equipment",
        "Offshore Structures"
      ],
      "features": [
        "Fast Skin",
        "Marine Grade",
        "Salt Water Resistant",
        "UV Stable",
        "Quick Cure"
      ],
      "certifications": [
        "Marine Approved",
        "VOC Compliant"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "12.5 lbs/gal",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 40-80°F, keep container sealed"
    }
  },
  {
    "id": "m-t815",
    "name": "M-T815 – DOUBLE-COATED ULTRA HIGH-BOND ACRYLIC FOAM TAPE",
    "category": "TAPE",
    "industry": "marine",
    "description": "Double-coated ultra high-bond acrylic foam tape for marine and industrial bonding applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/06/M-T820-NEW-1024x1024.png",
    "url": "https://forzabuilt.com/product/m-t815-double-coated-ultra-high-bond-acrylic-foam-tape/",
    "specifications": {
      "type": "Double-Coated Acrylic Foam Tape",
      "thickness": "0.062\" - 0.125\"",
      "width": "0.5\" - 2\"",
      "length": "36 yards per roll",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Fiberglass",
        "Composite"
      ],
      "applications": [
        "Marine Assembly",
        "Automotive Assembly",
        "Industrial Bonding",
        "Equipment Mounting"
      ],
      "features": [
        "Ultra High Bond",
        "Marine Grade",
        "Salt Water Resistant",
        "UV Stable",
        "Pressure Sensitive"
      ],
      "certifications": [
        "Marine Approved",
        "Automotive Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths",
        "Bulk packaging"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Closed Cell",
      "peelStrength": "60+ oz/in",
      "shearStrength": "100+ psi",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "24 months",
      "storageConditions": "Store at 60-80°F, keep in original packaging"
    }
  },
  {
    "id": "m-t820",
    "name": "M-T820 – DOUBLE-COATED ULTRA HIGH BOND ACRYLIC FOAM TAPE",
    "category": "TAPE",
    "industry": "marine",
    "description": "Double-coated ultra high bond acrylic foam tape for demanding marine and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/06/M-T820-NEW-1024x1024.png",
    "url": "https://forzabuilt.com/product/m-t820-double-coated-ultra-high-bond-acrylic-foam-tape/",
    "specifications": {
      "type": "Double-Coated Acrylic Foam Tape",
      "thickness": "0.062\" - 0.125\"",
      "width": "0.5\" - 2\"",
      "length": "36 yards per roll",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Fiberglass",
        "Composite"
      ],
      "applications": [
        "Marine Assembly",
        "Automotive Assembly",
        "Industrial Bonding",
        "Equipment Mounting"
      ],
      "features": [
        "Ultra High Bond",
        "Marine Grade",
        "Salt Water Resistant",
        "UV Stable",
        "Pressure Sensitive"
      ],
      "certifications": [
        "Marine Approved",
        "Automotive Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths",
        "Bulk packaging"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Closed Cell",
      "peelStrength": "60+ oz/in",
      "shearStrength": "100+ psi",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "24 months",
      "storageConditions": "Store at 60-80°F, keep in original packaging"
    }
  },
  {
    "id": "cc501",
    "name": "CC501 – LOW VOC, CA COMPLIANT, AGGRESSIVE, FAST DRYING PRESSURE SENSITIVE ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "Low VOC, CA compliant pressure sensitive adhesive for construction applications requiring fast drying and aggressive bonding.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/CC501bundle.png",
    "url": "https://forzabuilt.com/product/cc501-low-voc-ca-compliant-aggressive-and-fast-drying-pressure-sensitive-adhesive/",
    "specifications": {
      "type": "Pressure Sensitive Adhesive",
      "viscosity": "500-800 cps",
      "solids": "25-35%",
      "flashPoint": ">150°F",
      "potLife": "4 hours",
      "cureTime": "2-4 hours",
      "temperatureRange": "-20°F to +180°F",
      "substrates": [
        "Wood",
        "Metal",
        "Plastic",
        "Fabric",
        "Paper"
      ],
      "applications": [
        "Construction Bonding",
        "Industrial Assembly",
        "Furniture Manufacturing",
        "Packaging"
      ],
      "features": [
        "Low VOC",
        "CA Compliant",
        "Fast Drying",
        "Aggressive Bond"
      ],
      "certifications": [
        "CA Compliant",
        "VOC Compliant"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.8 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Amber",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "cc507",
    "name": "CC507 – HIGH-TEMP STYRENE SAFE PRESSURE SENSITIVE ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "High-temperature styrene safe pressure sensitive adhesive for demanding construction applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/CC507-22L-1024x1024.png",
    "url": "https://forzabuilt.com/product/cc507-high-temp-styrene-safe-pressure-sensitive-adhesive/",
    "specifications": {
      "type": "High-Temp Pressure Sensitive Adhesive",
      "viscosity": "600-900 cps",
      "solids": "30-40%",
      "flashPoint": ">180°F",
      "potLife": "6 hours",
      "cureTime": "4-8 hours",
      "temperatureRange": "-30°F to +200°F",
      "substrates": [
        "Styrene",
        "Plastic",
        "Metal",
        "Wood",
        "Fabric"
      ],
      "applications": [
        "High-Temp Bonding",
        "Industrial Assembly",
        "Automotive Parts",
        "Construction"
      ],
      "features": [
        "High-Temp Resistant",
        "Styrene Safe",
        "Chemical Resistant",
        "Durable"
      ],
      "certifications": [
        "High-Temp Rated",
        "Styrene Safe"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "8.2 lbs/gal",
      "pH": "6.8-7.2",
      "color": "Clear to Light Amber",
      "odor": "Minimal",
      "shelfLife": "15 months",
      "storageConditions": "Store at 50-80°F, avoid direct sunlight"
    }
  },
  {
    "id": "cc513",
    "name": "CC513 – NON FLAM/NON-METHYLENE CHLORIDE CONTRACT ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "Non-flammable, non-methylene chloride contact adhesive for safe construction applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/03/IC934-bundle-1024x1024.png",
    "url": "https://forzabuilt.com/product/cc513-non-flammable-non-methylene-chloride-contact-adhesive/",
    "specifications": {
      "type": "Non-Flammable Contact Adhesive",
      "viscosity": "800-1200 cps",
      "solids": "25-35%",
      "flashPoint": "Non-Flammable",
      "potLife": "8 hours",
      "cureTime": "24-48 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Wood",
        "Metal",
        "Plastic",
        "Fabric",
        "Fiberglass"
      ],
      "applications": [
        "Construction Bonding",
        "Industrial Assembly",
        "Furniture Manufacturing",
        "Automotive"
      ],
      "features": [
        "Non-Flammable",
        "Safe Handling",
        "Chemical Resistant",
        "Durable"
      ],
      "certifications": [
        "Non-Flammable",
        "VOC Compliant"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "8.0 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Blue",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container closed"
    }
  },
  {
    "id": "cc515",
    "name": "CC515 – PRESSURE SENSITIVE ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "General purpose pressure sensitive adhesive for construction and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/CC515-bundle-1024x1024.png",
    "url": "https://forzabuilt.com/product/cc515-pressure-sensitive-adhesive/",
    "specifications": {
      "type": "Pressure Sensitive Adhesive",
      "viscosity": "400-700 cps",
      "solids": "20-30%",
      "flashPoint": ">140°F",
      "potLife": "4 hours",
      "cureTime": "2-6 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Wood",
        "Metal",
        "Plastic",
        "Paper",
        "Fabric"
      ],
      "applications": [
        "General Bonding",
        "Industrial Assembly",
        "Packaging",
        "Construction"
      ],
      "features": [
        "Versatile",
        "Easy Application",
        "Good Adhesion",
        "Cost Effective"
      ],
      "certifications": [
        "VOC Compliant"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.5 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Amber",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "cc519",
    "name": "CC519 – CA COMPLIANT CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "CA compliant contact adhesive for construction applications requiring regulatory compliance.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/CC519-bundle-1024x1024.png",
    "url": "https://forzabuilt.com/product/cc519-ca-compliant-contact-adhesive/",
    "specifications": {
      "type": "CA Compliant Contact Adhesive",
      "viscosity": "600-900 cps",
      "solids": "25-35%",
      "flashPoint": ">150°F",
      "potLife": "6 hours",
      "cureTime": "24-48 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Wood",
        "Metal",
        "Plastic",
        "Fabric",
        "Fiberglass"
      ],
      "applications": [
        "Construction Bonding",
        "Industrial Assembly",
        "Furniture Manufacturing",
        "Automotive"
      ],
      "features": [
        "CA Compliant",
        "Strong Bond",
        "Chemical Resistant",
        "Durable"
      ],
      "certifications": [
        "CA Compliant",
        "VOC Compliant"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.8 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Amber",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "cc503-aa",
    "name": "CC503 AA – LOW VOC, CA COMPLIANT, MULTI-PURPOSE ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "Low VOC, CA compliant multi-purpose adhesive for various construction applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/CC503-Aerosol-768x1024.png",
    "url": "https://forzabuilt.com/product/cc503-aa-low-voc-ca-compliant-multi-purpose-adhesive/",
    "specifications": {
      "type": "Multi-Purpose Aerosol Adhesive",
      "viscosity": "Aerosol Spray",
      "solids": "15-25%",
      "flashPoint": ">120°F",
      "potLife": "Immediate",
      "cureTime": "1-4 hours",
      "temperatureRange": "-20°F to +140°F",
      "substrates": [
        "Wood",
        "Metal",
        "Plastic",
        "Fabric",
        "Paper"
      ],
      "applications": [
        "General Bonding",
        "Industrial Assembly",
        "Packaging",
        "Construction"
      ],
      "features": [
        "Low VOC",
        "CA Compliant",
        "Easy Application",
        "Versatile"
      ],
      "certifications": [
        "CA Compliant",
        "VOC Compliant"
      ],
      "packaging": [
        "Aerosol Can",
        "Bulk Containers"
      ]
    },
    "technicalData": {
      "density": "6.8 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "c-c360",
    "name": "C-C360 – HIGH-TEMP NEOPRENE CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "High-temperature neoprene contact adhesive for demanding construction applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/C-C360-C130.png",
    "url": "https://forzabuilt.com/product/c-c360-high-temp-neoprene-contact-adhesive/",
    "specifications": {
      "type": "High-Temp Neoprene Contact Adhesive",
      "viscosity": "800-1200 cps",
      "solids": "30-40%",
      "flashPoint": ">180°F",
      "potLife": "8 hours",
      "cureTime": "24-48 hours",
      "temperatureRange": "-30°F to +200°F",
      "substrates": [
        "Neoprene",
        "Rubber",
        "Metal",
        "Plastic",
        "Fabric"
      ],
      "applications": [
        "High-Temp Bonding",
        "Industrial Assembly",
        "Automotive Parts",
        "Construction"
      ],
      "features": [
        "High-Temp Resistant",
        "Neoprene Compatible",
        "Chemical Resistant",
        "Durable"
      ],
      "certifications": [
        "High-Temp Rated",
        "Neoprene Safe"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "8.5 lbs/gal",
      "pH": "6.8-7.2",
      "color": "Clear to Light Amber",
      "odor": "Minimal",
      "shelfLife": "15 months",
      "storageConditions": "Store at 50-80°F, avoid direct sunlight"
    }
  },
  {
    "id": "c-c551",
    "name": "C-C551 NON-FLAMMABLE SPRAYABLE CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "Non-flammable sprayable contact adhesive for safe construction applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/C-C551-Pail-1024x1024.png",
    "url": "https://forzabuilt.com/product/c-c551-non-flammable-sprayable-contact-adhesive/",
    "specifications": {
      "type": "Non-Flammable Sprayable Contact Adhesive",
      "viscosity": "600-900 cps",
      "solids": "25-35%",
      "flashPoint": "Non-Flammable",
      "potLife": "6 hours",
      "cureTime": "24-48 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Wood",
        "Metal",
        "Plastic",
        "Fabric",
        "Fiberglass"
      ],
      "applications": [
        "Construction Bonding",
        "Industrial Assembly",
        "Furniture Manufacturing",
        "Automotive"
      ],
      "features": [
        "Non-Flammable",
        "Sprayable",
        "Safe Handling",
        "Chemical Resistant"
      ],
      "certifications": [
        "Non-Flammable",
        "VOC Compliant"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.8 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Blue",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container closed"
    }
  },
  {
    "id": "c-oa98",
    "name": "C-OA98 HYBRID POLYMER, MOISTURE CURE ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "Hybrid polymer moisture cure adhesive for construction applications requiring superior bonding.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/C-OA98-Sausage-n.png",
    "url": "https://forzabuilt.com/product/c-oa98-hybrid-polymer-moisture-cure-adhesive/",
    "specifications": {
      "type": "Hybrid Polymer Moisture Cure Adhesive",
      "viscosity": "200,000-300,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "30 minutes",
      "cureTime": "24-48 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Wood",
        "Metal",
        "Plastic",
        "Concrete",
        "Fiberglass"
      ],
      "applications": [
        "Construction Bonding",
        "Industrial Assembly",
        "Automotive Parts",
        "Marine"
      ],
      "features": [
        "Hybrid Polymer",
        "Moisture Cure",
        "High Performance",
        "Chemical Resistant"
      ],
      "certifications": [
        "VOC Compliant",
        "Moisture Cure"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "1.4 g/cm³",
      "pH": "Neutral",
      "color": "Black",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "c-os55",
    "name": "C-OS55 – HYBRID POLYMER, SINGLE COMPONENT CURE, WITH OUTSTANDING ADHESIVE/SEALING PROPERTIES",
    "category": "BOND",
    "industry": "construction",
    "description": "Hybrid polymer single component cure adhesive with outstanding adhesive and sealing properties.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/C-OS55-Sausage-n-1024x1024.png",
    "url": "https://forzabuilt.com/product/c-os55-hybrid-polymer-single-component-cure-with-oustanding-adhesive-sealing-properties/",
    "specifications": {
      "type": "Hybrid Polymer Single Component Adhesive",
      "viscosity": "250,000-350,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "45 minutes",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Wood",
        "Metal",
        "Plastic",
        "Concrete",
        "Fiberglass"
      ],
      "applications": [
        "Construction Bonding",
        "Industrial Assembly",
        "Automotive Parts",
        "Marine"
      ],
      "features": [
        "Hybrid Polymer",
        "Single Component",
        "Adhesive/Sealing",
        "High Performance"
      ],
      "certifications": [
        "VOC Compliant",
        "Single Component"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "1.5 g/cm³",
      "pH": "Neutral",
      "color": "Black",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "c-r329",
    "name": "C-R329 – TWO-PART METHACRYLATE ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "Two-part methacrylate adhesive for high-performance construction applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/C-R552-DualCart-1024x1024.png",
    "url": "https://forzabuilt.com/product/c-r329-two-part-methacrylate-adhesive/",
    "specifications": {
      "type": "Two-Part Methacrylate Adhesive",
      "viscosity": "50,000-100,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "5 minutes",
      "cureTime": "2-4 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Fiberglass",
        "Wood",
        "Concrete"
      ],
      "applications": [
        "Structural Bonding",
        "Industrial Assembly",
        "Automotive Parts",
        "Construction"
      ],
      "features": [
        "Two-Part",
        "Methacrylate",
        "High Strength",
        "Fast Cure"
      ],
      "certifications": [
        "Structural Rated",
        "Two-Part System"
      ],
      "packaging": [
        "Dual Cartridge",
        "Bulk Containers"
      ]
    },
    "technicalData": {
      "density": "1.2 g/cm³",
      "pH": "Neutral",
      "color": "Clear to Light Amber",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "c-r552",
    "name": "C-R552 – TWO-PART MODIFIED EPOXY",
    "category": "BOND",
    "industry": "construction",
    "description": "Two-part modified epoxy for demanding construction applications requiring superior bonding strength.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/C-R552-DualCart-1024x1024.png",
    "url": "https://forzabuilt.com/product/c-r552-two-part-modified-epoxy/",
    "specifications": {
      "type": "Two-Part Modified Epoxy",
      "viscosity": "100,000-200,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "30 minutes",
      "cureTime": "4-8 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Fiberglass",
        "Wood",
        "Concrete"
      ],
      "applications": [
        "Structural Bonding",
        "Industrial Assembly",
        "Automotive Parts",
        "Construction"
      ],
      "features": [
        "Two-Part",
        "Modified Epoxy",
        "High Strength",
        "Chemical Resistant"
      ],
      "certifications": [
        "Structural Rated",
        "Two-Part System"
      ],
      "packaging": [
        "Dual Cartridge",
        "Bulk Containers"
      ]
    },
    "technicalData": {
      "density": "1.3 g/cm³",
      "pH": "Neutral",
      "color": "Clear to Light Amber",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "c-r560",
    "name": "C-R560 – TWO-PART 5 MINUTE EPOXY ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "Two-part 5 minute epoxy adhesive for fast-curing construction applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/C-R560-DualCart-300x300.png",
    "url": "https://forzabuilt.com/product/c-r560-two-part-5-minute-epoxy-adhesive/",
    "specifications": {
      "type": "Two-Part 5 Minute Epoxy",
      "viscosity": "50,000-100,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "5 minutes",
      "cureTime": "5 minutes",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Fiberglass",
        "Wood",
        "Concrete"
      ],
      "applications": [
        "Quick Repairs",
        "Industrial Assembly",
        "Automotive Parts",
        "Construction"
      ],
      "features": [
        "Fast Cure",
        "Two-Part",
        "High Strength",
        "Quick Setting"
      ],
      "certifications": [
        "Fast Cure",
        "Two-Part System"
      ],
      "packaging": [
        "Dual Cartridge",
        "Bulk Containers"
      ]
    },
    "technicalData": {
      "density": "1.2 g/cm³",
      "pH": "Neutral",
      "color": "Clear to Light Amber",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "c-oa5",
    "name": "C-OA5 – HYBRID POLYMER, MOISTURE CURE ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "Hybrid polymer moisture cure adhesive for construction applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2025/01/C-OA5-Catridge-300x300.png",
    "url": "https://forzabuilt.com/product/c-oa5-hybrid-polymer-moisture-cure-adhesive/",
    "specifications": {
      "type": "Hybrid Polymer Moisture Cure Adhesive",
      "viscosity": "150,000-250,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "30 minutes",
      "cureTime": "24-48 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Wood",
        "Metal",
        "Plastic",
        "Concrete",
        "Fiberglass"
      ],
      "applications": [
        "Construction Bonding",
        "Industrial Assembly",
        "Automotive Parts",
        "Marine"
      ],
      "features": [
        "Hybrid Polymer",
        "Moisture Cure",
        "High Performance",
        "Chemical Resistant"
      ],
      "certifications": [
        "VOC Compliant",
        "Moisture Cure"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "1.4 g/cm³",
      "pH": "Neutral",
      "color": "Black",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "c-oa52",
    "name": "C-OA52 – QUICK GRAB ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "Quick grab adhesive for fast-setting construction applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2025/01/C-OA52-Cartridge-300x300.png",
    "url": "https://forzabuilt.com/product/c-oa52-quick-grab-adhesive/",
    "specifications": {
      "type": "Quick Grab Adhesive",
      "viscosity": "100,000-200,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "15 minutes",
      "cureTime": "1-2 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Wood",
        "Metal",
        "Plastic",
        "Concrete",
        "Fiberglass"
      ],
      "applications": [
        "Quick Repairs",
        "Industrial Assembly",
        "Automotive Parts",
        "Construction"
      ],
      "features": [
        "Quick Grab",
        "Fast Setting",
        "High Performance",
        "Versatile"
      ],
      "certifications": [
        "VOC Compliant",
        "Quick Setting"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "1.3 g/cm³",
      "pH": "Neutral",
      "color": "Black",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "c-osa",
    "name": "C-OSA – ISOPROPYL ALCOHOL BASED CLEANER/ADHESION PROMOTER",
    "category": "BOND",
    "industry": "construction",
    "description": "Isopropyl alcohol based cleaner and adhesion promoter for construction applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/C-OSA-OSA-300x282.png",
    "url": "https://forzabuilt.com/product/c-osa-isopropyl-alcohol-based-cleaner-adhesion-promoter/",
    "specifications": {
      "type": "Isopropyl Alcohol Based Cleaner/Adhesion Promoter",
      "viscosity": "1-5 cps",
      "solids": "0%",
      "flashPoint": ">100°F",
      "potLife": "Immediate",
      "cureTime": "Immediate",
      "temperatureRange": "-20°F to +140°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Fiberglass",
        "Wood"
      ],
      "applications": [
        "Surface Preparation",
        "Adhesion Promotion",
        "Cleaning",
        "Construction"
      ],
      "features": [
        "Isopropyl Alcohol",
        "Cleaner",
        "Adhesion Promoter",
        "Fast Drying"
      ],
      "certifications": [
        "VOC Compliant",
        "Cleaner Rated"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "6.5 lbs/gal",
      "pH": "Neutral",
      "color": "Clear",
      "odor": "Alcohol",
      "shelfLife": "24 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "c-oa77",
    "name": "C-OA77 – HYBRID POLYMER, HIGH PERFORMANCE, TROWEL GRADE, FLOORING ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "Hybrid polymer high performance trowel grade flooring adhesive for construction applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2025/03/C-OA77-3.5-Pail-300x300.png",
    "url": "https://forzabuilt.com/product/c-oa77-hybrid-polymer-high-performance-trowel-grade-flooring-adhesive/",
    "specifications": {
      "type": "Trowel Grade Flooring Adhesive",
      "viscosity": "300,000-500,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "60 minutes",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Concrete",
        "Wood",
        "Metal",
        "Plastic",
        "Fiberglass"
      ],
      "applications": [
        "Flooring Installation",
        "Construction Bonding",
        "Industrial Assembly",
        "Automotive"
      ],
      "features": [
        "Trowel Grade",
        "High Performance",
        "Hybrid Polymer",
        "Flooring Specific"
      ],
      "certifications": [
        "VOC Compliant",
        "Flooring Rated"
      ],
      "packaging": [
        "3.5 Gallon Pail",
        "5 Gallon Pail",
        "Bulk Containers"
      ]
    },
    "technicalData": {
      "density": "1.6 g/cm³",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "c-s538",
    "name": "C-S538 – TAPE PRIMER AND ADHESION PROMOTER",
    "category": "BOND",
    "industry": "construction",
    "description": "Tape primer and adhesion promoter for construction applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/C-S538-Pail-300x300.png",
    "url": "https://forzabuilt.com/product/c-s538-tape-primer-and-adhesion-promoter/",
    "specifications": {
      "type": "Tape Primer and Adhesion Promoter",
      "viscosity": "50-100 cps",
      "solids": "5-15%",
      "flashPoint": ">120°F",
      "potLife": "8 hours",
      "cureTime": "Immediate",
      "temperatureRange": "-20°F to +140°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Fiberglass",
        "Wood"
      ],
      "applications": [
        "Tape Preparation",
        "Adhesion Promotion",
        "Surface Treatment",
        "Construction"
      ],
      "features": [
        "Tape Primer",
        "Adhesion Promoter",
        "Fast Drying",
        "Versatile"
      ],
      "certifications": [
        "VOC Compliant",
        "Primer Rated"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.0 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Amber",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "c-w6106",
    "name": "C-W6106 – HPL LAMINATING ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "HPL laminating adhesive for high-pressure laminate applications in construction.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/C-W6106-Tote-300x300.png",
    "url": "https://forzabuilt.com/product/c-w6106-hpl-laminating-adhesive/",
    "specifications": {
      "type": "HPL Laminating Adhesive",
      "viscosity": "200,000-400,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "45 minutes",
      "cureTime": "24-48 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "HPL",
        "Wood",
        "Metal",
        "Plastic",
        "Fiberglass"
      ],
      "applications": [
        "HPL Laminating",
        "Construction Bonding",
        "Industrial Assembly",
        "Furniture"
      ],
      "features": [
        "HPL Specific",
        "High Performance",
        "Laminating Grade",
        "Chemical Resistant"
      ],
      "certifications": [
        "VOC Compliant",
        "HPL Rated"
      ],
      "packaging": [
        "5 Gallon Tote",
        "55 Gallon Drum",
        "Bulk Containers"
      ]
    },
    "technicalData": {
      "density": "1.5 g/cm³",
      "pH": "Neutral",
      "color": "Tan",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "tc452",
    "name": "TC452 – NON FLAM/NON-METHYLENE CHLORIDE CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "transportation",
    "description": "Non-flammable, non-methylene chloride contact adhesive for transportation and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/07/A_FORZA_Canister_TC452-1024x1024.png",
    "url": "https://forzabuilt.com/product/tc452-non-flam-non-methylene-chloride-contact-adhesive/",
    "specifications": {
      "type": "Non-Flammable Contact Adhesive",
      "viscosity": "800-1200 cps",
      "solids": "25-30%",
      "flashPoint": "Non-Flammable",
      "potLife": "8 hours",
      "cureTime": "24-48 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Wood",
        "Fabric",
        "Paper"
      ],
      "applications": [
        "Transportation Assembly",
        "Automotive Interior",
        "Industrial Bonding",
        "Equipment Assembly"
      ],
      "features": [
        "Non-Flammable",
        "Safe Handling",
        "Transportation Grade",
        "Chemical Resistant"
      ],
      "certifications": [
        "Non-Flammable",
        "Transportation Approved"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "8.0 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Blue",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container closed"
    }
  },
  {
    "id": "tc453",
    "name": "TC453 – CA COMPLIANT MULTI-PURPOSE CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "transportation",
    "description": "CA compliant multi-purpose contact adhesive for transportation and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/07/Bundle-TC453_Forza-1024x1024.png",
    "url": "https://forzabuilt.com/product/tc453-ca-compliant-multi-purpose-contact-adhesive/",
    "specifications": {
      "type": "CA Compliant Contact Adhesive",
      "viscosity": "800-1200 cps",
      "solids": "25-30%",
      "flashPoint": ">200°F",
      "potLife": "8 hours",
      "cureTime": "24-48 hours",
      "temperatureRange": "-40°F to +180°F",
      "substrates": [
        "Wood",
        "Metal",
        "Plastic",
        "Fabric",
        "Foam"
      ],
      "applications": [
        "Transportation Assembly",
        "Automotive Interior",
        "Furniture Manufacturing",
        "Industrial Bonding"
      ],
      "features": [
        "CA Compliant",
        "High Bond Strength",
        "Fast Grab",
        "Low VOC"
      ],
      "certifications": [
        "CARB Compliant",
        "VOC Exempt"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "8.2 lbs/gal",
      "pH": "6.5-7.5",
      "color": "Clear to Amber",
      "odor": "Mild",
      "shelfLife": "12 months",
      "storageConditions": "Store at 60-80°F, keep container closed"
    }
  },
  {
    "id": "tc454",
    "name": "TC454 – PRESSURE-SENSITIVE CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "transportation",
    "description": "Pressure-sensitive contact adhesive for transportation and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/09/Master-bundle-TC454-1024x1024.png",
    "url": "https://forzabuilt.com/product/tc454-pressure-sensitive-contact-adhesive/",
    "specifications": {
      "type": "Pressure-Sensitive Contact Adhesive",
      "viscosity": "600-900 cps",
      "solids": "20-25%",
      "flashPoint": ">180°F",
      "potLife": "6 hours",
      "cureTime": "12-24 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Polystyrene",
        "Polyethylene",
        "Polypropylene",
        "Paper",
        "Cardboard"
      ],
      "applications": [
        "Transportation Assembly",
        "Packaging",
        "Labeling",
        "Temporary Bonding"
      ],
      "features": [
        "Pressure Sensitive",
        "Low Tack",
        "Repositionable",
        "Clean Release"
      ],
      "certifications": [
        "Food Safe",
        "Low VOC"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.8 lbs/gal",
      "pH": "6.0-7.0",
      "color": "Clear",
      "odor": "Minimal",
      "shelfLife": "18 months",
      "storageConditions": "Store at 50-80°F, avoid freezing"
    }
  },
  {
    "id": "tc456",
    "name": "TC456 – CA COMPLIANT SEMI-PRESSURE SENSITIVE CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "transportation",
    "description": "CA compliant semi-pressure sensitive contact adhesive for transportation applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/07/A_FORZA_BUNDLE_TC456-1024x1024.png",
    "url": "https://forzabuilt.com/product/tc456-ca-compliant-semi-pressure-sensitive-contact-adhesive/",
    "specifications": {
      "type": "Semi-Pressure Sensitive Contact Adhesive",
      "viscosity": "600-900 cps",
      "solids": "20-25%",
      "flashPoint": ">180°F",
      "potLife": "6 hours",
      "cureTime": "12-24 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Polystyrene",
        "Polyethylene",
        "Polypropylene",
        "Paper",
        "Cardboard"
      ],
      "applications": [
        "Transportation Assembly",
        "Packaging",
        "Labeling",
        "Temporary Bonding"
      ],
      "features": [
        "Semi-Pressure Sensitive",
        "CA Compliant",
        "Low Tack",
        "Repositionable"
      ],
      "certifications": [
        "CARB Compliant",
        "Low VOC"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.8 lbs/gal",
      "pH": "6.0-7.0",
      "color": "Clear",
      "odor": "Minimal",
      "shelfLife": "18 months",
      "storageConditions": "Store at 50-80°F, avoid freezing"
    }
  },
  {
    "id": "tc466",
    "name": "TC466 – LOW VOC CA COMPLIANT, AGGRESSIVE AND FAST DRYING PRESSURE SENSITIVE ADHESIVE",
    "category": "BOND",
    "industry": "transportation",
    "description": "Low VOC CA compliant, aggressive and fast drying pressure sensitive adhesive for transportation applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/07/Master-bundle-TC466-1024x1024.png",
    "url": "https://forzabuilt.com/product/tc466-low-voc-ca-compliant-aggressive-and-fast-drying-pressure-sensitive-adhesive/",
    "specifications": {
      "type": "Low VOC Pressure Sensitive Adhesive",
      "viscosity": "600-900 cps",
      "solids": "20-25%",
      "flashPoint": ">180°F",
      "potLife": "6 hours",
      "cureTime": "12-24 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Polystyrene",
        "Polyethylene",
        "Polypropylene",
        "Paper",
        "Cardboard"
      ],
      "applications": [
        "Transportation Assembly",
        "Packaging",
        "Labeling",
        "Temporary Bonding"
      ],
      "features": [
        "Low VOC",
        "CA Compliant",
        "Aggressive",
        "Fast Drying"
      ],
      "certifications": [
        "CARB Compliant",
        "Low VOC"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.8 lbs/gal",
      "pH": "6.0-7.0",
      "color": "Clear",
      "odor": "Minimal",
      "shelfLife": "18 months",
      "storageConditions": "Store at 50-80°F, avoid freezing"
    }
  },
  {
    "id": "tc467",
    "name": "TC467 – HIGH-TEMP STYRENE-SAFE PRESSURE SENSITIVE ADHESIVE",
    "category": "BOND",
    "industry": "transportation",
    "description": "High-temperature styrene-safe pressure sensitive adhesive for transportation applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/07/A_FORZA_Canister_TC467-1024x1024.png",
    "url": "https://forzabuilt.com/product/tc467-high-temp-styrene-safe-pressure-sensitive-adhesive/",
    "specifications": {
      "type": "High-Temp Styrene-Safe Pressure Sensitive Adhesive",
      "viscosity": "600-900 cps",
      "solids": "20-25%",
      "flashPoint": ">180°F",
      "potLife": "6 hours",
      "cureTime": "12-24 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Polystyrene",
        "Polyethylene",
        "Polypropylene",
        "Transportation Composites"
      ],
      "applications": [
        "Transportation Assembly",
        "Composite Construction",
        "Packaging",
        "Labeling"
      ],
      "features": [
        "High-Temp",
        "Styrene Safe",
        "Pressure Sensitive",
        "Transportation Grade"
      ],
      "certifications": [
        "Styrene Safe",
        "Transportation Approved"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.8 lbs/gal",
      "pH": "6.0-7.0",
      "color": "Clear",
      "odor": "Minimal",
      "shelfLife": "18 months",
      "storageConditions": "Store at 50-80°F, avoid freezing"
    }
  },
  {
    "id": "t-osa155",
    "name": "T-OSA155 – ADHESIVE PRIMER AND PROMOTER",
    "category": "BOND",
    "industry": "transportation",
    "description": "Adhesive primer and promoter for enhanced bonding performance in transportation applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/07/T-OSA155.png",
    "url": "https://forzabuilt.com/product/t-osa155-adhesive-primer-and-promoter/",
    "specifications": {
      "type": "Adhesive Primer and Promoter",
      "viscosity": "Low Viscosity Liquid",
      "solids": "15-20%",
      "flashPoint": ">150°F",
      "potLife": "4 hours",
      "cureTime": "10-15 minutes",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Ceramic",
        "Difficult Surfaces"
      ],
      "applications": [
        "Transportation Assembly",
        "Automotive Assembly",
        "Electronics",
        "Industrial Bonding"
      ],
      "features": [
        "Surface Preparation",
        "Enhanced Adhesion",
        "Fast Drying",
        "Transportation Grade"
      ],
      "certifications": [
        "Surface Preparation",
        "Transportation Approved"
      ],
      "packaging": [
        "8 oz Bottle",
        "1 Gallon",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.5 lbs/gal",
      "pH": "6.0-7.0",
      "color": "Clear to Amber",
      "odor": "Mild",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container closed"
    }
  },
  {
    "id": "t-oa152",
    "name": "T-OA152 – HYBRID POLYMER STRUCTURAL ADHESIVE",
    "category": "BOND",
    "industry": "transportation",
    "description": "Hybrid polymer structural adhesive for transportation and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/09/A_FORZA_Cartridge_T-OA152-819x1024.png",
    "url": "https://forzabuilt.com/product/t-oa152-hybrid-polymer-structural-adhesive/",
    "specifications": {
      "type": "Hybrid Polymer Structural Adhesive",
      "viscosity": "Thixotropic Paste",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "30 minutes",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete"
      ],
      "applications": [
        "Transportation Assembly",
        "Automotive Assembly",
        "Construction",
        "Industrial Bonding"
      ],
      "features": [
        "Structural Strength",
        "Transportation Grade",
        "Versatile",
        "High Performance"
      ],
      "certifications": [
        "Structural Bond",
        "Transportation Approved"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "12.8 lbs/gal",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 40-80°F, keep container sealed"
    }
  },
  {
    "id": "t-s596",
    "name": "T-S596 – ADHESIVE PRIMER",
    "category": "BOND",
    "industry": "transportation",
    "description": "Adhesive primer for enhanced bonding performance in transportation applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/07/T-S596-1024x1024.png",
    "url": "https://forzabuilt.com/product/t-s596-adhesive-primer/",
    "specifications": {
      "type": "Adhesive Primer",
      "viscosity": "Low Viscosity Liquid",
      "solids": "15-20%",
      "flashPoint": ">150°F",
      "potLife": "4 hours",
      "cureTime": "10-15 minutes",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Ceramic",
        "Difficult Surfaces"
      ],
      "applications": [
        "Transportation Assembly",
        "Surface Preparation",
        "Electronics",
        "Industrial Bonding"
      ],
      "features": [
        "Surface Preparation",
        "Enhanced Adhesion",
        "Fast Drying",
        "Transportation Grade"
      ],
      "certifications": [
        "Surface Preparation",
        "Transportation Approved"
      ],
      "packaging": [
        "8 oz Bottle",
        "1 Gallon",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.5 lbs/gal",
      "pH": "6.0-7.0",
      "color": "Clear to Amber",
      "odor": "Mild",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container closed"
    }
  },
  {
    "id": "t-r679",
    "name": "T-R679 – TWO-PART MODIFIED EPOXY ADHESIVE",
    "category": "BOND",
    "industry": "transportation",
    "description": "Two-part modified epoxy adhesive for transportation and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/07/T-R679-1024x1024.png",
    "url": "https://forzabuilt.com/product/t-r679-two-part-modified-epoxy-adhesive/",
    "specifications": {
      "type": "Two-Part Modified Epoxy",
      "viscosity": "Paste",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "20 minutes",
      "cureTime": "4-8 hours",
      "temperatureRange": "-40°F to +250°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Wood",
        "Ceramic",
        "Composite"
      ],
      "applications": [
        "Transportation Assembly",
        "Structural Bonding",
        "Industrial Assembly",
        "Equipment Repair"
      ],
      "features": [
        "1:1 Mix Ratio",
        "High Strength",
        "Chemical Resistant",
        "Temperature Resistant"
      ],
      "certifications": [
        "Structural Bond",
        "Transportation Approved"
      ],
      "packaging": [
        "50 ml Dual Cartridge",
        "200 ml Dual Cartridge",
        "400 ml Dual Cartridge"
      ]
    },
    "technicalData": {
      "density": "11.8 lbs/gal",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "15 months",
      "storageConditions": "Store at 40-80°F, keep container sealed"
    }
  },
  {
    "id": "t-r785",
    "name": "T-R785 – TWO-PART METHACRYLATE ADHESIVE",
    "category": "BOND",
    "industry": "transportation",
    "description": "Two-part methacrylate adhesive for transportation and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/07/T-R785-1024x1024.png",
    "url": "https://forzabuilt.com/product/t-r785-two-part-modified-epoxy-adhesive/",
    "specifications": {
      "type": "Two-Part Methacrylate",
      "viscosity": "Liquid",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "3 minutes",
      "cureTime": "10-15 minutes",
      "temperatureRange": "-40°F to +180°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Wood",
        "Ceramic",
        "Glass"
      ],
      "applications": [
        "Rapid Transportation Assembly",
        "Industrial Bonding",
        "Equipment Repair",
        "Automotive Assembly"
      ],
      "features": [
        "Fast Acting",
        "High Strength",
        "Rapid Cure",
        "Transportation Grade"
      ],
      "certifications": [
        "Fast Cure",
        "Transportation Approved"
      ],
      "packaging": [
        "50 ml Dual Cartridge",
        "200 ml Dual Cartridge",
        "400 ml Dual Cartridge"
      ]
    },
    "technicalData": {
      "density": "9.2 lbs/gal",
      "pH": "Neutral",
      "color": "Clear to Amber",
      "odor": "Mild",
      "shelfLife": "12 months",
      "storageConditions": "Store at 40-80°F, keep container sealed"
    }
  },
  {
    "id": "t-oa156",
    "name": "T-OA156 – HYBRID POLYMER STRUCTURAL, SINGLE-PART MOISTURE CURE ADHESIVE",
    "category": "BOND",
    "industry": "transportation",
    "description": "Hybrid polymer structural, single-part moisture cure adhesive for transportation applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/07/T-OA156_Cartridge-819x1024.png",
    "url": "https://forzabuilt.com/product/t-oa156-hybrid-polymer-structural-single-part-moisture-cure-adhesive/",
    "specifications": {
      "type": "Hybrid Polymer Structural Adhesive",
      "viscosity": "Thixotropic Paste",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "30 minutes",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete"
      ],
      "applications": [
        "Transportation Assembly",
        "Automotive Assembly",
        "Construction",
        "Industrial Bonding"
      ],
      "features": [
        "Structural Strength",
        "Moisture Cure",
        "Single Part",
        "Transportation Grade"
      ],
      "certifications": [
        "Structural Bond",
        "Transportation Approved"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "12.8 lbs/gal",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 40-80°F, keep container sealed"
    }
  },
  {
    "id": "t-oa177",
    "name": "T-OA177 – HIGH-GREEN STRENGTH QUICK GRAB ADHESIVE",
    "category": "BOND",
    "industry": "transportation",
    "description": "High-green strength quick grab adhesive for transportation and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/07/T-OA177Cartridge-819x1024.png",
    "url": "https://forzabuilt.com/product/t-oa177-high-green-strength-quick-grab-hybrid-polymer-adhesive/",
    "specifications": {
      "type": "High-Green Strength Quick Grab Adhesive",
      "viscosity": "Thixotropic Paste",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "30 minutes",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete"
      ],
      "applications": [
        "Transportation Assembly",
        "Automotive Assembly",
        "Construction",
        "Industrial Bonding"
      ],
      "features": [
        "High Green Strength",
        "Quick Grab",
        "Transportation Grade",
        "Versatile"
      ],
      "certifications": [
        "Quick Grab",
        "Transportation Approved"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "12.8 lbs/gal",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 40-80°F, keep container sealed"
    }
  },
  {
    "id": "t-c222",
    "name": "T-C222 – NEOPRENE CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "transportation",
    "description": "Neoprene contact adhesive for transportation and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/07/T-C222_Pail-1024x1024.png",
    "url": "https://forzabuilt.com/product/t-c222-neoprene-contact-adhesive/",
    "specifications": {
      "type": "Neoprene Contact Adhesive",
      "viscosity": "1200-1800 cps",
      "solids": "30-35%",
      "flashPoint": ">220°F",
      "potLife": "12 hours",
      "cureTime": "24-48 hours",
      "temperatureRange": "-40°F to +250°F",
      "substrates": [
        "Metal",
        "Rubber",
        "Plastic",
        "Fabric",
        "Leather"
      ],
      "applications": [
        "Transportation Assembly",
        "Automotive Assembly",
        "HVAC Systems",
        "High-Temp Bonding"
      ],
      "features": [
        "High Heat Resistance",
        "Chemical Resistant",
        "Flexible Bond",
        "Transportation Grade"
      ],
      "certifications": [
        "Heat Resistant",
        "Transportation Approved"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "8.8 lbs/gal",
      "pH": "6.5-7.5",
      "color": "Clear to Amber",
      "odor": "Mild",
      "shelfLife": "18 months",
      "storageConditions": "Store at 60-80°F, keep container closed"
    }
  },
  {
    "id": "t-c225",
    "name": "T-C225 – NON-FLAM SPRAYABLE CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "transportation",
    "description": "Non-flammable sprayable contact adhesive for transportation and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/09/T-C225_MetalPail-1024x1024.png",
    "url": "https://forzabuilt.com/product/t-c225-non-flam-sprayable-contact-adhesive/",
    "specifications": {
      "type": "Non-Flammable Sprayable Contact Adhesive",
      "viscosity": "800-1200 cps",
      "solids": "25-30%",
      "flashPoint": "Non-Flammable",
      "potLife": "8 hours",
      "cureTime": "24-48 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Wood",
        "Fabric",
        "Paper"
      ],
      "applications": [
        "Transportation Assembly",
        "Automotive Interior",
        "Industrial Bonding",
        "Equipment Assembly"
      ],
      "features": [
        "Non-Flammable",
        "Safe Handling",
        "Sprayable",
        "Transportation Grade"
      ],
      "certifications": [
        "Non-Flammable",
        "Transportation Approved"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "8.0 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Blue",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container closed"
    }
  },
  {
    "id": "t-c485",
    "name": "T-C485 – PREMIUM HIGH TEMP NEOPRENE CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "transportation",
    "description": "Premium high temperature neoprene contact adhesive for demanding transportation applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/09/T-C485_Pail-1024x1024.png",
    "url": "https://forzabuilt.com/product/t-c485-premium-high-temp-neoprene-contact-adhesive/",
    "specifications": {
      "type": "Premium High Temp Neoprene Contact Adhesive",
      "viscosity": "1500-2200 cps",
      "solids": "35-40%",
      "flashPoint": ">250°F",
      "potLife": "12 hours",
      "cureTime": "24-48 hours",
      "temperatureRange": "-40°F to +300°F",
      "substrates": [
        "Metal",
        "Rubber",
        "Plastic",
        "Fabric",
        "Leather"
      ],
      "applications": [
        "Transportation Assembly",
        "Automotive Assembly",
        "HVAC Systems",
        "High-Temp Bonding"
      ],
      "features": [
        "Premium Grade",
        "High Heat Resistance",
        "Chemical Resistant",
        "Transportation Grade"
      ],
      "certifications": [
        "High Heat Resistant",
        "Transportation Approved"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "9.2 lbs/gal",
      "pH": "6.5-7.5",
      "color": "Clear to Amber",
      "odor": "Mild",
      "shelfLife": "18 months",
      "storageConditions": "Store at 60-80°F, keep container closed"
    }
  },
  {
    "id": "c-os9",
    "name": "C-OS9 – HYBRID POLYMER, STRUCTURAL, SINGLE-PART, MOISTURE CURE ADHESIVE",
    "category": "SEAL",
    "industry": "construction",
    "description": "ForzaBOND™ C-OS9 is a hybrid polymer, structural, single-part, moisture cure adhesive.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/C-OS9-OS2-n-1024x1024.png",
    "url": "https://forzabuilt.com/product/c-os9-hybrid-polymer-structural-single-part-moisture-cure-adhesive/",
    "specifications": {
      "type": "Hybrid Polymer Structural Single-Part Moisture Cure Adhesive",
      "viscosity": "250,000-350,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "45 minutes",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Fiberglass"
      ],
      "applications": [
        "Crack filling on concrete",
        "Sealing around windows and door openings",
        "Sealing in gutter applications",
        "Roof penetrations"
      ],
      "features": [
        "Hybrid Polymer",
        "Structural",
        "Single-Part",
        "Moisture Cure",
        "High Performance"
      ],
      "certifications": [
        "VOC Compliant",
        "Structural Rated"
      ],
      "packaging": [
        "20oz Sausage",
        "10oz Sausage",
        "28oz Cartridge",
        "10.1oz Cartridge",
        "5 Gallon Pail",
        "52 Gallon Drum"
      ]
    },
    "technicalData": {
      "density": "1.5 g/cm³",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed",
      "temperatureRange": "34°F to 150°F"
    },
    "benefits": [
      "High Strength",
      "Excellent weather resistance",
      "Retains strong bond through impact, peel, flex, and changing temperatures",
      "Non-yellowing when exposed to UV",
      "Does not form bubbles, shrink, or crack upon curing",
      "Can be painted in most applications",
      "Low-temperature flexibility (properties retained to -75ºF)"
    ],
    "howToUse": [
      "Generally applied by extrusion, and trowel.",
      "Surfaces should be clean and free of dust, oil, and grease.",
      "Aluminum and other metals may be primed for best adhesion.",
      "Apply between 34ºF and 150ºF, in damp and dry conditions.",
      "Most of its strength develops in the first 24 hours.",
      "Minimum cure time is overnight, but several days may be required for maximum performance, however cure time may be accelerated at higher temperatures.",
      "Most parts do not require clamping, although heavy parts may require temporary clamping to ensure desired positioning."
    ],
    "colors": [
      "Gray",
      "White",
      "Black"
    ],
    "sizing": [
      "20oz Sausage",
      "10oz Sausage",
      "28oz Cartridge",
      "10.1oz Cartridge",
      "5 Gallon Pail",
      "52 Gallon Drum"
    ],
    "cleanup": [
      "Water",
      "Alcohol"
    ]
  },
  {
    "id": "t-os150",
    "name": "T-OS150 – HIGH-PERFORMANCE SEMI-SELF LEVELING HYBRID POLYMER SEALANT",
    "category": "SEAL",
    "industry": "transportation",
    "description": "High-performance semi-self leveling hybrid polymer sealant for transportation applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/07/T-OS150-Cartridge-819x1024.png",
    "url": "https://forzabuilt.com/product/t-os150-high-performance-semi-self-leveling-hybrid-polymer-sealant/",
    "specifications": {
      "type": "Semi-Self Leveling Hybrid Polymer Sealant",
      "viscosity": "Semi-Self Leveling",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "30 minutes",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Fiberglass"
      ],
      "applications": [
        "Transportation Sealing",
        "Automotive Assembly",
        "Equipment Sealing",
        "Industrial Sealing"
      ],
      "features": [
        "Semi-Self Leveling",
        "High Performance",
        "Transportation Grade",
        "Weather Resistant"
      ],
      "certifications": [
        "Transportation Approved",
        "VOC Compliant"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "12.8 lbs/gal",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 40-80°F, keep container sealed"
    }
  },
  {
    "id": "t-os151",
    "name": "T-OS151 – NON-HAZARDOUS HIGH STRENGTH SINGLE PART HYBRID POLYMER SEALANT",
    "category": "SEAL",
    "industry": "transportation",
    "description": "Non-hazardous high strength single part hybrid polymer sealant for transportation applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/07/T-OS151_Cartridge-1-819x1024.png",
    "url": "https://forzabuilt.com/product/t-os151-non-hazardous-high-strength-single-part-hybrid-polymer-sealant/",
    "specifications": {
      "type": "Non-Hazardous High Strength Hybrid Polymer Sealant",
      "viscosity": "Thixotropic Paste",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "30 minutes",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Fiberglass"
      ],
      "applications": [
        "Transportation Sealing",
        "Automotive Assembly",
        "Equipment Sealing",
        "Industrial Sealing"
      ],
      "features": [
        "Non-Hazardous",
        "High Strength",
        "Single Part",
        "Transportation Grade"
      ],
      "certifications": [
        "Non-Hazardous",
        "Transportation Approved"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "12.8 lbs/gal",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 40-80°F, keep container sealed"
    }
  },
  {
    "id": "t-os164",
    "name": "T-OS164 – SILICONE SEALANT",
    "category": "SEAL",
    "industry": "transportation",
    "description": "Silicone sealant for transportation and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/09/T-OS164-Sausage-1024x1024.png",
    "url": "https://forzabuilt.com/product/t-os164-silicone-sealant/",
    "specifications": {
      "type": "Silicone Sealant",
      "viscosity": "Thixotropic Paste",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "30 minutes",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Fiberglass"
      ],
      "applications": [
        "Transportation Sealing",
        "Automotive Assembly",
        "Equipment Sealing",
        "Industrial Sealing"
      ],
      "features": [
        "Silicone Based",
        "High Flexibility",
        "Weather Resistant",
        "Transportation Grade"
      ],
      "certifications": [
        "Silicone Approved",
        "Transportation Approved"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "12.5 lbs/gal",
      "pH": "Neutral",
      "color": "Clear to Gray",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 40-80°F, keep container sealed"
    }
  },
  {
    "id": "tac-734g",
    "name": "TAC-734G – WEB SPRAY HIGH TACK INFUSION MOLDING ADHESIVE",
    "category": "BOND",
    "industry": "composites",
    "description": "Web spray high tack infusion molding adhesive for composite applications requiring superior bonding strength.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-734G-NEW.png",
    "url": "https://forzabuilt.com/product/tac-734g-web-spray-high-tack-infusion-molding-adhesive/",
    "specifications": {
      "type": "Web Spray High Tack Infusion Molding Adhesive",
      "viscosity": "600-900 cps",
      "solids": "18-25%",
      "flashPoint": ">180°F",
      "potLife": "6 hours",
      "cureTime": "8-16 hours",
      "temperatureRange": "-30°F to +160°F",
      "substrates": [
        "Fiberglass",
        "Carbon Fiber",
        "Composite Materials",
        "Structural Foam"
      ],
      "applications": [
        "Composite Manufacturing",
        "Infusion Molding",
        "Structural Bonding",
        "Industrial Assembly"
      ],
      "features": [
        "High Tack",
        "Infusion Molding",
        "Composite Grade",
        "Structural Bonding"
      ],
      "certifications": [
        "Composite Approved",
        "VOC Compliant"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.6 lbs/gal",
      "pH": "6.8-7.2",
      "color": "Clear to Light Amber",
      "odor": "Low",
      "shelfLife": "15 months",
      "storageConditions": "Store at 50-80°F, avoid direct sunlight"
    }
  },
  {
    "id": "tac-735r",
    "name": "TAC-735R – MIST SPRAY NO HAPS INFUSION MOLDING ADHESIVE",
    "category": "BOND",
    "industry": "composites",
    "description": "Mist spray no HAPS infusion molding adhesive for environmentally conscious composite applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-735R-NEW-1024x1024.png",
    "url": "https://forzabuilt.com/product/tac-735r-mist-spray-no-haps-infusion-molding-adhesive/",
    "specifications": {
      "type": "Mist Spray No HAPS Infusion Molding Adhesive",
      "viscosity": "400-700 cps",
      "solids": "15-20%",
      "flashPoint": ">160°F",
      "potLife": "4 hours",
      "cureTime": "6-12 hours",
      "temperatureRange": "-20°F to +150°F",
      "substrates": [
        "Fiberglass",
        "Carbon Fiber",
        "Composite Materials"
      ],
      "applications": [
        "Composite Manufacturing",
        "Infusion Molding",
        "Structural Bonding",
        "Industrial Assembly"
      ],
      "features": [
        "No HAPS",
        "Environmentally Friendly",
        "Infusion Molding",
        "Composite Grade"
      ],
      "certifications": [
        "HAPS Free",
        "VOC Compliant"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.2 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "tac-738r",
    "name": "TAC-738R – WEB SPRAY ZERO VOC INFUSION MOLDING ADHESIVE",
    "category": "BOND",
    "industry": "composites",
    "description": "Web spray zero VOC infusion molding adhesive for clean manufacturing in composite applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-738R-NEW.png",
    "url": "https://forzabuilt.com/product/tac-738r-web-spray-zero-voc-infusion-molding-adhesive/",
    "specifications": {
      "type": "Web Spray Zero VOC Infusion Molding Adhesive",
      "viscosity": "500-800 cps",
      "solids": "18-25%",
      "flashPoint": ">160°F",
      "potLife": "6 hours",
      "cureTime": "8-16 hours",
      "temperatureRange": "-30°F to +160°F",
      "substrates": [
        "Fiberglass",
        "Carbon Fiber",
        "Composite Materials"
      ],
      "applications": [
        "Composite Manufacturing",
        "Infusion Molding",
        "Structural Bonding",
        "Industrial Assembly"
      ],
      "features": [
        "Zero VOC",
        "Clean Manufacturing",
        "Infusion Molding",
        "Composite Grade"
      ],
      "certifications": [
        "Zero VOC",
        "Composite Approved"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.4 lbs/gal",
      "pH": "6.8-7.2",
      "color": "Clear to Light Amber",
      "odor": "Minimal",
      "shelfLife": "15 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "tac850",
    "name": "TAC850 – MIST SPRAY POLYMER CONCRETE MOLDING PROCESS TACKIFIER",
    "category": "BOND",
    "industry": "composites",
    "description": "Mist spray polymer concrete molding process tackifier for composite and concrete applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2025/05/TAC850GR-CANISTER-1024x1024.png",
    "url": "https://forzabuilt.com/product/tac850-web-spray-polymer-concrete-molding-process-tackifier/",
    "specifications": {
      "type": "Mist Spray Polymer Concrete Molding Process Tackifier",
      "viscosity": "300-600 cps",
      "solids": "15-25%",
      "flashPoint": ">140°F",
      "potLife": "4 hours",
      "cureTime": "6-12 hours",
      "temperatureRange": "-20°F to +140°F",
      "substrates": [
        "Polymer Concrete",
        "Composite Materials",
        "Fiberglass",
        "Carbon Fiber"
      ],
      "applications": [
        "Polymer Concrete Molding",
        "Composite Manufacturing",
        "Process Tackifier",
        "Industrial Assembly"
      ],
      "features": [
        "Mist Spray",
        "Polymer Concrete",
        "Process Tackifier",
        "Composite Grade"
      ],
      "certifications": [
        "VOC Compliant",
        "Composite Approved"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.0 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Amber",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "tac-r750",
    "name": "TAC-R750 – TWO PART, METHACRYLATE ADHESIVE",
    "category": "BOND",
    "industry": "composites",
    "description": "Two-part methacrylate adhesive for high-performance composite applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2025/03/Dual-Cartridge-TAC-R750-1.png",
    "url": "https://forzabuilt.com/product/tac-r750-two-part-methacrylate-adhesive/",
    "specifications": {
      "type": "Two-Part Methacrylate Adhesive",
      "viscosity": "50,000-100,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "5 minutes",
      "cureTime": "2-4 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Fiberglass",
        "Carbon Fiber",
        "Composite Materials"
      ],
      "applications": [
        "Composite Assembly",
        "Structural Bonding",
        "Industrial Assembly",
        "Automotive Parts"
      ],
      "features": [
        "Two-Part",
        "Methacrylate",
        "High Strength",
        "Fast Cure"
      ],
      "certifications": [
        "Structural Rated",
        "Two-Part System"
      ],
      "packaging": [
        "Dual Cartridge",
        "Bulk Containers"
      ]
    },
    "technicalData": {
      "density": "1.2 g/cm³",
      "pH": "Neutral",
      "color": "Clear to Light Amber",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "tac-r777",
    "name": "TAC-R777 – TWO-PART MODIFIED EPOXY ADHESIVE",
    "category": "BOND",
    "industry": "composites",
    "description": "Two-part modified epoxy adhesive for demanding composite applications requiring superior bonding strength.",
    "image": "https://forzabuilt.com/wp-content/uploads/2025/03/52-GAL-DRUM-TAC-R777.png",
    "url": "https://forzabuilt.com/product/tac-r777-two-part-modified-epoxy-adhesive/",
    "specifications": {
      "type": "Two-Part Modified Epoxy Adhesive",
      "viscosity": "100,000-200,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "30 minutes",
      "cureTime": "4-8 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Fiberglass",
        "Carbon Fiber",
        "Composite Materials"
      ],
      "applications": [
        "Composite Assembly",
        "Structural Bonding",
        "Industrial Assembly",
        "Automotive Parts"
      ],
      "features": [
        "Two-Part",
        "Modified Epoxy",
        "High Strength",
        "Chemical Resistant"
      ],
      "certifications": [
        "Structural Rated",
        "Two-Part System"
      ],
      "packaging": [
        "Dual Cartridge",
        "Bulk Containers"
      ]
    },
    "technicalData": {
      "density": "1.3 g/cm³",
      "pH": "Neutral",
      "color": "Clear to Light Amber",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "tac-os74",
    "name": "TAC-OS74 – ULTRA HIGH-STRENGTH HYBRID POLYMER STRUCTURAL ADHESIVE",
    "category": "BOND",
    "industry": "composites",
    "description": "Ultra high-strength hybrid polymer structural adhesive for composite applications requiring superior bonding performance.",
    "image": "https://forzabuilt.com/wp-content/uploads/2025/03/sausage-TAC-OS74.png",
    "url": "https://forzabuilt.com/product/tac-os74-ultra-high-strength-hybrid-polymer-structural-adhesive/",
    "specifications": {
      "type": "Ultra High-Strength Hybrid Polymer Structural Adhesive",
      "viscosity": "300,000-400,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "45 minutes",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Fiberglass",
        "Carbon Fiber"
      ],
      "applications": [
        "Composite Assembly",
        "Structural Bonding",
        "Industrial Assembly",
        "Automotive Parts"
      ],
      "features": [
        "Ultra High Strength",
        "Hybrid Polymer",
        "Structural",
        "High Performance"
      ],
      "certifications": [
        "VOC Compliant",
        "Structural Rated"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "1.5 g/cm³",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "tac-os75",
    "name": "TAC-OS75 – NEUTRAL CURE OXIME SILICONE SEALANT",
    "category": "SEAL",
    "industry": "composites",
    "description": "Neutral cure oxime silicone sealant for composite applications requiring superior sealing performance.",
    "image": "https://forzabuilt.com/wp-content/uploads/2025/05/TAC-OS75-Cartridge.png",
    "url": "https://forzabuilt.com/product/tac-os75-neutral-cure-oxime-silicone-sealant/",
    "specifications": {
      "type": "Neutral Cure Oxime Silicone Sealant",
      "viscosity": "50,000-100,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "30 minutes",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Fiberglass",
        "Carbon Fiber"
      ],
      "applications": [
        "Composite Sealing",
        "Structural Sealing",
        "Industrial Sealing",
        "Automotive Sealing"
      ],
      "features": [
        "Neutral Cure",
        "Oxime Silicone",
        "High Performance",
        "Weather Resistant"
      ],
      "certifications": [
        "VOC Compliant",
        "Sealant Rated"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "1.2 g/cm³",
      "pH": "Neutral",
      "color": "Clear to Light Amber",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "rc826",
    "name": "RC826 – LOW VOC, CA COMPLIANT, MULTI-PURPOSE ADHESIVE",
    "category": "BOND",
    "industry": "insulation",
    "description": "Low VOC, CA compliant multi-purpose adhesive for insulation applications requiring environmentally conscious bonding solutions.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/10/RC826-Aerosol_Forza_Mockup-768x1024.png",
    "url": "https://forzabuilt.com/product/rc826-low-voc-ca-compliant-multi-purpose-adhesive/",
    "specifications": {
      "type": "Low VOC Multi-Purpose Adhesive",
      "viscosity": "200-400 cps",
      "solids": "15-25%",
      "flashPoint": ">140°F",
      "potLife": "4 hours",
      "cureTime": "6-12 hours",
      "temperatureRange": "-20°F to +150°F",
      "substrates": [
        "Fiberglass",
        "Foam",
        "Metal",
        "Plastic",
        "Wood",
        "Fabric"
      ],
      "applications": [
        "Insulation Bonding",
        "Industrial Assembly",
        "Construction Bonding",
        "Equipment Mounting"
      ],
      "features": [
        "Low VOC",
        "CA Compliant",
        "Multi-Purpose",
        "Environmentally Friendly"
      ],
      "certifications": [
        "Low VOC",
        "CA Compliant"
      ],
      "packaging": [
        "Aerosol Can",
        "1 Gallon",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.0 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Amber",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "rc862",
    "name": "RC862 – NON-FLAMMABLE, NON-METHYLENE CHLORIDE CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "insulation",
    "description": "Non-flammable, non-methylene chloride contact adhesive for safe insulation applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/10/RC862-canister-mockup-1024x1024.png",
    "url": "https://forzabuilt.com/product/rc862-non-flammable-non-methylene-chloride-contact-adhesive/",
    "specifications": {
      "type": "Non-Flammable Contact Adhesive",
      "viscosity": "800-1200 cps",
      "solids": "25-30%",
      "flashPoint": "Non-Flammable",
      "potLife": "8 hours",
      "cureTime": "24-48 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Fiberglass",
        "Foam",
        "Metal",
        "Plastic",
        "Wood",
        "Fabric"
      ],
      "applications": [
        "Insulation Bonding",
        "Industrial Assembly",
        "Construction Bonding",
        "Equipment Mounting"
      ],
      "features": [
        "Non-Flammable",
        "Safe Handling",
        "Contact Adhesive",
        "Chemical Resistant"
      ],
      "certifications": [
        "Non-Flammable",
        "Safe for Insulation"
      ],
      "packaging": [
        "Canister",
        "1 Gallon",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "8.0 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Blue",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container closed"
    }
  },
  {
    "id": "rc863",
    "name": "RC863 – LOW VOC, CA COMPLIANT, MULTI-PURPOSE, CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "insulation",
    "description": "Low VOC, CA compliant multi-purpose contact adhesive for environmentally conscious insulation applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/10/RC836-1024x1024.png",
    "url": "https://forzabuilt.com/product/rc863-low-voc-ca-compliant-multi-purpose-contact-adhesive/",
    "specifications": {
      "type": "Low VOC Contact Adhesive",
      "viscosity": "600-1000 cps",
      "solids": "20-30%",
      "flashPoint": ">140°F",
      "potLife": "6 hours",
      "cureTime": "8-16 hours",
      "temperatureRange": "-20°F to +150°F",
      "substrates": [
        "Fiberglass",
        "Foam",
        "Metal",
        "Plastic",
        "Wood",
        "Fabric"
      ],
      "applications": [
        "Insulation Bonding",
        "Industrial Assembly",
        "Construction Bonding",
        "Equipment Mounting"
      ],
      "features": [
        "Low VOC",
        "CA Compliant",
        "Contact Adhesive",
        "Environmentally Friendly"
      ],
      "certifications": [
        "Low VOC",
        "CA Compliant"
      ],
      "packaging": [
        "Canister",
        "1 Gallon",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.5 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Amber",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "rc864",
    "name": "RC864 – AGGRESSIVE, FAST DRYING, PRESSURE SENSITIVE ADHESIVE",
    "category": "BOND",
    "industry": "insulation",
    "description": "Aggressive, fast drying pressure sensitive adhesive for demanding insulation applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/10/RC886-Bundle-1024x1024.png",
    "url": "https://forzabuilt.com/product/rc864-aggressive-fast-drying-pressure-sensitive-adhesive/",
    "specifications": {
      "type": "Pressure Sensitive Adhesive",
      "viscosity": "1000-2000 cps",
      "solids": "30-40%",
      "flashPoint": ">160°F",
      "potLife": "2 hours",
      "cureTime": "4-8 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Fiberglass",
        "Foam",
        "Metal",
        "Plastic",
        "Wood",
        "Fabric"
      ],
      "applications": [
        "Insulation Bonding",
        "Industrial Assembly",
        "Construction Bonding",
        "Equipment Mounting"
      ],
      "features": [
        "Aggressive",
        "Fast Drying",
        "Pressure Sensitive",
        "High Performance"
      ],
      "certifications": [
        "Industrial Grade",
        "Pressure Sensitive"
      ],
      "packaging": [
        "Canister",
        "1 Gallon",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "8.5 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Amber",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "rc886",
    "name": "RC886 – LOW VOC, CA COMPLIANT, AGGRESSIVE, FAST DRYING, PRESSURE SENSITIVE ADHESIVE",
    "category": "BOND",
    "industry": "insulation",
    "description": "Low VOC, CA compliant aggressive fast drying pressure sensitive adhesive for environmentally conscious insulation applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/10/RC886-Bundle-1024x1024.png",
    "url": "https://forzabuilt.com/product/rc886-low-voc-ca-compliant-aggressive-fast-drying-pressure-sensitive-adhesive/",
    "specifications": {
      "type": "Low VOC Pressure Sensitive Adhesive",
      "viscosity": "1000-2000 cps",
      "solids": "30-40%",
      "flashPoint": ">160°F",
      "potLife": "2 hours",
      "cureTime": "4-8 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Fiberglass",
        "Foam",
        "Metal",
        "Plastic",
        "Wood",
        "Fabric"
      ],
      "applications": [
        "Insulation Bonding",
        "Industrial Assembly",
        "Construction Bonding",
        "Equipment Mounting"
      ],
      "features": [
        "Low VOC",
        "CA Compliant",
        "Aggressive",
        "Fast Drying",
        "Pressure Sensitive"
      ],
      "certifications": [
        "Low VOC",
        "CA Compliant",
        "Pressure Sensitive"
      ],
      "packaging": [
        "Canister",
        "1 Gallon",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "8.5 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Amber",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "rc887",
    "name": "RC887 – HIGH TEMP, PRESSURE-SENSITIVE CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "insulation",
    "description": "High temperature pressure-sensitive contact adhesive for demanding insulation applications requiring thermal resistance.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/10/RC887-canister-mockup-1024x1024.png",
    "url": "https://forzabuilt.com/product/rc887-high-temp-pressure-sensitive-contact-adhesive/",
    "specifications": {
      "type": "High Temperature Pressure Sensitive Adhesive",
      "viscosity": "1500-2500 cps",
      "solids": "35-45%",
      "flashPoint": ">180°F",
      "potLife": "3 hours",
      "cureTime": "6-12 hours",
      "temperatureRange": "-20°F to +200°F",
      "substrates": [
        "Fiberglass",
        "Foam",
        "Metal",
        "Plastic",
        "Wood",
        "Fabric"
      ],
      "applications": [
        "High Temperature Insulation",
        "Industrial Assembly",
        "Construction Bonding",
        "Equipment Mounting"
      ],
      "features": [
        "High Temperature",
        "Pressure Sensitive",
        "Thermal Resistant",
        "High Performance"
      ],
      "certifications": [
        "High Temperature Rated",
        "Pressure Sensitive"
      ],
      "packaging": [
        "Canister",
        "1 Gallon",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "9.0 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Amber",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "r-c661",
    "name": "R-C661 – NON FLAMMABLE HIGH PERFORMANCE SPRAY CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "insulation",
    "description": "Non-flammable high performance spray contact adhesive for safe and efficient insulation applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/10/5gal-pail-metal-C661-1-1024x1024.png",
    "url": "https://forzabuilt.com/product/r-c661-non-flam-high-performance-spray-contact-adhesive/",
    "specifications": {
      "type": "Non-Flammable Spray Contact Adhesive",
      "viscosity": "300-600 cps",
      "solids": "20-30%",
      "flashPoint": "Non-Flammable",
      "potLife": "4 hours",
      "cureTime": "6-12 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Fiberglass",
        "Foam",
        "Metal",
        "Plastic",
        "Wood",
        "Fabric"
      ],
      "applications": [
        "Insulation Bonding",
        "Industrial Assembly",
        "Construction Bonding",
        "Equipment Mounting"
      ],
      "features": [
        "Non-Flammable",
        "Spray Application",
        "High Performance",
        "Safe Handling"
      ],
      "certifications": [
        "Non-Flammable",
        "Spray Grade"
      ],
      "packaging": [
        "Spray Can",
        "1 Gallon",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "7.5 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Blue",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "r-r820",
    "name": "R-R820 – TWO-PART, EPOXY ADHESIVE",
    "category": "BOND",
    "industry": "insulation",
    "description": "Two-part epoxy adhesive for high-strength insulation applications requiring superior bonding performance.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/10/R-R820-Dual-Cartridge-1024x1024.png",
    "url": "https://forzabuilt.com/product/r-r820-two-part-epoxy-adhesive/",
    "specifications": {
      "type": "Two-Part Epoxy Adhesive",
      "viscosity": "100,000-200,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "30 minutes",
      "cureTime": "4-8 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Fiberglass",
        "Foam",
        "Wood",
        "Concrete"
      ],
      "applications": [
        "Structural Insulation Bonding",
        "Industrial Assembly",
        "Construction Bonding",
        "Equipment Mounting"
      ],
      "features": [
        "Two-Part",
        "Epoxy",
        "High Strength",
        "Structural Bonding"
      ],
      "certifications": [
        "Structural Rated",
        "Two-Part System"
      ],
      "packaging": [
        "Dual Cartridge",
        "Bulk Containers"
      ]
    },
    "technicalData": {
      "density": "1.3 g/cm³",
      "pH": "Neutral",
      "color": "Clear to Light Amber",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "r-a2000",
    "name": "R-A2000 – LOW/MEDIUM VISCOSITY LAMINATING ADHESIVE",
    "category": "BOND",
    "industry": "insulation",
    "description": "Low/medium viscosity laminating adhesive for insulation applications requiring precise bonding control.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/10/Tote-R-A1000.png",
    "url": "https://forzabuilt.com/product/r-a2000-low-medium-viscosity-laminating-adhesive/",
    "specifications": {
      "type": "Low/Medium Viscosity Laminating Adhesive",
      "viscosity": "500-1500 cps",
      "solids": "25-35%",
      "flashPoint": ">140°F",
      "potLife": "6 hours",
      "cureTime": "8-16 hours",
      "temperatureRange": "-20°F to +150°F",
      "substrates": [
        "Fiberglass",
        "Foam",
        "Fabric",
        "Paper",
        "Foil",
        "Plastic"
      ],
      "applications": [
        "Insulation Laminating",
        "Industrial Assembly",
        "Construction Bonding",
        "Equipment Mounting"
      ],
      "features": [
        "Low/Medium Viscosity",
        "Laminating",
        "Precise Control",
        "High Performance"
      ],
      "certifications": [
        "Laminating Grade",
        "VOC Compliant"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.8 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Amber",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "r-osa",
    "name": "R-OSA – ISOPROPYL ALCOHOL BASED CLEANER/ADHESION PROMOTER",
    "category": "BOND",
    "industry": "insulation",
    "description": "Isopropyl alcohol based cleaner and adhesion promoter for preparing surfaces before insulation bonding applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2025/01/R-OSA-1024x1024.png",
    "url": "https://forzabuilt.com/product/r-osa-isopropyl-alcohol-based-cleaner-adhesion-promoter/",
    "specifications": {
      "type": "Isopropyl Alcohol Based Cleaner/Adhesion Promoter",
      "viscosity": "1-5 cps",
      "solids": "0%",
      "flashPoint": ">70°F",
      "potLife": "Unlimited",
      "cureTime": "Immediate",
      "temperatureRange": "-20°F to +100°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Fiberglass",
        "Foam",
        "Wood",
        "Glass"
      ],
      "applications": [
        "Surface Preparation",
        "Adhesion Promotion",
        "Cleaning",
        "Pre-Bonding Treatment"
      ],
      "features": [
        "Isopropyl Alcohol",
        "Cleaner",
        "Adhesion Promoter",
        "Surface Preparation"
      ],
      "certifications": [
        "Cleaning Grade",
        "Adhesion Promoter"
      ],
      "packaging": [
        "Spray Bottle",
        "1 Gallon",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "6.6 lbs/gal",
      "pH": "Neutral",
      "color": "Clear",
      "odor": "Isopropyl Alcohol",
      "shelfLife": "24 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "r-os8",
    "name": "R-OS8 – NON-HAZARDOUS, HIGH STRENGTH, SINGLE PART MOISTURE CURE HYBRID POLYMER",
    "category": "SEAL",
    "industry": "insulation",
    "description": "Non-hazardous, high strength single part moisture cure hybrid polymer for insulation sealing applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/10/R-OS84-Cartridge-819x1024.png",
    "url": "https://forzabuilt.com/product/r-os8-non-hazardous-high-strength-single-part-moisture-cure-hybrid-polymer/",
    "specifications": {
      "type": "Single Part Moisture Cure Hybrid Polymer",
      "viscosity": "200,000-400,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "Unlimited",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Fiberglass",
        "Foam"
      ],
      "applications": [
        "Insulation Sealing",
        "Structural Sealing",
        "Industrial Sealing",
        "Construction Sealing"
      ],
      "features": [
        "Non-Hazardous",
        "High Strength",
        "Moisture Cure",
        "Hybrid Polymer"
      ],
      "certifications": [
        "Non-Hazardous",
        "Sealant Rated"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "1.4 g/cm³",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "r-os84",
    "name": "R-OS84 – SINGLE-COMPONENT SILICONE SEALANT",
    "category": "SEAL",
    "industry": "insulation",
    "description": "Single-component silicone sealant for insulation applications requiring superior sealing performance.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/10/R-OS84-Cartridge-819x1024.png",
    "url": "https://forzabuilt.com/product/r-os84-single-component-silicone-sealant/",
    "specifications": {
      "type": "Single-Component Silicone Sealant",
      "viscosity": "50,000-100,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "Unlimited",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Fiberglass",
        "Foam"
      ],
      "applications": [
        "Insulation Sealing",
        "Structural Sealing",
        "Industrial Sealing",
        "Construction Sealing"
      ],
      "features": [
        "Single-Component",
        "Silicone",
        "High Performance",
        "Weather Resistant"
      ],
      "certifications": [
        "Silicone Rated",
        "Sealant Rated"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "1.2 g/cm³",
      "pH": "Neutral",
      "color": "Clear to Light Amber",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "r-t600",
    "name": "R-T600 – THERMAL-BREAK FOAM TAPE",
    "category": "TAPE",
    "industry": "insulation",
    "description": "Thermal-break foam tape for insulation applications requiring thermal management and bonding.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/10/R-T600-1024x1024.png",
    "url": "https://forzabuilt.com/product/r-t600-thermal-break-foam-tape/",
    "specifications": {
      "type": "Thermal-Break Foam Tape",
      "thickness": "0.125\" - 0.250\"",
      "width": "0.5\" - 2\"",
      "length": "36 yards per roll",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Fiberglass",
        "Foam"
      ],
      "applications": [
        "Thermal Break",
        "Insulation Bonding",
        "Industrial Assembly",
        "Construction Bonding"
      ],
      "features": [
        "Thermal Break",
        "Foam Cushioning",
        "Insulation Grade",
        "Pressure Sensitive"
      ],
      "certifications": [
        "Thermal Break Rated",
        "Insulation Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths",
        "Bulk packaging"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Closed Cell",
      "peelStrength": "40+ oz/in",
      "shearStrength": "80+ psi",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "24 months",
      "storageConditions": "Store at 60-80°F, keep in original packaging"
    }
  },
  {
    "id": "r-t620",
    "name": "R-T620 – LOW DENSITY, REVERSE WOUND, PVS, SINGLE SIDED THERMAL TAPE",
    "category": "TAPE",
    "industry": "insulation",
    "description": "Low density, reverse wound, PVS, single sided thermal tape for insulation applications requiring thermal management.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/10/R-T620-Tape-1-1024x1024.png",
    "url": "https://forzabuilt.com/product/r-t620-low-density-reverse-wound-pvs-single-sided-thermal-tape/",
    "specifications": {
      "type": "Single Sided Thermal Tape",
      "thickness": "0.062\" - 0.125\"",
      "width": "0.5\" - 2\"",
      "length": "36 yards per roll",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Fiberglass",
        "Foam"
      ],
      "applications": [
        "Thermal Management",
        "Insulation Bonding",
        "Industrial Assembly",
        "Construction Bonding"
      ],
      "features": [
        "Low Density",
        "Reverse Wound",
        "PVS",
        "Thermal Management"
      ],
      "certifications": [
        "Thermal Rated",
        "Insulation Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths",
        "Bulk packaging"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Low Density",
      "peelStrength": "35+ oz/in",
      "shearStrength": "70+ psi",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "24 months",
      "storageConditions": "Store at 60-80°F, keep in original packaging"
    }
  },
  {
    "id": "r-t860",
    "name": "R-T860 – COLD TEMPERATURE DOUBLE COATED TAPE",
    "category": "TAPE",
    "industry": "insulation",
    "description": "Cold temperature double coated tape for insulation applications requiring low temperature performance.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/10/R-T860-1024x1024.png",
    "url": "https://forzabuilt.com/product/r-t860-cold-temperature-double-coated-tape/",
    "specifications": {
      "type": "Cold Temperature Double Coated Tape",
      "thickness": "0.062\" - 0.125\"",
      "width": "0.5\" - 2\"",
      "length": "36 yards per roll",
      "temperatureRange": "-60°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Fiberglass",
        "Foam"
      ],
      "applications": [
        "Cold Temperature Bonding",
        "Insulation Bonding",
        "Industrial Assembly",
        "Construction Bonding"
      ],
      "features": [
        "Cold Temperature",
        "Double Coated",
        "High Performance",
        "Pressure Sensitive"
      ],
      "certifications": [
        "Cold Temperature Rated",
        "Insulation Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths",
        "Bulk packaging"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Closed Cell",
      "peelStrength": "45+ oz/in",
      "shearStrength": "85+ psi",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "24 months",
      "storageConditions": "Store at 60-80°F, keep in original packaging"
    }
  },
  {
    "id": "ic932",
    "name": "IC932 – NON FLAMMABLE NON-METHYLENE CHLORIDE CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "Non-flammable non-methylene chloride contact adhesive for safe industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/03/IC933-bundle-1024x1024.png",
    "url": "https://forzabuilt.com/product/ic932-non-flammable-non-methylene-chloride-contact-adhesive/",
    "specifications": {
      "type": "Non-Flammable Contact Adhesive",
      "viscosity": "800-1200 cps",
      "solids": "25-30%",
      "flashPoint": "Non-Flammable",
      "potLife": "8 hours",
      "cureTime": "24-48 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Wood",
        "Fabric",
        "Glass",
        "Ceramic"
      ],
      "applications": [
        "Industrial Assembly",
        "Equipment Bonding",
        "Manufacturing",
        "General Bonding"
      ],
      "features": [
        "Non-Flammable",
        "Safe Handling",
        "Contact Adhesive",
        "Chemical Resistant"
      ],
      "certifications": [
        "Non-Flammable",
        "Industrial Grade"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "8.0 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Blue",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container closed"
    }
  },
  {
    "id": "ic933",
    "name": "IC933 – CA COMPLIANT HIGH-STRENGTH CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "CA compliant high-strength contact adhesive for environmentally conscious industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/03/IC933-bundle-1024x1024.png",
    "url": "https://forzabuilt.com/product/ic933-ca-compliant-high-strength-contact-adhesive/",
    "specifications": {
      "type": "CA Compliant Contact Adhesive",
      "viscosity": "1000-1500 cps",
      "solids": "30-35%",
      "flashPoint": ">160°F",
      "potLife": "6 hours",
      "cureTime": "8-16 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Wood",
        "Fabric",
        "Glass",
        "Ceramic"
      ],
      "applications": [
        "Industrial Assembly",
        "Equipment Bonding",
        "Manufacturing",
        "General Bonding"
      ],
      "features": [
        "CA Compliant",
        "High Strength",
        "Contact Adhesive",
        "Environmentally Friendly"
      ],
      "certifications": [
        "CA Compliant",
        "Industrial Grade"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "8.5 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Amber",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "ic934",
    "name": "IC934 – STYRENE SAFE PRESSURE SENSITIVE ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "Styrene safe pressure sensitive adhesive for industrial applications requiring safe handling.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/03/IC934-bundle-1024x1024.png",
    "url": "https://forzabuilt.com/product/ic934-styrene-safe-pressure-sensitive-adhesive/",
    "specifications": {
      "type": "Styrene Safe Pressure Sensitive Adhesive",
      "viscosity": "1500-2000 cps",
      "solids": "35-40%",
      "flashPoint": ">180°F",
      "potLife": "4 hours",
      "cureTime": "6-12 hours",
      "temperatureRange": "-20°F to +180°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Wood",
        "Fabric",
        "Glass",
        "Ceramic"
      ],
      "applications": [
        "Industrial Assembly",
        "Equipment Bonding",
        "Manufacturing",
        "General Bonding"
      ],
      "features": [
        "Styrene Safe",
        "Pressure Sensitive",
        "Safe Handling",
        "High Performance"
      ],
      "certifications": [
        "Styrene Safe",
        "Industrial Grade"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "9.0 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Amber",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "ic946",
    "name": "IC946 – CA COMPLIANT PRESSURE SENSITIVE ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "CA compliant pressure sensitive adhesive for environmentally conscious industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/03/IC946-bundle-1024x1024.png",
    "url": "https://forzabuilt.com/product/ic946-ca-compliant-pressure-sensitive-adhesive/",
    "specifications": {
      "type": "CA Compliant Pressure Sensitive Adhesive",
      "viscosity": "1200-1800 cps",
      "solids": "30-35%",
      "flashPoint": ">160°F",
      "potLife": "5 hours",
      "cureTime": "8-16 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Wood",
        "Fabric",
        "Glass",
        "Ceramic"
      ],
      "applications": [
        "Industrial Assembly",
        "Equipment Bonding",
        "Manufacturing",
        "General Bonding"
      ],
      "features": [
        "CA Compliant",
        "Pressure Sensitive",
        "Environmentally Friendly",
        "High Performance"
      ],
      "certifications": [
        "CA Compliant",
        "Industrial Grade"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "8.5 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Amber",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "ic947",
    "name": "IC947 – HIGH-TEMP STYRENE-SAFE PRESSURE SENSITIVE ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "High-temperature styrene-safe pressure sensitive adhesive for demanding industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/06/BOND-IC947-Mockup-NEW-705x1024.png",
    "url": "https://forzabuilt.com/product/ic947-high-temp-styrene-safe-pressure-sensitive-adhesive/",
    "specifications": {
      "type": "High-Temperature Styrene-Safe Pressure Sensitive Adhesive",
      "viscosity": "1800-2500 cps",
      "solids": "40-45%",
      "flashPoint": ">200°F",
      "potLife": "3 hours",
      "cureTime": "6-12 hours",
      "temperatureRange": "-20°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Wood",
        "Fabric",
        "Glass",
        "Ceramic"
      ],
      "applications": [
        "High-Temperature Industrial Assembly",
        "Equipment Bonding",
        "Manufacturing",
        "General Bonding"
      ],
      "features": [
        "High-Temperature",
        "Styrene Safe",
        "Pressure Sensitive",
        "High Performance"
      ],
      "certifications": [
        "High-Temperature Rated",
        "Styrene Safe",
        "Industrial Grade"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "9.5 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Amber",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "81-0389",
    "name": "81-0389 – HIGH PERFORMANCE NEOPRENE CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "High performance neoprene contact adhesive for demanding industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/06/BOND-81-0389-NEW-1024x1024.png",
    "url": "https://forzabuilt.com/product/81-0389-high-performance-neoprene-contact-adhesive/",
    "specifications": {
      "type": "High Performance Neoprene Contact Adhesive",
      "viscosity": "2000-3000 cps",
      "solids": "35-40%",
      "flashPoint": ">180°F",
      "potLife": "4 hours",
      "cureTime": "6-12 hours",
      "temperatureRange": "-20°F to +180°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Wood",
        "Fabric",
        "Glass",
        "Ceramic"
      ],
      "applications": [
        "Industrial Assembly",
        "Equipment Bonding",
        "Manufacturing",
        "General Bonding"
      ],
      "features": [
        "High Performance",
        "Neoprene",
        "Contact Adhesive",
        "Chemical Resistant"
      ],
      "certifications": [
        "High Performance",
        "Industrial Grade"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "9.0 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Amber",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "c130",
    "name": "C130 – HIGH HEAT NEOPRENE ADHESIVE",
    "category": "BOND",
    "industry": "industrial",
    "description": "High heat neoprene adhesive for industrial applications requiring thermal resistance.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/C130-Clear-55-Gallon-1024x1024.png",
    "url": "https://forzabuilt.com/product/c130-high-heat-neoprene-adhesive/",
    "specifications": {
      "type": "High Heat Neoprene Adhesive",
      "viscosity": "2500-3500 cps",
      "solids": "40-45%",
      "flashPoint": ">200°F",
      "potLife": "3 hours",
      "cureTime": "6-12 hours",
      "temperatureRange": "-20°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Wood",
        "Fabric",
        "Glass",
        "Ceramic"
      ],
      "applications": [
        "High-Temperature Industrial Assembly",
        "Equipment Bonding",
        "Manufacturing",
        "General Bonding"
      ],
      "features": [
        "High Heat",
        "Neoprene",
        "Thermal Resistant",
        "Chemical Resistant"
      ],
      "certifications": [
        "High Heat Rated",
        "Industrial Grade"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "9.5 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "c150",
    "name": "C150 – CA COMPLIANT CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "industrial",
    "description": "CA compliant contact adhesive for environmentally conscious industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/C150-CA-COMPLIANT-HIGH-SOLIDS-CONTACT-ADHESIVE-1024x1024.png",
    "url": "https://forzabuilt.com/product/c150-ca-compliant-contact-adhesive/",
    "specifications": {
      "type": "CA Compliant Contact Adhesive",
      "viscosity": "1500-2500 cps",
      "solids": "35-40%",
      "flashPoint": ">160°F",
      "potLife": "5 hours",
      "cureTime": "8-16 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Wood",
        "Fabric",
        "Glass",
        "Ceramic"
      ],
      "applications": [
        "Industrial Assembly",
        "Equipment Bonding",
        "Manufacturing",
        "General Bonding"
      ],
      "features": [
        "CA Compliant",
        "Contact Adhesive",
        "Environmentally Friendly",
        "High Performance"
      ],
      "certifications": [
        "CA Compliant",
        "Industrial Grade"
      ],
      "packaging": [
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "8.5 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Clear to Light Amber",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "c331",
    "name": "C331 – NON-FLAMMABLE SPRAYABLE CONTACT ADHESIVE",
    "category": "BOND",
    "industry": "industrial",
    "description": "Non-flammable sprayable contact adhesive for safe and efficient industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/C331-Blue-55-Gallon.png",
    "url": "https://forzabuilt.com/product/c331-non-flammable-sprayable-contact-adhesive/",
    "specifications": {
      "type": "Non-Flammable Sprayable Contact Adhesive",
      "viscosity": "300-600 cps",
      "solids": "20-30%",
      "flashPoint": "Non-Flammable",
      "potLife": "4 hours",
      "cureTime": "6-12 hours",
      "temperatureRange": "-20°F to +160°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Wood",
        "Fabric",
        "Glass",
        "Ceramic"
      ],
      "applications": [
        "Industrial Assembly",
        "Equipment Bonding",
        "Manufacturing",
        "General Bonding"
      ],
      "features": [
        "Non-Flammable",
        "Sprayable",
        "Contact Adhesive",
        "Safe Handling"
      ],
      "certifications": [
        "Non-Flammable",
        "Spray Grade",
        "Industrial Grade"
      ],
      "packaging": [
        "Spray Can",
        "1 Gallon",
        "5 Gallon",
        "55 Gallon"
      ]
    },
    "technicalData": {
      "density": "7.5 lbs/gal",
      "pH": "6.5-7.0",
      "color": "Blue",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "frp",
    "name": "FRP – HYBRID POLYMER ROLLABLE FRP ADHESIVE",
    "category": "BOND",
    "industry": "composites",
    "description": "Hybrid polymer rollable FRP adhesive for industrial FRP applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/FRP-Rollable-Adhesive-v2-1024x1024.png",
    "url": "https://forzabuilt.com/product/frp-hybrid-polymer-rollable-frp-adhesive/",
    "specifications": {
      "type": "Hybrid Polymer Rollable FRP Adhesive",
      "viscosity": "50,000-100,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "30 minutes",
      "cureTime": "4-8 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "FRP",
        "Metal",
        "Plastic",
        "Wood",
        "Concrete"
      ],
      "applications": [
        "FRP Installation",
        "Industrial Assembly",
        "Equipment Bonding",
        "Manufacturing"
      ],
      "features": [
        "Hybrid Polymer",
        "Rollable",
        "FRP Grade",
        "High Performance"
      ],
      "certifications": [
        "FRP Rated",
        "Industrial Grade"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "1.3 g/cm³",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "oa4",
    "name": "OA4 – HYBRID POLYMER ADHESIVE / SEALANT",
    "category": "BOND",
    "industry": "industrial",
    "description": "Hybrid polymer adhesive and sealant for industrial applications requiring both bonding and sealing.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/OA4-Cartridge-.png",
    "url": "https://forzabuilt.com/product/oa4-hybrid-polymer-adhesive-sealant/",
    "specifications": {
      "type": "Hybrid Polymer Adhesive/Sealant",
      "viscosity": "200,000-400,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "45 minutes",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Ceramic"
      ],
      "applications": [
        "Industrial Assembly",
        "Equipment Bonding",
        "Manufacturing",
        "Sealing Applications"
      ],
      "features": [
        "Hybrid Polymer",
        "Adhesive/Sealant",
        "High Performance",
        "Versatile"
      ],
      "certifications": [
        "Industrial Grade",
        "Sealant Rated"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "1.4 g/cm³",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "oa12",
    "name": "OA12 – HIGH GREEN STRENGTH MOUNTING ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "High green strength mounting adhesive for industrial applications requiring immediate bonding strength.",
    "image": "https://forzabuilt.com/wp-content/uploads/2025/03/OA12_Cartridge.png",
    "url": "https://forzabuilt.com/product/oa12-high-green-strength-mounting-adhesive/",
    "specifications": {
      "type": "High Green Strength Mounting Adhesive",
      "viscosity": "300,000-500,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "30 minutes",
      "cureTime": "2-4 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Ceramic"
      ],
      "applications": [
        "Industrial Mounting",
        "Equipment Assembly",
        "Manufacturing",
        "General Bonding"
      ],
      "features": [
        "High Green Strength",
        "Mounting Adhesive",
        "Fast Cure",
        "High Performance"
      ],
      "certifications": [
        "Mounting Rated",
        "Industrial Grade"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "1.5 g/cm³",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "oa13",
    "name": "OA13 – HIGH GREEN STRENGTH MOUNTING ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "High green strength mounting adhesive for industrial applications requiring immediate bonding strength.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/08/OA13_Cartridge.png",
    "url": "https://forzabuilt.com/product/oa13-high-green-strength-mounting-adhesive/",
    "specifications": {
      "type": "High Green Strength Mounting Adhesive",
      "viscosity": "300,000-500,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "30 minutes",
      "cureTime": "2-4 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Ceramic"
      ],
      "applications": [
        "Industrial Mounting",
        "Equipment Assembly",
        "Manufacturing",
        "General Bonding"
      ],
      "features": [
        "High Green Strength",
        "Mounting Adhesive",
        "Fast Cure",
        "High Performance"
      ],
      "certifications": [
        "Mounting Rated",
        "Industrial Grade"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "1.5 g/cm³",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "oa23",
    "name": "OA23 – HYBRID POLYMER FAST GRAB ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "Hybrid polymer fast grab adhesive for industrial applications requiring immediate bonding.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/06/Cartridge-OA23-819x1024.png",
    "url": "https://forzabuilt.com/product/oa23-hybrid-polymer-fast-grab-adhesive/",
    "specifications": {
      "type": "Hybrid Polymer Fast Grab Adhesive",
      "viscosity": "400,000-600,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "20 minutes",
      "cureTime": "1-2 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Ceramic"
      ],
      "applications": [
        "Industrial Assembly",
        "Equipment Bonding",
        "Manufacturing",
        "Fast Bonding"
      ],
      "features": [
        "Fast Grab",
        "Hybrid Polymer",
        "Immediate Bonding",
        "High Performance"
      ],
      "certifications": [
        "Fast Grab Rated",
        "Industrial Grade"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "1.6 g/cm³",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "os24",
    "name": "OS24 – ULTRA HIGH-STRENGTH HYBRID POLYMER STRUCTURAL ADHESIVE",
    "category": "BOND",
    "industry": "industrial",
    "description": "Ultra high-strength hybrid polymer structural adhesive for demanding industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/03/OS24-sausage-1024x1024.png",
    "url": "https://forzabuilt.com/product/os24-ultra-high-strength-hybrid-polymer-structural-adhesive/",
    "specifications": {
      "type": "Ultra High-Strength Hybrid Polymer Structural Adhesive",
      "viscosity": "500,000-800,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "45 minutes",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Ceramic"
      ],
      "applications": [
        "Structural Industrial Assembly",
        "Equipment Bonding",
        "Manufacturing",
        "High-Strength Bonding"
      ],
      "features": [
        "Ultra High Strength",
        "Hybrid Polymer",
        "Structural",
        "High Performance"
      ],
      "certifications": [
        "Structural Rated",
        "Industrial Grade"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "1.7 g/cm³",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "osa",
    "name": "OSA – ADHESIVE PRIMER AND PROMOTER",
    "category": "BOND",
    "industry": "industrial",
    "description": "Adhesive primer and promoter for preparing surfaces before industrial bonding applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/06/OSA-.png",
    "url": "https://forzabuilt.com/product/osa-adhesive-primer-and-promoter/",
    "specifications": {
      "type": "Adhesive Primer and Promoter",
      "viscosity": "1-5 cps",
      "solids": "0%",
      "flashPoint": ">70°F",
      "potLife": "Unlimited",
      "cureTime": "Immediate",
      "temperatureRange": "-20°F to +100°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Ceramic"
      ],
      "applications": [
        "Surface Preparation",
        "Adhesion Promotion",
        "Pre-Bonding Treatment",
        "Industrial Assembly"
      ],
      "features": [
        "Primer",
        "Adhesion Promoter",
        "Surface Preparation",
        "Industrial Grade"
      ],
      "certifications": [
        "Primer Rated",
        "Industrial Grade"
      ],
      "packaging": [
        "Spray Bottle",
        "1 Gallon",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "6.6 lbs/gal",
      "pH": "Neutral",
      "color": "Clear",
      "odor": "Minimal",
      "shelfLife": "24 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "r160",
    "name": "R160 – TWO-PART 5-MINUTE EPOXY",
    "category": "BOND",
    "industry": "industrial",
    "description": "Two-part 5-minute epoxy for fast industrial bonding applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/R160-Dual-Cartridge-.png",
    "url": "https://forzabuilt.com/product/r160-two-part-5-min-epoxy/",
    "specifications": {
      "type": "Two-Part 5-Minute Epoxy",
      "viscosity": "50,000-100,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "5 minutes",
      "cureTime": "2-4 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Concrete",
        "Ceramic"
      ],
      "applications": [
        "Fast Industrial Assembly",
        "Equipment Bonding",
        "Manufacturing",
        "Quick Repairs"
      ],
      "features": [
        "Two-Part",
        "5-Minute Cure",
        "Epoxy",
        "Fast Bonding"
      ],
      "certifications": [
        "Two-Part System",
        "Industrial Grade"
      ],
      "packaging": [
        "Dual Cartridge",
        "Bulk Containers"
      ]
    },
    "technicalData": {
      "density": "1.2 g/cm³",
      "pH": "Neutral",
      "color": "Clear to Light Amber",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "r221",
    "name": "R221 – TWO-PART MODIFIED EPOXY ADHESIVE",
    "category": "BOND",
    "industry": "industrial",
    "description": "Two-part modified epoxy adhesive for high-strength industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/R221-Dual-Cartridge-1024x1024.png",
    "url": "https://forzabuilt.com/product/r221-two-part-modified-epoxy-adhesive/",
    "specifications": {
      "type": "Two-Part Modified Epoxy Adhesive",
      "viscosity": "100,000-200,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "30 minutes",
      "cureTime": "4-8 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Concrete",
        "Ceramic"
      ],
      "applications": [
        "Structural Industrial Assembly",
        "Equipment Bonding",
        "Manufacturing",
        "High-Strength Bonding"
      ],
      "features": [
        "Two-Part",
        "Modified Epoxy",
        "High Strength",
        "Structural Bonding"
      ],
      "certifications": [
        "Structural Rated",
        "Two-Part System",
        "Industrial Grade"
      ],
      "packaging": [
        "Dual Cartridge",
        "Bulk Containers"
      ]
    },
    "technicalData": {
      "density": "1.3 g/cm³",
      "pH": "Neutral",
      "color": "Clear to Light Amber",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "r519",
    "name": "R519 – TWO-PART METHACRYLATE ADHESIVE",
    "category": "BOND",
    "industry": "industrial",
    "description": "Two-part methacrylate adhesive for high-performance industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/R519-Dual-Cartridge-1024x1024.png",
    "url": "https://forzabuilt.com/product/r519-two-part-methacrylate-adhesive/",
    "specifications": {
      "type": "Two-Part Methacrylate Adhesive",
      "viscosity": "150,000-300,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "15 minutes",
      "cureTime": "2-4 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Concrete",
        "Ceramic"
      ],
      "applications": [
        "High-Performance Industrial Assembly",
        "Equipment Bonding",
        "Manufacturing",
        "Structural Bonding"
      ],
      "features": [
        "Two-Part",
        "Methacrylate",
        "High Performance",
        "Fast Cure"
      ],
      "certifications": [
        "High Performance Rated",
        "Two-Part System",
        "Industrial Grade"
      ],
      "packaging": [
        "Dual Cartridge",
        "Bulk Containers"
      ]
    },
    "technicalData": {
      "density": "1.4 g/cm³",
      "pH": "Neutral",
      "color": "Clear to Light Amber",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "s228",
    "name": "S228 – TAPE PRIMER AND ADHESION PROMOTER",
    "category": "BOND",
    "industry": "industrial",
    "description": "Tape primer and adhesion promoter for preparing surfaces before tape applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/S228-paintcan-mockup-1024x1024.png",
    "url": "https://forzabuilt.com/product/s228-tape-primer-and-adhesion-promoter/",
    "specifications": {
      "type": "Tape Primer and Adhesion Promoter",
      "viscosity": "1-5 cps",
      "solids": "0%",
      "flashPoint": ">70°F",
      "potLife": "Unlimited",
      "cureTime": "Immediate",
      "temperatureRange": "-20°F to +100°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Ceramic"
      ],
      "applications": [
        "Surface Preparation",
        "Tape Adhesion Promotion",
        "Pre-Tape Treatment",
        "Industrial Assembly"
      ],
      "features": [
        "Tape Primer",
        "Adhesion Promoter",
        "Surface Preparation",
        "Industrial Grade"
      ],
      "certifications": [
        "Tape Primer Rated",
        "Industrial Grade"
      ],
      "packaging": [
        "Paint Can",
        "1 Gallon",
        "5 Gallon"
      ]
    },
    "technicalData": {
      "density": "6.6 lbs/gal",
      "pH": "Neutral",
      "color": "Clear",
      "odor": "Minimal",
      "shelfLife": "24 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "ca1000",
    "name": "CA1000 – INSTANT ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "Instant adhesive for quick industrial bonding applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2025/05/CA1000-TR.png",
    "url": "https://forzabuilt.com/product/ca1000-instant-adhesive/",
    "specifications": {
      "type": "Instant Adhesive",
      "viscosity": "1-10 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "Unlimited",
      "cureTime": "Immediate",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Ceramic"
      ],
      "applications": [
        "Instant Industrial Assembly",
        "Quick Repairs",
        "Manufacturing",
        "Fast Bonding"
      ],
      "features": [
        "Instant",
        "Fast Cure",
        "High Performance",
        "Quick Bonding"
      ],
      "certifications": [
        "Instant Rated",
        "Industrial Grade"
      ],
      "packaging": [
        "Bottle",
        "Bulk Containers"
      ]
    },
    "technicalData": {
      "density": "1.1 g/cm³",
      "pH": "Neutral",
      "color": "Clear",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "ca1500",
    "name": "CA1500 – INSTANT ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "Instant adhesive for quick industrial bonding applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2025/05/CA1000-TR.png",
    "url": "https://forzabuilt.com/product/ca1500-instant-adhesive/",
    "specifications": {
      "type": "Instant Adhesive",
      "viscosity": "1-10 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "Unlimited",
      "cureTime": "Immediate",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Ceramic"
      ],
      "applications": [
        "Instant Industrial Assembly",
        "Quick Repairs",
        "Manufacturing",
        "Fast Bonding"
      ],
      "features": [
        "Instant",
        "Fast Cure",
        "High Performance",
        "Quick Bonding"
      ],
      "certifications": [
        "Instant Rated",
        "Industrial Grade"
      ],
      "packaging": [
        "Bottle",
        "Bulk Containers"
      ]
    },
    "technicalData": {
      "density": "1.1 g/cm³",
      "pH": "Neutral",
      "color": "Clear",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "ca2400",
    "name": "CA2400 – INSTANT ADHESIVE",
    "category": "BOND",
    "industry": "construction",
    "description": "Instant adhesive for quick industrial bonding applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2025/05/CA1000-TR.png",
    "url": "https://forzabuilt.com/product/ca2400-instant-adhesive/",
    "specifications": {
      "type": "Instant Adhesive",
      "viscosity": "1-10 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "Unlimited",
      "cureTime": "Immediate",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Ceramic"
      ],
      "applications": [
        "Instant Industrial Assembly",
        "Quick Repairs",
        "Manufacturing",
        "Fast Bonding"
      ],
      "features": [
        "Instant",
        "Fast Cure",
        "High Performance",
        "Quick Bonding"
      ],
      "certifications": [
        "Instant Rated",
        "Industrial Grade"
      ],
      "packaging": [
        "Bottle",
        "Bulk Containers"
      ]
    },
    "technicalData": {
      "density": "1.1 g/cm³",
      "pH": "Neutral",
      "color": "Clear",
      "odor": "Minimal",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "os2",
    "name": "OS2 – MULTI-PURPOSE HYBRID POLYMER SEALANT",
    "category": "SEAL",
    "industry": "construction",
    "description": "Multi-purpose hybrid polymer sealant for industrial sealing applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/OS2-Cartridge-1-1-819x1024.png",
    "url": "https://forzabuilt.com/product/os2-multi-purpose-polymer-sealant/",
    "specifications": {
      "type": "Multi-Purpose Hybrid Polymer Sealant",
      "viscosity": "100,000-200,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "Unlimited",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Ceramic"
      ],
      "applications": [
        "Industrial Sealing",
        "Equipment Sealing",
        "Manufacturing",
        "General Sealing"
      ],
      "features": [
        "Multi-Purpose",
        "Hybrid Polymer",
        "High Performance",
        "Versatile"
      ],
      "certifications": [
        "Industrial Grade",
        "Sealant Rated"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "1.3 g/cm³",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "os10",
    "name": "OS10 – PERFORMANCE POLYMER",
    "category": "SEAL",
    "industry": "construction",
    "description": "Performance polymer sealant for high-performance industrial sealing applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2025/06/OS10-Cartridge-1-819x1024.png",
    "url": "https://forzabuilt.com/product/os10-performance-polymer/",
    "specifications": {
      "type": "Performance Polymer Sealant",
      "viscosity": "150,000-300,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "Unlimited",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Ceramic"
      ],
      "applications": [
        "High-Performance Industrial Sealing",
        "Equipment Sealing",
        "Manufacturing",
        "General Sealing"
      ],
      "features": [
        "Performance Polymer",
        "High Performance",
        "Versatile",
        "Industrial Grade"
      ],
      "certifications": [
        "Performance Rated",
        "Industrial Grade"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "1.4 g/cm³",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "os20",
    "name": "OS20 – HIGH-STRENGTH HYBRID POLYMER ADHESIVE/SEALANT",
    "category": "SEAL",
    "industry": "construction",
    "description": "High-strength hybrid polymer adhesive and sealant for industrial applications requiring both bonding and sealing.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/06/OS20-NEW1.png",
    "url": "https://forzabuilt.com/product/os20-high-strength-hybrid-polymer-adhesive-sealant/",
    "specifications": {
      "type": "High-Strength Hybrid Polymer Adhesive/Sealant",
      "viscosity": "300,000-500,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "45 minutes",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Ceramic"
      ],
      "applications": [
        "High-Strength Industrial Sealing",
        "Equipment Sealing",
        "Manufacturing",
        "Adhesive/Sealant Applications"
      ],
      "features": [
        "High Strength",
        "Hybrid Polymer",
        "Adhesive/Sealant",
        "High Performance"
      ],
      "certifications": [
        "High Strength Rated",
        "Industrial Grade"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "1.5 g/cm³",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "os25",
    "name": "OS25 – LOW MODULUS PERFORMANCE POLYMER",
    "category": "SEAL",
    "industry": "construction",
    "description": "Low modulus performance polymer sealant for industrial applications requiring flexibility.",
    "image": "https://forzabuilt.com/wp-content/uploads/2025/06/OS25-Cartridge-1-819x1024.png",
    "url": "https://forzabuilt.com/product/os25-low-modulus-performance-polymer/",
    "specifications": {
      "type": "Low Modulus Performance Polymer Sealant",
      "viscosity": "100,000-200,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "Unlimited",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Ceramic"
      ],
      "applications": [
        "Flexible Industrial Sealing",
        "Equipment Sealing",
        "Manufacturing",
        "General Sealing"
      ],
      "features": [
        "Low Modulus",
        "Performance Polymer",
        "Flexible",
        "High Performance"
      ],
      "certifications": [
        "Low Modulus Rated",
        "Industrial Grade"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "1.3 g/cm³",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "os31",
    "name": "OS31 – SELF-LEVELING HYBRID POLYMER SEALANT",
    "category": "SEAL",
    "industry": "construction",
    "description": "Self-leveling hybrid polymer sealant for industrial applications requiring smooth surfaces.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/OS31-Self-Leveling-Sealant-819x1024.png",
    "url": "https://forzabuilt.com/product/self-leveling-hybrid-polymer-sealant/",
    "specifications": {
      "type": "Self-Leveling Hybrid Polymer Sealant",
      "viscosity": "50,000-100,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "Unlimited",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Ceramic"
      ],
      "applications": [
        "Self-Leveling Industrial Sealing",
        "Equipment Sealing",
        "Manufacturing",
        "Smooth Surface Sealing"
      ],
      "features": [
        "Self-Leveling",
        "Hybrid Polymer",
        "Smooth Surface",
        "High Performance"
      ],
      "certifications": [
        "Self-Leveling Rated",
        "Industrial Grade"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "1.2 g/cm³",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "os35",
    "name": "OS35 – SINGLE COMPONENT SILICONE SEALANT",
    "category": "SEAL",
    "industry": "construction",
    "description": "Single component silicone sealant for industrial sealing applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/OS35-Low-Modulus-Seal-819x1024.png",
    "url": "https://forzabuilt.com/product/os35-neutral-cure-oxime-silicone-sealant/",
    "specifications": {
      "type": "Single Component Silicone Sealant",
      "viscosity": "50,000-100,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "Unlimited",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Ceramic"
      ],
      "applications": [
        "Industrial Silicone Sealing",
        "Equipment Sealing",
        "Manufacturing",
        "General Sealing"
      ],
      "features": [
        "Single Component",
        "Silicone",
        "High Performance",
        "Weather Resistant"
      ],
      "certifications": [
        "Silicone Rated",
        "Industrial Grade"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "1.2 g/cm³",
      "pH": "Neutral",
      "color": "Clear to Light Amber",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "os37",
    "name": "OS37 – ACETOXY SILICONE",
    "category": "SEAL",
    "industry": "construction",
    "description": "Acetoxy silicone sealant for industrial sealing applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2025/06/OS37-Cartridge-2-819x1024.png",
    "url": "https://forzabuilt.com/product/os37-acetoxy-silicone/",
    "specifications": {
      "type": "Acetoxy Silicone Sealant",
      "viscosity": "50,000-100,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "Unlimited",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Ceramic"
      ],
      "applications": [
        "Industrial Acetoxy Silicone Sealing",
        "Equipment Sealing",
        "Manufacturing",
        "General Sealing"
      ],
      "features": [
        "Acetoxy Silicone",
        "High Performance",
        "Weather Resistant",
        "Industrial Grade"
      ],
      "certifications": [
        "Acetoxy Silicone Rated",
        "Industrial Grade"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "1.2 g/cm³",
      "pH": "Neutral",
      "color": "Clear to Light Amber",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "os61",
    "name": "OS61 SELF-LEVELING PERFORMANCE POLYMER",
    "category": "SEAL",
    "industry": "construction",
    "description": "Self-leveling performance polymer sealant for industrial applications requiring smooth surfaces.",
    "image": "https://forzabuilt.com/wp-content/uploads/2025/06/OS61-Cartridge-1-819x1024.png",
    "url": "https://forzabuilt.com/product/os61-self-leveling-performance-polymer/",
    "specifications": {
      "type": "Self-Leveling Performance Polymer Sealant",
      "viscosity": "50,000-100,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "Unlimited",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Ceramic"
      ],
      "applications": [
        "Self-Leveling Industrial Sealing",
        "Equipment Sealing",
        "Manufacturing",
        "Smooth Surface Sealing"
      ],
      "features": [
        "Self-Leveling",
        "Performance Polymer",
        "Smooth Surface",
        "High Performance"
      ],
      "certifications": [
        "Self-Leveling Rated",
        "Performance Rated",
        "Industrial Grade"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "1.2 g/cm³",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "os61-adhesive",
    "name": "OS61 – HIGH PERFORMANCE SEMI SELF-LEVELING ADHESIVE / SEALANT",
    "category": "SEAL",
    "industry": "construction",
    "description": "High performance semi self-leveling adhesive and sealant for industrial applications requiring both bonding and sealing.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/Forza-Seal-0S61-Adhesive-Sealant-1024x1024.png",
    "url": "https://forzabuilt.com/product/os61-high-performance-semi-self-leveling-adhesive-sealant/",
    "specifications": {
      "type": "High Performance Semi Self-Leveling Adhesive/Sealant",
      "viscosity": "100,000-200,000 cps",
      "solids": "100%",
      "flashPoint": "Non-Flammable",
      "potLife": "Unlimited",
      "cureTime": "24-72 hours",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Glass",
        "Plastic",
        "Wood",
        "Concrete",
        "Ceramic"
      ],
      "applications": [
        "High Performance Industrial Sealing",
        "Equipment Sealing",
        "Manufacturing",
        "Adhesive/Sealant Applications"
      ],
      "features": [
        "High Performance",
        "Semi Self-Leveling",
        "Adhesive/Sealant",
        "Versatile"
      ],
      "certifications": [
        "High Performance Rated",
        "Industrial Grade"
      ],
      "packaging": [
        "10.3 oz Cartridge",
        "29 oz Sausage",
        "5 Gallon Pail"
      ]
    },
    "technicalData": {
      "density": "1.3 g/cm³",
      "pH": "Neutral",
      "color": "Gray",
      "odor": "Low",
      "shelfLife": "12 months",
      "storageConditions": "Store at 50-80°F, keep container sealed"
    }
  },
  {
    "id": "c-t500",
    "name": "C-T500 – FOAM TAPE",
    "category": "TAPE",
    "industry": "construction",
    "description": "Foam tape for construction and industrial applications requiring cushioning and bonding.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/C_T500-1024x1024.png",
    "url": "https://forzabuilt.com/product/c-t500-foam-tape/",
    "specifications": {
      "type": "Foam Tape",
      "thickness": "0.125\" - 0.250\"",
      "width": "0.5\" - 2\"",
      "length": "36 yards per roll",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Fiberglass",
        "Composite"
      ],
      "applications": [
        "Construction Assembly",
        "Industrial Bonding",
        "Equipment Mounting",
        "Cushioning"
      ],
      "features": [
        "Foam Cushioning",
        "Construction Grade",
        "Weather Resistant",
        "Pressure Sensitive"
      ],
      "certifications": [
        "Construction Approved",
        "Industrial Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths",
        "Bulk packaging"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Closed Cell",
      "peelStrength": "35+ oz/in",
      "shearStrength": "75+ psi",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "24 months",
      "storageConditions": "Store at 60-80°F, keep in original packaging"
    }
  },
  {
    "id": "c-t550",
    "name": "C-T550 – DOUBLE-COATED ULTRA HIGH BOND ACRYLIC FOAM TAPE",
    "category": "TAPE",
    "industry": "construction",
    "description": "Double-coated ultra high bond acrylic foam tape for demanding construction applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/C-T550-1024x1024.png",
    "url": "https://forzabuilt.com/product/c-t550-double-coated-ultra-high-bond-acrylic-foam-tape/",
    "specifications": {
      "type": "Double-Coated Acrylic Foam Tape",
      "thickness": "0.062\" - 0.125\"",
      "width": "0.5\" - 2\"",
      "length": "36 yards per roll",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Fiberglass",
        "Composite"
      ],
      "applications": [
        "Construction Assembly",
        "Industrial Bonding",
        "Equipment Mounting",
        "Structural Bonding"
      ],
      "features": [
        "Ultra High Bond",
        "Construction Grade",
        "Weather Resistant",
        "Pressure Sensitive"
      ],
      "certifications": [
        "Construction Approved",
        "Industrial Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths",
        "Bulk packaging"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Closed Cell",
      "peelStrength": "60+ oz/in",
      "shearStrength": "100+ psi",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "24 months",
      "storageConditions": "Store at 60-80°F, keep in original packaging"
    }
  },
  {
    "id": "c-t553",
    "name": "C-T553 – DOUBLE-COATED ULTRA HIGH BOND ACRYLIC FOAM TAPE",
    "category": "TAPE",
    "industry": "construction",
    "description": "Double-coated ultra high bond acrylic foam tape for construction applications requiring superior bonding strength.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/C-T550.png",
    "url": "https://forzabuilt.com/product/c-t553-ultra-high-bond-acrylic-foam-tape/",
    "specifications": {
      "type": "Double-Coated Acrylic Foam Tape",
      "thickness": "0.062\" - 0.125\"",
      "width": "0.5\" - 2\"",
      "length": "36 yards per roll",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Fiberglass",
        "Composite"
      ],
      "applications": [
        "Construction Assembly",
        "Industrial Bonding",
        "Equipment Mounting",
        "Structural Bonding"
      ],
      "features": [
        "Ultra High Bond",
        "Construction Grade",
        "Weather Resistant",
        "Pressure Sensitive"
      ],
      "certifications": [
        "Construction Approved",
        "Industrial Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths",
        "Bulk packaging"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Closed Cell",
      "peelStrength": "60+ oz/in",
      "shearStrength": "100+ psi",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "24 months",
      "storageConditions": "Store at 60-80°F, keep in original packaging"
    }
  },
  {
    "id": "c-t557",
    "name": "C-T557 – DOUBLE-COATED ACRYLIC FOAM TAPE",
    "category": "TAPE",
    "industry": "construction",
    "description": "Double-coated acrylic foam tape for construction and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/C-T564-1024x1024.png",
    "url": "https://forzabuilt.com/product/c-t557-double-coated-acrylic-foam-tape/",
    "specifications": {
      "type": "Double-Coated Acrylic Foam Tape",
      "thickness": "0.062\" - 0.125\"",
      "width": "0.5\" - 2\"",
      "length": "36 yards per roll",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Fiberglass",
        "Composite"
      ],
      "applications": [
        "Construction Assembly",
        "Industrial Bonding",
        "Equipment Mounting",
        "General Bonding"
      ],
      "features": [
        "High Bond",
        "Construction Grade",
        "Weather Resistant",
        "Pressure Sensitive"
      ],
      "certifications": [
        "Construction Approved",
        "Industrial Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths",
        "Bulk packaging"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Closed Cell",
      "peelStrength": "50+ oz/in",
      "shearStrength": "90+ psi",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "24 months",
      "storageConditions": "Store at 60-80°F, keep in original packaging"
    }
  },
  {
    "id": "c-t564",
    "name": "C-T564 – DOUBLE-COATED PE FOAM TAPE",
    "category": "TAPE",
    "industry": "construction",
    "description": "Double-coated PE foam tape for construction applications requiring cushioning and bonding.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/C-T564-Tape-Mockup.png",
    "url": "https://forzabuilt.com/product/c-t564-double-coated-pe-foam-tape/",
    "specifications": {
      "type": "Double-Coated PE Foam Tape",
      "thickness": "0.125\" - 0.250\"",
      "width": "0.5\" - 2\"",
      "length": "36 yards per roll",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Fiberglass",
        "Composite"
      ],
      "applications": [
        "Construction Assembly",
        "Industrial Bonding",
        "Equipment Mounting",
        "Cushioning"
      ],
      "features": [
        "PE Foam",
        "Construction Grade",
        "Weather Resistant",
        "Pressure Sensitive"
      ],
      "certifications": [
        "Construction Approved",
        "Industrial Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths",
        "Bulk packaging"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Closed Cell",
      "peelStrength": "40+ oz/in",
      "shearStrength": "80+ psi",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "24 months",
      "storageConditions": "Store at 60-80°F, keep in original packaging"
    }
  },
  {
    "id": "c-t731",
    "name": "C-T731 – DOUBLE-SIDED TAPE",
    "category": "TAPE",
    "industry": "construction",
    "description": "Double-sided tape for construction and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/C-T5100-1024x1024.png",
    "url": "https://forzabuilt.com/product/c-t731-double-sided-tape/",
    "specifications": {
      "type": "Double-Sided Tape",
      "thickness": "0.062\" - 0.125\"",
      "width": "0.5\" - 2\"",
      "length": "36 yards per roll",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Fiberglass",
        "Composite"
      ],
      "applications": [
        "Construction Assembly",
        "Industrial Bonding",
        "Equipment Mounting",
        "General Bonding"
      ],
      "features": [
        "Double-Sided",
        "Construction Grade",
        "Weather Resistant",
        "Pressure Sensitive"
      ],
      "certifications": [
        "Construction Approved",
        "Industrial Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths",
        "Bulk packaging"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Closed Cell",
      "peelStrength": "45+ oz/in",
      "shearStrength": "85+ psi",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "24 months",
      "storageConditions": "Store at 60-80°F, keep in original packaging"
    }
  },
  {
    "id": "c-t5100",
    "name": "C-T5100 – DOUBLE-COATED PET",
    "category": "TAPE",
    "industry": "construction",
    "description": "Double-coated PET tape for construction and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/12/C-T5100-1024x1024.png",
    "url": "https://forzabuilt.com/product/c-t5100-double-coated-pet/",
    "specifications": {
      "type": "Double-Coated PET Tape",
      "thickness": "0.062\" - 0.125\"",
      "width": "0.5\" - 2\"",
      "length": "36 yards per roll",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Fiberglass",
        "Composite"
      ],
      "applications": [
        "Construction Assembly",
        "Industrial Bonding",
        "Equipment Mounting",
        "General Bonding"
      ],
      "features": [
        "PET Backing",
        "Construction Grade",
        "Weather Resistant",
        "Pressure Sensitive"
      ],
      "certifications": [
        "Construction Approved",
        "Industrial Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths",
        "Bulk packaging"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Closed Cell",
      "peelStrength": "50+ oz/in",
      "shearStrength": "90+ psi",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "24 months",
      "storageConditions": "Store at 60-80°F, keep in original packaging"
    }
  },
  {
    "id": "t-t415",
    "name": "T-T415 – DOUBLE-COATED ULTRA HIGH BOND ACRYLIC FOAM TAPE",
    "category": "TAPE",
    "industry": "transportation",
    "description": "Double-coated ultra high bond acrylic foam tape for transportation and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/05/vhb-tape-mockup-1024x1024.png",
    "url": "https://forzabuilt.com/product/t-t415-double-coated-ultra-high-bond-acrylic-foam-tape/",
    "specifications": {
      "type": "Double-Coated Acrylic Foam Tape",
      "thickness": "0.062\" - 0.125\"",
      "width": "0.5\" - 2\"",
      "length": "36 yards per roll",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Fiberglass",
        "Composite"
      ],
      "applications": [
        "Transportation Assembly",
        "Automotive Assembly",
        "Industrial Bonding",
        "Equipment Mounting"
      ],
      "features": [
        "Ultra High Bond",
        "Transportation Grade",
        "Weather Resistant",
        "Pressure Sensitive"
      ],
      "certifications": [
        "Transportation Approved",
        "Automotive Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths",
        "Bulk packaging"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Closed Cell",
      "peelStrength": "60+ oz/in",
      "shearStrength": "100+ psi",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "24 months",
      "storageConditions": "Store at 60-80°F, keep in original packaging"
    }
  },
  {
    "id": "t-t420",
    "name": "T-T420 – DOUBLE-COATED ULTRA HIGH BOND ACRYLIC FOAM TAPE",
    "category": "TAPE",
    "industry": "transportation",
    "description": "Double-coated ultra high bond acrylic foam tape for demanding transportation applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/05/vhb-tape-mockup-1024x1024.png",
    "url": "https://forzabuilt.com/product/t-t420-double-coated-ultra-high-bond-acrylic-foam-tape/",
    "specifications": {
      "type": "Double-Coated Acrylic Foam Tape",
      "thickness": "0.062\" - 0.125\"",
      "width": "0.5\" - 2\"",
      "length": "36 yards per roll",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Fiberglass",
        "Composite"
      ],
      "applications": [
        "Transportation Assembly",
        "Automotive Assembly",
        "Industrial Bonding",
        "Equipment Mounting"
      ],
      "features": [
        "Ultra High Bond",
        "Transportation Grade",
        "Weather Resistant",
        "Pressure Sensitive"
      ],
      "certifications": [
        "Transportation Approved",
        "Automotive Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths",
        "Bulk packaging"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Closed Cell",
      "peelStrength": "60+ oz/in",
      "shearStrength": "100+ psi",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "24 months",
      "storageConditions": "Store at 60-80°F, keep in original packaging"
    }
  },
  {
    "id": "t-t1200",
    "name": "T-T1200 – FOAM GASKETING TAPE",
    "category": "TAPE",
    "industry": "transportation",
    "description": "Foam gasketing tape for transportation and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/06/T600-Foam-Bonding-Tape.png",
    "url": "https://forzabuilt.com/product/t-t1200-foam-gasketing-tape/",
    "specifications": {
      "type": "Foam Gasketing Tape",
      "thickness": "0.125\" - 0.250\"",
      "width": "0.5\" - 2\"",
      "length": "36 yards per roll",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Fiberglass",
        "Composite"
      ],
      "applications": [
        "Transportation Assembly",
        "Automotive Assembly",
        "Gasketing",
        "Equipment Mounting"
      ],
      "features": [
        "Foam Gasketing",
        "Transportation Grade",
        "Weather Resistant",
        "Pressure Sensitive"
      ],
      "certifications": [
        "Transportation Approved",
        "Automotive Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths",
        "Bulk packaging"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Closed Cell",
      "peelStrength": "40+ oz/in",
      "shearStrength": "80+ psi",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "24 months",
      "storageConditions": "Store at 60-80°F, keep in original packaging"
    }
  },
  {
    "id": "t-t1420",
    "name": "T-T1420 – EXTREME SEALING TAPE",
    "category": "TAPE",
    "industry": "transportation",
    "description": "Extreme sealing tape for transportation and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/08/Extreme-Sealing-Tape-No-Background.png",
    "url": "https://forzabuilt.com/product/t-t420-extreme-sealing-tape/",
    "specifications": {
      "type": "Extreme Sealing Tape",
      "thickness": "0.125\" - 0.250\"",
      "width": "0.5\" - 2\"",
      "length": "36 yards per roll",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Fiberglass",
        "Composite"
      ],
      "applications": [
        "Transportation Assembly",
        "Automotive Assembly",
        "Extreme Sealing",
        "Equipment Mounting"
      ],
      "features": [
        "Extreme Sealing",
        "Transportation Grade",
        "Weather Resistant",
        "Pressure Sensitive"
      ],
      "certifications": [
        "Transportation Approved",
        "Automotive Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths",
        "Bulk packaging"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Closed Cell",
      "peelStrength": "50+ oz/in",
      "shearStrength": "90+ psi",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "24 months",
      "storageConditions": "Store at 60-80°F, keep in original packaging"
    }
  },
  {
    "id": "t-t430",
    "name": "T-T430 – PE SEALING TAPE",
    "category": "TAPE",
    "industry": "transportation",
    "description": "PE sealing tape for transportation and industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2025/03/tape-T-T430-png-2-1024x1024.png",
    "url": "https://forzabuilt.com/product/t-t430-pe-sealing-tape/",
    "specifications": {
      "type": "PE Sealing Tape",
      "thickness": "0.062\" - 0.125\"",
      "width": "0.5\" - 2\"",
      "length": "36 yards per roll",
      "temperatureRange": "-40°F to +200°F",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Wood",
        "Fiberglass",
        "Composite"
      ],
      "applications": [
        "Transportation Assembly",
        "Automotive Assembly",
        "PE Sealing",
        "Equipment Mounting"
      ],
      "features": [
        "PE Sealing",
        "Transportation Grade",
        "Weather Resistant",
        "Pressure Sensitive"
      ],
      "certifications": [
        "Transportation Approved",
        "Automotive Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths",
        "Bulk packaging"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Closed Cell",
      "peelStrength": "45+ oz/in",
      "shearStrength": "85+ psi",
      "color": "Gray",
      "odor": "Minimal",
      "shelfLife": "24 months",
      "storageConditions": "Store at 60-80°F, keep in original packaging"
    }
  },
  {
    "id": "t215",
    "name": "T215 – ULTRA HIGH-BOND ACRYLIC FOAM TAPE",
    "category": "TAPE",
    "industry": "construction",
    "description": "Ultra high-bond acrylic foam tape for demanding industrial applications requiring superior adhesion.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/05/vhb-tape-mockup-1024x1024.png",
    "url": "https://forzabuilt.com/product/t215-ultra-high-bond-acrylic-foam-tape/",
    "specifications": {
      "type": "Ultra High-Bond Acrylic Foam Tape",
      "thickness": "0.060\"",
      "width": "1/2\", 1\", 2\", 3\", 4\"",
      "length": "36 yards per roll",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Painted Surfaces"
      ],
      "applications": [
        "Industrial Assembly",
        "Automotive Manufacturing",
        "Construction",
        "Signage"
      ],
      "features": [
        "Ultra High Bond",
        "Acrylic Adhesive",
        "Foam Core",
        "Weather Resistant"
      ],
      "certifications": [
        "Industrial Grade",
        "VHB Technology"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Closed Cell Foam",
      "peelStrength": "45 lbs/in",
      "shearStrength": "1000+ lbs/in²",
      "shelfLife": "24 months",
      "storageConditions": "Store at 50-80°F, keep in original packaging"
    }
  },
  {
    "id": "t220",
    "name": "T220 – ULTRA HIGH-BOND ACRYLIC FOAM TAPE",
    "category": "TAPE",
    "industry": "construction",
    "description": "Ultra high-bond acrylic foam tape for heavy-duty industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/05/vhb-tape-mockup-1024x1024.png",
    "url": "https://forzabuilt.com/product/t220-ultra-high-bond-acrylic-foam-tape/",
    "specifications": {
      "type": "Ultra High-Bond Acrylic Foam Tape",
      "thickness": "0.080\"",
      "width": "1/2\", 1\", 2\", 3\", 4\"",
      "length": "36 yards per roll",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Painted Surfaces"
      ],
      "applications": [
        "Heavy Industrial Assembly",
        "Automotive Manufacturing",
        "Construction",
        "Signage"
      ],
      "features": [
        "Ultra High Bond",
        "Acrylic Adhesive",
        "Foam Core",
        "Weather Resistant"
      ],
      "certifications": [
        "Industrial Grade",
        "VHB Technology"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Closed Cell Foam",
      "peelStrength": "50 lbs/in",
      "shearStrength": "1200+ lbs/in²",
      "shelfLife": "24 months",
      "storageConditions": "Store at 50-80°F, keep in original packaging"
    }
  },
  {
    "id": "t305",
    "name": "T305 – FOAM TAPE",
    "category": "TAPE",
    "industry": "construction",
    "description": "High-performance foam tape for industrial bonding and mounting applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/06/T350-Thermal-Break-Tape.png",
    "url": "https://forzabuilt.com/product/t305-foam-tape/",
    "specifications": {
      "type": "Foam Tape",
      "thickness": "0.040\"",
      "width": "1/2\", 1\", 2\", 3\", 4\"",
      "length": "36 yards per roll",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Painted Surfaces"
      ],
      "applications": [
        "Industrial Mounting",
        "Construction",
        "Automotive",
        "Signage"
      ],
      "features": [
        "High Performance",
        "Foam Core",
        "Weather Resistant",
        "Easy Application"
      ],
      "certifications": [
        "Industrial Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Closed Cell Foam",
      "peelStrength": "35 lbs/in",
      "shearStrength": "800 lbs/in²",
      "temperatureRange": "-30°F to +180°F",
      "shelfLife": "24 months",
      "storageConditions": "Store at 50-80°F, keep in original packaging"
    }
  },
  {
    "id": "t350",
    "name": "T350 – THERMAL BREAK TAPE",
    "category": "TAPE",
    "industry": "construction",
    "description": "Thermal break tape for insulating applications and thermal barrier requirements.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/06/T350-Thermal-Break-Tape.png",
    "url": "https://forzabuilt.com/product/t350-thermal-break-tape/",
    "specifications": {
      "type": "Thermal Break Tape",
      "thickness": "0.060\"",
      "width": "1/2\", 1\", 2\", 3\", 4\"",
      "length": "36 yards per roll",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Painted Surfaces"
      ],
      "applications": [
        "Thermal Insulation",
        "Construction",
        "Automotive",
        "Industrial Equipment"
      ],
      "features": [
        "Thermal Break",
        "Insulating",
        "Weather Resistant",
        "High Performance"
      ],
      "certifications": [
        "Thermal Insulation Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Thermal Insulating Foam",
      "peelStrength": "40 lbs/in",
      "shearStrength": "900 lbs/in²",
      "temperatureRange": "-40°F to +200°F",
      "shelfLife": "24 months",
      "storageConditions": "Store at 50-80°F, keep in original packaging"
    }
  },
  {
    "id": "t464",
    "name": "T464 – TRANSFER TAPE",
    "category": "TAPE",
    "industry": "construction",
    "description": "High-performance transfer tape for industrial bonding applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/06/T464-Transfer-Tape-1024x1024.png",
    "url": "https://forzabuilt.com/product/t464-transfer-tape/",
    "specifications": {
      "type": "Transfer Tape",
      "thickness": "0.020\"",
      "width": "1/2\", 1\", 2\", 3\", 4\"",
      "length": "36 yards per roll",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Painted Surfaces"
      ],
      "applications": [
        "Industrial Bonding",
        "Construction",
        "Automotive",
        "Signage"
      ],
      "features": [
        "Transfer Adhesive",
        "High Performance",
        "Weather Resistant",
        "Easy Application"
      ],
      "certifications": [
        "Industrial Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Transfer Adhesive",
      "peelStrength": "30 lbs/in",
      "shearStrength": "600 lbs/in²",
      "temperatureRange": "-30°F to +180°F",
      "shelfLife": "24 months",
      "storageConditions": "Store at 50-80°F, keep in original packaging"
    }
  },
  {
    "id": "t600",
    "name": "T600 – FOAM GASKETING TAPE",
    "category": "TAPE",
    "industry": "construction",
    "description": "Foam gasketing tape for sealing and gasketing applications in industrial environments.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/06/T600-Foam-Bonding-Tape.png",
    "url": "https://forzabuilt.com/product/t600-foam-gasketing-tape/",
    "specifications": {
      "type": "Foam Gasketing Tape",
      "thickness": "0.080\"",
      "width": "1/2\", 1\", 2\", 3\", 4\"",
      "length": "36 yards per roll",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Painted Surfaces"
      ],
      "applications": [
        "Gasketing",
        "Sealing",
        "Industrial Equipment",
        "Automotive"
      ],
      "features": [
        "Gasketing",
        "Sealing",
        "Weather Resistant",
        "High Performance"
      ],
      "certifications": [
        "Industrial Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Gasketing Foam",
      "peelStrength": "45 lbs/in",
      "shearStrength": "1000 lbs/in²",
      "temperatureRange": "-40°F to +200°F",
      "shelfLife": "24 months",
      "storageConditions": "Store at 50-80°F, keep in original packaging"
    }
  },
  {
    "id": "t715",
    "name": "T715 – COLD TEMP DOUBLE-COATED TAPE",
    "category": "TAPE",
    "industry": "construction",
    "description": "Cold temperature double-coated tape for low-temperature applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/06/T464-Transfer-Tape-1024x1024.png",
    "url": "https://forzabuilt.com/product/t715-cold-temp-double-coated-tape/",
    "specifications": {
      "type": "Cold Temp Double-Coated Tape",
      "thickness": "0.040\"",
      "width": "1/2\", 1\", 2\", 3\", 4\"",
      "length": "36 yards per roll",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Painted Surfaces"
      ],
      "applications": [
        "Cold Temperature Applications",
        "Industrial Equipment",
        "Automotive",
        "Construction"
      ],
      "features": [
        "Cold Temperature",
        "Double-Coated",
        "Weather Resistant",
        "High Performance"
      ],
      "certifications": [
        "Cold Temperature Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Cold Temperature Foam",
      "peelStrength": "35 lbs/in",
      "shearStrength": "800 lbs/in²",
      "temperatureRange": "-60°F to +150°F",
      "shelfLife": "24 months",
      "storageConditions": "Store at 50-80°F, keep in original packaging"
    }
  },
  {
    "id": "t900",
    "name": "T900 – BUTYL TAPE",
    "category": "TAPE",
    "industry": "construction",
    "description": "Butyl adhesive tape for sealing and bonding applications in industrial environments.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/06/T900-Butyl-Adhesive-Tape-1024x1024.png",
    "url": "https://forzabuilt.com/product/t900-butyl-tape/",
    "specifications": {
      "type": "Butyl Tape",
      "thickness": "0.060\"",
      "width": "1/2\", 1\", 2\", 3\", 4\"",
      "length": "36 yards per roll",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Painted Surfaces"
      ],
      "applications": [
        "Sealing",
        "Bonding",
        "Industrial Equipment",
        "Construction"
      ],
      "features": [
        "Butyl Adhesive",
        "Sealing",
        "Weather Resistant",
        "High Performance"
      ],
      "certifications": [
        "Industrial Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths"
      ]
    },
    "technicalData": {
      "adhesiveType": "Butyl",
      "foamType": "Butyl Adhesive",
      "peelStrength": "40 lbs/in",
      "shearStrength": "900 lbs/in²",
      "temperatureRange": "-40°F to +200°F",
      "shelfLife": "24 months",
      "storageConditions": "Store at 50-80°F, keep in original packaging"
    }
  },
  {
    "id": "t950",
    "name": "T950 – FSK BONDING TAPE",
    "category": "TAPE",
    "industry": "construction",
    "description": "FSK (Foil-Scrim-Kraft) bonding tape for specialized industrial applications.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/07/T950.png",
    "url": "https://forzabuilt.com/product/t950-fsk-bonding-tape/",
    "specifications": {
      "type": "FSK Bonding Tape",
      "thickness": "0.080\"",
      "width": "1/2\", 1\", 2\", 3\", 4\"",
      "length": "36 yards per roll",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Painted Surfaces"
      ],
      "applications": [
        "FSK Applications",
        "Industrial Equipment",
        "Construction",
        "Automotive"
      ],
      "features": [
        "FSK Technology",
        "High Performance",
        "Weather Resistant",
        "Specialized Application"
      ],
      "certifications": [
        "FSK Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "FSK Foam",
      "peelStrength": "45 lbs/in",
      "shearStrength": "1000 lbs/in²",
      "temperatureRange": "-40°F to +200°F",
      "shelfLife": "24 months",
      "storageConditions": "Store at 50-80°F, keep in original packaging"
    }
  },
  {
    "id": "t970",
    "name": "T970 – FOIL BONDING TAPE",
    "category": "TAPE",
    "industry": "construction",
    "description": "Foil bonding tape for specialized industrial applications requiring foil backing.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/07/T970-FOIL-BONDING-TAPE-1024x1024.png",
    "url": "https://forzabuilt.com/product/t970-foil-bonding-tape/",
    "specifications": {
      "type": "Foil Bonding Tape",
      "thickness": "0.060\"",
      "width": "1/2\", 1\", 2\", 3\", 4\"",
      "length": "36 yards per roll",
      "substrates": [
        "Metal",
        "Plastic",
        "Glass",
        "Painted Surfaces"
      ],
      "applications": [
        "Foil Applications",
        "Industrial Equipment",
        "Construction",
        "Automotive"
      ],
      "features": [
        "Foil Backing",
        "High Performance",
        "Weather Resistant",
        "Specialized Application"
      ],
      "certifications": [
        "Foil Grade"
      ],
      "packaging": [
        "36 yard rolls",
        "Various widths"
      ]
    },
    "technicalData": {
      "adhesiveType": "Acrylic",
      "foamType": "Foil Foam",
      "peelStrength": "40 lbs/in",
      "shearStrength": "900 lbs/in²",
      "temperatureRange": "-40°F to +200°F",
      "shelfLife": "24 months",
      "storageConditions": "Store at 50-80°F, keep in original packaging"
    }
  },
  {
    "id": "ic946--ca-compliant-pressure-sensitive-contact-adhesive",
    "name": "IC946- CA COMPLIANT PRESSURE-SENSITIVE CONTACT ADHESIVE",
    "category": "SEAL",
    "industry": "industrial",
    "description": "ForzaBOND™ IC946 is a web spray adhesive designed for use in applications using the substrates listed.",
    "image": "https://forzabuilt.com/wp-content/uploads/2024/03/IC946-bundle-1024x1024.png",
    "url": "https://forzabuilt.com/product/p329-ca-compliant-high-solids-pressure-sensative-contact-adhesive/",
    "specifications": {
      "type": "IC946- CA COMPLIANT PRESSURE-SENSITIVE CONTACT ADHESIVE",
      "substrates": [
        "CA Compliant",
        "Long lasting high tack (pressure sensitive)",
        "Moisture and weather-resistant bond",
        "Non-chlorinated",
        "Full strength achieved in 24 hours",
        "No ODS (ozone depleting substances)",
        "IC946 is designed as a portable, self-contained spray system for field or shop applications.",
        "Apply adhesive to both surfaces to be mated, at 80% to 100% coverage.",
        "Allow enough time (2-4 minutes or until dry to the touch) for the adhesive to become tacky before bonding.",
        "Parts should be mated with as much pressure as practical.",
        "Notice!!! Do not store at temperatures over 120º F.",
        "13oz Aerosol Can",
        "22L Canister",
        "108L Canister",
        "ForzaBOND™ IC946 is a web spray adhesive designed for use in applications using the substrates listed."
      ],
      "applications": [
        "CA Compliant",
        "Long lasting high tack (pressure sensitive)",
        "Moisture and weather-resistant bond",
        "Non-chlorinated",
        "Full strength achieved in 24 hours",
        "No ODS (ozone depleting substances)",
        "IC946 is designed as a portable, self-contained spray system for field or shop applications.",
        "Apply adhesive to both surfaces to be mated, at 80% to 100% coverage.",
        "Allow enough time (2-4 minutes or until dry to the touch) for the adhesive to become tacky before bonding.",
        "Parts should be mated with as much pressure as practical.",
        "Notice!!! Do not store at temperatures over 120º F.",
        "13oz Aerosol Can",
        "22L Canister",
        "108L Canister",
        "ForzaBOND™ IC946 is a web spray adhesive designed for use in applications using the substrates listed."
      ],
      "features": [],
      "certifications": [],
      "packaging": []
    },
    "technicalData": {},
    "benefits": [],
    "howToUse": [
      "ForzaBOND™ IC946 is a web spray adhesive designed for use in applications using the substrates listed."
    ],
    "colors": [],
    "sizing": [],
    "cleanup": []
  },
  {
    "id": "os45",
    "name": "OS45 – ACRYLIC ADHESIVE CAULK",
    "category": "SEAL",
    "industry": "industrial",
    "description": "ForzaBOND™ OA45 is a single-component, acrylic latex selant formulated to provide fast-setting seal.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/OS45.png",
    "url": "https://forzabuilt.com/product/acrylic-adhesive-caulk/",
    "specifications": {
      "type": "OS45 – ACRYLIC ADHESIVE CAULK",
      "substrates": [
        "Acoustical seal in the construction of interior walls, ceilings, and floors.",
        "It is suitable for use on vinyl, aluminum, and wood siding as well as on bathroom and kitchen fixtures.",
        "It is a paintable sealant, suitable for both indoor and outdoor use.",
        "Tack-free in 15 minutes",
        "Ready to paint in 30 to 45 minutes with a latex or oil-based paint",
        "Class A Building Material",
        "Tested for acoustical properties to reduce sound transmissions when constructing partition walls",
        "OA45 can be used for general purpose interior and exterior caulking and as a back-bedding glazing compound.",
        "It is also highlyrecommended as an acoustical seal in the construction of interior walls, ceilings, and floors.",
        "10.1 oz Cartridge"
      ],
      "applications": [
        "Acoustical seal in the construction of interior walls, ceilings, and floors.",
        "It is suitable for use on vinyl, aluminum, and wood siding as well as on bathroom and kitchen fixtures.",
        "It is a paintable sealant, suitable for both indoor and outdoor use.",
        "Tack-free in 15 minutes",
        "Ready to paint in 30 to 45 minutes with a latex or oil-based paint",
        "Class A Building Material",
        "Tested for acoustical properties to reduce sound transmissions when constructing partition walls",
        "OA45 can be used for general purpose interior and exterior caulking and as a back-bedding glazing compound.",
        "It is also highlyrecommended as an acoustical seal in the construction of interior walls, ceilings, and floors.",
        "10.1 oz Cartridge"
      ],
      "features": [],
      "certifications": [],
      "packaging": []
    },
    "technicalData": {},
    "benefits": [],
    "howToUse": [],
    "colors": [],
    "sizing": [],
    "cleanup": []
  },
  {
    "id": "os55",
    "name": "OS55 – BUTYL ADHESIVE CAULK",
    "category": "SEAL",
    "industry": "industrial",
    "description": "ForzaBOND™ OS55 is a butyl sealant designed to provide excellent weathering properties.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/12/OS55-1229x1536-1.png",
    "url": "https://forzabuilt.com/product/butyl-adhesive-caulk/",
    "specifications": {
      "type": "OS55 – BUTYL ADHESIVE CAULK",
      "substrates": [
        "It will adhere to a variety of substrates such as masonry, glass, metal, concrete, wood and some plastics.",
        "It also adheres well to many various roofing membranes.",
        "Easy to apply and non-stringing",
        "Remains permanently flexible and will not crack",
        "Non-staining – with no discoloration",
        "Adheres to a variety of surfaces without prime",
        "All surfaces must be clean, dry and free of all loose materials. Apply with a standard caulking gun.",
        "Cut the nozzle to desired bead size and puncture the inner seal.",
        "Apply at a 45% angle using constant pressure. For ease of gunning, use at room temperature. Tool or join surfaces for sealing before material skins.",
        "Support tooled or joined surfaces for 8 hours minimum.",
        "Use Mineral Spirits or VM&P Naphtha to remove excess material before skin forms.",
        "Clean up with VM&P Naphtha or Mineral Spirits.",
        "10.1 oz Cartridge",
        "52 Gallon Drum"
      ],
      "applications": [
        "It will adhere to a variety of substrates such as masonry, glass, metal, concrete, wood and some plastics.",
        "It also adheres well to many various roofing membranes.",
        "Easy to apply and non-stringing",
        "Remains permanently flexible and will not crack",
        "Non-staining – with no discoloration",
        "Adheres to a variety of surfaces without prime",
        "All surfaces must be clean, dry and free of all loose materials. Apply with a standard caulking gun.",
        "Cut the nozzle to desired bead size and puncture the inner seal.",
        "Apply at a 45% angle using constant pressure. For ease of gunning, use at room temperature. Tool or join surfaces for sealing before material skins.",
        "Support tooled or joined surfaces for 8 hours minimum.",
        "Use Mineral Spirits or VM&P Naphtha to remove excess material before skin forms.",
        "Clean up with VM&P Naphtha or Mineral Spirits.",
        "10.1 oz Cartridge",
        "52 Gallon Drum"
      ],
      "features": [],
      "certifications": [],
      "packaging": []
    },
    "technicalData": {},
    "benefits": [],
    "howToUse": [],
    "colors": [],
    "sizing": [],
    "cleanup": []
  },
  {
    "id": "t461",
    "name": "T461 – HOT MELT TRANSFER TAPE",
    "category": "SEAL",
    "industry": "industrial",
    "description": "ForzaTAPE™ T461 is an extremely aggressive synthetic rubber transfer tape.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/06/T461-Hot-Melt-Transfer-Tape-1024x1024.png",
    "url": "https://forzabuilt.com/product/t461-hot-melt-transfer-tape/",
    "specifications": {
      "type": "T461 – HOT MELT TRANSFER TAPE",
      "substrates": [
        "Used for mounting trim and insulation panels",
        "Used for fixing edging, signs, decorative edging and panels",
        "Synthetic rubber transfer tape offers excellent adhesion to a wide range of surfaces, including plastics, metals, glass, and more.",
        "Effectively bond different materials together, making it a versatile option for various applications.",
        "Synthetic rubber transfer tape is designed to withstand both high and low temperatures.",
        "Apply to the part to be bonded, ensuring that no air is trapped between the tape and the substrate.",
        "Surfaces should be clean and free of dirt, oil, frost etc. Stated temperatures are a suggested range and products may be applied at higher or lower temperatures.",
        "Remove the release liner and apply with care to the part to be bonded, ensuring that no air is trapped between the tape and the substrate.",
        "Apply with recommended application pressure of 15 pounds per inch of tape width.",
        "At the point of final assembly or lamination, remove the release liner and apply with care to avoid wrinkles or trapped air.",
        "It is recommended that end user test for suitability in their environment.",
        ".75″ x 100′"
      ],
      "applications": [
        "Used for mounting trim and insulation panels",
        "Used for fixing edging, signs, decorative edging and panels",
        "Synthetic rubber transfer tape offers excellent adhesion to a wide range of surfaces, including plastics, metals, glass, and more.",
        "Effectively bond different materials together, making it a versatile option for various applications.",
        "Synthetic rubber transfer tape is designed to withstand both high and low temperatures.",
        "Apply to the part to be bonded, ensuring that no air is trapped between the tape and the substrate.",
        "Surfaces should be clean and free of dirt, oil, frost etc. Stated temperatures are a suggested range and products may be applied at higher or lower temperatures.",
        "Remove the release liner and apply with care to the part to be bonded, ensuring that no air is trapped between the tape and the substrate.",
        "Apply with recommended application pressure of 15 pounds per inch of tape width.",
        "At the point of final assembly or lamination, remove the release liner and apply with care to avoid wrinkles or trapped air.",
        "It is recommended that end user test for suitability in their environment.",
        ".75″ x 100′"
      ],
      "features": [],
      "certifications": [],
      "packaging": []
    },
    "technicalData": {},
    "benefits": [],
    "howToUse": [],
    "colors": [],
    "sizing": [],
    "cleanup": []
  },
  {
    "id": "t500",
    "name": "T500 – BUTYL ADHESIVE TAPE",
    "category": "SEAL",
    "industry": "industrial",
    "description": "ForzaTAPE™ T500 is compounded to meet pre-engineered metal building specifications. The material is soft, resilient and easily worked by hand, yet adheres instantly to most uncleaned surfaces.",
    "image": "https://forzabuilt.com/wp-content/uploads/2023/05/butyl-tape-mockup-1024x1024.png",
    "url": "https://forzabuilt.com/product/t500-butyl-adhesive-tape/",
    "specifications": {
      "type": "T500 – BUTYL ADHESIVE TAPE",
      "substrates": [
        "Preformed butyl tapes allow the erector precise control of volume and sealant placement on roof laps, end laps and side laps of metal buildings.",
        "Excellent weathering characteristics while retaining adhesion and elasticity in both hot and cold environments.",
        "Chemically inert and is non-corrosive to paint, metal, aluminum, copper, plastic and will not swell rubber.",
        "Ensure substrate is clean and dry, and free from dust, dirt, oil, wax or silicone.",
        "Apply to the part to be bonded, ensuring that no air is trapped between the tape and the substrate.",
        "Apply with recommended application pressure of 15 pounds per inch of tape width.",
        "At the point of final assembly or lamination, remove the release liner and apply with care to avoid wrinkles or trapped air.",
        "Recommended application temperature to achieve best results is 65°F or above.",
        "1/4” x 1” x 35’",
        "1/8” x 3/4” x 60’"
      ],
      "applications": [
        "Preformed butyl tapes allow the erector precise control of volume and sealant placement on roof laps, end laps and side laps of metal buildings.",
        "Excellent weathering characteristics while retaining adhesion and elasticity in both hot and cold environments.",
        "Chemically inert and is non-corrosive to paint, metal, aluminum, copper, plastic and will not swell rubber.",
        "Ensure substrate is clean and dry, and free from dust, dirt, oil, wax or silicone.",
        "Apply to the part to be bonded, ensuring that no air is trapped between the tape and the substrate.",
        "Apply with recommended application pressure of 15 pounds per inch of tape width.",
        "At the point of final assembly or lamination, remove the release liner and apply with care to avoid wrinkles or trapped air.",
        "Recommended application temperature to achieve best results is 65°F or above.",
        "1/4” x 1” x 35’",
        "1/8” x 3/4” x 60’"
      ],
      "features": [
        "Preformed butyl tapes allow the erector precise control of volume and sealant placement on roof laps, end laps and side laps of metal buildings.",
        "Excellent weathering characteristics while retaining adhesion and elasticity in both hot and cold environments.",
        "Chemically inert and is non-corrosive to paint, metal, aluminum, copper, plastic and will not swell rubber."
      ],
      "certifications": [],
      "packaging": []
    },
    "technicalData": {},
    "benefits": [],
    "howToUse": [],
    "colors": [],
    "sizing": [],
    "cleanup": []
  }
];

// Helper functions to get products by category and industry
export const getBondProducts = () => industrialDatasheet.filter(product => product.category === 'BOND');
export const getSealProducts = () => industrialDatasheet.filter(product => product.category === 'SEAL');
export const getTapeProducts = () => industrialDatasheet.filter(product => product.category === 'TAPE');

// Helper function to get products by industry
export const getProductsByIndustry = (industry: string) => {
  // Only allow the 7 official industries
  const allowedIndustries = [
    'transportation',
    'marine',
    'construction',
    'industrial',
    'foam',
    'composites',
    'insulation',
  ];
  if (!allowedIndustries.includes(industry)) return [];
  return industrialDatasheet.filter(product => product.industry === industry);
};

// Helper function to get all unique industries (official only, in correct order)
export const getAllIndustries = () => {
  // Canonical, lowercased, in correct order
  return [
    'transportation',
    'marine',
    'construction',
    'industrial',
    'foam',
    'composites',
    'insulation',
  ];
};

// Helper function to get product by ID
export const getProductById = (id: string) => industrialDatasheet.find(product => product.id === id);

// Helper function to search products by name
export const searchProducts = (searchTerm: string) => {
  const term = searchTerm.toLowerCase();
  return industrialDatasheet.filter(product => 
    product.name.toLowerCase().includes(term) ||
    product.description.toLowerCase().includes(term)
  );
};