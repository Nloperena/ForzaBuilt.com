const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

// Import the product data
const { industrialDatasheet } = require('../src/data/industrialDatasheet.ts');

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
      mainImage: $('.entry-content img').first().attr('src') || '',
      
      // Meta data
      meta: {
        keywords: $('meta[name="keywords"]').attr('content') || '',
        description: $('meta[name="description"]').attr('content') || ''
      }
    };

    // Extract all images
    $('.entry-content img').each((i, el) => {
      const src = $(el).attr('src');
      if (src) {
        productData.images.push(src);
      }
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