#!/usr/bin/env node
/**
 * Export Complete Products to CSV
 * 
 * This script creates the most comprehensive CSV with all product data:
 * - Merges data from multiple sources (merged products & chemistry table)
 * - Uses specifications and technical data as structured content
 * - Organizes information for better use in spreadsheets
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Path configuration
const root = path.join(__dirname, '..');
const mergedProductsPath = path.join(root, 'src', 'data', 'productsMerged.json');
const chemistryTablePath = path.join(root, 'public', 'TDS', 'chemistry_table.md');
const tdsDir = path.join(root, 'public', 'TDS');
const outputPath = path.join(root, 'product_complete_export.csv');

// Helper to escape CSV content correctly
function escapeCSV(str) {
  if (str === null || str === undefined) return '';
  
  // Handle non-string types
  if (typeof str !== 'string') {
    // For objects/arrays, convert to JSON string
    if (typeof str === 'object') {
      try {
        str = JSON.stringify(str);
      } catch (e) {
        str = String(str);
      }
    } else {
      str = String(str);
    }
  }
  
  // Replace double quotes with two double quotes and wrap in quotes
  return `"${str.replace(/"/g, '""')}"`;
}

// Find PDF files for a product
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

// Parse chemistry table from MD file
function parseChemistryTable() {
  try {
    if (!fs.existsSync(chemistryTablePath)) {
      console.log('Chemistry table not found. Skipping chemistry data integration.');
      return {};
    }
    
    const tableContent = fs.readFileSync(chemistryTablePath, 'utf8');
    const lines = tableContent.split('\n');
    
    // Find table rows (skip header, separator, and summary)
    const tableRows = lines.filter(line => line.startsWith('|') && !line.startsWith('| -') && !line.includes('Summary Statistics'));
    
    // Parse rows into objects
    const chemistryData = {};
    
    for (const row of tableRows) {
      if (!row.includes('|')) continue;
      
      const columns = row.split('|').map(col => col.trim()).filter(Boolean);
      if (columns.length < 7) continue;
      
      const [productId, productName, productCode, productType, category, chemistryType, confidence] = columns;
      
      // Extract the actual code without category prefix
      const code = productCode.split(' ').pop();
      
      chemistryData[code.toLowerCase()] = {
        fullProductId: productId,
        productName,
        productCode,
        productType,
        category,
        chemistryType,
        confidence
      };
    }
    
    return chemistryData;
  } catch (error) {
    console.error('Error parsing chemistry table:', error.message);
    return {};
  }
}

// Extract structured content from specifications and technical data
function extractStructuredContent(product) {
  const result = {
    description: product.description || '',
    features: [],
    applications: [],
    howToUse: [],
    sizing: [],
    specifications: [],
    technicalDetails: []
  };
  
  // Extract from specifications
  if (product.specifications) {
    // Features
    if (Array.isArray(product.specifications.features)) {
      result.features = product.specifications.features;
    }
    
    // Applications
    if (Array.isArray(product.specifications.applications)) {
      result.applications = product.specifications.applications;
    }
    
    // Extract other specifications
    const specEntries = Object.entries(product.specifications);
    for (const [key, value] of specEntries) {
      if (!['features', 'applications', 'substrates', 'certifications', 'packaging'].includes(key) && 
          typeof value === 'string') {
        result.specifications.push(`${key}: ${value}`);
      }
    }
    
    // Substrates
    if (Array.isArray(product.specifications.substrates)) {
      result.specifications.push(`Compatible with: ${product.specifications.substrates.join(', ')}`);
    }
  }
  
  // Extract from technical data
  if (product.technicalData) {
    const techEntries = Object.entries(product.technicalData);
    for (const [key, value] of techEntries) {
      result.technicalDetails.push(`${key}: ${value}`);
    }
  }
  
  return result;
}

// Convert products to CSV format with structured content
function convertToCSV(products, chemistryData) {
  // Define headers
  const headers = [
    // Basic Info
    'ID', 'Name', 'Title',
    // Category and Type Info
    'Category', 'Product Type', 'Chemistry', 'Chemistry Confidence', 'Industry',
    // Description and Features
    'Description', 'Features', 'Applications',
    // Technical Information
    'Specifications', 'Technical Details',
    // Media
    'Image URL', 'PDF Links'
  ];
  
  // Generate CSV rows
  const rows = [
    headers.join(','),
    ...products.map(product => {
      // Find PDFs for this product
      const pdfs = findPDFsForProduct(product.id);
      
      // Extract structured content
      const structuredContent = extractStructuredContent(product);
      
      // Check chemistry data from the chemistry table
      let chemistryInfo = null;
      const productCode = product.productCode || product.id;
      
      // Try multiple ways to find chemistry info
      if (chemistryData[productCode.toLowerCase()]) {
        chemistryInfo = chemistryData[productCode.toLowerCase()];
      } else {
        // Try to match on product ID
        const code = product.id.replace(/[^a-z0-9]/g, '').toLowerCase();
        for (const [key, info] of Object.entries(chemistryData)) {
          if (key.includes(code) || code.includes(key)) {
            chemistryInfo = info;
            break;
          }
        }
      }
      
      // Use chemistry from table if available, otherwise use the product data
      const chemistry = chemistryInfo?.chemistryType || product.chemistry || '';
      const chemistryConfidence = chemistryInfo?.confidence || product.chemistryConfidence || '';
      
      return [
        // Basic Info
        escapeCSV(product.id),
        escapeCSV(product.name || ''),
        escapeCSV(product.title || ''),
        
        // Category and Type Info
        escapeCSV(product.category || ''),
        escapeCSV(product.productType || chemistryInfo?.productType || ''),
        escapeCSV(chemistry),
        escapeCSV(chemistryConfidence),
        escapeCSV(product.industry || ''),
        
        // Description and Features
        escapeCSV(structuredContent.description),
        escapeCSV(structuredContent.features.join('; ')),
        escapeCSV(structuredContent.applications.join('; ')),
        
        // Technical Information
        escapeCSV(structuredContent.specifications.join('; ')),
        escapeCSV(structuredContent.technicalDetails.join('; ')),
        
        // Media
        escapeCSV(product.mainImage || product.image || ''),
        escapeCSV(pdfs.join('; '))
      ].join(',');
    })
  ];
  
  return rows.join('\n');
}

// Main function to export products
async function exportProductsToCSV() {
  console.log('🔍 Reading product data and chemistry information...');

  try {
    // Load products data
    const productsRaw = fs.readFileSync(mergedProductsPath, 'utf8');
    const products = JSON.parse(productsRaw);
    
    // Load chemistry data
    const chemistryData = parseChemistryTable();
    
    console.log(`✅ Found ${products.length} products`);
    console.log(`✅ Found chemistry data for ${Object.keys(chemistryData).length} products`);
    
    // Convert to CSV with structured content
    console.log('\n🔄 Processing data and creating CSV file...');
    const csv = convertToCSV(products, chemistryData);
    
    // Write to file
    fs.writeFileSync(outputPath, csv);
    
    console.log(`\n📝 Complete CSV file written to: ${outputPath}`);
    console.log(`🔢 Total products exported: ${products.length}`);
    
    // Print statistics
    const chemistryCount = {};
    const productTypeCount = {};
    
    products.forEach(product => {
      if (product.chemistry) {
        chemistryCount[product.chemistry] = (chemistryCount[product.chemistry] || 0) + 1;
      }
      if (product.productType) {
        productTypeCount[product.productType] = (productTypeCount[product.productType] || 0) + 1;
      }
    });
    
    console.log('\n📊 Chemistry breakdown:');
    Object.entries(chemistryCount)
      .sort((a, b) => b[1] - a[1])
      .forEach(([chemistry, count]) => {
        console.log(`  - ${chemistry}: ${count} products`);
      });
      
    // Try to open the file
    console.log('\n✅ Complete CSV export finished successfully.');
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