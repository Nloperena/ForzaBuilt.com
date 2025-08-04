#!/usr/bin/env node
/**
 * Extract chemistry information using existing data and file analysis
 * Uses the chemistry table from TDS directory and product patterns
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const tdsDir = path.join(root, 'public', 'TDS');
const mergedPath = path.join(root, 'src', 'data', 'productsMerged.json');

// Chemistry definitions based on Forza's official guide
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

// Product type patterns
const productTypePatterns = {
  'Tape': /^[Tt]\d+|[Tt][A-Z]+\d+|[Tt]ape|transfer|double.?sided|backing|carrier/i,
  'Adhesive': /^[Aa]\d+|[Aa]dhesive|bond|glue|cement/i,
  'Sealant': /^[Oo][Ss]\d+|[Oo][Ss][A-Z]+|sealant|seal|joint|gap|filler/i,
  'Coating': /^[Cc]\d+|[Cc]oating|paint|finish|protective/i,
  'Resin': /^[Rr]\d+|[Rr]esin|polymer|matrix|composite/i,
  'Canister': /^[Ii][Cc]\d+|[Cc]anister|cartridge|tube|dispenser/i
};

// Chemistry patterns based on product codes and names
const chemistryPatterns = {
  'Silicone': /^[Oo][Ss]|silicone|silicon|polysiloxane|silane|elastomeric/i,
  'Epoxy': /^[Ii][Cc]\d+|[Rr]\d+|epoxy|epoxies|amine|hardener|catalyst|resin/i,
  'Acrylic (incl. PSA)': /^[Tt]\d+|[Tt][A-Z]+\d+|acrylic|acrylate|psa|pressure.?sensitive|adhesive/i,
  'Modified Silane (MS Polymer/ Hybrid Polymer)': /^[Oo][Aa]\d+|modified.?silane|ms.?polymer|hybrid.?polymer|silyl/i,
  'Solvent Based': /^[Hh]\d+|solvent|organic.?solvent|volatile|evaporation/i,
  'Hot Melt': /^[Hh]\d+|hot.?melt|thermoplastic|melt|heat.?activated/i,
  'Water Based': /water.?based|aqueous|emulsion|latex|waterborne/i,
  'Polyurethane (PU)': /polyurethane|urethane|pu|isocyanate|polyol/i,
  'Cyanoacrylates': /cyanoacrylate|super.?glue|instant.?adhesive|ca/i,
  'Methacrylate/MMA': /methacrylate|mma|acrylic.?based|fast.?cure/i
};

function classifyProduct(productId, productName, category) {
  const id = productId.toLowerCase();
  const name = productName.toLowerCase();
  
  let chemistry = 'Unknown';
  let confidence = 'Low';
  let productType = 'Unknown';
  let indicators = [];

  // Determine product type
  for (const [type, pattern] of Object.entries(productTypePatterns)) {
    if (pattern.test(id) || pattern.test(name)) {
      productType = type;
      indicators.push(type.toLowerCase());
      break;
    }
  }

  // Determine chemistry
  for (const [chem, pattern] of Object.entries(chemistryPatterns)) {
    if (pattern.test(id) || pattern.test(name)) {
      chemistry = chem;
      confidence = 'Medium';
      indicators.push(chem.toLowerCase());
      break;
    }
  }

  // Special cases and refinements
  if (id.startsWith('ic') || id.startsWith('r')) {
    chemistry = 'Epoxy';
    confidence = 'High';
  }
  
  if (id.startsWith('os')) {
    chemistry = 'Silicone';
    confidence = 'High';
  }
  
  if (id.startsWith('t') && !id.startsWith('ta')) {
    chemistry = 'Acrylic (incl. PSA)';
    confidence = 'High';
    productType = 'Tape';
  }
  
  if (id.startsWith('oa')) {
    chemistry = 'Modified Silane (MS Polymer/ Hybrid Polymer)';
    confidence = 'High';
  }
  
  if (id.startsWith('h')) {
    chemistry = 'Solvent Based';
    confidence = 'High';
  }

  return {
    chemistry,
    confidence,
    productType,
    indicators,
    chemistryDetails: chemistryDefinitions[chemistry] || null
  };
}

async function processProducts() {
  console.log('🔍 Analyzing products for chemistry classification...\n');

  const products = JSON.parse(fs.readFileSync(mergedPath, 'utf8'));
  let updatedCount = 0;

  for (const product of products) {
    const classification = classifyProduct(product.id, product.name, product.category);
    
    if (classification.chemistry !== 'Unknown') {
      product.chemistry = classification.chemistry;
      product.chemistryConfidence = classification.confidence;
      product.productType = classification.productType;
      product.chemistryIndicators = classification.indicators;
      product.chemistryDetails = classification.chemistryDetails;
      updatedCount++;
      
      console.log(`✅ ${product.id} → ${classification.chemistry} (${classification.confidence})`);
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

processProducts().catch(console.error); 