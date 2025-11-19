const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function downloadImage(url, productId) {
  try {
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'stream'
    });
    
    // Get file extension from URL
    const ext = path.extname(url).split('?')[0] || '.png';
    const filename = `${productId}${ext}`;
    const outputPath = path.join(__dirname, '../temp-product-images', filename);
    
    // Create directory if it doesn't exist
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const writer = fs.createWriteStream(outputPath);
    response.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(outputPath));
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`Failed to download ${url}:`, error.message);
    return null;
  }
}

async function downloadAllImages() {
  console.log('Downloading product images from WordPress...\n');
  
  // Read the backend import file
  const importFile = path.join(__dirname, '../src/data/scrapedProducts/backend-import.json');
  const products = JSON.parse(fs.readFileSync(importFile, 'utf8'));
  
  console.log(`Found ${products.length} products to process\n`);
  
  const results = [];
  
  for (const product of products) {
    if (product.image && product.image.includes('forzabuilt.com')) {
      console.log(`Downloading ${product.product_id}...`);
      const filePath = await downloadImage(product.image, product.product_id);
      
      if (filePath) {
        console.log(`  ✅ Saved to: ${filePath}`);
        results.push({ id: product.product_id, success: true, path: filePath });
      } else {
        console.log(`  ❌ Failed`);
        results.push({ id: product.product_id, success: false });
      }
      
      // Wait a bit between downloads
      await new Promise(resolve => setTimeout(resolve, 500));
    } else {
      console.log(`Skipping ${product.product_id} - already has external image or no image`);
    }
  }
  
  console.log('\n=== DOWNLOAD SUMMARY ===');
  console.log(`Total: ${results.length}`);
  console.log(`Success: ${results.filter(r => r.success).length}`);
  console.log(`Failed: ${results.filter(r => !r.success).length}`);
  console.log('\nImages saved to: temp-product-images/');
  console.log('\n📌 NEXT STEP: Upload these images to Vercel Blob and update your database');
}

downloadAllImages();






























