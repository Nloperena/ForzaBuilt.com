#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const simplifiedPath = path.join(root, 'src', 'data', 'productsSimplified.json');

async function debugProductsLoading() {
  console.log('🔍 DEBUGGING PRODUCTS LOADING\n');
  
  try {
    // Load simplified data
    const simplified = JSON.parse(fs.readFileSync(simplifiedPath, 'utf8'));
    const products = simplified.products;
    
    console.log(`📊 Total products in simplified data: ${products.length}`);
    
    // Check categories
    const categories = {};
    products.forEach(p => {
      const cat = p.category || 'UNKNOWN';
      categories[cat] = (categories[cat] || 0) + 1;
    });
    
    console.log('\n📋 CATEGORY BREAKDOWN:');
    Object.entries(categories).forEach(([cat, count]) => {
      console.log(`   • ${cat}: ${count} products`);
    });
    
    // Check product types
    const productTypes = {};
    products.forEach(p => {
      const type = p.productType || 'UNKNOWN';
      productTypes[type] = (productTypes[type] || 0) + 1;
    });
    
    console.log('\n📋 PRODUCT TYPE BREAKDOWN:');
    Object.entries(productTypes).forEach(([type, count]) => {
      console.log(`   • ${type}: ${count} products`);
    });
    
    // Check industries
    const industries = {};
    products.forEach(p => {
      if (p.industry && Array.isArray(p.industry)) {
        p.industry.forEach(ind => {
          industries[ind] = (industries[ind] || 0) + 1;
        });
      }
    });
    
    console.log('\n📋 INDUSTRY BREAKDOWN:');
    Object.entries(industries).forEach(([ind, count]) => {
      console.log(`   • ${ind}: ${count} products`);
    });
    
    // Test filtering logic
    console.log('\n🧪 TESTING FILTERING LOGIC:');
    
    // Test byProductLine function
    const bondProducts = products.filter(p => p.category?.toLowerCase() === 'bond');
    const sealProducts = products.filter(p => p.category?.toLowerCase() === 'seal');
    const tapeProducts = products.filter(p => p.category?.toLowerCase() === 'tape');
    
    console.log(`   • BOND products: ${bondProducts.length}`);
    console.log(`   • SEAL products: ${sealProducts.length}`);
    console.log(`   • TAPE products: ${tapeProducts.length}`);
    
    // Check for products with missing required fields
    const missingFields = products.filter(p => 
      !p.id || !p.name || !p.category || !p.industry || !p.chemistry
    );
    
    console.log(`\n❌ Products with missing required fields: ${missingFields.length}`);
    if (missingFields.length > 0) {
      missingFields.slice(0, 5).forEach(p => {
        console.log(`   • ${p.id}: missing ${Object.keys(p).filter(k => !p[k]).join(', ')}`);
      });
    }
    
    // Check for products with invalid industry structure
    const invalidIndustry = products.filter(p => 
      !p.industry || !Array.isArray(p.industry)
    );
    
    console.log(`\n❌ Products with invalid industry structure: ${invalidIndustry.length}`);
    if (invalidIndustry.length > 0) {
      invalidIndustry.slice(0, 5).forEach(p => {
        console.log(`   • ${p.id}: industry = ${typeof p.industry} (${JSON.stringify(p.industry)})`);
      });
    }
    
    // Sample products for each category
    console.log('\n📋 SAMPLE PRODUCTS BY CATEGORY:');
    ['BOND', 'SEAL', 'TAPE'].forEach(cat => {
      const sample = products.filter(p => p.category === cat).slice(0, 3);
      console.log(`\n   ${cat}:`);
      sample.forEach(p => {
        console.log(`     • ${p.id}: ${p.name}`);
        console.log(`       Industry: ${JSON.stringify(p.industry)}`);
        console.log(`       Chemistry: ${p.chemistry}`);
      });
    });
    
  } catch (error) {
    console.error('❌ Error debugging products:', error.message);
    process.exit(1);
  }
}

debugProductsLoading().catch(console.error); 