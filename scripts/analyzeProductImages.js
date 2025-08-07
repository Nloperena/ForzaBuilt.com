#!/usr/bin/env node
/**
 * Analyze product images in productsSimplified.json
 * - Check for products with missing images
 * - Analyze image URL patterns
 */

const fs = require('fs');
const path = require('path');

const simplifiedPath = path.join(__dirname, '..', 'src', 'data', 'productsSimplified.json');

// Main function
function analyzeProductImages() {
  try {
    console.log('Reading products data...');
    const data = JSON.parse(fs.readFileSync(simplifiedPath, 'utf8'));
    const products = data.products;
    
    console.log(`Total products: ${products.length}`);
    
    // Count products with image URLs
    const withImages = products.filter(p => p.imageUrl && p.imageUrl.trim() !== '');
    const withoutImages = products.filter(p => !p.imageUrl || p.imageUrl.trim() === '');
    
    console.log(`Products with images: ${withImages.length} (${Math.round(withImages.length/products.length*100)}%)`);
    console.log(`Products without images: ${withoutImages.length} (${Math.round(withoutImages.length/products.length*100)}%)`);
    
    // Analyze URL patterns
    const urlPatterns = {};
    const fileExtensions = {};
    const uniqueDomains = new Set();
    
    withImages.forEach(product => {
      try {
        const url = new URL(product.imageUrl);
        const domain = url.hostname;
        const pathname = url.pathname;
        
        uniqueDomains.add(domain);
        
        const patternKey = domain;
        urlPatterns[patternKey] = (urlPatterns[patternKey] || 0) + 1;
        
        // Get file extension
        const extension = path.extname(pathname).toLowerCase();
        if (extension) {
          fileExtensions[extension] = (fileExtensions[extension] || 0) + 1;
        }
      } catch (error) {
        console.log(`Invalid URL for product ${product.id}: ${product.imageUrl}`);
      }
    });
    
    console.log('\nImage domains:');
    console.log(Array.from(uniqueDomains).join(', '));
    
    console.log('\nDomain counts:');
    Object.entries(urlPatterns)
      .sort((a, b) => b[1] - a[1])
      .forEach(([pattern, count]) => {
        console.log(`${pattern}: ${count} images (${Math.round(count/withImages.length*100)}%)`);
      });
    
    console.log('\nFile extensions:');
    Object.entries(fileExtensions)
      .sort((a, b) => b[1] - a[1])
      .forEach(([ext, count]) => {
        console.log(`${ext}: ${count} images (${Math.round(count/withImages.length*100)}%)`);
      });
    
    // Analyze file naming patterns
    console.log('\nFile naming patterns (sample):');
    const fileNameSamples = withImages
      .slice(0, 10)
      .map(product => {
        try {
          const url = new URL(product.imageUrl);
          const pathname = url.pathname;
          const fileName = path.basename(pathname);
          return { id: product.id, fileName };
        } catch (error) {
          return { id: product.id, fileName: 'Invalid URL' };
        }
      });
    
    fileNameSamples.forEach(sample => {
      console.log(`${sample.id}: ${sample.fileName}`);
    });
    
    // List products without images
    console.log('\nProducts without images:');
    withoutImages.forEach(product => {
      console.log(`- ${product.id}: ${product.name}`);
    });
    
    console.log('\nAnalysis complete!');
  } catch (error) {
    console.error('Error analyzing product images:', error);
    console.error(error.stack);
  }
}

// Execute
analyzeProductImages();
