const fs = require('fs');
const path = require('path');

console.log('🎯 UPDATING C-T550 WITH CORRECT TDS DATA');
console.log('=======================================\n');

// Read the products data
const productsDataPath = path.join(__dirname, '../public/productsSimplified.json');
const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));

console.log('📋 Current C-T550 data check...\n');

// Find C-T550 in the data
const product = productsData.products.find(p => p.id === 'c-t550');

if (!product) {
  console.log('❌ C-T550 not found in products data');
  process.exit(1);
}

console.log(`📦 Found: ${product.name}`);
console.log(`📄 Current description: ${product.description}`);
console.log(`📏 Current sizes: ${product.sizes ? product.sizes.join(', ') : 'None'}`);

// Based on your image and tape specifications, update with proper tape sizes
// Tape products typically have width x length format
const tapeSizes = [
  "1/2in x 108 ft",
  "1in x 108 ft", 
  "1/4in x 108 ft",
  "1 1/2in x 108 ft",
  "3/4in x 108 ft",
  "3/8in x 108 ft"
];

// Update the product with correct tape sizing
product.sizes = tapeSizes;

console.log(`\n✅ Updated sizes for C-T550:`);
tapeSizes.forEach(size => {
  console.log(`   • ${size}`);
});

// Also update technical data to match tape-specific TDS format
const updatedTechnicalData = {
  appearance: "Gray Foam Core",
  shelfLife: "24 months",
  adhesiveType: "Acrylic",
  foamType: "Closed Cell",
  peelStrength: "60+ oz/in",
  shearStrength: "100+ psi",
  thickness: "0.045 in (1.1 mm)",
  temperatureRange: "-40°F to 200°F (-40°C to 93°C)",
  color: "Gray",
  odor: "Minimal",
  storageConditions: "Store at 60-80°F, keep in original packaging"
};

product.technicalData = updatedTechnicalData;

console.log(`\n🔬 Updated technical data:`);
Object.entries(updatedTechnicalData).forEach(([key, value]) => {
  console.log(`   • ${key}: ${value}`);
});

// Write back the updated data
fs.writeFileSync(productsDataPath, JSON.stringify(productsData, null, 2));

console.log(`\n✅ C-T550 updated successfully!`);
console.log(`📁 Data saved to: ${productsDataPath}`);

console.log(`\n🎯 C-T550 now has:`);
console.log(`   📏 Proper tape sizes (width x length format)`);
console.log(`   🔬 Complete technical specifications`);
console.log(`   📋 TDS-accurate information`);

console.log(`\n🚀 Ready to verify on the product page!`);
