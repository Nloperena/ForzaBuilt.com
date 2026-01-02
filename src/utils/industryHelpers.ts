import { industries } from '../data/industries';

// Chemistry icon paths - using organized chemistry icons
export const CHEMISTRY_ICONS = {
  'Acrylic (incl. PSA)': '/images/icons/chemistry/Acrylic icon.svg',
  'Epoxy': '/images/icons/chemistry/Epoxy Icon.svg',
  'Modified Epoxy': '/images/icons/chemistry/Modified Epoxy icon.svg',
  'Silicone': '/images/icons/chemistry/Silicone icon.svg',
  'MS': '/images/icons/chemistry/MS icon.svg',
  'Water Base': '/images/icons/chemistry/Water Based icon.svg',
  'Hotmelt': '/images/icons/chemistry/Hotmelt icon.svg',
  'Solvent Base': '/images/icons/chemistry/Solvent Based icon.svg',
  'Polyurethane (PU)': '/images/icons/chemistry/Polyurethane icon.svg',
  'Cyanoacrylates': '/images/icons/chemistry/Cyanoacrylates Icon.svg',
  'Methacrylate/MMA': '/images/icons/chemistry/Methacrylate icon.svg',
  'Rubber Based': '/images/icons/chemistry/rubber based icon.svg'
};

// Helper to get industry logo from navbar data
export const getIndustryLogo = (industry: string | string[]) => {
  // Handle both string and array inputs - use first industry if array
  const industryStr = Array.isArray(industry) ? industry[0] || '' : industry;
  const industryData = industries.find(ind => 
    ind.title.toLowerCase() === industryStr.toLowerCase()
  );
  return industryData?.logo || null;
};

// Helper to get just the industry color hex value
export const getIndustryColorHex = (industry: string | string[]) => {
  // Handle both string and array inputs - use first industry if array
  const industryStr = Array.isArray(industry) ? industry[0] || '' : industry;
  const industryLower = industryStr.toLowerCase();
  
  switch (industryLower) {
    case 'marine':
      return '#137875'; // Marine teal
    case 'industrial':
      return '#f16a26'; // Industrial orange
    case 'transportation':
      return '#b83d35'; // Transportation red
    case 'construction':
      return '#fec770'; // Construction yellow
    case 'composites':
      return '#9a9b9c'; // Composites gray
    case 'insulation':
      return '#d0157d'; // Insulation pink
    case 'foam':
      return '#f16a26'; // Foam orange (same as industrial)
    default:
      return '#1b3764'; // Default brand blue
  }
};

// Helper to convert text to title case
export const toTitleCase = (str: string) => {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

// Helper to format product names: product code in ALL CAPS, rest in title case
export const formatProductName = (str: string) => {
  if (!str) return '';
  
  // Match product code pattern at the start (e.g., "IC932", "CA1000", "FRP", etc.)
  // Product codes are typically alphanumeric, may include dashes, and are followed by a dash or space
  const productCodeMatch = str.match(/^([A-Z0-9]+(?:-[A-Z0-9]+)*)\s*[-–—]\s*(.+)$/i);
  
  if (productCodeMatch) {
    // If we have a product code followed by a dash and description
    const productCode = productCodeMatch[1].toUpperCase();
    const description = toTitleCase(productCodeMatch[2]);
    return `${productCode} - ${description}`;
  }
  
  // Check if it starts with a product code pattern without a dash (e.g., "IC932 Non Flammable")
  const codeOnlyMatch = str.match(/^([A-Z0-9]+(?:-[A-Z0-9]+)*)\s+(.+)$/i);
  if (codeOnlyMatch) {
    const productCode = codeOnlyMatch[1].toUpperCase();
    const description = toTitleCase(codeOnlyMatch[2]);
    return `${productCode} ${description}`;
  }
  
  // If no product code pattern found, just apply title case to the whole string
  return toTitleCase(str);
};

