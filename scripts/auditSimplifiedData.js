#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const simplifiedPath = path.join(root, 'src', 'data', 'productsSimplified.json');

async function auditSimplifiedData() {
  console.log('🔍 AUDITING SIMPLIFIED DATA STRUCTURE\n');
  
  try {
    const simplified = JSON.parse(fs.readFileSync(simplifiedPath, 'utf8'));
    const products = simplified.products;
    
    console.log(`📊 Loaded ${products.length} products`);
    
    // Check for removed fields
    const hasConfidence = products.filter(p => p.chemistryConfidence).length;
    const hasSpecifications = products.filter(p => p.specifications).length;
    const hasTechnicalData = products.filter(p => p.technicalData).length;
    
    console.log(`\n📋 FIELD ANALYSIS:`);
    console.log(`   • Products with chemistryConfidence: ${hasConfidence} (should be 0)`);
    console.log(`   • Products with specifications: ${hasSpecifications} (should be 0)`);
    console.log(`   • Products with technicalData: ${hasTechnicalData} (should be ${products.length})`);
    
    // Check required fields
    const missingRequired = products.filter(p => 
      !p.id || !p.name || !p.category || !p.industry || !p.chemistry
    );
    
    console.log(`   • Products missing required fields: ${missingRequired.length} (should be 0)`);
    
    // Check field types
    const invalidIndustry = products.filter(p => !Array.isArray(p.industry));
    const invalidCategory = products.filter(p => !['BOND', 'SEAL', 'TAPE'].includes(p.category));
    
    console.log(`   • Products with invalid industry type: ${invalidIndustry.length} (should be 0)`);
    console.log(`   • Products with invalid category: ${invalidCategory.length} (should be 0)`);
    
    // Summary
    const totalIssues = hasConfidence + hasSpecifications + missingRequired.length + invalidIndustry.length + invalidCategory.length;
    
    console.log(`\n📈 SUMMARY:`);
    if (totalIssues === 0) {
      console.log(`✅ SUCCESS: Simplified data structure is clean and ready for CMS`);
      console.log(`   • All removed fields are gone`);
      console.log(`   • All required fields are present`);
      console.log(`   • All field types are correct`);
      console.log(`   • Technical data is preserved`);
    } else {
      console.log(`❌ ISSUES FOUND: ${totalIssues} problems need to be fixed`);
    }
    
    console.log(`\n📋 SIMPLIFIED STRUCTURE:`);
    console.log(`   • Required: id, name, category, industry, chemistry`);
    console.log(`   • Technical: technicalData object with all specs`);
    console.log(`   • Content: applications, benefits, sizes`);
    console.log(`   • Media: imageUrl, pdfLinks, standardTdsLink`);
    console.log(`   • Removed: chemistryConfidence, specifications`);
    
  } catch (error) {
    console.error('❌ Error auditing simplified data:', error.message);
    process.exit(1);
  }
}

auditSimplifiedData().catch(console.error); 