#!/usr/bin/env node
/**
 * Optimize PDF Links Script
 * 
 * This script optimizes PDF links in productsSimplified.json to ensure each product
 * has only ONE PDF link - preferring the "FOR EMAIL" version as they are smaller 
 * and typically the newest versions.
 */

const fs = require('fs');
const path = require('path');

// Path configuration
const root = path.join(__dirname, '..');
const simplifiedPath = path.join(root, 'src', 'data', 'productsSimplified.json');
const outputPath = path.join(root, 'src', 'data', 'productsSimplified.json');

// Main function
async function optimizePdfLinks() {
  console.log('🔍 Optimizing PDF links to keep only the best one per product...\n');

  try {
    // Load products data
    const data = JSON.parse(fs.readFileSync(simplifiedPath, 'utf8'));
    const products = data.products;
    
    console.log(`✅ Found ${products.length} products to process`);
    
    // Track statistics
    let productsOptimized = 0;
    let totalLinksRemoved = 0;
    let productsWithoutLinks = 0;
    
    // Process each product
    for (const product of products) {
      // Skip if no PDF links
      if (!product.pdfLinks || product.pdfLinks.length === 0) {
        productsWithoutLinks++;
        continue;
      }
      
      // Original link count for comparison
      const originalLinkCount = product.pdfLinks.length;
      
      if (originalLinkCount === 1) {
        // Already has just one link, no need to optimize
        continue;
      }
      
      // Find the best PDF link according to priority:
      // 1. "FOR EMAIL" version from the product's main industry folder
      // 2. Any "FOR EMAIL" version
      // 3. Latest version from main industry folder
      // 4. Any version
      
      let bestLink = null;
      const productId = product.id.toLowerCase();
      const shortName = (product.shortName || '').toLowerCase();
      
      // First priority: "FOR EMAIL" from product's main industry folder
      const industryDirMap = {
        'industrial': '1. Industrial',
        'marine': '2. Marine',
        'transportation': '3. Transportation', 
        'composites': '4. Composites',
        'insulation': '6. Insulation',
        'construction': '7. Construction'
      };
      
      // Get the industry folder
      let industry = Array.isArray(product.industry) ? product.industry[0] : product.industry;
      industry = industry ? industry.toLowerCase() : 'industrial'; // Default to industrial
      const industryDir = industryDirMap[industry] || '1. Industrial';
      
      // Look for best match
      for (const link of product.pdfLinks) {
        if (!link) continue;
        
        const linkLower = link.toLowerCase();
        
        // Best match: FOR EMAIL + direct product folder + industry match
        if (
          linkLower.includes('for email') && 
          (linkLower.includes(`/${productId}/`) || linkLower.includes(`/${shortName}/`)) &&
          linkLower.includes(`/${industryDir}/`)
        ) {
          bestLink = link;
          break;
        }
      }
      
      // Second priority: any "FOR EMAIL" version
      if (!bestLink) {
        for (const link of product.pdfLinks) {
          if (!link) continue;
          if (link.toLowerCase().includes('for email')) {
            bestLink = link;
            break;
          }
        }
      }
      
      // Third priority: non-email version from product's industry
      if (!bestLink) {
        for (const link of product.pdfLinks) {
          if (!link) continue;
          const linkLower = link.toLowerCase();
          
          if (
            (linkLower.includes(`/${productId}/`) || linkLower.includes(`/${shortName}/`)) &&
            linkLower.includes(`/${industryDir}/`)
          ) {
            bestLink = link;
            break;
          }
        }
      }
      
      // Final fallback: just use the first link
      if (!bestLink && product.pdfLinks.length > 0) {
        bestLink = product.pdfLinks[0];
      }
      
      // Update product with the single best link
      if (bestLink) {
        const linksRemoved = product.pdfLinks.length - 1;
        product.pdfLinks = [bestLink];
        product.standardTdsLink = bestLink;
        
        productsOptimized++;
        totalLinksRemoved += linksRemoved;
        
        console.log(`  - ${product.id}: Keeping only 1/${originalLinkCount} links (removed ${linksRemoved})`);
      }
    }
    
    // Write updated data back to file
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    
    // Final statistics
    console.log('\n📊 Summary:');
    console.log(`   • Total products: ${products.length}`);
    console.log(`   • Products optimized: ${productsOptimized}`);
    console.log(`   • Total PDF links removed: ${totalLinksRemoved}`);
    console.log(`   • Products without PDF links: ${productsWithoutLinks}`);
    
    console.log('\n✅ PDF links have been optimized! Each product now has exactly one PDF link.');
    
  } catch (error) {
    console.error('❌ Error optimizing PDF links:', error);
  }
}

// Execute
optimizePdfLinks().catch(console.error);
