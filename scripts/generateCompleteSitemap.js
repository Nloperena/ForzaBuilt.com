const fs = require('fs');
const path = require('path');

console.log('🚀 Generating complete sitemap...\n');

// Load blog posts data
const blogPostsPath = path.join(__dirname, '../src/data/blogPosts.json');
const blogPosts = JSON.parse(fs.readFileSync(blogPostsPath, 'utf8'));

const baseUrl = 'https://forzabuilt.com';
const currentDate = new Date().toISOString();

// Main site pages
const mainPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/products', priority: '0.9', changefreq: 'weekly' },
  { url: '/products/bond', priority: '0.8', changefreq: 'weekly' },
  { url: '/products/seal', priority: '0.8', changefreq: 'weekly' },
  { url: '/products/tape', priority: '0.8', changefreq: 'weekly' },
  { url: '/industries', priority: '0.9', changefreq: 'weekly' },
  { url: '/industries/construction', priority: '0.8', changefreq: 'monthly' },
  { url: '/industries/marine', priority: '0.8', changefreq: 'monthly' },
  { url: '/industries/transportation', priority: '0.8', changefreq: 'monthly' },
  { url: '/industries/composites', priority: '0.8', changefreq: 'monthly' },
  { url: '/industries/insulation', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact', priority: '0.7', changefreq: 'monthly' },
  { url: '/blog', priority: '0.8', changefreq: 'weekly' }
];

// Generate sitemap XML
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main site pages -->`;

// Add main pages
mainPages.forEach(page => {
  sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
});

// Add static blog pages
blogPosts.forEach(post => {
  sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.id}.html</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
});

// Add React app blog routes
blogPosts.forEach(post => {
  sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.id}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
});

sitemap += `
</urlset>`;

// Save complete sitemap
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(sitemapPath, sitemap);

console.log(`✅ Complete sitemap generated: ${sitemapPath}`);
console.log(`📊 Summary:`);
console.log(`   • ${mainPages.length} main pages`);
console.log(`   • ${blogPosts.length} static blog pages`);
console.log(`   • ${blogPosts.length} React blog routes`);
console.log(`   • Total: ${mainPages.length + (blogPosts.length * 2)} URLs`);

// Generate sitemap index
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/blog-sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;

const sitemapIndexPath = path.join(__dirname, '../public/sitemap-index.xml');
fs.writeFileSync(sitemapIndexPath, sitemapIndex);

console.log(`✅ Sitemap index generated: ${sitemapIndexPath}`);

// Update robots.txt to include all sitemaps
const robotsContent = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-index.xml
Sitemap: ${baseUrl}/blog-sitemap.xml

# Crawl delay
Crawl-delay: 1`;

const robotsPath = path.join(__dirname, '../public/robots.txt');
fs.writeFileSync(robotsPath, robotsContent);

console.log(`✅ Robots.txt updated: ${robotsPath}`);

// Generate URL list for easy reference
const urlList = [
  ...mainPages.map(page => `${baseUrl}${page.url}`),
  ...blogPosts.map(post => `${baseUrl}/blog/${post.id}.html`),
  ...blogPosts.map(post => `${baseUrl}/blog/${post.id}`)
];

const urlListPath = path.join(__dirname, '../src/data/urlList.json');
fs.writeFileSync(urlListPath, JSON.stringify(urlList, null, 2));

console.log(`✅ URL list generated: ${urlListPath}`);

console.log(`\n🎉 Complete sitemap generation finished!`);
console.log(`\n🔗 Sitemap URLs:`);
console.log(`   • Main sitemap: ${baseUrl}/sitemap.xml`);
console.log(`   • Sitemap index: ${baseUrl}/sitemap-index.xml`);
console.log(`   • Blog sitemap: ${baseUrl}/blog-sitemap.xml`);

console.log(`\n📝 Next steps:`);
console.log(`   1. Submit sitemap to Google Search Console`);
console.log(`   2. Submit sitemap to Bing Webmaster Tools`);
console.log(`   3. Monitor indexing progress`);
console.log(`   4. Set up URL monitoring in search console`);

