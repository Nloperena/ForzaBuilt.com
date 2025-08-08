const fs = require('fs');
const path = require('path');

console.log('🚀 Starting static blog page generation...\n');

// Load blog posts data
const blogPostsPath = path.join(__dirname, '../src/data/blogPosts.json');
const blogPosts = JSON.parse(fs.readFileSync(blogPostsPath, 'utf8'));

console.log(`📊 Found ${blogPosts.length} blog posts to generate`);

// Create the blog pages directory if it doesn't exist
const blogPagesDir = path.join(__dirname, '../public/blog');
if (!fs.existsSync(blogPagesDir)) {
  fs.mkdirSync(blogPagesDir, { recursive: true });
}

// Helper function to get recent posts (excluding current post)
const getRecentPosts = (currentPostId, limit = 5) => {
  return blogPosts
    .filter(post => post.id !== currentPostId)
    .slice(0, limit);
};

// Helper function to get related posts from same category
const getRelatedPosts = (currentPost, limit = 3) => {
  return blogPosts
    .filter(post => post.id !== currentPost.id && post.category === currentPost.category)
    .slice(0, limit);
};

// Helper function to get posts for "More To Explore" carousel
const getMoreToExplorePosts = (currentPostId, limit = 6) => {
  return blogPosts
    .filter(post => post.id !== currentPostId)
    .slice(0, limit);
};

// Helper function to group posts by month for archive
const getPostsByMonth = () => {
  return blogPosts.reduce((acc, post) => {
    const date = new Date(post.date);
    const monthYear = date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(post);
    return acc;
  }, {});
};

// Generate HTML template for a blog post
const generateBlogPageHTML = (post) => {
  const recentPosts = getRecentPosts(post.id);
  const relatedPosts = getRelatedPosts(post);
  const moreToExplorePosts = getMoreToExplorePosts(post.id);
  const postsByMonth = getPostsByMonth();

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

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title} | ForzaBuilt Learning Center</title>
    <meta name="description" content="${post.excerpt.substring(0, 160)}${post.excerpt.length > 160 ? '...' : ''}">
    <meta name="keywords" content="${post.category}, adhesives, industrial, manufacturing, ${post.title.toLowerCase()}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://forzabuilt.com/blog/${post.id}">
    <meta property="og:title" content="${post.title}">
    <meta property="og:description" content="${post.excerpt.substring(0, 160)}${post.excerpt.length > 160 ? '...' : ''}">
    <meta property="og:image" content="https://forzabuilt.com${post.image}">
    <meta property="og:site_name" content="ForzaBuilt">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://forzabuilt.com/blog/${post.id}">
    <meta property="twitter:title" content="${post.title}">
    <meta property="twitter:description" content="${post.excerpt.substring(0, 160)}${post.excerpt.length > 160 ? '...' : ''}">
    <meta property="twitter:image" content="https://forzabuilt.com${post.image}">
    <meta property="twitter:creator" content="@forzabuilt">
    
    <!-- Article Meta Tags -->
    <meta property="article:published_time" content="${post.date}">
    <meta property="article:modified_time" content="${post.date}">
    <meta property="article:section" content="${post.category}">
    <meta property="article:tag" content="${post.category}">
    
    <link rel="canonical" href="https://forzabuilt.com/blog/${post.id}">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
        ${JSON.stringify(structuredData, null, 2)}
    </script>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#1b3764',
                        accent: '#F2611D'
                    },
                    fontFamily: {
                        'kallisto': ['Kallisto', 'sans-serif']
                    }
                }
            }
        }
    </script>
    
    <!-- Custom Styles -->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .font-kallisto { font-family: 'Kallisto', 'Inter', sans-serif; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .prose { max-width: none; }
        .prose h2 { color: #1f2937; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; }
        .prose h3 { color: #374151; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem; }
        .prose p { color: #4b5563; line-height: 1.75; margin-bottom: 1rem; }
        .prose ul { color: #4b5563; margin-bottom: 1rem; }
        .prose li { margin-bottom: 0.5rem; }
        .prose strong { color: #1f2937; font-weight: 600; }
        .prose a { color: #F2611D; text-decoration: underline; }
        .prose a:hover { color: #d54a0f; }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <header class="bg-primary text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-6">
                <div class="flex items-center">
                    <a href="/" class="text-2xl font-bold font-kallisto">ForzaBuilt</a>
                </div>
                <nav class="hidden md:flex space-x-8">
                    <a href="/" class="hover:text-accent transition-colors">Home</a>
                    <a href="/products" class="hover:text-accent transition-colors">Products</a>
                    <a href="/industries" class="hover:text-accent transition-colors">Industries</a>
                    <a href="/blog" class="hover:text-accent transition-colors">Blog</a>
                    <a href="/contact" class="hover:text-accent transition-colors">Contact</a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="relative py-16 sm:py-24 md:py-32 lg:py-40 xl:py-48 bg-primary">
        <div class="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/80"></div>
        <div class="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-20">
            <div class="max-w-4xl mx-auto">
                <div class="mb-6">
                    <a href="/blog" class="inline-flex items-center text-white hover:text-accent transition-colors mb-4">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Back to Blog
                    </a>
                    <span class="inline-block px-3 py-1 bg-accent text-white text-xs font-medium rounded-full mb-4">
                        ${post.category}
                    </span>
                    <span class="text-white text-sm ml-4">
                        ${new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </span>
                </div>
                <h1 class="font-black text-white font-kallisto text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-none break-words mb-6">
                    ${post.title}
                </h1>
                <p class="text-white text-lg sm:text-xl opacity-90">
                    ${post.excerpt}
                </p>
            </div>
        </div>
    </section>

    <!-- Main Content with Sidebar -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <!-- Main Content -->
                <div class="lg:col-span-3">
                    <div class="mb-8">
                        <img src="${post.image}" alt="${post.title}" class="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg shadow-lg">
                    </div>

                    <!-- Full Blog Content -->
                    ${post.fullContent || `
                    <div class="prose prose-lg max-w-none">
                        <div class="mb-8">
                            <h2 class="text-2xl font-bold text-gray-900 mb-4">Article Summary</h2>
                            <p class="text-gray-700 leading-relaxed">
                                ${post.excerpt}
                            </p>
                        </div>

                        ${post.keyTakeaways && post.keyTakeaways.length > 0 ? `
                        <div class="mb-8">
                            <h2 class="text-2xl font-bold text-gray-900 mb-4">Key Takeaways</h2>
                            <ul class="space-y-3">
                                ${post.keyTakeaways.map(takeaway => `
                                <li class="flex items-start">
                                    <span class="text-accent mr-3 mt-1">•</span>
                                    <span class="text-gray-700">${takeaway}</span>
                                </li>
                                `).join('')}
                            </ul>
                        </div>
                        ` : ''}
                    </div>
                    `}

                    <!-- Share This Post Section -->
                    <div class="border-t border-gray-200 pt-8 mt-8">
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div class="mb-4 sm:mb-0">
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">Share This Post</h3>
                                <p class="text-gray-600 text-sm">Help others discover this valuable content</p>
                            </div>
                            <div class="flex space-x-3">
                                <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://forzabuilt.com/blog/${post.id}`)}" 
                                   target="_blank" rel="noopener noreferrer" 
                                   class="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                                   title="Share on Twitter">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://forzabuilt.com/blog/${post.id}`)}" 
                                   target="_blank" rel="noopener noreferrer" 
                                   class="p-2 text-gray-400 hover:text-blue-700 transition-colors"
                                   title="Share on LinkedIn">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                                    </svg>
                                </a>
                                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://forzabuilt.com/blog/${post.id}`)}" 
                                   target="_blank" rel="noopener noreferrer" 
                                   class="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                   title="Share on Facebook">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                                    </svg>
                                </a>
                                <a href="mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`Check out this article: https://forzabuilt.com/blog/${post.id}`)}" 
                                   class="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                   title="Share via Email">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Related Articles -->
                    ${relatedPosts.length > 0 ? `
                    <div class="border-t border-gray-200 pt-8 mt-8">
                        <h3 class="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            ${relatedPosts.map(relatedPost => `
                            <a href="/blog/${relatedPost.id}.html" class="group block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div class="aspect-w-16 aspect-h-9 mb-4">
                                    <img src="${relatedPost.image}" alt="${relatedPost.title}" class="w-full h-48 object-cover rounded-t-lg">
                                </div>
                                <div class="p-4">
                                    <span class="inline-block px-2 py-1 bg-accent text-white text-xs font-medium rounded mb-2">
                                        ${relatedPost.category}
                                    </span>
                                    <h4 class="font-semibold text-gray-900 group-hover:text-accent transition-colors line-clamp-2">
                                        ${relatedPost.title}
                                    </h4>
                                    <p class="text-gray-600 text-sm mt-2 line-clamp-3">
                                        ${relatedPost.excerpt}
                                    </p>
                                </div>
                            </a>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>

                <!-- Sidebar -->
                <div class="lg:col-span-1">
                    <!-- Recent Posts -->
                    <div class="bg-gray-50 rounded-lg p-6 mb-8">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h3>
                        <div class="space-y-4">
                            ${recentPosts.map(recentPost => `
                            <a href="/blog/${recentPost.id}.html" class="block group">
                                <div class="flex items-start space-x-3">
                                    <img src="${recentPost.image}" alt="${recentPost.title}" class="w-16 h-16 object-cover rounded">
                                    <div class="flex-1 min-w-0">
                                        <h4 class="text-sm font-medium text-gray-900 group-hover:text-accent transition-colors line-clamp-2">
                                            ${recentPost.title}
                                        </h4>
                                        <p class="text-xs text-gray-500 mt-1">
                                            ${new Date(recentPost.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </a>
                            `).join('')}
                        </div>
                    </div>

                    <!-- BLOGS BY MONTH -->
                    <div class="bg-gray-50 rounded-lg p-6 mb-8">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">BLOGS BY MONTH</h3>
                        <div class="space-y-2">
                            ${Object.entries(postsByMonth)
                                .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                                .slice(0, 12)
                                .map(([monthYear, posts]) => `
                                <a href="/blog" class="flex items-center justify-between text-sm text-gray-600 hover:text-accent transition-colors">
                                    <span>${monthYear}</span>
                                    <span class="bg-accent text-white text-xs px-2 py-1 rounded-full">
                                        ${posts.length}
                                    </span>
                                </a>
                                `).join('')}
                        </div>
                    </div>

                    <!-- Call to Action -->
                    <div class="bg-accent rounded-lg p-6 text-white">
                        <h3 class="text-lg font-semibold mb-3">Stay Updated</h3>
                        <p class="text-sm mb-4 opacity-90">
                            Get the latest insights, tips, and industry news delivered to your inbox.
                        </p>
                        <div class="space-y-3">
                            <input type="email" placeholder="Enter your email" 
                                   class="w-full px-3 py-2 text-gray-900 rounded border-0 focus:ring-2 focus:ring-white">
                            <button class="w-full bg-white text-accent font-medium py-2 px-4 rounded hover:bg-gray-100 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- More To Explore Carousel -->
    ${moreToExplorePosts.length > 0 ? `
    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h2 class="text-3xl font-bold text-gray-900 text-center mb-12">More To Explore</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${moreToExplorePosts.map(explorePost => `
                <a href="/blog/${explorePost.id}.html" class="group block bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <div class="aspect-w-16 aspect-h-9">
                        <img src="${explorePost.image}" alt="${explorePost.title}" class="w-full h-48 object-cover rounded-t-lg">
                    </div>
                    <div class="p-6">
                        <span class="inline-block px-3 py-1 bg-accent text-white text-xs font-medium rounded-full mb-3">
                            ${explorePost.category}
                        </span>
                        <h3 class="text-xl font-semibold text-gray-900 group-hover:text-accent transition-colors mb-3 line-clamp-2">
                            ${explorePost.title}
                        </h3>
                        <p class="text-gray-600 line-clamp-3 mb-4">
                            ${explorePost.excerpt}
                        </p>
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-500">
                                ${new Date(explorePost.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                            <span class="text-accent font-medium text-sm group-hover:translate-x-1 transition-transform">
                                Read More →
                            </span>
                        </div>
                    </div>
                </a>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <!-- Call to Action Section -->
    <section class="py-16 bg-primary">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center">
            <h2 class="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p class="text-xl text-white opacity-90 mb-8">
                Discover how our adhesive solutions can transform your manufacturing processes.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/products" 
                   class="inline-flex items-center px-8 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent/80 transition-colors">
                    Explore Products
                </a>
                <a href="/contact" 
                   class="inline-flex items-center px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-primary transition-colors">
                    Contact Us
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-primary text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-lg font-bold mb-4">ForzaBuilt</h3>
                    <p class="text-gray-300">Innovative adhesive solutions for industrial applications.</p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Products</h4>
                    <ul class="space-y-2 text-gray-300">
                        <li><a href="/products/bond" class="hover:text-white">Bond</a></li>
                        <li><a href="/products/seal" class="hover:text-white">Seal</a></li>
                        <li><a href="/products/tape" class="hover:text-white">Tape</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Industries</h4>
                    <ul class="space-y-2 text-gray-300">
                        <li><a href="/industries/construction" class="hover:text-white">Construction</a></li>
                        <li><a href="/industries/marine" class="hover:text-white">Marine</a></li>
                        <li><a href="/industries/transportation" class="hover:text-white">Transportation</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Contact</h4>
                    <ul class="space-y-2 text-gray-300">
                        <li><a href="/contact" class="hover:text-white">Contact Us</a></li>
                        <li><a href="/blog" class="hover:text-white">Blog</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                <p>&copy; 2024 ForzaBuilt. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>`;
};

// Generate pages for each blog post
let generatedPages = 0;
blogPosts.forEach(post => {
  try {
    const htmlContent = generateBlogPageHTML(post);
    const filePath = path.join(blogPagesDir, `${post.id}.html`);
    fs.writeFileSync(filePath, htmlContent);
    generatedPages++;
    console.log(`✅ Generated: ${post.id}.html`);
  } catch (error) {
    console.error(`❌ Error generating ${post.id}.html:`, error.message);
  }
});

// Generate index page for the blog directory
const generateBlogIndexHTML = () => {
  const recentPosts = blogPosts.slice(0, 6); // Show 6 most recent posts
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog | ForzaBuilt Learning Center</title>
    <meta name="description" content="Discover expert insights, technical guides, and industry knowledge about adhesives and industrial applications from ForzaBuilt.">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#1b3764',
                        accent: '#F2611D'
                    },
                    fontFamily: {
                        'kallisto': ['Kallisto', 'sans-serif']
                    }
                }
            }
        }
    </script>
    
    <!-- Custom Styles -->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .font-kallisto { font-family: 'Kallisto', 'Inter', sans-serif; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <header class="bg-primary text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-6">
                <div class="flex items-center">
                    <a href="/" class="text-2xl font-bold font-kallisto">ForzaBuilt</a>
                </div>
                <nav class="hidden md:flex space-x-8">
                    <a href="/" class="hover:text-accent transition-colors">Home</a>
                    <a href="/products" class="hover:text-accent transition-colors">Products</a>
                    <a href="/industries" class="hover:text-accent transition-colors">Industries</a>
                    <a href="/blog" class="hover:text-accent transition-colors">Blog</a>
                    <a href="/contact" class="hover:text-accent transition-colors">Contact</a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="relative py-16 sm:py-24 md:py-32 lg:py-40 xl:py-48 bg-primary">
        <div class="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/80"></div>
        <div class="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-20">
            <div class="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
                <div class="max-w-6xl mx-auto space-y-8">
                    <h1 class="font-black text-white font-kallisto text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-none break-words">
                        LEARNING CENTER
                    </h1>
                    <p class="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                        Products, Tips, Tutorials, and More!
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Recent Posts -->
    <section class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Recent Articles</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${recentPosts.map(post => `
                <article class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                    <div class="aspect-[16/9] bg-gray-200 overflow-hidden">
                        <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
                    </div>
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-xs font-medium text-accent uppercase tracking-wide bg-accent/10 px-2 py-1 rounded-full">
                                ${post.category}
                            </span>
                            <span class="text-xs text-gray-500">
                                ${new Date(post.date).toLocaleDateString()}
                            </span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                            ${post.title}
                        </h3>
                        <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                            ${post.excerpt}
                        </p>
                        <div class="flex items-center justify-center">
                            <a href="/blog/${post.id}.html" class="inline-flex items-center text-accent font-medium text-sm hover:text-accent/80 transition-colors group-hover:translate-x-1">
                                Read Full Article
                                <svg class="ml-2 w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </article>
                `).join('')}
            </div>
            <div class="text-center mt-12">
                <a href="/blog" class="inline-flex items-center px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent/80 transition-colors">
                    View All Articles
                    <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-primary text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-lg font-bold mb-4">ForzaBuilt</h3>
                    <p class="text-gray-300">Innovative adhesive solutions for industrial applications.</p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Products</h4>
                    <ul class="space-y-2 text-gray-300">
                        <li><a href="/products/bond" class="hover:text-white">Bond</a></li>
                        <li><a href="/products/seal" class="hover:text-white">Seal</a></li>
                        <li><a href="/products/tape" class="hover:text-white">Tape</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Industries</h4>
                    <ul class="space-y-2 text-gray-300">
                        <li><a href="/industries/construction" class="hover:text-white">Construction</a></li>
                        <li><a href="/industries/marine" class="hover:text-white">Marine</a></li>
                        <li><a href="/industries/transportation" class="hover:text-white">Transportation</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Contact</h4>
                    <ul class="space-y-2 text-gray-300">
                        <li><a href="/contact" class="hover:text-white">Contact Us</a></li>
                        <li><a href="/blog" class="hover:text-white">Blog</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                <p>&copy; 2024 ForzaBuilt. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>`;
};

// Generate the blog index page
try {
  const indexHTML = generateBlogIndexHTML();
  const indexPath = path.join(blogPagesDir, 'index.html');
  fs.writeFileSync(indexPath, indexHTML);
  console.log(`✅ Generated: index.html`);
  generatedPages++;
} catch (error) {
  console.error(`❌ Error generating index.html:`, error.message);
}

console.log(`\n🎉 Static blog page generation complete!`);
console.log(`📊 Summary:`);
console.log(`   • ${generatedPages} pages generated`);
console.log(`   • ${blogPosts.length} blog posts`);
console.log(`   • 1 index page`);
console.log(`   • Location: public/blog/`);

console.log(`\n🔗 Generated URLs:`);
blogPosts.forEach(post => {
  console.log(`   • https://forzabuilt.com/blog/${post.id}.html`);
});
console.log(`   • https://forzabuilt.com/blog/index.html`);

console.log(`\n📝 Next steps:`);
console.log(`   1. Deploy the generated HTML files`);
console.log(`   2. Update your web server to serve these static files`);
console.log(`   3. Submit the new URLs to search engines`);
console.log(`   4. Monitor indexing progress in Google Search Console`);
