#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const productsPath = path.join(root, 'src', 'data', 'productsMerged.json');
const chemistrySummaryPath = path.join(root, 'src', 'data', 'chemistry-summary.json');

async function fixChemistryConfidence() {
  console.log('🧪 FIXING CHEMISTRY CONFIDENCE ISSUES\n');
  
  try {
    // Load products
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    console.log(`📊 Loaded ${products.length} products`);
    
    let fixedCount = 0;
    let skippedCount = 0;
    
    // Fix chemistry confidence for each product
    products.forEach(product => {
      if (product.chemistryConfidence === 'undefined' || product.chemistryConfidence === undefined) {
        // Set default confidence based on chemistry presence
        if (product.chemistry && product.chemistry !== 'Unknown') {
          // If chemistry is set, assume medium confidence
          product.chemistryConfidence = 'Medium';
          fixedCount++;
          console.log(`✅ Fixed ${product.id}: undefined -> Medium (chemistry: ${product.chemistry})`);
        } else {
          // No chemistry data
          product.chemistryConfidence = 'None';
          fixedCount++;
          console.log(`✅ Fixed ${product.id}: undefined -> None (no chemistry)`);
        }
      } else if (product.chemistryConfidence && !['High', 'Medium', 'Low', 'None'].includes(product.chemistryConfidence)) {
        // Invalid confidence level - set to Medium
        product.chemistryConfidence = 'Medium';
        fixedCount++;
        console.log(`⚠️  Fixed ${product.id}: "${product.chemistryConfidence}" -> Medium`);
      } else {
        // Already correct
        skippedCount++;
      }
      
      // Ensure chemistry is set if confidence is set
      if (product.chemistryConfidence && product.chemistryConfidence !== 'None' && !product.chemistry) {
        product.chemistry = 'Unknown';
        console.log(`➕ Added ${product.id}: missing chemistry -> Unknown`);
      }
    });
    
    // Save updated products
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
    
    console.log(`\n📈 SUMMARY:`);
    console.log(`   • Total products: ${products.length}`);
    console.log(`   • Fixed confidence: ${fixedCount}`);
    console.log(`   • Already correct: ${skippedCount}`);
    console.log(`   • Updated file: ${productsPath}`);
    
    // Update chemistry summary
    console.log('\n📊 Updating chemistry summary...');
    const chemistrySummary = {
      totalProducts: products.length,
      pdfDefinitive: 0,
      patternBased: 0,
      noChemistry: 0,
      chemistryBreakdown: {},
      confidenceBreakdown: {},
      productTypeBreakdown: {},
      chemistryDefinitions: {}
    };
    
    // Recalculate statistics
    products.forEach(product => {
      if (product.chemistry && product.chemistry !== 'Unknown') {
        chemistrySummary.chemistryBreakdown[product.chemistry] = 
          (chemistrySummary.chemistryBreakdown[product.chemistry] || 0) + 1;
        
        chemistrySummary.confidenceBreakdown[product.chemistryConfidence] = 
          (chemistrySummary.confidenceBreakdown[product.chemistryConfidence] || 0) + 1;
      } else {
        chemistrySummary.noChemistry++;
        chemistrySummary.confidenceBreakdown[product.chemistryConfidence] = 
          (chemistrySummary.confidenceBreakdown[product.chemistryConfidence] || 0) + 1;
      }
      
      if (product.productType) {
        chemistrySummary.productTypeBreakdown[product.productType] = 
          (chemistrySummary.productTypeBreakdown[product.productType] || 0) + 1;
      }
    });
    
    // Load existing chemistry definitions
    try {
      const existingSummary = JSON.parse(fs.readFileSync(chemistrySummaryPath, 'utf8'));
      chemistrySummary.chemistryDefinitions = existingSummary.chemistryDefinitions || {};
    } catch (error) {
      console.log('⚠️  No existing chemistry definitions found, will create new ones');
    }
    
    // Save updated chemistry summary
    fs.writeFileSync(chemistrySummaryPath, JSON.stringify(chemistrySummary, null, 2));
    
    console.log(`✅ Updated chemistry summary: ${chemistrySummaryPath}`);
    console.log(`📊 New confidence breakdown:`, chemistrySummary.confidenceBreakdown);
    
    // Verify fix
    const verification = products.filter(p => 
      p.chemistryConfidence === 'undefined' || 
      p.chemistryConfidence === undefined ||
      !['High', 'Medium', 'Low', 'None'].includes(p.chemistryConfidence)
    );
    
    if (verification.length > 0) {
      console.log(`❌ ERROR: ${verification.length} products still have invalid confidence levels`);
      verification.forEach(p => console.log(`   - ${p.id}: "${p.chemistryConfidence}"`));
      process.exit(1);
    } else {
      console.log(`✅ SUCCESS: All products now have valid confidence levels`);
    }
    
  } catch (error) {
    console.error('❌ Error fixing chemistry confidence:', error.message);
    process.exit(1);
  }
}

fixChemistryConfidence().catch(console.error); 