#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

// Data files to audit
const dataFiles = {
  productsMerged: path.join(root, 'src', 'data', 'productsMerged.json'),
  productsWithTdsLinks: path.join(root, 'src', 'data', 'productsWithTdsLinks.json'),
  chemistrySummary: path.join(root, 'src', 'data', 'chemistry-summary.json'),
  industrialDatasheet: path.join(root, 'src', 'data', 'industrialDatasheet.ts')
};

async function auditDataForCMS() {
  console.log('🔍 COMPREHENSIVE CMS DATA AUDIT\n');
  
  const issues = {
    critical: [],
    warnings: [],
    recommendations: []
  };

  // 1. Check data file existence and structure
  console.log('📁 Checking data file structure...');
  for (const [name, filePath] of Object.entries(dataFiles)) {
    if (!fs.existsSync(filePath)) {
      issues.critical.push(`Missing data file: ${name} (${filePath})`);
    } else {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        if (name === 'industrialDatasheet') {
          // TypeScript file - check if it exports properly
          if (!content.includes('export const industrialDatasheet')) {
            issues.critical.push(`industrialDatasheet.ts missing proper export`);
          }
        } else {
          // JSON file - validate structure
          const data = JSON.parse(content);
          if (!data || typeof data !== 'object') {
            issues.critical.push(`${name} has invalid JSON structure`);
          }
        }
      } catch (error) {
        issues.critical.push(`${name} has invalid format: ${error.message}`);
      }
    }
  }

  // 2. Load and analyze productsMerged.json
  console.log('📊 Analyzing productsMerged.json...');
  try {
    const products = JSON.parse(fs.readFileSync(dataFiles.productsMerged, 'utf8'));
    
    // Check for required fields
    const requiredFields = ['id', 'name', 'category', 'industry'];
    const missingFields = [];
    const inconsistentFields = [];
    
    products.forEach((product, index) => {
      // Check required fields
      requiredFields.forEach(field => {
        if (!product[field]) {
          missingFields.push(`${product.id || `product_${index}`}: missing ${field}`);
        }
      });
      
      // Check data type consistency
      if (product.industry && !Array.isArray(product.industry)) {
        inconsistentFields.push(`${product.id}: industry should be array, got ${typeof product.industry}`);
      }
      
      if (product.category && !['BOND', 'SEAL', 'TAPE'].includes(product.category)) {
        inconsistentFields.push(`${product.id}: invalid category "${product.category}"`);
      }
    });
    
    if (missingFields.length > 0) {
      issues.critical.push(`Missing required fields: ${missingFields.length} products affected`);
      issues.warnings.push(...missingFields.slice(0, 5)); // Show first 5
    }
    
    if (inconsistentFields.length > 0) {
      issues.critical.push(`Data type inconsistencies: ${inconsistentFields.length} products affected`);
      issues.warnings.push(...inconsistentFields.slice(0, 5));
    }
    
    // Check for duplicate IDs
    const ids = products.map(p => p.id).filter(Boolean);
    const uniqueIds = new Set(ids);
    if (ids.length !== uniqueIds.size) {
      issues.critical.push(`Duplicate product IDs found: ${ids.length - uniqueIds.size} duplicates`);
    }
    
    // Check chemistry data consistency
    const chemistryIssues = [];
    products.forEach(product => {
      if (product.chemistry && !product.chemistryConfidence) {
        chemistryIssues.push(`${product.id}: chemistry without confidence level`);
      }
      if (product.chemistryConfidence && !product.chemistry) {
        chemistryIssues.push(`${product.id}: confidence without chemistry`);
      }
    });
    
    if (chemistryIssues.length > 0) {
      issues.warnings.push(`Chemistry data inconsistencies: ${chemistryIssues.length} products`);
    }
    
  } catch (error) {
    issues.critical.push(`Failed to analyze productsMerged.json: ${error.message}`);
  }

  // 3. Check chemistry summary consistency
  console.log('🧪 Analyzing chemistry summary...');
  try {
    const chemistrySummary = JSON.parse(fs.readFileSync(dataFiles.chemistrySummary, 'utf8'));
    
    // Check if confidence breakdown has undefined values
    if (chemistrySummary.confidenceBreakdown && chemistrySummary.confidenceBreakdown.undefined) {
      issues.critical.push(`Chemistry confidence has ${chemistrySummary.confidenceBreakdown.undefined} undefined values`);
    }
    
    // Check if chemistry definitions match breakdown
    const definedChemistries = Object.keys(chemistrySummary.chemistryDefinitions || {});
    const breakdownChemistries = Object.keys(chemistrySummary.chemistryBreakdown || {});
    
    const missingDefinitions = breakdownChemistries.filter(chem => !definedChemistries.includes(chem));
    const extraDefinitions = definedChemistries.filter(chem => !breakdownChemistries.includes(chem));
    
    if (missingDefinitions.length > 0) {
      issues.warnings.push(`Chemistry breakdown has ${missingDefinitions.length} chemistries without definitions`);
    }
    
    if (extraDefinitions.length > 0) {
      issues.warnings.push(`Chemistry definitions have ${extraDefinitions.length} unused chemistries`);
    }
    
  } catch (error) {
    issues.critical.push(`Failed to analyze chemistry summary: ${error.message}`);
  }

  // 4. Check for multiple data sources conflicts
  console.log('🔄 Checking data source conflicts...');
  try {
    const productsWithTds = JSON.parse(fs.readFileSync(dataFiles.productsWithTdsLinks, 'utf8'));
    const productsMerged = JSON.parse(fs.readFileSync(dataFiles.productsMerged, 'utf8'));
    
    // Check if both files have the same products
    const tdsIds = new Set(productsWithTds.products?.map(p => p.id) || []);
    const mergedIds = new Set(productsMerged.map(p => p.id) || []);
    
    const onlyInTds = [...tdsIds].filter(id => !mergedIds.has(id));
    const onlyInMerged = [...mergedIds].filter(id => !tdsIds.has(id));
    
    if (onlyInTds.length > 0) {
      issues.warnings.push(`${onlyInTds.length} products only in productsWithTdsLinks.json`);
    }
    
    if (onlyInMerged.length > 0) {
      issues.warnings.push(`${onlyInMerged.length} products only in productsMerged.json`);
    }
    
  } catch (error) {
    issues.critical.push(`Failed to compare data sources: ${error.message}`);
  }

  // 5. Check for CMS-specific issues
  console.log('🏗️ Checking CMS compatibility...');
  
  // Check for fields that would be problematic in a CMS
  const cmsProblematicFields = ['chemistryIndicators', 'chemistryDetails', 'chemistrySource'];
  const cmsIssues = [];
  
  try {
    const products = JSON.parse(fs.readFileSync(dataFiles.productsMerged, 'utf8'));
    
    products.forEach(product => {
      cmsProblematicFields.forEach(field => {
        if (product[field] && typeof product[field] === 'object') {
          cmsIssues.push(`${product.id}: ${field} is complex object - may need flattening for CMS`);
        }
      });
      
      // Check for fields that might need validation
      if (product.chemistryConfidence && !['High', 'Medium', 'Low', 'None'].includes(product.chemistryConfidence)) {
        cmsIssues.push(`${product.id}: invalid chemistryConfidence "${product.chemistryConfidence}"`);
      }
    });
    
    if (cmsIssues.length > 0) {
      issues.warnings.push(`CMS compatibility issues: ${cmsIssues.length} potential problems`);
    }
    
  } catch (error) {
    issues.critical.push(`Failed to check CMS compatibility: ${error.message}`);
  }

  // 6. Generate recommendations
  console.log('💡 Generating recommendations...');
  
  issues.recommendations.push(
    'Standardize all product IDs to lowercase with hyphens',
    'Ensure all products have required fields: id, name, category, industry',
    'Convert industry field to array format consistently',
    'Add validation for chemistry confidence levels',
    'Consider flattening complex nested objects for CMS compatibility',
    'Implement data migration strategy for chemistry corrections',
    'Add data versioning for tracking changes',
    'Create data validation schema for CMS integration'
  );

  // Print results
  console.log('\n📋 AUDIT RESULTS:\n');
  
  if (issues.critical.length > 0) {
    console.log('🚨 CRITICAL ISSUES:');
    issues.critical.forEach(issue => console.log(`  • ${issue}`));
    console.log('');
  }
  
  if (issues.warnings.length > 0) {
    console.log('⚠️  WARNINGS:');
    issues.warnings.forEach(issue => console.log(`  • ${issue}`));
    console.log('');
  }
  
  if (issues.recommendations.length > 0) {
    console.log('💡 RECOMMENDATIONS:');
    issues.recommendations.forEach(rec => console.log(`  • ${rec}`));
    console.log('');
  }
  
  const totalIssues = issues.critical.length + issues.warnings.length;
  console.log(`📊 SUMMARY: ${totalIssues} total issues found`);
  
  if (issues.critical.length > 0) {
    console.log('❌ CMS PLANNING BLOCKED - Critical issues must be resolved first');
    process.exit(1);
  } else if (issues.warnings.length > 0) {
    console.log('⚠️  CMS PLANNING ADVISED - Resolve warnings before proceeding');
  } else {
    console.log('✅ CMS PLANNING READY - No critical issues found');
  }
}

auditDataForCMS().catch(console.error); 