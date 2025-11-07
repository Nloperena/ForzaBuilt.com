const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const missingProducts = [
  { id: 'frp', url: 'https://forzabuilt.com/product/frp/', category: 'BOND' },
  { id: 'i1000', url: 'https://forzabuilt.com/product/i1000/', category: 'BOND' },
  { id: 'oa75', url: 'https://forzabuilt.com/product/oa75/', category: 'BOND' },
  { id: 'oa99', url: 'https://forzabuilt.com/product/oa99/', category: 'BOND' },
  { id: 'r529', url: 'https://forzabuilt.com/product/r529/', category: 'BOND' },
  { id: 's228', url: 'https://forzabuilt.com/product/s228/', category: 'BOND' },
  { id: 'os31', url: 'https://forzabuilt.com/product/os31/', category: 'SEAL' },
  { id: 'os45', url: 'https://forzabuilt.com/product/os45/', category: 'SEAL' },
  { id: 't350', url: 'https://forzabuilt.com/product/t350/', category: 'TAPE' },
  { id: 't461', url: 'https://forzabuilt.com/product/t461/', category: 'TAPE' },
  { id: 't600', url: 'https://forzabuilt.com/product/t600/', category: 'TAPE' },
  { id: 't715', url: 'https://forzabuilt.com/product/t715/', category: 'TAPE' },
  { id: 't900', url: 'https://forzabuilt.com/product/t900/', category: 'TAPE' },
  { id: 't950', url: 'https://forzabuilt.com/product/t950/', category: 'TAPE' },
  { id: 't970', url: 'https://forzabuilt.com/product/t970/', category: 'TAPE' },
  { id: 'c150', url: 'https://forzabuilt.com/product/c150-ca-compliant-contact-adhesive/', category: 'BOND' }
];

function extractListItems($, containerElement) {
  const items = [];
  $(containerElement).find('ul li').each((i, li) => {
    const text = $(li).text().trim();
    if (text) {
      items.push(text);
    }
  });
  return items;
}

function extractSectionContent($, sectionId) {
  // Find the anchor with this ID
  const anchor = $(`#${sectionId}`);
  if (!anchor.length) return [];
  
  // Navigate up to find the section
  const section = anchor.closest('.elementor-section');
  if (!section.length) return [];
  
  // Find all text-editor widgets in this section
  const items = [];
  section.find('.elementor-widget-text-editor').each((i, widget) => {
    const widgetContent = $(widget).find('.elementor-widget-container');
    // Extract list items if present
    widgetContent.find('ul li').each((j, li) => {
      const text = $(li).text().trim();
      if (text) {
        items.push(text);
      }
    });
    // Also check for paragraphs if no list
    if (items.length === 0) {
      widgetContent.find('p').each((j, p) => {
        const text = $(p).text().trim();
        if (text) {
          items.push(text);
        }
      });
    }
  });
  
  return items;
}

async function scrapeProduct(product) {
  try {
    console.log(`\nScraping ${product.id.toUpperCase()} (${product.category})...`);
    console.log(`URL: ${product.url}`);
    
    const response = await axios.get(product.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });
    
    const $ = cheerio.load(response.data);
    
    // Extract title from product_title or h1
    const title = $('h1.product_title, h1.entry-title').first().text().trim();
    
    // Extract short description from woocommerce short description
    const shortDesc = $('.woocommerce-product-details__short-description').text().trim();
    
    // Extract main product image
    const mainImage = $('.woocommerce-product-gallery__image img').first().attr('data-src') ||
                     $('.woocommerce-product-gallery__image img').first().attr('src') ||
                     $('.wp-post-image').first().attr('src');
    
    // Extract all gallery images
    const images = [];
    $('.woocommerce-product-gallery__image img').each((i, el) => {
      const src = $(el).attr('data-src') || $(el).attr('src');
      if (src && !images.includes(src)) {
        images.push(src);
      }
    });
    
    // Extract Description section (prod_desc)
    const description = extractSectionContent($, 'prod_desc');
    const descriptionText = description.length > 0 ? description.join(' ') : shortDesc;
    
    // Extract Applications section (prod_aplc)
    const applications = extractSectionContent($, 'prod_aplc');
    
    // Extract Benefits section (prod_bene)
    const benefits = extractSectionContent($, 'prod_bene');
    
    // Extract How to Use section (prod_htu) - we'll store this as instructions
    const howToUse = extractSectionContent($, 'prod_htu');
    
    // Extract Sizing section (prod_size)
    const sizing = extractSectionContent($, 'prod_size');
    
    // Extract chemistry from title or description (common patterns)
    let chemistry = '';
    const titleLower = title.toLowerCase();
    if (titleLower.includes('epoxy') && !titleLower.includes('modified')) {
      chemistry = 'Epoxy';
    } else if (titleLower.includes('modified epoxy') || titleLower.includes('epoxy modified')) {
      chemistry = 'Modified Epoxy';
    } else if (titleLower.includes('acrylic') || titleLower.includes('psa')) {
      chemistry = 'Acrylic (incl. PSA)';
    } else if (titleLower.includes('silicone')) {
      chemistry = 'Silicone';
    } else if (titleLower.includes('polyurethane') || titleLower.includes('urethane')) {
      chemistry = 'Polyurethane (PU)';
    } else if (titleLower.includes('ms polymer') || titleLower.includes('hybrid')) {
      chemistry = 'MS';
    } else if (titleLower.includes('butyl')) {
      chemistry = 'Rubber Based';
    } else if (titleLower.includes('hotmelt') || titleLower.includes('hot melt') || titleLower.includes('hot-melt')) {
      chemistry = 'Hotmelt';
    } else if (titleLower.includes('methacrylate') || titleLower.includes('mma')) {
      chemistry = 'Methacrylate/MMA';
    } else if (titleLower.includes('cyanoacrylate') || titleLower.includes('cyano')) {
      chemistry = 'Cyanoacrylates';
    } else if (titleLower.includes('silane')) {
      chemistry = 'MS'; // Modified Silane is often MS Polymer
    }
    
    // Extract industry from breadcrumb or category
    let industry = 'industrial';
    const breadcrumb = $('.woocommerce-breadcrumb').text().toLowerCase();
    if (breadcrumb.includes('marine')) {
      industry = 'marine';
    } else if (breadcrumb.includes('construction')) {
      industry = 'construction';
    } else if (breadcrumb.includes('transportation') || breadcrumb.includes('trailer')) {
      industry = 'transportation';
    } else if (breadcrumb.includes('composites')) {
      industry = 'composites';
    } else if (breadcrumb.includes('insulation')) {
      industry = 'insulation';
    } else if (breadcrumb.includes('foam')) {
      industry = 'foam';
    }
    
    const productData = {
      id: product.id.toUpperCase(),
      product_id: product.id.toUpperCase(),
      name: title,
      full_name: title,
      description: descriptionText,
      brand: product.category === 'BOND' ? 'forza_bond' : 
             product.category === 'SEAL' ? 'forza_seal' : 'forza_tape',
      category: product.category,
      industry: `${industry}_industry`,
      chemistry: chemistry,
      url: product.url,
      image: mainImage,
      images: images,
      applications: applications,
      benefits: benefits,
      howToUse: howToUse,
      sizing: sizing,
      technical: [], // Will need to be added manually or from TDS
      scrapedAt: new Date().toISOString(),
      published: false, // Will need to be published manually after review
      notes: 'Scraped from WordPress Elementor site - needs review and technical data'
    };
    
    // Save to file
    const outputDir = path.join(__dirname, '../src/data/scrapedProducts');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputFile = path.join(outputDir, `${product.id}.json`);
    fs.writeFileSync(outputFile, JSON.stringify(productData, null, 2));
    
    console.log(`✅ Success! Saved to ${outputFile}`);
    console.log(`   Title: ${title}`);
    console.log(`   Description: ${descriptionText ? 'Yes' : 'No'}`);
    console.log(`   Chemistry: ${chemistry || 'Not detected'}`);
    console.log(`   Industry: ${industry}`);
    console.log(`   Applications: ${applications.length}`);
    console.log(`   Benefits: ${benefits.length}`);
    console.log(`   How to Use: ${howToUse.length}`);
    console.log(`   Sizing: ${sizing.length}`);
    console.log(`   Images: ${images.length}`);
    
    return productData;
  } catch (error) {
    console.error(`❌ Error scraping ${product.id}:`, error.message);
    return null;
  }
}

async function scrapeAllProducts() {
  console.log('Starting to scrape missing products from WordPress site...');
  console.log('Using improved Elementor-aware scraper\n');
  
  const results = [];
  
  for (const product of missingProducts) {
    const data = await scrapeProduct(product);
    results.push({ id: product.id, success: !!data, data });
    
    // Wait 1.5 seconds between requests to be polite
    await new Promise(resolve => setTimeout(resolve, 1500));
  }
  
  // Generate summary
  console.log('\n\n=== SCRAPING SUMMARY ===');
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`\nSuccessful: ${successful.length}/${results.length}`);
  if (successful.length > 0) {
    console.log('\n✅ Successfully scraped:');
    successful.forEach(r => {
      const d = r.data;
      console.log(`   - ${r.id.toUpperCase()}: ${d.applications?.length || 0} apps, ${d.benefits?.length || 0} benefits, ${d.sizing?.length || 0} sizes`);
    });
  }
  
  if (failed.length > 0) {
    console.log('\n❌ Failed to scrape:');
    failed.forEach(r => console.log(`   - ${r.id.toUpperCase()}`));
  }
  
  // Save summary report
  const summaryFile = path.join(__dirname, '../src/data/scrapedProducts/scraping-summary-v2.json');
  fs.writeFileSync(summaryFile, JSON.stringify({
    scrapedAt: new Date().toISOString(),
    scraperVersion: 2,
    total: results.length,
    successful: successful.length,
    failed: failed.length,
    results: results.map(r => ({
      id: r.id,
      success: r.success,
      hasImage: r.data?.image ? true : false,
      imageCount: r.data?.images?.length || 0,
      hasDescription: r.data?.description ? true : false,
      hasChemistry: r.data?.chemistry ? true : false,
      applicationsCount: r.data?.applications?.length || 0,
      benefitsCount: r.data?.benefits?.length || 0,
      howToUseCount: r.data?.howToUse?.length || 0,
      sizingCount: r.data?.sizing?.length || 0
    }))
  }, null, 2));
  
  console.log(`\nSummary report saved to: ${summaryFile}`);
  console.log('All scraped data saved to: src/data/scrapedProducts/');
  
  // Generate CSV for easy import to product manager
  const csvFile = path.join(__dirname, '../src/data/scrapedProducts/missing-products-import.csv');
  const csvRows = ['product_id,name,full_name,brand,industry,chemistry,description,image,applications,benefits,sizing'];
  
  successful.forEach(r => {
    const d = r.data;
    csvRows.push([
      d.product_id,
      `"${d.name}"`,
      `"${d.full_name}"`,
      d.brand,
      d.industry,
      d.chemistry || '',
      `"${(d.description || '').replace(/"/g, '""')}"`,
      d.image || '',
      `"${(d.applications || []).join('; ').replace(/"/g, '""')}"`,
      `"${(d.benefits || []).join('; ').replace(/"/g, '""')}"`,
      `"${(d.sizing || []).join('; ').replace(/"/g, '""')}"`
    ].join(','));
  });
  
  fs.writeFileSync(csvFile, csvRows.join('\n'));
  console.log(`CSV export saved to: ${csvFile}`);
}

scrapeAllProducts();












