const fs = require('fs');
const path = require('path');

// Read the scraped products with WordPress image URLs
const importFile = path.join(__dirname, '../src/data/scrapedProducts/backend-import.json');
const products = JSON.parse(fs.readFileSync(importFile, 'utf8'));

console.log('Generating database update statements for WordPress images...\n');

const updates = [];

products.forEach(product => {
  if (product.image && product.image.includes('forzabuilt.com')) {
    updates.push({
      product_id: product.product_id,
      image: product.image
    });
  }
});

// Generate SQL UPDATE statements
console.log('=== SQL UPDATE STATEMENTS ===\n');
updates.forEach(u => {
  console.log(`UPDATE products SET image = '${u.image}' WHERE product_id = '${u.product_id}';`);
});

// Save to file
const sqlFile = path.join(__dirname, '../src/data/scrapedProducts/update-images.sql');
const sqlStatements = updates.map(u => 
  `UPDATE products SET image = '${u.image}' WHERE product_id = '${u.product_id}';`
).join('\n');

fs.writeFileSync(sqlFile, sqlStatements);

console.log(`\n✅ SQL file saved: ${sqlFile}`);
console.log(`   Total updates: ${updates.length}`);
console.log('\n📌 Run these SQL statements in your Heroku database to use WordPress images temporarily');

























