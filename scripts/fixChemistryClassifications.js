#!/usr/bin/env node
/**
 * Fix Chemistry Classifications
 * 
 * This script addresses inconsistencies in product chemistry and product type classifications.
 * It ensures that:
 * 1. Products are consistently classified by chemistry type
 * 2. Product types are distinct from chemistry types (tapes vs acrylics, etc.)
 * 3. Products are not showing up in multiple chemistry categories
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const mergedPath = path.join(root, 'src', 'data', 'productsMerged.json');
const summaryPath = path.join(root, 'src', 'data', 'chemistry-summary.json');

// Load products data
const products = JSON.parse(fs.readFileSync(mergedPath, 'utf8'));
const chemistrySummary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));

// Chemistry-ProductType Mapping Rules
// These rules enforce proper classification alignment
const chemistryProductTypeRules = {
  'Acrylic (incl. PSA)': ['Adhesive', 'Tape'],
  'Epoxy': ['Adhesive', 'Resin'],
  'Modified Epoxies': ['Adhesive', 'Resin'],
  'Modified Silane (MS Polymer/ Hybrid Polymer)': ['Adhesive', 'Sealant'],
  'Cyanoacrylates': ['Adhesive'],
  'Polyurethane (PU)': ['Adhesive', 'Sealant'],
  'Solvent Based': ['Adhesive', 'Coating'],
  'Water Based': ['Adhesive', 'Coating'],
  'Silicone': ['Sealant', 'Adhesive'],
  'Methacrylate/MMA': ['Adhesive'],
  'Hot Melt': ['Adhesive'],
};

// Better detection of product type based on product code patterns
function determineProductTypeByCode(productId, productCode) {
  const code = (productCode || '').toLowerCase();
  const id = (productId || '').toLowerCase();
  
  // Pattern-based identification
  if (code.startsWith('t') && !code.startsWith('tac')) {
    return 'Tape';
  } else if (code.startsWith('r')) {
    return 'Resin';
  } else if (code.startsWith('c')) {
    return 'Coating';
  } else if (code.startsWith('s') || code.startsWith('os')) {
    return 'Sealant';
  } else if (code.startsWith('a') || code.startsWith('oa')) {
    return 'Adhesive';
  } else if (code.startsWith('ic') || id.includes('canister')) {
    return 'Canister';
  }
  
  return null;
}

// Helper functions
function hasKeyword(text, keywords) {
  if (!text) return false;
  const lowerText = text.toLowerCase();
  return keywords.some(word => lowerText.includes(word.toLowerCase()));
}

// Process and fix each product
let totalFixed = 0;
let chemistryAdded = 0;
let typeFixed = 0;
let consistencyFixed = 0;

products.forEach(product => {
  let wasFixed = false;
  const originalChemistry = product.chemistry;
  const originalType = product.productType;

  // Step 1: Determine the proper product type if it's missing or incorrect
  if (!product.productType || product.productType === 'Unknown') {
    // Try to identify by product code
    const codeBasedType = determineProductTypeByCode(product.id, product.productCode || product.id);
    
    if (codeBasedType) {
      product.productType = codeBasedType;
      wasFixed = true;
      typeFixed++;
    }
  }

  // Step 2: If chemistry is unknown but we have a product type, try to infer chemistry
  if (!product.chemistry || product.chemistry === 'Unknown') {
    // Infer chemistry from product type and description
    if (product.productType === 'Tape') {
      product.chemistry = 'Acrylic (incl. PSA)';
      product.chemistryConfidence = 'Medium';
      chemistryAdded++;
      wasFixed = true;
    }
    else if (product.productType === 'Sealant') {
      // Check for silicone sealants
      if (product.title && hasKeyword(product.title, ['silicone', 'silicon', 'polysiloxane'])) {
        product.chemistry = 'Silicone';
        product.chemistryConfidence = 'Medium';
        chemistryAdded++;
        wasFixed = true;
      }
    }
  }

  // Step 3: Ensure consistency between chemistry and product type
  if (product.chemistry && chemistryProductTypeRules[product.chemistry]) {
    const validTypes = chemistryProductTypeRules[product.chemistry];
    
    if (product.productType && !validTypes.includes(product.productType)) {
      // Fix the product type to match the chemistry
      // Choose the most specific valid type for this chemistry
      product.productType = validTypes[0]; // Default to first valid type
      consistencyFixed++;
      wasFixed = true;
    }
  }

  // Step 4: Special handling for Tapes - ensure they have PSA chemistry
  if (product.productType === 'Tape' && 
      (!product.chemistry || product.chemistry !== 'Acrylic (incl. PSA)')) {
    product.chemistry = 'Acrylic (incl. PSA)';
    product.chemistryConfidence = 'Medium';
    consistencyFixed++;
    wasFixed = true;
  }
  
  // Log what we changed
  if (wasFixed) {
    totalFixed++;
    console.log(`Fixed ${product.id}: ${originalChemistry} -> ${product.chemistry}, ${originalType} -> ${product.productType}`);
  }
});

// Update chemistry summary statistics
const updatedSummary = {
  ...chemistrySummary,
  chemistryBreakdown: {},
  confidenceBreakdown: {},
  productTypeBreakdown: {},
};

// Recalculate statistics
products.forEach(product => {
  if (product.chemistry) {
    updatedSummary.chemistryBreakdown[product.chemistry] = 
      (updatedSummary.chemistryBreakdown[product.chemistry] || 0) + 1;
    
    updatedSummary.confidenceBreakdown[product.chemistryConfidence] = 
      (updatedSummary.confidenceBreakdown[product.chemistryConfidence] || 0) + 1;
  }
  
  if (product.productType) {
    updatedSummary.productTypeBreakdown[product.productType] = 
      (updatedSummary.productTypeBreakdown[product.productType] || 0) + 1;
  }
});

// Save updated data
fs.writeFileSync(mergedPath, JSON.stringify(products, null, 2));
fs.writeFileSync(summaryPath, JSON.stringify(updatedSummary, null, 2));

// Print summary
console.log('\n--- CHEMISTRY CLASSIFICATION FIX SUMMARY ---');
console.log(`Total products fixed: ${totalFixed}`);
console.log(`Chemistry added: ${chemistryAdded}`);
console.log(`Product types fixed: ${typeFixed}`);
console.log(`Consistency issues fixed: ${consistencyFixed}`);
console.log('\nUpdated files:');
console.log(`- ${mergedPath}`);
console.log(`- ${summaryPath}`);