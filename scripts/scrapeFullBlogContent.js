const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

console.log('🚀 Starting full blog content scraping (WordPress before-share extraction)\n');

// Load existing blog posts
const blogPostsPath = path.join(__dirname, '../src/data/blogPosts.json');
const blogPosts = JSON.parse(fs.readFileSync(blogPostsPath, 'utf8'));

console.log(`📊 Found ${blogPosts.length} blog posts to scrape`);

// Fetch HTML content from URL
async function fetchHTML(url) {
  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0 Safari/537.36'
    },
    timeout: 20000,
    validateStatus: () => true,
  });
  if (response.status >= 400) {
    throw new Error(`HTTP ${response.status} fetching ${url}`);
  }
  return response.data;
}

// Slugify title similar to app logic
function slugifyTitle(title) {
  return String(title)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function fetchFromCandidates(candidates) {
  let lastError = null;
  for (const url of candidates) {
    try {
      const html = await fetchHTML(url);
      return { html, url };
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError || new Error('No candidate URL succeeded');
}

// Remove unwanted attributes and nodes for clean markup
function sanitizeContent($, $root) {
  // Remove style attributes and inline event handlers
  $root.find('*').each((_, el) => {
    const $node = $(el);
    $node.removeAttr('style');
    // Remove event handler attrs like onclick, onmouseover, etc.
    Object.keys(el.attribs || {}).forEach((attr) => {
      if (/^on[a-z]+/i.test(attr)) {
        $node.removeAttr(attr);
      }
    });
  });

  // Remove media and embeds (text-only requirement)
  $root.find('img, picture, figure, iframe, video, svg, noscript').remove();

  // Remove known layout-only elements
  $root.find('form, aside, nav, header, footer').remove();

  // Optionally strip classes that could conflict
  $root.find('*').removeAttr('class');

  return $root;
}

// Determine the main article content container
function findContentContainer($) {
  const selectors = [
    'article .entry-content',
    '.entry-content',
    'article .post-content',
    '.post-content',
    'article .content',
    'main article',
    'article',
    'main .site-main article',
    '#main article',
    // Elementor common wrappers
    '.elementor-post__content',
    '.elementor-widget-theme-post-content',
    '.elementor-widget-container',
    '.single-post .post',
  ];
  for (const sel of selectors) {
    const $node = $(sel).first();
    if ($node && $node.length) return $node;
  }
  // Fallback to body
  return $('body');
}

// Find the share section node inside a container
function findShareNode($) {
  const scope = $('body');
  const candidates = [
    '.elementor-widget-share-buttons',
    '.sharedaddy',
    '.sd-sharing',
    '.jp-sharing',
    '.share-buttons',
    '.post-share',
    '.share',
    '.article-share',
    '.td_block_social_share',
    '.fusion-sharing-box',
    'a[aria-label*="share" i]',
    '[class*="share" i]',
  ];
  for (const sel of candidates) {
    const $node = scope.find(sel).first();
    if ($node && $node.length) return $node;
  }
  return null;
}

// Extract all textual markup before the share section
function extractBeforeShare($, $container) {
  const $share = findShareNode($) || findShareNode($container);
  let $working = $container.clone();

  // Remove sidebars/widgets if nested in container
  $working.find('.sidebar, .widget, .widgets, .navigation, .menu, .recent-posts, .archive, .categories').remove();

  // Prefer collecting previous siblings relative to a suitable ancestor of the share node
  const collectedFragments = [];
  if ($share && $share.length) {
    let current = $share;
    let attempts = 0;
    while (attempts < 6 && current && current.parent() && current.parent().length) {
      const parent = current.parent();
      const siblings = parent.contents().toArray();
      const shareIndex = siblings.findIndex((n) => n === current.get(0));
      if (shareIndex > 0) {
        const prevSiblings = siblings.slice(0, shareIndex);
        // From previous siblings, keep only significant blocks
        prevSiblings.forEach((node) => {
          if (node.type === 'tag') {
            const tag = (node.name || '').toLowerCase();
            if (['section','article','div','h1','h2','h3','p','ul','ol','blockquote','pre','code','table'].includes(tag)) {
              collectedFragments.push($.html(node));
            }
          }
        });
      }
      // If we collected enough text, stop; else climb up
      const textLen = collectedFragments.join('\n').replace(/<[^>]+>/g, '').trim().length;
      if (textLen > 400) break;
      current = parent; // climb
      attempts += 1;
    }
  }

  // Keep only semantic text elements: headings, paragraphs, lists, blockquotes, code/pre, hr, tables
  // Remove other divs/spans that are empty after sanitization
  sanitizeContent($, $working);

  // Remove empty nodes
  // Walk DOM and collect allowed nodes until share
  const allowed = new Set(['h1','h2','h3','h4','h5','h6','p','ul','ol','li','blockquote','code','pre','hr','table','thead','tbody','tr','th','td','em','strong','a']);
  const shareEl = null; // we collected siblings above; no need to trim further here
  let stop = false;
  const fragments = [];

  function walk(node) {
    if (stop || !node) return;
    if (shareEl && node === shareEl) {
      stop = true;
      return;
    }
    if (node.type === 'tag') {
      const tag = (node.name || '').toLowerCase();
      if (allowed.has(tag)) {
        fragments.push($.html(node));
        return; // don't duplicate by walking children; outer HTML captured
      }
    }
    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        walk(child);
        if (stop) break;
      }
    }
  }

  if (collectedFragments.length > 0) {
    // Build a temporary root with collected HTML and sanitize/whitelist again
    const $tmp = cheerio.load(`<div id="_forza_collect_root">${collectedFragments.join('\n')}</div>`, { decodeEntities: false });
    const $root = $tmp('#_forza_collect_root');
    sanitizeContent($tmp, $root);
    $root.find('*').each((_, el) => {
      const tag = (el.name || '').toLowerCase();
      if (!allowed.has(tag)) {
        const $el = $tmp(el);
        const hasAllowedDesc = $el.find(Array.from(allowed).join(',')).length > 0;
        if (hasAllowedDesc) {
          $el.replaceWith($el.contents());
        } else if (!($el.text() || '').trim()) {
          $el.remove();
        }
      }
    });
    const htmlOut = $root.html()?.trim() || '';
    if (htmlOut && htmlOut.replace(/<[^>]+>/g, '').trim().length > 100) {
      return htmlOut;
    }
  }

  // Fallback: walk original working container
  walk($working.get(0));
  return fragments.join('\n').trim();
}

// Scrape a single blog post
async function scrapeBlogPost(post) {
  try {
    console.log(`🔍 Scraping: ${post.title}`);
    const slugFromTitle = slugifyTitle(post.title);
    const base = 'https://forzabuilt.com/blog/';
    const candidates = [
      post.url,
      `${base}${post.id}`,
      `${base}${slugFromTitle}`,
      `${base}${slugFromTitle}/`,
      `${base}${post.id}/`,
    ].filter(Boolean);

    const { html } = await fetchFromCandidates(candidates);
    const $ = cheerio.load(html, { decodeEntities: false, xmlMode: false });
    const $container = findContentContainer($);
    let content = extractBeforeShare($, $container);

    if (!content) {
      // Fallback: use all paragraphs and headings found
      const fragments = [];
      $('h1,h2,h3,h4,h5,h6,p,ul,ol,blockquote,pre,code').each((_, el) => {
        fragments.push($.html(el));
      });
      content = fragments.join('\n');
    }

    // Final safety: ensure we have some content
    if (!content || content.length < 50) {
      content = `<p>Full content for this article is not available. Please visit the <a href="${post.url}" target="_blank" rel="noopener">original article</a>.</p>`;
    }

    post.fullContent = content;
    console.log(`✅ Scraped: ${post.title}`);
    return post;
  } catch (error) {
    console.error(`❌ Error scraping ${post.title}:`, error.message);
    post.fullContent = `<p>Unable to load full content for "${post.title}". Please visit the <a href="${post.url}" target="_blank" rel="noopener">original article</a> for complete information.</p>`;
    return post;
  }
}

// Scrape all blog posts sequentially with delay
async function scrapeAllPosts() {
  const updated = [];
  for (let i = 0; i < blogPosts.length; i += 1) {
    const updatedPost = await scrapeBlogPost(blogPosts[i]);
    updated.push(updatedPost);
    if (i < blogPosts.length - 1) {
      await new Promise((r) => setTimeout(r, 800));
    }
  }
  return updated;
}

// Main
(async function main() {
  try {
    const updatedPosts = await scrapeAllPosts();
    fs.writeFileSync(blogPostsPath, JSON.stringify(updatedPosts, null, 2));
    console.log(`\n🎉 Blog content scraping complete!`);
    console.log(`📊 Summary:`);
    console.log(`   • ${updatedPosts.length} posts processed`);
    const sample = updatedPosts.find(p => p.fullContent);
    if (sample) {
      console.log(`   • Sample: ${sample.title}`);
      console.log(`   • Content length: ${sample.fullContent.length}`);
    }
  } catch (err) {
    console.error('❌ Error during scraping:', err.message);
    process.exitCode = 1;
  }
})();

