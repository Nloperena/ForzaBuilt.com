const fs = require('fs');
const path = require('path');

console.log('🖼️  COMPREHENSIVE IMAGE AUDIT & FIX');
console.log('===================================\n');

// Read current products data
const productsDataPath = path.join(__dirname, '../public/productsSimplified.json');
const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));

// Get all available images
const imageDir = path.join(__dirname, '../public/product-images');
const availableImages = fs.readdirSync(imageDir)
  .filter(file => file.match(/\.(png|jpg|jpeg)$/i));

console.log(`📊 Analysis:`);
console.log(`   • Total products: ${productsData.products.length}`);
console.log(`   • Available images: ${availableImages.length}`);

// Create mapping of available images (normalize names for matching)
const imageMap = {};
availableImages.forEach(image => {
  const baseName = image.replace(/\.(png|jpg|jpeg)$/i, '').toLowerCase();
  imageMap[baseName] = image;
});

console.log(`\n🔍 Checking each product's image mapping...\n`);

let stats = {
  correct: 0,
  fixed: 0,
  missing: 0,
  errors: []
};

// Check and fix each product
productsData.products.forEach(product => {
  const productId = product.id.toLowerCase();
  const currentImage = product.imageUrl;
  
  // Check if product has a matching image available
  if (imageMap[productId]) {
    const correctImage = `/product-images/${imageMap[productId]}`;
    
    if (currentImage === correctImage) {
      stats.correct++;
      console.log(`✅ ${product.id}: Correct image (${imageMap[productId]})`);
    } else {
      // Fix the image mapping
      product.imageUrl = correctImage;
      stats.fixed++;
      console.log(`🔧 ${product.id}: Fixed ${currentImage?.split('/').pop() || 'None'} → ${imageMap[productId]}`);
    }
  } else {
    // No exact match found, try variations
    const variations = [
      productId,
      productId.replace('-', ''),
      productId.replace('-', '_'),
      // Try with common prefixes/suffixes removed
      productId.replace(/^(m-|c-|t-|r-|rc|tc|tac-)/, ''),
      productId.replace(/(--.*$)/, ''), // Remove long suffixes
    ];
    
    let found = false;
    for (const variation of variations) {
      if (imageMap[variation]) {
        const correctImage = `/product-images/${imageMap[variation]}`;
        product.imageUrl = correctImage;
        stats.fixed++;
        found = true;
        console.log(`🔧 ${product.id}: Matched variation "${variation}" → ${imageMap[variation]}`);
        break;
      }
    }
    
    if (!found) {
      stats.missing++;
      console.log(`❌ ${product.id}: No matching image found (current: ${currentImage?.split('/').pop() || 'None'})`);
      stats.errors.push({
        productId: product.id,
        productName: product.name,
        currentImage: currentImage,
        issue: 'No matching image available'
      });
    }
  }
});

console.log(`\n📊 IMAGE AUDIT RESULTS:`);
console.log(`   • Correct mappings: ${stats.correct}`);
console.log(`   • Fixed mappings: ${stats.fixed}`);
console.log(`   • Missing images: ${stats.missing}`);
console.log(`   • Success rate: ${((stats.correct + stats.fixed) / productsData.products.length * 100).toFixed(1)}%`);

// Show products with missing images
if (stats.errors.length > 0) {
  console.log(`\n⚠️  Products needing image files (${stats.errors.length}):`);
  stats.errors.slice(0, 15).forEach(error => {
    console.log(`   • ${error.productId} (${error.productName})`);
  });
  
  if (stats.errors.length > 15) {
    console.log(`   ... and ${stats.errors.length - 15} more`);
  }
}

// Save the corrected data
fs.writeFileSync(productsDataPath, JSON.stringify(productsData, null, 2));
console.log(`\n✅ Updated product data saved`);

// Analyze unused images
const usedImages = new Set();
productsData.products.forEach(product => {
  if (product.imageUrl) {
    const imageName = product.imageUrl.split('/').pop();
    if (imageName) usedImages.add(imageName);
  }
});

const unusedImages = availableImages.filter(img => !usedImages.has(img));

if (unusedImages.length > 0) {
  console.log(`\n📋 Unused images (${unusedImages.length}):`);
  unusedImages.slice(0, 10).forEach(img => {
    console.log(`   • ${img}`);
  });
  if (unusedImages.length > 10) {
    console.log(`   ... and ${unusedImages.length - 10} more`);
  }
}

console.log(`\n🎯 RECOMMENDATIONS:`);
if (stats.missing > 0) {
  console.log(`   📸 Create ${stats.missing} missing product images`);
}
if (unusedImages.length > 0) {
  console.log(`   🔄 Review ${unusedImages.length} unused images - might match products with missing images`);
}

console.log(`\n🚀 IMAGE AUDIT COMPLETE!`);
console.log(`📈 Improved from unknown accuracy to ${((stats.correct + stats.fixed) / productsData.products.length * 100).toFixed(1)}% correct image mappings!`);
