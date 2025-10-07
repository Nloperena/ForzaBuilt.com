const fs = require('fs');
const path = require('path');

const organizedPath = path.join(__dirname, '..', 'src', 'data', 'forza_products_organized.json');
const simplifiedPath = path.join(__dirname, '..', 'public', 'productsSimplified.json');

if (!fs.existsSync(organizedPath)) {
  console.error('Organized JSON not found:', organizedPath);
  process.exit(1);
}
if (!fs.existsSync(simplifiedPath)) {
  console.error('productsSimplified.json not found:', simplifiedPath);
  process.exit(1);
}

const organized = JSON.parse(fs.readFileSync(organizedPath, 'utf8'));
const simplified = JSON.parse(fs.readFileSync(simplifiedPath, 'utf8'));

const products = simplified.products || [];

// Build a map for quick lookup by lowercase id
const idToProduct = new Map(products.map(p => [String(p.id).toLowerCase(), p]));

function normalizeId(id) {
  return String(id || '').trim().toLowerCase();
}

function setNested(obj, pathKeys, value) {
  let node = obj;
  for (let i = 0; i < pathKeys.length - 1; i++) {
    const key = pathKeys[i];
    if (node[key] == null || typeof node[key] !== 'object') node[key] = {};
    node = node[key];
  }
  node[pathKeys[pathKeys.length - 1]] = value;
}

const TECH_MAP = new Map([
  ['appearance', 'appearance'],
  ['shelf life', 'shelfLife'],
  ['shelf-life', 'shelfLife'],
  ['solids', 'solids'],
  ['solvent', 'solvent'],
  ['voc', 'voc'],
  ['cov', 'voc'],
  ['viscosity', 'viscosity'],
  ['density', 'density'],
  ['weight', 'density'],
  ['ph', 'pH'],
  ['color', 'color'],
  ['odor', 'odor'],
  ['storage conditions', 'storageConditions'],
  ['temperature range', 'temperatureRange']
]);

let updatedCount = 0;

function maybeUpdateProduct(p, updates) {
  let changed = false;
  if (updates.benefits && Array.isArray(updates.benefits) && updates.benefits.length) {
    p.benefits = updates.benefits;
    changed = true;
  }
  if (updates.sizing && Array.isArray(updates.sizing) && updates.sizing.length) {
    p.sizing = updates.sizing;
    if (!Array.isArray(p.sizes) || p.sizes.length === 0) {
      p.sizes = [...updates.sizing];
    }
    const existingPackaging = (p.specifications && p.specifications.packaging) || [];
    if (!Array.isArray(existingPackaging) || existingPackaging.length === 0) {
      setNested(p, ['specifications', 'packaging'], [...updates.sizing]);
    }
    changed = true;
  }
  if (updates.applications && Array.isArray(updates.applications) && updates.applications.length) {
    setNested(p, ['specifications', 'applications'], updates.applications);
    changed = true;
  }
  if (updates.technical && Array.isArray(updates.technical) && updates.technical.length) {
    const techData = p.technicalData || {};
    for (const entry of updates.technical) {
      if (!entry || typeof entry !== 'object') continue;
      const rawProp = String(entry.property || '').toLowerCase().trim();
      const key = TECH_MAP.get(rawProp);
      const val = entry.value != null ? String(entry.value) : '';
      if (key && val) techData[key] = val;
    }
    if (Object.keys(techData).length) {
      p.technicalData = techData;
      changed = true;
    }
  }
  if (updates.image && typeof updates.image === 'string' && updates.image.startsWith('/product-images/')) {
    if (p.imageUrl !== updates.image) {
      p.imageUrl = updates.image;
      changed = true;
    }
  }
  if (changed) updatedCount++;
}

function walk(node) {
  if (Array.isArray(node)) {
    for (const item of node) walk(item);
    return;
  }
  if (node && typeof node === 'object') {
    // Consider as product if it has product_id
    if ('product_id' in node) {
      const id = normalizeId(node.product_id);
      const target = idToProduct.get(id);
      if (target) {
        maybeUpdateProduct(target, node);
      }
    }
    // Recursively walk
    for (const value of Object.values(node)) walk(value);
  }
}

walk(organized);

fs.writeFileSync(simplifiedPath, JSON.stringify(simplified, null, 2));
console.log(`Enriched productsSimplified.json with ${updatedCount} updates.`);

