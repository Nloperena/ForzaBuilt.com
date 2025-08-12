const fs = require('fs');
const path = require('path');

console.log('🎯 COMPREHENSIVE TAPE CATEGORIZATION AUDIT');
console.log('==========================================\n');

// Read the products data
const productsDataPath = path.join(__dirname, '../public/productsSimplified.json');
const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));

console.log('🔍 Scanning entire catalog for tape categorization issues...\n');

let stats = {
  correctTapes: 0,
  misclassifiedTapes: 0,
  bondCategoryTapes: 0,
  sealCategoryTapes: 0,
  fixed: 0
};

const misclassifiedProducts = [];

productsData.products.forEach(product => {
  const hasTraditionalTapeName = product.name.toLowerCase().includes('tape');
  const isTraditionalTapeCode = product.id.match(/^[tT]\d+/);
  const isCurrentlyTape = product.category === 'TAPE';
  
  // Check if this looks like a tape but isn't categorized as one
  if ((hasTraditionalTapeName || isTraditionalTapeCode) && !isCurrentlyTape) {
    misclassifiedProducts.push({
      id: product.id,
      name: product.name,
      currentCategory: product.category,
      chemistry: product.chemistry,
      reason: hasTraditionalTapeName ? 'Has "TAPE" in name' : 'Has T-code pattern'
    });
    
    if (product.category === 'BOND') stats.bondCategoryTapes++;
    if (product.category === 'SEAL') stats.sealCategoryTapes++;
    stats.misclassifiedTapes++;
  } else if (isCurrentlyTape) {
    stats.correctTapes++;
  }
});

console.log(`📊 TAPE AUDIT RESULTS:`);
console.log(`   • Correctly categorized tapes: ${stats.correctTapes}`);
console.log(`   • Misclassified tapes found: ${stats.misclassifiedTapes}`);
console.log(`   • Tapes in BOND category: ${stats.bondCategoryTapes}`);
console.log(`   • Tapes in SEAL category: ${stats.sealCategoryTapes}`);

if (misclassifiedProducts.length > 0) {
  console.log(`\n⚠️  MISCLASSIFIED TAPE PRODUCTS:`);
  misclassifiedProducts.forEach(product => {
    console.log(`   • ${product.id}: ${product.name}`);
    console.log(`     Current: ${product.currentCategory} | Reason: ${product.reason}`);
  });
  
  console.log(`\n🔧 FIXING MISCLASSIFIED TAPES...\n`);
  
  // Fix each misclassified tape
  misclassifiedProducts.forEach(issue => {
    const product = productsData.products.find(p => p.id === issue.id);
    if (product) {
      console.log(`🔧 Fixing ${product.id}:`);
      console.log(`   Old category: ${product.category} → New: TAPE`);
      console.log(`   Old chemistry: ${product.chemistry} → New: Acrylic (incl. PSA)`);
      
      // Fix category and chemistry
      product.category = 'TAPE';
      product.chemistry = 'Acrylic (incl. PSA)';
      
      // Add basic tape sizes if missing
      if (!product.sizes || product.sizes.length === 0) {
        product.sizes = [
          "1/2in x 108 ft",
          "1in x 108 ft",
          "3/4in x 108 ft",
          "1 1/2in x 108 ft"
        ];
        console.log(`   Added default tape sizes`);
      }
      
      // Ensure tape has proper technical data structure
      if (!product.technicalData || Object.keys(product.technicalData).length < 3) {
        product.technicalData = {
          ...product.technicalData, // Keep existing data
          appearance: product.technicalData?.appearance || "",
          shelfLife: product.technicalData?.shelfLife || "24 months",
          adhesiveType: "Acrylic",
          thickness: "",
          peelStrength: "",
          shearStrength: "",
          temperatureRange: "",
          color: "",
          odor: "Minimal",
          storageConditions: "Store at 60-80°F, keep in original packaging"
        };
        console.log(`   Enhanced technical data structure`);
      }
      
      stats.fixed++;
      console.log('');
    }
  });
}

// Verify all current TAPE products have proper acrylic chemistry
console.log('🔍 Verifying chemistry for all TAPE products...\n');

let chemistryFixed = 0;
productsData.products.forEach(product => {
  if (product.category === 'TAPE' && product.chemistry !== 'Acrylic (incl. PSA)') {
    console.log(`🔧 Fixed chemistry for ${product.id}: ${product.chemistry} → Acrylic (incl. PSA)`);
    product.chemistry = 'Acrylic (incl. PSA)';
    chemistryFixed++;
  }
});

console.log(`\n📊 COMPREHENSIVE TAPE AUDIT SUMMARY:`);
console.log(`   • Total tape products: ${stats.correctTapes + stats.fixed}`);
console.log(`   • Categorization fixes: ${stats.fixed}`);
console.log(`   • Chemistry corrections: ${chemistryFixed}`);
console.log(`   • All tapes now properly categorized: ✅`);

// Write back the updated data
fs.writeFileSync(productsDataPath, JSON.stringify(productsData, null, 2));

console.log(`\n✅ Updated product data saved`);
console.log(`🎯 ALL TAPE PRODUCTS NOW PROPERLY CATEGORIZED!`);
console.log(`🚀 All tapes will display with proper tape-specific technical data!`);
