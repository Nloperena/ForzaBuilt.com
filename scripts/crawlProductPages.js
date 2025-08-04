const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const axios = require('axios');
const cheerio = require('cheerio');

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

// Function to discover product pages from a given URL
async function discoverProductPages(startUrl) {
  const discoveredPages = new Set();
  const visitedUrls = new Set();
  const queue = [startUrl];
  
  console.log(`🔍 Starting crawl from: ${startUrl}`);
  
  while (queue.length > 0) {
    const currentUrl = queue.shift();
    
    if (visitedUrls.has(currentUrl)) {
      continue;
    }
    
    visitedUrls.add(currentUrl);
    
    try {
      console.log(`📄 Crawling: ${currentUrl}`);
      
      const response = await axios.get(currentUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 10000
      });
      
      const $ = cheerio.load(response.data);
      
      // Find all links on the page
      $('a[href]').each((i, element) => {
        const href = $(element).attr('href');
        
        if (href && href.includes('forzabuilt.com/product/')) {
          // Clean the URL
          let cleanUrl = href;
          if (href.startsWith('/')) {
            cleanUrl = `https://forzabuilt.com${href}`;
          } else if (!href.startsWith('http')) {
            cleanUrl = `https://forzabuilt.com/${href}`;
          }
          
          // Remove query parameters and fragments
          cleanUrl = cleanUrl.split('?')[0].split('#')[0];
          
          if (!visitedUrls.has(cleanUrl) && !queue.includes(cleanUrl)) {
            queue.push(cleanUrl);
            discoveredPages.add(cleanUrl);
            console.log(`🔗 Found product page: ${cleanUrl}`);
          }
        }
      });
      
      // Add a small delay between requests
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.log(`❌ Error crawling ${currentUrl}: ${error.message}`);
    }
  }
  
  return Array.from(discoveredPages);
}

// Function to scrape a single product page
async function scrapeProductPage(productUrl) {
  try {
    console.log(`\n🔍 Scraping product page: ${productUrl}`);
    
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
      console.log(`❌ No product image found for: ${productUrl}`);
      return null;
    }
    
    console.log(`🖼️ Found image: ${imageUrl}`);
    
    // Extract product name from URL
    const urlParts = productUrl.split('/');
    const productSlug = urlParts[urlParts.length - 2]; // Get the slug before the trailing slash
    const productName = productSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    // Generate filename from product slug
    const filename = productSlug + '.png';
    const filepath = path.join(productImagesDir, filename);
    
    // Download the image
    await downloadFile(imageUrl, filepath);
    
    return {
      productName,
      productSlug,
      imageUrl,
      localPath: `/product-images/${filename}`
    };
    
  } catch (error) {
    console.log(`❌ Error scraping ${productUrl}: ${error.message}`);
    return null;
  }
}

// Main crawling and scraping function
async function crawlAndScrapeAllProducts() {
  console.log('🚀 Starting comprehensive product page crawling and scraping...\n');
  
  // Starting URLs for crawling
  const startUrls = [
    'https://forzabuilt.com/products/',
    'https://forzabuilt.com/products/forza-bond/',
    'https://forzabuilt.com/products/forza-seal/',
    'https://forzabuilt.com/products/forza-tape/',
    'https://forzabuilt.com/products/forza-clean/',
    'https://forzabuilt.com/industries/',
    'https://forzabuilt.com/industries/general-industries-products/',
    'https://forzabuilt.com/industries/marine-products/',
    'https://forzabuilt.com/industries/trailer-and-transportation-products/',
    'https://forzabuilt.com/industries/construction-products/',
    'https://forzabuilt.com/industries/foam-products/',
    'https://forzabuilt.com/industries/composites-products/',
    'https://forzabuilt.com/industries/insulation-products/'
  ];
  
  const allDiscoveredPages = new Set();
  
  // Discover product pages from all starting URLs
  for (const startUrl of startUrls) {
    try {
      const discoveredPages = await discoverProductPages(startUrl);
      discoveredPages.forEach(page => allDiscoveredPages.add(page));
    } catch (error) {
      console.log(`❌ Error discovering pages from ${startUrl}: ${error.message}`);
    }
  }
  
  const productPages = Array.from(allDiscoveredPages);
  console.log(`\n📊 DISCOVERY SUMMARY:`);
  console.log(`🔍 Found ${productPages.length} unique product pages`);
  
  // Scrape images from all discovered product pages
  const results = [];
  
  for (const productUrl of productPages) {
    const result = await scrapeProductPage(productUrl);
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
  
  // Save the discovered URLs to a file for reference
  const discoveredUrlsFile = path.join(__dirname, 'discovered-product-urls.json');
  fs.writeFileSync(discoveredUrlsFile, JSON.stringify(productPages, null, 2));
  console.log(`\n📄 Saved discovered URLs to: ${discoveredUrlsFile}`);
  
  return results;
}

// Run the crawler
if (require.main === module) {
  crawlAndScrapeAllProducts()
    .then(() => {
      console.log('\n🎉 Product crawling and scraping completed!');
    })
    .catch(error => {
      console.error('❌ Crawling failed:', error);
      process.exit(1);
    });
}

module.exports = {
  discoverProductPages,
  scrapeProductPage,
  crawlAndScrapeAllProducts
}; 