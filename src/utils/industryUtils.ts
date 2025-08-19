import { brandColors, productColors } from '@/styles/brandStandards';
import { industries } from '@/data/industries';

// Helper to get industry logo from navbar data
export const getIndustryLogo = (industry: string) => {
  const industryData = industries.find(ind => 
    ind.title.toLowerCase() === industry.toLowerCase()
  );
  return industryData?.logo || null;
};

// Brand colors for categories using official brand standards
export const getCategoryColor = (cat: string) => {
  switch (cat.toUpperCase()) {
    case 'BOND':
      return `from-[${productColors.bond.primary}] to-[${brandColors.secondary.rustyNailOrange.hex}]`;
    case 'SEAL':
      return `from-[${productColors.seal.primary}] to-[#f4c430]`;
    case 'TAPE':
      return 'from-[#d1181f] to-[#b3141a]'; // More vibrant red gradient
    default:
      return `from-[${brandColors.secondary.slateGrey.hex}] to-[${brandColors.secondary.ironGrey.hex}]`;
  }
};

// Industry colors using gradients with 70% blue and 30% industry color
export const getIndustryColor = (industry: string) => {
  const industryLower = industry.toLowerCase();
  const brandBlue = '#1b3764'; // Forza brand blue
  
  // Use gradients with 70% blue and 30% industry color
  switch (industryLower) {
    case 'marine':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#137875]`; // 70% blue, 30% Marine teal
    case 'industrial':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#f16a26]`; // 70% blue, 30% Industrial orange
    case 'transportation':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#b83d35]`; // 70% blue, 30% Transportation red
    case 'construction':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#fec770]`; // 70% blue, 30% Construction yellow
    case 'foam':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#7a6fb0]`; // 70% blue, 30% Foam purple
    case 'composites':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#c7c8c9]`; // 70% blue, 30% Composites gray
    case 'insulation':
      return `from-[${brandBlue}] via-[${brandBlue}] to-[#d0157d]`; // 70% blue, 30% Insulation pink
    default:
      return `from-[${brandBlue}] to-[${brandBlue}]`; // Default blue
  }
};
