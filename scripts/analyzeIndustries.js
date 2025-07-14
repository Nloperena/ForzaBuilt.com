// Simple script to analyze industry assignments
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the industrialDatasheet.ts file
const datasheetPath = path.join(__dirname, '../src/data/industrialDatasheet.ts');
const datasheetContent = fs.readFileSync(datasheetPath, 'utf8');

// Extract product data using regex
const productRegex = /{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*category:\s*'([^']+)',\s*industry:\s*\[([^\]]+)\]/g;

const products = [];
let match;

while ((match = productRegex.exec(datasheetContent)) !== null) {
  const [, id, name, category, industriesStr] = match;
  const industries = industriesStr
    .split(',')
    .map(industry => industry.trim().replace(/'/g, ''))
    .filter(industry => industry.length > 0);
  
  products.push({
    id,
    name,
    category,
    industry: industries
  });
}

// Analyze the data
const OFFICIAL_INDUSTRIES = [
  'transportation',
  'marine', 
  'construction',
  'industrial',
  'foam',
  'composites',
  'insulation',
];

const analysis = {
  totalProducts: products.length,
  productsWithMultipleIndustries: 0,
  productsWithSingleIndustry: 0,
  industryCounts: {},
  nonOfficialIndustries: [],
  multipleIndustryExamples: []
};

products.forEach(product => {
  // Count by number of industries
  if (product.industry.length > 1) {
    analysis.productsWithMultipleIndustries++;
    analysis.multipleIndustryExamples.push(product);
  } else {
    analysis.productsWithSingleIndustry++;
  }

  // Count each industry
  product.industry.forEach(industry => {
    analysis.industryCounts[industry] = (analysis.industryCounts[industry] || 0) + 1;
  });
});

// Find non-official industries
Object.keys(analysis.industryCounts).forEach(industry => {
  if (!OFFICIAL_INDUSTRIES.includes(industry)) {
    analysis.nonOfficialIndustries.push(industry);
  }
});

// Print the report
console.log('=== INDUSTRY ASSIGNMENT ANALYSIS ===\n');
console.log(`Total Products: ${analysis.totalProducts}`);
console.log(`Products with Single Industry: ${analysis.productsWithSingleIndustry}`);
console.log(`Products with Multiple Industries: ${analysis.productsWithMultipleIndustries}`);

console.log('\n=== OFFICIAL INDUSTRY COUNTS ===');
OFFICIAL_INDUSTRIES.forEach(industry => {
  const count = analysis.industryCounts[industry] || 0;
  console.log(`${industry}: ${count} products`);
});

if (analysis.nonOfficialIndustries.length > 0) {
  console.log('\n=== NON-OFFICIAL INDUSTRIES FOUND ===');
  analysis.nonOfficialIndustries.forEach(industry => {
    const count = analysis.industryCounts[industry];
    console.log(`${industry}: ${count} products`);
  });
}

console.log('\n=== SAMPLE MULTIPLE INDUSTRY PRODUCTS ===');
analysis.multipleIndustryExamples.slice(0, 15).forEach(product => {
  console.log(`${product.id}: ${product.name}`);
  console.log(`  Industries: [${product.industry.join(', ')}]`);
  console.log(`  Category: ${product.category}`);
  console.log('');
});

if (analysis.multipleIndustryExamples.length > 15) {
  console.log(`... and ${analysis.multipleIndustryExamples.length - 15} more products with multiple industries`);
} 