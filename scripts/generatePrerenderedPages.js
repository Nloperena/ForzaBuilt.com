const fs = require('fs');
const path = require('path');

// Load blog posts data
const blogPostsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/blogPosts.json'), 'utf8'));

// Generate blog routes
const generateSlugFromTitle = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

// Function to get blog post by slug
const getBlogPostBySlug = (slug) => {
  return blogPostsData.find(post => generateSlugFromTitle(post.title) === slug);
};

const blogRoutes = blogPostsData.map(post => `/blog/${generateSlugFromTitle(post.title)}`);

// Routes that should be prerendered for better SEO
const routes = [
  '/',
  '/about',
  '/contact',
  '/industries',
  '/products',
  '/blog', // Blog index page
  '/industries/marine',
  '/industries/construction', 
  '/industries/transportation',
  '/industries/industrial',
  '/industries/composites',
  '/industries/insulation',
  '/products/bond',
  '/products/seal',
  '/products/tape',
  ...blogRoutes // Add all blog post routes
];

// Read the main index.html template
const distPath = path.join(__dirname, '../dist');
const indexPath = path.join(distPath, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('❌ dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexPath, 'utf8');

// Page-specific meta tags and content
const pageConfigs = {
  '/': {
    title: 'ForzaBuilt - Industrial Adhesives, Sealants, Tapes & Cleaning Solutions',
    description: 'ForzaBuilt delivers premium industrial adhesives, sealants, and bonding solutions across transportation, marine, construction, and manufacturing.',
    keywords: 'industrial adhesives, industrial structural adhesives, manufacturing adhesives, industrial bonding solutions',
    ogTitle: 'ForzaBuilt - Premium Industrial Adhesives & Bonding Solutions',
    canonicalUrl: 'https://forzabuilt.com/'
  },
  '/industries/industrial': {
    title: 'Industrial Adhesives & Manufacturing Solutions - ForzaBuilt',
    description: 'Premium industrial structural adhesives for manufacturing, equipment assembly, and production line applications. High-strength bonding solutions for industrial environments.',
    keywords: 'industrial adhesives, manufacturing adhesives, structural adhesives, equipment assembly, production line bonding, industrial bonding solutions',
    ogTitle: 'Industrial Adhesives & Manufacturing Solutions',
    canonicalUrl: 'https://forzabuilt.com/industries/industrial'
  },
  '/products/bond': {
    title: 'Industrial Bonding Adhesives - ForzaBuilt BOND Product Line',
    description: 'High-performance industrial bonding adhesives for structural applications. Premium adhesive solutions for manufacturing, equipment assembly, and industrial bonding needs.',
    keywords: 'industrial bonding adhesives, structural adhesives, manufacturing adhesives, equipment bonding, industrial bond products',
    ogTitle: 'Industrial Bonding Adhesives - BOND Product Line',
    canonicalUrl: 'https://forzabuilt.com/products/bond'
  },
  '/industries/marine': {
    title: 'Marine Adhesives & Sealants - ForzaBuilt Marine Solutions',
    description: 'Specialized marine adhesives and sealants for boat building, yacht construction, and marine applications. Waterproof bonding solutions for harsh marine environments.',
    keywords: 'marine adhesives, marine sealants, boat building adhesives, yacht construction, marine bonding solutions',
    ogTitle: 'Marine Adhesives & Sealants',
    canonicalUrl: 'https://forzabuilt.com/industries/marine'
  },
  '/industries/construction': {
    title: 'Construction Adhesives & Building Solutions - ForzaBuilt',
    description: 'High-performance construction adhesives for building applications. Structural bonding solutions for commercial and residential construction projects.',
    keywords: 'construction adhesives, building adhesives, structural bonding, construction sealants, building solutions',
    ogTitle: 'Construction Adhesives & Building Solutions', 
    canonicalUrl: 'https://forzabuilt.com/industries/construction'
  },
  '/industries/transportation': {
    title: 'Transportation Adhesives - Automotive & Vehicle Solutions - ForzaBuilt',
    description: 'Specialized adhesives for transportation industry including automotive, RV, truck, and vehicle assembly applications.',
    keywords: 'transportation adhesives, automotive adhesives, vehicle assembly, RV adhesives, truck bonding solutions',
    ogTitle: 'Transportation Adhesives - Automotive & Vehicle Solutions',
    canonicalUrl: 'https://forzabuilt.com/industries/transportation'
  },
  '/blog': {
    title: 'Industrial Adhesives Blog - Expert Tips & Applications - ForzaBuilt',
    description: 'Expert insights on industrial adhesives, manufacturing applications, and bonding solutions. Learn best practices for contact adhesives, structural bonding, and industrial applications.',
    keywords: 'industrial adhesives blog, manufacturing adhesives tips, contact adhesives guide, industrial bonding applications, adhesive best practices',
    ogTitle: 'Industrial Adhesives Blog - Expert Tips & Applications',
    canonicalUrl: 'https://forzabuilt.com/blog'
  }
};

// Function to generate page-specific HTML
function generatePageHtml(route, baseHtml) {
  let config = pageConfigs[route];
  
  // Handle blog post routes dynamically
  if (route.startsWith('/blog/') && route !== '/blog') {
    const slug = route.replace('/blog/', '');
    const blogPost = getBlogPostBySlug(slug);
    
    if (blogPost) {
      // Create dynamic config for blog post
      config = {
        title: `${blogPost.title} | ForzaBuilt Industrial Adhesives Blog`,
        description: blogPost.excerpt.substring(0, 160) + (blogPost.excerpt.length > 160 ? '...' : ''),
        keywords: `${blogPost.category.toLowerCase()}, industrial adhesives, manufacturing adhesives, contact adhesives, ${blogPost.title.toLowerCase()}`,
        ogTitle: blogPost.title,
        canonicalUrl: `https://forzabuilt.com/blog/${slug}`
      };
    }
  }
  
  // Fallback to default config
  if (!config) {
    config = pageConfigs['/'];
  }
  
  let html = baseHtml;
  
  // Update title
  html = html.replace(
    /<title>.*?<\/title>/i,
    `<title>${config.title}</title>`
  );
  
  // Update meta description
  html = html.replace(
    /<meta name="description" content=".*?"[^>]*>/i,
    `<meta name="description" content="${config.description}" />`
  );
  
  // Update keywords
  html = html.replace(
    /<meta name="keywords" content=".*?"[^>]*>/i,
    `<meta name="keywords" content="${config.keywords}" />`
  );
  
  // Update Open Graph title
  html = html.replace(
    /<meta property="og:title" content=".*?"[^>]*>/i,
    `<meta property="og:title" content="${config.ogTitle}" />`
  );
  
  // Update Open Graph description
  html = html.replace(
    /<meta property="og:description" content=".*?"[^>]*>/i,
    `<meta property="og:description" content="${config.description}" />`
  );
  
  // Update canonical URL
  html = html.replace(
    /<link rel="canonical" href=".*?"[^>]*>/i,
    `<link rel="canonical" href="${config.canonicalUrl}" />`
  );
  
  // Update Open Graph URL
  html = html.replace(
    /<meta property="og:url" content=".*?"[^>]*>/i,
    `<meta property="og:url" content="${config.canonicalUrl}" />`
  );
  
  return html;
}

// Generate prerendered pages
console.log('🚀 Generating prerendered pages for SEO...');

routes.forEach(route => {
  const html = generatePageHtml(route, baseHtml);
  
  // Create directory structure
  const routePath = route === '/' ? '/index' : route;
  const filePath = path.join(distPath, `${routePath}.html`);
  const dirPath = path.dirname(filePath);
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  // Write the HTML file
  fs.writeFileSync(filePath, html);
  console.log(`✅ Generated: ${filePath}`);
});

// Also create a special robots.txt for better crawling
const robotsContent = `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://forzabuilt.com/sitemap.xml
Sitemap: https://forzabuilt.com/sitemap-index.xml  
Sitemap: https://forzabuilt.com/blog-sitemap.xml

# Industrial Adhesives Focus
# Priority pages for industrial adhesives
Allow: /industries/industrial
Allow: /products/bond
Allow: /

# Crawl delay
Crawl-delay: 1

# Disallow admin or development paths
Disallow: /admin/
Disallow: /_next/
Disallow: /api/`;

fs.writeFileSync(path.join(distPath, 'robots.txt'), robotsContent);
console.log('✅ Updated robots.txt with SEO optimizations');

console.log('\n🎉 Prerendering complete! Generated', routes.length, 'optimized HTML pages.');
console.log('\n📈 SEO Benefits:');
console.log('   - Search engines get fully rendered HTML');
console.log('   - Improved crawling and indexing');
console.log('   - Page-specific meta tags and titles');
console.log('   - Better ranking potential for all pages');
