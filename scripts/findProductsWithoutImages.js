const fs = require('fs');
const path = require('path');

try {
  // Load product data
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'productsSimplified.json')));
  const products = data.products;
  
  console.log(`Total products: ${products.length}`);
  
  // Find products without images
  const withoutImages = products.filter(p => !p.imageUrl || p.imageUrl.trim() === '');
  const withImages = products.filter(p => p.imageUrl && p.imageUrl.trim() !== '');
  
  console.log(`Products with images: ${withImages.length}`);
  console.log(`Products without images: ${withoutImages.length}`);
  
  // List products without images
  if (withoutImages.length > 0) {
    console.log('\nProducts without images:');
    withoutImages.forEach(p => {
      console.log(`- ${p.id}: ${p.name}`);
    });
  }
  
  // Show sample of image URLs
  console.log('\nSample image URLs:');
  for (let i = 0; i < Math.min(5, withImages.length); i++) {
    const product = withImages[i];
    console.log(`- ${product.id}: ${product.imageUrl}`);
  }
  
  // Check if URLs are from forzabuilt.com
  const forzaBuiltImages = withImages.filter(p => 
    p.imageUrl && p.imageUrl.includes('forzabuilt.com')
  );
  
  console.log(`\nProducts with forzabuilt.com URLs: ${forzaBuiltImages.length}`);
  
} catch (error) {
  console.error('Error:', error.message);
}
