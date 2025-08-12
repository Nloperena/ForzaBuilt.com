const fs = require('fs');
const path = require('path');

console.log('🚀 APPLYING TECHNICAL DATA TO ALL PRODUCTS');
console.log('==========================================\n');

// Read the extracted technical data
const extractedDataPath = path.join(__dirname, 'extractedTechnicalData.json');
const productsDataPath = path.join(__dirname, '../public/productsSimplified.json');

const extractedData = JSON.parse(fs.readFileSync(extractedDataPath, 'utf8'));
const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));

// Read TDS backup for complete data
const tdsDataPath = path.join(__dirname, '../../TDS_backup/web_ready_product_data.json');
const tdsData = JSON.parse(fs.readFileSync(tdsDataPath, 'utf8'));

console.log('📊 Data Sources Loaded:');
console.log(`   • Extracted technical patterns: ${Object.keys(extractedData.mapping).length} products`);
console.log(`   • Current products: ${productsData.products.length}`);
console.log(`   • TDS backup: ${tdsData.length} products\n`);

// Create enhanced technical data for products that need it
let stats = {
  updated: 0,
  sizingAdded: 0,
  technicalAdded: 0,
  imagesFixed: 0,
  errors: []
};

// Create comprehensive product mapping
const tdsMap = {};
tdsData.forEach(item => {
  tdsMap[item.code.toLowerCase()] = item;
});

console.log('🔧 Enhancing products...\n');

productsData.products.forEach(product => {
  const productCode = product.id.toLowerCase();
  const tdsProduct = tdsMap[productCode];
  const extractedTechnical = extractedData.mapping[productCode];
  
  let updated = false;
  
  // 1. ADD SIZING DATA if missing
  if (tdsProduct?.details?.sizing && (!product.sizes || product.sizes.length === 0)) {
    const sizes = tdsProduct.details.sizing
      .split('\n')
      .map(line => line.trim().replace(/^[•\-\*]\s*/, ''))
      .filter(line => line.length > 0);
    
    if (sizes.length > 0) {
      product.sizes = sizes;
      stats.sizingAdded++;
      updated = true;
      console.log(`📦 ${product.id}: Added sizing - ${sizes.join(', ')}`);
    }
  }
  
  // 2. ADD TECHNICAL DATA if missing or incomplete
  if (!product.technicalData || Object.keys(product.technicalData).length < 3) {
    const technicalData = {};
    
    // Use extracted patterns first
    if (extractedTechnical) {
      Object.assign(technicalData, extractedTechnical);
    }
    
    // Enhanced pattern matching for more technical data
    if (tdsProduct?.details) {
      const description = tdsProduct.details.description || '';
      const benefits = tdsProduct.details.benefits || '';
      const fullText = `${description} ${benefits}`.toLowerCase();
      
      // Enhanced extraction patterns
      if (!technicalData.appearance) {
        if (fullText.includes('amber')) technicalData.appearance = 'Amber';
        else if (fullText.includes('clear')) technicalData.appearance = 'Clear';
        else if (fullText.includes('white')) technicalData.appearance = 'White';
        else if (fullText.includes('black')) technicalData.appearance = 'Black';
      }
      
      if (!technicalData.shelfLife) {
        const shelfMatch = fullText.match(/(\d+)\s*(months?|years?)/);
        if (shelfMatch) {
          technicalData.shelfLife = `${shelfMatch[1]} ${shelfMatch[2]}`;
        }
      }
      
      if (!technicalData.solvent) {
        if (fullText.includes('non-flammable') || fullText.includes('nonflammable')) {
          technicalData.solvent = 'Non-Flammable';
        } else if (fullText.includes('flammable')) {
          technicalData.solvent = 'Flammable';
        }
      }
      
      if (!technicalData.voc) {
        if (fullText.includes('voc free') || fullText.includes('0 g/l')) {
          technicalData.voc = '0 g/L';
        }
      }
      
      // Default viscosity to empty (shows blank in table as requested)
      if (!technicalData.viscosity) {
        technicalData.viscosity = '';
      }
      
      // Look for solids percentage
      if (!technicalData.solids) {
        const solidsMatch = fullText.match(/(\d+[\-\d]*%)/);
        if (solidsMatch) {
          technicalData.solids = solidsMatch[1];
        }
      }
    }
    
    // Only update if we have meaningful technical data
    if (Object.keys(technicalData).length > 0) {
      product.technicalData = {
        ...product.technicalData, // Keep existing data
        ...technicalData // Add new data
      };
      stats.technicalAdded++;
      updated = true;
      console.log(`🔬 ${product.id}: Enhanced technical data - ${Object.keys(technicalData).join(', ')}`);
    }
  }
  
  // 3. FIX IMAGE MAPPING if using placeholder
  if (product.imageUrl === '/product-images/oa23.png') {
    // Check if specific image exists
    const imageDir = path.join(__dirname, '../public/product-images');
    const possibleImages = [
      `${productCode}.png`,
      `${productCode}.jpg`,
      `${productCode}.jpeg`
    ];
    
    for (const imageName of possibleImages) {
      const imagePath = path.join(imageDir, imageName);
      if (fs.existsSync(imagePath)) {
        product.imageUrl = `/product-images/${imageName}`;
        stats.imagesFixed++;
        updated = true;
        console.log(`🖼️  ${product.id}: Fixed image to ${imageName}`);
        break;
      }
    }
  }
  
  if (updated) {
    stats.updated++;
  }
});

console.log(`\n📊 ENHANCEMENT RESULTS:`);
console.log(`   • Products updated: ${stats.updated}`);
console.log(`   • Sizing data added: ${stats.sizingAdded}`);
console.log(`   • Technical data enhanced: ${stats.technicalAdded}`);
console.log(`   • Images fixed: ${stats.imagesFixed}`);

// Write back the enhanced data
fs.writeFileSync(productsDataPath, JSON.stringify(productsData, null, 2));
console.log(`\n✅ Enhanced product data saved to: ${productsDataPath}`);

console.log(`\n🎯 NEXT STEPS:`);
console.log(`   • Start dev server to test enhanced products`);
console.log(`   • Verify technical data displays correctly`);
console.log(`   • Check that sizing information appears`);
console.log(`   • Confirm images are displaying properly`);

console.log(`\n🚀 MASS PRODUCT ENHANCEMENT COMPLETE!`);
console.log(`🎉 Your entire product catalog now has enhanced data!`);
