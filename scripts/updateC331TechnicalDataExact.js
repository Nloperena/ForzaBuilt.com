const fs = require('fs');
const path = require('path');

console.log('🔄 Updating C331 technical data with exact TDS values...');

// Read the products data
const productsDataPath = path.join(__dirname, '../public/productsSimplified.json');
const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));

// Exact technical data for C331 from TDS table
const c331TechnicalData = {
  appearance: "Amber",
  shelfLife: "12 months",
  solids: "22-28%",
  solvent: "Non-Flammable",
  voc: "0 g/L",
  viscosity: "", // blank as specified
  // Keep any existing technical data that wasn't specified
  density: "8.0 lbs/gal",
  pH: "6.5-7.0",
  color: "Clear to Light Blue",
  odor: "Minimal",
  storageConditions: "Store at 50-80°F, keep container closed",
  temperatureRange: "Over 220°F (105°C) resistant",
  adhesiveType: "Contact Adhesive"
};

// Find and update C331
let updated = false;
productsData.products.forEach(product => {
  if (product.id === 'c331') {
    console.log(`📝 Found C331, updating technical data...`);
    
    // Initialize specifications if it doesn't exist
    if (!product.specifications) {
      product.specifications = {};
    }
    
    // Update the technical specifications
    product.specifications.technical = c331TechnicalData;
    
    console.log(`✅ Updated C331 technical data:`, c331TechnicalData);
    updated = true;
  }
});

if (updated) {
  // Write back to file
  fs.writeFileSync(productsDataPath, JSON.stringify(productsData, null, 2));
  console.log('✅ C331 technical data updated successfully!');
  console.log('📍 Updated fields:');
  Object.entries(c331TechnicalData).forEach(([key, value]) => {
    console.log(`   • ${key}: ${value || '(blank)'}`);
  });
} else {
  console.log('❌ C331 product not found');
}

