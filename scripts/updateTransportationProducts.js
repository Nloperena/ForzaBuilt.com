import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const datasheetPath = path.join(__dirname, '../src/data/industrialDatasheet.ts');
const content = fs.readFileSync(datasheetPath, 'utf8');

// List of products that should be transportation (from user)
const transportationProductIds = [
  'tc452',
  'tc453',
  'tc454',
  'tc456',
  'tc466',
  'tc467',
  't-osa155',
  't-oa152',
  't-s596',
  't-r679',
  't-r785',
  't-oa156',
  't-oa177',
  't-c222',
  't-c225',
  't-c485',
  't-os150',
  't-os151',
  't-os164',
  't-t415',
  't-t420',
  't-t1200',
  't-t1420',
  't-t430'
];

function updateTransportationProducts(content) {
  // First, change all current 'transportation' products to 'construction' as default
  let updatedContent = content.replace(
    /industry: 'transportation',/g,
    "industry: 'construction',"
  );

  // Then, set the specific transportation products back to 'transportation'
  transportationProductIds.forEach(productId => {
    const regex = new RegExp(`id: '${productId}',[\\s\\S]*?industry: '[^']*',`, 'g');
    updatedContent = updatedContent.replace(regex, (match) => {
      return match.replace(/industry: '[^']*',/, "industry: 'transportation',");
    });
  });

  return updatedContent;
}

const updatedContent = updateTransportationProducts(content);
fs.writeFileSync(datasheetPath, updatedContent, 'utf8');

console.log('Updated transportation products. Only the following products are now marked as transportation:');
transportationProductIds.forEach(id => console.log(`- ${id}`));
console.log('\nAll other products have been changed to construction as default.'); 