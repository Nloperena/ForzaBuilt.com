#!/usr/bin/env node
/**
 * Extract chemistry information from TDS PDF files using pdf-parse
 * Reads actual PDF content to determine chemistry types
 */

const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const root = path.join(__dirname, '..');
const tdsDir = path.join(root, 'public', 'TDS');
const mergedPath = path.join(root, 'src', 'data', 'productsMerged.json');

// Chemistry keywords to search for in PDF content
const chemistryKeywords = {
  'Acrylic (incl. PSA)': [
    'acrylic', 'acrylate', 'psa', 'pressure sensitive', 'adhesive', 'acrylic polymer', 'acrylic resin',
    'free radical polymerization', 'pressure sensitive adhesive', 'psa adhesive', 'acrylic adhesive'
  ],
  'Epoxy': [
    'epoxy', 'epoxies', 'amine', 'hardener', 'catalyst', 'resin', 'thermosetting resin',
    'chemical crosslinking', 'covalent bonds', 'epoxy resin', 'amine hardener', 'epoxy adhesive'
  ],
  'Modified Epoxies': [
    'modified epoxy', 'flexibility modifiers', 'epoxy blend', 'flexible epoxy', 'modified resin',
    'flexible epoxy', 'epoxy modifier'
  ],
  'Modified Silane (MS Polymer/ Hybrid Polymer)': [
    'modified silane', 'ms polymer', 'hybrid polymer', 'silyl', 'silane-terminated', 'polyether',
    'polyurethane blends', 'chemically bonds', 'cures with moisture', 'ms polymer hybrid', 'ms polymer'
  ],
  'Cyanoacrylates': [
    'cyanoacrylate', 'super glue', 'instant adhesive', 'ca', 'anionic polymerization',
    'rapid polymerization', 'instant bond', 'super glue class', 'cyanoacrylate adhesive'
  ],
  'Polyurethane (PU)': [
    'polyurethane', 'urethane', 'pu', 'isocyanate', 'polyol', 'flexible polymer',
    'one-part', 'two-part', 'isocyanate reaction', 'polyurethane adhesive'
  ],
  'Solvent Based': [
    'solvent', 'organic solvent', 'volatile', 'evaporation', 'solvent dissolved',
    'solvent evaporates', 'organic solvent based', 'solvent based'
  ],
  'Water Based': [
    'water based', 'aqueous', 'emulsion', 'latex', 'waterborne', 'water emulsion',
    'latex polymer', 'eco-friendly', 'low voc', 'waterborne adhesive'
  ],
  'Silicone': [
    'silicone', 'silicon', 'polysiloxane', 'silane', 'elastomeric', 'polysiloxane base',
    'cures via moisture', 'flexible rubber', 'elastomeric sealant', 'silicone sealant'
  ],
  'Methacrylate/MMA': [
    'methacrylate', 'mma', 'acrylic-based', 'fast-cure', 'free radical mechanism',
    'structural bonds', 'impact resistance', 'fast fixture', 'methacrylate adhesive'
  ],
  'Hot Melt': [
    'hot melt', 'thermoplastic', 'melt', 'heat activated', 'hot melt adhesive',
    'thermoplastic adhesive', 'hot melt'
  ]
};

// Chemistry definitions for detailed information
const chemistryDefinitions = {
  'Acrylic (incl. PSA)': {
    technical: 'Made from acrylic polymers/resins. Bonds via free radical polymerization. Often pressure-sensitive (PSA).',
    summary: 'Durable, Good UV/weather resistance, Flexible',
    bestUsedFor: 'Metal, glass, plastics, rubber, High/low temp tolerant, Moisture, UV resistant, Quick handling & fast strength',
    exampleUses: 'Construction, labeling, automotive, tape, electronic assembly, medical devices, advertising'
  },
  'Epoxy': {
    technical: 'Thermosetting resin with amine/acid hardener. Chemical crosslinking during cure. Very strong covalent bonds.',
    summary: 'High strength & durability, Excellent Chemical resistance, Rigid',
    bestUsedFor: 'Metals, composites, concrete, wood, some plastics, High/low temp, Minimal flex, Slow to moderate cure time',
    exampleUses: 'Aerospace, automotive, electronics, Construction, marine, electrical potting'
  },
  'Modified Epoxies': {
    technical: 'Epoxy resin blended with flexibility modifiers or fillers.',
    summary: 'Combines Epoxy strength with improved flexibility or speed',
    bestUsedFor: 'Metal, composites needing more flexibility or peel strength',
    exampleUses: 'automotive, Construction, Flexible joints, pumpable Epoxy coatings'
  },
  'Modified Silane (MS Polymer/ Hybrid Polymer)': {
    technical: 'Silane-terminated polyether or polyurethane blends. Chemically Bonds to many substrates. Cures with moisture.',
    summary: 'Blends flexibility, strength, & weatherability, Paintable',
    bestUsedFor: 'Wide range: glass, Metal, plastics, concrete, composites, Alt for silicone or PU, Exterior and interior use',
    exampleUses: 'Construction, marine, automotive, panel bonding, structural sealing'
  },
  'Cyanoacrylates': {
    technical: "'Super glue' class. Rapid anionic polymerization with water/moisture. Forms rigid, strong bonds quickly.",
    summary: 'fast cure (seconds), High strength, thin bond lines, Brittle',
    bestUsedFor: 'plastics, Metal, rubber, ceramics, skin, Small parts, instant Bonds, low temp, low flex',
    exampleUses: 'electronics, medical (wound closure), Quick repairs, model assembly'
  },
  'Polyurethane (PU)': {
    technical: 'Isocyanate and polyol reaction. Forms flexible, durable polymers. One- & two-part options.',
    summary: 'strong, elastic, Handles movement, Resists weather & Moisture',
    bestUsedFor: 'many substrates: wood, concrete, plastics, Metal, glass, High/low temp, Good for flex joints',
    exampleUses: 'Construction, wood/flooring, automotive, insulation, panel lamination, packaging'
  },
  'Solvent Based': {
    technical: 'polymers dissolved in solvent. Forms film as solvent evaporates. Wide range of chemistries.',
    summary: 'fast dry, Good initial tack, Old school tech',
    bestUsedFor: 'Porous and non-Porous, Flexible and Rigid Bonds, Faster handling time',
    exampleUses: 'Shoes, upholstery, signage, arts/crafts, automotive interior trim'
  },
  'Water Based': {
    technical: 'Emulsion or latex of polymer in water. Dries/Cures as water evaporates. Eco-friendly alternatives.',
    summary: 'low VOC, safe, Repositionable until dry, Limited water resistance',
    bestUsedFor: 'Paper, textiles, wood, foam, Porous substrates, Not for constant wet/freeze-thaw',
    exampleUses: 'packaging, bookbinding, furniture, textile lamination, label adhesives'
  },
  'Silicone': {
    technical: 'Polysiloxane base. Cures via Moisture to form Flexible rubber. Remains elastomeric.',
    summary: 'Extreme temp stability, Remains Flexible, UV, Chemical, weather resistant',
    bestUsedFor: 'Glass, metal, ceramic, plastic, stone, Joint sealing (expansion/contraction), High temp, wet environments',
    exampleUses: 'Construction sealants, electronics, glazing, kitchens/baths, automotive'
  },
  'Methacrylate/MMA': {
    technical: 'acrylic-based, fast-cure adhesives. Cures via free radical mechanism. structural Bonds, some flexibility.',
    summary: 'strong, impact resistance, Bonds plastics/composites, fast fixture',
    bestUsedFor: 'bonding fiberglass, plastics (thermoplastics), composite parts, Metals',
    exampleUses: 'marine, transportation, sign making, automotive panel bonding'
  },
  'Hot Melt': {
    technical: 'Thermoplastic adhesives that melt when heated and solidify when cooled.',
    summary: 'Fast setting, Strong initial bond, Heat activated',
    bestUsedFor: 'Packaging, woodworking, bookbinding, assembly, Heat-sensitive applications',
    exampleUses: 'Packaging, furniture assembly, bookbinding, product assembly'
  }
};

async function extractTextFromPDF(pdfPath) {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    console.error(`Error extracting text from ${pdfPath}:`, error.message);
    return '';
  }
}

function analyzeChemistry(text, productId) {
  const textLower = text.toLowerCase();
  const results = {
    chemistry: 'Unknown',
    confidence: 'Low',
    productType: 'Unknown',
    indicators: [],
    chemistryDetails: null,
    fullText: text.substring(0, 500) + '...' // First 500 chars for debugging
  };

  // Check for chemistry types with improved matching
  let bestMatch = { chemistry: 'Unknown', score: 0, matches: [] };
  
  for (const [chemistry, keywords] of Object.entries(chemistryKeywords)) {
    const matches = keywords.filter(keyword => textLower.includes(keyword));
    const score = matches.length;
    
    if (score > bestMatch.score) {
      bestMatch = { chemistry, score, matches };
    }
  }

  if (bestMatch.score > 0) {
    results.chemistry = bestMatch.chemistry;
    results.confidence = bestMatch.score >= 3 ? 'High' : bestMatch.score >= 2 ? 'Medium' : 'Low';
    results.indicators = bestMatch.matches;
    
    // Add chemistry details if available
    if (chemistryDefinitions[bestMatch.chemistry]) {
      results.chemistryDetails = chemistryDefinitions[bestMatch.chemistry];
    }
  }

  // Check for product types
  if (textLower.includes('tape') || textLower.includes('transfer') || textLower.includes('backing')) {
    results.productType = 'Tape';
  } else if (textLower.includes('adhesive') || textLower.includes('bond')) {
    results.productType = 'Adhesive';
  } else if (textLower.includes('sealant') || textLower.includes('seal')) {
    results.productType = 'Sealant';
  } else if (textLower.includes('coating') || textLower.includes('paint')) {
    results.productType = 'Coating';
  } else if (textLower.includes('resin') || textLower.includes('polymer')) {
    results.productType = 'Resin';
  } else if (textLower.includes('canister') || textLower.includes('cartridge')) {
    results.productType = 'Canister';
  }

  return results;
}

async function processTdsFiles() {
  console.log('🔍 Scanning TDS files for chemistry information...\n');

  const products = JSON.parse(fs.readFileSync(mergedPath, 'utf8'));
  const chemistryData = {};
  let processedCount = 0;

  // Industry mapping
  const industryMapping = {
    'industrial': '1. Industrial',
    'marine': '2. Marine', 
    'transportation': '3. Transportation',
    'composites': '4. Composites',
    'construction': '7. Construction',
    'insulation': '6. Insulation'
  };

  for (const [industryKey, industryDir] of Object.entries(industryMapping)) {
    const industryPath = path.join(tdsDir, industryDir);
    if (!fs.existsSync(industryPath)) continue;

    console.log(`📁 Processing ${industryDir}...`);
    
    const items = fs.readdirSync(industryPath);
    
    for (const item of items) {
      const itemPath = path.join(industryPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        const productId = item.toLowerCase();
        
        // Look for TDS files
        let tdsFiles = [];
        
        if (fs.existsSync(path.join(itemPath, 'TDS'))) {
          const tdsSubdir = path.join(itemPath, 'TDS');
          tdsFiles = fs.readdirSync(tdsSubdir)
            .filter(f => f.endsWith('.pdf') && f.includes('FOR EMAIL'))
            .map(f => path.join(tdsSubdir, f));
        } else {
          tdsFiles = fs.readdirSync(itemPath)
            .filter(f => f.endsWith('.pdf') && f.includes('FOR EMAIL'))
            .map(f => path.join(itemPath, f));
        }

        if (tdsFiles.length > 0) {
          const tdsFile = tdsFiles[0]; // Take the first "FOR EMAIL" file
          console.log(`📄 Processing ${productId}...`);
          
          try {
            const text = await extractTextFromPDF(tdsFile);
            const analysis = analyzeChemistry(text, productId);
            
            chemistryData[productId] = {
              ...analysis,
              tdsFile: tdsFile.replace(root, ''),
              industry: industryDir
            };
            
            processedCount++;
            console.log(`  ✅ ${analysis.chemistry} (${analysis.confidence})`);
          } catch (error) {
            console.log(`  ❌ Error processing ${productId}: ${error.message}`);
          }
        }
      }
    }
  }

  // Update products with chemistry data
  console.log('\n🔗 Updating products with chemistry information...\n');
  
  let updatedCount = 0;
  for (const product of products) {
    const productId = product.id.toLowerCase();
    
    if (chemistryData[productId]) {
      product.chemistry = chemistryData[productId].chemistry;
      product.chemistryConfidence = chemistryData[productId].confidence;
      product.productType = chemistryData[productId].productType;
      product.chemistryIndicators = chemistryData[productId].indicators;
      product.chemistryDetails = chemistryData[productId].chemistryDetails;
      updatedCount++;
      console.log(`✅ ${product.id} → ${chemistryData[productId].chemistry} (${chemistryData[productId].confidence})`);
    }
  }

  // Write updated products
  fs.writeFileSync(mergedPath, JSON.stringify(products, null, 2));

  // Create chemistry summary
  const chemistrySummary = {
    totalProducts: products.length,
    productsWithChemistry: updatedCount,
    chemistryBreakdown: {},
    confidenceBreakdown: {},
    productTypeBreakdown: {},
    chemistryDefinitions
  };

  for (const product of products) {
    if (product.chemistry) {
      chemistrySummary.chemistryBreakdown[product.chemistry] = 
        (chemistrySummary.chemistryBreakdown[product.chemistry] || 0) + 1;
      
      chemistrySummary.confidenceBreakdown[product.chemistryConfidence] = 
        (chemistrySummary.confidenceBreakdown[product.chemistryConfidence] || 0) + 1;
      
      chemistrySummary.productTypeBreakdown[product.productType] = 
        (chemistrySummary.productTypeBreakdown[product.productType] || 0) + 1;
    }
  }

  fs.writeFileSync(
    path.join(root, 'src', 'data', 'chemistry-summary.json'), 
    JSON.stringify(chemistrySummary, null, 2)
  );

  console.log(`\n📊 Summary:`);
  console.log(`   • Total products: ${products.length}`);
  console.log(`   • Products with chemistry: ${updatedCount}`);
  console.log(`   • Chemistry types found: ${Object.keys(chemistrySummary.chemistryBreakdown).length}`);
  
  console.log(`\n📋 Chemistry Breakdown:`);
  for (const [chem, count] of Object.entries(chemistrySummary.chemistryBreakdown)) {
    console.log(`   • ${chem}: ${count} products`);
  }
  
  console.log(`\n📋 Product Types:`);
  for (const [type, count] of Object.entries(chemistrySummary.productTypeBreakdown)) {
    console.log(`   • ${type}: ${count} products`);
  }

  console.log(`\n📋 Files updated:`);
  console.log(`   • src/data/productsMerged.json`);
  console.log(`   • src/data/chemistry-summary.json`);
}

processTdsFiles().catch(console.error); 