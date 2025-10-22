// Forza Brand Standards
// Based on the official brand kit for adhesives, tapes, and sealant solutions

export const brandColors = {
  primary: {
    regalBlue: {
      hex: '#115B87',
      rgb: '17, 91, 135',
      hsl: '207, 78%, 30%'
    },
    blazeOrange: {
      hex: '#F16022',
      rgb: '241, 96, 34',
      hsl: '16, 88%, 54%'
    }
  },
  secondary: {
    rustyNail: {
      hex: '#D35127',
      rgb: '211, 81, 39',
      hsl: '12, 69%, 49%'
    },
    blueVelvet: {
      hex: '#115B87',
      rgb: '17, 91, 135',
      hsl: '207, 78%, 30%'
    },
    slateGrey: {
      hex: '#BFBFBF',
      rgb: '191, 191, 191',
      hsl: '0, 0%, 75%'
    },
    ironGrey: {
      hex: '#F16022',
      rgb: '241, 96, 34',
      hsl: '16, 88%, 54%'
    },
    jetBlack: {
      hex: '#000000',
      rgb: '0, 0, 0',
      hsl: '0, 0%, 0%'
    }
  }
};

export const typography = {
  // Headings - Kallisto Heavy
  headings: {
    fontFamily: 'Kallisto, sans-serif',
    fontWeight: '900', // Heavy
    lineHeight: '1.1'
  },
  
  // Body Text - Poppins Regular
  body: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '400', // Regular
    lineHeight: '1.6'
  },
  
  // Subheads - Poppins Bold
  subheads: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '700', // Bold
    lineHeight: '1.3'
  },
  
  // Product Names - Kallisto Heavy
  products: {
    fontFamily: 'Kallisto, sans-serif',
    fontWeight: '900', // Heavy
    lineHeight: '1.1'
  }
};

// Industry-specific color mappings
export const industryColors = {
  industrial: {
    primary: '#f16a26', // Brand background
    secondary: '#f16a26',
    accent: brandColors.primary.blazeOrange.hex
  },
  marine: {
    primary: '#137875',
    secondary: '#137875',
    accent: brandColors.primary.blazeOrange.hex
  },
  transportation: {
    primary: '#b83d35',
    secondary: '#b83d35',
    accent: brandColors.primary.blazeOrange.hex
  },
  insulation: {
    primary: '#d0157d',
    secondary: '#d0157d',
    accent: brandColors.primary.blazeOrange.hex
  },
  construction: {
    primary: '#fec770',
    secondary: '#fec770',
    accent: brandColors.primary.blazeOrange.hex
  },
  composites: {
    primary: '#c7c8c9',
    secondary: '#c7c8c9',
    accent: brandColors.primary.blazeOrange.hex
  },
  // foam: {
  //   primary: '#7a6fb0', // Corrected typo
  //   secondary: '#7a6fb0',
  //   accent: brandColors.primary.blazeOrange.hex
  // }
};

// Product-specific colors
export const productColors = {
  bond: {
    primary: brandColors.primary.blazeOrange.hex,
    secondary: brandColors.primary.regalBlue.hex
  },
  seal: {
    primary: '#ffd600', // Yellow
    secondary: brandColors.primary.regalBlue.hex
  },
  tape: {
    primary: '#e53935', // Red
    secondary: brandColors.primary.regalBlue.hex
  },
  clean: {
    primary: brandColors.primary.regalBlue.hex,
    secondary: brandColors.secondary.slateGrey.hex
  },
  coat: {
    primary: brandColors.secondary.blueVelvet.hex,
    secondary: brandColors.primary.blazeOrange.hex
  }
};

// CSS Custom Properties for easy use
export const cssVariables = {
  '--forza-regal-blue': brandColors.primary.regalBlue.hex,
  '--forza-blaze-orange': brandColors.primary.blazeOrange.hex,
  '--forza-blue-velvet': brandColors.secondary.blueVelvet.hex,
  '--forza-rusty-nail': brandColors.secondary.rustyNail.hex,
  '--forza-slate-grey': brandColors.secondary.slateGrey.hex,
  '--forza-iron-grey': brandColors.secondary.ironGrey.hex,
  '--forza-jet-black': brandColors.secondary.jetBlack.hex,
  
  '--forza-font-heading': typography.headings.fontFamily,
  '--forza-font-body': typography.body.fontFamily,
  '--forza-font-subhead': typography.subheads.fontFamily,
  '--forza-font-product': typography.products.fontFamily,
  
  '--forza-weight-heavy': typography.headings.fontWeight,
  '--forza-weight-regular': typography.body.fontWeight,
  '--forza-weight-bold': typography.subheads.fontWeight
};

// Utility functions
export const getIndustryColors = (industry: string) => {
  const industryLower = industry.toLowerCase();
  return industryColors[industryLower as keyof typeof industryColors] || industryColors.industrial;
};

export const getProductColors = (product: string) => {
  return productColors[product as keyof typeof productColors] || productColors.bond;
};

// Dynamic gradient function for industry backgrounds
export const getIndustryGradient = (industry: string) => {
  // Cool grey-blue gradient colors
  const darkGreyBlue = '#293350'; // Dark grey-blue
  const mediumGreyBlue = '#3d4e6f'; // Medium grey-blue
  const lightGreyBlue = '#477197'; // Updated to new color
  // Gradient from dark to light grey-blue
  return `${darkGreyBlue} 0%, ${mediumGreyBlue} 50%, ${lightGreyBlue} 100%`;
};

// Alternative gradient with more subtle transition
export const getIndustryGradientSubtle = (industry: string) => {
  const industryColor = getIndustryColors(industry);
  const mainBlue = brandColors.secondary.blueVelvet.hex; // #1b3764 - Forza blue
  
  // 30% industry color, 70% Forza blue with subtle transition
  return `${mainBlue} 0%, ${mainBlue} 70%, ${industryColor.primary} 100%`;
};

// Helper function to convert hex to RGB
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? 
    `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : 
    hex;
};

// Gradient function for brochure sections - emphasizes industry color
export const getIndustryBrochureGradient = (industry: string) => {
  const industryColor = getIndustryColors(industry);
  const mainBlue = hexToRgb(brandColors.secondary.blueVelvet.hex); // #1b3764 -> rgb(27, 55, 100)
  const industryColorRgb = hexToRgb(industryColor.primary);
  
  // Debug logging
  console.log('getIndustryBrochureGradient Debug:', {
    industry,
    industryColor,
    mainBlue,
    industryColorRgb,
    result: `${mainBlue} 0%, ${mainBlue} 20%, ${industryColorRgb} 60%, ${industryColorRgb} 100%`
  });
  
  // Create gradient with strong contrast: industry color at bottom, blue at top
  return `${industryColorRgb} 0%, ${industryColorRgb} 30%, ${mainBlue} 100%`;
}; 