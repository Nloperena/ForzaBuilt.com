#!/usr/bin/env node
/**
 * Test Chemistry Classifications
 * 
 * This script verifies that the chemistry classifications are working correctly.
 * It runs quick tests to ensure there are no products showing up in multiple chemistry categories.
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const mergedPath = path.join(root, 'src', 'data', 'productsMerged.json');

// Load products data
const products = JSON.parse(fs.readFileSync(mergedPath, 'utf8'));

// Test 1: Check for Tape products with non-PSA chemistry
const misclassifiedTapes = products.filter(p => 
  p.productType === 'Tape' && p.chemistry && p.chemistry !== 'Acrylic (incl. PSA)'
);

// Test 2: Check for Acrylic products that aren't Tapes or Adhesives
const misclassifiedAcrylics = products.filter(p =>
  p.chemistry === 'Acrylic (incl. PSA)' && 
  p.productType && 
  p.productType !== 'Tape' && 
  p.productType !== 'Adhesive'
);

// Test 3: Check for Epoxy products that aren't Resin or Adhesives
const misclassifiedEpoxies = products.filter(p =>
  p.chemistry === 'Epoxy' && 
  p.productType && 
  p.productType !== 'Resin' && 
  p.productType !== 'Adhesive'
);

// Print results
console.log('---- CHEMISTRY CLASSIFICATION TESTS ----');
console.log('Total products analyzed: ' + products.length);
console.log(`\nTest 1: Tape products with non-PSA chemistry: ${misclassifiedTapes.length}`);
if (misclassifiedTapes.length > 0) {
  misclassifiedTapes.forEach(p => console.log(`  - ${p.id}: ${p.productType} with ${p.chemistry} chemistry`));
}

console.log(`\nTest 2: Acrylic products that aren't Tapes or Adhesives: ${misclassifiedAcrylics.length}`);
if (misclassifiedAcrylics.length > 0) {
  misclassifiedAcrylics.forEach(p => console.log(`  - ${p.id}: ${p.productType} with ${p.chemistry} chemistry`));
}

console.log(`\nTest 3: Epoxy products that aren't Resin or Adhesives: ${misclassifiedEpoxies.length}`);
if (misclassifiedEpoxies.length > 0) {
  misclassifiedEpoxies.forEach(p => console.log(`  - ${p.id}: ${p.productType} with ${p.chemistry} chemistry`));
}

console.log('\n---- STATISTICS BY CHEMISTRY ----');
const chemistryCount = {};
products.forEach(p => {
  if (p.chemistry) {
    chemistryCount[p.chemistry] = (chemistryCount[p.chemistry] || 0) + 1;
  }
});

Object.keys(chemistryCount).sort().forEach(chemistry => {
  console.log(`  - ${chemistry}: ${chemistryCount[chemistry]} products`);
});

console.log('\n---- STATISTICS BY PRODUCT TYPE ----');
const productTypeCount = {};
products.forEach(p => {
  if (p.productType) {
    productTypeCount[p.productType] = (productTypeCount[p.productType] || 0) + 1;
  }
});

Object.keys(productTypeCount).sort().forEach(type => {
  console.log(`  - ${type}: ${productTypeCount[type]} products`);
});

console.log('\n---- CHEMISTRY-PRODUCT TYPE COMBINATIONS ----');
const chemTypeCount = {};
products.forEach(p => {
  if (p.chemistry && p.productType) {
    const key = `${p.chemistry} - ${p.productType}`;
    chemTypeCount[key] = (chemTypeCount[key] || 0) + 1;
  }
});

Object.keys(chemTypeCount).sort().forEach(combo => {
  console.log(`  - ${combo}: ${chemTypeCount[combo]} products`);
});