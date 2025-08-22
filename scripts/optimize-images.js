#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if ImageMagick is installed
function checkImageMagick() {
  try {
    execSync('magick --version', { stdio: 'ignore' });
    return true;
  } catch {
    console.log('❌ ImageMagick not found. Please install ImageMagick to optimize images.');
    console.log('   Download from: https://imagemagick.org/script/download.php');
    return false;
  }
}

// Optimize a single image
function optimizeImage(inputPath, outputPath, quality = 80) {
  try {
    // Convert to WebP with compression
    execSync(`magick "${inputPath}" -quality ${quality} -define webp:lossless=false "${outputPath}"`);
    
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ Optimized: ${path.basename(inputPath)}`);
    console.log(`   Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Optimized: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Reduction: ${reduction}%`);
    
    return true;
  } catch (error) {
    console.log(`❌ Failed to optimize ${path.basename(inputPath)}: ${error.message}`);
    return false;
  }
}

// Find large images (>500KB)
function findLargeImages(dir) {
  const largeImages = [];
  
  function scanDirectory(currentDir) {
    const files = fs.readdirSync(currentDir);
    
    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (stat.isFile() && /\.(png|jpg|jpeg)$/i.test(file)) {
        const sizeMB = stat.size / 1024 / 1024;
        if (sizeMB > 0.5) { // Larger than 500KB
          largeImages.push({
            path: filePath,
            size: stat.size,
            sizeMB: sizeMB
          });
        }
      }
    }
  }
  
  scanDirectory(dir);
  return largeImages.sort((a, b) => b.size - a.size);
}

// Main function
async function main() {
  if (!checkImageMagick()) {
    return;
  }
  
  console.log('🔍 Scanning for large images...');
  
  const publicDir = path.join(__dirname, '..', 'public');
  const largeImages = findLargeImages(publicDir);
  
  if (largeImages.length === 0) {
    console.log('✅ No large images found!');
    return;
  }
  
  console.log(`\n📊 Found ${largeImages.length} large images:`);
  largeImages.forEach(img => {
    console.log(`   ${path.basename(img.path)} - ${img.sizeMB.toFixed(2)} MB`);
  });
  
  console.log('\n🚀 Starting optimization...\n');
  
  let successCount = 0;
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  for (const image of largeImages) {
    const dir = path.dirname(image.path);
    const name = path.basename(image.path, path.extname(image.path));
    const webpPath = path.join(dir, `${name}.webp`);
    
    totalOriginalSize += image.size;
    
    if (optimizeImage(image.path, webpPath)) {
      successCount++;
      const optimizedSize = fs.statSync(webpPath).size;
      totalOptimizedSize += optimizedSize;
    }
  }
  
  console.log('\n📈 Optimization Summary:');
  console.log(`   Images processed: ${successCount}/${largeImages.length}`);
  console.log(`   Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Total optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Total reduction: ${((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1)}%`);
  
  console.log('\n💡 Next steps:');
  console.log('   1. Update image references in your code to use .webp files');
  console.log('   2. Consider implementing lazy loading for images');
  console.log('   3. Use responsive images with different sizes');
}

main().catch(console.error);













