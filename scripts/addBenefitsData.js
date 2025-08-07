#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const completeDataPath = path.join(root, 'public', 'TDS', 'forza_complete_product_data.json');
const simplifiedPath = path.join(root, 'src', 'data', 'productsSimplified.json');
const backupDir = path.join(root, 'src', 'data', 'backup');

// Helper to create normalized product ID for matching
const normalizeProductId = (code) => {
  return code.toLowerCase().replace(/[^a-z0-9]/g, '');
};

async function addBenefitsData() {
  console.log('🔄 ADDING BENEFITS DATA TO PRODUCTS\n');
  
  try {
    // Ensure backup directory exists
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    // Create backup before modifying
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(backupDir, `productsSimplified-${timestamp}.json`);
    fs.copyFileSync(simplifiedPath, backupPath);
    console.log(`💾 Created backup at: ${backupPath}`);
    
    // Load data files
    const completeData = JSON.parse(fs.readFileSync(completeDataPath, 'utf8'));
    const simplifiedData = JSON.parse(fs.readFileSync(simplifiedPath, 'utf8'));
    
    console.log(`📊 Loaded ${completeData.length} products from complete data`);
    console.log(`📊 Loaded ${simplifiedData.products.length} products from simplified data`);
    
    // Create map of product codes to benefits data
    const benefitsMap = new Map();
    
    completeData.forEach(product => {
      if (product.benefits && typeof product.benefits === 'string' && product.benefits.trim() !== '') {
        const normalizedId = normalizeProductId(product.product_code);
        
        // Parse benefits from string to array
        const benefitsArray = product.benefits
          .split('\n')
          .map(b => b.trim().replace(/^[•-]\s*/, '')) // Remove bullets and leading spaces
          .filter(b => b !== ''); // Remove empty items
        
        if (benefitsArray.length > 0) {
          benefitsMap.set(normalizedId, benefitsArray);
        }
      }
    });
    
    console.log(`📋 Found benefits for ${benefitsMap.size} products`);
    
    // Count stats
    let matchedCount = 0;
    let updatedCount = 0;
    let noMatchCount = 0;
    let alreadyHasCount = 0;
    
    // Update simplified data with benefits
    simplifiedData.products = simplifiedData.products.map(product => {
      // Normalize the ID for matching
      const productShortName = product.shortName || '';
      const normalizedId = normalizeProductId(productShortName);
      
      // Check if benefits exist for this product
      if (benefitsMap.has(normalizedId)) {
        matchedCount++;
        
        // Only update if benefits array is empty
        if (!product.benefits || product.benefits.length === 0) {
          updatedCount++;
          return {
            ...product,
            benefits: benefitsMap.get(normalizedId)
          };
        } else {
          alreadyHasCount++;
          return product;
        }
      } else {
        noMatchCount++;
        return product;
      }
    });
    
    // Update metadata to track changes
    simplifiedData.metadata = {
      ...simplifiedData.metadata,
      benefitsAddedAt: new Date().toISOString(),
      changes: {
        ...(simplifiedData.metadata.changes || {}),
        benefitsAdded: true,
        benefitsUpdatedCount: updatedCount
      }
    };
    
    // Save updated data
    fs.writeFileSync(simplifiedPath, JSON.stringify(simplifiedData, null, 2));
    
    console.log(`\n📈 RESULTS:`);
    console.log(`   • Products with benefits in source data: ${benefitsMap.size}`);
    console.log(`   • Products matched by ID: ${matchedCount}`);
    console.log(`   • Products updated with benefits: ${updatedCount}`);
    console.log(`   • Products with benefits already: ${alreadyHasCount}`);
    console.log(`   • Products with no match found: ${noMatchCount}`);
    console.log(`   • Data saved to: ${simplifiedPath}`);
    
    console.log(`\n✅ BENEFITS DATA ADDED SUCCESSFULLY!`);
    
  } catch (error) {
    console.error('❌ Error adding benefits data:', error.message);
    process.exit(1);
  }
}

addBenefitsData().catch(console.error);