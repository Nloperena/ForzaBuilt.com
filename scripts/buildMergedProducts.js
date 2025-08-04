#!/usr/bin/env node
/**
 * Build a single merged product list that combines:
 *   • industrialDatasheet (metadata we curate)
 *   • WordPress scrape (content + images)
 *
 * Result is written to   src/data/productsMerged.json
 * Run manually or through an npm script (e.g. "npm run build:data").
 */

const fs   = require('fs');
const path = require('path');
const ts   = require('typescript');

const root = path.join(__dirname, '..');
const r    = (...p) => path.join(root, ...p);

/* --------------------------------------------------
 * 1. Load industrialDatasheet (TypeScript)
 * --------------------------------------------------*/
const industrialPath = r('src', 'data', 'industrialDatasheet.ts');
if (!fs.existsSync(industrialPath)) {
  console.error('❌ Could not find industrialDatasheet.ts');
  process.exit(1);
}
const industrialSrc = fs.readFileSync(industrialPath, 'utf8');
const transpiled    = ts.transpileModule(industrialSrc, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 },
});
const exportsObj = {};
new Function('exports', 'require', 'module', '__filename', '__dirname', transpiled.outputText)(
  exportsObj,
  require,
  { exports: exportsObj },
  industrialPath,
  path.dirname(industrialPath)
);
const industrial = exportsObj.industrialDatasheet;
if (!Array.isArray(industrial)) {
  console.error('❌ Failed to load industrialDatasheet array');
  process.exit(1);
}

/* --------------------------------------------------
 * 2. Load scraped WordPress data
 * --------------------------------------------------*/
const scrapePath = r('src', 'data', 'scrapedProducts', 'allProducts.json');
if (!fs.existsSync(scrapePath)) {
  console.error('❌ Missing scrape data. Run scripts/scrapeProductPages.js first.');
  process.exit(1);
}
const scraped = JSON.parse(fs.readFileSync(scrapePath, 'utf8'));
const scrapedMap = new Map(scraped.map(p => [p.id, p]));

/* --------------------------------------------------
 * 3. Merge records
 *    - industrial props first (category, industry, etc.)
 *    - overlay scraped fields (title, description, images, mainImage, html content)
 *    - keep any fields that are present in only one side
 * --------------------------------------------------*/
const merged = industrial.map(base => ({
  ...base,
  ...(scrapedMap.get(base.id) || {})
}));

/* --------------------------------------------------
 * 4. Save result
 * --------------------------------------------------*/
const outPath = r('src', 'data', 'productsMerged.json');
fs.writeFileSync(outPath, JSON.stringify(merged, null, 2));
console.log(`✔ productsMerged.json written (${merged.length} products)`);
