export interface XRayConfig {
  preXrayImage: string;
  postXrayImage: string;
  customSVG?: React.ReactNode;
  altPreXray?: string;
  altPostXray?: string;
  customLabels?: {
    before?: string;
    after?: string;
    scrollInstruction?: string;
    completeText?: string;
  };
  wipeDirection?: 'ltr' | 'rtl' | 'ttb' | 'btt';
  height?: number;
  showInteractiveElements?: boolean;
}

export const xrayConfigs: Record<string, XRayConfig> = {
  // Marine Industry
  'marine': {
    preXrayImage: "https://images.ctfassets.net/hdznx4p7ef81/1AmgiwUCYVKuHYBzr0zVfi/d5ccc0c8a64e211d9cd50d656c64dbee/Boat-Pre-X-Ray__2_.png",
    postXrayImage: "https://images.ctfassets.net/hdznx4p7ef81/1kmvtrPRhchlnM3OMmLUZz/98dcbd7d34a19c38503536a8022e1e38/Boat-Pre-X-Ray2-transparent-2.png",
    altPreXray: "Marine vessel before X-ray inspection",
    altPostXray: "Marine vessel with interactive product overlay",
    customLabels: {
      before: "Before Inspection",
      after: "With Products",
      scrollInstruction: "Scroll to reveal products",
      completeText: "Inspection Complete!"
    },
    wipeDirection: 'btt',
    height: 700,
    showInteractiveElements: true
  },

  // Construction Industry
  'construction': {
    preXrayImage: "https://images.ctfassets.net/hdznx4p7ef81/nYuZV4SPf3SBBn82l5jNj/e65d7da2e7268bf9655f5379ea46ec9b/House.png",
    postXrayImage: "https://forzabuilt.com/wp-content/uploads/2025/02/Construction-House-Exploded-Graphic-Web.png",
    altPreXray: "Construction house before completion",
    altPostXray: "Construction house with Forza products overlay",
    customLabels: {
      before: "Before Construction",
      after: "With Forza Solutions",
      scrollInstruction: "Scroll to reveal solutions",
      completeText: "Construction Complete!"
    },
    wipeDirection: 'btt',
    height: 900,
    showInteractiveElements: true
  },

  // Architectural Industry
  'architectural': {
    preXrayImage: "https://images.ctfassets.net/hdznx4p7ef81/architectural-pre-xray.png",
    postXrayImage: "https://images.ctfassets.net/hdznx4p7ef81/architectural-post-xray.png",
    altPreXray: "Architectural design before implementation",
    altPostXray: "Architectural design with Forza products",
    customLabels: {
      before: "Design Phase",
      after: "Implementation",
      scrollInstruction: "Scroll to reveal implementation",
      completeText: "Design Complete!"
    },
    wipeDirection: 'rtl',
    height: 650,
    showInteractiveElements: true
  },

  // Manufacturing Industry
  'manufacturing': {
    preXrayImage: "https://images.ctfassets.net/hdznx4p7ef81/manufacturing-pre-xray.png",
    postXrayImage: "https://images.ctfassets.net/hdznx4p7ef81/manufacturing-post-xray.png",
    altPreXray: "Manufacturing facility before optimization",
    altPostXray: "Manufacturing facility with Forza solutions",
    customLabels: {
      before: "Before Optimization",
      after: "With Forza Solutions",
      scrollInstruction: "Scroll to reveal solutions",
      completeText: "Optimization Complete!"
    },
    wipeDirection: 'ttb',
    height: 600,
    showInteractiveElements: true
  },

  // Automotive Industry
  'automotive': {
    preXrayImage: "https://images.ctfassets.net/hdznx4p7ef81/automotive-pre-xray.png",
    postXrayImage: "https://images.ctfassets.net/hdznx4p7ef81/automotive-post-xray.png",
    altPreXray: "Automotive assembly before sealing",
    altPostXray: "Automotive assembly with Forza sealants",
    customLabels: {
      before: "Before Sealing",
      after: "With Forza Sealants",
      scrollInstruction: "Scroll to reveal sealants",
      completeText: "Sealing Complete!"
    },
    wipeDirection: 'btt',
    height: 700,
    showInteractiveElements: true
  },

  // Aerospace Industry
  'aerospace': {
    preXrayImage: "https://images.ctfassets.net/hdznx4p7ef81/aerospace-pre-xray.png",
    postXrayImage: "https://images.ctfassets.net/hdznx4p7ef81/aerospace-post-xray.png",
    altPreXray: "Aerospace components before treatment",
    altPostXray: "Aerospace components with Forza treatments",
    customLabels: {
      before: "Before Treatment",
      after: "With Forza Treatments",
      scrollInstruction: "Scroll to reveal treatments",
      completeText: "Treatment Complete!"
    },
    wipeDirection: 'ltr',
    height: 650,
    showInteractiveElements: true
  },

  // Energy Industry
  'energy': {
    preXrayImage: "https://images.ctfassets.net/hdznx4p7ef81/energy-pre-xray.png",
    postXrayImage: "https://images.ctfassets.net/hdznx4p7ef81/energy-post-xray.png",
    altPreXray: "Energy infrastructure before protection",
    altPostXray: "Energy infrastructure with Forza protection",
    customLabels: {
      before: "Before Protection",
      after: "With Forza Protection",
      scrollInstruction: "Scroll to reveal protection",
      completeText: "Protection Complete!"
    },
    wipeDirection: 'rtl',
    height: 600,
    showInteractiveElements: true
  },

  // Electronics Industry
  'electronics': {
    preXrayImage: "https://images.ctfassets.net/hdznx4p7ef81/electronics-pre-xray.png",
    postXrayImage: "https://images.ctfassets.net/hdznx4p7ef81/electronics-post-xray.png",
    altPreXray: "Electronics assembly before coating",
    altPostXray: "Electronics assembly with Forza coatings",
    customLabels: {
      before: "Before Coating",
      after: "With Forza Coatings",
      scrollInstruction: "Scroll to reveal coatings",
      completeText: "Coating Complete!"
    },
    wipeDirection: 'ttb',
    height: 600,
    showInteractiveElements: true
  },

  // Medical Industry
  'medical': {
    preXrayImage: "https://images.ctfassets.net/hdznx4p7ef81/medical-pre-xray.png",
    postXrayImage: "https://images.ctfassets.net/hdznx4p7ef81/medical-post-xray.png",
    altPreXray: "Medical device before sterilization",
    altPostXray: "Medical device with Forza sterilization",
    customLabels: {
      before: "Before Sterilization",
      after: "With Forza Sterilization",
      scrollInstruction: "Scroll to reveal sterilization",
      completeText: "Sterilization Complete!"
    },
    wipeDirection: 'btt',
    height: 650,
    showInteractiveElements: true
  },

  // Food & Beverage Industry
  'food-beverage': {
    preXrayImage: "https://images.ctfassets.net/hdznx4p7ef81/food-beverage-pre-xray.png",
    postXrayImage: "https://images.ctfassets.net/hdznx4p7ef81/food-beverage-post-xray.png",
    altPreXray: "Food processing facility before sanitization",
    altPostXray: "Food processing facility with Forza sanitization",
    customLabels: {
      before: "Before Sanitization",
      after: "With Forza Sanitization",
      scrollInstruction: "Scroll to reveal sanitization",
      completeText: "Sanitization Complete!"
    },
    wipeDirection: 'ltr',
    height: 600,
    showInteractiveElements: true
  }
};

// Helper function to get X-Ray config for an industry
export const getXRayConfig = (industry: string): XRayConfig | null => {
  const normalizedIndustry = industry.toLowerCase().replace(/\s+/g, '-');
  return xrayConfigs[normalizedIndustry] || null;
};

// Helper function to get all available industries
export const getAvailableIndustries = (): string[] => {
  return Object.keys(xrayConfigs);
};

// Default X-Ray config for fallback
export const defaultXRayConfig: XRayConfig = {
  preXrayImage: "https://images.ctfassets.net/hdznx4p7ef81/1AmgiwUCYVKuHYBzr0zVfi/d5ccc0c8a64e211d9cd50d656c64dbee/Boat-Pre-X-Ray__2_.png",
  postXrayImage: "https://images.ctfassets.net/hdznx4p7ef81/1kmvtrPRhchlnM3OMmLUZz/98dcbd7d34a19c38503536a8022e1e38/Boat-Pre-X-Ray2-transparent-2.png",
  altPreXray: "Before X-ray inspection",
  altPostXray: "After X-ray inspection",
  customLabels: {
    before: "Before",
    after: "After",
    scrollInstruction: "Scroll to reveal",
    completeText: "Complete!"
  },
  wipeDirection: 'btt',
  height: 600,
  showInteractiveElements: true
}; 