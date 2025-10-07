import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsDir = path.join(__dirname, 'public', 'product-images');
const availableFilenames = fs
  .readdirSync(productsDir, { withFileTypes: true })
  .filter(d => d.isFile())
  .map(d => d.name.toLowerCase());
const availableSet = new Set(availableFilenames);

function bestImageForProductId(rawId, brandOrCategory) {
  if (!rawId) return fallbackByBrand(brandOrCategory);
  const id = String(rawId).toLowerCase();

  // 1) Exact filename match
  const exact = `${id}.png`;
  if (availableSet.has(exact)) return `/product-images/${exact}`;

  // 2) Starts with id
  const startsWith = availableFilenames.find(f => f.startsWith(`${id}`));
  if (startsWith) return `/product-images/${startsWith}`;

  // 3) Contains id
  const contains = availableFilenames.find(f => f.includes(id));
  if (contains) return `/product-images/${contains}`;

  // 4) Try removing common prefixes
  const idNoPrefix = id.replace(/^(m-|t-|r-|rc|cc|tc|c-)/, '');
  const exactNoPrefix = `${idNoPrefix}.png`;
  if (availableSet.has(exactNoPrefix)) return `/product-images/${exactNoPrefix}`;
  const startsWithNoPrefix = availableFilenames.find(f => f.startsWith(idNoPrefix));
  if (startsWithNoPrefix) return `/product-images/${startsWithNoPrefix}`;

  // Fallback by brand/category
  return fallbackByBrand(brandOrCategory);
}

function fallbackByBrand(brandOrCategory) {
  const key = String(brandOrCategory || '').toLowerCase();
  if (key.includes('seal')) return '/product-images/os55.png';
  if (key.includes('tape')) return '/product-images/t500.png';
  return '/product-images/oa23.png';
}

function updateProductsSimplified() {
  const jsonPath = path.join(__dirname, 'src/data/productsSimplified.json');
  if (!fs.existsSync(jsonPath)) return { updated: 0, skipped: true };
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  let updated = 0;
  for (const product of data.products || []) {
    const target = bestImageForProductId(product.id, product.category);
    if (product.imageUrl !== target) {
      const from = product.imageUrl;
      product.imageUrl = target;
      updated++;
      console.log(`productsSimplified: ${product.id} -> ${from} => ${target}`);
    }
  }
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  return { updated, skipped: false };
}

function updateOrganizedJson() {
  const jsonPath = path.join(__dirname, 'src/data/forza_products_organized.json');
  if (!fs.existsSync(jsonPath)) return { updated: 0, skipped: true };
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  let updated = 0;

  function updateIfProduct(obj, brandHint) {
    // A product entry in this file has product_id and image fields
    if (obj && typeof obj === 'object' && (obj.product_id || obj.url) && 'image' in obj) {
      const productId = obj.product_id || (typeof obj.url === 'string' ? obj.url.split('/').filter(Boolean).pop() : '');
      const target = bestImageForProductId(productId, obj.brand || brandHint);
      if (obj.image !== target) {
        const from = obj.image;
        obj.image = target;
        updated++;
        console.log(`organized: ${productId} -> ${from} => ${target}`);
      }
    }
  }

  function walk(node, brandHint) {
    if (Array.isArray(node)) {
      for (const item of node) walk(item, brandHint);
      return;
    }
    if (node && typeof node === 'object') {
      updateIfProduct(node, brandHint);
      for (const [k, v] of Object.entries(node)) {
        let nextBrand = brandHint;
        if (k.toLowerCase().includes('forza_bond')) nextBrand = 'BOND';
        if (k.toLowerCase().includes('forza_seal')) nextBrand = 'SEAL';
        if (k.toLowerCase().includes('forza_tape')) nextBrand = 'TAPE';
        walk(v, nextBrand);
      }
    }
  }

  walk(data, undefined);
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  return { updated, skipped: false };
}

const res1 = updateProductsSimplified();
const res2 = updateOrganizedJson();

console.log(`\nproductsSimplified updated: ${res1.updated}${res1.skipped ? ' (skipped: not found)' : ''}`);
console.log(`forza_products_organized updated: ${res2.updated}${res2.skipped ? ' (skipped: not found)' : ''}`);
