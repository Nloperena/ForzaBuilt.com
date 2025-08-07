#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const simplifiedPath = path.join(root, 'src', 'data', 'productsSimplified.json');

async function getProductCounts() {
  console.log('📊 PRODUCT COUNT SUMMARY\n');
  
  try {
    // Load simplified data
    const simplified = JSON.parse(fs.readFileSync(simplifiedPath, 'utf8'));
    const products = simplified.products;
    
    console.log(`📈 TOTAL PRODUCTS: ${products.length}\n`);
    
    // Count by category
    console.log('🏷️ BY CATEGORY:');
    const categories = {};
    products.forEach(p => {
      const cat = p.category || 'UNKNOWN';
      categories[cat] = (categories[cat] || 0) + 1;
    });
    
    Object.entries(categories).forEach(([cat, count]) => {
      console.log(`   • ${cat}: ${count} products`);
    });
    
    // Count by chemistry
    console.log('\n🧪 BY CHEMISTRY:');
    const chemistries = {};
    products.forEach(p => {
      const chem = p.chemistry || 'UNKNOWN';
      chemistries[chem] = (chemistries[chem] || 0) + 1;
    });
    
    Object.entries(chemistries).forEach(([chem, count]) => {
      console.log(`   • ${chem}: ${count} products`);
    });
    
    // Cross-reference: Category + Chemistry
    console.log('\n📋 CATEGORY + CHEMISTRY BREAKDOWN:');
    ['BOND', 'SEAL', 'TAPE'].forEach(category => {
      const categoryProducts = products.filter(p => p.category === category);
      const chemistryBreakdown = {};
      
      categoryProducts.forEach(p => {
        const chem = p.chemistry || 'UNKNOWN';
        chemistryBreakdown[chem] = (chemistryBreakdown[chem] || 0) + 1;
      });
      
      console.log(`\n   ${category} (${categoryProducts.length} total):`);
      Object.entries(chemistryBreakdown).forEach(([chem, count]) => {
        console.log(`     • ${chem}: ${count} products`);
      });
    });
    
    // Summary
    console.log('\n🎯 SUMMARY:');
    console.log(`   • BOND: ${categories['BOND'] || 0} products`);
    console.log(`   • SEAL: ${categories['SEAL'] || 0} products`);
    console.log(`   • TAPE: ${categories['TAPE'] || 0} products`);
    console.log(`   • Total: ${products.length} products`);
    
  } catch (error) {
    console.error('❌ Error getting product counts:', error.message);
    process.exit(1);
  }
}

getProductCounts().catch(console.error); 