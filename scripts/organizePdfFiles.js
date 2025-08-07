const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const tdsDir = path.join(__dirname, '..', 'public', 'TDS');
const dataPath = path.join(__dirname, '..', 'src', 'data', 'productsWithTdsLinks.json');

// Function to organize PDF files
async function organizePdfFiles() {
  console.log('Starting PDF organization...');
  
  try {
    // Read product data
    const productsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const products = productsData.products;
    
    // Create a map of product IDs for quick lookup
    const productMap = new Map();
    products.forEach(product => {
      productMap.set(product.id.toLowerCase(), product);
    });
    
    // Find all PDF files in TDS directory
    const pdfFiles = findPdfFiles(tdsDir);
    console.log(`Found ${pdfFiles.length} PDF files`);
    
    // Track results
    const results = {
      analyzed: 0,
      misplaced: [],
      couldNotDetermine: [],
      moved: [],
      errors: []
    };
    
    // Process each PDF file
    for (const pdfFile of pdfFiles) {
      try {
        // Extract basic info from file path
        const relativePath = path.relative(path.join(__dirname, '..', 'public'), pdfFile);
        const pathParts = relativePath.split(path.sep);
        
        // Skip PDFs in root or unexpected locations
        if (pathParts.length < 4) continue;
        
        // Extract folder info
        const industry = pathParts[1]; // e.g., "1. Industrial"
        const productFolder = pathParts[2]; // e.g., "IC933" 
        
        // Read first page of PDF to try to determine product ID
        const pdfText = await extractPdfText(pdfFile);
        results.analyzed++;
        
        // Try to determine product ID from text
        const extractedProductInfo = extractProductInfo(pdfText, pdfFile);
        
        if (!extractedProductInfo.productId) {
          results.couldNotDetermine.push({
            path: relativePath,
            reason: 'Could not determine product ID from content'
          });
          continue;
        }
        
        // Check if product exists in our database
        const normalizedExtractedId = extractedProductInfo.productId.toLowerCase();
        const productData = productMap.get(normalizedExtractedId);
        
        if (!productData) {
          results.couldNotDetermine.push({
            path: relativePath,
            extractedId: extractedProductInfo.productId,
            reason: 'Product ID not found in database'
          });
          continue;
        }
        
        // Check if PDF is in the right industry folder
        const expectedIndustry = mapIndustryToFolder(productData.industry);
        const isInCorrectIndustry = industry.toLowerCase().includes(expectedIndustry.toLowerCase());
        
        // Check if PDF is in the right product folder
        const normalizedProductFolder = productFolder.toLowerCase();
        const normalizedId = productData.id.toLowerCase();
        const isInCorrectFolder = normalizedProductFolder === normalizedId || 
                                  normalizedProductFolder.includes(`(${normalizedId})`) || 
                                  normalizedProductFolder.includes(normalizedId);
        
        // If misplaced, report it
        if (!isInCorrectIndustry || !isInCorrectFolder) {
          // Build expected path
          const expectedFolder = `${expectedIndustry}/${productData.id}`;
          const fileName = path.basename(pdfFile);
          const expectedPath = `/TDS/${expectedFolder}/TDS/${fileName}`;
          
          results.misplaced.push({
            currentPath: relativePath,
            expectedPath,
            productId: productData.id,
            industry: productData.industry,
            inCorrectIndustry: isInCorrectIndustry,
            inCorrectFolder: isInCorrectFolder
          });
        }
      } catch (error) {
        results.errors.push({
          path: pdfFile,
          error: error.message
        });
      }
    }
    
    // Print summary
    console.log('\n=== PDF ORGANIZATION ANALYSIS ===\n');
    console.log(`Analyzed ${results.analyzed} PDF files`);
    
    if (results.misplaced.length > 0) {
      console.log(`\n${results.misplaced.length} PDFs appear to be misplaced:`);
      results.misplaced.forEach((item, index) => {
        console.log(`\n${index + 1}. Current: ${item.currentPath}`);
        console.log(`   Expected: ${item.expectedPath}`);
        console.log(`   Product ID: ${item.productId}, Industry: ${item.industry}`);
        console.log(`   Issues: ${!item.inCorrectIndustry ? 'Wrong industry' : ''} ${!item.inCorrectFolder ? 'Wrong folder' : ''}`);
      });
    }
    
    if (results.couldNotDetermine.length > 0) {
      console.log(`\n${results.couldNotDetermine.length} PDFs could not be analyzed:`);
      results.couldNotDetermine.forEach((item, index) => {
        console.log(`${index + 1}. ${item.path}`);
        console.log(`   Reason: ${item.reason}`);
        if (item.extractedId) console.log(`   Extracted ID: ${item.extractedId}`);
      });
    }
    
    if (results.errors.length > 0) {
      console.log(`\n${results.errors.length} errors occurred:`);
      results.errors.forEach((item, index) => {
        console.log(`${index + 1}. ${item.path}`);
        console.log(`   Error: ${item.error}`);
      });
    }
    
    // Offer to fix misplaced files
    if (results.misplaced.length > 0) {
      console.log('\nTo fix misplaced files, run this script with --fix parameter');
    }
    
  } catch (error) {
    console.error('Error organizing PDF files:', error);
  }
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

// Check if we're running with --fix parameter
const shouldFix = process.argv.includes('--fix');

// Run the organization function
organizePdfFiles();