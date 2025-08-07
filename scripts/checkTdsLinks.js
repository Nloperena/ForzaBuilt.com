const fs = require('fs');
const path = require('path');

// Path to the CSV file
const csvPath = 'product_detailed_export.csv';

// Read the CSV file
console.log(`Reading CSV file: ${csvPath}`);
const csvData = fs.readFileSync(csvPath, 'utf8');
console.log(`CSV file size: ${csvData.length} bytes`);

// Split into lines
const lines = csvData.split('\n');
console.log(`Found ${lines.length} lines in CSV`);

// Process header
const header = lines[0].split(',');
const pdfLinksIndex = header.findIndex(h => h.includes('PDF Links'));
const idIndex = header.findIndex(h => h.includes('ID'));
const nameIndex = header.findIndex(h => h.includes('Name'));
const industryIndex = header.findIndex(h => h.includes('Industry'));

console.log(`Column indices - ID: ${idIndex}, Name: ${nameIndex}, PDF Links: ${pdfLinksIndex}, Industry: ${industryIndex}`);

// Process products
let withTds = 0;
let withoutTds = 0;
const missingTds = [];

// Simple CSV parsing (not handling quoted fields properly)
for (let i = 1; i < lines.length; i++) {
  if (!lines[i].trim()) continue;
  
  const parts = lines[i].split(',');
  if (parts.length <= pdfLinksIndex) continue;
  
  const id = parts[idIndex].replace(/"/g, '');
  const name = parts[nameIndex].replace(/"/g, '');
  const pdfLinks = parts[pdfLinksIndex].replace(/"/g, '');
  const industry = parts[industryIndex]?.replace(/"/g, '') || '';
  
  if (pdfLinks && pdfLinks.includes('/TDS/')) {
    withTds++;
  } else {
    withoutTds++;
    missingTds.push({ id, name, industry });
  }
}

console.log(`\nProducts with TDS links: ${withTds}`);
console.log(`Products without TDS links: ${withoutTds}`);

if (missingTds.length > 0) {
  console.log('\nProducts missing TDS links:');
  missingTds.forEach(p => {
    console.log(`- ${p.id} (${p.industry}): ${p.name}`);
  });
}