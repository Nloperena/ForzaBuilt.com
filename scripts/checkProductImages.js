#!/usr/bin/env node
/**
 * Analyze product images in productsSimplified.json
 */

const fs = require('fs');
const path = require('path');

const simplifiedPath = path.join(__dirname, '..', 'src', 'data', 'productsSimplified.json');

try {
  // Load data
  console.log('Reading products data...');
  const data = JSON.parse(fs.readFileSync(simplifiedPath, 'utf8'));
  const products = data.products;
  
  console.log(`Total products: ${products.length}`);
  
  // Count products with and without images
  const withImages = products.filter(p => p.imageUrl && p.imageUrl.trim() !== '');
  const withoutImages = products.filter(p => !p.imageUrl || p.imageUrl.trim() === '');
  
  console.log(`Products with images: ${withImages.length}`);
  console.log(`Products without images: ${withoutImages.length}`);
  
  if (withoutImages.length > 0) {
    console.log('\nProducts without images:');
    withoutImages.forEach(p => {
      console.log(`- ${p.id}: ${p.name}`);
    });
  }
  
  // Show sample of image URLs
  console.log('\nSample image URLs:');
  withImages.slice(0, 5).forEach(p => {
    console.log(`- ${p.id}: ${p.imageUrl}`);
  });
  
} catch (error) {
  console.error('Error:', error);
}
