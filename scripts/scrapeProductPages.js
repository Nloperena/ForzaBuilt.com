const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

// Import the product data
const ts = require('typescript');

// Load industrialDatasheet from TypeScript source without needing ts-node
const industrialTsPath = path.join(__dirname, '../src/data/industrialDatasheet.ts');
const industrialSource = fs.readFileSync(industrialTsPath, 'utf8');
const compiled = ts.transpileModule(industrialSource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 },
});
const industrialExports = {};
new Function('exports', 'require', 'module', '__filename', '__dirname', compiled.outputText)(
  industrialExports,
  require,
  { exports: industrialExports },
  industrialTsPath,
  path.dirname(industrialTsPath)
);
const { industrialDatasheet } = industrialExports;

/* ──────────────────────────────────────────────────────────────
 * Utility – grab the main/hero image that WooCommerce stores in
 * its product gallery.  Falls back to the old selector if none
 * are found.
 * ──────────────────────────────────────────────────────────── */
function extractMainImage($) {
  const candidates = [
    '.woocommerce-product-gallery__image img',         // gallery wrapper
    '.woocommerce-product-gallery__wrapper img',
    'img.wp-post-image',                               // featured img
    '.product img',
    '.entry-content img'                               // last-resort
  ];

  for (const sel of candidates) {
    const $img = $(sel).first();
    if (!$img.length) continue;

    // pick the highest-resolution URL that exists
    const src =
      $img.attr('data-large_image') ||
      $img.attr('data-src') ||
      ($img.attr('srcset') ? $img.attr('srcset').split(',')[0].trim().split(' ')[0] : null) ||
      $img.attr('src');

    if (src) return src;
  }
  return '';
}

// Helper to extract main WooCommerce image
function extractMainImage($) {
  const selectors = [
    '.woocommerce-product-gallery__image img',
    '.woocommerce-product-gallery__wrapper img',
    'img.wp-post-image',
    '.product img',
    '.entry-content img'
  ];
  for (const sel of selectors) {
    const img = $(sel).first();
    if (!img.length) continue;
    const src =
      img.attr('data-large_image') ||
      img.attr('data-src') ||
      (img.attr('srcset') ? img.attr('srcset').split(',')[0].trim().split(' ')[0] : null) ||
      img.attr('src');
    if (src) return src;
  }
  return '';
}

// Function to scrape a product page
async function scrapeProductPage(url, productId) {
  try {
    console.log(`Scraping: ${url}`);
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    
    // Extract product information
    const productData = {
      id: productId,
      url: url,
      scrapedAt: new Date().toISOString(),
      
      // Basic info
      title: $('h1.entry-title').text().trim() || $('h1').first().text().trim(),
      description: $('.entry-content p').first().text().trim(),
      
      // Content sections
      content: {
        overview: $('.entry-content').html(),
        specifications: '',
        features: '',
        applications: '',
        technicalData: ''
      },
      
      // Images
      images: [],
      mainImage: extractMainImage($),
      
      // Meta data
      meta: {
        keywords: $('meta[name="keywords"]').attr('content') || '',
        description: $('meta[name="description"]').attr('content') || ''
      }
    };

    // Extract all images
    const addImage = (src) => {
      if (src && !productData.images.includes(src)) {
        productData.images.push(src);
      }
    };

    // WooCommerce gallery (full-size & thumbnail URLs)
    $('.woocommerce-product-gallery__image img').each((_, el) => {
      addImage(
        $(el).attr('data-large_image') ||
        $(el).attr('data-src') ||
        $(el).attr('src')
      );
    });

    // Any additional images that appear in the page content
    $('.entry-content img').each((_, el) => {
      addImage($(el).attr('src'));
    });

    // Try to extract structured content
    $('.entry-content h2, .entry-content h3').each((i, el) => {
      const heading = $(el).text().trim().toLowerCase();
      const content = $(el).nextUntil('h2, h3').text().trim();
      
      if (heading.includes('specification') || heading.includes('specs')) {
        productData.content.specifications = content;
      } else if (heading.includes('feature')) {
        productData.content.features = content;
      } else if (heading.includes('application')) {
        productData.content.applications = content;
      } else if (heading.includes('technical') || heading.includes('data')) {
        productData.content.technicalData = content;
      }
    });

    return productData;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return null;
  }
}

// Main function to scrape all products
async function scrapeAllProducts() {
  const scrapedData = [];
  const outputDir = path.join(__dirname, '../src/data/scrapedProducts');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Starting to scrape ${industrialDatasheet.length} products...`);

  for (const product of industrialDatasheet) {
    if (product.url && product.url.includes('forzabuilt.com')) {
      console.log(`\nProcessing: ${product.name}`);
      
      const scrapedProduct = await scrapeProductPage(product.url, product.id);
      
      if (scrapedProduct) {
        scrapedData.push(scrapedProduct);
        
        // Save individual product file
        const productFile = path.join(outputDir, `${product.id}.json`);
        fs.writeFileSync(productFile, JSON.stringify(scrapedProduct, null, 2));
        console.log(`✓ Saved: ${product.id}.json`);
      }
      
      // Add delay to be respectful to the server
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Save combined data
  const combinedFile = path.join(outputDir, 'allProducts.json');
  fs.writeFileSync(combinedFile, JSON.stringify(scrapedData, null, 2));
  
  console.log(`\n✓ Scraping complete!`);
  console.log(`✓ Total products scraped: ${scrapedData.length}`);
  console.log(`✓ Combined data saved to: ${combinedFile}`);
  
  return scrapedData;
}

// Run the scraper
if (require.main === module) {
  scrapeAllProducts().catch(console.error);
}

module.exports = { scrapeProductPage, scrapeAllProducts }; 