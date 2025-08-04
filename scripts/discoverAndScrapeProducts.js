const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const axios = require('axios');

// Create directories if they don't exist
const publicDir = path.join(__dirname, '..', 'public');
const productImagesDir = path.join(publicDir, 'product-images');

if (!fs.existsSync(productImagesDir)) {
  fs.mkdirSync(productImagesDir, { recursive: true });
}

// Function to download a file with redirect handling and validation
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const request = protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const newUrl = response.headers.location;
        console.log(`🔄 Redirecting to: ${newUrl}`);
        return downloadFile(newUrl, filepath).then(resolve).catch(reject);
      }
      
      // Check if response is successful
      if (response.statusCode !== 200) {
        console.log(`❌ Failed to download ${url}: ${response.statusCode}`);
        return reject(new Error(`HTTP ${response.statusCode}`));
      }
      
      const file = fs.createWriteStream(filepath);
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        
        // Check file size - reject if 0 KB
        const stats = fs.statSync(filepath);
        if (stats.size === 0) {
          console.log(`❌ Downloaded file is empty (0 KB): ${path.basename(filepath)}`);
          fs.unlinkSync(filepath);
          return reject(new Error('Empty file'));
        }
        
        console.log(`✅ Downloaded: ${path.basename(filepath)} (${(stats.size / 1024).toFixed(2)} KB)`);
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file if it exists
        reject(err);
      });
    });
    
    request.on('error', (err) => {
      reject(err);
    });
    
    request.setTimeout(10000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Function to extract image URL from HTML content
function extractMainProductImage(htmlContent) {
  // Look for the main product image in various common patterns
  const imagePatterns = [
    // WooCommerce product image
    /<img[^>]*class="[^"]*woocommerce-product-gallery__image[^"]*"[^>]*src="([^"]+)"/i,
    // Elementor product image
    /<img[^>]*class="[^"]*elementor-widget-image[^"]*"[^>]*src="([^"]+)"/i,
    // Product gallery image
    /<img[^>]*class="[^"]*product-gallery[^"]*"[^>]*src="([^"]+)"/i,
    // Main product image
    /<img[^>]*class="[^"]*main-product-image[^"]*"[^>]*src="([^"]+)"/i,
    // Any image in the main content area
    /<img[^>]*class="[^"]*attachment-full[^"]*"[^>]*src="([^"]+)"/i,
    // Any image with product-related classes
    /<img[^>]*class="[^"]*product[^"]*"[^>]*src="([^"]+)"/i,
    // Fallback: first image in content
    /<img[^>]*src="([^"]+)"[^>]*>/i
  ];
  
  for (const pattern of imagePatterns) {
    const match = htmlContent.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

// Function to scrape a single product page
async function scrapeProductPage(productUrl, productName) {
  try {
    console.log(`\n🔍 Scraping product page: ${productName}`);
    console.log(`📄 URL: ${productUrl}`);
    
    // Fetch the HTML content from the WordPress page
    const response = await axios.get(productUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });
    
    const htmlContent = response.data;
    const imageUrl = extractMainProductImage(htmlContent);
    
    if (!imageUrl) {
      console.log(`❌ No product image found for: ${productName}`);
      return null;
    }
    
    console.log(`🖼️ Found image: ${imageUrl}`);
    
    // Generate filename from product name
    const filename = productName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() + '.png';
    const filepath = path.join(productImagesDir, filename);
    
    // Download the image
    await downloadFile(imageUrl, filepath);
    
    return {
      productName,
      imageUrl,
      localPath: `/product-images/${filename}`
    };
    
  } catch (error) {
    console.log(`❌ Error scraping ${productName}: ${error.message}`);
    return null;
  }
}

// Comprehensive list of product URLs from the existing data files
const productPages = [
  // From scrapeProducts.js
  {
    name: "IC933-CA-Compliant-Multi-Purpose-Contact-Adhesive",
    url: "https://forzabuilt.com/product/ic933-ca-compliant-multi-purpose-contact-adhesive/"
  },
  {
    name: "IC934-Semi-Pressure-Sensitive-Web-Spray",
    url: "https://forzabuilt.com/product/ic934-semi-pressure-sensitive-web-spray/"
  },
  {
    name: "IC946-CA-Compliant-Pressure-Sensitive-Contact-Adhesive",
    url: "https://forzabuilt.com/product/ic946-ca-compliant-pressure-sensitive-contact-adhesive/"
  },
  {
    name: "MC739-Mist-Spray-Adhesive-for-Fiberglass-Infusion-Molding",
    url: "https://forzabuilt.com/product/mc739-mist-spray-adhesive-for-fiberglass-infusion-molding/"
  },
  {
    name: "MC722-Web-Spray-Adhesive-for-Marine-Infusion-Molding",
    url: "https://forzabuilt.com/product/mc722-web-spray-adhesive-for-marine-infusion-molding/"
  },
  {
    name: "C130-High-Heat-Neoprene-Adhesive",
    url: "https://forzabuilt.com/product/c130-high-heat-neoprene-adhesive/"
  },
  {
    name: "C150-CA-Compliant-High-Solids-Contact-Adhesive",
    url: "https://forzabuilt.com/product/c150-ca-compliant-high-solids-contact-adhesive/"
  },
  {
    name: "C331-Non-Flammable-Contact-Adhesive",
    url: "https://forzabuilt.com/product/c331-non-flammable-contact-adhesive/"
  },
  {
    name: "FRP-Rollable-Adhesive",
    url: "https://forzabuilt.com/product/frp-rollable-adhesive/"
  },
  {
    name: "I1000-Low-Medium-Viscosity-Laminating-Adhesive",
    url: "https://forzabuilt.com/product/i1000-low-medium-viscosity-laminating-adhesive/"
  },
  {
    name: "OA4-High-Strength-Moisture-Cure-Eco-Friendly-Adhesive-Sealant",
    url: "https://forzabuilt.com/product/oa4-high-strength-moisture-cure-eco-friendly-adhesive-sealant/"
  },
  {
    name: "OA75-Trowellable-Flooring-Adhesive",
    url: "https://forzabuilt.com/product/oa75-trowellable-flooring-adhesive/"
  },
  {
    name: "OA99-Bonding-Putty",
    url: "https://forzabuilt.com/product/oa99-bonding-putty/"
  },
  {
    name: "OSA-Adhesive-Primer-and-Promoter",
    url: "https://forzabuilt.com/product/osa-adhesive-primer-and-promoter/"
  },
  {
    name: "OS24-High-Strength-Moisture-Cure-Single-Part-Thixotropic-Structural-Adhesive-Sealant",
    url: "https://forzabuilt.com/product/os24-high-strength-moisture-cure-single-part-thixotropic-structural-adhesive-sealant/"
  },
  {
    name: "R160-Epoxy-Quick-Set-High-Strength-Tack-Strength-Adhesive",
    url: "https://forzabuilt.com/product/r160-epoxy-quick-set-high-strength-tack-strength-adhesive/"
  },
  {
    name: "R221-Two-Part-1-1-Modified-Epoxy-Adhesive",
    url: "https://forzabuilt.com/product/r221-two-part-1-1-modified-epoxy-adhesive/"
  },
  {
    name: "R519-Fast-Acting-Two-Part-Methacrylate-Adhesive",
    url: "https://forzabuilt.com/product/r519-fast-acting-two-part-methacrylate-adhesive/"
  },
  {
    name: "R529-Structural-Anchoring-Epoxy",
    url: "https://forzabuilt.com/product/r529-structural-anchoring-epoxy/"
  },
  {
    name: "FC-CAR-Citrus-Based-Adhesive-Remover-Cleaner",
    url: "https://forzabuilt.com/product/fc-car-citrus-based-adhesive-remover-cleaner/"
  },
  {
    name: "S228-Adhesive-Primer-and-Promoter",
    url: "https://forzabuilt.com/product/s228-adhesive-primer-and-promoter/"
  },
  // Additional product URLs
  {
    name: "C-OS9-Hybrid-Polymer-Structural-Single-Part-Moisture-Cure-Adhesive",
    url: "https://forzabuilt.com/product/c-os9-hybrid-polymer-structural-single-part-moisture-cure-adhesive/"
  },
  {
    name: "T-OS150-High-Performance-Semi-Self-Leveling-Hybrid-Polymer-Sealant",
    url: "https://forzabuilt.com/product/t-os150-high-performance-semi-self-leveling-hybrid-polymer-sealant/"
  },
  {
    name: "T-OS151-Non-Hazardous-High-Strength-Single-Part-Hybrid-Polymer-Sealant",
    url: "https://forzabuilt.com/product/t-os151-non-hazardous-high-strength-single-part-hybrid-polymer-sealant/"
  },
  {
    name: "T-OS164-Silicone-Sealant",
    url: "https://forzabuilt.com/product/t-os164-silicone-sealant/"
  },
  {
    name: "TAC-734G-Web-Spray-High-Tack-Infusion-Molding-Adhesive",
    url: "https://forzabuilt.com/product/tac-734g-web-spray-high-tack-infusion-molding-adhesive/"
  },
  {
    name: "TAC-735R-Mist-Spray-No-HAPS-Infusion-Molding-Adhesive",
    url: "https://forzabuilt.com/product/tac-735r-mist-spray-no-haps-infusion-molding-adhesive/"
  },
  {
    name: "TAC-738R-Web-Spray-Zero-VOC-Infusion-Molding-Adhesive",
    url: "https://forzabuilt.com/product/tac-738r-web-spray-zero-voc-infusion-molding-adhesive/"
  },
  {
    name: "TAC-739R-Mist-Spray-Infusion-Molding-Adhesive",
    url: "https://forzabuilt.com/product/tac-739r-mist-spray-infusion-molding-adhesive/"
  }
];

// Main scraping function
async function scrapeAllProductImages() {
  console.log('🚀 Starting comprehensive product image scraping...\n');
  console.log(`📋 Total products to scrape: ${productPages.length}\n`);
  
  const results = [];
  
  for (const product of productPages) {
    const result = await scrapeProductPage(product.url, product.name);
    if (result) {
      results.push(result);
    }
    
    // Add a small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n📊 SCRAPING SUMMARY:');
  console.log(`✅ Successfully scraped: ${results.length} product images`);
  console.log(`❌ Failed: ${productPages.length - results.length} products`);
  
  if (results.length > 0) {
    console.log('\n📁 Downloaded images:');
    results.forEach(result => {
      console.log(`  ✅ ${result.productName} -> ${result.localPath}`);
    });
  }
  
  // Save results to a JSON file
  const resultsFile = path.join(__dirname, 'scraped-product-images.json');
  fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
  console.log(`\n📄 Saved results to: ${resultsFile}`);
  
  return results;
}

// Run the scraper
if (require.main === module) {
  scrapeAllProductImages()
    .then(() => {
      console.log('\n🎉 Product image scraping completed!');
    })
    .catch(error => {
      console.error('❌ Scraping failed:', error);
      process.exit(1);
    });
}

module.exports = {
  scrapeProductPage,
  scrapeAllProductImages
}; 