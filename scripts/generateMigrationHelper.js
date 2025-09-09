const fs = require('fs');
const path = require('path');

// Migration helper script
console.log('🔄 WordPress to React Migration Helper');
console.log('=====================================\n');

// Generate meta refresh redirects for old WordPress URLs
const oldWpUrls = [
  '/product-category/adhesives/',
  '/product-category/sealants/', 
  '/product-category/tapes/',
  '/industrial-adhesives/',
  '/marine-adhesives/',
  '/construction-adhesives/',
  '/about-us/',
  '/contact-us/',
  '/products-page/'
];

const redirectMapping = {
  '/product-category/adhesives/': '/products/bond',
  '/product-category/sealants/': '/products/seal',
  '/product-category/tapes/': '/products/tape',
  '/industrial-adhesives/': '/industries/industrial',
  '/marine-adhesives/': '/industries/marine', 
  '/construction-adhesives/': '/industries/construction',
  '/about-us/': '/about',
  '/contact-us/': '/contact',
  '/products-page/': '/products'
};

// Create .htaccess style redirects for Vercel
const vercelRedirects = [];
Object.keys(redirectMapping).forEach(oldUrl => {
  const newUrl = redirectMapping[oldUrl];
  vercelRedirects.push({
    source: oldUrl,
    destination: newUrl,
    permanent: true
  });
});

// Update vercel.json with redirects
const vercelConfigPath = path.join(__dirname, '../vercel.json');
const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));

vercelConfig.redirects = vercelRedirects;

fs.writeFileSync(vercelConfigPath, JSON.stringify(vercelConfig, null, 2));
console.log('✅ Added', vercelRedirects.length, 'redirects to vercel.json');

// Generate a custom sitemap with immediate indexing hints
const sitemapPath = path.join(__dirname, '../dist/priority-sitemap.xml');
const prioritySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- HIGH PRIORITY: Industrial Adhesives Focus -->
  <url>
    <loc>https://forzabuilt.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <url>
    <loc>https://forzabuilt.com/industries/industrial</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
  
  <url>
    <loc>https://forzabuilt.com/products/bond</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Industry Pages -->
  <url>
    <loc>https://forzabuilt.com/industries/marine</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://forzabuilt.com/industries/construction</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://forzabuilt.com/industries/transportation</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

fs.writeFileSync(sitemapPath, prioritySitemap);
console.log('✅ Generated priority sitemap for immediate indexing');

// Generate Google Search Console submission commands
console.log('\n📋 NEXT STEPS FOR MIGRATION:');
console.log('===============================');
console.log('1. Deploy this build to your main domain (forzabuilt.com)');
console.log('2. Submit the new sitemap to Google Search Console:');
console.log('   → https://forzabuilt.com/sitemap.xml');
console.log('   → https://forzabuilt.com/priority-sitemap.xml');
console.log('3. Request indexing for these priority pages:');
console.log('   → https://forzabuilt.com/');
console.log('   → https://forzabuilt.com/industries/industrial');
console.log('   → https://forzabuilt.com/products/bond');
console.log('4. Monitor Search Console for crawl errors');
console.log('5. Update any external backlinks to point to new URLs\n');

console.log('🎯 SEO IMPROVEMENTS IMPLEMENTED:');
console.log('================================');
console.log('✅ Prerendered HTML for all major pages');
console.log('✅ Page-specific meta tags and titles');  
console.log('✅ Enhanced industrial adhesives keyword optimization');
console.log('✅ Proper canonical URLs and Open Graph tags');
console.log('✅ 301 redirects from old WordPress URLs');
console.log('✅ Priority sitemap for faster indexing');
console.log('✅ Optimized robots.txt for better crawling\n');

console.log('⚡ EXPECTED RESULTS:');
console.log('==================');
console.log('• Search engines will now see fully rendered HTML');
console.log('• Industrial adhesives content is heavily optimized');
console.log('• Old WordPress URLs redirect to new pages');
console.log('• Faster indexing of priority pages');
console.log('• Better rankings within 2-4 weeks of deployment\n');

// Generate a deployment checklist
const checklistPath = path.join(__dirname, '../DEPLOYMENT_CHECKLIST.md');
const checklist = `# SEO Migration Deployment Checklist

## Pre-Deployment
- [ ] Build completed successfully with prerendering
- [ ] All redirects configured in vercel.json
- [ ] Priority sitemap generated
- [ ] Meta tags optimized for industrial adhesives

## Deployment
- [ ] Deploy to main domain (forzabuilt.com) - NOT Vercel subdomain
- [ ] Verify all pages load correctly
- [ ] Check that prerendered HTML is served to crawlers
- [ ] Test redirects from old WordPress URLs

## Post-Deployment SEO
- [ ] Submit sitemap to Google Search Console
- [ ] Submit priority-sitemap.xml for faster indexing
- [ ] Request indexing for priority pages:
  - [ ] Homepage (/)
  - [ ] Industrial page (/industries/industrial)  
  - [ ] Bond products (/products/bond)
- [ ] Monitor Search Console for crawl errors
- [ ] Check robots.txt is accessible
- [ ] Verify meta tags in page source

## Monitoring (First 30 Days)
- [ ] Track indexing progress in Search Console
- [ ] Monitor for "industrial adhesives" keyword rankings
- [ ] Check Core Web Vitals scores
- [ ] Monitor organic traffic in Analytics
- [ ] Track ranking improvements for target keywords

## Long-term
- [ ] Update external backlinks to new URLs
- [ ] Continue monitoring search performance
- [ ] Add more industrial adhesives content
- [ ] Build industry-specific landing pages
`;

fs.writeFileSync(checklistPath, checklist);
console.log('📝 Generated deployment checklist: DEPLOYMENT_CHECKLIST.md');
console.log('\n🚀 Migration preparation complete!');


