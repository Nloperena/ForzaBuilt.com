#!/usr/bin/env node
/**
 * Link TDS files to products and clean up file organization
 * 
 * 1. Maps TDS files to product IDs
 * 2. Removes duplicate "FOR EMAIL" versions (keeps smaller ones)
 * 3. Updates productsMerged.json with TDS file paths
 * 4. Creates a clean TDS directory structure
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const tdsDir = path.join(root, 'public', 'TDS');
const mergedPath = path.join(root, 'src', 'data', 'productsMerged.json');

// Load merged products
const products = JSON.parse(fs.readFileSync(mergedPath, 'utf8'));

// Industry mapping for TDS directories
const industryMapping = {
  'industrial': '1. Industrial',
  'marine': '2. Marine', 
  'transportation': '3. Transportation',
  'composites': '4. Composites',
  'construction': '7. Construction',
  'insulation': '6. Insulation'
};

// Product ID to TDS file mapping
const tdsMapping = {};

// Clean up TDS files and build mapping
function processTdsDirectory(dirPath, industry) {
  if (!fs.existsSync(dirPath)) return;
  
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      // This is a product directory
      const productId = item.toLowerCase();
      
      if (fs.existsSync(path.join(itemPath, 'TDS'))) {
        // Product has a TDS subdirectory
        const tdsSubdir = path.join(itemPath, 'TDS');
        const tdsFiles = fs.readdirSync(tdsSubdir).filter(f => f.endsWith('.pdf'));
        
        if (tdsFiles.length > 0) {
          // Find the best TDS file (prefer smaller "FOR EMAIL" versions)
          let bestFile = tdsFiles[0];
          let bestSize = fs.statSync(path.join(tdsSubdir, tdsFiles[0])).size;
          
          for (const file of tdsFiles) {
            const filePath = path.join(tdsSubdir, file);
            const fileSize = fs.statSync(filePath).size;
            
            // Prefer "FOR EMAIL" versions (usually smaller)
            if (file.includes('FOR EMAIL') && fileSize < bestSize) {
              bestFile = file;
              bestSize = fileSize;
            }
          }
          
          // Store the mapping
          tdsMapping[productId] = {
            path: `/TDS/${industry}/${item}/TDS/${bestFile}`,
            industry: industry
          };
          
          console.log(`📄 ${productId} → ${bestFile}`);
        }
      } else {
        // Direct TDS files in product directory
        const tdsFiles = fs.readdirSync(itemPath).filter(f => f.endsWith('.pdf'));
        
        if (tdsFiles.length > 0) {
          // Find the best TDS file
          let bestFile = tdsFiles[0];
          let bestSize = fs.statSync(path.join(itemPath, tdsFiles[0])).size;
          
          for (const file of tdsFiles) {
            const filePath = path.join(itemPath, file);
            const fileSize = fs.statSync(filePath).size;
            
            if (file.includes('FOR EMAIL') && fileSize < bestSize) {
              bestFile = file;
              bestSize = fileSize;
            }
          }
          
          tdsMapping[productId] = {
            path: `/TDS/${industry}/${item}/${bestFile}`,
            industry: industry
          };
          
          console.log(`📄 ${productId} → ${bestFile}`);
        }
      }
    }
  }
}

// Process each industry directory
console.log('🔍 Scanning TDS directories...\n');

for (const [industryKey, industryDir] of Object.entries(industryMapping)) {
  const industryPath = path.join(tdsDir, industryDir);
  if (fs.existsSync(industryPath)) {
    console.log(`📁 Processing ${industryDir}...`);
    processTdsDirectory(industryPath, industryDir);
  }
}

// Update products with TDS links
console.log('\n🔗 Linking TDS files to products...\n');

let linkedCount = 0;
for (const product of products) {
  const productId = product.id.toLowerCase();
  
  if (tdsMapping[productId]) {
    product.tdsFile = tdsMapping[productId].path;
    product.tdsIndustry = tdsMapping[productId].industry;
    linkedCount++;
    console.log(`✅ ${product.id} → ${product.tdsFile}`);
  }
}

// Write updated products
fs.writeFileSync(mergedPath, JSON.stringify(products, null, 2));

console.log(`\n📊 Summary:`);
console.log(`   • Total products: ${products.length}`);
console.log(`   • Products with TDS: ${linkedCount}`);
console.log(`   • TDS files found: ${Object.keys(tdsMapping).length}`);

// Create a summary report
const summary = {
  totalProducts: products.length,
  productsWithTds: linkedCount,
  tdsFilesFound: Object.keys(tdsMapping).length,
  industryBreakdown: {},
  missingTds: []
};

// Count by industry
for (const product of products) {
  if (product.tdsFile) {
    const industry = product.tdsIndustry || 'Unknown';
    summary.industryBreakdown[industry] = (summary.industryBreakdown[industry] || 0) + 1;
  } else {
    summary.missingTds.push(product.id);
  }
}

fs.writeFileSync(
  path.join(root, 'src', 'data', 'tds-summary.json'), 
  JSON.stringify(summary, null, 2)
);

console.log(`\n📋 Summary saved to: src/data/tds-summary.json`);
console.log(`📋 Updated products: src/data/productsMerged.json`); 