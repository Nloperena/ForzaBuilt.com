#!/usr/bin/env node
/**
 * Compare the scraped WordPress product pages with the product data currently
 * used by the website (src/data/industrialDatasheet.ts).
 *
 * Usage:
 *   node scripts/compareScrapedWithSite.js
 *
 * It creates/overwrites `src/data/compareResults.json` containing an array
 * of mismatches plus console stats.
 */

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

// Utility: obtain absolute paths helper
const r = (...p) => path.join(__dirname, ...p);

// ---------------------------------------------------------------------------
// 1. Load industrialDatasheet from the TypeScript source file by transpiling
// ---------------------------------------------------------------------------
const industrialPath = r('..', 'src', 'data', 'industrialDatasheet.ts');
if (!fs.existsSync(industrialPath)) {
  console.error(`❌ Cannot find industrialDatasheet.ts at ${industrialPath}`);
  process.exit(1);
}

const industrialSource = fs.readFileSync(industrialPath, 'utf8');
const transpiled = ts.transpileModule(industrialSource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 },
});

// Evaluate the transpiled JS in a CommonJS-like sandbox
const exportsObj = {};
const moduleObj = { exports: exportsObj };
const sandboxFunc = new Function('exports', 'require', 'module', '__filename', '__dirname', transpiled.outputText);
sandboxFunc(exportsObj, require, moduleObj, industrialPath, path.dirname(industrialPath));

const industrialDatasheet = moduleObj.exports.industrialDatasheet;
if (!Array.isArray(industrialDatasheet)) {
  console.error('❌ Failed to load industrialDatasheet array from TS file.');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// 2. Load scraped products from combined JSON file
// ---------------------------------------------------------------------------
const scrapedDir = r('..', 'src', 'data', 'scrapedProducts');
const combinedJson = path.join(scrapedDir, 'allProducts.json');

if (!fs.existsSync(combinedJson)) {
  console.error('❌ No scraped product data found. Expected file:');
  console.error(`   ${combinedJson}`);
  console.error('   Run `node scripts/scrapeProductPages.js` first.');
  process.exit(1);
}

let scrapedArray;
try {
  scrapedArray = JSON.parse(fs.readFileSync(combinedJson, 'utf8'));
} catch (err) {
  console.error('❌ Failed to parse scraped products JSON:', err.message);
  process.exit(1);
}

const scrapedMap = new Map(scrapedArray.map((p) => [p.id, p]));

// ---------------------------------------------------------------------------
// 3. Compare products
// ---------------------------------------------------------------------------
const normalize = (v) => (v || '').toString().replace(/\s+/g, ' ').trim();
const diffs = [];

for (const siteProd of industrialDatasheet) {
  const scraped = scrapedMap.get(siteProd.id);

  if (!scraped) {
    diffs.push({ id: siteProd.id, issue: 'missing-in-scraped-data' });
    continue;
  }

  const diff = { id: siteProd.id };

  if (normalize(siteProd.name) !== normalize(scraped.title)) {
    diff.name = { site: siteProd.name, scraped: scraped.title };
  }

  if (normalize(siteProd.description) !== normalize(scraped.description)) {
    diff.description = {
      site: siteProd.description,
      scraped: scraped.description,
    };
  }

  if (siteProd.image && normalize(siteProd.image) !== normalize(scraped.mainImage)) {
    diff.mainImage = {
      site: siteProd.image,
      scraped: scraped.mainImage,
    };
  }

  if (Object.keys(diff).length > 1) {
    diffs.push(diff);
  }
}

// ---------------------------------------------------------------------------
// 4. Save results & summary
// ---------------------------------------------------------------------------
const outPath = r('..', 'src', 'data', 'compareResults.json');
fs.writeFileSync(outPath, JSON.stringify(diffs, null, 2));

console.log('\n✔ Comparison complete.');
console.log(`• Products checked : ${industrialDatasheet.length}`);
console.log(`• Mismatches found : ${diffs.length}`);
console.log(`• Report saved to  : ${path.relative(process.cwd(), outPath)}\n`);
