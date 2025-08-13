const fs = require('fs');
const path = require('path');

console.log('🧠 INTELLIGENT IMAGE MATCHING');
console.log('=============================\n');

// Read current products data
const productsDataPath = path.join(__dirname, '../public/productsSimplified.json');
const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));

// Get all available images
const imageDir = path.join(__dirname, '../public/product-images');
const availableImages = fs.readdirSync(imageDir)
  .filter(file => file.match(/\.(png|jpg|jpeg)$/i));

// Function to calculate string similarity (Levenshtein distance)
function similarity(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  const maxLen = Math.max(a.length, b.length);
  return (maxLen - matrix[b.length][a.length]) / maxLen;
}

// Find products with missing or potentially wrong images
const problemProducts = [];
const usedImages = new Set();

productsData.products.forEach(product => {
  const productId = product.id.toLowerCase();
  const currentImage = product.imageUrl;
  
  if (currentImage) {
    const imageName = currentImage.split('/').pop();
    if (imageName) usedImages.add(imageName);
    
    // Check if the current image actually exists
    const imagePath = path.join(imageDir, imageName);
    if (!fs.existsSync(imagePath)) {
      problemProducts.push({
        ...product,
        issue: 'Image file does not exist',
        currentImage: imageName
      });
    } else {
      // Check if image name closely matches product ID
      const imageBaseName = imageName.replace(/\.(png|jpg|jpeg)$/i, '').toLowerCase();
      const sim = similarity(productId, imageBaseName);
      
      if (sim < 0.7) { // Less than 70% similarity
        problemProducts.push({
          ...product,
          issue: 'Image name doesn\'t match product ID well',
          currentImage: imageName,
          similarity: sim
        });
      }
    }
  } else {
    problemProducts.push({
      ...product,
      issue: 'No image assigned',
      currentImage: null
    });
  }
});

console.log(`🔍 Found ${problemProducts.length} products with potential image issues\n`);

// For each problem product, find the best matching available image
let fixed = 0;
const unusedImages = availableImages.filter(img => !usedImages.has(img));

problemProducts.forEach(product => {
  console.log(`🔧 Fixing ${product.id} (${product.issue})`);
  
  let bestMatch = null;
  let bestScore = 0;
  
  // Try to match against all available images
  availableImages.forEach(imageName => {
    const imageBaseName = imageName.replace(/\.(png|jpg|jpeg)$/i, '').toLowerCase();
    const productId = product.id.toLowerCase();
    
    // Direct match
    let score = similarity(productId, imageBaseName);
    
    // Try variations
    const variations = [
      productId.replace(/-/g, ''),
      productId.replace(/-/g, '_'),
      productId.replace(/^(m-|c-|t-|r-|rc|tc|tac-)/, ''),
      productId.replace(/--.*$/, ''),
      productId.split('-')[0], // Just the main part
    ];
    
    variations.forEach(variation => {
      const varScore = similarity(variation, imageBaseName);
      if (varScore > score) score = varScore;
    });
    
    // Boost score if it contains the product name parts
    const productParts = productId.split(/[-_]/);
    const imageParts = imageBaseName.split(/[-_]/);
    
    let partMatches = 0;
    productParts.forEach(part => {
      if (part.length > 1 && imageParts.some(imgPart => imgPart.includes(part) || part.includes(imgPart))) {
        partMatches++;
      }
    });
    
    if (partMatches > 0) {
      score += (partMatches / productParts.length) * 0.3; // Boost for part matches
    }
    
    if (score > bestScore && score > 0.6) { // Minimum 60% similarity
      bestScore = score;
      bestMatch = imageName;
    }
  });
  
  if (bestMatch) {
    // Update the product with the best matching image
    const productIndex = productsData.products.findIndex(p => p.id === product.id);
    if (productIndex !== -1) {
      productsData.products[productIndex].imageUrl = `/product-images/${bestMatch}`;
      fixed++;
      console.log(`   ✅ Matched to: ${bestMatch} (${(bestScore * 100).toFixed(1)}% confidence)`);
    }
  } else {
    console.log(`   ❌ No good match found`);
  }
});

console.log(`\n📊 INTELLIGENT MATCHING RESULTS:`);
console.log(`   • Problem products identified: ${problemProducts.length}`);
console.log(`   • Successfully fixed: ${fixed}`);
console.log(`   • Still need attention: ${problemProducts.length - fixed}`);

// Save the improved data
fs.writeFileSync(productsDataPath, JSON.stringify(productsData, null, 2));
console.log(`\n✅ Updated product data saved`);

// Show unused images that might be useful
if (unusedImages.length > 0) {
  console.log(`\n📋 Unused images that might match missing products:`);
  unusedImages.slice(0, 20).forEach(img => {
    const baseName = img.replace(/\.(png|jpg|jpeg)$/i, '');
    console.log(`   • ${img} (${baseName})`);
  });
}

console.log(`\n🎯 INTELLIGENT IMAGE MATCHING COMPLETE!`);
console.log(`🚀 Fixed ${fixed} additional image mappings using smart matching!`);

