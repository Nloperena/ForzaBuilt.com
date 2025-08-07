#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const simplifiedPath = path.join(root, 'src', 'data', 'productsSimplified.json');

async function fixTapeChemistries() {
  console.log('🔧 FIXING TAPE PRODUCT CHEMISTRIES\n');
  
  try {
    // Load simplified data
    const simplified = JSON.parse(fs.readFileSync(simplifiedPath, 'utf8'));
    const products = simplified.products;
    
    console.log(`📊 Total products: ${products.length}`);
    
    // Find all tape products
    const tapeProducts = products.filter(p => p.category === 'TAPE');
    console.log(`📋 Found ${tapeProducts.length} tape products`);
    
    let fixedCount = 0;
    
    // Fix chemistry for each tape product
    tapeProducts.forEach(product => {
      const oldChemistry = product.chemistry;
      product.chemistry = 'Acrylic (incl. PSA)';
      fixedCount++;
      
      console.log(`   • ${product.id}: ${oldChemistry} → Acrylic (incl. PSA)`);
    });
    
    // Update metadata
    simplified.metadata.tapeChemistryFixedAt = new Date().toISOString();
    simplified.metadata.changes = {
      ...simplified.metadata.changes,
      fixedTapeChemistries: true
    };
    
    // Save updated data
    fs.writeFileSync(simplifiedPath, JSON.stringify(simplified, null, 2));
    
    console.log(`\n✅ FIXED: ${fixedCount} tape products updated to "Acrylic (incl. PSA)"`);
    console.log(`📁 Saved to: ${simplifiedPath}`);
    
    // Verify the fix
    console.log('\n🔍 VERIFICATION:');
    const updatedTapeProducts = products.filter(p => p.category === 'TAPE');
    const acrylicTapes = updatedTapeProducts.filter(p => p.chemistry === 'Acrylic (incl. PSA)');
    const nonAcrylicTapes = updatedTapeProducts.filter(p => p.chemistry !== 'Acrylic (incl. PSA)');
    
    console.log(`   • Total tape products: ${updatedTapeProducts.length}`);
    console.log(`   • With Acrylic chemistry: ${acrylicTapes.length}`);
    console.log(`   • With other chemistry: ${nonAcrylicTapes.length}`);
    
    if (nonAcrylicTapes.length > 0) {
      console.log('\n❌ WARNING: Some tape products still have wrong chemistry:');
      nonAcrylicTapes.forEach(p => {
        console.log(`   • ${p.id}: ${p.chemistry}`);
      });
    } else {
      console.log('\n✅ SUCCESS: All tape products now have correct Acrylic chemistry!');
    }
    
    // Show sample tape products
    console.log('\n📋 SAMPLE TAPE PRODUCTS:');
    updatedTapeProducts.slice(0, 5).forEach(p => {
      console.log(`   • ${p.id}: ${p.name}`);
      console.log(`     Chemistry: ${p.chemistry}`);
      console.log(`     Industry: ${JSON.stringify(p.industry)}`);
    });
    
  } catch (error) {
    console.error('❌ Error fixing tape chemistries:', error.message);
    process.exit(1);
  }
}

fixTapeChemistries().catch(console.error); 