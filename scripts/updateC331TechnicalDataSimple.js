const fs = require('fs');
const path = require('path');

console.log('🔄 Updating C331 technical data with ONLY the 6 TDS table fields...');

// Read the products data
const productsDataPath = path.join(__dirname, '../public/productsSimplified.json');
const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));

// Exact technical data for C331 from TDS table - ONLY the 6 fields you specified
const c331TechnicalData = {
  appearance: "Amber",
  shelfLife: "12 months",
  solids: "22-28%",
  solvent: "Non-Flammable",
  voc: "0 g/L",
  viscosity: "" // blank as specified
};

// Find and update C331
let updated = false;
productsData.products.forEach(product => {
  if (product.id === 'c331') {
    console.log(`📝 Found C331, replacing technical data with exact TDS fields...`);
    
    // Initialize specifications if it doesn't exist
    if (!product.specifications) {
      product.specifications = {};
    }
    
    // Replace the technical specifications with ONLY the 6 TDS fields
    product.specifications.technical = c331TechnicalData;
    
    console.log(`✅ Updated C331 technical data:`, c331TechnicalData);
    updated = true;
  }
});

if (updated) {
  // Write back to file
  fs.writeFileSync(productsDataPath, JSON.stringify(productsData, null, 2));
  console.log('✅ C331 technical data updated successfully with ONLY TDS table fields!');
  console.log('📍 Final fields:');
  Object.entries(c331TechnicalData).forEach(([key, value]) => {
    console.log(`   • ${key}: ${value || '(blank)'}`);
  });
} else {
  console.log('❌ C331 product not found');
}





