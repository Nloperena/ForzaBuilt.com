const fs = require('fs');
const path = require('path');

try {
  // Load product data
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'productsSimplified.json')));
  const products = data.products;
  
  console.log(`Total products: ${products.length}`);
  
  // Count different types of image URLs
  const localImageUrls = products.filter(p => 
    p.imageUrl && (p.imageUrl.startsWith('/product-images/') || p.imageUrl.startsWith('./product-images/'))
  );
  
  const forzaBuiltUrls = products.filter(p => 
    p.imageUrl && p.imageUrl.includes('forzabuilt.com')
  );
  
  const otherUrls = products.filter(p => 
    p.imageUrl && 
    !p.imageUrl.includes('forzabuilt.com') && 
    !p.imageUrl.startsWith('/product-images/') &&
    !p.imageUrl.startsWith('./product-images/')
  );
  
  console.log(`Products with local image paths: ${localImageUrls.length}`);
  console.log(`Products with forzabuilt.com URLs: ${forzaBuiltUrls.length}`);
  console.log(`Products with other URLs: ${otherUrls.length}`);
  
  // Show examples of each type
  console.log('\nSample local image paths:');
  localImageUrls.slice(0, 5).forEach(p => {
    console.log(`- ${p.id}: ${p.imageUrl}`);
  });
  
  if (forzaBuiltUrls.length > 0) {
    console.log('\nRemaining forzabuilt.com URLs:');
    forzaBuiltUrls.slice(0, 5).forEach(p => {
      console.log(`- ${p.id}: ${p.imageUrl}`);
    });
  }
  
  if (otherUrls.length > 0) {
    console.log('\nOther URL types:');
    otherUrls.slice(0, 5).forEach(p => {
      console.log(`- ${p.id}: ${p.imageUrl}`);
    });
  }
  
} catch (error) {
  console.error('Error:', error.message);
}
