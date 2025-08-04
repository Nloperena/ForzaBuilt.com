#!/usr/bin/env node
/**
 * Check Products File
 * This script checks if the products file can be read and parsed
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const mergedPath = path.join(root, 'src', 'data', 'productsMerged.json');

console.log(`Checking products file at ${mergedPath}`);

try {
  // Check if file exists
  if (fs.existsSync(mergedPath)) {
    console.log('File exists.');
    
    // Check file size
    const stats = fs.statSync(mergedPath);
    const fileSizeMB = stats.size / 1024 / 1024;
    console.log(`File size: ${fileSizeMB.toFixed(2)} MB`);
    
    // Try to read the file
    const data = fs.readFileSync(mergedPath, 'utf8');
    console.log(`Read ${data.length} characters`);
    
    // Try to parse the first 1000 characters to check validity
    try {
      // Look for closing bracket at end of file to check if it's complete
      if (data.trim().endsWith(']')) {
        console.log('File appears to be a complete JSON array.');
        
        // Try to parse the entire file
        const products = JSON.parse(data);
        console.log(`Successfully parsed ${products.length} products.`);
        
        // Check for chemistry field
        const withChemistry = products.filter(p => p.chemistry).length;
        console.log(`Products with chemistry: ${withChemistry}`);
        
        // Sample the first 3 products
        console.log('\nSample products:');
        products.slice(0, 3).forEach((p, i) => {
          console.log(`Product ${i+1}: ${p.id}, Chemistry: ${p.chemistry}, Type: ${p.productType}`);
        });
      } else {
        console.log('Warning: File does not appear to end with a closing bracket. Might be incomplete.');
      }
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError.message);
    }
  } else {
    console.log('File does not exist');
  }
} catch (error) {
  console.error('Error checking products file:', error);
}