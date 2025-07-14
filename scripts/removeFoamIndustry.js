import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const datasheetPath = path.join(__dirname, '../src/data/industrialDatasheet.ts');
const content = fs.readFileSync(datasheetPath, 'utf8');

// Replace all industry: 'foam' with industry: 'construction'
const updatedContent = content.replace(/industry: 'foam',/g, "industry: 'construction',");

fs.writeFileSync(datasheetPath, updatedContent, 'utf8');

console.log('All foam products reassigned to construction.'); 