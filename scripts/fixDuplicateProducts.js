const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '..', 'src', 'data', 'productsMerged.json');

try {
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  console.log(`Original products: ${products.length}`);
  
  // Remove duplicates by keeping only the first occurrence of each ID
  const uniqueProducts = [];
  const seenIds = new Set();
  
  products.forEach(product => {
    const id = product.id?.toLowerCase();
    if (id && !seenIds.has(id)) {
      seenIds.add(id);
      uniqueProducts.push(product);
    }
  });
  
  console.log(`Unique products: ${uniqueProducts.length}`);
  console.log(`Removed ${products.length - uniqueProducts.length} duplicates`);
  
  // Write back the unique products
  fs.writeFileSync(productsPath, JSON.stringify(uniqueProducts, null, 2));
  console.log('✅ Fixed duplicates!');
  
} catch (error) {
  console.error('Error:', error.message);
} 