#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const consolidatedPath = path.join(root, 'src', 'data', 'productsConsolidated.json');
const cmsReadyPath = path.join(root, 'src', 'data', 'productsCMSReady.json');

async function standardizeDataForCMS() {
  console.log('🏗️ STANDARDIZING DATA FOR CMS COMPATIBILITY\n');
  
  try {
    // Load consolidated data
    const consolidated = JSON.parse(fs.readFileSync(consolidatedPath, 'utf8'));
    const products = consolidated.products;
    
    console.log(`📊 Loaded ${products.length} products for CMS standardization`);
    
    let flattenedCount = 0;
    let standardizedCount = 0;
    
    // Standardize each product for CMS compatibility
    const cmsReadyProducts = products.map(product => {
      const standardized = {
        // Core required fields
        id: product.id?.toLowerCase().replace(/\s+/g, '-') || '',
        name: product.name || '',
        description: product.description || '',
        
        // Categorization fields
        category: product.category || 'Unknown',
        industry: Array.isArray(product.industry) ? product.industry : [product.industry || 'industrial'],
        productType: product.productType || 'Unknown',
        
        // Chemistry fields (flattened)
        chemistry: product.chemistry || 'Unknown',
        chemistryConfidence: product.chemistryConfidence || 'None',
        chemistrySource: product.chemistrySource || 'Manual',
        
        // Technical data (flattened from complex objects)
        technicalData: {
          appearance: product.technicalData?.appearance || '',
          shelfLife: product.technicalData?.shelfLife || '',
          solids: product.technicalData?.solids || '',
          solvent: product.technicalData?.solvent || '',
          voc: product.technicalData?.voc || '',
          viscosity: product.technicalData?.viscosity || '',
          density: product.technicalData?.density || '',
          pH: product.technicalData?.pH || '',
          color: product.technicalData?.color || '',
          odor: product.technicalData?.odor || '',
          storageConditions: product.technicalData?.storageConditions || '',
          temperatureRange: product.technicalData?.temperatureRange || '',
          adhesiveType: product.technicalData?.adhesiveType || '',
          foamType: product.technicalData?.foamType || '',
          peelStrength: product.technicalData?.peelStrength || '',
          shearStrength: product.technicalData?.shearStrength || ''
        },
        
        // Specifications (flattened)
        specifications: {
          type: product.specifications?.type || '',
          viscosity: product.specifications?.viscosity || '',
          solids: product.specifications?.solids || '',
          flashPoint: product.specifications?.flashPoint || '',
          potLife: product.specifications?.potLife || '',
          cureTime: product.specifications?.cureTime || '',
          temperatureRange: product.specifications?.temperatureRange || '',
          thickness: product.specifications?.thickness || '',
          width: product.specifications?.width || '',
          length: product.specifications?.length || '',
          substrates: Array.isArray(product.specifications?.substrates) ? product.specifications.substrates : [],
          applications: Array.isArray(product.specifications?.applications) ? product.specifications.applications : [],
          features: Array.isArray(product.specifications?.features) ? product.specifications.features : [],
          certifications: Array.isArray(product.specifications?.certifications) ? product.specifications.certifications : [],
          packaging: Array.isArray(product.specifications?.packaging) ? product.specifications.packaging : []
        },
        
        // Content fields
        applications: product.applications || '',
        benefits: Array.isArray(product.benefits) ? product.benefits : [],
        sizes: Array.isArray(product.sizes) ? product.sizes : [],
        
        // Media fields
        imageUrl: product.imageUrl || product.image || '',
        pdfLinks: Array.isArray(product.pdfLinks) ? product.pdfLinks : [],
        standardTdsLink: product.standardTdsLink || '',
        hasTdsLink: Boolean(product.hasTdsLink),
        
        // Metadata fields
        searchKeywords: Array.isArray(product.searchKeywords) ? product.searchKeywords : [],
        shortName: product.shortName || product.name?.split('–')[0]?.trim() || '',
        
        // CMS-specific fields
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1
      };
      
      // Track changes
      if (product.chemistryIndicators || product.chemistryDetails || product.chemistrySource) {
        flattenedCount++;
      }
      
      if (product.id !== standardized.id || 
          !Array.isArray(product.industry) || 
          product.chemistryConfidence === 'undefined') {
        standardizedCount++;
      }
      
      return standardized;
    });
    
    // Create CMS-ready structure
    const cmsReady = {
      metadata: {
        ...consolidated.metadata,
        cmsStandardizedAt: new Date().toISOString(),
        version: '1.0',
        schema: {
          requiredFields: ['id', 'name', 'category', 'industry', 'chemistry', 'chemistryConfidence'],
          fieldTypes: {
            id: 'string (lowercase, hyphenated)',
            name: 'string',
            category: 'enum (BOND, SEAL, TAPE)',
            industry: 'array of strings',
            chemistry: 'string',
            chemistryConfidence: 'enum (High, Medium, Low, None)',
            technicalData: 'object (flattened)',
            specifications: 'object (flattened)',
            applications: 'string',
            benefits: 'array of strings',
            sizes: 'array of strings'
          }
        }
      },
      products: cmsReadyProducts
    };
    
    // Save CMS-ready data
    fs.writeFileSync(cmsReadyPath, JSON.stringify(cmsReady, null, 2));
    
    console.log(`\n📈 SUMMARY:`);
    console.log(`   • Total products: ${products.length}`);
    console.log(`   • Flattened complex objects: ${flattenedCount}`);
    console.log(`   • Standardized fields: ${standardizedCount}`);
    console.log(`   • Saved to: ${cmsReadyPath}`);
    
    // Validate CMS compatibility
    console.log('\n🔍 VALIDATING CMS COMPATIBILITY...');
    
    const validationErrors = [];
    
    cmsReadyProducts.forEach(product => {
      // Check required fields
      if (!product.id || !product.name || !product.category || !product.industry || !product.chemistry || !product.chemistryConfidence) {
        validationErrors.push(`${product.id}: Missing required fields`);
      }
      
      // Check field types
      if (!Array.isArray(product.industry)) {
        validationErrors.push(`${product.id}: Industry should be array`);
      }
      
      if (!['High', 'Medium', 'Low', 'None'].includes(product.chemistryConfidence)) {
        validationErrors.push(`${product.id}: Invalid chemistryConfidence "${product.chemistryConfidence}"`);
      }
      
      if (!['BOND', 'SEAL', 'TAPE'].includes(product.category)) {
        validationErrors.push(`${product.id}: Invalid category "${product.category}"`);
      }
      
      // Check for complex nested objects (should be flattened)
      if (typeof product.chemistryIndicators === 'object' || 
          typeof product.chemistryDetails === 'object' ||
          typeof product.chemistrySource === 'object') {
        validationErrors.push(`${product.id}: Contains complex nested objects`);
      }
    });
    
    if (validationErrors.length > 0) {
      console.log(`❌ VALIDATION ERRORS:`);
      validationErrors.slice(0, 10).forEach(error => console.log(`   • ${error}`));
      if (validationErrors.length > 10) {
        console.log(`   ... and ${validationErrors.length - 10} more errors`);
      }
      process.exit(1);
    } else {
      console.log(`✅ SUCCESS: All products validated for CMS compatibility`);
    }
    
    // Generate CMS field summary
    console.log('\n📋 CMS FIELD SUMMARY:');
    console.log(`   • Required fields: id, name, category, industry, chemistry, chemistryConfidence`);
    console.log(`   • Array fields: industry, benefits, sizes, substrates, applications, features, certifications, packaging`);
    console.log(`   • Object fields: technicalData, specifications (flattened)`);
    console.log(`   • String fields: description, applications, imageUrl, standardTdsLink`);
    console.log(`   • Boolean fields: hasTdsLink, isActive`);
    console.log(`   • Date fields: createdAt, updatedAt`);
    
    console.log(`\n🎯 CMS INTEGRATION READY!`);
    console.log(`   • Use ${cmsReadyPath} as your single source of truth`);
    console.log(`   • All complex objects have been flattened`);
    console.log(`   • All field types are consistent`);
    console.log(`   • All required fields are present`);
    
  } catch (error) {
    console.error('❌ Error standardizing data for CMS:', error.message);
    process.exit(1);
  }
}

standardizeDataForCMS().catch(console.error); 