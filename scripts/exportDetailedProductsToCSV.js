#!/usr/bin/env node
/**
 * Export Detailed Products to CSV
 * 
 * This script creates a comprehensive CSV with all product data including:
 * - Basic product info (name, ID)
 * - Media (image URLs, PDFs)
 * - Classification (category, chemistry, industry, product type)
 * - Technical specs and HTML content
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Path configuration
const root = path.join(__dirname, '..');
const mergedProductsPath = path.join(root, 'src', 'data', 'productsMerged.json');
const tdsDir = path.join(root, 'public', 'TDS');
const outputPath = path.join(root, 'product_detailed_export.csv');

// Helper to escape CSV content correctly
function escapeCSV(str) {
  if (str === null || str === undefined) return '';
  // Handle non-string types
  if (typeof str !== 'string') {
    // For objects/arrays, convert to JSON string
    if (typeof str === 'object') {
      str = JSON.stringify(str);
    } else {
      str = String(str);
    }
  }
  // Replace double quotes with two double quotes and wrap in quotes
  return `"${str.replace(/"/g, '""')}"`;
}

// Find PDF files for a product by searching the TDS directory
function findPDFsForProduct(productId) {
  try {
    // Industry directories
    const industryDirs = [
      '1. Industrial',
      '2. Marine',
      '3. Transportation', 
      '4. Composites',
      '6. Insulation',
      '7. Construction'
    ];
    
    const pdfs = [];
    
    // Search for the product in each industry directory
    for (const industryDir of industryDirs) {
      const industryPath = path.join(tdsDir, industryDir);
      if (!fs.existsSync(industryPath)) continue;
      
      // Get product directories within the industry
      const items = fs.readdirSync(industryPath);
      
      for (const item of items) {
        // Check if the item folder name contains the product ID
        const lowerItem = item.toLowerCase();
        const lowerProductId = productId.toLowerCase();
        
        if (lowerItem.includes(lowerProductId) || 
            lowerProductId.includes(lowerItem.replace(/[^a-z0-9]/g, ''))) {
          
          const itemPath = path.join(industryPath, item);
          if (!fs.statSync(itemPath).isDirectory()) continue;
          
          // Look for PDFs in the item directory
          let tdsFiles = [];
          
          // Check if there's a TDS subdirectory
          const tdsSubdir = path.join(itemPath, 'TDS');
          if (fs.existsSync(tdsSubdir) && fs.statSync(tdsSubdir).isDirectory()) {
            tdsFiles = fs.readdirSync(tdsSubdir)
              .filter(f => f.endsWith('.pdf'))
              .map(f => `/TDS/${industryDir}/${item}/TDS/${f}`);
          } else {
            // Check for PDFs directly in the item directory
            tdsFiles = fs.readdirSync(itemPath)
              .filter(f => f.endsWith('.pdf'))
              .map(f => `/TDS/${industryDir}/${item}/${f}`);
          }
          
          // Add found PDFs to the list
          pdfs.push(...tdsFiles);
        }
      }
    }
    
    return pdfs;
  } catch (error) {
    console.error(`Error finding PDFs for ${productId}:`, error.message);
    return [];
  }
}

// Convert products to CSV format
function convertToCSV(products) {
  // Define headers
  const headers = [
    // Basic Info
    'ID', 'Name', 'Title', 'Description', 
    // Media
    'Image URL', 'PDF Links',
    // Classification
    'Category', 'Product Type', 'Chemistry', 'Chemistry Confidence', 'Industry',
    // Technical
    'Specifications', 'Technical Data',
    // Content
    'HTML Content'
  ];
  
  // Generate CSV rows
  const rows = [
    headers.join(','),
    ...products.map(product => {
      // Find PDFs for this product
      const pdfs = findPDFsForProduct(product.id);
      
      return [
        // Basic Info
        escapeCSV(product.id),
        escapeCSV(product.name || ''),
        escapeCSV(product.title || ''),
        escapeCSV(product.description || ''),
        
        // Media
        escapeCSV(product.mainImage || product.image || ''),
        escapeCSV(pdfs.join('; ')),
        
        // Classification
        escapeCSV(product.category || ''),
        escapeCSV(product.productType || ''),
        escapeCSV(product.chemistry || ''),
        escapeCSV(product.chemistryConfidence || ''),
        escapeCSV(product.industry || ''),
        
        // Technical
        escapeCSV(product.specifications || ''),
        escapeCSV(product.technicalData || ''),
        
        // Content
        escapeCSV(product.html || '')
      ].join(',');
    })
  ];
  
  return rows.join('\n');
}

// Main function to export products
async function exportProductsToCSV() {
  console.log('🔍 Reading product data...');

  try {
    // Load products data
    const productsRaw = fs.readFileSync(mergedProductsPath, 'utf8');
    const products = JSON.parse(productsRaw);
    
    console.log(`✅ Found ${products.length} products`);
    
    // Show a sample of one product
    console.log('\n📋 Sample product data:');
    const sample = products[0];
    console.log(`  - ID: ${sample.id}`);
    console.log(`  - Name: ${sample.title || sample.name}`);
    console.log(`  - Chemistry: ${sample.chemistry || 'Not specified'}`);
    
    // Convert to CSV
    console.log('\n🔍 Collecting PDF data for products...');
    const csv = convertToCSV(products);
    
    // Write to file
    fs.writeFileSync(outputPath, csv);
    
    console.log(`\n📝 CSV file written to: ${outputPath}`);
    console.log(`🔢 Total products exported: ${products.length}`);
    
    // Print statistics
    const chemistryCount = {};
    const productTypeCount = {};
    const industryCount = {};
    
    products.forEach(product => {
      if (product.chemistry) {
        chemistryCount[product.chemistry] = (chemistryCount[product.chemistry] || 0) + 1;
      }
      if (product.productType) {
        productTypeCount[product.productType] = (productTypeCount[product.productType] || 0) + 1;
      }
      if (product.industry) {
        industryCount[product.industry] = (industryCount[product.industry] || 0) + 1;
      }
    });
    
    console.log('\n📊 Chemistry breakdown:');
    Object.entries(chemistryCount)
      .sort((a, b) => b[1] - a[1])
      .forEach(([chemistry, count]) => {
        console.log(`  - ${chemistry}: ${count} products`);
      });
      
    console.log('\n📊 Product Type breakdown:');
    Object.entries(productTypeCount)
      .sort((a, b) => b[1] - a[1])
      .forEach(([type, count]) => {
        console.log(`  - ${type}: ${count} products`);
      });
      
    console.log('\n📊 Industry breakdown:');
    Object.entries(industryCount)
      .sort((a, b) => b[1] - a[1])
      .forEach(([industry, count]) => {
        console.log(`  - ${industry}: ${count} products`);
      });
      
    // Try to open the file
    console.log('\n✅ CSV export complete.');
    console.log(`📂 File location: ${outputPath}`);
    try {
      console.log('Attempting to open the file with the default application...');
      if (process.platform === 'win32') {
        execSync(`start "" "${outputPath}"`);
      } else if (process.platform === 'darwin') {
        execSync(`open "${outputPath}"`);
      } else {
        execSync(`xdg-open "${outputPath}"`);
      }
    } catch (error) {
      console.log('Could not open the file automatically. Please open it manually.');
    }
      
  } catch (error) {
    console.error('❌ Error exporting products:', error);
  }
}

// Execute
exportProductsToCSV();