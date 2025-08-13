const fs = require('fs');
const path = require('path');

console.log('📦 FINAL SIZING DATA IMPORT');
console.log('===========================\n');

// Read source data
const tdsDataPath = path.join(__dirname, '../../TDS_backup/web_ready_product_data.json');
const productsDataPath = path.join(__dirname, '../public/productsSimplified.json');

const tdsData = JSON.parse(fs.readFileSync(tdsDataPath, 'utf8'));
const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));

// Create comprehensive sizing mapping
const sizingMap = {};

tdsData.forEach(item => {
  if (item.details && item.details.sizing && item.code) {
    const productCode = item.code.toLowerCase();
    const sizingText = item.details.sizing;
    
    // Parse sizing text more carefully
    let sizes = [];
    
    if (typeof sizingText === 'string') {
      sizes = sizingText
        .split(/\n|;|,/)
        .map(line => line.trim())
        .map(line => line.replace(/^[•\-\*\s]+/, '').trim())
        .filter(line => line.length > 0)
        .filter(line => !line.toLowerCase().includes('size') || line.toLowerCase().includes('custom')); // Remove generic "size" headers but keep "custom sizes"
    }
    
    if (sizes.length > 0) {
      sizingMap[productCode] = sizes;
    }
  }
});

console.log(`📊 Sizing data available for ${Object.keys(sizingMap).length} products from TDS\n`);

let stats = {
  processed: 0,
  added: 0,
  alreadyHad: 0,
  noData: 0
};

// Add sizing data to products that don't have it
productsData.products.forEach(product => {
  const productCode = product.id.toLowerCase();
  stats.processed++;
  
  if (sizingMap[productCode]) {
    if (!product.sizes || product.sizes.length === 0) {
      product.sizes = sizingMap[productCode];
      stats.added++;
      console.log(`✅ ${product.id}: Added sizing - ${sizingMap[productCode].join(', ')}`);
    } else {
      stats.alreadyHad++;
    }
  } else {
    stats.noData++;
  }
});

console.log(`\n📊 FINAL SIZING IMPORT RESULTS:`);
console.log(`   • Products processed: ${stats.processed}`);
console.log(`   • Sizing data added: ${stats.added}`);
console.log(`   • Already had sizing: ${stats.alreadyHad}`);
console.log(`   • No TDS sizing data: ${stats.noData}`);
console.log(`   • Total with sizing: ${stats.added + stats.alreadyHad} (${((stats.added + stats.alreadyHad) / stats.processed * 100).toFixed(1)}%)`);

// Write back updated data
fs.writeFileSync(productsDataPath, JSON.stringify(productsData, null, 2));
console.log(`\n✅ Updated product data saved`);

console.log(`\n🎯 FINAL ENHANCEMENT COMPLETE!`);
console.log(`📈 Your product catalog is now significantly enhanced!`);

