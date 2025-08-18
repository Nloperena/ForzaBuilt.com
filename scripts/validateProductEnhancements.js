const fs = require('fs');
const path = require('path');

console.log('✅ PRODUCT ENHANCEMENT VALIDATION');
console.log('=================================\n');

// Read the enhanced products data
const productsDataPath = path.join(__dirname, '../public/productsSimplified.json');
const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));

console.log('📊 Enhanced Product Catalog Analysis:\n');

// Validation statistics
const stats = {
  total: productsData.products.length,
  withSizing: 0,
  withTechnicalData: 0,
  withCorrectImages: 0,
  withPlaceholderImages: 0,
  complete: 0,
  needsWork: []
};

// Image directory check
const imageDir = path.join(__dirname, '../public/product-images');
const availableImages = fs.readdirSync(imageDir)
  .filter(file => file.match(/\.(png|jpg|jpeg)$/i))
  .map(file => file.toLowerCase());

console.log('🔍 Validating each product...\n');

productsData.products.forEach(product => {
  let completeness = 0;
  let issues = [];
  
  // Check sizing data
  if (product.sizes && product.sizes.length > 0) {
    stats.withSizing++;
    completeness++;
  } else {
    issues.push('Missing sizing data');
  }
  
  // Check technical data
  if (product.technicalData && Object.keys(product.technicalData).length > 0) {
    stats.withTechnicalData++;
    completeness++;
    
    // Check for the 6 standard TDS fields
    const requiredFields = ['appearance', 'shelfLife', 'solids', 'solvent', 'voc', 'viscosity'];
    const hasFields = requiredFields.filter(field => 
      product.technicalData.hasOwnProperty(field)
    );
    
    if (hasFields.length >= 3) {
      completeness++;
    } else {
      issues.push(`Technical data incomplete (has ${hasFields.length}/6 TDS fields)`);
    }
  } else {
    issues.push('Missing technical data');
  }
  
  // Check image mapping
  if (product.imageUrl) {
    if (product.imageUrl === '/product-images/oa23.png') {
      stats.withPlaceholderImages++;
      issues.push('Still using placeholder image (oa23.png)');
    } else {
      stats.withCorrectImages++;
      completeness++;
      
      // Verify image actually exists
      const imageName = product.imageUrl.split('/').pop().toLowerCase();
      if (!availableImages.includes(imageName)) {
        issues.push(`Image file missing: ${imageName}`);
        completeness--;
      }
    }
  } else {
    issues.push('No image URL specified');
  }
  
  // Determine if product is complete
  if (completeness >= 3 && issues.length === 0) {
    stats.complete++;
  } else if (issues.length > 0) {
    stats.needsWork.push({
      id: product.id,
      name: product.name,
      completeness: completeness,
      issues: issues
    });
  }
});

// Display comprehensive results
console.log('📈 ENHANCEMENT VALIDATION RESULTS:');
console.log('===================================\n');

console.log(`📊 Overall Statistics:`);
console.log(`   • Total products: ${stats.total}`);
console.log(`   • Products with sizing data: ${stats.withSizing} (${(stats.withSizing/stats.total*100).toFixed(1)}%)`);
console.log(`   • Products with technical data: ${stats.withTechnicalData} (${(stats.withTechnicalData/stats.total*100).toFixed(1)}%)`);
console.log(`   • Products with correct images: ${stats.withCorrectImages} (${(stats.withCorrectImages/stats.total*100).toFixed(1)}%)`);
console.log(`   • Products still using placeholders: ${stats.withPlaceholderImages}`);
console.log(`   • Fully complete products: ${stats.complete} (${(stats.complete/stats.total*100).toFixed(1)}%)`);

console.log(`\n🎯 Success Rate: ${(stats.complete/stats.total*100).toFixed(1)}% of products fully enhanced!`);

// Show products that need attention
if (stats.needsWork.length > 0) {
  console.log(`\n⚠️  Products needing attention (${stats.needsWork.length}):`);
  stats.needsWork.slice(0, 10).forEach(product => {
    console.log(`   • ${product.id}: ${product.issues.join(', ')}`);
  });
  
  if (stats.needsWork.length > 10) {
    console.log(`   ... and ${stats.needsWork.length - 10} more`);
  }
}

// Quality recommendations
console.log(`\n💡 RECOMMENDATIONS:`);

if (stats.withPlaceholderImages > 0) {
  console.log(`   🖼️  Create specific images for ${stats.withPlaceholderImages} products using oa23.png placeholder`);
}

if (stats.withSizing < stats.total) {
  console.log(`   📦 Add sizing data for ${stats.total - stats.withSizing} products from PDF technical sheets`);
}

if (stats.withTechnicalData < stats.total) {
  console.log(`   🔬 Extract technical data for ${stats.total - stats.withTechnicalData} products from PDFs`);
}

// Sample enhanced products
const sampleEnhanced = productsData.products
  .filter(p => p.sizes?.length > 0 && p.technicalData && Object.keys(p.technicalData).length > 2)
  .slice(0, 5);

if (sampleEnhanced.length > 0) {
  console.log(`\n✨ SAMPLE ENHANCED PRODUCTS:`);
  sampleEnhanced.forEach(product => {
    console.log(`   📦 ${product.id}:`);
    console.log(`      • Sizes: ${product.sizes?.join(', ') || 'None'}`);
    console.log(`      • Technical fields: ${Object.keys(product.technicalData || {}).join(', ')}`);
    console.log(`      • Image: ${product.imageUrl?.split('/').pop() || 'None'}`);
  });
}

console.log(`\n🎉 MASS ENHANCEMENT VALIDATION COMPLETE!`);
console.log(`🚀 ${stats.complete} products are now fully enhanced with C331-level quality!`);





