#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '..', 'src', 'data', 'productsMerged.json');

try {
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  
  console.log('🔍 Checking tape products...\n');
  
  // Find all products with chemistry "Tape"
  const tapeProducts = products.filter(p => p.chemistry === 'Tape');
  
  console.log(`📊 Found ${tapeProducts.length} tape products:\n`);
  
  tapeProducts.forEach((product, index) => {
    console.log(`${index + 1}. ${product.id} - ${product.title}`);
    console.log(`   Chemistry: ${product.chemistry}`);
    console.log(`   Confidence: ${product.chemistryConfidence}`);
    console.log(`   Product Line: ${product.productLine}`);
    console.log(`   Industry: ${product.industry}`);
    console.log('');
  });
  
  // Also check for any products that might be filtered out
  const allProducts = products.filter(p => p.chemistry === 'Tape');
  const filteredProducts = products.filter(p => 
    p.chemistry === 'Tape' && 
    p.productLine?.toLowerCase() !== 'cleaner'
  );
  
  console.log(`📈 Summary:`);
  console.log(`   Total products with chemistry "Tape": ${allProducts.length}`);
  console.log(`   Products after cleaner filter: ${filteredProducts.length}`);
  
} catch (error) {
  console.error('❌ Error:', error.message);
} 