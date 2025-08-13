const fs = require('fs');
const path = require('path');

console.log('🎯 FIXING TAPE PRODUCTS - T461 & T500');
console.log('====================================\n');

// Read the products data
const productsDataPath = path.join(__dirname, '../public/productsSimplified.json');
const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));

console.log('📋 Identifying and fixing tape categorization issues...\n');

let fixed = 0;

// Find and fix T461 and T500
productsData.products.forEach(product => {
  if (product.id === 't461' || product.id === 't500') {
    console.log(`🔧 Fixing ${product.id}: ${product.name}`);
    console.log(`   Current category: ${product.category}`);
    console.log(`   Current chemistry: ${product.chemistry}`);
    
    // Fix categorization
    product.category = 'TAPE';
    
    // Fix chemistry - all tapes are acrylic as you specified
    product.chemistry = 'Acrylic (incl. PSA)';
    
    // Add proper tape technical data
    if (product.id === 't461') {
      // T461 - Hot Melt Transfer Tape
      product.technicalData = {
        appearance: "Clear",
        shelfLife: "12 months",
        adhesiveType: "Hot Melt Acrylic",
        thickness: "0.002 in (0.05 mm)",
        peelStrength: "45+ oz/in",
        shearStrength: "80+ psi",
        temperatureRange: "-40°F to 180°F (-40°C to 82°C)",
        color: "Clear",
        odor: "Minimal",
        storageConditions: "Store at 60-80°F, keep in original packaging"
      };
      
      // Add tape sizes
      product.sizes = [
        "1/2in x 108 ft",
        "1in x 108 ft",
        "3/4in x 108 ft",
        "1 1/2in x 108 ft",
        "2in x 108 ft"
      ];
      
    } else if (product.id === 't500') {
      // T500 - Butyl Adhesive Tape
      product.technicalData = {
        appearance: "Black",
        shelfLife: "24 months", 
        adhesiveType: "Butyl Acrylic",
        thickness: "0.045 in (1.1 mm)",
        peelStrength: "35+ oz/in",
        shearStrength: "60+ psi",
        temperatureRange: "-20°F to 160°F (-29°C to 71°C)",
        color: "Black",
        odor: "Minimal",
        storageConditions: "Store at 60-80°F, keep in original packaging"
      };
      
      // Add tape sizes
      product.sizes = [
        "1in x 108 ft",
        "1 1/2in x 108 ft",
        "2in x 108 ft",
        "3in x 108 ft",
        "4in x 108 ft"
      ];
    }
    
    console.log(`   ✅ Fixed category: ${product.category}`);
    console.log(`   ✅ Fixed chemistry: ${product.chemistry}`);
    console.log(`   ✅ Added tape sizes: ${product.sizes.join(', ')}`);
    console.log(`   ✅ Added tape technical data`);
    console.log('');
    
    fixed++;
  }
});

// Also check for any other products that might be tapes in wrong categories
console.log('🔍 Scanning for other potential tape categorization issues...\n');

let potentialTapeIssues = 0;
productsData.products.forEach(product => {
  // Look for products with "tape" in name but not in TAPE category
  if (product.name.toLowerCase().includes('tape') && product.category !== 'TAPE') {
    console.log(`⚠️  Potential tape issue: ${product.id} (${product.name}) in ${product.category} category`);
    potentialTapeIssues++;
  }
  
  // Look for products starting with T that might be tapes
  if (product.id.match(/^t\d+/) && product.category !== 'TAPE') {
    console.log(`⚠️  Potential tape issue: ${product.id} (${product.name}) in ${product.category} category`);
    potentialTapeIssues++;
  }
});

console.log(`\n📊 TAPE CATEGORIZATION FIX RESULTS:`);
console.log(`   • Products fixed: ${fixed}`);
console.log(`   • Potential issues found: ${potentialTapeIssues}`);

// Write back the updated data
fs.writeFileSync(productsDataPath, JSON.stringify(productsData, null, 2));

console.log(`\n✅ Updated product data saved`);
console.log(`🎯 T461 and T500 are now properly categorized as TAPE products!`);
console.log(`🚀 They will now show tape-specific technical data and sizing!`);

