#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const productsMergedPath = path.join(root, 'src', 'data', 'productsMerged.json');
const productsWithTdsPath = path.join(root, 'src', 'data', 'productsWithTdsLinks.json');
const consolidatedPath = path.join(root, 'src', 'data', 'productsConsolidated.json');

async function consolidateDataSources() {
  console.log('🔄 CONSOLIDATING DATA SOURCES\n');
  
  try {
    // Load both data sources
    const productsMerged = JSON.parse(fs.readFileSync(productsMergedPath, 'utf8'));
    const productsWithTds = JSON.parse(fs.readFileSync(productsWithTdsPath, 'utf8'));
    
    console.log(`📊 ProductsMerged: ${productsMerged.length} products`);
    console.log(`📊 ProductsWithTds: ${productsWithTds.products?.length || 0} products`);
    
    // Create a map of products by ID for easy lookup
    const mergedMap = new Map(productsMerged.map(p => [p.id, p]));
    const tdsMap = new Map((productsWithTds.products || []).map(p => [p.id, p]));
    
    // Find products that exist in both sources
    const commonIds = [...mergedMap.keys()].filter(id => tdsMap.has(id));
    const onlyInMerged = [...mergedMap.keys()].filter(id => !tdsMap.has(id));
    const onlyInTds = [...tdsMap.keys()].filter(id => !mergedMap.has(id));
    
    console.log(`\n📋 ANALYSIS:`);
    console.log(`   • Common products: ${commonIds.length}`);
    console.log(`   • Only in Merged: ${onlyInMerged.length}`);
    console.log(`   • Only in TDS: ${onlyInTds.length}`);
    
    // Create consolidated products array
    const consolidatedProducts = [];
    
    // Process common products (merge data)
    commonIds.forEach(id => {
      const merged = mergedMap.get(id);
      const tds = tdsMap.get(id);
      
      // Merge data with Merged as base, TDS as overlay
      const consolidated = {
        ...merged,
        // Overlay TDS data where it exists and is better
        pdfLinks: tds.pdfLinks || merged.pdfLinks || [],
        standardTdsLink: tds.standardTdsLink || merged.standardTdsLink,
        hasTdsLink: tds.hasTdsLink || merged.hasTdsLink,
        // Keep chemistry data from merged (more recent)
        chemistry: merged.chemistry || tds.chemistry,
        chemistryConfidence: merged.chemistryConfidence || tds.chemistryConfidence,
        productType: merged.productType || tds.productType,
        // Keep other fields from merged
        name: merged.name || tds.name,
        description: merged.description || tds.description,
        category: merged.category || tds.category,
        industry: merged.industry || tds.industry
      };
      
      consolidatedProducts.push(consolidated);
      console.log(`✅ Merged ${id}: chemistry=${consolidated.chemistry}, confidence=${consolidated.chemistryConfidence}`);
    });
    
    // Add products only in Merged
    onlyInMerged.forEach(id => {
      const product = mergedMap.get(id);
      consolidatedProducts.push(product);
      console.log(`➕ Added ${id}: from Merged only`);
    });
    
    // Add products only in TDS (with default values)
    onlyInTds.forEach(id => {
      const product = tdsMap.get(id);
      
      // Add default values for missing fields
      const consolidated = {
        ...product,
        chemistry: product.chemistry || 'Unknown',
        chemistryConfidence: product.chemistryConfidence || 'None',
        productType: product.productType || 'Unknown',
        industry: Array.isArray(product.industry) ? product.industry : [product.industry || 'industrial']
      };
      
      consolidatedProducts.push(consolidated);
      console.log(`➕ Added ${id}: from TDS only (with defaults)`);
    });
    
    // Create consolidated structure
    const consolidated = {
      metadata: {
        consolidatedAt: new Date().toISOString(),
        totalProducts: consolidatedProducts.length,
        source: 'Consolidated from productsMerged.json and productsWithTdsLinks.json',
        commonProducts: commonIds.length,
        onlyInMerged: onlyInMerged.length,
        onlyInTds: onlyInTds.length
      },
      products: consolidatedProducts
    };
    
    // Save consolidated data
    fs.writeFileSync(consolidatedPath, JSON.stringify(consolidated, null, 2));
    
    console.log(`\n📈 SUMMARY:`);
    console.log(`   • Total consolidated products: ${consolidatedProducts.length}`);
    console.log(`   • Merged from both sources: ${commonIds.length}`);
    console.log(`   • Added from Merged only: ${onlyInMerged.length}`);
    console.log(`   • Added from TDS only: ${onlyInTds.length}`);
    console.log(`   • Saved to: ${consolidatedPath}`);
    
    // Verify no duplicates
    const ids = consolidatedProducts.map(p => p.id);
    const uniqueIds = new Set(ids);
    if (ids.length !== uniqueIds.size) {
      console.log(`❌ ERROR: ${ids.length - uniqueIds.size} duplicate IDs found in consolidated data`);
      process.exit(1);
    } else {
      console.log(`✅ SUCCESS: No duplicate IDs in consolidated data`);
    }
    
    // Create backup of original files
    const backupDir = path.join(root, 'src', 'data', 'backup');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    fs.copyFileSync(productsMergedPath, path.join(backupDir, `productsMerged-${timestamp}.json`));
    fs.copyFileSync(productsWithTdsPath, path.join(backupDir, `productsWithTdsLinks-${timestamp}.json`));
    
    console.log(`💾 Backups created in: ${backupDir}`);
    
    console.log(`\n🎯 NEXT STEPS:`);
    console.log(`   • Review consolidated data in: ${consolidatedPath}`);
    console.log(`   • Update your application to use the consolidated data`);
    console.log(`   • Consider deprecating the old data files`);
    
  } catch (error) {
    console.error('❌ Error consolidating data sources:', error.message);
    process.exit(1);
  }
}

consolidateDataSources().catch(console.error); 