#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const simplifiedPath = path.join(root, 'src', 'data', 'productsSimplified.json');
const detailsPath = path.join(root, 'public', 'TDS', 'forza_product_details_improved.json');
const outputPath = path.join(root, 'src', 'data', 'productsCMS.json');

async function mergeProductDetails() {
  console.log('🔄 MERGING PRODUCT DETAILS FOR CMS\n');
  
  try {
    // Load simplified data
    const simplified = JSON.parse(fs.readFileSync(simplifiedPath, 'utf8'));
    const products = simplified.products;
    
    // Load detailed descriptions
    const detailedProducts = JSON.parse(fs.readFileSync(detailsPath, 'utf8'));
    
    console.log(`📊 Total products in main database: ${products.length}`);
    console.log(`📋 Total products with detailed descriptions: ${detailedProducts.length}`);
    
    let updatedCount = 0;
    let notFoundCount = 0;
    const notFoundProducts = [];
    
    // Create a map of product codes to detailed descriptions
    const detailsMap = {};
    detailedProducts.forEach(detail => {
      // Normalize product code (remove hyphens, lowercase)
      const normalizedCode = detail.product_code.toLowerCase().replace(/-/g, '');
      detailsMap[normalizedCode] = detail;
    });
    
    // Merge the data
    products.forEach(product => {
      // Normalize product ID (remove hyphens, lowercase)
      const normalizedId = product.id.toLowerCase().replace(/-/g, '');
      
      if (detailsMap[normalizedId]) {
        const details = detailsMap[normalizedId];
        
        // Update product with detailed information
        if (details.description && !product.description) {
          product.description = details.description;
        }
        
        if (details.applications) {
          product.applications = details.applications;
        }
        
        if (details.benefits) {
          // Convert benefits from string with newlines to array
          product.benefits = details.benefits
            .split('\n')
            .map(benefit => benefit.trim())
            .filter(benefit => benefit)
            .map(benefit => benefit.startsWith('• ') ? benefit.substring(2) : benefit);
        }
        
        if (details.how_to_use) {
          product.howToUse = details.how_to_use;
        }
        
        if (details.sizing) {
          // Convert sizes from string with newlines to array
          product.sizes = details.sizing
            .split('\n')
            .map(size => size.trim())
            .filter(size => size)
            .map(size => size.startsWith('• ') ? size.substring(2) : size);
        }
        
        updatedCount++;
      } else {
        notFoundCount++;
        notFoundProducts.push(product.id);
      }
    });
    
    // Update metadata
    simplified.metadata.detailsMergedAt = new Date().toISOString();
    simplified.metadata.changes = {
      ...simplified.metadata.changes,
      detailsMerged: true,
      detailsUpdated: updatedCount
    };
    
    // Save updated data
    fs.writeFileSync(outputPath, JSON.stringify(simplified, null, 2));
    
    console.log(`\n✅ UPDATED: ${updatedCount} products with detailed descriptions`);
    console.log(`❌ NOT FOUND: ${notFoundCount} products without matching details`);
    console.log(`📁 Saved to: ${outputPath}`);
    
    // Show sample of updated products
    console.log('\n📋 SAMPLE UPDATED PRODUCTS:');
    const sampleProducts = products.filter(p => {
      const normalizedId = p.id.toLowerCase().replace(/-/g, '');
      return detailsMap[normalizedId];
    }).slice(0, 3);
    
    sampleProducts.forEach(p => {
      console.log(`\n   ${p.id}: ${p.name}`);
      console.log(`   Description: ${p.description ? '✅' : '❌'}`);
      console.log(`   Applications: ${p.applications ? '✅' : '❌'}`);
      console.log(`   Benefits: ${p.benefits && p.benefits.length ? '✅' : '❌'}`);
      console.log(`   How to Use: ${p.howToUse ? '✅' : '❌'}`);
      console.log(`   Sizes: ${p.sizes && p.sizes.length ? '✅' : '❌'}`);
    });
    
    // Show sample of products without details
    if (notFoundProducts.length > 0) {
      console.log('\n❌ SAMPLE PRODUCTS WITHOUT DETAILS:');
      notFoundProducts.slice(0, 5).forEach(id => {
        console.log(`   • ${id}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error merging product details:', error.message);
    process.exit(1);
  }
}

mergeProductDetails().catch(console.error);