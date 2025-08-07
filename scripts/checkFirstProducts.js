const fs = require('fs');

try {
  const data = fs.readFileSync('./src/data/productsSimplified.json', 'utf8');
  const products = JSON.parse(data).products;
  
  console.log('First 5 products:');
  
  for (let i = 0; i < Math.min(5, products.length); i++) {
    const product = products[i];
    console.log(`\n#${i+1} - ${product.id} (${product.name})`);
    console.log(`imageUrl: ${product.imageUrl}`);
  }
  
} catch (error) {
  console.error('Error:', error.message);
  console.error(error.stack);
}
