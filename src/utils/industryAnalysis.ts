import { industrialDatasheet } from '../data/industrialDatasheet.js';

// Official industries in order
const OFFICIAL_INDUSTRIES = [
  'transportation',
  'marine', 
  'construction',
  'industrial',
  // 'foam',
  'composites',
  'insulation',
];

interface IndustryAnalysis {
  productId: string;
  productName: string;
  category: string;
  currentIndustries: string; // now a string
  suggestedPrimary: string;
  reasoning: string;
}

export const analyzeIndustryAssignments = (): IndustryAnalysis[] => {
  const analysis: IndustryAnalysis[] = [];
  
  industrialDatasheet.forEach(product => {
    const currentIndustries = product.industry;
    let suggestedPrimary = '';
    let reasoning = '';
    
    // Analysis logic based on product characteristics
    if (currentIndustries === 'marine') {
      suggestedPrimary = 'marine';
      reasoning = 'Marine-specific applications detected';
    } else if (currentIndustries === 'transportation') {
      suggestedPrimary = 'transportation';
      reasoning = 'Transportation/automotive applications detected';
    } else if (currentIndustries === 'construction') {
      suggestedPrimary = 'construction';
      reasoning = 'Construction applications detected';
    } else if (currentIndustries === 'industrial') {
      suggestedPrimary = 'industrial';
      reasoning = 'Industrial manufacturing applications detected';
    } else if (currentIndustries === 'composites') {
      suggestedPrimary = 'composites';
      reasoning = 'Composite material applications detected';
    } else if (currentIndustries === 'insulation') {
      suggestedPrimary = 'insulation';
      reasoning = 'Insulation applications detected';
    } else {
      suggestedPrimary = 'industrial';
      reasoning = 'Default to industrial for general use';
    }
    
    analysis.push({
      productId: product.id,
      productName: product.name,
      category: product.category,
      currentIndustries,
      suggestedPrimary,
      reasoning
    });
  });
  
  return analysis;
};

export const getProductsByCurrentIndustry = (industry: string) => {
  return industrialDatasheet.filter(product => 
    product.industry === industry
  );
};

export const getProductsWithMultipleIndustries = () => {
  // Now always returns empty, since industry is a string
  return [];
};

export const getProductsWithSingleIndustry = () => {
  return industrialDatasheet;
};

export const generateIndustryReport = () => {
  const analysis = analyzeIndustryAssignments();
  const multipleIndustryProducts: any[] = []; // always empty now
  const singleIndustryProducts = getProductsWithSingleIndustry();
  
  console.log('=== INDUSTRY ASSIGNMENT ANALYSIS ===');
  console.log(`Total products: ${industrialDatasheet.length}`);
  console.log(`Products with multiple industries: 0`);
  console.log(`Products with single industry: ${singleIndustryProducts.length}`);
  
  return {
    analysis,
    multipleIndustryProducts,
    singleIndustryProducts
  };
}; 