const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;

// Test a few key products first
const testUrls = [
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
  'https://forzabuilt.com/product/c-os9-hybrid-polymer-structural-single-part-moisture-cure-adhesive/',
  'https://forzabuilt.com/product/t-os150-high-performance-semi-self-leveling-hybrid-polymer-sealant/',
  'https://forzabuilt.com/product/t-os151-non-hazardous-high-strength-single-part-hybrid-polymer-sealant/',
  'https://forzabuilt.com/product/t-os164-silicone-sealant/',
  'https://forzabuilt.com/product/tac-734g-web-spray-high-tack-infusion-molding-adhesive/',
  'https://forzabuilt.com/product/tac-735r-mist-spray-no-haps-infusion-molding-adhesive/',
  'https://forzabuilt.com/product/tac-738r-web-spray-zero-voc-infusion-molding-adhesive/',
  'https://forzabuilt.com/product/tac-739r-mist-spray-infusion-molding-adhesive/'
];

async function testUrl(url) {
  try {
    console.log(`Testing: ${url}`);
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const title = $('.entry-title').text().trim();
    
    if (title) {
      console.log(`✓ Found: ${title}`);
      return { url, title, exists: true };
    } else {
      console.log(`✗ No title found`);
      return { url, exists: false };
    }
  } catch (error) {
    console.log(`✗ Error: ${error.message}`);
    return { url, exists: false, error: error.message };
  }
}

async function main() {
  console.log('Testing product URLs...\n');
  
  const results = [];
  
  for (const url of testUrls) {
    const result = await testUrl(url);
    results.push(result);
    
    // Small delay
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n=== SUMMARY ===');
  const existing = results.filter(r => r.exists);
  const missing = results.filter(r => !r.exists);
  
  console.log(`\nFound ${existing.length} existing products:`);
  existing.forEach(r => console.log(`- ${r.title}`));
  
  console.log(`\nMissing ${missing.length} products:`);
  missing.forEach(r => console.log(`- ${r.url}`));
  
  // Save results
  await fs.writeFile('testResults.json', JSON.stringify(results, null, 2));
  console.log('\nResults saved to testResults.json');
}

main().catch(console.error); 