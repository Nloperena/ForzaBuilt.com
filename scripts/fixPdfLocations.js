const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const tdsDir = path.join(__dirname, '..', 'public', 'TDS');
const dataPath = path.join(__dirname, '..', 'src', 'data', 'productsWithTdsLinks.json');

// Function to fix PDF locations
async function fixPdfLocations() {
  console.log('Starting PDF location fixing...');
  
  try {
    // Read product data
    const productsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const products = productsData.products;
    
    // Create a map of product IDs for quick lookup
    const productMap = new Map();
    products.forEach(product => {
      productMap.set(product.id.toLowerCase(), product);
      
      // Also add standardTdsLink to product for updating later
      product.oldStandardTdsLink = product.standardTdsLink;
    });
    
    // Find all PDF files in TDS directory
    const pdfFiles = findPdfFiles(tdsDir);
    console.log(`Found ${pdfFiles.length} PDF files`);
    
    // Track results
    const results = {
      analyzed: 0,
      moved: [],
      errors: [],
      updatedProducts: []
    };
    
    // Process each PDF file
    for (const pdfFile of pdfFiles) {
      try {
        // Extract basic info from file path
        const relativePath = path.relative(path.join(__dirname, '..', 'public'), pdfFile);
        
        // Read first page of PDF to try to determine product ID
        const pdfText = await extractPdfText(pdfFile);
        results.analyzed++;
        
        // Try to determine product ID from text
        const extractedProductInfo = extractProductInfo(pdfText, pdfFile);
        
        if (!extractedProductInfo.productId) {
          continue; // Skip files we can't identify
        }
        
        // Check if product exists in our database
        const normalizedExtractedId = extractedProductInfo.productId.toLowerCase();
        const productData = productMap.get(normalizedExtractedId);
        
        if (!productData) {
          continue; // Skip products not in our database
        }
        
        // Determine the correct location for this PDF
        const industry = mapIndustryToFolder(productData.industry);
        const productFolder = productData.id;
        const fileName = path.basename(pdfFile);
        
        // Create expected directory path
        const expectedDir = path.join(tdsDir, industry, productFolder, 'TDS');
        const expectedFilePath = path.join(expectedDir, fileName);
        const relativeExpectedPath = `/TDS/${industry}/${productFolder}/TDS/${fileName}`;
        
        // Check if file is already in the correct location
        if (pdfFile === expectedFilePath) {
          continue; // Already in the right place
        }
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(expectedDir)) {
          fs.mkdirSync(expectedDir, { recursive: true });
          console.log(`Created directory: ${expectedDir}`);
        }
        
        // Move the file
        if (!fs.existsSync(expectedFilePath)) {
          fs.copyFileSync(pdfFile, expectedFilePath);
          console.log(`Copied: ${relativePath} -> ${relativeExpectedPath}`);
          
          results.moved.push({
            from: relativePath,
            to: relativeExpectedPath,
            productId: productData.id
          });
          
          // Update product's standardTdsLink if this is newer or if there isn't one yet
          if (!productData.standardTdsLink || shouldPreferNewFile(fileName, productData.standardTdsLink)) {
            productData.standardTdsLink = relativeExpectedPath;
            productData.hasTdsLink = true;
            results.updatedProducts.push(productData.id);
          }
        }
      } catch (error) {
        results.errors.push({
          path: pdfFile,
          error: error.message
        });
      }
    }
    
    // Update the productsWithTdsLinks.json file with new standardTdsLink values
    let updatedCount = 0;
    for (const product of products) {
      if (product.standardTdsLink !== product.oldStandardTdsLink) {
        updatedCount++;
        delete product.oldStandardTdsLink; // Clean up temp property
      }
    }
    
    if (updatedCount > 0) {
      fs.writeFileSync(dataPath, JSON.stringify(productsData, null, 2), 'utf8');
      console.log(`Updated standardTdsLink for ${updatedCount} products`);
    }
    
    // Print summary
    console.log('\n=== PDF ORGANIZATION RESULTS ===\n');
    console.log(`Analyzed ${results.analyzed} PDF files`);
    console.log(`Moved ${results.moved.length} PDF files`);
    console.log(`Updated ${results.updatedProducts.length} product TDS links`);
    
    if (results.moved.length > 0) {
      console.log('\nMoved files:');
      results.moved.forEach((item, index) => {
        console.log(`${index + 1}. ${item.productId}: ${item.from} -> ${item.to}`);
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
    console.error('Error fixing PDF locations:', error);
  }
}

// Helper function to determine if a new filename should be preferred over the current one
function shouldPreferNewFile(newFileName, currentPath) {
  if (!currentPath) return true;
  
  // Extract version numbers if present
  const newVersionMatch = newFileName.match(/V(\d+)/i);
  const currentVersionMatch = path.basename(currentPath).match(/V(\d+)/i);
  
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
  const currentHasEmailPrefix = path.basename(currentPath).includes('FOR EMAIL');
  
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

// Extract text from PDF using pdftotext (assumes pdftotext/xpdf is installed)
async function extractPdfText(pdfPath) {
  try {
    // Create a temporary file for the output
    const tempOutputFile = path.join(__dirname, 'temp_pdf_text.txt');
    
    // Use pdftotext to extract first page (-l 1)
    const command = `pdftotext -l 1 "${pdfPath}" "${tempOutputFile}"`;
    
    try {
      execSync(command, { stdio: 'pipe' });
    } catch (error) {
      // If pdftotext fails, return empty string
      console.log(`Warning: Could not extract text from ${pdfPath}`);
      return '';
    }
    
    // Read the extracted text
    if (fs.existsSync(tempOutputFile)) {
      const text = fs.readFileSync(tempOutputFile, 'utf8');
      
      // Clean up the temp file
      fs.unlinkSync(tempOutputFile);
      
      return text;
    }
    
    return '';
  } catch (error) {
    console.error(`Error extracting PDF text from ${pdfPath}:`, error);
    return '';
  }
}

// Extract product ID and name from PDF text
function extractProductInfo(text, filePath) {
  const result = {
    productId: null,
    productName: null
  };
  
  if (!text || text.trim() === '') {
    // Try to extract from filename if text extraction failed
    const filename = path.basename(filePath);
    const matches = filename.match(/[A-Za-z]+-?\d+/);
    if (matches) {
      result.productId = matches[0];
    }
    return result;
  }
  
  // Look for product ID patterns in the text
  const lines = text.split(/\\r?\\n/);
  
  // Common product ID patterns
  const idPatterns = [
    // Match pattern like "Product ID: ABC123"
    /Product(?:\\s+)?(?:ID|Number|Code)?(?:\\s*)?:?(?:\\s+)([A-Za-z]+-?\\d+)/i,
    // Match pattern like "ABC123 - Product Name"
    /^([A-Za-z]+-?\\d+)(?:\\s+)?(?:-|–|—)?(?:\\s+)/im,
    // Match pattern like "ForzaBOND ABC123"
    /Forza(?:BOND|SEAL|TAPE)?\\s+([A-Za-z]+-?\\d+)/i
  ];
  
  // Try each pattern
  for (const pattern of idPatterns) {
    for (const line of lines) {
      const match = line.match(pattern);
      if (match && match[1]) {
        result.productId = match[1].trim();
        break;
      }
    }
    if (result.productId) break;
  }
  
  // If still no product ID, try to extract from filename
  if (!result.productId) {
    const filename = path.basename(filePath);
    const matches = filename.match(/[A-Za-z]+-?\d+/);
    if (matches) {
      result.productId = matches[0];
    }
  }
  
  return result;
}

// Run the fix function
fixPdfLocations();