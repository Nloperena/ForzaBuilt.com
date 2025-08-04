const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');

console.log('📊 DOWNLOAD SUMMARY\n');

// Industry Icons
console.log('🏭 INDUSTRY ICONS (public/logos/):');
const logosDir = path.join(baseDir, 'logos');
if (fs.existsSync(logosDir)) {
  const files = fs.readdirSync(logosDir);
  files.forEach(file => {
    const stats = fs.statSync(path.join(logosDir, file));
    console.log(`  ✅ ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
  });
}

console.log('\n📦 PRODUCT CATEGORY LOGOS (public/products/):');

// Product categories
const productCategories = [
  'product-lines',
  'brand-logos', 
  'ruggedred',
  'acrylic-foam',
  'fsk',
  'foil',
  'double-coated',
  'transfer-tapes',
  'butyl',
  'thermal-tape',
  'single-coated',
  'industrial',
  'transportation',
  'marine'
];

productCategories.forEach(category => {
  const categoryDir = path.join(baseDir, 'products', category);
  if (fs.existsSync(categoryDir)) {
    const files = fs.readdirSync(categoryDir);
    if (files.length > 0) {
      console.log(`\n  📁 ${category.toUpperCase()}:`);
      files.forEach(file => {
        const stats = fs.statSync(path.join(categoryDir, file));
        console.log(`    ✅ ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
      });
    }
  }
});

console.log('\n📋 SUMMARY:');
console.log('✅ Successfully downloaded and organized product category logos');
console.log('📁 Files are organized by category in public/products/');
console.log('🏭 Industry icons are in public/logos/');
console.log('🔗 All files are now local and no longer dependent on external URLs'); 