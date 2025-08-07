const fs = require('fs');
const path = require('path');

// Read the products data
const productsData = JSON.parse(fs.readFileSync('./public/productsSimplified.json', 'utf8'));

// Base URL
const baseUrl = 'https://forzabuilt.com';

// Get current date for lastmod
const currentDate = new Date().toISOString().split('T')[0];

// Start building sitemap
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Main pages -->
  <url>
    <loc>${baseUrl}/industries</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/products</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;

// Add category pages
const categories = [...new Set(productsData.products.map(p => p.category.toLowerCase()))];
categories.forEach(category => {
  sitemap += `
  <url>
    <loc>${baseUrl}/products/${category}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
});

// Add product pages
productsData.products.forEach(product => {
  const category = product.category.toLowerCase();
  const productId = product.id;
  
  sitemap += `
  <url>
    <loc>${baseUrl}/products/${category}/${productId}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
});

// Close sitemap
sitemap += `
</urlset>`;

// Write sitemap to public directory
fs.writeFileSync('./public/sitemap.xml', sitemap);

console.log('✅ Sitemap generated successfully!');
console.log(`📁 Generated sitemap with ${categories.length} categories and ${productsData.products.length} products`);
console.log(`📄 Sitemap saved to: public/sitemap.xml`);

