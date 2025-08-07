# Static Site Generation for SEO

This project now includes static site generation to improve SEO and social media sharing for product pages.

## How It Works

### 1. Static Page Generation
- **Script**: `scripts/generateStaticPages.js`
- **Trigger**: Runs automatically during `npm run build`
- **Output**: Creates static HTML files in `public/static-pages/`

### 2. What Gets Generated
- **Product Pages**: One HTML file per product (145 total)
- **Category Pages**: One HTML file per category (3 total)
- **Location**: `public/static-pages/products/{category}/{productId}.html`

### 3. Meta Tags Included
Each static page includes:
- **Title**: Product name + "ForzaBuilt"
- **Description**: Product description
- **Open Graph**: Facebook/LinkedIn sharing
- **Twitter Cards**: Twitter sharing
- **Canonical URL**: SEO best practice
- **Structured Data**: JSON-LD for search engines

### 4. Sitemap Generation
- **Script**: `scripts/generateSitemap.js`
- **Output**: `public/sitemap.xml`
- **Includes**: All pages with proper priorities and change frequencies

### 5. Robots.txt
- **File**: `public/robots.txt`
- **Purpose**: Guides search engine crawlers
- **Features**: Sitemap reference, admin area exclusions

## Usage

### Manual Generation
```bash
# Generate static pages only
npm run generate-static

# Generate sitemap only
npm run generate-sitemap

# Generate both (during build)
npm run build
```

### Build Process
The build process now automatically:
1. Generates static HTML pages for all products
2. Creates XML sitemap
3. Builds the React application

## File Structure
```
public/
├── static-pages/
│   └── products/
│       ├── bond/
│       │   ├── tac-734g.html
│       │   ├── tac-735r.html
│       │   └── ...
│       ├── seal/
│       │   └── ...
│       └── tape/
│           └── ...
├── sitemap.xml
└── robots.txt
```

## SEO Benefits

### 1. Social Media Sharing
When someone shares a product link on social media, the static HTML provides:
- Proper title and description
- Product image
- Branded appearance

### 2. Search Engine Optimization
- **Crawlable**: Search engines can easily find and index all pages
- **Structured Data**: Rich snippets in search results
- **Sitemap**: Helps search engines discover all pages
- **Canonical URLs**: Prevents duplicate content issues

### 3. Performance
- **Fast Loading**: Static HTML loads instantly
- **Redirect**: Users are quickly redirected to the React app
- **SEO Crawlers**: Get full meta information immediately

## Example Static Page
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>TAC-734G – WEB SPRAY HIGH TACK INFUSION MOLDING ADHESIVE - ForzaBuilt</title>
    <meta name="description" content="ForzaBOND™ TAC-734G is a web spray adhesive tackifier..." />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="product" />
    <meta property="og:url" content="https://forzabuilt.com/products/bond/tac-734g" />
    <meta property="og:title" content="TAC-734G – WEB SPRAY HIGH TACK INFUSION MOLDING ADHESIVE - ForzaBuilt" />
    <meta property="og:description" content="ForzaBOND™ TAC-734G is a web spray adhesive tackifier..." />
    <meta property="og:image" content="https://forzabuilt.com/product-images/oa23.png" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://forzabuilt.com/products/bond/tac-734g" />
    <meta property="twitter:title" content="TAC-734G – WEB SPRAY HIGH TACK INFUSION MOLDING ADHESIVE - ForzaBuilt" />
    <meta property="twitter:description" content="ForzaBOND™ TAC-734G is a web spray adhesive tackifier..." />
    <meta property="twitter:image" content="https://forzabuilt.com/product-images/oa23.png" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://forzabuilt.com/products/bond/tac-734g" />
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "TAC-734G – WEB SPRAY HIGH TACK INFUSION MOLDING ADHESIVE",
      "description": "ForzaBOND™ TAC-734G is a web spray adhesive tackifier...",
      "image": "https://forzabuilt.com/product-images/oa23.png",
      "url": "https://forzabuilt.com/products/bond/tac-734g",
      "brand": {
        "@type": "Brand",
        "name": "ForzaBuilt"
      },
      "category": "BOND",
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Chemistry",
          "value": "Water Base"
        }
      ]
    }
    </script>
    
    <!-- Redirect to main app -->
    <meta http-equiv="refresh" content="0;url=/products/bond/tac-734g" />
</head>
<body>
    <p>Redirecting to <a href="/products/bond/tac-734g">/products/bond/tac-734g</a>...</p>
</body>
</html>
```

## Future Enhancements

### Contentful Integration
When ready to integrate with Contentful:
1. Replace JSON data source with Contentful API
2. Update generation scripts to fetch from Contentful
3. Add dynamic page generation for CMS content
4. Implement incremental builds for content updates

### Advanced Features
- **Image Optimization**: Automatic image resizing and optimization
- **CDN Integration**: Serve static pages from CDN
- **Caching**: Implement proper cache headers
- **Analytics**: Track static page performance

## Troubleshooting

### Common Issues
1. **Build Fails**: Check that `public/productsSimplified.json` exists
2. **Missing Images**: Ensure product images are in `public/product-images/`
3. **Meta Tags Not Working**: Verify URLs are correct in generation script

### Testing
- **Local Testing**: Use `npm run preview` to test built site
- **Meta Tag Testing**: Use Facebook Sharing Debugger or Twitter Card Validator
- **SEO Testing**: Use Google Search Console to monitor indexing
