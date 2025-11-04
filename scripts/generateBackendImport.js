const fs = require('fs');
const path = require('path');

// Read all scraped product files
const scrapedDir = path.join(__dirname, '../src/data/scrapedProducts');
const files = fs.readdirSync(scrapedDir).filter(f => f.endsWith('.json') && !f.includes('summary') && !f.includes('import'));

const products = [];

files.forEach(file => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(scrapedDir, file), 'utf8'));
    
    // Skip if it doesn't have basic required fields
    if (!data.product_id || !data.name) {
      console.log(`⚠️  Skipping ${file} - missing required fields`);
      return;
    }
    
    // Convert to backend API format
    const apiProduct = {
      product_id: data.product_id,
      name: data.name,
      full_name: data.full_name || data.name,
      description: data.description || '',
      brand: data.brand,
      industry: data.industry,
      chemistry: data.chemistry || null,
      image: data.image,
      applications: data.applications || [],
      benefits: data.benefits || [],
      sizing: data.sizing || [],
      technical: data.technical || [],
      published: false, // Set to false for manual review
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    products.push(apiProduct);
    console.log(`✅ Processed: ${data.product_id} - ${data.name}`);
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
  }
});

// Save as single JSON file for backend import
const outputFile = path.join(scrapedDir, 'backend-import.json');
fs.writeFileSync(outputFile, JSON.stringify(products, null, 2));

console.log(`\n✅ Backend import file created: ${outputFile}`);
console.log(`   Total products: ${products.length}`);
console.log(`\nYou can now import this file to your Heroku product manager!`);

// Also save as pretty formatted output
const readmeFile = path.join(scrapedDir, 'IMPORT_INSTRUCTIONS.md');
const readme = `# Missing Products Import Instructions

## Products Ready for Import: ${products.length}

### Files Available:

1. **backend-import.json** - Complete JSON array ready for bulk import
2. **missing-products-import.csv** - CSV format for spreadsheet import
3. **Individual JSON files** - One file per product for manual import

### Import Steps:

1. Go to your Heroku product management system
2. Use the bulk import feature (if available)
3. Upload \`backend-import.json\` or use the CSV file
4. Review each product before publishing
5. Upload product images to Vercel Blob if needed
6. Set \`published: true\` for each product after review

### Products Included:

${products.map(p => `- **${p.product_id}** - ${p.name} (${p.brand})`).join('\n')}

### Data Included Per Product:

- ✅ Product ID
- ✅ Full Name
- ✅ Description
- ✅ Brand (forza_bond/forza_seal/forza_tape)
- ✅ Industry
- ✅ Chemistry (where detected)
- ✅ Image URL (from WordPress)
- ✅ Applications array
- ✅ Benefits array
- ✅ Sizing array
- ⚠️ Technical specs (empty - add from TDS)

### Note:

All products are set to \`published: false\` by default.
Review each product before publishing to production.

Image URLs point to WordPress - you may want to download and re-upload to Vercel Blob.
`;

fs.writeFileSync(readmeFile, readme);
console.log(`\n📖 Instructions saved: ${readmeFile}`);








