#!/usr/bin/env node

/**
 * Update chemistry classifications for specific products
 * Based on user specifications:
 * - C-S538: Adhesive
 * - C-T500, C-T5100, C-564, C-T731, M-S750, S228: Tapes
 */

const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '..', 'src', 'data', 'productsMerged.json');

// Chemistry classifications based on user specifications
const chemistryUpdates = {
  'c-s538': 'Adhesive',
  'c-t500': 'Tape',
  'c-t5100': 'Tape',
  'c-564': 'Tape',
  'c-t731': 'Tape',
  'm-s750': 'Tape',
  's228': 'Tape'
};

async function updateChemistryClassifications() {
  try {
    console.log('Reading products data...');
    const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    
    let updatedCount = 0;
    let notFoundCount = 0;
    
    // Update chemistry classifications
    productsData.forEach(product => {
      const productId = product.id.toLowerCase();
      
      if (chemistryUpdates[productId]) {
        const oldChemistry = product.chemistry;
        product.chemistry = chemistryUpdates[productId];
        product.chemistryConfidence = 'High'; // Set to high confidence since this is manual classification
        product.chemistryDetails = {
          technical: `Manually classified as ${chemistryUpdates[productId]}`,
          exampleUses: `Product ${productId} has been classified as ${chemistryUpdates[productId]} based on product specifications`
        };
        
        console.log(`✅ Updated ${productId}: ${oldChemistry || 'Unknown'} → ${chemistryUpdates[productId]}`);
        updatedCount++;
      }
    });
    
    // Check for products not found
    Object.keys(chemistryUpdates).forEach(productId => {
      const found = productsData.find(p => p.id.toLowerCase() === productId);
      if (!found) {
        console.log(`❌ Product ${productId} not found in database`);
        notFoundCount++;
      }
    });
    
    // Write updated data back to file
    fs.writeFileSync(productsPath, JSON.stringify(productsData, null, 2));
    
    console.log('\n📊 Update Summary:');
    console.log(`✅ Successfully updated: ${updatedCount} products`);
    console.log(`❌ Products not found: ${notFoundCount}`);
    console.log(`📁 Updated file: ${productsPath}`);
    
    // Show updated products
    console.log('\n🔍 Updated Products:');
    productsData.forEach(product => {
      const productId = product.id.toLowerCase();
      if (chemistryUpdates[productId]) {
        console.log(`  - ${product.id}: ${product.chemistry} (${product.chemistryConfidence} confidence)`);
      }
    });
    
  } catch (error) {
    console.error('❌ Error updating chemistry classifications:', error);
  }
}

// Run the update
updateChemistryClassifications(); 