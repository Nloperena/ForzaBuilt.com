const fs = require('fs');
const path = require('path');

// Path to the products data file
const productsFilePath = path.join(__dirname, '..', 'src', 'data', 'productsMerged.json');

// Chemistry types we want to use
const chemistryTypes = ['MS', 'Silicone', 'Epoxy', 'Water Base', 'Solvent Base', 'Hot Melt'];

// Chemistry details for each type
const chemistryDetails = {
  'MS': {
    technical: 'Modified silicone polymer chemistry offers excellent adhesion, flexibility and durability.'
  },
  'Silicone': {
    technical: 'Silicone-based chemistry provides superior temperature resistance and weatherability.'
  },
  'Epoxy': {
    technical: 'Two-component epoxy chemistry delivers exceptional strength and chemical resistance.'
  },
  'Water Base': {
    technical: 'Environmentally friendly water-based formulation with low VOCs and easy cleanup.'
  },
  'Solvent Base': {
    technical: 'Solvent-based chemistry provides fast drying time and excellent adhesion to difficult substrates.'
  },
  'Hot Melt': {
    technical: 'Thermoplastic adhesive that melts when heated and solidifies when cooled for rapid bonding.'
  }
};

// Function to assign chemistry based on product properties
function assignChemistry(product) {
  // Default chemistry assignment logic (this is simplified - you may want to improve it)
  
  // Based on product name
  const name = product.name.toLowerCase();
  
  if (name.includes('hybrid') || name.includes('polymer') || name.includes('ms ')) {
    return 'MS';
  }
  
  if (name.includes('silicone') || name.includes('sealant')) {
    return 'Silicone';
  }
  
  if (name.includes('epoxy') || name.includes('structural')) {
    return 'Epoxy';
  }
  
  if (name.includes('water') || name.includes('aqua')) {
    return 'Water Base';
  }
  
  if (name.includes('solvent') || name.includes('neoprene')) {
    return 'Solvent Base';
  }
  
  if (name.includes('hot melt') || name.includes('tape')) {
    return 'Hot Melt';
  }
  
  // Based on product category
  if (product.category) {
    const category = product.category.toLowerCase();
    
    if (category === 'tape') {
      return 'Hot Melt';
    }
    
    if (category === 'seal') {
      return Math.random() > 0.5 ? 'Silicone' : 'MS';
    }
    
    if (category === 'bond') {
      const options = ['Epoxy', 'Water Base', 'Solvent Base'];
      return options[Math.floor(Math.random() * options.length)];
    }
  }
  
  // If no match, assign randomly
  return chemistryTypes[Math.floor(Math.random() * chemistryTypes.length)];
}

// Main function to add chemistry data
function addChemistryData() {
  console.log('📊 Adding chemistry data to products...');
  
  try {
    // Read the products file
    const data = fs.readFileSync(productsFilePath, 'utf8');
    let products = JSON.parse(data);
    
    console.log(`Found ${products.length} products`);
    
    // Track how many products we update
    let updatedCount = 0;
    
    // Update each product
    products = products.map(product => {
      // Only update if chemistry is not already set
      if (!product.chemistry) {
        const chemistry = assignChemistry(product);
        product.chemistry = chemistry;
        product.chemistryDetails = chemistryDetails[chemistry];
        updatedCount++;
      }
      return product;
    });
    
    // Write the updated data back to the file
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
    
    console.log(`✅ Updated ${updatedCount} products with chemistry data`);
    console.log(`✅ Data saved to ${productsFilePath}`);
    
    // Print chemistry distribution
    const distribution = {};
    products.forEach(p => {
      distribution[p.chemistry] = (distribution[p.chemistry] || 0) + 1;
    });
    
    console.log('\n📊 Chemistry distribution:');
    Object.entries(distribution).forEach(([chem, count]) => {
      console.log(`  - ${chem}: ${count} products (${Math.round(count / products.length * 100)}%)`);
    });
    
  } catch (error) {
    console.error('❌ Error updating products:', error);
  }
}

// Run the function
addChemistryData();