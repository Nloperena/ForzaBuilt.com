const fs = require('fs');
const path = require('path');

// Test script to verify X-ray assets are properly integrated
console.log('🔍 Testing X-ray asset integration...\n');

const publicDir = path.join(__dirname, '..', 'public', 'img');
const industries = ['marine', 'construction', 'composites', 'insulation', 'transportation'];

let allAssetsFound = true;

industries.forEach(industry => {
  console.log(`📁 Checking ${industry} assets...`);
  const industryDir = path.join(publicDir, industry);
  
  if (!fs.existsSync(industryDir)) {
    console.log(`❌ Directory not found: ${industryDir}`);
    allAssetsFound = false;
    return;
  }
  
  const files = fs.readdirSync(industryDir);
  const imageFiles = files.filter(file => 
    file.match(/\.(png|jpg|jpeg|svg)$/i) && 
    (file.startsWith('pre-') || file.startsWith('post-') || file.startsWith('overlay-'))
  );
  
  console.log(`  ✅ Found ${imageFiles.length} asset files:`);
  imageFiles.forEach(file => {
    console.log(`    - ${file}`);
  });
  
  if (imageFiles.length === 0) {
    console.log(`  ⚠️  No asset files found in ${industry}`);
    allAssetsFound = false;
  }
  
  console.log('');
});

// Test specific asset paths that should be accessible
const testPaths = [
  '/img/marine/pre-Marine_Boat.png',
  '/img/marine/post-Marine_Exploded_Boat_Graphic.png',
  '/img/marine/overlay-marine-overlay.svg',
  '/img/composites/pre-Composites_Wind_Turbine.png',
  '/img/construction/pre-Construction Commercial Exterior Graphic (1).png',
  '/img/insulation/pre-House Exterior.png',
  '/img/transportation/pre-RV Bus PreX-Ray.png'
];

console.log('🌐 Testing asset accessibility...');
testPaths.forEach(testPath => {
  const fullPath = path.join(__dirname, '..', 'public', testPath);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${testPath}`);
  } else {
    console.log(`❌ ${testPath}`);
    allAssetsFound = false;
  }
});

console.log('\n' + '='.repeat(50));
if (allAssetsFound) {
  console.log('🎉 All X-ray assets are properly integrated!');
  console.log('💡 You can now edit assets in the public/img directories');
  console.log('🔄 Changes will be reflected immediately in your dev environment');
} else {
  console.log('⚠️  Some assets are missing or not properly integrated');
  console.log('🔧 Please check the file paths and try again');
}



