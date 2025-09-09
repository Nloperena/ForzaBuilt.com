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

export const getIndustrySummary = () => {
  const summary = {
    totalProducts: industrialDatasheet.length,
    productsWithMultipleIndustries: 0,
    productsWithSingleIndustry: 0,
    industryCounts: {} as Record<string, number>,
    nonOfficialIndustries: [] as string[],
    multipleIndustryExamples: [] as any[]
  };

  industrialDatasheet.forEach(product => {
    // Count by number of industries
    if (product.industry.length > 1) {
      summary.productsWithMultipleIndustries++;
      summary.multipleIndustryExamples.push({
        id: product.id,
        name: product.name,
        industries: product.industry,
        category: product.category
      });
    } else {
      summary.productsWithSingleIndustry++;
    }

    // Count each industry
    product.industry.forEach(industry => {
      summary.industryCounts[industry] = (summary.industryCounts[industry] || 0) + 1;
    });
  });

  // Find non-official industries
  Object.keys(summary.industryCounts).forEach(industry => {
    if (!OFFICIAL_INDUSTRIES.includes(industry)) {
      summary.nonOfficialIndustries.push(industry);
    }
  });

  return summary;
};

export const printIndustrySummary = () => {
  const summary = getIndustrySummary();
  
  console.log('=== INDUSTRY ASSIGNMENT SUMMARY ===');
  console.log(`Total Products: ${summary.totalProducts}`);
  console.log(`Products with Single Industry: ${summary.productsWithSingleIndustry}`);
  console.log(`Products with Multiple Industries: ${summary.productsWithMultipleIndustries}`);
  
  console.log('\n=== OFFICIAL INDUSTRY COUNTS ===');
  OFFICIAL_INDUSTRIES.forEach(industry => {
    const count = summary.industryCounts[industry] || 0;
    console.log(`${industry}: ${count} products`);
  });
  
  if (summary.nonOfficialIndustries.length > 0) {
    console.log('\n=== NON-OFFICIAL INDUSTRIES FOUND ===');
    summary.nonOfficialIndustries.forEach(industry => {
      const count = summary.industryCounts[industry];
      console.log(`${industry}: ${count} products`);
    });
  }
  
  console.log('\n=== SAMPLE MULTIPLE INDUSTRY PRODUCTS ===');
  summary.multipleIndustryExamples.slice(0, 10).forEach(product => {
    console.log(`${product.id}: ${product.name}`);
    console.log(`  Industries: [${product.industries.join(', ')}]`);
    console.log(`  Category: ${product.category}`);
  });
  
  if (summary.multipleIndustryExamples.length > 10) {
    console.log(`... and ${summary.multipleIndustryExamples.length - 10} more products with multiple industries`);
  }
}; 