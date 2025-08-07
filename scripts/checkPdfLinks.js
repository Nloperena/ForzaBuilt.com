#!/usr/bin/env node
/**
 * Check PDF links in products data
 */

const fs = require('fs');
const path = require('path');

const simplifiedPath = path.join(__dirname, '..', 'src', 'data', 'productsSimplified.json');

// Main function
function checkPdfLinks() {
  try {
    console.log('Reading products data...');
    const data = JSON.parse(fs.readFileSync(simplifiedPath, 'utf8'));
    const products = data.products;
    
    console.log(`Total products: ${products.length}`);
    
    // Count products with PDF links
    const withLinks = products.filter(p => p.pdfLinks && p.pdfLinks.length > 0);
    console.log(`Products with PDF links: ${withLinks.length}`);
    console.log(`Products without PDF links: ${products.length - withLinks.length}`);
    
    // Find products with multiple links
    const multipleLinks = withLinks.filter(p => p.pdfLinks.length > 1);
    console.log(`Products with multiple PDF links: ${multipleLinks.length}`);
    
    if (multipleLinks.length > 0) {
      console.log('Products still having multiple links:');
      multipleLinks.forEach(p => {
        console.log(`- ${p.id}: ${p.pdfLinks.length} links`);
        console.log(`  ${p.pdfLinks.join('\n  ')}`);
      });
    }
    
    // Find products where standardTdsLink doesn't match the first pdfLink
    const mismatchedStandard = withLinks.filter(p => p.standardTdsLink !== p.pdfLinks[0]);
    console.log(`\nProducts with mismatched standardTdsLink: ${mismatchedStandard.length}`);
    
    if (mismatchedStandard.length > 0) {
      console.log('Products with mismatched standardTdsLink:');
      mismatchedStandard.forEach(p => {
        console.log(`- ${p.id}`);
        console.log(`  Standard: ${p.standardTdsLink}`);
        console.log(`  PDF Link: ${p.pdfLinks[0]}`);
      });
    }
    
    // Check FOR EMAIL status
    const forEmailLinks = withLinks.filter(p => 
      p.pdfLinks && p.pdfLinks[0] && p.pdfLinks[0].includes('FOR EMAIL')
    );
    
    console.log(`\nProducts with "FOR EMAIL" PDFs: ${forEmailLinks.length} (${Math.round(forEmailLinks.length/withLinks.length*100)}%)`);
    console.log(`Products without "FOR EMAIL" PDFs: ${withLinks.length - forEmailLinks.length} (${Math.round((withLinks.length - forEmailLinks.length)/withLinks.length*100)}%)`);
    
    // Log a few examples of products without FOR EMAIL PDFs
    if (withLinks.length - forEmailLinks.length > 0) {
      console.log('\nSample of products without FOR EMAIL PDFs:');
      const nonForEmailLinks = withLinks.filter(p => 
        p.pdfLinks && p.pdfLinks[0] && !p.pdfLinks[0].includes('FOR EMAIL')
      );
      
      nonForEmailLinks.slice(0, 10).forEach(p => {
        console.log(`- ${p.id}: ${p.pdfLinks[0]}`);
      });
    }
    
    // Sample of products to verify
    const sampleSize = 5;
    console.log(`\nRandom sample of ${sampleSize} products with PDF links:`);
    
    // Get evenly distributed indices
    const step = Math.floor(withLinks.length / sampleSize);
    const indices = Array.from({length: sampleSize}, (_, i) => i * step);
    
    indices.forEach(index => {
      const product = withLinks[index];
      console.log(`\n- ${product.id} (${product.name}):`);
      console.log(`  PDF: ${product.pdfLinks[0]}`);
      console.log(`  Standard: ${product.standardTdsLink}`);
      console.log(`  FOR EMAIL: ${product.pdfLinks[0].includes('FOR EMAIL') ? 'Yes' : 'No'}`);
    });

    // Check a few specific products
    const specificProductIds = ['os2', 'os24', 'ca1000', 'r160'];
    console.log('\nChecking specific products:');
    
    specificProductIds.forEach(id => {
      const product = products.find(p => p.id === id);
      if (product) {
        console.log(`\n- ${product.id} (${product.name}):`);
        console.log(`  PDF Links: ${product.pdfLinks ? product.pdfLinks.length : 0}`);
        if (product.pdfLinks && product.pdfLinks.length > 0) {
          console.log(`  PDF: ${product.pdfLinks[0]}`);
          console.log(`  Standard: ${product.standardTdsLink}`);
          console.log(`  FOR EMAIL: ${product.pdfLinks[0].includes('FOR EMAIL') ? 'Yes' : 'No'}`);
        } else {
          console.log('  No PDF links found');
        }
      } else {
        console.log(`\n- ${id}: Product not found`);
      }
    });
    
    console.log('\nAnalysis complete!');
    
  } catch (error) {
    console.error('Error checking PDF links:', error);
    console.error(error.stack);
  }
}

// Execute
checkPdfLinks();