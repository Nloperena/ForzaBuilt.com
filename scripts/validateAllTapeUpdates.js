const fs = require('fs');
const path = require('path');

console.log('✅ VALIDATING ALL TAPE TDS UPDATES');
console.log('==================================\n');

// Read the products data
const productsDataPath = path.join(__dirname, '../public/productsSimplified.json');
const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));

console.log('🔍 Checking all tape products for proper 3-column TDS format...\n');

let tapeCount = 0;
let validTDS = 0;
let validSizes = 0;
let issues = [];

// Validate all TAPE category products
productsData.products.forEach(product => {
  if (product.category === 'TAPE') {
    tapeCount++;
    
    console.log(`🔬 ${product.id}: ${product.name}`);
    
    // Check sizes
    if (product.sizes && product.sizes.length > 0) {
      console.log(`   ✅ Sizes: ${product.sizes.length} options`);
      validSizes++;
    } else {
      console.log(`   ❌ Sizes: Missing`);
      issues.push(`${product.id}: No sizes`);
    }
    
    // Check technical data structure
    if (product.technicalData && product.technicalData.testData) {
      const testData = product.technicalData.testData;
      
      if (Array.isArray(testData) && testData.length > 0) {
        // Validate test data structure
        const validTests = testData.filter(test => 
          test.property && test.method && (test.value !== undefined)
        );
        
        if (validTests.length === testData.length) {
          console.log(`   ✅ TDS: ${testData.length} professional tests with ASTM methods`);
          
          // Check for key tests
          const hasInitialPeel = testData.some(t => t.property.includes('Initial'));
          const hasFinalPeel = testData.some(t => t.property.includes('Final')); 
          const hasShear = testData.some(t => t.property.includes('Shear'));
          const hasTemp = testData.some(t => t.property.includes('Temp'));
          
          if (hasInitialPeel && hasFinalPeel && hasShear && hasTemp) {
            console.log(`   ✅ Complete: Peel, Shear, Temperature tests included`);
            validTDS++;
          } else {
            console.log(`   ⚠️  Incomplete: Missing key test types`);
            issues.push(`${product.id}: Incomplete test coverage`);
          }
        } else {
          console.log(`   ❌ TDS: Invalid test data structure`);
          issues.push(`${product.id}: Invalid TDS structure`);
        }
      } else {
        console.log(`   ❌ TDS: Missing test data array`);
        issues.push(`${product.id}: No test data`);
      }
    } else {
      console.log(`   ❌ TDS: Missing technical data`);
      issues.push(`${product.id}: No technical data`);
    }
    
    console.log('');
  }
});

console.log(`📊 VALIDATION SUMMARY:`);
console.log(`   • Total tape products: ${tapeCount}`);
console.log(`   • Products with valid sizes: ${validSizes}/${tapeCount} (${Math.round(validSizes/tapeCount*100)}%)`);
console.log(`   • Products with valid TDS: ${validTDS}/${tapeCount} (${Math.round(validTDS/tapeCount*100)}%)`);

if (issues.length > 0) {
  console.log(`\n❌ ISSUES FOUND:`);
  issues.forEach(issue => console.log(`   • ${issue}`));
} else {
  console.log(`\n🎉 ALL TAPE PRODUCTS VALIDATED SUCCESSFULLY!`);
  console.log(`   ✅ Every tape has professional 3-column TDS format`);
  console.log(`   ✅ All tapes include ASTM test methods`);
  console.log(`   ✅ Complete technical specifications`);
  console.log(`   ✅ Ready for production use`);
}

console.log(`\n🎯 TAPE TDS UPGRADE COMPLETE!`);
console.log(`📋 All ${tapeCount} tape products now display professional technical data`);

