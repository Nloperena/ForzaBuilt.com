const fs = require('fs');
const path = require('path');
const https = require('https');

console.log('🚀 Starting full blog content scraping...\n');

// Load existing blog posts
const blogPostsPath = path.join(__dirname, '../src/data/blogPosts.json');
const blogPosts = JSON.parse(fs.readFileSync(blogPostsPath, 'utf8'));

console.log(`📊 Found ${blogPosts.length} blog posts to scrape`);

// Function to fetch HTML content from URL
const fetchHTML = (url) => {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    https.get(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

// Function to extract content from HTML
const extractContent = (html, postId) => {
  try {
    // Remove script and style tags
    html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    
    // Extract content from common blog containers
    let content = '';
    
    // Try to find article content in various selectors
    const selectors = [
      'article',
      '.post-content',
      '.entry-content',
      '.blog-content',
      '.article-content',
      '.content',
      'main',
      '.post-body'
    ];
    
    for (const selector of selectors) {
      const regex = new RegExp(`<${selector}[^>]*>([\\s\\S]*?)<\\/${selector}>`, 'i');
      const match = html.match(regex);
      if (match && match[1]) {
        content = match[1];
        break;
      }
    }
    
    // If no specific container found, try to extract from body
    if (!content) {
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (bodyMatch && bodyMatch[1]) {
        content = bodyMatch[1];
      }
    }
    
    // Clean up the content
    if (content) {
      // Remove navigation, headers, footers
      content = content.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '');
      content = content.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
      content = content.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
      content = content.replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '');
      
      // Remove common blog elements
      content = content.replace(/<div[^>]*class="[^"]*(?:sidebar|navigation|menu|widget)[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
      content = content.replace(/<div[^>]*id="[^"]*(?:sidebar|navigation|menu|widget)[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
      
      // Clean up extra whitespace
      content = content.replace(/\s+/g, ' ').trim();
      
      // Extract paragraphs, headings, and lists
      const paragraphs = content.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || [];
      const headings = content.match(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi) || [];
      const lists = content.match(/<(?:ul|ol)[^>]*>[\s\S]*?<\/(?:ul|ol)>/gi) || [];
      
      // Combine all content
      const allContent = [...headings, ...paragraphs, ...lists];
      
      if (allContent.length > 0) {
        return allContent.join('\n\n');
      }
    }
    
    // Fallback: return a placeholder with the excerpt
    return `<p>${postId} - Full content not available. Please visit the original article for complete information.</p>`;
    
  } catch (error) {
    console.error(`Error extracting content for ${postId}:`, error.message);
    return `<p>${postId} - Content extraction failed. Please visit the original article.</p>`;
  }
};

// Function to scrape a single blog post
const scrapeBlogPost = async (post) => {
  try {
    console.log(`🔍 Scraping: ${post.title}`);
    
    const html = await fetchHTML(post.url);
    const content = extractContent(html, post.id);
    
    // Add the full content to the post
    post.fullContent = content;
    
    console.log(`✅ Scraped: ${post.title}`);
    return post;
    
  } catch (error) {
    console.error(`❌ Error scraping ${post.title}:`, error.message);
    
    // Add placeholder content
    post.fullContent = `<p>Unable to load full content for "${post.title}". Please visit the <a href="${post.url}" target="_blank">original article</a> for complete information.</p>`;
    
    return post;
  }
};

// Scrape all blog posts
const scrapeAllPosts = async () => {
  const updatedPosts = [];
  
  for (let i = 0; i < blogPosts.length; i++) {
    const post = blogPosts[i];
    const updatedPost = await scrapeBlogPost(post);
    updatedPosts.push(updatedPost);
    
    // Add a small delay to be respectful to the server
    if (i < blogPosts.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return updatedPosts;
};

// Main execution
const main = async () => {
  try {
    const updatedPosts = await scrapeAllPosts();
    
    // Save updated posts with full content
    fs.writeFileSync(blogPostsPath, JSON.stringify(updatedPosts, null, 2));
    
    console.log(`\n🎉 Blog content scraping complete!`);
    console.log(`📊 Summary:`);
    console.log(`   • ${updatedPosts.length} posts processed`);
    console.log(`   • Full content added to blogPosts.json`);
    
    // Generate a sample of the content structure
    console.log(`\n📄 Sample content structure:`);
    const samplePost = updatedPosts[0];
    console.log(`   • Title: ${samplePost.title}`);
    console.log(`   • Content length: ${samplePost.fullContent?.length || 0} characters`);
    console.log(`   • Content preview: ${samplePost.fullContent?.substring(0, 200)}...`);
    
  } catch (error) {
    console.error('❌ Error during scraping:', error.message);
  }
};

// Run the scraper
main();

