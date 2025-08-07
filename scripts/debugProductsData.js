const fs = require('fs');
const path = require('path');

// Path to the products JSON file
const productsJsonPath = path.join(__dirname, '..', 'src', 'data', 'productsWithTdsLinks.json');

// Function to debug products data
function debugProductsData() {
  console.log('Debugging products data...');
  
  try {
    // Read the products JSON file
    const productsData = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));
    
    // Count products
    console.log(`Total products: ${productsData.products.length}`);
    
    // Count products by productLine
    const productLineCount = {};
    productsData.products.forEach(product => {
      const productLine = product.productLine || 'unknown';
      productLineCount[productLine] = (productLineCount[productLine] || 0) + 1;
    });
    
    console.log('Products by productLine:');
    Object.entries(productLineCount).forEach(([productLine, count]) => {
      console.log(`  ${productLine}: ${count}`);
    });
    
    // Count products by category
    const categoryCount = {};
    productsData.products.forEach(product => {
      const category = product.category || 'unknown';
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });
    
    console.log('Products by category:');
    Object.entries(categoryCount).forEach(([category, count]) => {
      console.log(`  ${category}: ${count}`);
    });
    
    // Check for products with missing required properties
    const missingProps = productsData.products.filter(product => {
      return !product.id || !product.name || !product.productLine || !product.category;
    });
    
    if (missingProps.length > 0) {
      console.log(`Found ${missingProps.length} products with missing required properties:`);
      missingProps.forEach(product => {
        console.log(`  ${product.id || 'unknown'}: ${product.name || 'unknown'}`);
        console.log(`    productLine: ${product.productLine || 'missing'}`);
        console.log(`    category: ${product.category || 'missing'}`);
      });
    } else {
      console.log('All products have required properties.');
    }
    
    // Check case sensitivity of productLine and category
    const productLineCase = {};
    const categoryCase = {};
    
    productsData.products.forEach(product => {
      if (product.productLine) {
        productLineCase[product.productLine] = true;
      }
      if (product.category) {
        categoryCase[product.category] = true;
      }
    });
    
    console.log('Unique productLine values (case sensitive):');
    Object.keys(productLineCase).forEach(value => {
      console.log(`  "${value}"`);
    });
    
    console.log('Unique category values (case sensitive):');
    Object.keys(categoryCase).forEach(value => {
      console.log(`  "${value}"`);
    });
    
  } catch (error) {
    console.error('Error debugging products data:', error);
  }
}

// Run the function
debugProductsData();