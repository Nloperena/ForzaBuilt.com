import { ProductDatasheet } from './industrialDatasheet';

export const INDUSTRIAL_PRODUCTS: ProductDatasheet[] = [
  // INDUSTRIAL BOND PRODUCTS
  {
    id: 'i-bond-100',
    name: 'I-BOND-100 – INDUSTRIAL STRUCTURAL ADHESIVE',
    category: 'BOND',
    industry: ['industrial'],
    description: 'Premium high-strength industrial structural adhesive engineered for demanding manufacturing and equipment assembly applications. Delivers exceptional bonding performance for metal, plastic, and composite substrates in industrial environments.',
    image: 'https://forzabuilt.com/wp-content/uploads/2023/06/Industrial-Bonding-Adhesive.png',
    url: 'https://forzabuilt.com/product/i-bond-100-industrial-structural-adhesive/',
    specifications: {
      type: 'Industrial Structural Adhesive',
      viscosity: '150,000-200,000 cps',
      solids: '95-98%',
      flashPoint: '>200°F',
      potLife: '2 hours',
      cureTime: '24-48 hours',
      temperatureRange: '-40°F to +200°F',
      substrates: ['Metal', 'Plastic', 'Glass', 'Ceramic', 'Composites', 'Rubber'],
      applications: ['Industrial Equipment Assembly', 'Manufacturing Production Lines', 'Heavy Machinery Bonding', 'Factory Automation Systems', 'Industrial Maintenance', 'Equipment Housing Assembly'],
      features: ['High Temperature Resistance', 'Chemical Resistant Formula', 'Industrial Grade Strength', 'Extended Service Life', 'VOC Compliant', 'Fast Cure Technology'],
      certifications: ['Industrial Approved', 'Chemical Resistant', 'VOC Compliant'],
      packaging: ['10 oz Cartridge', '5 Gallon Pail', '55 Gallon Drum']
    },
    technicalData: {
      density: '12.5 lbs/gal',
      pH: '7.0-8.0',
      color: 'Gray',
      odor: 'Low',
      shelfLife: '12 months',
      storageConditions: 'Store at 50-80°F, keep container sealed'
    }
  },
  {
    id: 'i-bond-200',
    name: 'I-BOND-200 – HEAVY DUTY INDUSTRIAL ADHESIVE',
    category: 'BOND',
    industry: ['industrial'],
    description: 'Heavy duty industrial adhesive for extreme conditions and high-stress applications.',
    image: 'https://forzabuilt.com/wp-content/uploads/2023/06/Heavy-Duty-Industrial-Adhesive.png',
    url: 'https://forzabuilt.com/product/i-bond-200-heavy-duty-industrial-adhesive/',
    specifications: {
      type: 'Heavy Duty Industrial Adhesive',
      viscosity: '200,000-250,000 cps',
      solids: '96-99%',
      flashPoint: '>220°F',
      potLife: '1.5 hours',
      cureTime: '48-72 hours',
      temperatureRange: '-50°F to +250°F',
      substrates: ['Steel', 'Aluminum', 'Titanium', 'High-Temp Plastics'],
      applications: ['Heavy Machinery', 'Industrial Equipment', 'High-Temperature Applications'],
      features: ['Extreme Temperature', 'Heavy Duty', 'Chemical Resistant', 'Long Service Life'],
      certifications: ['Industrial Grade', 'High Temperature Approved'],
      packaging: ['10 oz Cartridge', '5 Gallon Pail']
    },
    technicalData: {
      density: '13.0 lbs/gal',
      pH: '7.0-8.0',
      color: 'Dark Gray',
      odor: 'Low',
      shelfLife: '12 months',
      storageConditions: 'Store at 50-80°F, keep container sealed'
    }
  },
  {
    id: 'i-bond-300',
    name: 'I-BOND-300 – CHEMICAL RESISTANT INDUSTRIAL ADHESIVE',
    category: 'BOND',
    industry: ['industrial'],
    description: 'Chemical resistant industrial adhesive for harsh chemical environments.',
    image: 'https://forzabuilt.com/wp-content/uploads/2023/06/Chemical-Resistant-Industrial-Adhesive.png',
    url: 'https://forzabuilt.com/product/i-bond-300-chemical-resistant-industrial-adhesive/',
    specifications: {
      type: 'Chemical Resistant Industrial Adhesive',
      viscosity: '180,000-220,000 cps',
      solids: '94-97%',
      flashPoint: '>200°F',
      potLife: '2 hours',
      cureTime: '24-48 hours',
      temperatureRange: '-30°F to +180°F',
      substrates: ['Stainless Steel', 'Plastic', 'Glass', 'Ceramic'],
      applications: ['Chemical Processing', 'Laboratory Equipment', 'Industrial Tanks'],
      features: ['Chemical Resistant', 'Acid Resistant', 'Base Resistant', 'Industrial Grade'],
      certifications: ['Chemical Resistant', 'Industrial Approved'],
      packaging: ['10 oz Cartridge', '5 Gallon Pail']
    },
    technicalData: {
      density: '12.8 lbs/gal',
      pH: '7.0-8.0',
      color: 'White',
      odor: 'Low',
      shelfLife: '12 months',
      storageConditions: 'Store at 50-80°F, keep container sealed'
    }
  },

  // INDUSTRIAL SEAL PRODUCTS
  {
    id: 'i-seal-100',
    name: 'I-SEAL-100 – INDUSTRIAL SEALANT',
    category: 'SEAL',
    industry: ['industrial'],
    description: 'High-performance industrial sealant for demanding manufacturing applications.',
    image: 'https://forzabuilt.com/wp-content/uploads/2023/06/Industrial-Sealant.png',
    url: 'https://forzabuilt.com/product/i-seal-100-industrial-sealant/',
    specifications: {
      type: 'Industrial Sealant',
      viscosity: '150,000-200,000 cps',
      solids: '95-98%',
      flashPoint: '>200°F',
      potLife: '2 hours',
      cureTime: '24-48 hours',
      temperatureRange: '-40°F to +200°F',
      substrates: ['Metal', 'Plastic', 'Glass', 'Ceramic'],
      applications: ['Industrial Equipment', 'Manufacturing', 'Assembly Lines', 'Heavy Machinery'],
      features: ['High Temperature', 'Chemical Resistant', 'Industrial Grade', 'Long Service Life'],
      certifications: ['Industrial Approved', 'Chemical Resistant'],
      packaging: ['10 oz Cartridge', '5 Gallon Pail']
    },
    technicalData: {
      density: '12.5 lbs/gal',
      pH: '7.0-8.0',
      color: 'Gray',
      odor: 'Low',
      shelfLife: '12 months',
      storageConditions: 'Store at 50-80°F, keep container sealed'
    }
  },
  {
    id: 'i-seal-200',
    name: 'I-SEAL-200 – HEAVY DUTY INDUSTRIAL SEALANT',
    category: 'SEAL',
    industry: ['industrial'],
    description: 'Heavy duty industrial sealant for extreme conditions and high-stress applications.',
    image: 'https://forzabuilt.com/wp-content/uploads/2023/06/Heavy-Duty-Sealant.png',
    url: 'https://forzabuilt.com/product/i-seal-200-heavy-duty-industrial-sealant/',
    specifications: {
      type: 'Heavy Duty Industrial Sealant',
      viscosity: '200,000-250,000 cps',
      solids: '96-99%',
      flashPoint: '>220°F',
      potLife: '1.5 hours',
      cureTime: '48-72 hours',
      temperatureRange: '-50°F to +250°F',
      substrates: ['Steel', 'Aluminum', 'Titanium', 'High-Temp Plastics'],
      applications: ['Heavy Machinery', 'Industrial Equipment', 'High-Temperature Applications'],
      features: ['Extreme Temperature', 'Heavy Duty', 'Chemical Resistant', 'Long Service Life'],
      certifications: ['Industrial Grade', 'High Temperature Approved'],
      packaging: ['10 oz Cartridge', '5 Gallon Pail']
    },
    technicalData: {
      density: '13.0 lbs/gal',
      pH: '7.0-8.0',
      color: 'Dark Gray',
      odor: 'Low',
      shelfLife: '12 months',
      storageConditions: 'Store at 50-80°F, keep container sealed'
    }
  },
  {
    id: 'i-seal-300',
    name: 'I-SEAL-300 – CHEMICAL RESISTANT INDUSTRIAL SEALANT',
    category: 'SEAL',
    industry: ['industrial'],
    description: 'Chemical resistant industrial sealant for harsh chemical environments.',
    image: 'https://forzabuilt.com/wp-content/uploads/2023/06/Chemical-Resistant-Sealant.png',
    url: 'https://forzabuilt.com/product/i-seal-300-chemical-resistant-industrial-sealant/',
    specifications: {
      type: 'Chemical Resistant Industrial Sealant',
      viscosity: '180,000-220,000 cps',
      solids: '94-97%',
      flashPoint: '>200°F',
      potLife: '2 hours',
      cureTime: '24-48 hours',
      temperatureRange: '-30°F to +180°F',
      substrates: ['Stainless Steel', 'Plastic', 'Glass', 'Ceramic'],
      applications: ['Chemical Processing', 'Laboratory Equipment', 'Industrial Tanks'],
      features: ['Chemical Resistant', 'Acid Resistant', 'Base Resistant', 'Industrial Grade'],
      certifications: ['Chemical Resistant', 'Industrial Approved'],
      packaging: ['10 oz Cartridge', '5 Gallon Pail']
    },
    technicalData: {
      density: '12.8 lbs/gal',
      pH: '7.0-8.0',
      color: 'White',
      odor: 'Low',
      shelfLife: '12 months',
      storageConditions: 'Store at 50-80°F, keep container sealed'
    }
  },

  // INDUSTRIAL TAPE PRODUCTS
  {
    id: 'i-tape-100',
    name: 'I-TAPE-100 – INDUSTRIAL HIGH-BOND TAPE',
    category: 'TAPE',
    industry: ['industrial'],
    description: 'High-bond industrial tape for demanding manufacturing applications.',
    image: 'https://forzabuilt.com/wp-content/uploads/2023/05/vhb-tape-mockup-1024x1024.png',
    url: 'https://forzabuilt.com/product/i-tape-100-industrial-high-bond-tape/',
    specifications: {
      type: 'Industrial High-Bond Tape',
      thickness: '0.060"',
      width: '1/2", 1", 2", 3", 4"',
      length: '36 yards per roll',
      substrates: ['Metal', 'Plastic', 'Glass', 'Painted Surfaces'],
      applications: ['Industrial Assembly', 'Manufacturing', 'Equipment Mounting', 'Signage'],
      features: ['High Bond', 'Industrial Grade', 'Weather Resistant', 'Chemical Resistant'],
      certifications: ['Industrial Grade', 'VHB Technology'],
      packaging: ['36 yard rolls', 'Various widths']
    },
    technicalData: {
      adhesiveType: 'Acrylic',
      foamType: 'Closed Cell Foam',
      peelStrength: '45 lbs/in',
      shearStrength: '1000+ lbs/in²',
      shelfLife: '24 months',
      storageConditions: 'Store at 50-80°F, keep in original packaging'
    }
  },
  {
    id: 'i-tape-200',
    name: 'I-TAPE-200 – INDUSTRIAL GASKETING TAPE',
    category: 'TAPE',
    industry: ['industrial'],
    description: 'Industrial gasketing tape for sealing applications in manufacturing environments.',
    image: 'https://forzabuilt.com/wp-content/uploads/2023/06/T600-Foam-Bonding-Tape.png',
    url: 'https://forzabuilt.com/product/i-tape-200-industrial-gasketing-tape/',
    specifications: {
      type: 'Industrial Gasketing Tape',
      thickness: '0.080"',
      width: '1/2", 1", 2", 3", 4"',
      length: '36 yards per roll',
      substrates: ['Metal', 'Plastic', 'Glass', 'Painted Surfaces'],
      applications: ['Gasketing', 'Sealing', 'Industrial Equipment', 'Manufacturing'],
      features: ['Gasketing', 'Sealing', 'Weather Resistant', 'Industrial Grade'],
      certifications: ['Industrial Grade'],
      packaging: ['36 yard rolls', 'Various widths']
    },
    technicalData: {
      adhesiveType: 'Acrylic',
      foamType: 'Gasketing Foam',
      peelStrength: '45 lbs/in',
      shearStrength: '1000 lbs/in²',
      shelfLife: '24 months',
      storageConditions: 'Store at 50-80°F, keep in original packaging'
    }
  },
  {
    id: 'i-tape-300',
    name: 'I-TAPE-300 – INDUSTRIAL TRANSFER TAPE',
    category: 'TAPE',
    industry: ['industrial'],
    description: 'High-performance industrial transfer tape for manufacturing applications.',
    image: 'https://forzabuilt.com/wp-content/uploads/2023/06/T464-Transfer-Tape-1024x1024.png',
    url: 'https://forzabuilt.com/product/i-tape-300-industrial-transfer-tape/',
    specifications: {
      type: 'Industrial Transfer Tape',
      thickness: '0.020"',
      width: '1/2", 1", 2", 3", 4"',
      length: '36 yards per roll',
      substrates: ['Metal', 'Plastic', 'Glass', 'Painted Surfaces'],
      applications: ['Industrial Bonding', 'Manufacturing', 'Assembly', 'Signage'],
      features: ['Transfer Adhesive', 'High Performance', 'Weather Resistant', 'Easy Application'],
      certifications: ['Industrial Grade'],
      packaging: ['36 yard rolls', 'Various widths']
    },
    technicalData: {
      adhesiveType: 'Acrylic',
      foamType: 'Transfer Adhesive',
      peelStrength: '30 lbs/in',
      shearStrength: '600 lbs/in²',
      shelfLife: '24 months',
      storageConditions: 'Store at 50-80°F, keep in original packaging'
    }
  }
];

// Helper functions
export const getIndustrialProducts = () => INDUSTRIAL_PRODUCTS;
export const getIndustrialBondProducts = () => INDUSTRIAL_PRODUCTS.filter(product => product.category === 'BOND');
export const getIndustrialSealProducts = () => INDUSTRIAL_PRODUCTS.filter(product => product.category === 'SEAL');
export const getIndustrialTapeProducts = () => INDUSTRIAL_PRODUCTS.filter(product => product.category === 'TAPE'); 