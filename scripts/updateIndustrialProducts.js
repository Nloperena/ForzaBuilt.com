import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const datasheetPath = path.join(__dirname, '../src/data/industrialDatasheet.ts');
const content = fs.readFileSync(datasheetPath, 'utf8');

// List of products that should be industrial (based on user's list)
const industrialProductIds = [
  'ic933',
  'ic934', 
  'ic946',
  'mc739',
  'mc722',
  'c130',
  'c150',
  'c331',
  'frp-rollable',
  'i1000',
  'oa4',
  'oa75',
  'oa99',
  'osa',
  'os24',
  'r160',
  'r221',
  'r519',
  'r529',
  'fc-car',
  's228'
];

// Function to update industry assignments
function updateIndustrialProducts(content) {
  // First, change all current 'industrial' products to 'construction' as default
  let updatedContent = content.replace(
    /industry: 'industrial',/g,
    'industry: \'construction\','
  );
  
  // Then, set the specific industrial products back to 'industrial'
  industrialProductIds.forEach(productId => {
    const regex = new RegExp(`id: '${productId}',[\\s\\S]*?industry: '[^']*',`, 'g');
    updatedContent = updatedContent.replace(regex, (match) => {
      return match.replace(/industry: '[^']*',/, 'industry: \'industrial\',');
    });
  });
  
  return updatedContent;
}

const updatedContent = updateIndustrialProducts(content);
fs.writeFileSync(datasheetPath, updatedContent, 'utf8');

console.log('Updated industrial products. Only the following products are now marked as industrial:');
industrialProductIds.forEach(id => console.log(`- ${id}`));
console.log('\nAll other products have been changed to construction as default.'); 