#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const productsPath = path.join(root, 'src', 'data', 'productsMerged.json');

async function fixIndustryFieldConsistency() {
  console.log('🔧 FIXING INDUSTRY FIELD CONSISTENCY\n');
  
  try {
    // Load products
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    console.log(`📊 Loaded ${products.length} products`);
    
    let fixedCount = 0;
    let skippedCount = 0;
    
    // Fix industry field for each product
    products.forEach(product => {
      if (product.industry) {
        if (typeof product.industry === 'string') {
          // Convert string to array
          product.industry = [product.industry];
          fixedCount++;
          console.log(`✅ Fixed ${product.id}: "${product.industry[0]}" -> ["${product.industry[0]}"]`);
        } else if (Array.isArray(product.industry)) {
          // Already correct format
          skippedCount++;
        } else {
          // Invalid type - convert to array with default
          product.industry = ['industrial'];
          fixedCount++;
          console.log(`⚠️  Fixed ${product.id}: invalid type -> ["industrial"]`);
        }
      } else {
        // Missing industry - add default
        product.industry = ['industrial'];
        fixedCount++;
        console.log(`➕ Added ${product.id}: missing -> ["industrial"]`);
      }
    });
    
    // Save updated products
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
    
    console.log(`\n📈 SUMMARY:`);
    console.log(`   • Total products: ${products.length}`);
    console.log(`   • Fixed: ${fixedCount}`);
    console.log(`   • Already correct: ${skippedCount}`);
    console.log(`   • Updated file: ${productsPath}`);
    
    // Verify fix
    const verification = products.filter(p => !Array.isArray(p.industry));
    if (verification.length > 0) {
      console.log(`❌ ERROR: ${verification.length} products still have inconsistent industry field`);
      verification.forEach(p => console.log(`   - ${p.id}: ${typeof p.industry}`));
      process.exit(1);
    } else {
      console.log(`✅ SUCCESS: All products now have consistent industry array format`);
    }
    
  } catch (error) {
    console.error('❌ Error fixing industry field consistency:', error.message);
    process.exit(1);
  }
}

fixIndustryFieldConsistency().catch(console.error); 