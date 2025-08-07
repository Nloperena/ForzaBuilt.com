#!/usr/bin/env node
/**
 * Fix Product PDF Links Script
 * 
 * This script fixes PDF links in productsSimplified.json to ensure each product
 * only has PDF links related to its own product ID and not from other products.
 */

const fs = require('fs');
const path = require('path');

// Path configuration
const root = path.join(__dirname, '..');
const simplifiedPath = path.join(root, 'src', 'data', 'productsSimplified.json');
const outputPath = path.join(root, 'src', 'data', 'productsSimplified.json');

// Main function
async function fixProductPdfLinks() {
  console.log('🔍 Fixing PDF links in productsSimplified.json...\n');

  try {
    // Load products data
    const data = JSON.parse(fs.readFileSync(simplifiedPath, 'utf8'));
    const products = data.products;
    
    console.log(`✅ Found ${products.length} products to process`);
    
    // Track statistics
    let productsFixed = 0;
    let linksRemoved = 0;
    let productsWithoutLinks = 0;
    const productIdToLinks = new Map();
    
    // First pass: Identify which PDFs belong to which product IDs
    console.log('\n🔍 Analyzing PDF links by product ID...');
    
    for (const product of products) {
      const productId = product.id.toLowerCase();
      const shortName = product.shortName?.toLowerCase() || productId;
      
      // Store original links count for comparison
      const originalLinkCount = (product.pdfLinks || []).length;
      
      // Skip if no PDF links
      if (!product.pdfLinks || product.pdfLinks.length === 0) {
        productsWithoutLinks++;
        continue;
      }

      // Store this product's PDF links
      productIdToLinks.set(productId, []);
      
      // Identify PDF links that match this product
      for (const link of product.pdfLinks) {
        if (!link) continue;
        
        // Check if the link contains the product ID or short name in the right folder structure
        const linkLower = link.toLowerCase();
        
        // Match patterns like "/TDS/1. Industrial/OS2/" (exact ID match)
        // or variants like "/TDS/2. Marine/M-OS789 (OS2)/" (references the product in parentheses)
        if (
          linkLower.includes(`/${productId}/`) || 
          linkLower.includes(`/${shortName}/`) ||
          linkLower.includes(`/${productId}.pdf`) ||
          linkLower.includes(`/${shortName}.pdf`) ||
          linkLower.includes(`(${productId})`) ||
          linkLower.includes(`_${productId}_`)
        ) {
          productIdToLinks.get(productId).push(link);
        }
      }
      
      // Log how many links were kept vs. original
      const keptCount = productIdToLinks.get(productId).length;
      const removedCount = originalLinkCount - keptCount;
      
      if (removedCount > 0) {
        console.log(`  - ${productId}: Keeping ${keptCount}/${originalLinkCount} links (removed ${removedCount})`);
        linksRemoved += removedCount;
        productsFixed++;
      }
    }
    
    // Second pass: Update products with their correct PDF links
    console.log('\n🔧 Updating products with filtered PDF links...');
    
    for (const product of products) {
      const productId = product.id.toLowerCase();
      
      // Skip if this product didn't have links or wasn't processed
      if (!productIdToLinks.has(productId)) continue;
      
      const filteredLinks = productIdToLinks.get(productId);
      
      // Skip if no change needed
      if (filteredLinks.length === (product.pdfLinks || []).length) continue;
      
      // Update the product with filtered links
      product.pdfLinks = filteredLinks;
      
      // Update standardTdsLink if it was referring to another product
      if (product.standardTdsLink) {
        const standardLinkLower = product.standardTdsLink.toLowerCase();
        let isValidStandardLink = false;
        
        // Check if current standardTdsLink is valid for this product
        for (const pattern of [
          `/${productId}/`, 
          `/${product.shortName?.toLowerCase() || ''}/`,
          `(${productId})`,
          `_${productId}_`
        ]) {
          if (pattern && standardLinkLower.includes(pattern)) {
            isValidStandardLink = true;
            break;
          }
        }
        
        // If not valid, try to find a replacement
        if (!isValidStandardLink && filteredLinks.length > 0) {
          // Prefer "FOR EMAIL" versions first
          const emailVersion = filteredLinks.find(link => link.includes('FOR EMAIL'));
          product.standardTdsLink = emailVersion || filteredLinks[0];
          console.log(`  - ${productId}: Updated standardTdsLink`);
        } else if (!isValidStandardLink) {
          // No valid links found
          product.standardTdsLink = '';
          product.hasTdsLink = false;
          console.log(`  - ${productId}: Cleared invalid standardTdsLink`);
        }
      }
    }
    
    // Write updated data back to file
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    
    // Final statistics
    console.log('\n📊 Summary:');
    console.log(`   • Total products: ${products.length}`);
    console.log(`   • Products fixed: ${productsFixed}`);
    console.log(`   • Total PDF links removed: ${linksRemoved}`);
    console.log(`   • Products without PDF links: ${productsWithoutLinks}`);
    
    console.log('\n✅ PDF links have been fixed! Each product now only shows its own PDFs.');
    
  } catch (error) {
    console.error('❌ Error fixing PDF links:', error);
  }
}

// Execute
fixProductPdfLinks().catch(console.error);
