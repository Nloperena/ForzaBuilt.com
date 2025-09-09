import { industrialDatasheet } from '../data/industrialDatasheet.js';

const OFFICIAL_INDUSTRIES = [
  'transportation',
  'marine', 
  'construction',
  'industrial',
  // 'foam',
  'composites',
  'insulation',
];

export const generateCurrentIndustryReport = () => {
  console.log('=== CURRENT INDUSTRY ASSIGNMENT REPORT ===\n');
  
  // Count products by current industry assignments
  const industryCounts: Record<string, number> = {};
  const multipleIndustryProducts: any[] = [];
  const singleIndustryProducts: any[] = [];
  
  industrialDatasheet.forEach(product => {
    // Count each industry
    product.industry.forEach(industry => {
      industryCounts[industry] = (industryCounts[industry] || 0) + 1;
    });
    
    // Categorize by number of industries
    if (product.industry.length > 1) {
      multipleIndustryProducts.push(product);
    } else {
      singleIndustryProducts.push(product);
    }
  });
  
  console.log(`Total Products: ${industrialDatasheet.length}`);
  console.log(`Products with Single Industry: ${singleIndustryProducts.length}`);
  console.log(`Products with Multiple Industries: ${multipleIndustryProducts.length}\n`);
  
  console.log('=== INDUSTRY COUNTS (including overlaps) ===');
  Object.entries(industryCounts)
    .sort(([,a], [,b]) => b - a)
    .forEach(([industry, count]) => {
      console.log(`${industry}: ${count} products`);
    });
  
  console.log('\n=== OFFICIAL INDUSTRIES ===');
  OFFICIAL_INDUSTRIES.forEach(industry => {
    const count = industryCounts[industry] || 0;
    console.log(`${industry}: ${count} products`);
  });
  
  console.log('\n=== NON-OFFICIAL INDUSTRIES FOUND ===');
  Object.entries(industryCounts)
    .filter(([industry]) => !OFFICIAL_INDUSTRIES.includes(industry))
    .sort(([,a], [,b]) => b - a)
    .forEach(([industry, count]) => {
      console.log(`${industry}: ${count} products`);
    });
  
  console.log('\n=== PRODUCTS WITH MULTIPLE INDUSTRIES ===');
  multipleIndustryProducts.forEach(product => {
    console.log(`${product.id}: ${product.name}`);
    console.log(`  Industries: [${product.industry.join(', ')}]`);
    console.log(`  Category: ${product.category}`);
    console.log('');
  });
  
  return {
    totalProducts: industrialDatasheet.length,
    singleIndustryProducts: singleIndustryProducts.length,
    multipleIndustryProducts: multipleIndustryProducts.length,
    industryCounts,
    multipleIndustryProductsList: multipleIndustryProducts
  };
};

// Run the report
if (typeof window === 'undefined') {
  generateCurrentIndustryReport();
} 