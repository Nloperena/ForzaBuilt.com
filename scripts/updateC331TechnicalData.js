const fs = require('fs');
const path = require('path');

console.log('🔄 Updating C331 technical data...');

// Read the products data
const productsDataPath = path.join(__dirname, '../public/productsSimplified.json');
const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));

// Enhanced technical data for C331 based on the TDS table format
const c331TechnicalData = {
  appearance: "Amber",
  shelfLife: "12 months",
  solids: "22-28 %",
  solvent: "Non-Flammable",
  voc: "0 g/L",
  viscosity: "Sprayable",
  density: "8.0 lbs/gal",
  pH: "6.5-7.0",
  color: "Clear to Light Blue",
  odor: "Minimal",
  storageConditions: "Store at 50-80°F, keep container closed",
  temperatureRange: "Over 220°F (105°C) resistant",
  adhesiveType: "Contact Adhesive",
  foamType: "",
  peelStrength: "",
  shearStrength: ""
};

// Find and update C331
let updated = false;
productsData.products.forEach(product => {
  if (product.id === 'c331') {
    console.log('📦 Found C331, updating technical data...');
    
    // Update technical data with the detailed information
    product.technicalData = { ...product.technicalData, ...c331TechnicalData };
    
    // Also ensure it has the sizing data
    if (!product.sizes || product.sizes.length === 0) {
      product.sizes = [
        "1 Gallon",
        "5 Gallon Pail", 
        "52 Gallon Drum"
      ];
      console.log('📏 Added sizing data to C331');
    }
    
    updated = true;
    console.log('✅ Updated C331 technical data:');
    console.log('   - Appearance:', c331TechnicalData.appearance);
    console.log('   - Shelf Life:', c331TechnicalData.shelfLife);
    console.log('   - Solids:', c331TechnicalData.solids);
    console.log('   - Solvent:', c331TechnicalData.solvent);
    console.log('   - VOC:', c331TechnicalData.voc);
    console.log('   - Viscosity:', c331TechnicalData.viscosity);
    console.log('   - Temperature Range:', c331TechnicalData.temperatureRange);
  }
});

if (updated) {
  // Write updated data back
  fs.writeFileSync(productsDataPath, JSON.stringify(productsData, null, 2));
  console.log('\n🎉 Successfully updated C331 with enhanced technical data!');
  console.log(`📄 Updated file: ${productsDataPath}`);
} else {
  console.log('❌ C331 not found in products data');
}




