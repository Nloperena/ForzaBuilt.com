#!/usr/bin/env node
/**
 * Quick Chemistry Test
 * A simplified script to test chemistry classifications
 */

const fs = require('fs');
const path = require('path');

console.log('Starting chemistry test...');
const root = path.join(__dirname, '..');
const mergedPath = path.join(root, 'src', 'data', 'productsMerged.json');

try {
  // Load products data - just checking if we can parse the file
  const productsRaw = fs.readFileSync(mergedPath, 'utf8');
  console.log(`Successfully read the products file (${(productsRaw.length / 1024 / 1024).toFixed(2)} MB)`);
  
  // Try to parse the JSON
  const products = JSON.parse(productsRaw);
  console.log(`Successfully parsed ${products.length} products`);
  
  // Count products by chemistry
  const chemistryCount = {};
  products.forEach(p => {
    if (p.chemistry) {
      chemistryCount[p.chemistry] = (chemistryCount[p.chemistry] || 0) + 1;
    }
  });
  
  console.log('\nChemistry Counts:');
  Object.keys(chemistryCount).sort().forEach(chemistry => {
    console.log(`  - ${chemistry}: ${chemistryCount[chemistry]}`);
  });
  
  // Count products by type
  const typeCount = {};
  products.forEach(p => {
    if (p.productType) {
      typeCount[p.productType] = (typeCount[p.productType] || 0) + 1;
    }
  });
  
  console.log('\nProduct Type Counts:');
  Object.keys(typeCount).sort().forEach(type => {
    console.log(`  - ${type}: ${typeCount[type]}`);
  });
  
  console.log('\nTest complete!');
} catch (error) {
  console.error('Error processing products:', error);
}