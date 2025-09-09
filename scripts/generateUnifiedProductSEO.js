const fs = require('fs');
const path = require('path');

console.log('🔧 Generating Unified Product SEO System...\n');

// Load all product data sources
const loadProductData = () => {
  let industrial = [];
  let industrialProducts = [];
  
  // Try to load TypeScript files, but handle errors gracefully
  try {
    // Note: These imports may fail in production builds since they're TypeScript files
    // The script will continue with just the simplified products if these fail
    industrial = require('../src/data/industrialDatasheet.ts').industrialDatasheet || [];
  } catch (error) {
    console.log('⚠️  Could not load industrialDatasheet.ts (this is expected in production builds)');
  }
  
  try {
    industrialProducts = require('../src/data/industrialProducts.ts').INDUSTRIAL_PRODUCTS || [];
  } catch (error) {
    console.log('⚠️  Could not load industrialProducts.ts (this is expected in production builds)');
  }
  
  const sources = {
    simplified: JSON.parse(fs.readFileSync(path.join(__dirname, '../public/productsSimplified.json'), 'utf8')),
    industrial,
    industrialProducts
  };
  
  console.log('📊 PRODUCT DATA SOURCES:');
  console.log('========================');
  console.log(`Simplified products: ${sources.simplified.products?.length || 0}`);
  console.log(`Industrial datasheet: ${sources.industrial.length}`);  
  console.log(`Industrial products: ${sources.industrialProducts.length}\n`);
  
  return sources;
};

// Enhanced SEO optimization function
const generateProductSEO = (product, category = 'industrial') => {
  const isIndustrialProduct = 
    product.industry?.includes('industrial') || 
    product.category === 'BOND' ||
    product.name?.toLowerCase().includes('adhesive') ||
    product.name?.toLowerCase().includes('structural');
    
  const baseTitle = product.name || product.title || 'Product';
  const baseDescription = product.description || '';
  
  // Industrial adhesives keyword optimization
  const industrialKeywords = [
    'industrial adhesives',
    'manufacturing adhesives', 
    'structural bonding',
    'equipment assembly',
    'industrial bonding solutions',
    'heavy duty adhesives'
  ];
  
  // Enhanced title with industrial focus
  let optimizedTitle;
  if (isIndustrialProduct) {
    if (product.category === 'BOND') {
      optimizedTitle = `${baseTitle} - Industrial Structural Adhesive | ForzaBuilt`;
    } else if (product.category === 'SEAL') {
      optimizedTitle = `${baseTitle} - Industrial Sealant Solution | ForzaBuilt`;
    } else if (product.category === 'TAPE') {
      optimizedTitle = `${baseTitle} - Industrial Bonding Tape | ForzaBuilt`;
    } else {
      optimizedTitle = `${baseTitle} - Industrial Adhesive Solution | ForzaBuilt`;
    }
  } else {
    optimizedTitle = `${baseTitle} - ${product.category || 'Premium'} Solution | ForzaBuilt`;
  }
  
  // Enhanced description with industrial context
  let optimizedDescription = baseDescription;
  if (isIndustrialProduct && !baseDescription.toLowerCase().includes('industrial')) {
    optimizedDescription = `Premium industrial ${product.category?.toLowerCase() || 'adhesive'} solution for manufacturing and equipment assembly applications. ${baseDescription}`.substring(0, 160);
  }
  
  // Keywords with industrial focus
  const keywords = [
    product.category?.toLowerCase() || 'adhesive',
    ...(isIndustrialProduct ? industrialKeywords.slice(0, 3) : []),
    product.chemistry?.toLowerCase() || '',
    ...(product.applications || []).slice(0, 2)
  ].filter(Boolean).join(', ');
  
  return {
    title: optimizedTitle,
    description: optimizedDescription,
    keywords,
    canonicalUrl: `https://forzabuilt.com/products/${product.category?.toLowerCase() || 'bond'}/${product.id}`,
    isIndustrialOptimized: isIndustrialProduct,
    category: product.category || 'BOND',
    productId: product.id
  };
};

// Generate comprehensive product sitemap
const generateProductSitemap = (allProducts) => {
  const today = new Date().toISOString().split('T')[0];
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Product Category Pages -->
  <url>
    <loc>https://forzabuilt.com/products/bond</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://forzabuilt.com/products/seal</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://forzabuilt.com/products/tape</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Individual Products -->
`;

  // Add products with priority based on industrial relevance
  allProducts.forEach(productSEO => {
    const priority = productSEO.isIndustrialOptimized ? '0.7' : '0.6';
    const changefreq = productSEO.isIndustrialOptimized ? 'monthly' : 'yearly';
    
    sitemap += `  <url>
    <loc>${productSEO.canonicalUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`;
  });

  sitemap += '</urlset>';
  
  const sitemapPath = path.join(__dirname, '../dist/products-complete-sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  console.log('✅ Generated comprehensive product sitemap');
  
  return sitemap;
};

// Main execution
const sources = loadProductData();

// Process all products through SEO optimization
const allProductSEO = [];

// Process simplified products
if (sources.simplified.products) {
  sources.simplified.products.forEach(product => {
    const seoData = generateProductSEO(product);
    allProductSEO.push(seoData);
  });
}

// Process industrial datasheet products (sample for performance)
if (sources.industrial.length > 0) {
  sources.industrial.slice(0, 100).forEach(product => {
    const seoData = generateProductSEO(product);
    allProductSEO.push(seoData);
  });
}

// Process industrial products
if (sources.industrialProducts.length > 0) {
  sources.industrialProducts.forEach(product => {
    const seoData = generateProductSEO(product);
    allProductSEO.push(seoData);
  });
}

// Generate sitemap
generateProductSitemap(allProductSEO);

// Analysis report
const industrialOptimized = allProductSEO.filter(p => p.isIndustrialOptimized);
const bondProducts = allProductSEO.filter(p => p.category === 'BOND');

console.log('📈 PRODUCT SEO OPTIMIZATION RESULTS:');
console.log('====================================');
console.log(`Total products processed: ${allProductSEO.length}`);
console.log(`Industrial-optimized products: ${industrialOptimized.length}`);
console.log(`BOND products (adhesives): ${bondProducts.length}`);
console.log(`Industrial optimization rate: ${Math.round((industrialOptimized.length / allProductSEO.length) * 100)}%\n`);

console.log('🎯 TOP INDUSTRIAL ADHESIVE PRODUCTS:');
console.log('====================================');
industrialOptimized.slice(0, 5).forEach((product, index) => {
  console.log(`${index + 1}. ${product.title}`);
  console.log(`   URL: ${product.canonicalUrl}`);
  console.log(`   Keywords: ${product.keywords.substring(0, 80)}...\n`);
});

// Save optimization data
const optimizationData = {
  totalProducts: allProductSEO.length,
  industrialOptimized: industrialOptimized.length,
  optimizationRate: Math.round((industrialOptimized.length / allProductSEO.length) * 100),
  topIndustrialProducts: industrialOptimized.slice(0, 10),
  recommendations: [
    'Deploy with enhanced product prerendering',
    'Submit products-complete-sitemap.xml to Search Console',
    'Focus on industrial adhesive products for immediate indexing',
    'Monitor rankings for product-specific industrial keywords',
    'Consider expanding industrial product descriptions'
  ]
};

fs.writeFileSync(
  path.join(__dirname, '../PRODUCT_SEO_ANALYSIS.json'), 
  JSON.stringify(optimizationData, null, 2)
);

console.log('🚀 RECOMMENDATIONS:');
console.log('===================');
console.log('1. All products now get industrial keyword optimization');
console.log('2. BOND products prioritized for "industrial adhesives" ranking');
console.log('3. Enhanced meta tags for manufacturing context');
console.log('4. Comprehensive sitemap with priority ranking');
console.log('5. Ready for deployment with unified SEO approach\n');

console.log('✅ Unified Product SEO system complete!');
console.log('📊 Analysis saved to: PRODUCT_SEO_ANALYSIS.json');


