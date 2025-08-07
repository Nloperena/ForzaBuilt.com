const fs = require('fs');
const path = require('path');

// Path to the products JSON file
const productsJsonPath = path.join(__dirname, '..', 'src', 'data', 'productsWithTdsLinks.json');

// Function to add productLine property based on category
function addProductLineProperty() {
  console.log('Adding productLine property to products...');
  
  try {
    // Read the products JSON file
    const productsData = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));
    
    // Count products before modification
    console.log(`Found ${productsData.products.length} products`);
    
    // Add productLine property based on category
    productsData.products = productsData.products.map(product => {
      // If product already has a productLine property, keep it
      if (product.productLine) {
        return product;
      }
      
      // Add productLine based on category
      const category = product.category ? product.category.toLowerCase() : '';
      let productLine = '';
      
      if (category === 'bond' || category.includes('bond')) {
        productLine = 'bond';
      } else if (category === 'seal' || category.includes('seal')) {
        productLine = 'seal';
      } else if (category === 'tape' || category.includes('tape') || category === 'ruggedred' || category.includes('ruggedred')) {
        productLine = 'tape';
      } else {
        // Default to category if no match
        productLine = category;
      }
      
      return {
        ...product,
        productLine
      };
    });
    
    // Write the updated products JSON file
    fs.writeFileSync(productsJsonPath, JSON.stringify(productsData, null, 2), 'utf8');
    
    // Count products with productLine property
    const productsWithProductLine = productsData.products.filter(p => p.productLine).length;
    console.log(`Added productLine property to ${productsWithProductLine} products`);
    console.log('Done!');
  } catch (error) {
    console.error('Error adding productLine property:', error);
  }
}

// Run the function
addProductLineProperty();