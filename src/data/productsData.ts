export interface Product {
  id: string;
  name: string;
  image: string;
  url: string;
  productType: 'bond' | 'seal' | 'tape';
  industries: string[];
  description?: string;
}

export const allProducts: Product[] = [
  // TAC Series - Bond Products (Infusion Molding Adhesives)
  {
    id: 'tac-734g',
    name: 'TAC-734G – WEB SPRAY HIGH TACK INFUSION MOLDING ADHESIVE',
    image: 'https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-734G-NEW.png',
    url: 'https://forzabuilt.com/product/tac-734g-web-spray-high-tack-infusion-molding-adhesive/',
    productType: 'bond',
    industries: ['marine', 'transportation', 'composites'],
    description: 'High tack infusion molding adhesive for demanding applications'
  },
  {
    id: 'tac-735r',
    name: 'TAC-735R – MIST SPRAY NO HAPS INFUSION MOLDING ADHESIVE',
    image: 'https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-735R-NEW-1024x1024.png',
    url: 'https://forzabuilt.com/product/tac-735r-mist-spray-no-haps-infusion-molding-adhesive/',
    productType: 'bond',
    industries: ['marine', 'transportation', 'composites'],
    description: 'No HAPS infusion molding adhesive for environmentally conscious applications'
  },
  {
    id: 'tac-738r',
    name: 'TAC-738R – WEB SPRAY ZERO VOC INFUSION MOLDING ADHESIVE',
    image: 'https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-738R-NEW.png',
    url: 'https://forzabuilt.com/product/tac-738r-web-spray-zero-voc-infusion-molding-adhesive/',
    productType: 'bond',
    industries: ['marine', 'transportation', 'composites'],
    description: 'Zero VOC infusion molding adhesive for clean manufacturing'
  },
  {
    id: 'tac-739r',
    name: 'TAC-739R – MIST SPRAY INFUSION MOLDING ADHESIVE',
    image: 'https://forzabuilt.com/wp-content/uploads/2024/06/Master-bundle-TAC-739R-NEW-1024x1024.png',
    url: 'https://forzabuilt.com/product/tac-739r-mist-spray-infusion-molding-adhesive/',
    productType: 'bond',
    industries: ['marine', 'transportation', 'composites'],
    description: 'Mist spray infusion molding adhesive for precise application'
  },

  // MC Series - Bond Products (Contact Adhesives)
  {
    id: 'mc722',
    name: 'MC722 – WEB SPRAY NON-FLAM/NON-METHYLENE CHLORIDE CONTACT ADHESIVE',
    image: 'https://forzabuilt.com/wp-content/uploads/2023/06/MC722-single-5-1024x1024.png',
    url: 'https://forzabuilt.com/product/mc722-web-spray-contact-adhesive-for-infusion-molding/',
    productType: 'bond',
    industries: ['marine', 'transportation', 'composites', 'industrial'],
    description: 'Non-flammable contact adhesive for safe manufacturing'
  },
  {
    id: 'mc723',
    name: 'MC723 – WEB SPRAY CA COMPLIANT MULTI-PURPOSE CONTACT ADHESIVE',
    image: 'https://forzabuilt.com/wp-content/uploads/2024/06/MC723-bundle-New-1024x1024.png',
    url: 'https://forzabuilt.com/product/mc723-web-spray-ca-compliant-multi-purpose-contact-adhesive/',
    productType: 'bond',
    industries: ['marine', 'transportation', 'composites', 'industrial', 'construction'],
    description: 'CA compliant multi-purpose contact adhesive'
  },
  {
    id: 'mc741',
    name: 'MC741 – CA COMPLIANT MULTI-PURPOSE CONTACT ADHESIVE',
    image: 'https://forzabuilt.com/wp-content/uploads/2025/01/canister-mockup-MC741-1024x1024.png',
    url: 'https://forzabuilt.com/product/mc741-ca-compliant-multi-purpose-contact-adhesive/',
    productType: 'bond',
    industries: ['marine', 'transportation', 'composites', 'industrial', 'construction'],
    description: 'CA compliant multi-purpose contact adhesive for general use'
  },

  // M Series - Bond Products (Structural Adhesives)
  {
    id: 'm-os764',
    name: 'M-OS764 – ULTRA HIGH-STRENGTH HYBRID POLYMER STRUCTURAL ADHESIVE',
    image: 'https://forzabuilt.com/wp-content/uploads/2024/06/AP749_M-OS764_Sausage_NEW-1024x1024.png',
    url: 'https://forzabuilt.com/product/m-os764-non-hazardous-moisture-cure-structural-adhesive/',
    productType: 'bond',
    industries: ['marine', 'transportation', 'composites', 'industrial', 'construction'],
    description: 'Ultra high-strength structural adhesive for demanding applications'
  },
  {
    id: 'm-r420',
    name: 'M-R420 – EPOXY QUICK-SET TWO-PART ADHESIVE',
    image: 'https://forzabuilt.com/wp-content/uploads/2024/06/M-R420-NEW.png',
    url: 'https://forzabuilt.com/product/m-r420-epoxy-quick-set-two-part-adhesive/',
    productType: 'bond',
    industries: ['marine', 'transportation', 'composites', 'industrial', 'construction'],
    description: 'Quick-set epoxy adhesive for rapid assembly'
  },
  {
    id: 'm-r445',
    name: 'M-R445 – TWO-PART EPOXY ADHESIVE',
    image: 'https://forzabuilt.com/wp-content/uploads/2025/03/M-R445-.png',
    url: 'https://forzabuilt.com/product/m-r445-two-part-modified-epoxy-adhesive/',
    productType: 'bond',
    industries: ['marine', 'transportation', 'composites', 'industrial', 'construction'],
    description: 'Two-part modified epoxy adhesive for structural bonding'
  },

  // Contact Adhesives - Bond Category
  {
    id: 'm-c280',
    name: 'M-C280 – NEOPRENE CONTACT ADHESIVE',
    image: 'https://forzabuilt.com/wp-content/uploads/2024/06/M-C280-NEW.png',
    url: 'https://forzabuilt.com/product/m-c280-neoprene-contact-adhesive/',
    productType: 'bond',
    industries: ['marine', 'transportation', 'composites', 'industrial', 'construction', 'foam'],
    description: 'Neoprene contact adhesive for flexible bonding'
  },
  {
    id: 'm-c285',
    name: 'M-C285 – PREMIUM HIGH TEMP NEOPRENE CONTACT ADHESIVE',
    image: 'https://forzabuilt.com/wp-content/uploads/2024/06/M-C285-NEW.png',
    url: 'https://forzabuilt.com/product/m-c285-premium-high-temp-neoprene-contact-adhesive/',
    productType: 'bond',
    industries: ['marine', 'transportation', 'composites', 'industrial', 'construction'],
    description: 'Premium high-temperature neoprene contact adhesive'
  },

  // SEAL Products
  {
    id: 'm-oa755',
    name: 'M-OA755 – HIGH-STRENGTH SINGLE-PART HYBRID POLYMER ADHESIVE/SEALANT',
    image: 'https://forzabuilt.com/wp-content/uploads/2024/06/M-OA755-New.png',
    url: 'https://forzabuilt.com/product/m-oa755-high-strength-single-part-hybrid-performance-polymer/',
    productType: 'seal',
    industries: ['marine', 'transportation', 'composites', 'industrial', 'construction'],
    description: 'High-strength adhesive/sealant for structural applications'
  },
  {
    id: 'm-os789',
    name: 'M-OS789 – MULTI-PURPOSE HYBRID POLYMER SEALANT',
    image: 'https://forzabuilt.com/wp-content/uploads/2024/06/sausagem-os789-NEW-USE-1024x1024.png',
    url: 'https://forzabuilt.com/product/m-os789-multi-purpose-hybrid-polymer-sealant/',
    productType: 'seal',
    industries: ['marine', 'transportation', 'composites', 'industrial', 'construction'],
    description: 'Multi-purpose hybrid polymer sealant for versatile applications'
  },
  {
    id: 'm-os796',
    name: 'M-OS796 – FAST-SKIN MULTI-PURPOSE HYBRID POLYMER SEALANT',
    image: 'https://forzabuilt.com/wp-content/uploads/2024/06/M-OS796-NEW-819x1024.png',
    url: 'https://forzabuilt.com/product/m-os796-fast-kin-multi-purpose-hybrid-polymer-sealant/',
    productType: 'seal',
    industries: ['marine', 'transportation', 'composites', 'industrial', 'construction'],
    description: 'Fast-skin multi-purpose hybrid polymer sealant for rapid applications'
  },

  // TAPE Products (Pressure Sensitive Adhesives)
  {
    id: 'mc724',
    name: 'MC724 – WEB SPRAY PRESSURE SENSITIVE ADHESIVE',
    image: 'https://forzabuilt.com/wp-content/uploads/2024/10/MC724-bundle-1024x1024.png',
    url: 'https://forzabuilt.com/product/web-spray-pressure-sensitive-adhesive/',
    productType: 'tape',
    industries: ['marine', 'transportation', 'composites', 'industrial', 'construction', 'insulation'],
    description: 'Pressure sensitive adhesive for versatile applications'
  },
  {
    id: 'mc737',
    name: 'MC737 – WEB SPRAY STYRENE SAFE PRESSURE SENSITIVE ADHESIVE',
    image: 'https://forzabuilt.com/wp-content/uploads/2024/06/A_FORZA_MC737_Canister22L-NEW1-1024x1024.png',
    url: 'https://forzabuilt.com/product/mc737-web-spray-styrene-safe-pressure-sensitive-adhesive/',
    productType: 'tape',
    industries: ['marine', 'transportation', 'composites', 'industrial'],
    description: 'Styrene safe pressure sensitive adhesive for specialized applications'
  },
  {
    id: 'm-t815',
    name: 'M-T815 – DOUBLE-COATED ULTRA HIGH-BOND ACRYLIC FOAM TAPE',
    image: 'https://forzabuilt.com/wp-content/uploads/2024/06/M-T820-NEW-1024x1024.png',
    url: 'https://forzabuilt.com/product/m-t815-double-coated-ultra-high-bond-acrylic-foam-tape/',
    productType: 'tape',
    industries: ['marine', 'transportation', 'composites', 'industrial', 'construction'],
    description: 'Double-coated ultra high-bond acrylic foam tape for demanding applications'
  },
  {
    id: 'm-t820',
    name: 'M-T820 – DOUBLE-COATED ULTRA HIGH BOND ACRYLIC FOAM TAPE',
    image: 'https://forzabuilt.com/wp-content/uploads/2024/06/M-T820-NEW-1024x1024.png',
    url: 'https://forzabuilt.com/product/m-t820-double-coated-ultra-high-bond-acrylic-foam-tape/',
    productType: 'tape',
    industries: ['marine', 'transportation', 'composites', 'industrial', 'construction'],
    description: 'Double-coated ultra high bond acrylic foam tape for structural bonding'
  },

  // Industry-Specific Products
  // Foam Products
  {
    id: 'foam-bond-1',
    name: 'FOAM BONDING ADHESIVE',
    image: 'https://forzabuilt.com/wp-content/uploads/2023/06/Forza-Built-Foam-2-scaled.jpeg',
    url: 'https://forzabuilt.com/product/foam-bonding-adhesive/',
    productType: 'bond',
    industries: ['foam'],
    description: 'Specialized adhesive for foam bonding applications'
  },
  {
    id: 'foam-seal-1',
    name: 'FOAM SEALING SOLUTION',
    image: 'https://forzabuilt.com/wp-content/uploads/2023/06/Forza-Built-Foam-1-scaled.jpeg',
    url: 'https://forzabuilt.com/product/foam-sealing-solution/',
    productType: 'seal',
    industries: ['foam'],
    description: 'Sealing solution for foam applications'
  },

  // Insulation Products
  {
    id: 'insulation-bond-1',
    name: 'INSULATION BONDING ADHESIVE',
    image: 'https://forzabuilt.com/wp-content/uploads/2023/06/Forza-Built-Insulation-1-scaled.jpeg',
    url: 'https://forzabuilt.com/product/insulation-bonding-adhesive/',
    productType: 'bond',
    industries: ['insulation'],
    description: 'Bonding adhesive for insulation materials'
  },
  {
    id: 'insulation-seal-1',
    name: 'INSULATION SEALING SOLUTION',
    image: 'https://forzabuilt.com/wp-content/uploads/2023/06/Forza-Built-Insulation-2-scaled.jpeg',
    url: 'https://forzabuilt.com/product/insulation-sealing-solution/',
    productType: 'seal',
    industries: ['insulation'],
    description: 'Sealing solution for insulation applications'
  },

  // Industrial Products
  {
    id: 'industrial-bond-1',
    name: 'INDUSTRIAL BONDING ADHESIVE',
    image: 'https://forzabuilt.com/wp-content/uploads/2023/06/Forza-Built-General-Industries-2-scaled.jpeg',
    url: 'https://forzabuilt.com/product/industrial-bonding-adhesive/',
    productType: 'bond',
    industries: ['industrial'],
    description: 'Bonding adhesive for industrial applications'
  },
  {
    id: 'industrial-seal-1',
    name: 'INDUSTRIAL SEALING SOLUTION',
    image: 'https://forzabuilt.com/wp-content/uploads/2023/06/Forza-Built-General-Industries-image-1.jpg',
    url: 'https://forzabuilt.com/product/industrial-sealing-solution/',
    productType: 'seal',
    industries: ['industrial'],
    description: 'Sealing solution for industrial applications'
  }
];

// Utility functions
export const getProductsByIndustry = (industry: string): Product[] => {
  return allProducts.filter(product => 
    product.industries.includes(industry.toLowerCase())
  );
};

export const getProductsByType = (productType: string): Product[] => {
  return allProducts.filter(product => 
    product.productType === productType
  );
};

export const getProductsByIndustryAndType = (industry: string, productType: string): Product[] => {
  return allProducts.filter(product => 
    product.industries.includes(industry.toLowerCase()) && 
    product.productType === productType
  );
}; 