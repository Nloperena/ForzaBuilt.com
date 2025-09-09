const fs = require('fs');
const path = require('path');

// Load blog posts data
const blogPostsPath = path.join(__dirname, '../src/data/blogPosts.json');
const blogPosts = JSON.parse(fs.readFileSync(blogPostsPath, 'utf8'));

console.log('🔍 Analyzing Blog Content for Industrial Adhesives SEO...\n');

// Analyze blog posts for industrial adhesives keywords
const industrialKeywords = [
  'industrial adhesives',
  'manufacturing adhesives', 
  'structural adhesives',
  'contact adhesives',
  'equipment assembly',
  'production line',
  'factory',
  'manufacturing',
  'industrial bonding',
  'heavy duty adhesives'
];

// Analyze each blog post
const blogAnalysis = blogPosts.map(post => {
  const title = post.title.toLowerCase();
  const excerpt = post.excerpt.toLowerCase();
  const content = (post.fullContent || '').toLowerCase();
  
  const matchedKeywords = industrialKeywords.filter(keyword => 
    title.includes(keyword) || excerpt.includes(keyword) || content.includes(keyword)
  );
  
  return {
    id: post.id,
    title: post.title,
    category: post.category,
    matchedKeywords,
    seoScore: matchedKeywords.length,
    hasIndustrialFocus: matchedKeywords.length > 0
  };
});

// Sort by SEO relevance
const topIndustrialPosts = blogAnalysis
  .filter(post => post.hasIndustrialFocus)
  .sort((a, b) => b.seoScore - a.seoScore);

console.log('📊 BLOG SEO ANALYSIS RESULTS:');
console.log('=============================');
console.log(`Total blog posts: ${blogPosts.length}`);
console.log(`Posts with industrial keywords: ${topIndustrialPosts.length}`);
console.log(`Industrial relevance rate: ${Math.round((topIndustrialPosts.length / blogPosts.length) * 100)}%\n`);

console.log('🎯 TOP INDUSTRIAL ADHESIVES BLOG POSTS:');
console.log('=======================================');
topIndustrialPosts.slice(0, 5).forEach((post, index) => {
  console.log(`${index + 1}. "${post.title}"`);
  console.log(`   Category: ${post.category}`);
  console.log(`   SEO Score: ${post.seoScore}/10`);
  console.log(`   Keywords: ${post.matchedKeywords.join(', ')}\n`);
});

// Generate enhanced sitemap with blog priorities
const generateBlogSitemap = () => {
  const baseUrl = 'https://forzabuilt.com';
  const today = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Blog Index -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
`;

  // Add blog posts with priority based on industrial relevance
  blogAnalysis.forEach(post => {
    const slug = post.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    // Higher priority for industrial-focused posts
    const priority = post.hasIndustrialFocus ? '0.7' : '0.5';
    const changefreq = post.hasIndustrialFocus ? 'monthly' : 'yearly';
    
    sitemap += `  <!-- ${post.title} -->
  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
  
`;
  });

  sitemap += '</urlset>';
  
  const sitemapPath = path.join(__dirname, '../dist/blog-optimized-sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  console.log('✅ Generated optimized blog sitemap with industrial priorities');
  
  return sitemap;
};

// Generate the optimized sitemap
generateBlogSitemap();

// Create industrial blog content recommendations
const recommendations = {
  'high_priority_posts': topIndustrialPosts.slice(0, 3).map(post => ({
    title: post.title,
    reason: 'High industrial keyword relevance',
    action: 'Request immediate indexing in Google Search Console'
  })),
  'optimization_opportunities': blogAnalysis
    .filter(post => !post.hasIndustrialFocus)
    .slice(0, 3)
    .map(post => ({
      title: post.title,
      reason: 'Could benefit from industrial keywords',
      action: 'Consider adding industrial adhesives context'
    })),
  'new_content_suggestions': [
    'Industrial Adhesives Selection Guide for Manufacturing',
    'Best Practices for Equipment Assembly Adhesives',
    'Troubleshooting Common Industrial Bonding Issues',
    'Temperature Resistance in Industrial Adhesive Applications',
    'Cost-Effective Industrial Adhesive Solutions'
  ]
};

// Save recommendations
const recommendationsPath = path.join(__dirname, '../BLOG_SEO_RECOMMENDATIONS.json');
fs.writeFileSync(recommendationsPath, JSON.stringify(recommendations, null, 2));

console.log('📋 SEO RECOMMENDATIONS GENERATED:');
console.log('=================================');
console.log('• High priority posts for immediate indexing: 3');
console.log('• Posts that could be optimized: 3');
console.log('• New content suggestions: 5');
console.log(`• Detailed recommendations saved to: BLOG_SEO_RECOMMENDATIONS.json\n`);

console.log('🚀 NEXT STEPS FOR BLOG SEO:');
console.log('===========================');
console.log('1. Deploy with prerendered blog pages');
console.log('2. Submit blog-optimized-sitemap.xml to Search Console');
console.log('3. Request indexing for top 3 industrial posts');
console.log('4. Monitor blog traffic for industrial adhesives keywords');
console.log('5. Consider creating suggested new content');
console.log('6. Update existing posts with industrial context where relevant\n');

console.log('✅ Blog SEO optimization complete!');
console.log('📈 Expected impact: Better rankings for industrial adhesives + manufacturing content');


