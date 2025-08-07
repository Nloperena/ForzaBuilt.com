const fs = require('fs');
const path = require('path');

// Path to the CSV file
const csvPath = path.join(__dirname, '..', 'product_detailed_export.csv');

// Function to analyze TDS links in the CSV
function analyzeTdsLinks() {
  console.log('Analyzing TDS links in product data...');
  
  try {
    // Read the CSV file
    const data = fs.readFileSync(csvPath, 'utf8');
    
    // Parse CSV manually (simple approach)
    const rows = parseCSV(data);
    
    if (rows.length === 0) {
      console.error('Failed to parse CSV data');
      return;
    }
    
    // Get headers from first row
    const headers = rows[0];
    
    // Process product rows (skip header)
    const products = rows.slice(1);
    
    console.log(`Found ${products.length} products in CSV`);
    
    // Find index of PDF Links column
    const pdfLinksIndex = headers.findIndex(h => h === 'PDF Links');
    const idIndex = headers.findIndex(h => h === 'ID');
    const nameIndex = headers.findIndex(h => h === 'Name');
    
    if (pdfLinksIndex === -1 || idIndex === -1 || nameIndex === -1) {
      console.error('Required columns not found in CSV');
      return;
    }
    
    // Count products with TDS links
    let withTdsLinks = 0;
    let withoutTdsLinks = 0;
    const missingTdsProducts = [];
    
    // Analyze each product
    products.forEach(product => {
      const id = product[idIndex];
      const name = product[nameIndex];
      const pdfLinks = product[pdfLinksIndex] || '';
      
      if (pdfLinks && pdfLinks.includes('/TDS/')) {
        withTdsLinks++;
      } else {
        withoutTdsLinks++;
        missingTdsProducts.push({ id, name });
      }
    });
    
    // Print results
    console.log('\n--- TDS Link Analysis ---');
    console.log(`Products with TDS links: ${withTdsLinks} (${Math.round(withTdsLinks/products.length*100)}%)`);
    console.log(`Products without TDS links: ${withoutTdsLinks} (${Math.round(withoutTdsLinks/products.length*100)}%)`);
    
    if (missingTdsProducts.length > 0) {
      console.log('\nProducts missing TDS links:');
      missingTdsProducts.forEach(p => {
        console.log(`- ${p.id}: ${p.name}`);
      });
    }
    
    // Analyze TDS pattern
    console.log('\nAnalyzing TDS link patterns...');
    analyzeTdsPattern(products, pdfLinksIndex, idIndex);
    
  } catch (error) {
    console.error('Error analyzing TDS links:', error);
  }
}

// Function to parse CSV data
function parseCSV(csvData) {
  const rows = [];
  let currentRow = [];
  let inQuotes = false;
  let currentValue = '';
  
  for (let i = 0; i < csvData.length; i++) {
    const char = csvData[i];
    const nextChar = csvData[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Double quotes inside quotes - add a single quote
        currentValue += '"';
        i++; // Skip the next quote
      } else {
        // Toggle quotes mode
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      currentRow.push(currentValue);
      currentValue = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      // End of line
      if (currentValue !== '' || currentRow.length > 0) {
        currentRow.push(currentValue);
        rows.push(currentRow);
        currentRow = [];
        currentValue = '';
      }
      
      // Skip \n if we just processed \r
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
    } else {
      // Regular character
      currentValue += char;
    }
  }
  
  // Add the last row if there's data
  if (currentValue !== '' || currentRow.length > 0) {
    currentRow.push(currentValue);
    rows.push(currentRow);
  }
  
  return rows;
}

// Function to analyze TDS link patterns
function analyzeTdsPattern(products, pdfLinksIndex, idIndex) {
  const patterns = new Map();
  const industryPatterns = new Map();
  
  products.forEach(product => {
    const id = product[idIndex];
    const pdfLinks = product[pdfLinksIndex] || '';
    
    if (!pdfLinks || !pdfLinks.includes('/TDS/')) return;
    
    // Extract TDS pattern
    const tdsLinks = pdfLinks.split(';')
      .map(link => link.trim())
      .filter(link => link.includes('/TDS/'));
    
    tdsLinks.forEach(link => {
      // Extract pattern like "/TDS/1. Industrial/..."
      const match = link.match(/\/TDS\/([^\/]+)\/([^\/]+)\//);
      if (match) {
        const fullPattern = match[0];
        const industry = match[1];
        
        // Track full patterns
        if (!patterns.has(fullPattern)) {
          patterns.set(fullPattern, []);
        }
        patterns.get(fullPattern).push(id);
        
        // Track industry patterns
        if (!industryPatterns.has(industry)) {
          industryPatterns.set(industry, []);
        }
        industryPatterns.get(industry).push(id);
      }
    });
  });
  
  // Print pattern analysis
  console.log('\nTDS directory patterns found:');
  for (const [pattern, ids] of patterns.entries()) {
    console.log(`- ${pattern}: ${ids.length} products`);
  }
  
  console.log('\nIndustry categories in TDS paths:');
  for (const [industry, ids] of industryPatterns.entries()) {
    console.log(`- ${industry}: ${ids.length} products`);
  }
  
  // Suggest pattern for missing TDS
  console.log('\nBased on product ID patterns, we could generate TDS links using this format:');
  console.log('/TDS/{industry}/{productId}/TDS/{productId}_TDS.pdf');
  
  // Suggest how to standardize TDS links
  console.log('\nTo standardize all TDS links, we could:');
  console.log('1. Create a mapping of product IDs to industries');
  console.log('2. Generate consistent TDS paths for all products');
  console.log('3. Update the JSON structure with both actual and standard TDS paths');
}

// Run the analysis
analyzeTdsLinks();