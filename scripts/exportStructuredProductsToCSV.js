#!/usr/bin/env node
/**
 * Export Structured Products to CSV
 * 
 * This script creates a comprehensive CSV with structured product data:
 * - Basic info (name, ID)
 * - Media (images, PDFs)
 * - Classification (category, chemistry, industry, product type)
 * - Extracts structured content from HTML (descriptions, sizing, how to use, etc.)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Path configuration
const root = path.join(__dirname, '..');
const mergedProductsPath = path.join(root, 'src', 'data', 'productsMerged.json');
const tdsDir = path.join(root, 'public', 'TDS');
const outputPath = path.join(root, 'product_structured_export.csv');

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

// Extract structured content from HTML
function extractStructuredContent(html) {
  if (!html) return {};
  
  // Define patterns for common content sections
  const patterns = {
    description: [
      /<h\d[^>]*>(?:description|overview|about this product)[^<]*<\/h\d>(.*?)(?:<h\d|<div class="[^"]*heading|$)/i,
      /<div[^>]*class="[^"]*description[^"]*"[^>]*>(.*?)(?:<\/div>|$)/i,
      /<p[^>]*class="[^"]*description[^"]*"[^>]*>(.*?)(?:<\/p>|$)/i
    ],
    
    features: [
      /<h\d[^>]*>(?:features|key features|product features)[^<]*<\/h\d>(.*?)(?:<h\d|<div class="[^"]*heading|$)/i,
      /<div[^>]*class="[^"]*features[^"]*"[^>]*>(.*?)(?:<\/div>|$)/i,
      /<ul[^>]*class="[^"]*features[^"]*"[^>]*>(.*?)(?:<\/ul>|$)/i
    ],
    
    applications: [
      /<h\d[^>]*>(?:applications|uses|suitable for)[^<]*<\/h\d>(.*?)(?:<h\d|<div class="[^"]*heading|$)/i,
      /<div[^>]*class="[^"]*applications[^"]*"[^>]*>(.*?)(?:<\/div>|$)/i,
      /<ul[^>]*class="[^"]*applications[^"]*"[^>]*>(.*?)(?:<\/ul>|$)/i
    ],
    
    howToUse: [
      /<h\d[^>]*>(?:how to use|directions|instructions|usage)[^<]*<\/h\d>(.*?)(?:<h\d|<div class="[^"]*heading|$)/i,
      /<div[^>]*class="[^"]*directions[^"]*"[^>]*>(.*?)(?:<\/div>|$)/i,
      /<ol[^>]*class="[^"]*instructions[^"]*"[^>]*>(.*?)(?:<\/ol>|$)/i
    ],
    
    sizing: [
      /<h\d[^>]*>(?:sizing|sizes|dimensions|available sizes)[^<]*<\/h\d>(.*?)(?:<h\d|<div class="[^"]*heading|$)/i,
      /<div[^>]*class="[^"]*sizing[^"]*"[^>]*>(.*?)(?:<\/div>|$)/i,
      /<ul[^>]*class="[^"]*sizes[^"]*"[^>]*>(.*?)(?:<\/ul>|$)/i
    ],
    
    specifications: [
      /<h\d[^>]*>(?:specifications|specs|technical specs|technical data)[^<]*<\/h\d>(.*?)(?:<h\d|<div class="[^"]*heading|$)/i,
      /<div[^>]*class="[^"]*specifications[^"]*"[^>]*>(.*?)(?:<\/div>|$)/i,
      /<table[^>]*class="[^"]*specs[^"]*"[^>]*>(.*?)(?:<\/table>|$)/i
    ]
  };
  
  const result = {};
  
  // Try to extract each content type
  for (const [contentType, regexPatterns] of Object.entries(patterns)) {
    for (const pattern of regexPatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        // Clean up the extracted content
        let content = match[1]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')  // Remove scripts
          .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')     // Remove styles
          .trim();
          
        // Extract text from list items if it's a list
        if (content.includes('<li>')) {
          const listItems = [];
          const liRegex = /<li[^>]*>(.*?)<\/li>/gi;
          let liMatch;
          
          while (liMatch = liRegex.exec(content)) {
            let itemText = liMatch[1].replace(/<[^>]+>/g, ' ').trim();
            if (itemText) {
              listItems.push(itemText);
            }
          }
          
          if (listItems.length > 0) {
            content = listItems.join('; ');
          }
        } else {
          // Remove HTML tags for plain text
          content = content.replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        }
        
        result[contentType] = content;
        break; // Stop after first successful match for this content type
      }
    }
  }
  
  return result;
}

// Convert products to CSV format with structured content
function convertToCSV(products) {
  // Define headers
  const headers = [
    // Basic Info
    'ID', 'Name', 'Title', 'Description', 
    // Media
    'Image URL', 'PDF Links',
    // Classification
    'Category', 'Product Type', 'Chemistry', 'Chemistry Confidence', 'Industry',
    // Structured Content
    'Extracted Description', 'Features', 'Applications', 'How To Use', 'Sizing', 'Specifications',
    // Technical Data
    'Technical Data'
  ];
  
  // Generate CSV rows
  const rows = [
    headers.join(','),
    ...products.map(product => {
      // Find PDFs for this product
      const pdfs = findPDFsForProduct(product.id);
      
      // Extract structured content from HTML
      const structuredContent = extractStructuredContent(product.html || '');
      
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
        
        // Structured Content
        escapeCSV(structuredContent.description || ''),
        escapeCSV(structuredContent.features || ''),
        escapeCSV(structuredContent.applications || ''),
        escapeCSV(structuredContent.howToUse || ''),
        escapeCSV(structuredContent.sizing || ''),
        escapeCSV(structuredContent.specifications || ''),
        
        // Technical Data
        escapeCSV(product.technicalData || '')
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
    
    // Convert to CSV with structured content
    console.log('\n🔄 Processing HTML content and extracting structured data...');
    const csv = convertToCSV(products);
    
    // Write to file
    fs.writeFileSync(outputPath, csv);
    
    console.log(`\n📝 Structured CSV file written to: ${outputPath}`);
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
      
    // Try to open the file
    console.log('\n✅ Structured CSV export complete.');
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