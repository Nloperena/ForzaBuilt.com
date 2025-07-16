const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');

// List of actual product URLs to scrape based on real product names
const productUrls = [
  'https://forzabuilt.com/product/ic933-ca-compliant-multi-purpose-contact-adhesive/',
  'https://forzabuilt.com/product/ic934-semi-pressure-sensitive-web-spray/',
  'https://forzabuilt.com/product/ic946-ca-compliant-pressure-sensitive-contact-adhesive/',
  'https://forzabuilt.com/product/mc739-mist-spray-adhesive-for-fiberglass-infusion-molding/',
  'https://forzabuilt.com/product/mc722-web-spray-adhesive-for-marine-infusion-molding/',
  'https://forzabuilt.com/product/c130-high-heat-neoprene-adhesive/',
  'https://forzabuilt.com/product/c150-ca-compliant-high-solids-contact-adhesive/',
  'https://forzabuilt.com/product/c331-non-flammable-contact-adhesive/',
  'https://forzabuilt.com/product/frp-rollable-adhesive/',
  'https://forzabuilt.com/product/i1000-low-medium-viscosity-laminating-adhesive/',
  'https://forzabuilt.com/product/oa4-high-strength-moisture-cure-eco-friendly-adhesive-sealant/',
  'https://forzabuilt.com/product/oa75-trowellable-flooring-adhesive/',
  'https://forzabuilt.com/product/oa99-bonding-putty/',
  'https://forzabuilt.com/product/osa-adhesive-primer-and-promoter/',
  'https://forzabuilt.com/product/os24-high-strength-moisture-cure-single-part-thixotropic-structural-adhesive-sealant/',
  'https://forzabuilt.com/product/r160-epoxy-quick-set-high-strength-tack-strength-adhesive/',
  'https://forzabuilt.com/product/r221-two-part-1-1-modified-epoxy-adhesive/',
  'https://forzabuilt.com/product/r519-fast-acting-two-part-methacrylate-adhesive/',
  'https://forzabuilt.com/product/r529-structural-anchoring-epoxy/',
  'https://forzabuilt.com/product/fc-car-citrus-based-adhesive-remover-cleaner/',
  'https://forzabuilt.com/product/s228-adhesive-primer-and-promoter/',
  // Seal products
  'https://forzabuilt.com/product/c-os9-hybrid-polymer-structural-single-part-moisture-cure-adhesive/',
  'https://forzabuilt.com/product/t-os150-high-performance-semi-self-leveling-hybrid-polymer-sealant/',
  'https://forzabuilt.com/product/t-os151-non-hazardous-high-strength-single-part-hybrid-polymer-sealant/',
  'https://forzabuilt.com/product/t-os164-silicone-sealant/',
  // Bond products
  'https://forzabuilt.com/product/tac-734g-web-spray-high-tack-infusion-molding-adhesive/',
  'https://forzabuilt.com/product/tac-735r-mist-spray-no-haps-infusion-molding-adhesive/',
  'https://forzabuilt.com/product/tac-738r-web-spray-zero-voc-infusion-molding-adhesive/',
  'https://forzabuilt.com/product/tac-739r-mist-spray-infusion-molding-adhesive/'
];

async function scrapeProduct(url) {
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
      url: url,
      title: $('.entry-title').text().trim(),
      description: $('.entry-content p').first().text().trim(),
      content: $('.entry-content').html(),
      // Extract structured data
      applications: [],
      benefits: [],
      howToUse: [],
      colors: [],
      sizing: [],
      cleanup: []
    };

    // Extract applications
    $('.entry-content').find('h2, h3, h4').each((i, el) => {
      const heading = $(el).text().toLowerCase();
      if (heading.includes('application')) {
        $(el).nextUntil('h2, h3, h4').find('li').each((j, li) => {
          productData.applications.push($(li).text().trim());
        });
      }
    });

    // Extract benefits
    $('.entry-content').find('h2, h3, h4').each((i, el) => {
      const heading = $(el).text().toLowerCase();
      if (heading.includes('benefit')) {
        $(el).nextUntil('h2, h3, h4').find('li').each((j, li) => {
          productData.benefits.push($(li).text().trim());
        });
      }
    });

    // Extract how to use
    $('.entry-content').find('h2, h3, h4').each((i, el) => {
      const heading = $(el).text().toLowerCase();
      if (heading.includes('how to use') || heading.includes('usage') || heading.includes('instructions')) {
        $(el).nextUntil('h2, h3, h4').find('li').each((j, li) => {
          productData.howToUse.push($(li).text().trim());
        });
      }
    });

    // Extract colors
    $('.entry-content').find('h2, h3, h4').each((i, el) => {
      const heading = $(el).text().toLowerCase();
      if (heading.includes('color')) {
        $(el).nextUntil('h2, h3, h4').find('li').each((j, li) => {
          productData.colors.push($(li).text().trim());
        });
      }
    });

    // Extract sizing
    $('.entry-content').find('h2, h3, h4').each((i, el) => {
      const heading = $(el).text().toLowerCase();
      if (heading.includes('size') || heading.includes('packaging') || heading.includes('sizing')) {
        $(el).nextUntil('h2, h3, h4').find('li').each((j, li) => {
          productData.sizing.push($(li).text().trim());
        });
      }
    });

    // Extract cleanup
    $('.entry-content').find('h2, h3, h4').each((i, el) => {
      const heading = $(el).text().toLowerCase();
      if (heading.includes('cleanup') || heading.includes('clean up') || heading.includes('cleaning')) {
        $(el).nextUntil('h2, h3, h4').find('li').each((j, li) => {
          productData.cleanup.push($(li).text().trim());
        });
      }
    });

    return productData;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return null;
  }
}

async function scrapeAllProducts() {
  const results = [];
  
  for (let i = 0; i < productUrls.length; i++) {
    const url = productUrls[i];
    const productData = await scrapeProduct(url);
    
    if (productData) {
      results.push(productData);
      console.log(`✓ Scraped: ${productData.title}`);
    }
    
    // Add delay to be respectful to the server
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return results;
}

async function main() {
  console.log('Starting product scraping...');
  const scrapedData = await scrapeAllProducts();
  
  // Save to JSON file
  const outputPath = path.join(__dirname, 'scrapedProducts.json');
  await fs.writeFile(outputPath, JSON.stringify(scrapedData, null, 2));
  
  console.log(`\nScraping complete! Found ${scrapedData.length} products.`);
  console.log(`Data saved to: ${outputPath}`);
  
  // Generate summary
  console.log('\nSummary:');
  scrapedData.forEach((product, index) => {
    console.log(`${index + 1}. ${product.title}`);
    console.log(`   Applications: ${product.applications.length}`);
    console.log(`   Benefits: ${product.benefits.length}`);
    console.log(`   How to Use: ${product.howToUse.length}`);
    console.log(`   Colors: ${product.colors.length}`);
    console.log(`   Sizing: ${product.sizing.length}`);
    console.log(`   Cleanup: ${product.cleanup.length}`);
    console.log('');
  });
}

main().catch(console.error); 