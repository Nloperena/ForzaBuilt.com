import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const datasheetPath = path.join(__dirname, '../src/data/industrialDatasheet.ts');
const content = fs.readFileSync(datasheetPath, 'utf8');

// Define reassignment rules for foam products
const reassignmentRules = {
  // FRP products should go to composites
  'frp': 'composites',
  
  // Industrial products should stay industrial
  'i1000': 'industrial',
  'oa4': 'industrial', 
  'oa75': 'industrial',
  'oa99': 'industrial',
  'osa': 'industrial',
  'os24': 'industrial',
  'os84': 'industrial',
  'os8': 'industrial',
  
  // Construction-related products
  'ic932': 'construction',
  'ic933': 'construction',
  'ic934': 'construction',
  'ic946': 'construction',
  'ic947': 'construction',
  'ic948': 'construction',
  'ic949': 'construction',
  'ic950': 'construction',
  'ic951': 'construction',
  'ic952': 'construction',
  'ic953': 'construction',
  'ic954': 'construction',
  'ic955': 'construction',
  'ic956': 'construction',
  'ic957': 'construction',
  'ic958': 'construction',
  'ic959': 'construction',
  'ic960': 'construction',
  'ic961': 'construction',
  'ic962': 'construction',
  'ic963': 'construction',
  'ic964': 'construction',
  'ic965': 'construction',
  'ic966': 'construction',
  'ic967': 'construction',
  'ic968': 'construction',
  'ic969': 'construction',
  'ic970': 'construction',
  'ic971': 'construction',
  'ic972': 'construction',
  'ic973': 'construction',
  'ic974': 'construction',
  'ic975': 'construction',
  'ic976': 'construction',
  'ic977': 'construction',
  'ic978': 'construction',
  'ic979': 'construction',
  'ic980': 'construction',
  'ic981': 'construction',
  'ic982': 'construction',
  'ic983': 'construction',
  'ic984': 'construction',
  'ic985': 'construction',
  'ic986': 'construction',
  'ic987': 'construction',
  'ic988': 'construction',
  'ic989': 'construction',
  'ic990': 'construction',
  'ic991': 'construction',
  'ic992': 'construction',
  'ic993': 'construction',
  'ic994': 'construction',
  'ic995': 'construction',
  'ic996': 'construction',
  'ic997': 'construction',
  'ic998': 'construction',
  'ic999': 'construction',
  
  // Tape products should go to construction
  't600': 'construction',
  't715': 'construction',
  't900': 'construction',
  't950': 'construction',
  't970': 'construction'
};

function reassignFoamProducts(content) {
  let updatedContent = content;
  
  // Apply reassignment rules
  Object.entries(reassignmentRules).forEach(([productId, newIndustry]) => {
    const regex = new RegExp(`id: '${productId}',[\\s\\S]*?industry: '[^']*',`, 'g');
    updatedContent = updatedContent.replace(regex, (match) => {
      return match.replace(/industry: '[^']*',/, `industry: '${newIndustry}',`);
    });
  });
  
  return updatedContent;
}

const updatedContent = reassignFoamProducts(content);
fs.writeFileSync(datasheetPath, updatedContent, 'utf8');

console.log('Reassigned foam products to appropriate industries:');
Object.entries(reassignmentRules).forEach(([productId, newIndustry]) => {
  console.log(`- ${productId}: ${newIndustry}`);
});

// Count remaining foam products
const remainingFoamMatches = updatedContent.match(/industry: 'foam',/g);
const remainingCount = remainingFoamMatches ? remainingFoamMatches.length : 0;
console.log(`\nRemaining foam products: ${remainingCount}`); 