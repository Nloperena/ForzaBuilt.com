const fs = require('fs');
const path = require('path');

// Read the TDS backup data with sizing information
const tdsDataPath = path.join(__dirname, '../../TDS_backup/web_ready_product_data.json');
const productsDataPath = path.join(__dirname, '../public/productsSimplified.json');

console.log('🔄 Starting sizing data import...');

// Read source data
const tdsData = JSON.parse(fs.readFileSync(tdsDataPath, 'utf8'));
const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));

// Create a mapping from product codes to sizing data
const sizingMap = {};

tdsData.forEach(item => {
  if (item.details && item.details.sizing && item.code) {
    const productCode = item.code.toLowerCase();
    const sizingText = item.details.sizing;
    
    // Parse sizing text (bullet points separated by newlines)
    const sizes = sizingText
      .split('\n')
      .map(line => line.trim().replace(/^[•·\-]\s*/, ''))
      .filter(line => line.length > 0);
    
    if (sizes.length > 0) {
      sizingMap[productCode] = sizes;
      console.log(`📦 Found sizing for ${productCode}:`, sizes);
    }
  }
});

console.log(`\n✅ Found sizing data for ${Object.keys(sizingMap).length} products`);

// Update products with sizing data
let updatedCount = 0;
productsData.products.forEach(product => {
  const productCode = product.id.toLowerCase();
  if (sizingMap[productCode]) {
    product.sizes = sizingMap[productCode];
    updatedCount++;
    console.log(`🎯 Updated ${product.id} with sizes:`, product.sizes);
  }
});

// Write updated data back
fs.writeFileSync(productsDataPath, JSON.stringify(productsData, null, 2));

console.log(`\n🎉 Successfully updated ${updatedCount} products with sizing data!`);
console.log(`📄 Updated file: ${productsDataPath}`);

