#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const simplifiedPath = path.join(root, 'src', 'data', 'productsSimplified.json');

async function verifyProductsInBrowser() {
  console.log('🌐 VERIFYING PRODUCTS FOR BROWSER LOADING\n');
  
  try {
    // Load simplified data
    const simplified = JSON.parse(fs.readFileSync(simplifiedPath, 'utf8'));
    const products = simplified.products;
    
    console.log(`📊 Total products available: ${products.length}`);
    
    // Check if products have all required fields for display
    const displayFields = ['id', 'name', 'description', 'category', 'industry', 'chemistry', 'imageUrl'];
    const missingDisplayFields = products.filter(p => {
      return displayFields.some(field => !p[field]);
    });
    
    console.log(`\n❌ Products missing display fields: ${missingDisplayFields.length}`);
    if (missingDisplayFields.length > 0) {
      missingDisplayFields.slice(0, 5).forEach(p => {
        const missing = displayFields.filter(field => !p[field]);
        console.log(`   • ${p.id}: missing ${missing.join(', ')}`);
      });
    }
    
    // Check for products with empty or invalid image URLs
    const invalidImages = products.filter(p => !p.imageUrl || p.imageUrl === '');
    console.log(`\n🖼️ Products with missing images: ${invalidImages.length}`);
    
    // Check for products with empty descriptions
    const emptyDescriptions = products.filter(p => !p.description || p.description.trim() === '');
    console.log(`\n📝 Products with empty descriptions: ${emptyDescriptions.length}`);
    
    // Sample products for each category to verify structure
    console.log('\n📋 SAMPLE PRODUCTS FOR BROWSER DISPLAY:');
    ['BOND', 'SEAL', 'TAPE'].forEach(category => {
      const sample = products.filter(p => p.category === category).slice(0, 2);
      console.log(`\n   ${category}:`);
      sample.forEach(p => {
        console.log(`     • ${p.id}: ${p.name}`);
        console.log(`       Image: ${p.imageUrl ? '✅' : '❌'}`);
        console.log(`       Description: ${p.description ? '✅' : '❌'}`);
        console.log(`       Industry: ${JSON.stringify(p.industry)}`);
        console.log(`       Chemistry: ${p.chemistry}`);
      });
    });
    
    // Check if the data structure matches what the frontend expects
    console.log('\n🔍 DATA STRUCTURE VALIDATION:');
    
    const hasRequiredFields = products.every(p => 
      p.id && p.name && p.category && p.industry && Array.isArray(p.industry)
    );
    console.log(`   • All products have required fields: ${hasRequiredFields ? '✅' : '❌'}`);
    
    const hasValidCategories = products.every(p => 
      ['BOND', 'SEAL', 'TAPE'].includes(p.category)
    );
    console.log(`   • All products have valid categories: ${hasValidCategories ? '✅' : '❌'}`);
    
    const hasValidIndustries = products.every(p => 
      p.industry && Array.isArray(p.industry) && p.industry.length > 0
    );
    console.log(`   • All products have valid industry arrays: ${hasValidIndustries ? '✅' : '❌'}`);
    
    console.log('\n🎯 BROWSER READY STATUS:');
    if (hasRequiredFields && hasValidCategories && hasValidIndustries) {
      console.log('   ✅ Products should load correctly in browser');
      console.log('   ✅ Data structure matches frontend expectations');
      console.log('   ✅ Filtering logic should work properly');
    } else {
      console.log('   ❌ Some issues detected that may prevent proper loading');
    }
    
  } catch (error) {
    console.error('❌ Error verifying products:', error.message);
    process.exit(1);
  }
}

verifyProductsInBrowser().catch(console.error); 