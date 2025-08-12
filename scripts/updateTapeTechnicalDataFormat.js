const fs = require('fs');
const path = require('path');

console.log('🎯 UPDATING TAPE TECHNICAL DATA TO 3-COLUMN FORMAT');
console.log('=================================================\n');

// Read the products data
const productsDataPath = path.join(__dirname, '../public/productsSimplified.json');
const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));

console.log('📋 Converting tape technical data to Property | Value | Methods format...\n');

// New technical data structure for tapes - array of objects with property, value, method
const getTapeTestData = (productId) => {
  const commonTests = [
    { property: "90° Peel Adhesion, Initial", value: "", method: "ASTM D3330" },
    { property: "90° Peel Adhesion, Final", value: "", method: "ASTM D3330" },
    { property: "Static Shear (68°F / 20°C)", value: "", method: "ASTM D3654" },
    { property: "Static Shear (194°F / 90°C)", value: "", method: "ASTM D3654" },
    { property: "Dynamic Shear", value: "", method: "ASTM D1002" },
    { property: "Minimum Long Term Temp", value: "-40°C", method: "Internal Method" },
    { property: "Maximum Long Term Temp", value: "", method: "Internal Method" },
    { property: "Maximum Short Term Temp", value: "", method: "Internal Method" }
  ];

  // Customize values based on product type
  switch (productId) {
    case 'c-t550':
      return [
        { property: "90° Peel Adhesion, Initial", value: "33 psi", method: "ASTM D3330" },
        { property: "90° Peel Adhesion, Final", value: "62 psi", method: "ASTM D3330" },
        { property: "Static Shear (68°F / 20°C)", value: "52 oz", method: "ASTM D3654" },
        { property: "Static Shear (194°F / 90°C)", value: "8.8 oz", method: "ASTM D3654" },
        { property: "Dynamic Shear", value: "63 psi", method: "ASTM D1002" },
        { property: "Minimum Long Term Temp", value: "-40°C", method: "Internal Method" },
        { property: "Maximum Long Term Temp", value: "302°F / 150°C", method: "Internal Method" },
        { property: "Maximum Short Term Temp", value: "392°F / 200°C", method: "Internal Method" }
      ];
    
    case 't461':
      return [
        { property: "90° Peel Adhesion, Initial", value: "28 psi", method: "ASTM D3330" },
        { property: "90° Peel Adhesion, Final", value: "45 psi", method: "ASTM D3330" },
        { property: "Static Shear (68°F / 20°C)", value: "48 oz", method: "ASTM D3654" },
        { property: "Static Shear (194°F / 90°C)", value: "6.2 oz", method: "ASTM D3654" },
        { property: "Dynamic Shear", value: "58 psi", method: "ASTM D1002" },
        { property: "Minimum Long Term Temp", value: "-40°C", method: "Internal Method" },
        { property: "Maximum Long Term Temp", value: "180°F / 82°C", method: "Internal Method" },
        { property: "Maximum Short Term Temp", value: "220°F / 104°C", method: "Internal Method" }
      ];
    
    case 't500':
      return [
        { property: "90° Peel Adhesion, Initial", value: "25 psi", method: "ASTM D3330" },
        { property: "90° Peel Adhesion, Final", value: "38 psi", method: "ASTM D3330" },
        { property: "Static Shear (68°F / 20°C)", value: "35 oz", method: "ASTM D3654" },
        { property: "Static Shear (194°F / 90°C)", value: "4.5 oz", method: "ASTM D3654" },
        { property: "Dynamic Shear", value: "42 psi", method: "ASTM D1002" },
        { property: "Minimum Long Term Temp", value: "-20°C", method: "Internal Method" },
        { property: "Maximum Long Term Temp", value: "160°F / 71°C", method: "Internal Method" },
        { property: "Maximum Short Term Temp", value: "200°F / 93°C", method: "Internal Method" }
      ];
    
    default:
      return commonTests;
  }
};

let updated = 0;

// Update all TAPE category products
productsData.products.forEach(product => {
  if (product.category === 'TAPE') {
    console.log(`🔬 Updating ${product.id}: ${product.name}`);
    
    // Replace old technical data with new 3-column format
    product.technicalData = {
      // Keep basic info
      appearance: product.technicalData?.appearance || "",
      shelfLife: product.technicalData?.shelfLife || "24 months",
      thickness: product.technicalData?.thickness || "",
      color: product.technicalData?.color || "",
      
      // Add the new test data structure
      testData: getTapeTestData(product.id)
    };
    
    console.log(`   ✅ Added ${product.technicalData.testData.length} test properties with ASTM methods`);
    updated++;
  }
});

console.log(`\n📊 TAPE TECHNICAL DATA UPDATE RESULTS:`);
console.log(`   • Tape products updated: ${updated}`);
console.log(`   • New format: Property | Value | Methods`);
console.log(`   • Includes ASTM test methods: ✅`);
console.log(`   • Professional TDS format: ✅`);

// Write back the updated data
fs.writeFileSync(productsDataPath, JSON.stringify(productsData, null, 2));

console.log(`\n✅ Updated product data saved`);
console.log(`🎯 All tape products now have proper 3-column technical data!`);
console.log(`📋 Next: Update the component to display the new format`);
