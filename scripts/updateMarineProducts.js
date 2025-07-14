import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const datasheetPath = path.join(__dirname, '../src/data/industrialDatasheet.ts');
const content = fs.readFileSync(datasheetPath, 'utf8');

// List of products that should be marine (from user)
const marineProductIds = [
  'tac-734g',
  'tac-735r',
  'tac-738r',
  'tac-739r',
  'mc722',
  'mc723',
  'mc724',
  'mc737',
  'mc741',
  'm-os764',
  'm-oa755',
  'm-r420',
  'm-r445',
  'm-osa783',
  'm-s750',
  'm-c280',
  'm-c285',
  'm-os789',
  'm-os796',
  'm-t815',
  'm-t820'
];

function updateMarineProducts(content) {
  // First, change all current 'marine' products to 'construction' as default
  let updatedContent = content.replace(
    /industry: 'marine',/g,
    "industry: 'construction',"
  );

  // Then, set the specific marine products back to 'marine'
  marineProductIds.forEach(productId => {
    const regex = new RegExp(`id: '${productId}',[\\s\\S]*?industry: '[^']*',`, 'g');
    updatedContent = updatedContent.replace(regex, (match) => {
      return match.replace(/industry: '[^']*',/, "industry: 'marine',");
    });
  });

  return updatedContent;
}

const updatedContent = updateMarineProducts(content);
fs.writeFileSync(datasheetPath, updatedContent, 'utf8');

console.log('Updated marine products. Only the following products are now marked as marine:');
marineProductIds.forEach(id => console.log(`- ${id}`));
console.log('\nAll other products have been changed to construction as default.'); 