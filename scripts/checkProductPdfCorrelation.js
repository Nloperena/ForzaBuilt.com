const fs = require('fs');
const path = require('path');

// Input paths
const dataPath = path.join(__dirname, '..', 'src', 'data', 'productsWithTdsLinks.json');
const tdsDir = path.join(__dirname, '..', 'public', 'TDS');

// Function to check correlation between products and their PDFs
function checkProductPdfCorrelation() {
  console.log('Checking correlation between products and their PDFs...');
  
  try {
    // Read the products data
    const productsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const products = productsData.products;
    
    console.log(`Found ${products.length} products in data`);
    
    // Results storage
    const issues = {
      missingPdfs: [],
      possibleMismatches: [],
      multipleVersions: []
    };
    
    // Check each product
    products.forEach(product => {
      // Skip products without TDS links
      if (!product.standardTdsLink) {
        issues.missingPdfs.push({
          id: product.id,
          name: product.name
        });
        return;
      }
      
      // Check if the PDF file exists
      const pdfPath = path.join(__dirname, '..', 'public', product.standardTdsLink);
      const pdfExists = fs.existsSync(pdfPath);
      
      if (!pdfExists) {
        issues.missingPdfs.push({
          id: product.id,
          name: product.name,
          path: product.standardTdsLink
        });
        return;
      }
      
      // Check for possible mismatches by comparing product ID with PDF path
      checkForMismatches(product, issues);
      
      // Check for multiple versions of the same PDF
      checkForMultipleVersions(product, issues);
    });
    
    // Print results
    console.log('\n=== PRODUCT-PDF CORRELATION ANALYSIS ===\n');
    
    if (issues.missingPdfs.length > 0) {
      console.log(`\n${issues.missingPdfs.length} products with missing PDFs:`);
      issues.missingPdfs.forEach(item => {
        console.log(`- ${item.id}: ${item.name} ${item.path ? `(Path: ${item.path})` : ''}`);
      });
    }
    
    if (issues.possibleMismatches.length > 0) {
      console.log(`\n${issues.possibleMismatches.length} possible mismatches between product ID and PDF content:`);
      issues.possibleMismatches.forEach(item => {
        console.log(`- ${item.id}: ${item.name}`);
        console.log(`  PDF: ${item.pdfPath}`);
        console.log(`  Mismatch reason: ${item.reason}`);
      });
    }
    
    if (issues.multipleVersions.length > 0) {
      console.log(`\n${issues.multipleVersions.length} products with multiple PDF versions:`);
      issues.multipleVersions.forEach(item => {
        console.log(`- ${item.id}: ${item.name}`);
        console.log(`  Versions found: ${item.versions.join(', ')}`);
      });
    }
    
  } catch (error) {
    console.error('Error checking product-PDF correlation:', error);
  }
}

// Function to check for possible mismatches
function checkForMismatches(product, issues) {
  const { id, name, standardTdsLink, pdfLinks } = product;
  
  // Extract product ID from the PDF path
  const pdfIdMatch = standardTdsLink.match(/\/([^\/]+)\/TDS\//);
  if (!pdfIdMatch) return;
  
  const pdfId = pdfIdMatch[1];
  
  // Skip products where the folder name contains the product ID exactly
  if (pdfId.toLowerCase().includes(id.toLowerCase()) || id.toLowerCase().includes(pdfId.toLowerCase())) {
    return;
  }
  
  // If the folder name doesn't match product ID, it might be a mismatch
  // Check if there's an industry code in the path
  if (standardTdsLink.includes('Marine') && !id.toLowerCase().startsWith('m')) {
    issues.possibleMismatches.push({
      id,
      name,
      pdfPath: standardTdsLink,
      reason: `PDF is in Marine folder but product ID doesn't start with M`
    });
  } else if (standardTdsLink.includes('Transportation') && !id.toLowerCase().startsWith('t')) {
    issues.possibleMismatches.push({
      id,
      name,
      pdfPath: standardTdsLink,
      reason: `PDF is in Transportation folder but product ID doesn't start with T`
    });
  } else if (!id.toLowerCase().includes(pdfId.toLowerCase()) && !pdfId.toLowerCase().includes(id.toLowerCase())) {
    // General case - product ID and PDF folder don't seem related
    issues.possibleMismatches.push({
      id,
      name,
      pdfPath: standardTdsLink,
      reason: `Product ID (${id}) doesn't match PDF folder name (${pdfId})`
    });
  }
}

// Function to check for multiple PDF versions
function checkForMultipleVersions(product, issues) {
  const { id, name, pdfLinks } = product;
  
  // Skip if there aren't multiple PDFs
  if (!pdfLinks || pdfLinks.length <= 1) return;
  
  // Extract version information from PDF paths
  const versions = pdfLinks
    .map(link => {
      const match = link.match(/V(\d+)_/);
      return match ? match[1] : null;
    })
    .filter(v => v !== null);
  
  // If multiple versions found, add to issues
  if (versions.length > 1) {
    issues.multipleVersions.push({
      id,
      name,
      versions
    });
  }
}

// Run the check
checkProductPdfCorrelation();