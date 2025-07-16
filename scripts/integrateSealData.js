const fs = require('fs');
const path = require('path');

// Load the scraped seal products data
const scrapedData = JSON.parse(fs.readFileSync(path.join(__dirname, 'sealProductsRefined.json'), 'utf8'));

// Load the existing industrial datasheet
const industrialDataPath = path.join(__dirname, '../src/data/industrialDatasheet.ts');
let industrialDataContent = fs.readFileSync(industrialDataPath, 'utf8');

// Extract the existing products array
const productsMatch = industrialDataContent.match(/export const industrialDatasheet: ProductDatasheet\[\] = (\[[\s\S]*?\]);/);
if (!productsMatch) {
  console.error('Could not find industrialDatasheet array in industrialDatasheet.ts');
  process.exit(1);
}

let existingProducts = eval(productsMatch[1]);

// Function to convert scraped data to product format
function convertScrapedToProduct(scrapedProduct) {
  const productId = scrapedProduct.name.split('–')[0].trim().toLowerCase().replace(/\s+/g, '-');
  
  return {
    id: productId,
    name: scrapedProduct.name,
    category: 'SEAL',
    industry: 'industrial',
    description: scrapedProduct.description || '',
    image: scrapedProduct.image,
    url: scrapedProduct.url,
    specifications: {
      type: scrapedProduct.name,
      substrates: scrapedProduct.applications || [],
      applications: scrapedProduct.applications || [],
      features: scrapedProduct.features || [],
      certifications: scrapedProduct.certifications || [],
      packaging: scrapedProduct.packaging ? [scrapedProduct.packaging] : []
    },
    technicalData: {
      ...scrapedProduct.technicalData
    },
    benefits: scrapedProduct.benefits ? [scrapedProduct.benefits] : [],
    howToUse: scrapedProduct.howToUse ? [scrapedProduct.howToUse] : [],
    colors: scrapedProduct.colors ? [scrapedProduct.colors] : [],
    sizing: scrapedProduct.sizing ? [scrapedProduct.sizing] : [],
    cleanup: scrapedProduct.cleanup ? [scrapedProduct.cleanup] : []
  };
}

// Convert all scraped products
const newProducts = scrapedData.map(convertScrapedToProduct);

// Filter out any products that already exist in the industrial datasheet
const existingProductIds = existingProducts.map(p => p.id);
const uniqueNewProducts = newProducts.filter(product => !existingProductIds.includes(product.id));

console.log(`Found ${scrapedData.length} scraped products`);
console.log(`Found ${existingProducts.length} existing products`);
console.log(`Adding ${uniqueNewProducts.length} new products`);

// Add new products to existing array
const updatedProducts = [...existingProducts, ...uniqueNewProducts];

// Update the industrial datasheet content
const updatedContent = industrialDataContent.replace(
  /export const industrialDatasheet: ProductDatasheet\[\] = (\[[\s\S]*?\]);/,
  `export const industrialDatasheet: ProductDatasheet[] = ${JSON.stringify(updatedProducts, null, 2)};`
);

// Write the updated content back to the file
fs.writeFileSync(industrialDataPath, updatedContent);

console.log(`Successfully updated industrialDatasheet.ts with ${uniqueNewProducts.length} new seal products`);

// Create a summary report
const summary = {
  totalScraped: scrapedData.length,
  totalExisting: existingProducts.length,
  newProductsAdded: uniqueNewProducts.length,
  newProducts: uniqueNewProducts.map(p => p.name)
};

fs.writeFileSync(
  path.join(__dirname, 'sealIntegrationSummary.json'), 
  JSON.stringify(summary, null, 2)
);

console.log('\nIntegration Summary:');
console.log(`- Total scraped products: ${summary.totalScraped}`);
console.log(`- Total existing products: ${summary.totalExisting}`);
console.log(`- New products added: ${summary.newProductsAdded}`);
console.log('\nNew products:');
summary.newProducts.forEach((name, index) => {
  console.log(`${index + 1}. ${name}`);
}); 