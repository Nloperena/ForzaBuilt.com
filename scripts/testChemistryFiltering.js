#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const simplifiedPath = path.join(root, 'src', 'data', 'productsSimplified.json');

async function testChemistryFiltering() {
  console.log('🧪 TESTING CHEMISTRY FILTERING BY CATEGORY\n');
  
  try {
    // Load simplified data
    const simplified = JSON.parse(fs.readFileSync(simplifiedPath, 'utf8'));
    const products = simplified.products;
    
    // Test each category
    ['BOND', 'SEAL', 'TAPE'].forEach(category => {
      console.log(`\n📋 ${category} CATEGORY:`);
      
      // Get products for this category
      const categoryProducts = products.filter(p => p.category === category);
      console.log(`   Total products: ${categoryProducts.length}`);
      
      // Get unique chemistries (excluding Acrylic for non-tape categories)
      const chemistries = new Set();
      categoryProducts.forEach(p => {
        if (p.chemistry) {
          // Exclude Acrylic (incl. PSA) from BOND and SEAL categories
          if (category !== 'TAPE' && p.chemistry === 'Acrylic (incl. PSA)') {
            return; // Skip this chemistry
          }
          chemistries.add(p.chemistry);
        }
      });
      
      const chemistryList = Array.from(chemistries).sort();
      console.log(`   Available chemistries: ${chemistryList.length}`);
      chemistryList.forEach(chem => {
        const count = categoryProducts.filter(p => p.chemistry === chem).length;
        console.log(`     • ${chem}: ${count} products`);
      });
      
      // Check if Acrylic is present
      const hasAcrylic = chemistryList.includes('Acrylic (incl. PSA)');
      if (category === 'TAPE') {
        console.log(`   ✅ Acrylic chemistry: ${hasAcrylic ? 'PRESENT (correct)' : 'MISSING (incorrect)'}`);
      } else {
        console.log(`   ✅ Acrylic chemistry: ${hasAcrylic ? 'PRESENT (incorrect)' : 'ABSENT (correct)'}`);
      }
    });
    
    // Summary
    console.log('\n🎯 SUMMARY:');
    console.log('   • BOND/SEAL pages should NOT show Acrylic chemistry filter');
    console.log('   • TAPE pages should show Acrylic chemistry filter');
    console.log('   • This ensures proper category-specific filtering');
    
  } catch (error) {
    console.error('❌ Error testing chemistry filtering:', error.message);
    process.exit(1);
  }
}

testChemistryFiltering().catch(console.error); 