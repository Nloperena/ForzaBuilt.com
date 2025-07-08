import React, { useState } from 'react';

interface ConstructionProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  link: string;
}

const ConstructionProductSelection: React.FC = () => {
  console.log('ConstructionProductSelection component is rendering');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const constructionProducts: Record<string, ConstructionProduct> = {
    'C-OS55': {
      id: 'C-OS55',
      name: 'C-OS55 Hybrid Polymer',
      description: 'Single Component Cure, With Outstanding Adhesive/Sealing Properties',
      category: 'Sealants/Adhesives',
      image: 'https://forzabuilt.com/wp-content/uploads/2024/12/C-OS55-Sausage-n.png',
      link: 'https://forzabuilt.com/product/c-os55-hybrid-polymer-single-component-cure-with-oustanding-adhesive-sealing-properties/'
    },
    'TAC-OS74': {
      id: 'TAC-OS74',
      name: 'TAC-OS74 Ultra High-Strength',
      description: 'Hybrid Polymer Structural Adhesive',
      category: 'Structural Adhesive',
      image: 'https://forzabuilt.com/wp-content/uploads/2025/03/sausage-TAC-OS74.png',
      link: 'https://forzabuilt.com/product/tac-os74-ultra-high-strength-hybrid-polymer-structural-adhesive/'
    },
    'C-T564': {
      id: 'C-T564',
      name: 'C-T564 Double-Coated PE Foam Tape',
      description: 'Fixture Adhesive for Construction Applications',
      category: 'Fixture Adhesive',
      image: 'https://forzabuilt.com/wp-content/uploads/2024/12/C-T564-Tape-Mockup.png',
      link: 'https://forzabuilt.com/product/c-t564-double-coated-pe-foam-tape/'
    },
    'C-OS9': {
      id: 'C-OS9',
      name: 'C-OS9 Hybrid Polymer',
      description: 'Structural, Single-Part, Moisture Cure Adhesive',
      category: 'Moisture Cure Adhesive',
      image: 'https://forzabuilt.com/wp-content/uploads/2024/12/C-OS9-OS2-n.png',
      link: 'https://forzabuilt.com/product/c-os9-hybrid-polymer-structural-single-part-moisture-cure-adhesive/'
    }
  };

  const handlePolygonClick = (productId: string) => {
    setSelectedProduct(productId);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1b3764] mb-4 font-kallisto">
            Residential Construction Applications
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of construction adhesives and sealants designed for residential applications
          </p>
        </div>

        <div className="relative w-full max-w-6xl mx-auto">
          {/* Main construction image */}
          <div className="relative">
            <img
              src="https://images.ctfassets.net/hdznx4p7ef81/nYuZV4SPf3SBBn82l5jNj/e65d7da2e7268bf9655f5379ea46ec9b/House.png"
              alt="Construction House Interactive Map"
              className="w-full h-auto object-contain"
              onError={(e) => {
                console.error('Image failed to load:', e);
                // Fallback to original image if the new one fails
                const target = e.target as HTMLImageElement;
                target.src = "https://forzabuilt.com/wp-content/uploads/2025/02/Construction-House-Exploded-Graphic-Web.png";
              }}
            />

            {/* Interactive SVG overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-auto"
              viewBox="0 0 1280 1122.8"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Area 1 - Sealants/Adhesives (C-OS55) */}
              <polygon
                points="422,473 363,473 355,462 344,449 339,436 338,432 336,428 351,426 362,426 375,426 390,426 403,427 412,427 422,428 431,428 437,428 441,427 446,424 450,422 454,422 452,435 449,444 441,459 433,465 429,472 480,470 482,472 472,466 477,456 472,446 470,441 472,437 465,438 465,424 461,421 489,421 489,425 488,439 495,442 495,447 492,450 491,454 490,459 491,465 494,470 524,469 524,465 524,436 521,433 519,428 538,432 568,432 595,431 609,431 615,430 620,433 618,437 618,465 617,472 567,472 540,474 526,469"
                fill="rgba(255, 165, 0, 0.3)"
                stroke="rgba(255, 165, 0, 0.8)"
                strokeWidth="1"
                className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
                onClick={() => handlePolygonClick('C-OS55')}
              />
              
              {/* Area 2 - Structural Adhesive (TAC-OS74) */}
              <polygon
                points="963,290 963,297 962,304 943,304 944,457 967,457 968,465 1067,462 1072,460 1070,453 1090,453 1089,310 1076,310 1075,297"
                fill="rgba(255, 165, 0, 0.3)"
                stroke="rgba(255, 165, 0, 0.8)"
                strokeWidth="1"
                className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
                onClick={() => handlePolygonClick('TAC-OS74')}
              />
              
              {/* Area 3 - Roof/Structural */}
              <polygon
                points="932,728 942,733 927,735 737,680 737,630 800,644 808,645 861,639 890,644 888,649 888,654 931,662"
                fill="rgba(255, 165, 0, 0.3)"
                stroke="rgba(255, 165, 0, 0.8)"
                strokeWidth="1"
                className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
                onClick={() => handlePolygonClick('TAC-OS74')}
              />
              
              {/* Area 4 - Foundation */}
              <polygon
                points="950,753 929,759 929,869 892,1020 951,1001"
                fill="rgba(255, 165, 0, 0.3)"
                stroke="rgba(255, 165, 0, 0.8)"
                strokeWidth="1"
                className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
                onClick={() => handlePolygonClick('TAC-OS74')}
              />
              
              {/* Area 5 - Wall Assembly */}
              <polygon
                points="472,873 472,901 554,951 555,961 590,982 651,966 707,998 775,1012 789,1011 806,1011 860,1015 883,1006 887,981 877,987 877,992 873,993 873,987 843,975 788,1007 750,987 742,989 743,995 737,995 737,990 628,926 696,964 690,967 690,962 658,944 651,946 655,942 651,938 642,935 632,928 631,932 627,931 628,927 626,921 623,902 555,916 549,914"
                fill="rgba(255, 165, 0, 0.3)"
                stroke="rgba(255, 165, 0, 0.8)"
                strokeWidth="1"
                className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
                onClick={() => handlePolygonClick('TAC-OS74')}
              />
              
              {/* Area 6 - Window Frame */}
              <polygon
                points="498,729 498,880 471,864 472,873 498,888 504,887 504,734 528,743 528,903 549,916 549,908 533,899 533,737 508,728"
                fill="rgba(255, 165, 0, 0.3)"
                stroke="rgba(255, 165, 0, 0.8)"
                strokeWidth="1"
                className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
                onClick={() => handlePolygonClick('TAC-OS74')}
              />
              
              {/* Area 7 - Door Frame */}
              <polygon
                points="202,753 226,763 230,1002 216,987 213,786 202,778"
                fill="rgba(255, 165, 0, 0.3)"
                stroke="rgba(255, 165, 0, 0.8)"
                strokeWidth="1"
                className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
                onClick={() => handlePolygonClick('TAC-OS74')}
              />
              
              {/* Area 8 - Plumbing */}
              <polygon
                points="791,695 739,680 733,681 662,666 658,670 625,675 569,683 548,671 547,644 525,631 409,648 382,634 213,657 213,710 220,712 219,718 254,734 520,700 595,724"
                fill="rgba(255, 165, 0, 0.3)"
                stroke="rgba(255, 165, 0, 0.8)"
                strokeWidth="1"
                className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
                onClick={() => handlePolygonClick('TAC-OS74')}
              />
              
              {/* Area 9 - Electrical */}
              <polygon
                points="44,668 45,674 40,679 38,688 36,696 31,702 30,713 23,723 23,733 27,739 186,731 183,724 182,705 177,696 170,690 172,681 166,681 168,674 167,668 163,661 121,660 120,666 81,669 76,670 53,671"
                fill="rgba(255, 165, 0, 0.3)"
                stroke="rgba(255, 165, 0, 0.8)"
                strokeWidth="1"
                className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
                onClick={() => handlePolygonClick('TAC-OS74')}
              />
              
              {/* Area 10 - Fixture Adhesive (C-T564) */}
              <polygon
                points="549,420 533,420 531,418 530,377 533,373 562,374 563,378 562,416 562,420 578,420 577,376 580,374 608,374 610,378 610,418 608,418 558,420"
                fill="rgba(255, 165, 0, 0.3)"
                stroke="rgba(255, 165, 0, 0.8)"
                strokeWidth="1"
                className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
                onClick={() => handlePolygonClick('C-T564')}
              />
              
              {/* Area 11 - Moisture Cure Adhesive (C-OS9) */}
              <polygon
                points="454,126 448,130 448,135 454,139 461,142 469,141 475,139 477,132 471,127"
                fill="rgba(255, 165, 0, 0.3)"
                stroke="rgba(255, 165, 0, 0.8)"
                strokeWidth="1"
                className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
                onClick={() => handlePolygonClick('C-OS9')}
              />
              
              {/* Area 12 - Moisture Cure Adhesive (C-OS9) */}
              <polygon
                points="319,475 319,459 167,504 56,482 58,487 52,486 53,491 171,516 187,512 191,508 199,508"
                fill="rgba(255, 165, 0, 0.3)"
                stroke="rgba(255, 165, 0, 0.8)"
                strokeWidth="1"
                className="cursor-pointer hover:fill-orange-400/50 transition-colors duration-200"
                onClick={() => handlePolygonClick('C-OS9')}
              />
            </svg>
          </div>

          {/* Product Information Modal */}
          {selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 relative">
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                  ×
                </button>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <img 
                      src={constructionProducts[selectedProduct]?.image} 
                      alt={constructionProducts[selectedProduct]?.name}
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-blue-600 mb-2">
                      {constructionProducts[selectedProduct]?.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {constructionProducts[selectedProduct]?.description}
                    </p>
                    <p className="text-sm text-orange-600 font-medium mb-3">
                      {constructionProducts[selectedProduct]?.category}
                    </p>
                    <a 
                      href={constructionProducts[selectedProduct]?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-orange-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-orange-600 transition-colors"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ConstructionProductSelection; 