import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const datasheetPath = path.join(__dirname, '../src/data/industrialDatasheet.ts');
const content = fs.readFileSync(datasheetPath, 'utf8');

// List of products that should be construction (from user)
const constructionProductIds = [
  'cc501',
  'cc507',
  'cc513',
  'cc515',
  'cc519',
  'cc503-aa',
  'c-c360',
  'c-c551',
  'c-oa98',
  'c-os55',
  'c-r329',
  'c-r552',
  'c-r560',
  'c-oa5',
  'c-oa52',
  'c-osa',
  'c-oa77',
  'c-s538',
  'c-w6106',
  'c-os9',
  'c-t500',
  'c-t550',
  'c-t553',
  'c-t557',
  'c-t564',
  'c-t731',
  'c-t5100'
];

function updateConstructionProducts(content) {
  // First, change all current 'construction' products to 'composites' as default
  let updatedContent = content.replace(
    /industry: 'construction',/g,
    "industry: 'composites',"
  );

  // Then, set the specific construction products back to 'construction'
  constructionProductIds.forEach(productId => {
    const regex = new RegExp(`id: '${productId}',[\\s\\S]*?industry: '[^']*',`, 'g');
    updatedContent = updatedContent.replace(regex, (match) => {
      return match.replace(/industry: '[^']*',/, "industry: 'construction',");
    });
  });

  return updatedContent;
}

const updatedContent = updateConstructionProducts(content);
fs.writeFileSync(datasheetPath, updatedContent, 'utf8');

console.log('Updated construction products. Only the following products are now marked as construction:');
constructionProductIds.forEach(id => console.log(`- ${id}`));
console.log('\nAll other products have been changed to composites as default.'); 