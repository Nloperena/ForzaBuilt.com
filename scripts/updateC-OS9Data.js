#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const productsPath = path.join(root, 'src', 'data', 'productsSimplified.json');
const backupDir = path.join(root, 'src', 'data', 'backup');

// Ensure backup directory exists
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Create backup of original file
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupPath = path.join(backupDir, `productsSimplified-${timestamp}.json`);
fs.copyFileSync(productsPath, backupPath);
console.log(`💾 Created backup at: ${backupPath}`);

// Read the products data
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Update the C-OS9 product with missing data
let updated = false;
productsData.products = productsData.products.map(product => {
  if (product.id === 'c-os9') {
    updated = true;
    return {
      ...product,
      applications: "ForzaBOND™ C-OS9 is designed for universal sealing applications in the construction industry, including:\n- Crack filling on concrete\n- Sealing around windows and door openings\n- Sealing in gutter applications\n- Roof penetrations",
      sizes: [
        "20oz Sausage",
        "10oz Sausage",
        "28oz Cartridge",
        "10.1oz Cartridge",
        "5 Gallon Pail",
        "52 Gallon Drum"
      ],
      colors: [
        "Gray",
        "White",
        "Black"
      ],
      cleanup: [
        "Water", 
        "Alcohol"
      ],
      howToUse: [
        "Generally applied by extrusion, and trowel.",
        "Surfaces should be clean and free of dust, oil, and grease.",
        "Aluminum and other metals may be primed for best adhesion.",
        "Apply between 34ºF and 150ºF, in damp and dry conditions.",
        "Most of its strength develops in the first 24 hours.",
        "Minimum cure time is overnight, but several days may be required for maximum performance, however cure time may be accelerated at higher temperatures.",
        "Most parts do not require clamping, although heavy parts may require temporary clamping to ensure desired positioning."
      ],
      updatedAt: new Date().toISOString()
    };
  }
  return product;
});

// Update metadata
if (updated) {
  productsData.metadata = {
    ...productsData.metadata,
    c_os9_update: new Date().toISOString(),
    changes: {
      ...(productsData.metadata?.changes || {}),
      c_os9_updated: true
    }
  };

  // Save the updated data
  fs.writeFileSync(productsPath, JSON.stringify(productsData, null, 2));
  console.log(`✅ Successfully updated C-OS9 product with missing data`);
} else {
  console.log(`❌ Could not find C-OS9 product in the data`);
}