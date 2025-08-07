const fs = require('fs');
const path = require('path');

try {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'productsSimplified.json')));
  console.log('Data loaded successfully');
  console.log('Products count:', data.products.length);
  
  // Check first product
  const firstProduct = data.products[0];
  console.log('First product:', JSON.stringify(firstProduct, null, 2));
  
} catch (error) {
  console.error('Error:', error.message);
}
