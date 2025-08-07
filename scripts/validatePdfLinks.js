const fs = require('fs');
const path = require('path');

// Paths
const dataPath = path.join(__dirname, '..', 'src', 'data', 'productsWithTdsLinks.json');
const publicPath = path.join(__dirname, '..', 'public');

// Function to validate PDF links
async function validatePdfLinks() {
  console.log('Validating PDF links in product data...');
  
  try {
    // Read product data
    const productsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const products = productsData.products;
    
    console.log(`Found ${products.length} products in data`);
    
    // Track results
    const results = {
      validLinks: 0,
      invalidLinks: [],
      missingStandardLinks: [],
      crossIndustryProducts: []
    };
    
    // Process each product
    for (const product of products) {
      // Check if product has a standardTdsLink
      if (!product.standardTdsLink) {
        results.missingStandardLinks.push({
          id: product.id,
          name: product.name,
          industry: product.industry
        });
        continue;
      }
      
      // Check if the PDF file exists
      const pdfPath = path.join(publicPath, product.standardTdsLink);
      const pdfExists = fs.existsSync(pdfPath);
      
      if (!pdfExists) {
        results.invalidLinks.push({
          id: product.id,
          name: product.name,
          path: product.standardTdsLink,
          industry: product.industry
        });
      } else {
        results.validLinks++;
      }
      
      // Check for cross-industry use (e.g., IC933 appearing in multiple industries)
      if (product.pdfLinks && product.pdfLinks.length > 0) {
        const industries = new Set();
        
        for (const link of product.pdfLinks) {
          // Extract industry from link
          const match = link.match(/\/TDS\/([^\/]+)\//);
          if (match) {
            const industry = match[1];
            industries.add(industry);
          }
        }
        
        if (industries.size > 1) {
          results.crossIndustryProducts.push({
            id: product.id,
            name: product.name,
            assignedIndustry: product.industry,
            foundInIndustries: Array.from(industries),
            links: product.pdfLinks
          });
        }
      }
    }
    
    // Print summary
    console.log('\n=== PDF LINK VALIDATION RESULTS ===\n');
    console.log(`Valid links: ${results.validLinks} (${Math.round(results.validLinks / products.length * 100)}%)`);
    console.log(`Invalid links: ${results.invalidLinks.length} (${Math.round(results.invalidLinks.length / products.length * 100)}%)`);
    console.log(`Products without standardTdsLink: ${results.missingStandardLinks.length} (${Math.round(results.missingStandardLinks.length / products.length * 100)}%)`);
    console.log(`Products used across multiple industries: ${results.crossIndustryProducts.length}`);
    
    if (results.invalidLinks.length > 0) {
      console.log('\nProducts with invalid PDF links:');
      results.invalidLinks.forEach((item, index) => {
        console.log(`${index + 1}. ${item.id}: ${item.name}`);
        console.log(`   Invalid path: ${item.path}`);
      });
    }
    
    if (results.missingStandardLinks.length > 0) {
      console.log('\nProducts without standardTdsLink:');
      results.missingStandardLinks.forEach((item, index) => {
        console.log(`${index + 1}. ${item.id}: ${item.name} (${item.industry})`);
      });
    }
    
    if (results.crossIndustryProducts.length > 0) {
      console.log('\nProducts used across multiple industries:');
      results.crossIndustryProducts.forEach((item, index) => {
        console.log(`${index + 1}. ${item.id}: ${item.name}`);
        console.log(`   Assigned to: ${item.assignedIndustry}`);
        console.log(`   Found in: ${item.foundInIndustries.join(', ')}`);
        console.log(`   Cross-reference products: ${identifyCrossReferences(item.links)}`);
      });
    }
    
  } catch (error) {
    console.error('Error validating PDF links:', error);
  }
}

// Helper to identify cross-reference product IDs in links
function identifyCrossReferences(links) {
  const crossRefs = [];
  
  for (const link of links) {
    const match = link.match(/\/([A-Za-z]+-?\d+)\s*\(([A-Za-z]+-?\d+)\)/i);
    if (match && match[1] && match[2]) {
      // Found a cross-reference: folder like "MC723 (IC933)"
      crossRefs.push(`${match[1]} ⟷ ${match[2]}`);
    }
  }
  
  return crossRefs.length > 0 ? crossRefs.join(', ') : 'No cross-references found';
}

// Run the validation function
validatePdfLinks();