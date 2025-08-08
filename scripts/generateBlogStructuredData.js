const fs = require('fs');
const path = require('path');

// Load blog posts data
const blogPostsPath = path.join(__dirname, '../src/data/blogPosts.json');
const blogPosts = JSON.parse(fs.readFileSync(blogPostsPath, 'utf8'));

// Generate structured data for each blog post
const generateStructuredData = (post) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://forzabuilt.com${post.image}`,
    "author": {
      "@type": "Organization",
      "name": "ForzaBuilt",
      "url": "https://forzabuilt.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ForzaBuilt",
      "logo": {
        "@type": "ImageObject",
        "url": "https://forzabuilt.com/forza-logo-full.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://forzabuilt.com/blog/${post.id}`
    },
    "articleSection": post.category,
    "keywords": `${post.category}, adhesives, industrial, manufacturing, ${post.title.toLowerCase()}`,
    "url": `https://forzabuilt.com/blog/${post.id}`
  };

  return structuredData;
};

// Generate structured data for all blog posts
const allStructuredData = blogPosts.map(post => ({
  id: post.id,
  structuredData: generateStructuredData(post)
}));

// Save structured data to JSON file
const structuredDataPath = path.join(__dirname, '../src/data/blogStructuredData.json');
fs.writeFileSync(structuredDataPath, JSON.stringify(allStructuredData, null, 2));

console.log(`✅ Generated structured data for ${blogPosts.length} blog posts`);
console.log(`📁 Saved to: ${structuredDataPath}`);

// Generate example HTML for one post
const examplePost = blogPosts[0];
const exampleStructuredData = generateStructuredData(examplePost);

console.log(`\n📄 Example HTML for blog post "${examplePost.title}":`);
console.log(`<script type="application/ld+json">`);
console.log(JSON.stringify(exampleStructuredData, null, 2));
console.log(`</script>`);

