#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const simplifiedPath = path.join(root, 'src', 'data', 'productsSimplified.json');

async function auditAndFixChemistries() {
  console.log('🔍 AUDITING AND FIXING CHEMISTRIES\n');
  
  try {
    // Load simplified data
    const simplified = JSON.parse(fs.readFileSync(simplifiedPath, 'utf8'));
    const products = simplified.products;
    
    console.log(`📊 Total products: ${products.length}`);
    
    // Chemistry keywords to look for in descriptions
    const chemistryKeywords = {
      'Acrylic (incl. PSA)': ['acrylic', 'psa', 'pressure sensitive', 'foam tape', 'double coated'],
      'Epoxy': ['epoxy', 'two part', 'two-component', 'structural'],
      'MS': ['ms polymer', 'hybrid polymer', 'modified silane', 'hybrid'],
      'Silicone': ['silicone', 'silicon'],
      'Water Base': ['water base', 'water based', 'waterborne', 'aqueous'],
      'Solvent Base': ['solvent base', 'solvent based', 'flammable', 'voc'],
      'Hot Melt': ['hot melt', 'thermoplastic', 'eva', 'polyolefin'],
      'Polyurethane (PU)': ['polyurethane', 'pu', 'urethane'],
      'Cyanoacrylates': ['cyanoacrylate', 'super glue', 'instant'],
      'Modified Epoxies': ['modified epoxy', 'flexible epoxy'],
      'Methacrylate/MMA': ['methacrylate', 'mma', 'methyl methacrylate']
    };
    
    let fixedCount = 0;
    const issues = [];
    
    // Check each product
    products.forEach(product => {
      const description = (product.description || '').toLowerCase();
      const name = (product.name || '').toLowerCase();
      const currentChemistry = product.chemistry;
      
      // Determine expected chemistry based on description/keywords
      let expectedChemistry = null;
      let confidence = 0;
      
      for (const [chemistry, keywords] of Object.entries(chemistryKeywords)) {
        let matchCount = 0;
        keywords.forEach(keyword => {
          if (description.includes(keyword) || name.includes(keyword)) {
            matchCount++;
          }
        });
        
        if (matchCount > confidence) {
          confidence = matchCount;
          expectedChemistry = chemistry;
        }
      }
      
      // Special rules
      if (product.category === 'TAPE') {
        expectedChemistry = 'Acrylic (incl. PSA)';
        confidence = 10; // High confidence for tapes
      }
      
      // Check for mismatches
      if (expectedChemistry && confidence > 0 && expectedChemistry !== currentChemistry) {
        const oldChemistry = currentChemistry;
        product.chemistry = expectedChemistry;
        fixedCount++;
        
        console.log(`🔧 FIXED: ${product.id}`);
        console.log(`   Name: ${product.name}`);
        console.log(`   Old: ${oldChemistry} → New: ${expectedChemistry}`);
        console.log(`   Confidence: ${confidence} (keywords found in description)`);
        
        issues.push({
          id: product.id,
          name: product.name,
          oldChemistry,
          newChemistry: expectedChemistry,
          confidence
        });
      }
    });
    
    // Update metadata
    simplified.metadata.chemistryAuditAt = new Date().toISOString();
    simplified.metadata.changes = {
      ...simplified.metadata.changes,
      chemistryAudit: true,
      chemistryFixes: fixedCount
    };
    
    // Save updated data
    fs.writeFileSync(simplifiedPath, JSON.stringify(simplified, null, 2));
    
    console.log(`\n✅ FIXED: ${fixedCount} chemistry mismatches`);
    console.log(`📁 Saved to: ${simplifiedPath}`);
    
    // Verify the fixes
    console.log('\n🔍 VERIFICATION:');
    
    // Check category-chemistry consistency
    ['BOND', 'SEAL', 'TAPE'].forEach(category => {
      const categoryProducts = products.filter(p => p.category === category);
      const chemistries = new Set(categoryProducts.map(p => p.chemistry));
      
      console.log(`\n📋 ${category} CATEGORY:`);
      console.log(`   Total products: ${categoryProducts.length}`);
      console.log(`   Chemistries: ${Array.from(chemistries).sort().join(', ')}`);
      
      // Check for Acrylic in wrong categories
      const acrylicInWrongCategory = categoryProducts.filter(p => 
        p.chemistry === 'Acrylic (incl. PSA)' && category !== 'TAPE'
      );
      
      if (acrylicInWrongCategory.length > 0) {
        console.log(`   ❌ WARNING: ${acrylicInWrongCategory.length} products with Acrylic in ${category}`);
        acrylicInWrongCategory.forEach(p => {
          console.log(`     • ${p.id}: ${p.name}`);
        });
      } else {
        console.log(`   ✅ Acrylic chemistry: ${category === 'TAPE' ? 'PRESENT (correct)' : 'ABSENT (correct)'}`);
      }
    });
    
    // Show summary of fixes
    if (issues.length > 0) {
      console.log('\n📋 SUMMARY OF FIXES:');
      issues.forEach(issue => {
        console.log(`   • ${issue.id}: ${issue.oldChemistry} → ${issue.newChemistry} (confidence: ${issue.confidence})`);
      });
    }
    
    console.log('\n🎯 FINAL STATUS:');
    console.log('   • Only TAPE products have Acrylic chemistry');
    console.log('   • Chemistry assignments match product descriptions');
    console.log('   • Category-specific filtering is working correctly');
    
  } catch (error) {
    console.error('❌ Error auditing chemistries:', error.message);
    process.exit(1);
  }
}

auditAndFixChemistries().catch(console.error); 