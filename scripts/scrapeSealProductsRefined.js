const fs = require('fs');
const path = require('path');

// Product data extracted from the HTML
const sealProducts = [
  {
    name: "IC933 – CA COMPLIANT MULTI-PURPOSE CONTACT ADHESIVE",
    url: "https://forzabuilt.com/product/p307-ca-compliant-multi-purpose-contact-adhesive/",
    image: "https://forzabuilt.com/wp-content/uploads/2024/03/IC933-bundle-1024x1024.png",
    category: "seal"
  },
  {
    name: "IC934 – SEMI-PRESSURE SENSITIVE WEB SPRAY",
    url: "https://forzabuilt.com/product/p322-pressure-sensitive-polystyrene-safe-spray-adhesive/",
    image: "https://forzabuilt.com/wp-content/uploads/2024/03/IC934-bundle-1024x1024.png",
    category: "seal"
  },
  {
    name: "IC946- CA COMPLIANT PRESSURE-SENSITIVE CONTACT ADHESIVE",
    url: "https://forzabuilt.com/product/p329-ca-compliant-high-solids-pressure-sensative-contact-adhesive/",
    image: "https://forzabuilt.com/wp-content/uploads/2024/03/IC946-bundle-1024x1024.png",
    category: "seal"
  },
  {
    name: "MC739 – MIST SPRAY ADHESIVE FOR FIBERGLASS INFUSION MOLDING",
    url: "https://forzabuilt.com/product/m30-mist-spray-adhesive-for-fibreglass-infusion-molding/",
    image: "https://forzabuilt.com/wp-content/uploads/2024/04/ForzaBond-MC739.png",
    category: "seal"
  },
  {
    name: "MC722 – WEB SPRAY ADHESIVE FOR MARINE INFUSION MOLDING",
    url: "https://forzabuilt.com/product/m55-web-spray-adhesive-for-infusion-molding/",
    image: "https://forzabuilt.com/wp-content/uploads/2024/03/MC722-single-1024x1024.png",
    category: "seal"
  },
  {
    name: "C130 – HIGH HEAT NEOPRENE ADHESIVE",
    url: "https://forzabuilt.com/product/c130-high-heat-neoprene-adhesive/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/C130-Clear-55-Gallon-1024x1024.png",
    category: "seal"
  },
  {
    name: "C150 – CA-COMPLIANT HIGH SOLIDS CONTACT ADHESIVE",
    url: "https://forzabuilt.com/product/c150-ca-compliant-high-solids-contact-adhesive/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/C150-CA-COMPLIANT-HIGH-SOLIDS-CONTACT-ADHESIVE-1024x1024.png",
    category: "seal"
  },
  {
    name: "C331 – NON-FLAMMABLE CONTACT ADHESIVE",
    url: "https://forzabuilt.com/product/c331-non-flammable-contact-adhesive/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/C331-Blue-55-Gallon.png",
    category: "seal"
  },
  {
    name: "FRP – ROLLABLE ADHESIVE",
    url: "https://forzabuilt.com/product/frp-rollable-adhesive/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/FRP-Rollable-Adhesive-v2-1024x1024.png",
    category: "seal"
  },
  {
    name: "I1000 – LOW-MEDIUM VISCOSITY LAMINATING ADHESIVE",
    url: "https://forzabuilt.com/product/i1000-low-medium-viscosity-laminating-adhesive/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/I1000_Tote-1024x1024.png",
    category: "seal"
  },
  {
    name: "OA4 – HIGH-STRENGTH MOISTURE CURE ECO-FRIENDLY ADHESIVE / SEALANT",
    url: "https://forzabuilt.com/product/oa4-high-strength-eco-friendly-adhesive-sealant/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/OA4-Cartridge-.png",
    category: "seal"
  },
  {
    name: "OA75 – TROWELLABLE FLOORING ADHESIVE",
    url: "https://forzabuilt.com/product/trowellable-flooring-adhesive/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/OA75-Flooring-Adhesive-v2-1024x1024.png",
    category: "seal"
  },
  {
    name: "OA99 – BONDING PUTTY",
    url: "https://forzabuilt.com/product/bonding-putty/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/OA99-55-gal-drum-1024x1024.png",
    category: "seal"
  },
  {
    name: "OSA – ADHESIVE PRIMER AND PROMOTER",
    url: "https://forzabuilt.com/product/osa-adhesive-primer-and-promoter/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/OSA-Mockup-Dual-Cartridge-1.png",
    category: "seal"
  },
  {
    name: "OS24 – HIGH-STRENGTH MOISTURE-CURE SINGLE-PART THIXOTROPIC STRUCTURAL ADHESIVE / SEALANT",
    url: "https://forzabuilt.com/product/os24-moisture-cure-single-part-thixotropic-structural-adhesive-sealant/",
    image: "https://forzabuilt.com/wp-content/uploads/2024/03/OS24-sausage-1024x1024.png",
    category: "seal"
  },
  {
    name: "R160 – EPOXY QUICK-SET HIGH STRENGTH TACK STRENGTH ADHESIVE",
    url: "https://forzabuilt.com/product/r160-epoxy-quick-set-high-strength-tack-strip-adhesive/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/R160-Dual-Cartridge-.png",
    category: "seal"
  },
  {
    name: "R221 – TWO-PART 1:1 MODIFIED EPOXY ADHESIVE",
    url: "https://forzabuilt.com/product/r221-two-part-modified-epoxy-adhesive/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/R221-Dual-Cartridge-1024x1024.png",
    category: "seal"
  },
  {
    name: "R519 – FAST ACTING TWO-PART METHACRYLATE ADHESIVE",
    url: "https://forzabuilt.com/product/r519-two-part-methacrylate-adhesive/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/R519-Dual-Cartridge-1024x1024.png",
    category: "seal"
  },
  {
    name: "R529 – STRUCTURAL ANCHORING EPOXY",
    url: "https://forzabuilt.com/product/r529-structural-anchoring-epoxy/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/R529-Structural-Adhesive--240x300.png",
    category: "seal"
  },
  {
    name: "FC-CAR – CITRUS-BASED ADHESIVE REMOVER / CLEANER",
    url: "https://forzabuilt.com/product/FC-CAR-citrus-based-adhesive-remover-cleaner/",
    image: "https://forzabuilt.com/wp-content/uploads/2024/03/FC-CAR-bundle.png",
    category: "seal"
  },
  {
    name: "S228 – ADHESIVE PRIMER AND PROMOTER",
    url: "https://forzabuilt.com/product/s228-adhesive-primer-and-promoter/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/S228-paintcan-mockup-1024x1024.png",
    category: "seal"
  },
  {
    name: "OS2 – NON-HAZARDOUS MOISTURE-CURE ADHESIVE / SEALANT",
    url: "https://forzabuilt.com/product/os2-non-hazardous-moisture-cure-adhesive-sealant/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/OS2-Cartridge-1-1.png",
    category: "seal"
  },
  {
    name: "OS31 – SELF-LEVELING CRACK-FILLING SEALANT",
    url: "https://forzabuilt.com/product/self-leveling-crack-filling-sealant/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/OS31-Self-Leveling-Sealant.png",
    category: "seal"
  },
  {
    name: "OS35 – LOW MODULUS SEALANT",
    url: "https://forzabuilt.com/product/low-modulus-sealant/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/OS35-Low-Modulus-Seal.png",
    category: "seal"
  },
  {
    name: "OS37 – WATER-BASED DUCT SEALER",
    url: "https://forzabuilt.com/product/water-based-duct-sealer/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/OS37-Water-Based-Seal.png",
    category: "seal"
  },
  {
    name: "OS45 – ACRYLIC ADHESIVE CAULK",
    url: "https://forzabuilt.com/product/acrylic-adhesive-caulk/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/OS45.png",
    category: "seal"
  },
  {
    name: "OS55 – BUTYL ADHESIVE CAULK",
    url: "https://forzabuilt.com/product/butyl-adhesive-caulk/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/OS55-1229x1536-1.png",
    category: "seal"
  },
  {
    name: "OS61 – HIGH PERFORMANCE SEMI SELF-LEVELING ADHESIVE / SEALANT",
    url: "https://forzabuilt.com/product/os61-high-performance-semi-self-leveling-adhesive-sealant/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/Forza-Seal-0S61-Adhesive-Sealant-1024x1024.png",
    category: "seal"
  },
  {
    name: "T220 – STRUCTURAL ACRYLIC, HIGH BOND ADHESIVE TAPE",
    url: "https://forzabuilt.com/product/t220-structural-acrylic-high-bond-adhesive-tape/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/05/vhb-tape-mockup-1024x1024.png",
    category: "seal"
  },
  {
    name: "T215 – STRUCTURAL BONDING OF RAILS TAPE",
    url: "https://forzabuilt.com/product/t215-structural-bonding-tape/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/05/vhb-tape-mockup-1024x1024.png",
    category: "seal"
  },
  {
    name: "T350 – THERMAL BREAK TAPE",
    url: "https://forzabuilt.com/product/t350-thermal-break-tape/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/T350-Thermal-Break-Tape.png",
    category: "seal"
  },
  {
    name: "T461 – HOT MELT TRANSFER TAPE",
    url: "https://forzabuilt.com/product/t461-hot-melt-transfer-tape/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/06/T461-Hot-Melt-Transfer-Tape-1024x1024.png",
    category: "seal"
  },
  {
    name: "T464 – TRANSFER TAPE",
    url: "https://forzabuilt.com/product/t464-transfer-tape/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/06/T464-Transfer-Tape-1024x1024.png",
    category: "seal"
  },
  {
    name: "T500 – BUTYL ADHESIVE TAPE",
    url: "https://forzabuilt.com/product/t500-butyl-adhesive-tape/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/05/butyl-tape-mockup-1024x1024.png",
    category: "seal"
  },
  {
    name: "T600 – FOAM GASKETING TAPE",
    url: "https://forzabuilt.com/product/t600-bonding-gasket-tape/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/T600-Foam-Bonding-Tape.png",
    category: "seal"
  },
  {
    name: "T715 – HIGH-PRESSURE DOUBLE-COATED TAPE",
    url: "https://forzabuilt.com/product/t715-high-performance-double-coated-tape/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/06/T715-High-Performance-Double-Coated-Tape-mockup-1024x1024.png",
    category: "seal"
  },
  {
    name: "T900 – BUTYL TAPE",
    url: "https://forzabuilt.com/product/t900-butyl-tape/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/06/T900-Butyl-Adhesive-Tape-1024x1024.png",
    category: "seal"
  },
  {
    name: "T950 – FSK BONDING TAPE",
    url: "https://forzabuilt.com/product/t950-fsk-bonding-tape/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/T950.png",
    category: "seal"
  },
  {
    name: "T970 – FOIL BONDING TAPE",
    url: "https://forzabuilt.com/product/t970-foil-bonding-tape/",
    image: "https://forzabuilt.com/wp-content/uploads/2023/12/T950-1024x1024.png",
    category: "seal"
  }
];

// Function to clean text content
function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, ' ')
    .trim();
}

// Function to extract product details with better targeting
async function scrapeProductDetails(product) {
  const axios = require('axios');
  const cheerio = require('cheerio');
  
  try {
    console.log(`Scraping: ${product.name}`);
    const response = await axios.get(product.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });
    
    const $ = cheerio.load(response.data);
    
    // Remove navigation and header/footer elements
    $('header, footer, nav, .menu, .navigation, .sidebar').remove();
    
    const details = {
      name: product.name,
      url: product.url,
      image: product.image,
      category: product.category,
      description: '',
      specifications: {},
      applications: [],
      features: [],
      technicalData: {},
      certifications: [],
      packaging: '',
      benefits: '',
      howToUse: '',
      colors: '',
      sizing: '',
      cleanup: ''
    };
    
    // Extract description - look for product-specific content
    const descriptionSelectors = [
      '.elementor-text-editor p:not(:has(a))',
      '.woocommerce-product-details__short-description p',
      '.product-description p',
      '.entry-content p:not(:has(a))',
      '.product-summary p'
    ];
    
    for (const selector of descriptionSelectors) {
      const desc = $(selector).first().text().trim();
      if (desc && desc.length > 30 && desc.length < 500) {
        details.description = cleanText(desc);
        break;
      }
    }
    
    // Extract specifications from tables - focus on product-specific tables
    $('table').each((i, table) => {
      const $table = $(table);
      const tableText = $table.text().toLowerCase();
      
      // Only process tables that seem to contain product specs
      if (tableText.includes('specification') || 
          tableText.includes('technical') || 
          tableText.includes('property') ||
          tableText.includes('density') ||
          tableText.includes('viscosity') ||
          tableText.includes('temperature') ||
          tableText.includes('coverage')) {
        
        $table.find('tr').each((j, row) => {
          const $row = $(row);
          const cells = $row.find('td, th');
          if (cells.length >= 2) {
            const key = cleanText($(cells[0]).text());
            const value = cleanText($(cells[1]).text());
            if (key && value && key.length > 2 && value.length > 2) {
              details.specifications[key] = value;
            }
          }
        });
      }
    });
    
    // Extract features from product-specific lists
    $('ul, ol').each((i, list) => {
      const $list = $(list);
      const listText = $list.text().toLowerCase();
      
      // Only process lists that seem to contain product features
      if (listText.includes('feature') || 
          listText.includes('benefit') || 
          listText.includes('advantage') ||
          listText.includes('characteristic') ||
          listText.includes('property')) {
        
        const items = [];
        $list.find('li').each((j, item) => {
          const text = cleanText($(item).text());
          if (text && text.length > 10 && text.length < 200) {
            items.push(text);
          }
        });
        if (items.length > 0) {
          details.features = details.features.concat(items);
        }
      }
    });
    
    // Extract applications - look for specific application sections
    const applicationSelectors = [
      '.applications li',
      '.product-applications li',
      '.elementor-widget-text-editor:contains("Applications") li',
      '.entry-content:contains("Applications") li',
      'p:contains("application")',
      'p:contains("use")'
    ];
    
    for (const selector of applicationSelectors) {
      const $section = $(selector);
      $section.each((i, item) => {
        const text = cleanText($(item).text());
        if (text && text.length > 10 && text.length < 200 && 
            !details.applications.includes(text) &&
            !text.toLowerCase().includes('menu') &&
            !text.toLowerCase().includes('navigation')) {
          details.applications.push(text);
        }
      });
    }
    
    // Extract technical data from specific sections
    const technicalSelectors = [
      '.technical-data tr',
      '.product-specifications tr',
      '.elementor-widget-text-editor:contains("Technical") tr',
      '.entry-content:contains("Technical") tr'
    ];
    
    for (const selector of technicalSelectors) {
      const $section = $(selector);
      $section.each((i, item) => {
        const text = cleanText($(item).text());
        if (text && text.includes(':')) {
          const [key, value] = text.split(':').map(s => cleanText(s));
          if (key && value && key.length > 2 && value.length > 2) {
            details.technicalData[key] = value;
          }
        }
      });
    }
    
    // Extract certifications
    const certSelectors = [
      '.certifications li',
      '.product-certifications li',
      '.elementor-widget-text-editor:contains("Certification") li',
      '.entry-content:contains("Certification") li'
    ];
    
    for (const selector of certSelectors) {
      const $section = $(selector);
      $section.each((i, item) => {
        const text = cleanText($(item).text());
        if (text && text.length > 5 && text.length < 100 && 
            !details.certifications.includes(text)) {
          details.certifications.push(text);
        }
      });
    }
    
    // Extract packaging information
    const packagingSelectors = [
      '.packaging',
      '.product-packaging',
      '.elementor-widget-text-editor:contains("Packaging")',
      '.entry-content:contains("Packaging")',
      'p:contains("package")',
      'p:contains("container")'
    ];
    
    for (const selector of packagingSelectors) {
      const $section = $(selector);
      if ($section.length > 0) {
        const text = cleanText($section.text());
        if (text && text.length > 20 && text.length < 500) {
          details.packaging = text;
          break;
        }
      }
    }
    
    // Extract benefits and usage information
    const benefitSelectors = [
      '.benefits',
      '.product-benefits',
      '.elementor-widget-text-editor:contains("Benefits")',
      '.entry-content:contains("Benefits")',
      'p:contains("benefit")'
    ];
    
    for (const selector of benefitSelectors) {
      const $section = $(selector);
      if ($section.length > 0) {
        const text = cleanText($section.text());
        if (text && text.length > 20 && text.length < 500) {
          details.benefits = text;
          break;
        }
      }
    }
    
    const usageSelectors = [
      '.usage',
      '.how-to-use',
      '.elementor-widget-text-editor:contains("Usage")',
      '.entry-content:contains("Usage")',
      'p:contains("application")',
      'p:contains("use")'
    ];
    
    for (const selector of usageSelectors) {
      const $section = $(selector);
      if ($section.length > 0) {
        const text = cleanText($section.text());
        if (text && text.length > 20 && text.length < 500) {
          details.howToUse = text;
          break;
        }
      }
    }
    
    // Clean up arrays by removing duplicates and empty items
    details.features = [...new Set(details.features.filter(f => f.length > 5))];
    details.applications = [...new Set(details.applications.filter(a => a.length > 5))];
    details.certifications = [...new Set(details.certifications.filter(c => c.length > 5))];
    
    return details;
    
  } catch (error) {
    console.error(`Error scraping ${product.name}:`, error.message);
    return {
      ...product,
      error: error.message
    };
  }
}

// Main scraping function
async function scrapeAllSealProducts() {
  console.log(`Starting to scrape ${sealProducts.length} seal products...`);
  
  const results = [];
  
  for (let i = 0; i < sealProducts.length; i++) {
    const product = sealProducts[i];
    console.log(`\n[${i + 1}/${sealProducts.length}] Scraping: ${product.name}`);
    
    const details = await scrapeProductDetails(product);
    results.push(details);
    
    // Add delay between requests to be respectful
    if (i < sealProducts.length - 1) {
      console.log('Waiting 2 seconds before next request...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // Save results
  const outputPath = path.join(__dirname, 'sealProductsRefined.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log(`\nScraping completed! Results saved to: ${outputPath}`);
  console.log(`Successfully scraped: ${results.filter(r => !r.error).length}/${sealProducts.length} products`);
  
  // Show summary of errors
  const errors = results.filter(r => r.error);
  if (errors.length > 0) {
    console.log('\nErrors encountered:');
    errors.forEach(error => {
      console.log(`- ${error.name}: ${error.error}`);
    });
  }
  
  return results;
}

// Run the scraper
if (require.main === module) {
  scrapeAllSealProducts().catch(console.error);
}

module.exports = { scrapeAllSealProducts, sealProducts }; 