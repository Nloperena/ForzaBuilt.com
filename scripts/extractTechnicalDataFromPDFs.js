const fs = require('fs');
const path = require('path');

console.log('🔬 TECHNICAL DATA EXTRACTION - PDF Pattern Analysis');
console.log('====================================================\n');

// Read the existing data to understand patterns
const tdsDataPath = path.join(__dirname, '../../TDS_backup/web_ready_product_data.json');
const productsDataPath = path.join(__dirname, '../public/productsSimplified.json');

const tdsData = JSON.parse(fs.readFileSync(tdsDataPath, 'utf8'));
const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));

// Analyze existing technical data patterns
console.log('📋 Analyzing existing technical data patterns...\n');

// Function to extract technical table data from product descriptions
function extractTechnicalDataFromDescription(product) {
  const description = product.details?.description || '';
  const benefits = product.details?.benefits || '';
  
  // Look for common technical data patterns
  const technicalData = {};
  
  // Common patterns we might find in descriptions:
  const patterns = {
    temperature: /(\d+)°?[FC]?.*temperature/i,
    viscosity: /viscosity[\:\s]*([^\n]+)/i,
    solids: /solids?[\:\s]*([\d\-]+%?)/i,
    voc: /voc[\:\s]*([\d\.]+ ?g\/l?)/i,
    flammable: /(non[\-\s]*flammable|flammable)/i,
    coverage: /coverage[\:\s]*([^\n]+)/i,
    shelfLife: /(\d+)\s*(months?|years?)/i,
    appearance: /appearance[\:\s]*([^\n]+)/i
  };
  
  // Extract data based on patterns
  Object.entries(patterns).forEach(([key, pattern]) => {
    const match = description.match(pattern) || benefits.match(pattern);
    if (match) {
      technicalData[key] = match[1]?.trim();
    }
  });
  
  // Special handling for common cases
  if (benefits.includes('Non-flammable') || description.includes('non-flammable')) {
    technicalData.solvent = 'Non-Flammable';
  }
  
  if (benefits.includes('VOC free') || description.includes('VOC free')) {
    technicalData.voc = '0 g/L';
  }
  
  return technicalData;
}

// Analyze sample products to understand data structure
console.log('🔍 Sample Technical Data Extraction:');
console.log('=====================================\n');

const sampleProducts = tdsData.slice(0, 10);
sampleProducts.forEach(product => {
  const extracted = extractTechnicalDataFromDescription(product);
  if (Object.keys(extracted).length > 0) {
    console.log(`📦 ${product.code}:`);
    Object.entries(extracted).forEach(([key, value]) => {
      console.log(`   • ${key}: ${value}`);
    });
    console.log('');
  }
});

// Create comprehensive technical data mapping
console.log('🏗️  Creating technical data mapping for all products...\n');

const technicalDataMap = {};
let productsWithTechnicalData = 0;

tdsData.forEach(product => {
  const extracted = extractTechnicalDataFromDescription(product);
  if (Object.keys(extracted).length > 0) {
    technicalDataMap[product.code.toLowerCase()] = extracted;
    productsWithTechnicalData++;
  }
});

console.log(`📊 Technical Data Extraction Results:`);
console.log(`   • Products analyzed: ${tdsData.length}`);
console.log(`   • Products with extractable technical data: ${productsWithTechnicalData}`);
console.log(`   • Data fields commonly found: ${[...new Set(Object.values(technicalDataMap).flatMap(Object.keys))].join(', ')}`);

// Now create the standardized technical data format based on TDS patterns
console.log('\n📋 Creating standardized technical data format...');

// Define the standard technical data structure we want for all products
const standardTechnicalFields = {
  'appearance': 'Appearance',
  'shelfLife': 'Shelf Life', 
  'solids': 'Solids',
  'solvent': 'Solvent',
  'voc': 'VOC',
  'viscosity': 'Viscosity',
  'temperature': 'Temperature Range',
  'coverage': 'Coverage',
  'density': 'Density',
  'pH': 'pH'
};

// Save the extracted technical data mapping for use in next phase
const outputPath = path.join(__dirname, 'extractedTechnicalData.json');
fs.writeFileSync(outputPath, JSON.stringify({
  mapping: technicalDataMap,
  standards: standardTechnicalFields,
  summary: {
    totalProducts: tdsData.length,
    productsWithData: productsWithTechnicalData,
    extractionDate: new Date().toISOString()
  }
}, null, 2));

console.log(`\n✅ Technical data extraction complete!`);
console.log(`📁 Results saved to: ${outputPath}`);
console.log(`\n🎯 Ready for Phase 2: Apply extracted data to products`);

// Create the application script
const applyScript = `
// This will be our next script to apply the extracted technical data
// to all products in the standardized format like we did for C331
console.log('Ready to apply technical data to all products!');
`;

console.log('\n📝 Next: Run applyTechnicalDataToAllProducts.js to update all products');
