const fs = require('fs');
const path = require('path');

// Input and output paths
const inputCsvPath = 'product_detailed_export.csv';
const outputJsonPath = path.join(__dirname, '..', 'src', 'data', 'productsWithTdsLinks.json');

// Function to process the CSV and create JSON with TDS links
function createProductsWithTdsLinks() {
  console.log(`Reading CSV file: ${inputCsvPath}`);
  
  try {
    // Read the CSV file
    const csvData = fs.readFileSync(inputCsvPath, 'utf8');
    console.log(`CSV file size: ${csvData.length} bytes`);
    
    // Parse CSV data
    const products = parseCSV(csvData);
    console.log(`Parsed ${products.length} products from CSV`);
    
    // Analyze TDS links
    const { withTds, withoutTds } = analyzeTdsLinks(products);
    console.log(`Products with TDS links: ${withTds.length}`);
    console.log(`Products without TDS links: ${withoutTds.length}`);
    
    // Generate standard TDS links for products without them
    const productsWithStandardTds = generateStandardTdsLinks(products);
    
    // Create final JSON structure
    const finalJson = createJsonStructure(productsWithStandardTds);
    
    // Write output file
    fs.writeFileSync(outputJsonPath, JSON.stringify(finalJson, null, 2), 'utf8');
    console.log(`\n✅ Output written to ${outputJsonPath}`);
    
  } catch (error) {
    console.error('Error processing CSV:', error);
  }
}

// Function to parse CSV data
function parseCSV(csvData) {
  // Split into lines and get header
  const lines = csvData.split('\n');
  const headerLine = lines[0];
  
  // Simple CSV parsing (not handling all edge cases)
  const headers = headerLine.split(',').map(h => h.trim().replace(/"/g, ''));
  
  // Find column indices
  const columnIndices = {
    id: headers.findIndex(h => h === 'ID'),
    name: headers.findIndex(h => h === 'Name'),
    title: headers.findIndex(h => h === 'Title'),
    description: headers.findIndex(h => h === 'Description'),
    imageUrl: headers.findIndex(h => h === 'Image URL'),
    pdfLinks: headers.findIndex(h => h === 'PDF Links'),
    category: headers.findIndex(h => h === 'Category'),
    productType: headers.findIndex(h => h === 'Product Type'),
    chemistry: headers.findIndex(h => h === 'Chemistry'),
    chemistryConfidence: headers.findIndex(h => h === 'Chemistry Confidence'),
    industry: headers.findIndex(h => h === 'Industry'),
    specifications: headers.findIndex(h => h === 'Specifications'),
    technicalData: headers.findIndex(h => h === 'Technical Data')
  };
  
  console.log('Column indices:', columnIndices);
  
  // Process each line
  const products = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    try {
      // Split line into fields, handling quoted values
      const fields = splitCSVLine(line);
      
      // Skip if we don't have enough fields
      if (fields.length <= columnIndices.industry) continue;
      
      // Extract fields
      const product = {
        id: getField(fields, columnIndices.id),
        name: getField(fields, columnIndices.name),
        title: getField(fields, columnIndices.title),
        description: getField(fields, columnIndices.description),
        imageUrl: getField(fields, columnIndices.imageUrl),
        pdfLinks: getField(fields, columnIndices.pdfLinks).split(';').map(link => link.trim()).filter(link => link),
        category: getField(fields, columnIndices.category),
        productType: getField(fields, columnIndices.productType),
        chemistry: getField(fields, columnIndices.chemistry),
        chemistryConfidence: getField(fields, columnIndices.chemistryConfidence),
        industry: getField(fields, columnIndices.industry),
        specifications: parseJsonField(getField(fields, columnIndices.specifications)),
        technicalData: parseJsonField(getField(fields, columnIndices.technicalData))
      };
      
      // Add to products array
      products.push(product);
      
    } catch (err) {
      console.error(`Error processing line ${i + 1}:`, err);
    }
  }
  
  return products;
}

// Helper function to split CSV line, handling quoted values
function splitCSVLine(line) {
  const result = [];
  let currentField = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(currentField);
      currentField = '';
    } else {
      currentField += char;
    }
  }
  
  // Add the last field
  result.push(currentField);
  
  return result.map(field => field.replace(/^"|"$/g, ''));
}

// Helper function to get field value
function getField(fields, index) {
  return index >= 0 && index < fields.length ? fields[index] : '';
}

// Helper function to parse JSON field
function parseJsonField(field) {
  if (!field) return {};
  
  try {
    return JSON.parse(field);
  } catch (err) {
    return {};
  }
}

// Function to analyze TDS links
function analyzeTdsLinks(products) {
  const withTds = [];
  const withoutTds = [];
  
  products.forEach(product => {
    const hasTdsLinks = product.pdfLinks.some(link => link.includes('/TDS/'));
    
    if (hasTdsLinks) {
      withTds.push(product);
    } else {
      withoutTds.push(product);
    }
  });
  
  return { withTds, withoutTds };
}

// Function to generate standard TDS links
function generateStandardTdsLinks(products) {
  return products.map(product => {
    // Extract existing TDS links
    const tdsLinks = product.pdfLinks.filter(link => link.includes('/TDS/'));
    
    // Generate standard TDS link if none exists
    if (tdsLinks.length === 0) {
      const industry = product.industry.toLowerCase();
      const id = product.id.toUpperCase();
      
      // Map industry to folder name
      let industryFolder = '';
      
      if (industry === 'marine') industryFolder = '2. Marine';
      else if (industry === 'industrial') industryFolder = '1. Industrial';
      else if (industry === 'transportation') industryFolder = '3. Transportation';
      else if (industry === 'composites') industryFolder = '4. Composites';
      else if (industry === 'insulation') industryFolder = '6. Insulation';
      else if (industry === 'construction') industryFolder = '7. Construction';
      else industryFolder = '1. Industrial'; // Default
      
      // Create standard TDS link
      const standardTdsLink = `/TDS/${industryFolder}/${id}/TDS/FORZA_TDS_${id}.pdf`;
      
      // Add to product
      return {
        ...product,
        standardTdsLink,
        hasTdsLink: false
      };
    }
    
    // Use existing TDS link
    return {
      ...product,
      standardTdsLink: tdsLinks[0], // Use first TDS link as standard
      hasTdsLink: true
    };
  });
}

// Function to create final JSON structure
function createJsonStructure(products) {
  // Extract unique values for metadata
  const categories = [...new Set(products.map(p => p.category))];
  const chemistries = [...new Set(products.map(p => p.chemistry).filter(c => c))];
  const industries = [...new Set(products.map(p => p.industry).filter(i => i))];
  
  // Create relationships
  const relationships = {
    chemistryByIndustry: {},
    industryByChemistry: {},
    chemistryByCategory: {},
    categoryByChemistry: {}
  };
  
  // Build relationship maps
  products.forEach(product => {
    const { chemistry, industry, category } = product;
    
    // Skip if missing key data
    if (!chemistry || !industry || !category) return;
    
    // Chemistry by industry
    if (!relationships.chemistryByIndustry[industry]) {
      relationships.chemistryByIndustry[industry] = {};
    }
    relationships.chemistryByIndustry[industry][chemistry] = 
      (relationships.chemistryByIndustry[industry][chemistry] || 0) + 1;
    
    // Industry by chemistry
    if (!relationships.industryByChemistry[chemistry]) {
      relationships.industryByChemistry[chemistry] = {};
    }
    relationships.industryByChemistry[chemistry][industry] = 
      (relationships.industryByChemistry[chemistry][industry] || 0) + 1;
    
    // Chemistry by category
    if (!relationships.chemistryByCategory[category]) {
      relationships.chemistryByCategory[category] = {};
    }
    relationships.chemistryByCategory[category][chemistry] = 
      (relationships.chemistryByCategory[category][chemistry] || 0) + 1;
    
    // Category by chemistry
    if (!relationships.categoryByChemistry[chemistry]) {
      relationships.categoryByChemistry[chemistry] = {};
    }
    relationships.categoryByChemistry[chemistry][category] = 
      (relationships.categoryByChemistry[chemistry][category] || 0) + 1;
  });
  
  // Create final structure
  return {
    metadata: {
      categories: categories.sort(),
      chemistries: chemistries.sort(),
      industries: industries.sort(),
      relationships
    },
    products: products.map(product => ({
      id: product.id,
      name: product.name,
      shortName: product.title,
      description: product.description,
      imageUrl: product.imageUrl,
      pdfLinks: product.pdfLinks,
      standardTdsLink: product.standardTdsLink,
      hasTdsLink: product.hasTdsLink,
      category: product.category,
      productType: product.productType,
      chemistry: product.chemistry,
      chemistryConfidence: product.chemistryConfidence,
      industry: product.industry,
      specifications: product.specifications,
      technicalData: product.technicalData,
      searchKeywords: generateKeywords(product)
    }))
  };
}

// Helper function to generate keywords
function generateKeywords(product) {
  const keywords = new Set();
  
  // Add words from name and description
  [product.name, product.description].forEach(text => {
    if (!text) return;
    text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2)
      .forEach(word => keywords.add(word));
  });
  
  // Add key specification values
  if (product.specifications) {
    if (product.specifications.type) keywords.add(product.specifications.type.toLowerCase());
    if (product.specifications.features) {
      product.specifications.features.forEach(f => keywords.add(f.toLowerCase()));
    }
    if (product.specifications.applications) {
      product.specifications.applications.forEach(a => keywords.add(a.toLowerCase()));
    }
  }
  
  return Array.from(keywords);
}

// Run the script
createProductsWithTdsLinks();