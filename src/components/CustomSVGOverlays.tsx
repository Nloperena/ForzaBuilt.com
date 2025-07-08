import React, { useState } from 'react';

// Marine Industry SVG Overlay
export const MarineSVGOverlay: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    {/* Marine-specific interactive elements */}
    <circle
      cx="30"
      cy="40"
      r="2"
      fill="rgba(255, 255, 255, 0.8)"
      className="animate-pulse"
    />
    <circle
      cx="70"
      cy="60"
      r="2"
      fill="rgba(255, 255, 255, 0.8)"
      className="animate-pulse"
    />
    <path
      d="M20 80 L80 80 L80 85 L20 85 Z"
      fill="rgba(0, 150, 255, 0.3)"
      stroke="rgba(0, 150, 255, 0.8)"
      strokeWidth="0.5"
    />
  </svg>
);

// Product information for construction industry
const constructionProducts = {
  'C-OS55': {
    name: 'C-OS55 Hybrid Polymer',
    description: 'Single Component Cure, With Outstanding Adhesive/Sealing Properties',
    category: 'Sealants/Adhesives',
    image: 'https://forzabuilt.com/wp-content/uploads/2024/12/C-OS55-Sausage-n.png'
  },
  'TAC-OS74': {
    name: 'TAC-OS74 Ultra High-Strength',
    description: 'Hybrid Polymer Structural Adhesive',
    category: 'Structural Adhesive',
    image: 'https://forzabuilt.com/wp-content/uploads/2025/03/sausage-TAC-OS74.png'
  },
  'C-T564': {
    name: 'C-T564 Double-Coated PE Foam Tape',
    description: 'Fixture Adhesive for Construction Applications',
    category: 'Fixture Adhesive',
    image: 'https://forzabuilt.com/wp-content/uploads/2024/12/C-T564-Tape-Mockup.png'
  },
  'C-OS9': {
    name: 'C-OS9 Hybrid Polymer',
    description: 'Structural, Single-Part, Moisture Cure Adhesive',
    category: 'Moisture Cure Adhesive',
    image: 'https://forzabuilt.com/wp-content/uploads/2024/12/C-OS9-OS2-n.png'
  }
};

// Construction Industry SVG Overlay
export const ConstructionSVGOverlay: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handlePolygonClick = (productId: string) => {
    setSelectedProduct(productId);
  };

  return (
    <div className="relative w-full h-full">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-auto"
        viewBox="0 0 1280 1122.8"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Construction-specific interactive elements based on the provided HTML */}
        
        {/* Area 1 - Sealants/Adhesives (C-OS55) */}
        <polygon
          points="422,473 363,473 355,462 344,449 339,436 338,432 336,428 351,426 362,426 375,426 390,426 403,427 412,427 422,428 431,428 437,428 441,427 446,424 450,422 454,422 452,435 449,444 441,459 433,465 429,472 480,470 482,472 472,466 477,456 472,446 470,441 472,437 465,438 465,424 461,421 489,421 489,425 488,439 495,442 495,447 492,450 491,454 490,459 491,465 494,470 524,469 524,465 524,436 521,433 519,428 538,432 568,432 595,431 609,431 615,430 620,433 618,437 618,465 617,472 567,472 540,474 526,469"
          fill="rgba(255, 165, 0, 0.3)"
          stroke="rgba(255, 165, 0, 0.8)"
          strokeWidth="1"
          className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
          data-product="C-OS55"
          onClick={() => handlePolygonClick('C-OS55')}
        />
        
        {/* Area 2 - Structural Adhesive (TAC-OS74) */}
        <polygon
          points="963,290 963,297 962,304 943,304 944,457 967,457 968,465 1067,462 1072,460 1070,453 1090,453 1089,310 1076,310 1075,297"
          fill="rgba(255, 165, 0, 0.3)"
          stroke="rgba(255, 165, 0, 0.8)"
          strokeWidth="1"
          className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
          data-product="TAC-OS74"
          onClick={() => handlePolygonClick('TAC-OS74')}
        />
        
        {/* Area 3 - Roof/Structural */}
        <polygon
          points="932,728 942,733 927,735 737,680 737,630 800,644 808,645 861,639 890,644 888,649 888,654 931,662"
          fill="rgba(255, 165, 0, 0.3)"
          stroke="rgba(255, 165, 0, 0.8)"
          strokeWidth="1"
          className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
          data-product="TAC-OS74"
          onClick={() => handlePolygonClick('TAC-OS74')}
        />
        
        {/* Area 4 - Foundation */}
        <polygon
          points="950,753 929,759 929,869 892,1020 951,1001"
          fill="rgba(255, 165, 0, 0.3)"
          stroke="rgba(255, 165, 0, 0.8)"
          strokeWidth="1"
          className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
          data-product="TAC-OS74"
          onClick={() => handlePolygonClick('TAC-OS74')}
        />
        
        {/* Area 5 - Wall Assembly */}
        <polygon
          points="472,873 472,901 554,951 555,961 590,982 651,966 707,998 775,1012 789,1011 806,1011 860,1015 883,1006 887,981 877,987 877,992 873,993 873,987 843,975 788,1007 750,987 742,989 743,995 737,995 737,990 628,926 696,964 690,967 690,962 658,944 651,946 655,942 651,938 642,935 632,928 631,932 627,931 628,927 626,921 623,902 555,916 549,914"
          fill="rgba(255, 165, 0, 0.3)"
          stroke="rgba(255, 165, 0, 0.8)"
          strokeWidth="1"
          className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
          data-product="TAC-OS74"
          onClick={() => handlePolygonClick('TAC-OS74')}
        />
        
        {/* Area 6 - Window Frame */}
        <polygon
          points="498,729 498,880 471,864 472,873 498,888 504,887 504,734 528,743 528,903 549,916 549,908 533,899 533,737 508,728"
          fill="rgba(255, 165, 0, 0.3)"
          stroke="rgba(255, 165, 0, 0.8)"
          strokeWidth="1"
          className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
          data-product="TAC-OS74"
          onClick={() => handlePolygonClick('TAC-OS74')}
        />
        
        {/* Area 7 - Door Frame */}
        <polygon
          points="202,753 226,763 230,1002 216,987 213,786 202,778"
          fill="rgba(255, 165, 0, 0.3)"
          stroke="rgba(255, 165, 0, 0.8)"
          strokeWidth="1"
          className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
          data-product="TAC-OS74"
          onClick={() => handlePolygonClick('TAC-OS74')}
        />
        
        {/* Area 8 - Plumbing */}
        <polygon
          points="791,695 739,680 733,681 662,666 658,670 625,675 569,683 548,671 547,644 525,631 409,648 382,634 213,657 213,710 220,712 219,718 254,734 520,700 595,724"
          fill="rgba(255, 165, 0, 0.3)"
          stroke="rgba(255, 165, 0, 0.8)"
          strokeWidth="1"
          className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
          data-product="TAC-OS74"
          onClick={() => handlePolygonClick('TAC-OS74')}
        />
        
        {/* Area 9 - Electrical */}
        <polygon
          points="44,668 45,674 40,679 38,688 36,696 31,702 30,713 23,723 23,733 27,739 186,731 183,724 182,705 177,696 170,690 172,681 166,681 168,674 167,668 163,661 121,660 120,666 81,669 76,670 53,671"
          fill="rgba(255, 165, 0, 0.3)"
          stroke="rgba(255, 165, 0, 0.8)"
          strokeWidth="1"
          className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
          data-product="TAC-OS74"
          onClick={() => handlePolygonClick('TAC-OS74')}
        />
        
        {/* Area 10 - Fixture Adhesive (C-T564) */}
        <polygon
          points="549,420 533,420 531,418 530,377 533,373 562,374 563,378 562,416 562,420 578,420 577,376 580,374 608,374 610,378 610,418 608,418 558,420"
          fill="rgba(255, 165, 0, 0.3)"
          stroke="rgba(255, 165, 0, 0.8)"
          strokeWidth="1"
          className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
          data-product="C-T564"
          onClick={() => handlePolygonClick('C-T564')}
        />
        
        {/* Area 11 - Moisture Cure Adhesive (C-OS9) */}
        <polygon
          points="454,126 448,130 448,135 454,139 461,142 469,141 475,139 477,132 471,127"
          fill="rgba(255, 165, 0, 0.3)"
          stroke="rgba(255, 165, 0, 0.8)"
          strokeWidth="1"
          className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
          data-product="C-OS9"
          onClick={() => handlePolygonClick('C-OS9')}
        />
        
        {/* Area 12 - Moisture Cure Adhesive (C-OS9) */}
        <polygon
          points="319,475 319,459 167,504 56,482 58,487 52,486 53,491 171,516 187,512 191,508 199,508"
          fill="rgba(255, 165, 0, 0.3)"
          stroke="rgba(255, 165, 0, 0.8)"
          strokeWidth="1"
          className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
          data-product="C-OS9"
          onClick={() => handlePolygonClick('C-OS9')}
        />
        
        {/* Product information tooltips */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Product Information Modal */}
      {selectedProduct && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <img 
              src={constructionProducts[selectedProduct as keyof typeof constructionProducts]?.image} 
              alt={constructionProducts[selectedProduct as keyof typeof constructionProducts]?.name}
              className="w-16 h-16 object-contain"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">
                {constructionProducts[selectedProduct as keyof typeof constructionProducts]?.name}
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                {constructionProducts[selectedProduct as keyof typeof constructionProducts]?.description}
              </p>
              <p className="text-xs text-blue-600 font-medium mt-1">
                {constructionProducts[selectedProduct as keyof typeof constructionProducts]?.category}
              </p>
            </div>
            <button
              onClick={() => setSelectedProduct(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Automotive Industry SVG Overlay
export const AutomotiveSVGOverlay: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    {/* Automotive-specific interactive elements */}
    <ellipse
      cx="30"
      cy="80"
      rx="8"
      ry="3"
      fill="rgba(0, 0, 0, 0.3)"
      stroke="rgba(0, 0, 0, 0.8)"
      strokeWidth="0.5"
    />
    <ellipse
      cx="70"
      cy="80"
      rx="8"
      ry="3"
      fill="rgba(0, 0, 0, 0.3)"
      stroke="rgba(0, 0, 0, 0.8)"
      strokeWidth="0.5"
    />
    <rect
      x="35"
      y="40"
      width="30"
      height="25"
      fill="rgba(255, 255, 255, 0.2)"
      stroke="rgba(255, 255, 255, 0.8)"
      strokeWidth="0.5"
    />
  </svg>
);

// Aerospace Industry SVG Overlay
export const AerospaceSVGOverlay: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    {/* Aerospace-specific interactive elements */}
    <path
      d="M20 50 L80 50 L80 55 L20 55 Z"
      fill="rgba(0, 150, 255, 0.3)"
      stroke="rgba(0, 150, 255, 0.8)"
      strokeWidth="0.5"
    />
    <circle
      cx="50"
      cy="30"
      r="5"
      fill="rgba(255, 255, 255, 0.8)"
      className="animate-pulse"
    />
    <path
      d="M40 70 L60 70 L60 75 L40 75 Z"
      fill="rgba(255, 255, 255, 0.3)"
      stroke="rgba(255, 255, 255, 0.8)"
      strokeWidth="0.5"
    />
  </svg>
);

// Manufacturing Industry SVG Overlay
export const ManufacturingSVGOverlay: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    {/* Manufacturing-specific interactive elements */}
    <rect
      x="20"
      y="20"
      width="25"
      height="30"
      fill="rgba(128, 128, 128, 0.3)"
      stroke="rgba(128, 128, 128, 0.8)"
      strokeWidth="0.5"
    />
    <rect
      x="55"
      y="30"
      width="20"
      height="25"
      fill="rgba(128, 128, 128, 0.3)"
      stroke="rgba(128, 128, 128, 0.8)"
      strokeWidth="0.5"
    />
    <circle
      cx="50"
      cy="70"
      r="4"
      fill="rgba(255, 255, 255, 0.9)"
      className="animate-pulse"
    />
  </svg>
);

// Energy Industry SVG Overlay
export const EnergySVGOverlay: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    {/* Energy-specific interactive elements */}
    <circle
      cx="50"
      cy="30"
      r="8"
      fill="rgba(255, 255, 0, 0.3)"
      stroke="rgba(255, 255, 0, 0.8)"
      strokeWidth="0.5"
    />
    <path
      d="M30 60 L70 60 L70 65 L30 65 Z"
      fill="rgba(255, 255, 255, 0.3)"
      stroke="rgba(255, 255, 255, 0.8)"
      strokeWidth="0.5"
    />
    <circle
      cx="25"
      cy="80"
      r="3"
      fill="rgba(255, 255, 255, 0.8)"
      className="animate-pulse"
    />
    <circle
      cx="75"
      cy="80"
      r="3"
      fill="rgba(255, 255, 255, 0.8)"
      className="animate-pulse"
    />
  </svg>
);

// Electronics Industry SVG Overlay
export const ElectronicsSVGOverlay: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    {/* Electronics-specific interactive elements */}
    <rect
      x="30"
      y="40"
      width="40"
      height="25"
      fill="rgba(0, 255, 0, 0.3)"
      stroke="rgba(0, 255, 0, 0.8)"
      strokeWidth="0.5"
    />
    <circle
      cx="40"
      cy="50"
      r="2"
      fill="rgba(255, 255, 255, 0.9)"
      className="animate-pulse"
    />
    <circle
      cx="60"
      cy="50"
      r="2"
      fill="rgba(255, 255, 255, 0.9)"
      className="animate-pulse"
    />
    <rect
      x="35"
      y="70"
      width="30"
      height="5"
      fill="rgba(255, 255, 255, 0.3)"
      stroke="rgba(255, 255, 255, 0.8)"
      strokeWidth="0.5"
    />
  </svg>
);

// Medical Industry SVG Overlay
export const MedicalSVGOverlay: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    {/* Medical-specific interactive elements */}
    <circle
      cx="50"
      cy="40"
      r="10"
      fill="rgba(255, 255, 255, 0.3)"
      stroke="rgba(255, 255, 255, 0.8)"
      strokeWidth="0.5"
    />
    <path
      d="M45 35 L55 35 L55 45 L45 45 Z"
      fill="rgba(255, 0, 0, 0.3)"
      stroke="rgba(255, 0, 0, 0.8)"
      strokeWidth="0.5"
    />
    <circle
      cx="30"
      cy="70"
      r="3"
      fill="rgba(255, 255, 255, 0.8)"
      className="animate-pulse"
    />
    <circle
      cx="70"
      cy="70"
      r="3"
      fill="rgba(255, 255, 255, 0.8)"
      className="animate-pulse"
    />
  </svg>
);

// Food & Beverage Industry SVG Overlay
export const FoodBeverageSVGOverlay: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    {/* Food & Beverage-specific interactive elements */}
    <rect
      x="25"
      y="30"
      width="20"
      height="30"
      fill="rgba(255, 255, 255, 0.3)"
      stroke="rgba(255, 255, 255, 0.8)"
      strokeWidth="0.5"
    />
    <rect
      x="55"
      y="40"
      width="20"
      height="25"
      fill="rgba(255, 255, 255, 0.3)"
      stroke="rgba(255, 255, 255, 0.8)"
      strokeWidth="0.5"
    />
    <circle
      cx="50"
      cy="75"
      r="4"
      fill="rgba(255, 255, 255, 0.9)"
      className="animate-pulse"
    />
  </svg>
);

// Generic SVG Overlay for any industry
export const GenericSVGOverlay: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    {/* Generic interactive elements */}
    <circle
      cx="30"
      cy="40"
      r="2"
      fill="rgba(255, 255, 255, 0.8)"
      className="animate-pulse"
    />
    <circle
      cx="70"
      cy="60"
      r="2"
      fill="rgba(255, 255, 255, 0.8)"
      className="animate-pulse"
    />
    <rect
      x="40"
      y="70"
      width="20"
      height="10"
      fill="rgba(255, 255, 255, 0.3)"
      stroke="rgba(255, 255, 255, 0.8)"
      strokeWidth="0.5"
    />
  </svg>
);

// Helper function to get the appropriate SVG overlay for an industry
export const getSVGOverlayForIndustry = (industry: string): React.FC => {
  const normalizedIndustry = industry.toLowerCase().replace(/\s+/g, '-');
  
  switch (normalizedIndustry) {
    case 'marine':
      return MarineSVGOverlay;
    case 'construction':
      return ConstructionSVGOverlay;
    case 'automotive':
      return AutomotiveSVGOverlay;
    case 'aerospace':
      return AerospaceSVGOverlay;
    case 'manufacturing':
      return ManufacturingSVGOverlay;
    case 'energy':
      return EnergySVGOverlay;
    case 'electronics':
      return ElectronicsSVGOverlay;
    case 'medical':
      return MedicalSVGOverlay;
    case 'food-beverage':
      return FoodBeverageSVGOverlay;
    default:
      return GenericSVGOverlay;
  }
}; 