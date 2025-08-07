const fs = require('fs');
const path = require('path');

// Paths
const tdsDir = path.join(__dirname, '..', 'public', 'TDS');
const dataPath = path.join(__dirname, '..', 'src', 'data', 'productsWithTdsLinks.json');

// Function to organize PDFs based on filename analysis
async function organizeTdsByFilename() {
  console.log('Starting TDS organization based on filenames...');
  
  try {
    // Read product data
    const productsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const products = productsData.products;
    
    // Create a map of product IDs for quick lookup
    const productMap = new Map();
    products.forEach(product => {
      // Store in map using lowercase ID for case-insensitive matching
      productMap.set(product.id.toLowerCase(), product);
      
      // Also add alternate cross-reference IDs for products that have equivalent names in different industries
      // Example: IC933 can also be found as MC723 in Marine industry
      const tdsLinks = product.pdfLinks || [];
      tdsLinks.forEach(link => {
        const match = link.match(/\/([A-Za-z]+-?[0-9]+)(?:\s*\(([A-Za-z]+-?[0-9]+)\))?\/TDS\//i);
        if (match && match[2] && match[2].toLowerCase() !== product.id.toLowerCase()) {
          // Store cross-reference mapping
          productMap.set(match[2].toLowerCase(), product);
        }
      });
    });
    
    // Find all PDF files in TDS directory
    const pdfFiles = findPdfFiles(tdsDir);
    console.log(`Found ${pdfFiles.length} PDF files`);
    
    // Track results
    const results = {
      analyzed: 0,
      misplaced: [],
      moved: [],
      updated: [],
      errors: []
    };
    
    // Process each PDF file
    for (const pdfFile of pdfFiles) {
      try {
        results.analyzed++;
        
        // Extract basic info from file path
        const relativePath = path.relative(path.join(__dirname, '..', 'public'), pdfFile).replace(/\\/g, '/');
        const fileName = path.basename(pdfFile);
        const pathParts = relativePath.split('/');
        
        // Skip PDFs in root or unexpected locations
        if (pathParts.length < 4) continue;
        
        // Extract folder info
        const industry = pathParts[1]; // e.g., "1. Industrial"
        const productFolder = pathParts[2]; // e.g., "IC933"
        
        // Try to extract product ID from filename and/or folder
        const fileProductId = extractProductIdFromFileName(fileName);
        const folderProductId = extractProductIdFromFolder(productFolder);
        
        // First check for folder ID match
        let matchedProduct;
        if (folderProductId && productMap.has(folderProductId.toLowerCase())) {
          matchedProduct = productMap.get(folderProductId.toLowerCase());
        } 
        // Then check for filename ID match if folder didn't match
        else if (fileProductId && productMap.has(fileProductId.toLowerCase())) {
          matchedProduct = productMap.get(fileProductId.toLowerCase());
        }
        
        // If we can't match to any product, skip
        if (!matchedProduct) {
          console.log(`Cannot match ${relativePath} to any product (folder: ${folderProductId}, file: ${fileProductId})`);
          continue;
        }
        
        // Determine the correct location for this PDF
        const expectedIndustry = mapIndustryToFolder(matchedProduct.industry);
        const expectedFolder = matchedProduct.id;
        
        // Check if PDF is in the right place
        const isInCorrectIndustry = industry.toLowerCase() === expectedIndustry.toLowerCase();
        const isInCorrectFolder = productFolder.toLowerCase() === expectedFolder.toLowerCase() || 
                                 productFolder.toLowerCase() === folderProductId?.toLowerCase();
        
        if (!isInCorrectIndustry || !isInCorrectFolder) {
          // PDF is misplaced
          const expectedPath = `/TDS/${expectedIndustry}/${expectedFolder}/TDS/${fileName}`;
          const expectedDir = path.join(tdsDir, expectedIndustry, expectedFolder, 'TDS');
          const expectedFilePath = path.join(tdsDir, '..', '..', expectedPath);
          
          results.misplaced.push({
            productId: matchedProduct.id,
            currentPath: relativePath,
            expectedPath,
            industry: matchedProduct.industry,
            inCorrectIndustry: isInCorrectIndustry,
            inCorrectFolder: isInCorrectFolder
          });
          
          // Create directory if it doesn't exist
          if (!fs.existsSync(expectedDir)) {
            fs.mkdirSync(expectedDir, { recursive: true });
          }
          
          // Copy the file to the correct location
          if (!fs.existsSync(expectedFilePath)) {
            fs.copyFileSync(pdfFile, expectedFilePath);
            
            results.moved.push({
              from: relativePath,
              to: expectedPath
            });
            
            // Update the product's standardTdsLink if needed
            if (!matchedProduct.standardTdsLink || shouldPreferNewFile(fileName, matchedProduct.standardTdsLink)) {
              if (matchedProduct.standardTdsLink !== expectedPath) {
                matchedProduct.standardTdsLink = expectedPath;
                matchedProduct.hasTdsLink = true;
                results.updated.push(matchedProduct.id);
              }
            }
          }
        }
        
      } catch (error) {
        results.errors.push({
          path: pdfFile,
          error: error.message
        });
      }
    }
    
    // Update the JSON file if any products were updated
    if (results.updated.length > 0) {
      fs.writeFileSync(dataPath, JSON.stringify(productsData, null, 2), 'utf8');
      console.log(`Updated standardTdsLink for ${results.updated.length} products`);
    }
    
    // Print summary
    console.log('\n=== TDS ORGANIZATION RESULTS ===\n');
    console.log(`Analyzed ${results.analyzed} PDF files`);
    console.log(`Identified ${results.misplaced.length} misplaced PDFs`);
    console.log(`Moved ${results.moved.length} PDF files to correct locations`);
    console.log(`Updated ${results.updated.length} product TDS links`);
    
    if (results.misplaced.length > 0) {
      console.log('\nMisplaced files:');
      results.misplaced.forEach((item, index) => {
        console.log(`${index + 1}. ${item.productId}: ${item.currentPath}`);
        console.log(`   Should be in: ${item.expectedPath}`);
      });
    }
    
    if (results.moved.length > 0) {
      console.log('\nMoved files:');
      results.moved.forEach((item, index) => {
        console.log(`${index + 1}. ${item.from} -> ${item.to}`);
      });
    }
    
    if (results.errors.length > 0) {
      console.log(`\n${results.errors.length} errors occurred:`);
      results.errors.forEach((item, index) => {
        console.log(`${index + 1}. ${item.path}`);
        console.log(`   Error: ${item.error}`);
      });
    }
    
  } catch (error) {
    console.error('Error organizing TDS files:', error);
  }
}

// Helper function to extract product ID from filename
function extractProductIdFromFileName(fileName) {
  // Look for patterns like:
  // - FORZA_V1_IC933_TDS.pdf
  // - FOR EMAIL FORZA_V1_IC933_TDS.pdf
  // - IC933_TDS.pdf
  
  let match;
  
  // Pattern 1: FORZA_V#_PRODUCTID_TDS
  match = fileName.match(/FORZA_V\d+_([A-Za-z]+-?\d+)_/i);
  if (match) return match[1];
  
  // Pattern 2: PRODUCTID_TDS
  match = fileName.match(/^([A-Za-z]+-?\d+)_TDS/i);
  if (match) return match[1];
  
  // Pattern 3: Look for any alphanumeric product code like IC933 or T-123
  match = fileName.match(/([A-Za-z]+[A-Za-z]?-?\d+)/i);
  if (match) return match[1];
  
  return null;
}

// Helper function to extract product ID from folder name
function extractProductIdFromFolder(folderName) {
  // Examples:
  // - "IC933"
  // - "MC723 (IC933)" - folder is for MC723 which is the marine version of IC933
  // - "T-400"
  
  // First check for simple product ID
  if (/^[A-Za-z]+-?\d+$/i.test(folderName)) {
    return folderName;
  }
  
  // Check for parent-child relationship pattern
  const match = folderName.match(/([A-Za-z]+-?\d+)\s*\(([A-Za-z]+-?\d+)\)/i);
  if (match) {
    // Return the primary product ID (not the cross-reference)
    return match[1];
  }
  
  // Extract any product-like ID
  const idMatch = folderName.match(/([A-Za-z]+-?\d+)/i);
  if (idMatch) {
    return idMatch[1];
  }
  
  return null;
}

// Helper function to determine if a new filename should be preferred over the current one
function shouldPreferNewFile(newFileName, currentPath) {
  if (!currentPath) return true;
  
  // Extract version numbers if present
  const newVersionMatch = newFileName.match(/V(\d+)/i);
  const currentVersionMatch = currentPath.match(/V(\d+)/i);
  
  // If both have version numbers, prefer higher version
  if (newVersionMatch && currentVersionMatch) {
    const newVersion = parseInt(newVersionMatch[1], 10);
    const currentVersion = parseInt(currentVersionMatch[1], 10);
    return newVersion > currentVersion;
  }
  
  // If new file has version but current doesn't, prefer the version
  if (newVersionMatch && !currentVersionMatch) {
    return true;
  }
  
  // If current has version but new doesn't, keep current
  if (!newVersionMatch && currentVersionMatch) {
    return false;
  }
  
  // If neither has version, prefer the one without "FOR EMAIL" prefix
  const newHasEmailPrefix = newFileName.includes('FOR EMAIL');
  const currentHasEmailPrefix = currentPath.includes('FOR EMAIL');
  
  if (!newHasEmailPrefix && currentHasEmailPrefix) {
    return true;
  }
  
  // Default to keeping current path
  return false;
}

// Helper function to map industry to folder name
function mapIndustryToFolder(industry) {
  industry = industry.toLowerCase();
  
  if (industry === 'marine') return '2. Marine';
  if (industry === 'industrial') return '1. Industrial';
  if (industry === 'transportation') return '3. Transportation';
  if (industry === 'composites') return '4. Composites';
  if (industry === 'insulation') return '6. Insulation';
  if (industry === 'construction') return '7. Construction';
  
  // Default
  return '1. Industrial';
}

// Helper function to find all PDF files in a directory recursively
function findPdfFiles(dir) {
  const results = [];
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      results.push(...findPdfFiles(itemPath));
    } else if (item.toLowerCase().endsWith('.pdf')) {
      results.push(itemPath);
    }
  }
  
  return results;
}

// Run the organization function
organizeTdsByFilename();