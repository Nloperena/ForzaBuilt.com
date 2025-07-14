import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const datasheetPath = path.join(__dirname, '../src/data/industrialDatasheet.ts');
const content = fs.readFileSync(datasheetPath, 'utf8');

// Replace industry: [ ... ] with industry: 'firstValue'
const fixedContent = content.replace(/industry: \[([^\]]+)\]/g, (match, group) => {
  const first = group.split(',')[0].trim().replace(/'/g, '');
  return `industry: '${first}'`;
});

// Update the interface to use string
const finalContent = fixedContent.replace(
  /industry: string\[];/,
  'industry: string; // Now a single string'
);

fs.writeFileSync(datasheetPath, finalContent, 'utf8');
console.log('All industries fixed to single string (first value in array).'); 