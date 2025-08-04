#!/usr/bin/env node
/**
 * Export Products to CSV
 * 
 * This script extracts product data and exports it as a CSV file with:
 * - Image URL
 * - PDF link
 * - Product category
 * - Chemistry
 * - Industry
 * - HTML content
 */

const fs = require('fs');
const path = require('path');

// Path configuration
const root = path.join(__dirname, '..');
const mergedProductsPath = path.join(root, 'src', 'data', 'productsMerged.json');
const outputPath = path.join(root, 'product_export.csv');

// CSV helpers
function escapeCSV(str) {
  if (!str) return '';
  // Replace double quotes with two double quotes and wrap in quotes
  return `"${String(str).replace(/"/g, '""')}"`;
}

function convertToCSV(data) {
  const header = [
    'ID',
    'Name',
    'Image URL', 
    'PDF Link',
    'Category',
    'Product Type',
    'Chemistry', 
    'Chemistry Confidence',
    'Industry',
    'HTML Content'
  ];
  
  const rows = [
    header.join(','),
    ...data.map(item => [
      escapeCSV(item.id),
      escapeCSV(item.title || item.name),
      escapeCSV(item.mainImage || item.image),
      escapeCSV(item.url),
      escapeCSV(item.category),
      escapeCSV(item.productType),
      escapeCSV(item.chemistry),
      escapeCSV(item.chemistryConfidence),
      escapeCSV(item.industry),
      escapeCSV(item.html)
    ].join(','))
  ];
  
  return rows.join('\n');
}

// Main function
async function exportProductsToCSV() {
  console.log('🔍 Reading product data...');

  try {
    // Load products data
    const productsRaw = fs.readFileSync(mergedProductsPath, 'utf8');
    const products = JSON.parse(productsRaw);
    
    console.log(`✅ Found ${products.length} products`);
    
    // Convert to CSV
    const csv = convertToCSV(products);
    
    // Write to file
    fs.writeFileSync(outputPath, csv);
    
    console.log(`📝 CSV file written to: ${outputPath}`);
    console.log(`🔢 Total products exported: ${products.length}`);
    
    // Print sample counts
    const chemistryCount = {};
    products.forEach(product => {
      if (product.chemistry) {
        chemistryCount[product.chemistry] = (chemistryCount[product.chemistry] || 0) + 1;
      }
    });
    
    console.log('\n📊 Chemistry breakdown:');
    Object.entries(chemistryCount)
      .sort((a, b) => b[1] - a[1])
      .forEach(([chemistry, count]) => {
        console.log(`  - ${chemistry}: ${count} products`);
      });
      
  } catch (error) {
    console.error('❌ Error exporting products:', error);
  }
}

// Execute
exportProductsToCSV();