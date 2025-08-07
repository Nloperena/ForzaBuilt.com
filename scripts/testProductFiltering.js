#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const simplifiedPath = path.join(root, 'src', 'data', 'productsSimplified.json');

async function testProductFiltering() {
  console.log('🧪 TESTING PRODUCT FILTERING LOGIC\n');
  
  try {
    // Load simplified data
    const simplified = JSON.parse(fs.readFileSync(simplifiedPath, 'utf8'));
    const products = simplified.products;
    
    // Test byProductLine function logic
    const byProductLine = (line) => {
      return products.filter(p => p.category?.toLowerCase() === line.toLowerCase());
    };
    
    // Test each category
    ['bond', 'seal', 'tape'].forEach(category => {
      const filtered = byProductLine(category);
      console.log(`📋 ${category.toUpperCase()} category: ${filtered.length} products`);
      
      // Show first 3 products
      filtered.slice(0, 3).forEach(p => {
        console.log(`   • ${p.id}: ${p.name}`);
        console.log(`     Category: ${p.category}, ProductType: ${p.productType}`);
        console.log(`     Industry: ${JSON.stringify(p.industry)}`);
      });
      
      if (filtered.length === 0) {
        console.log(`   ❌ NO PRODUCTS FOUND for ${category.toUpperCase()}`);
      }
      
      console.log('');
    });
    
    // Test industry filtering
    console.log('🏭 TESTING INDUSTRY FILTERING:');
    const testIndustries = ['composites', 'marine', 'construction'];
    
    testIndustries.forEach(industry => {
      const industryProducts = products.filter(p => 
        p.industry && Array.isArray(p.industry) && 
        p.industry.some(ind => ind.toLowerCase() === industry.toLowerCase())
      );
      
      console.log(`   ${industry}: ${industryProducts.length} products`);
    });
    
    // Test chemistry filtering
    console.log('\n🧪 TESTING CHEMISTRY FILTERING:');
    const chemistries = ['Water Base', 'Solvent Base', 'Epoxy', 'MS', 'Hot Melt'];
    
    chemistries.forEach(chemistry => {
      const chemistryProducts = products.filter(p => 
        p.chemistry && p.chemistry.toLowerCase() === chemistry.toLowerCase()
      );
      
      console.log(`   ${chemistry}: ${chemistryProducts.length} products`);
    });
    
  } catch (error) {
    console.error('❌ Error testing product filtering:', error.message);
    process.exit(1);
  }
}

testProductFiltering().catch(console.error); 