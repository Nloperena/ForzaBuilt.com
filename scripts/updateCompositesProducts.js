import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const datasheetPath = path.join(__dirname, '../src/data/industrialDatasheet.ts');
const content = fs.readFileSync(datasheetPath, 'utf8');

// List of products that should be composites (from user)
const compositesProductIds = [
  'tac-734g',
  'tac-735r',
  'tac-738r',
  'tac850',
  'tac-r750',
  'tac-r777',
  'tac-os74',
  'tac-os75'
];

function updateCompositesProducts(content) {
  // First, change all current 'composites' products to 'foam' as default
  let updatedContent = content.replace(
    /industry: 'composites',/g,
    "industry: 'foam',"
  );

  // Then, set the specific composites products back to 'composites'
  compositesProductIds.forEach(productId => {
    const regex = new RegExp(`id: '${productId}',[\\s\\S]*?industry: '[^']*',`, 'g');
    updatedContent = updatedContent.replace(regex, (match) => {
      return match.replace(/industry: '[^']*',/, "industry: 'composites',");
    });
  });

  return updatedContent;
}

const updatedContent = updateCompositesProducts(content);
fs.writeFileSync(datasheetPath, updatedContent, 'utf8');

console.log('Updated composites products. Only the following products are now marked as composites:');
compositesProductIds.forEach(id => console.log(`- ${id}`));
console.log('\nAll other products have been changed to foam as default.'); 