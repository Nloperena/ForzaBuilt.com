const fs = require('fs');
const path = require('path');

// Load blog posts data
const blogPostsPath = path.join(__dirname, '../src/data/blogPosts.json');
const blogPosts = JSON.parse(fs.readFileSync(blogPostsPath, 'utf8'));

// Generate sitemap XML
const generateSitemap = () => {
  const baseUrl = 'https://forzabuilt.com';
  const currentDate = new Date().toISOString();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Blog index page -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

  // Add individual blog post URLs
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

  return sitemap;
};

// Generate and save sitemap
const sitemap = generateSitemap();
const sitemapPath = path.join(__dirname, '../public/blog-sitemap.xml');
fs.writeFileSync(sitemapPath, sitemap);

console.log(`✅ Generated blog sitemap with ${blogPosts.length} posts`);
console.log(`📁 Saved to: ${sitemapPath}`);

// Generate robots.txt entry
const robotsEntry = `
# Blog sitemap
Sitemap: https://forzabuilt.com/blog-sitemap.xml`;

console.log(`🤖 Add this to your robots.txt:`);
console.log(robotsEntry);
