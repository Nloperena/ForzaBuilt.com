const fs = require('fs');
const path = require('path');

console.log('📊 Analyzing TDS backup data and current product data...\n');

// Read TDS backup data
const tdsDataPath = path.join(__dirname, '../../TDS_backup/web_ready_product_data.json');
const tdsData = JSON.parse(fs.readFileSync(tdsDataPath, 'utf8'));

// Read current products data
const currentDataPath = path.join(__dirname, '../public/productsSimplified.json');
const currentData = JSON.parse(fs.readFileSync(currentDataPath, 'utf8'));

console.log(`🔍 TDS Backup Analysis:`);
console.log(`   • Total products in TDS backup: ${tdsData.length}`);
console.log(`   • Categories found: ${[...new Set(tdsData.map(p => p.category))].length}`);
console.log(`   • Products with sizing data: ${tdsData.filter(p => p.details?.sizing).length}`);
console.log(`   • Products with technical descriptions: ${tdsData.filter(p => p.details?.description).length}`);

console.log(`\n📊 Current Products Analysis:`);
console.log(`   • Total products in current system: ${currentData.products.length}`);
console.log(`   • Products with images: ${currentData.products.filter(p => p.imageUrl).length}`);
console.log(`   • Products with sizing data: ${currentData.products.filter(p => p.sizes && p.sizes.length > 0).length}`);
console.log(`   • Products with technical data: ${currentData.products.filter(p => p.technicalData && Object.keys(p.technicalData).length > 0).length}`);

// Find products that exist in TDS but missing in current system
const tdsProductCodes = new Set(tdsData.map(p => p.code.toLowerCase()));
const currentProductIds = new Set(currentData.products.map(p => p.id.toLowerCase()));

const missingInCurrent = tdsData.filter(p => !currentProductIds.has(p.code.toLowerCase()));
const missingInTDS = currentData.products.filter(p => !tdsProductCodes.has(p.id.toLowerCase()));

console.log(`\n🔗 Data Matching Analysis:`);
console.log(`   • Products in TDS but not in current system: ${missingInCurrent.length}`);
console.log(`   • Products in current system but not in TDS: ${missingInTDS.length}`);

// Sample technical data structure
const sampleWithTechnical = tdsData.find(p => p.details?.description);
console.log(`\n📋 Sample TDS Data Structure:`);
console.log(`   • Product: ${sampleWithTechnical?.name}`);
console.log(`   • Available fields:`, Object.keys(sampleWithTechnical?.details || {}));

// Check for products with complete data
const completeProducts = tdsData.filter(p => 
  p.details?.sizing && 
  p.details?.description && 
  p.details?.applications && 
  p.details?.benefits
);

console.log(`\n✅ Products with Complete Data: ${completeProducts.length}`);
console.log(`   • Ready for full import: ${(completeProducts.length / tdsData.length * 100).toFixed(1)}%`);

// Analyze image availability  
const imageDir = path.join(__dirname, '../public/product-images');
const imageFiles = fs.readdirSync(imageDir);
const imageProductIds = imageFiles.map(f => f.replace(/\.(png|jpg|jpeg)$/i, '').toLowerCase());

console.log(`\n🖼️ Image Analysis:`);
console.log(`   • Total product images available: ${imageFiles.length}`);
console.log(`   • Products with matching images: ${currentData.products.filter(p => 
  imageProductIds.includes(p.id.toLowerCase())).length}`);

// Show improvement potential
console.log(`\n🚀 Improvement Potential:`);
console.log(`   • Products that could get sizing data: ${tdsData.filter(p => 
  p.details?.sizing && 
  currentProductIds.has(p.code.toLowerCase()) && 
  !currentData.products.find(cp => cp.id.toLowerCase() === p.code.toLowerCase())?.sizes?.length
).length}`);

console.log(`   • Products that could get technical data: ${tdsData.filter(p => 
  p.details?.description && 
  currentProductIds.has(p.code.toLowerCase()) && 
  !currentData.products.find(cp => cp.id.toLowerCase() === p.code.toLowerCase())?.technicalData
).length}`);

console.log(`\n🎯 Ready for mass enhancement!`);





