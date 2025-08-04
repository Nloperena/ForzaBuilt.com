#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '..', 'src', 'data', 'productsMerged.json');

try {
  console.log('🔍 Checking for duplicate products...\n');
  
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  console.log(`📊 Total products before deduplication: ${products.length}`);
  
  // Find duplicates by ID
  const seenIds = new Set();
  const duplicates = [];
  const uniqueProducts = [];
  
  products.forEach(product => {
    const productId = product.id?.toLowerCase();
    
    if (!productId) {
      console.log(`⚠️  Product without ID found:`, product);
      return;
    }
    
    if (seenIds.has(productId)) {
      duplicates.push(product);
      console.log(`❌ Duplicate found: ${product.id} - ${product.title}`);
    } else {
      seenIds.add(productId);
      uniqueProducts.push(product);
    }
  });
  
  console.log(`\n📈 Summary:`);
  console.log(`   Total products: ${products.length}`);
  console.log(`   Unique products: ${uniqueProducts.length}`);
  console.log(`   Duplicates found: ${duplicates.length}`);
  
  if (duplicates.length > 0) {
    console.log(`\n🔧 Removing duplicates...`);
    
    // Write back the unique products
    fs.writeFileSync(productsPath, JSON.stringify(uniqueProducts, null, 2));
    
    console.log(`✅ Updated ${productsPath} with ${uniqueProducts.length} unique products`);
    
    // Show specific duplicates that were removed
    console.log(`\n🗑️  Removed duplicates:`);
    duplicates.forEach(dup => {
      console.log(`   - ${dup.id}: ${dup.title}`);
    });
  } else {
    console.log(`✅ No duplicates found!`);
  }
  
} catch (error) {
  console.error('❌ Error:', error.message);
} 