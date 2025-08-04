#!/usr/bin/env node
/**
 * Merge chemistry data with PDF TDS as definitive source of truth
 * PDF results override pattern-based classifications
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const mergedPath = path.join(root, 'src', 'data', 'productsMerged.json');

async function mergeChemistryData() {
  console.log('🔬 Merging chemistry data with PDF TDS as definitive source...\n');

  const products = JSON.parse(fs.readFileSync(mergedPath, 'utf8'));
  let pdfOverrides = 0;
  let patternBased = 0;
  let noChemistry = 0;

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

  for (const product of products) {
    const hasPdfChemistry = product.chemistry && product.chemistryConfidence;
    const hasPatternChemistry = product.chemistry && !product.chemistryConfidence;

    if (hasPdfChemistry) {
      // PDF TDS data is definitive - keep it as is
      pdfOverrides++;
      console.log(`🔬 PDF: ${product.id} → ${product.chemistry} (${product.chemistryConfidence})`);
      
      // Add chemistry details if not already present
      if (!product.chemistryDetails && chemistryDefinitions[product.chemistry]) {
        product.chemistryDetails = chemistryDefinitions[product.chemistry];
      }
    } else if (hasPatternChemistry) {
      // Pattern-based data - mark as lower confidence
      patternBased++;
      product.chemistryConfidence = 'Low';
      product.chemistrySource = 'Pattern-based classification';
      console.log(`📊 Pattern: ${product.id} → ${product.chemistry} (Low confidence)`);
      
      // Add chemistry details
      if (chemistryDefinitions[product.chemistry]) {
        product.chemistryDetails = chemistryDefinitions[product.chemistry];
      }
    } else {
      // No chemistry data
      noChemistry++;
      product.chemistry = 'Unknown';
      product.chemistryConfidence = 'None';
      product.chemistrySource = 'No data available';
      console.log(`❓ Unknown: ${product.id} → No chemistry data`);
    }
  }

  // Write updated products
  fs.writeFileSync(mergedPath, JSON.stringify(products, null, 2));

  // Create final chemistry summary
  const chemistrySummary = {
    totalProducts: products.length,
    pdfDefinitive: pdfOverrides,
    patternBased: patternBased,
    noChemistry: noChemistry,
    chemistryBreakdown: {},
    confidenceBreakdown: {},
    productTypeBreakdown: {},
    chemistryDefinitions
  };

  for (const product of products) {
    if (product.chemistry && product.chemistry !== 'Unknown') {
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

  console.log(`\n📊 Final Summary:`);
  console.log(`   • Total products: ${products.length}`);
  console.log(`   • PDF definitive: ${pdfOverrides} products`);
  console.log(`   • Pattern-based: ${patternBased} products`);
  console.log(`   • No chemistry: ${noChemistry} products`);
  
  console.log(`\n📋 Chemistry Breakdown:`);
  for (const [chem, count] of Object.entries(chemistrySummary.chemistryBreakdown)) {
    console.log(`   • ${chem}: ${count} products`);
  }
  
  console.log(`\n📋 Confidence Levels:`);
  for (const [conf, count] of Object.entries(chemistrySummary.confidenceBreakdown)) {
    console.log(`   • ${conf}: ${count} products`);
  }

  console.log(`\n📋 Product Types:`);
  for (const [type, count] of Object.entries(chemistrySummary.productTypeBreakdown)) {
    console.log(`   • ${type}: ${count} products`);
  }

  console.log(`\n📋 Files updated:`);
  console.log(`   • src/data/productsMerged.json`);
  console.log(`   • src/data/chemistry-summary.json`);

  console.log(`\n✅ PDF TDS data is now the definitive source of truth!`);
}

mergeChemistryData().catch(console.error); 