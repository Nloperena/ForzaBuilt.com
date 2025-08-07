import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the JSON file
const jsonPath = path.join(__dirname, 'src/data/productsSimplified.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Available images from the product-images directory
const availableImages = [
  't500.png', 't461.png', 'os55.png', 'os45.png', 'ic946--ca-compliant-pressure-sensitive-contact-adhesive.png',
  't970.png', 't950.png', 't900.png', 't715.png', 't600.png', 't464.png', 't350.png', 't305.png',
  't220.png', 't215.png', 't-t430.png', 't-t1420.png', 't-t1200.png', 't-t420.png', 't-t415.png',
  'c-t5100.png', 'c-t731.png', 'c-t564.png', 'c-t557.png', 'c-t553.png', 'c-t550.png', 'c-t500.png',
  'os61-adhesive.png', 'os61.png', 'os37.png', 'os35.png', 'os31.png', 'os25.png', 'os20.png',
  'os10.png', 'os2.png', 'ca2400.png', 'ca1500.png', 'ca1000.png', 'oa23.png', 'oa13.png', 'oa12.png',
  '81-0389.png', 'ic947.png', 'ic932.png', 'r-t860.png', 'r-t620.png', 'r-t600.png', 'r-os84.png',
  'r-os8.png', 'r-osa.png', 'r-a2000.png', 'r-r820.png', 'r-c661.png', 'rc887.png', 'rc886.png',
  'rc864.png', 'rc863.png', 'rc862.png', 'rc826.png', 'tac-os75.png', 'tac-os74.png', 'tac-r777.png',
  'tac-r750.png', 'tac850.png', 't-os164.png', 't-os151.png', 't-os150.png', 'c-os9.png', 't-c485.png',
  't-c225.png', 't-c222.png', 't-oa177.png', 't-oa156.png', 't-r785.png', 't-r679.png', 't-s596.png',
  't-oa152.png', 't-osa155.png', 'tc467.png', 'tc466.png', 'tc456.png', 'tc454.png', 'tc453.png',
  'tc452.png', 'c-w6106.png', 'c-s538.png', 'c-oa77.png', 'c-osa.png', 'c-oa52.png', 'c-oa5.png',
  'c-r560.png', 'c-r552.png', 'c-r329.png', 'c-os55.png', 'c-oa98.png', 'c-c551.png', 'c-c360.png',
  'cc503-aa.png', 'cc519.png'
];

// Product ID to image mapping
const productImageMapping = {
  // FC-CAR (Cleaner) - use a cleaner image
  'fc-car': 'c-t500.png',
  
  // I1000 (Industrial) - use an industrial adhesive image
  'i1000': 'oa23.png',
  
  // MC739 (Marine) - use a marine adhesive image
  'mc739': 'os55.png',
  
  // OA75 (Adhesive) - use oa23.png
  'oa75': 'oa23.png',
  
  // OA99 (Adhesive) - use oa13.png
  'oa99': 'oa13.png',
  
  // OA4 (Adhesive) - use oa12.png
  'oa4': 'oa12.png',
  
  // M-OA755 (Adhesive) - use oa13.png
  'm-oa755': 'oa13.png',
  
  // OS products (Sealants)
  'os55': 'os55.png',
  'os45': 'os45.png',
  'os61': 'os61.png',
  'os37': 'os37.png',
  'os35': 'os35.png',
  'os31': 'os31.png',
  'os25': 'os25.png',
  'os20': 'os20.png',
  'os10': 'os10.png',
  'os2': 'os2.png',
  
  // T products (Tapes)
  't500': 't500.png',
  't461': 't461.png',
  't970': 't970.png',
  't950': 't950.png',
  't900': 't900.png',
  't715': 't715.png',
  't600': 't600.png',
  't464': 't464.png',
  't350': 't350.png',
  't305': 't305.png',
  't220': 't220.png',
  't215': 't215.png',
  
  // C products (Cleaners)
  'c-t5100': 'c-t5100.png',
  'c-t731': 'c-t731.png',
  'c-t564': 'c-t564.png',
  'c-t557': 'c-t557.png',
  'c-t553': 'c-t553.png',
  'c-t550': 'c-t550.png',
  'c-t500': 'c-t500.png',
  'c-os9': 'c-os9.png',
  'c-oa77': 'c-oa77.png',
  'c-oa52': 'c-oa52.png',
  'c-oa5': 'c-oa5.png',
  'c-oa98': 'c-oa98.png',
  'c-r560': 'c-r560.png',
  'c-r552': 'c-r552.png',
  'c-r329': 'c-r329.png',
  'c-os55': 'c-os55.png',
  'c-c551': 'c-c551.png',
  'c-c360': 'c-c360.png',
  'c-w6106': 'c-w6106.png',
  'c-s538': 'c-s538.png',
  
  // R products (RuggedRed)
  'r-t860': 'r-t860.png',
  'r-t620': 'r-t620.png',
  'r-t600': 'r-t600.png',
  'r-os84': 'r-os84.png',
  'r-os8': 'r-os8.png',
  'r-osa': 'r-osa.png',
  'r-a2000': 'r-a2000.png',
  'r-r820': 'r-r820.png',
  'r-c661': 'r-c661.png',
  
  // RC products (RuggedRed Cleaner)
  'rc887': 'rc887.png',
  'rc886': 'rc886.png',
  'rc864': 'rc864.png',
  'rc863': 'rc863.png',
  'rc862': 'rc862.png',
  'rc826': 'rc826.png',
  
  // TAC products (Tape Adhesive)
  'tac-os75': 'tac-os75.png',
  'tac-os74': 'tac-os74.png',
  'tac-r777': 'tac-r777.png',
  'tac-r750': 'tac-r750.png',
  'tac850': 'tac850.png',
  
  // T-OS products (Tape Sealant)
  't-os164': 't-os164.png',
  't-os151': 't-os151.png',
  't-os150': 't-os150.png',
  't-oa177': 't-oa177.png',
  't-oa156': 't-oa156.png',
  't-oa152': 't-oa152.png',
  't-osa155': 't-osa155.png',
  
  // T-C products (Tape Cleaner)
  't-c485': 't-c485.png',
  't-c225': 't-c225.png',
  't-c222': 't-c222.png',
  
  // T-R products (Tape RuggedRed)
  't-r785': 't-r785.png',
  't-r679': 't-r679.png',
  't-s596': 't-s596.png',
  
  // TC products (Tape Cleaner)
  'tc467': 'tc467.png',
  'tc466': 'tc466.png',
  'tc456': 'tc456.png',
  'tc454': 'tc454.png',
  'tc453': 'tc453.png',
  'tc452': 'tc452.png',
  
  // CC products (Cleaner Cleaner)
  'cc503-aa': 'cc503-aa.png',
  'cc519': 'cc519.png',
  
  // Other products
  'ca2400': 'ca2400.png',
  'ca1500': 'ca1500.png',
  'ca1000': 'ca1000.png',
  'oa23': 'oa23.png',
  'oa13': 'oa13.png',
  'oa12': 'oa12.png',
  '81-0389': '81-0389.png',
  'ic947': 'ic947.png',
  'ic932': 'ic932.png',
  'ic946--ca-compliant-pressure-sensitive-contact-adhesive': 'ic946--ca-compliant-pressure-sensitive-contact-adhesive.png'
};

// Update the products
let updatedCount = 0;
data.products.forEach(product => {
  const productId = product.id.toLowerCase();
  const mappedImage = productImageMapping[productId];
  
  if (mappedImage) {
    const oldImageUrl = product.imageUrl;
    product.imageUrl = `/product-images/${mappedImage}`;
    
    if (oldImageUrl !== product.imageUrl) {
      console.log(`Updated ${productId}: ${oldImageUrl} -> ${product.imageUrl}`);
      updatedCount++;
    }
  } else {
    // For products without specific mapping, use a default based on category
    let defaultImage = 'oa23.png'; // Default adhesive image
    
    if (product.category === 'SEAL') {
      defaultImage = 'os55.png';
    } else if (product.category === 'TAPE') {
      defaultImage = 't500.png';
    }
    
    const oldImageUrl = product.imageUrl;
    product.imageUrl = `/product-images/${defaultImage}`;
    
    if (oldImageUrl !== product.imageUrl) {
      console.log(`Updated ${productId} (default): ${oldImageUrl} -> ${product.imageUrl}`);
      updatedCount++;
    }
  }
});

// Write the updated JSON back to file
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
console.log(`\nUpdated ${updatedCount} product image URLs.`);
console.log('JSON file has been updated with correct image paths.');
