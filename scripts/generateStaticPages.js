const fs = require('fs');
const path = require('path');

// Read the products data
const productsData = JSON.parse(fs.readFileSync('./public/productsSimplified.json', 'utf8'));

// Base HTML template
const baseHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{TITLE}}</title>
    <meta name="description" content="{{DESCRIPTION}}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="product" />
    <meta property="og:url" content="{{URL}}" />
    <meta property="og:title" content="{{TITLE}}" />
    <meta property="og:description" content="{{DESCRIPTION}}" />
    <meta property="og:image" content="{{IMAGE}}" />
    <meta property="og:site_name" content="ForzaBuilt" />
    <meta property="og:locale" content="en_US" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="{{URL}}" />
    <meta property="twitter:title" content="{{TITLE}}" />
    <meta property="twitter:description" content="{{DESCRIPTION}}" />
    <meta property="twitter:image" content="{{IMAGE}}" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="{{URL}}" />
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "{{PRODUCT_NAME}}",
      "description": "{{DESCRIPTION}}",
      "image": "{{IMAGE}}",
      "url": "{{URL}}",
      "brand": {
        "@type": "Brand",
        "name": "ForzaBuilt"
      },
      "category": "{{CATEGORY}}",
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Chemistry",
          "value": "{{CHEMISTRY}}"
        }
      ]
    }
    </script>
    
    <!-- Redirect to main app -->
    <meta http-equiv="refresh" content="0;url={{REDIRECT_URL}}" />
</head>
<body>
    <p>Redirecting to <a href="{{REDIRECT_URL}}">{{REDIRECT_URL}}</a>...</p>
</body>
</html>`;

// Create static pages directory
const staticPagesDir = './public/static-pages';
if (!fs.existsSync(staticPagesDir)) {
    fs.mkdirSync(staticPagesDir, { recursive: true });
}

// Generate pages for each product
productsData.products.forEach(product => {
    const productId = product.id;
    const category = product.category.toLowerCase();
    
    // Create category directory if it doesn't exist
    const categoryDir = path.join(staticPagesDir, 'products', category);
    if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
    }
    
    // Generate meta tags
    const title = `${product.name} - ForzaBuilt`;
    const description = product.description || 'Premium industrial solution from ForzaBuilt';
    // Use product image if available, otherwise fall back to logo
    const image = product.imageUrl ? `https://forzabuilt.com${product.imageUrl}` : 'https://forzabuilt.com/forza-logo-full.png';
    const url = `https://forzabuilt.com/products/${category}/${productId}`;
    const redirectUrl = `/products/${category}/${productId}`;
    
    // Replace placeholders in template
    let html = baseHTML
        .replace(/{{TITLE}}/g, title)
        .replace(/{{DESCRIPTION}}/g, description)
        .replace(/{{URL}}/g, url)
        .replace(/{{IMAGE}}/g, image)
        .replace(/{{PRODUCT_NAME}}/g, product.name)
        .replace(/{{CATEGORY}}/g, product.category)
        .replace(/{{CHEMISTRY}}/g, product.chemistry || '')
        .replace(/{{REDIRECT_URL}}/g, redirectUrl);
    
    // Write the static HTML file
    const filePath = path.join(categoryDir, `${productId}.html`);
    fs.writeFileSync(filePath, html);
    
    console.log(`Generated: ${filePath}`);
});

// Generate category pages
const categories = [...new Set(productsData.products.map(p => p.category.toLowerCase()))];

categories.forEach(category => {
    const categoryProducts = productsData.products.filter(p => p.category.toLowerCase() === category);
    
    const title = `${category.charAt(0).toUpperCase() + category.slice(1)} Products - ForzaBuilt`;
    const description = `Discover our premium ${category} solutions engineered for performance and reliability across all industries.`;
    const image = 'https://forzabuilt.com/forza-logo-full.png';
    const url = `https://forzabuilt.com/products/${category}`;
    const redirectUrl = `/products/${category}`;
    
    let html = baseHTML
        .replace(/{{TITLE}}/g, title)
        .replace(/{{DESCRIPTION}}/g, description)
        .replace(/{{URL}}/g, url)
        .replace(/{{IMAGE}}/g, image)
        .replace(/{{PRODUCT_NAME}}/g, `${category} Products`)
        .replace(/{{CATEGORY}}/g, category)
        .replace(/{{CHEMISTRY}}/g, '')
        .replace(/{{REDIRECT_URL}}/g, redirectUrl);
    
    const filePath = path.join(staticPagesDir, 'products', `${category}.html`);
    fs.writeFileSync(filePath, html);
    
    console.log(`Generated: ${filePath}`);
});

console.log('✅ Static pages generated successfully!');
console.log(`📁 Generated ${productsData.products.length} product pages`);
console.log(`📁 Generated ${categories.length} category pages`);

