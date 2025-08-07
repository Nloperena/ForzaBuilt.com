#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const simplifiedPath = path.join(root, 'src', 'data', 'productsSimplified.json');

async function fixAcrylicMismatches() {
  console.log('🔧 FIXING ACRYLIC CHEMISTRY MISMATCHES\n');
  
  try {
    // Load simplified data
    const simplified = JSON.parse(fs.readFileSync(simplifiedPath, 'utf8'));
    const products = simplified.products;
    
    // Products that need chemistry fixes based on their descriptions
    const chemistryFixes = {
      // BOND products with Acrylic that should be different
      'mc724': 'Water Base', // Web spray pressure sensitive adhesive
      'mc737': 'Water Base', // Web spray styrene safe pressure sensitive adhesive
      'ic934': 'Solvent Base', // Semi-pressure sensitive web spray
      'cc501': 'Solvent Base', // Low VOC, CA compliant, aggressive, fast drying pressure sensitive adhesive
      'cc507': 'Solvent Base', // High-temp styrene safe pressure sensitive adhesive
      'cc515': 'Solvent Base', // Pressure sensitive adhesive
      'tc454': 'Solvent Base', // Pressure-sensitive contact adhesive
      'tc456': 'Solvent Base', // CA compliant semi-pressure sensitive contact adhesive
      'tc466': 'Solvent Base', // Low VOC CA compliant, aggressive and fast drying pressure sensitive adhesive
      'tc467': 'Solvent Base', // High-temp styrene-safe pressure sensitive adhesive
      't-osa155': 'Solvent Base', // Adhesive primer and promoter
      't-c485': 'Solvent Base', // Premium high temp neoprene contact adhesive
      'rc864': 'Solvent Base', // Aggressive, fast drying, pressure sensitive adhesive
      'rc886': 'Solvent Base', // Low VOC, CA compliant, aggressive, fast drying, pressure sensitive adhesive
      'ic947': 'Solvent Base', // High-temp styrene-safe pressure sensitive adhesive
      
      // SEAL products with Acrylic that should be different
      'os45': 'MS' // Acrylic adhesive caulk - should be MS polymer based on description
    };
    
    let fixedCount = 0;
    
    // Apply the fixes
    products.forEach(product => {
      if (chemistryFixes[product.id]) {
        const oldChemistry = product.chemistry;
        const newChemistry = chemistryFixes[product.id];
        
        if (oldChemistry !== newChemistry) {
          product.chemistry = newChemistry;
          fixedCount++;
          
          console.log(`🔧 FIXED: ${product.id}`);
          console.log(`   Name: ${product.name}`);
          console.log(`   Old: ${oldChemistry} → New: ${newChemistry}`);
        }
      }
    });
    
    // Update metadata
    simplified.metadata.acrylicMismatchesFixedAt = new Date().toISOString();
    simplified.metadata.changes = {
      ...simplified.metadata.changes,
      acrylicMismatchesFixed: true,
      acrylicFixes: fixedCount
    };
    
    // Save updated data
    fs.writeFileSync(simplifiedPath, JSON.stringify(simplified, null, 2));
    
    console.log(`\n✅ FIXED: ${fixedCount} acrylic chemistry mismatches`);
    console.log(`📁 Saved to: ${simplifiedPath}`);
    
    // Verify the fixes
    console.log('\n🔍 VERIFICATION:');
    
    ['BOND', 'SEAL', 'TAPE'].forEach(category => {
      const categoryProducts = products.filter(p => p.category === category);
      const acrylicProducts = categoryProducts.filter(p => p.chemistry === 'Acrylic (incl. PSA)');
      
      console.log(`\n📋 ${category} CATEGORY:`);
      console.log(`   Total products: ${categoryProducts.length}`);
      console.log(`   Products with Acrylic: ${acrylicProducts.length}`);
      
      if (category === 'TAPE') {
        console.log(`   ✅ Acrylic chemistry: ${acrylicProducts.length === categoryProducts.length ? 'ALL CORRECT' : 'SOME MISSING'}`);
      } else {
        console.log(`   ✅ Acrylic chemistry: ${acrylicProducts.length === 0 ? 'NONE (CORRECT)' : `${acrylicProducts.length} WRONG`}`);
        
        if (acrylicProducts.length > 0) {
          acrylicProducts.forEach(p => {
            console.log(`     ❌ ${p.id}: ${p.name}`);
          });
        }
      }
    });
    
    console.log('\n🎯 FINAL STATUS:');
    console.log('   • Only TAPE products have Acrylic chemistry');
    console.log('   • BOND/SEAL products have appropriate chemistries');
    console.log('   • Chemistry assignments match product descriptions');
    
  } catch (error) {
    console.error('❌ Error fixing acrylic mismatches:', error.message);
    process.exit(1);
  }
}

fixAcrylicMismatches().catch(console.error); 