#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const cmsReadyPath = path.join(root, 'src', 'data', 'productsCMSReady.json');
const simplifiedPath = path.join(root, 'src', 'data', 'productsSimplified.json');

async function simplifyDataStructure() {
  console.log('🧹 SIMPLIFYING DATA STRUCTURE\n');
  
  try {
    // Load CMS-ready data
    const cmsReady = JSON.parse(fs.readFileSync(cmsReadyPath, 'utf8'));
    const products = cmsReady.products;
    
    console.log(`📊 Loaded ${products.length} products for simplification`);
    
    let removedConfidenceCount = 0;
    let removedSpecificationsCount = 0;
    
    // Simplify each product
    const simplifiedProducts = products.map(product => {
      const simplified = {
        // Core required fields
        id: product.id,
        name: product.name,
        description: product.description,
        
        // Categorization fields
        category: product.category,
        industry: product.industry,
        productType: product.productType,
        
        // Chemistry fields (removed confidence)
        chemistry: product.chemistry,
        
        // Technical data (keep this, remove specifications)
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
        
        // Content fields
        applications: product.applications,
        benefits: product.benefits,
        sizes: product.sizes,
        
        // Media fields
        imageUrl: product.imageUrl,
        pdfLinks: product.pdfLinks,
        standardTdsLink: product.standardTdsLink,
        hasTdsLink: product.hasTdsLink,
        
        // Metadata fields
        searchKeywords: product.searchKeywords,
        shortName: product.shortName,
        
        // CMS-specific fields
        isActive: product.isActive,
        createdAt: product.createdAt,
        updatedAt: new Date().toISOString(),
        version: product.version
      };
      
      // Track removals
      if (product.chemistryConfidence) {
        removedConfidenceCount++;
      }
      
      if (product.specifications) {
        removedSpecificationsCount++;
      }
      
      return simplified;
    });
    
    // Create simplified structure
    const simplified = {
      metadata: {
        ...cmsReady.metadata,
        simplifiedAt: new Date().toISOString(),
        version: '2.0',
        changes: {
          removedChemistryConfidence: true,
          removedSpecifications: true,
          keptTechnicalData: true
        },
        schema: {
          requiredFields: ['id', 'name', 'category', 'industry', 'chemistry'],
          fieldTypes: {
            id: 'string (lowercase, hyphenated)',
            name: 'string',
            category: 'enum (BOND, SEAL, TAPE)',
            industry: 'array of strings',
            chemistry: 'string',
            technicalData: 'object (flattened)',
            applications: 'string',
            benefits: 'array of strings',
            sizes: 'array of strings'
          }
        }
      },
      products: simplifiedProducts
    };
    
    // Save simplified data
    fs.writeFileSync(simplifiedPath, JSON.stringify(simplified, null, 2));
    
    console.log(`\n📈 SUMMARY:`);
    console.log(`   • Total products: ${products.length}`);
    console.log(`   • Removed chemistryConfidence: ${removedConfidenceCount}`);
    console.log(`   • Removed specifications: ${removedSpecificationsCount}`);
    console.log(`   • Kept technicalData: ${products.length}`);
    console.log(`   • Saved to: ${simplifiedPath}`);
    
    // Validate simplified structure
    console.log('\n🔍 VALIDATING SIMPLIFIED STRUCTURE...');
    
    const validationErrors = [];
    
    simplifiedProducts.forEach(product => {
      // Check required fields (removed chemistryConfidence from required)
      if (!product.id || !product.name || !product.category || !product.industry || !product.chemistry) {
        validationErrors.push(`${product.id}: Missing required fields`);
      }
      
      // Check field types
      if (!Array.isArray(product.industry)) {
        validationErrors.push(`${product.id}: Industry should be array`);
      }
      
      if (!['BOND', 'SEAL', 'TAPE'].includes(product.category)) {
        validationErrors.push(`${product.id}: Invalid category "${product.category}"`);
      }
      
      // Check that removed fields are actually gone
      if (product.chemistryConfidence) {
        validationErrors.push(`${product.id}: chemistryConfidence should be removed`);
      }
      
      if (product.specifications) {
        validationErrors.push(`${product.id}: specifications should be removed`);
      }
      
      // Check that technicalData is present
      if (!product.technicalData || typeof product.technicalData !== 'object') {
        validationErrors.push(`${product.id}: technicalData should be present`);
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
      console.log(`✅ SUCCESS: All products validated for simplified structure`);
    }
    
    // Generate simplified field summary
    console.log('\n📋 SIMPLIFIED FIELD SUMMARY:');
    console.log(`   • Required fields: id, name, category, industry, chemistry`);
    console.log(`   • Array fields: industry, benefits, sizes`);
    console.log(`   • Object fields: technicalData (flattened)`);
    console.log(`   • String fields: description, applications, imageUrl, standardTdsLink`);
    console.log(`   • Boolean fields: hasTdsLink, isActive`);
    console.log(`   • Date fields: createdAt, updatedAt`);
    console.log(`   • REMOVED: chemistryConfidence, specifications`);
    
    console.log(`\n🎯 SIMPLIFIED CMS INTEGRATION READY!`);
    console.log(`   • Use ${simplifiedPath} as your simplified data source`);
    console.log(`   • Removed unnecessary complexity`);
    console.log(`   • Focused on essential technical data`);
    console.log(`   • Cleaner, more maintainable structure`);
    
  } catch (error) {
    console.error('❌ Error simplifying data structure:', error.message);
    process.exit(1);
  }
}

simplifyDataStructure().catch(console.error); 