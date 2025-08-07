#!/usr/bin/env node
/**
 * Fix Product Lines Script
 * 
 * This script checks and fixes the productLine property in productsMerged.json
 * It ensures all products have the correct productLine (bond, seal, tape) based on their category
 */

const fs = require('fs');
const path = require('path');

// Path configuration
const root = path.join(__dirname, '..');
const mergedPath = path.join(root, 'src', 'data', 'productsMerged.json');

// Main function
async function fixProductLines() {
  console.log('🔍 Checking productLine properties in productsMerged.json...');

  try {
    // Load products data
    const productsRaw = fs.readFileSync(mergedPath, 'utf8');
    const products = JSON.parse(productsRaw);
    
    console.log(`✅ Found ${products.length} products`);
    
    // Count products by category before fix
    const categoryCounts = {};
    const productLineCounts = {};
    
    products.forEach(product => {
      if (product.category) {
        categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
      }
      
      if (product.productLine) {
        productLineCounts[product.productLine] = (productLineCounts[product.productLine] || 0) + 1;
      }
    });
    
    console.log('\n📊 Category breakdown before fix:');
    Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([category, count]) => {
        console.log(`  - ${category}: ${count} products`);
      });
      
    console.log('\n📊 ProductLine breakdown before fix:');
    Object.entries(productLineCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([productLine, count]) => {
        console.log(`  - ${productLine}: ${count} products`);
      });
    
    // Fix productLine based on category
    let fixedCount = 0;
    products.forEach(product => {
      let needsFix = false;
      
      // Map category to productLine
      if (product.category) {
        const category = product.category.toLowerCase();
        
        // Check if product has the right productLine
        if (category.includes('adhesive') || category.includes('bond')) {
          if (product.productLine !== 'bond') {
            product.productLine = 'bond';
            needsFix = true;
          }
        } else if (category.includes('seal') || category.includes('sealant')) {
          if (product.productLine !== 'seal') {
            product.productLine = 'seal';
            needsFix = true;
          }
        } else if (category.includes('tape')) {
          if (product.productLine !== 'tape') {
            product.productLine = 'tape';
            needsFix = true;
          }
        }
        
        // If no category match, try to infer from product name or ID
        if (!product.productLine) {
          const name = (product.name || '').toLowerCase();
          const id = (product.id || '').toLowerCase();
          
          if (name.includes('adhesive') || name.includes('bond') || id.includes('c-') || id.includes('mc')) {
            product.productLine = 'bond';
            needsFix = true;
          } else if (name.includes('seal') || name.includes('sealant') || id.includes('os') || id.includes('s-')) {
            product.productLine = 'seal';
            needsFix = true;
          } else if (name.includes('tape') || id.includes('t-') || id.includes('tc')) {
            product.productLine = 'tape';
            needsFix = true;
          }
        }
      }
      
      if (needsFix) {
        fixedCount++;
      }
    });
    
    // Count products by productLine after fix
    const newProductLineCounts = {};
    products.forEach(product => {
      if (product.productLine) {
        newProductLineCounts[product.productLine] = (newProductLineCounts[product.productLine] || 0) + 1;
      }
    });
    
    console.log(`\n✅ Fixed productLine for ${fixedCount} products`);
    
    console.log('\n📊 ProductLine breakdown after fix:');
    Object.entries(newProductLineCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([productLine, count]) => {
        console.log(`  - ${productLine}: ${count} products`);
      });
    
    // Write updated products back to file
    fs.writeFileSync(mergedPath, JSON.stringify(products, null, 2));
    
    console.log(`\n✅ Updated productsMerged.json with fixed productLine properties`);
    console.log(`📂 File location: ${mergedPath}`);
    
  } catch (error) {
    console.error('❌ Error fixing product lines:', error);
  }
}

// Execute
fixProductLines();