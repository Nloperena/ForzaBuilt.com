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
      return 'from-[#F16022] to-[#D35127]'; // blazeOrange to rustyNail
    case 'SEAL':
      return 'from-[#ffd600] to-[#f4c430]'; // yellow gradient
    case 'TAPE':
      return 'from-[#d1181f] to-[#b3141a]'; // More vibrant red gradient
    default:
      return 'from-[#BFBFBF] to-[#F16022]'; // slateGrey to ironGrey (blazeOrange)
  }
};

// Industry colors using gradients with 70% blue and 30% industry color
export const getIndustryColor = (industry: string) => {
  const industryLower = industry.toLowerCase();
  
  // Use gradients with 70% blue and 30% industry color
  switch (industryLower) {
    case 'marine':
      return 'from-[#115B87] via-[#115B87] to-[#137875]'; // 70% blue, 30% Marine teal
    case 'industrial':
      return 'from-[#115B87] via-[#115B87] to-[#f16a26]'; // 70% blue, 30% Industrial orange
    case 'transportation':
      return 'from-[#115B87] via-[#115B87] to-[#b83d35]'; // 70% blue, 30% Transportation red
    case 'construction':
      return 'from-[#115B87] via-[#115B87] to-[#fec770]'; // 70% blue, 30% Construction yellow
    case 'foam':
      return 'from-[#115B87] via-[#115B87] to-[#7a6fb0]'; // 70% blue, 30% Foam purple
    case 'composites':
      return 'from-[#115B87] via-[#115B87] to-[#c7c8c9]'; // 70% blue, 30% Composites gray
    case 'insulation':
      return 'from-[#115B87] via-[#115B87] to-[#d0157d]'; // 70% blue, 30% Insulation pink
    default:
      return 'from-[#115B87] to-[#115B87]'; // Default blue
  }
};
