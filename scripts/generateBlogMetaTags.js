const fs = require('fs');
const path = require('path');

// Load blog posts data
const blogPostsPath = path.join(__dirname, '../src/data/blogPosts.json');
const blogPosts = JSON.parse(fs.readFileSync(blogPostsPath, 'utf8'));

// Generate meta tags for each blog post
const generateMetaTags = (post) => {
  const metaTags = {
    title: `${post.title} | ForzaBuilt Learning Center`,
    description: post.excerpt.substring(0, 160) + (post.excerpt.length > 160 ? '...' : ''),
    keywords: `${post.category}, adhesives, industrial, manufacturing, ${post.title.toLowerCase()}`,
    og: {
      title: post.title,
      description: post.excerpt.substring(0, 160) + (post.excerpt.length > 160 ? '...' : ''),
      image: `https://forzabuilt.com${post.image}`,
      url: `https://forzabuilt.com/blog/${post.id}`,
      type: 'article',
      site_name: 'ForzaBuilt'
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt.substring(0, 160) + (post.excerpt.length > 160 ? '...' : ''),
      image: `https://forzabuilt.com${post.image}`,
      creator: '@forzabuilt'
    },
    article: {
      published_time: post.date,
      modified_time: post.date,
      section: post.category,
      tag: post.category
    },
    canonical: `https://forzabuilt.com/blog/${post.id}`
  };

  return metaTags;
};

// Generate meta tags for all blog posts
const allMetaTags = blogPosts.map(post => ({
  id: post.id,
  metaTags: generateMetaTags(post)
}));

// Save meta tags to JSON file
const metaTagsPath = path.join(__dirname, '../src/data/blogMetaTags.json');
fs.writeFileSync(metaTagsPath, JSON.stringify(allMetaTags, null, 2));

console.log(`✅ Generated meta tags for ${blogPosts.length} blog posts`);
console.log(`📁 Saved to: ${metaTagsPath}`);

// Generate example HTML for one post
const examplePost = blogPosts[0];
const exampleMetaTags = generateMetaTags(examplePost);

console.log(`\n📄 Example HTML meta tags for blog post "${examplePost.title}":`);
console.log(`<!-- Primary Meta Tags -->`);
console.log(`<title>${exampleMetaTags.title}</title>`);
console.log(`<meta name="title" content="${exampleMetaTags.title}">`);
console.log(`<meta name="description" content="${exampleMetaTags.description}">`);
console.log(`<meta name="keywords" content="${exampleMetaTags.keywords}">`);
console.log(`<link rel="canonical" href="${exampleMetaTags.canonical}">`);
console.log(``);
console.log(`<!-- Open Graph / Facebook -->`);
console.log(`<meta property="og:type" content="${exampleMetaTags.og.type}">`);
console.log(`<meta property="og:url" content="${exampleMetaTags.og.url}">`);
console.log(`<meta property="og:title" content="${exampleMetaTags.og.title}">`);
console.log(`<meta property="og:description" content="${exampleMetaTags.og.description}">`);
console.log(`<meta property="og:image" content="${exampleMetaTags.og.image}">`);
console.log(`<meta property="og:site_name" content="${exampleMetaTags.og.site_name}">`);
console.log(``);
console.log(`<!-- Twitter -->`);
console.log(`<meta property="twitter:card" content="${exampleMetaTags.twitter.card}">`);
console.log(`<meta property="twitter:url" content="${exampleMetaTags.og.url}">`);
console.log(`<meta property="twitter:title" content="${exampleMetaTags.twitter.title}">`);
console.log(`<meta property="twitter:description" content="${exampleMetaTags.twitter.description}">`);
console.log(`<meta property="twitter:image" content="${exampleMetaTags.twitter.image}">`);
console.log(`<meta property="twitter:creator" content="${exampleMetaTags.twitter.creator}">`);
console.log(``);
console.log(`<!-- Article Meta Tags -->`);
console.log(`<meta property="article:published_time" content="${exampleMetaTags.article.published_time}">`);
console.log(`<meta property="article:modified_time" content="${exampleMetaTags.article.modified_time}">`);
console.log(`<meta property="article:section" content="${exampleMetaTags.article.section}">`);
console.log(`<meta property="article:tag" content="${exampleMetaTags.article.tag}">`);

