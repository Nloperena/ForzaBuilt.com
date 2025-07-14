import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const datasheetPath = path.join(__dirname, '../src/data/industrialDatasheet.ts');
const content = fs.readFileSync(datasheetPath, 'utf8');

// List of products that should be insulation (from user)
const insulationProductIds = [
  'rc826',
  'rc862',
  'rc863',
  'rc864',
  'rc886',
  'rc887',
  'r-c661',
  'r-r820',
  'r-a2000',
  'r-osa',
  'r-os8',
  'r-os84',
  'r-t600',
  'r-t620',
  'r-t860'
];

function updateInsulationProducts(content) {
  // First, change all current 'insulation' products to 'foam' as default
  let updatedContent = content.replace(
    /industry: 'insulation',/g,
    "industry: 'foam',"
  );

  // Then, set the specific insulation products back to 'insulation'
  insulationProductIds.forEach(productId => {
    const regex = new RegExp(`id: '${productId}',[\\s\\S]*?industry: '[^']*',`, 'g');
    updatedContent = updatedContent.replace(regex, (match) => {
      return match.replace(/industry: '[^']*',/, "industry: 'insulation',");
    });
  });

  return updatedContent;
}

const updatedContent = updateInsulationProducts(content);
fs.writeFileSync(datasheetPath, updatedContent, 'utf8');

console.log('Updated insulation products. Only the following products are now marked as insulation:');
insulationProductIds.forEach(id => console.log(`- ${id}`));
console.log('\nAll other products have been changed to foam as default.'); 