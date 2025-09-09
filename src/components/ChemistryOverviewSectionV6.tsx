import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGradientMode } from '@/contexts/GradientModeContext';

interface ChemistryData {
  id: string;
  abbreviation: string;
  name: string;
  description: string;
  features: string[];
  products: string[];
  iconSrc: string;
}

const chemistryData: ChemistryData[] = [
  {
    id: 'acrylic',
    abbreviation: 'Ac',
    name: 'Acrylic',
    iconSrc: '/Chemistry%20Products%20Icons/acrylic%20icon.svg',
    description: 'Durable, UV Resistant, Flexible',
    features: [
      'Best for metals, glass, plastics, rubber',
      'High/low temperature tolerant',
      'Moisture, UV-resistant',
      'Quick handling & fast strength'
    ],
    products: ['ForzaTAPE T215', 'ForzaTAPE T220', 'ForzaTAPE T446']
  },
  {
    id: 'epoxy',
    abbreviation: 'Ep',
    name: 'Epoxy',
    iconSrc: '/Chemistry%20Products%20Icons/epoxy%20icon.svg',
    description: 'High Strength & Durability, Rigid, Excellent Chemical Resistance',
    features: [
      'Best for metals, composites, concrete, wood, plastics',
      'High/low temperatures, minimal flex',
      'Slow to moderate cure time'
    ],
    products: ['ForzaBOND R160']
  },
  {
    id: 'modified-epoxy',
    abbreviation: 'Mo',
    name: 'Modified Epoxy',
    iconSrc: '/Chemistry%20Products%20Icons/modified%20epoxy%20icon.svg',
    description: 'Combines Epoxy Strength, Improved Flexibility & Speed',
    features: [
      'Best for metals, composites needing more flexibility or peel strength'
    ],
    products: ['ForzaBOND R221', 'ForzaBOND R220']
  },
  {
    id: 'cyanoacrylates',
    abbreviation: 'Cy',
    name: 'Cyanoacrylates',
    iconSrc: '/Chemistry%20Products%20Icons/cyanoacrylates%20icon.svg',
    description: 'Instant Bond, High Strength, Precision Application',
    features: [
      'Fast-curing adhesives for immediate bonding',
      'Excellent for small, precise applications',
      'Works on plastics, rubber, metal, and ceramics'
    ],
    products: ['ForzaBOND CA100', 'ForzaBOND CA110']
  },
  {
    id: 'hot-melt',
    abbreviation: 'Ho',
    name: 'Hot Melt',
    iconSrc: '/Chemistry%20Products%20Icons/hotmelt%20icon.svg',
    description: 'Fast Setting, No VOCs, High Production',
    features: [
      'Fast-setting thermoplastic adhesives with instant bonds',
      'Great for high-speed production applications',
      'No solvents or VOCs for safer handling'
    ],
    products: ['ForzaBOND H500', 'ForzaBOND H510']
  },
  {
    id: 'methacrylate',
    abbreviation: 'Me',
    name: 'Methacrylate',
    iconSrc: '/Chemistry%20Products%20Icons/methacrylate%20icon.svg',
    description: 'High Performance, Structural, Temperature Resistant',
    features: [
      'Two-part structural adhesives for demanding applications',
      'Excellent temperature and chemical resistance',
      'Ideal for metal, composite, and plastic bonding'
    ],
    products: ['ForzaBOND M200', 'ForzaBOND M210']
  },
  {
    id: 'ms',
    abbreviation: 'Ms',
    name: 'MS',
    iconSrc: '/Chemistry%20Products%20Icons/ms%20icon.svg',
    description: 'Weatherproof, Flexible, Low VOC',
    features: [
      'Modified silane polymers for flexible, strong bonds',
      'Excellent weatherability with no off-gassing',
      'Good for many substrates including difficult surfaces'
    ],
    products: ['ForzaSEAL S330', 'ForzaSEAL S360']
  },
  {
    id: 'polyurethane',
    abbreviation: 'Po',
    name: 'Polyurethane',
    iconSrc: '/Chemistry%20Products%20Icons/polyurethane%20icon.svg',
    description: 'Abrasion Resistant, Impact Resistant, Paintable',
    features: [
      'Strong and elastic adhesives that handle movement',
      'Resist weather and moisture for flexible joints',
      'Ideal for structural bonding with movement'
    ],
    products: ['ForzaBOND P300', 'ForzaSEAL P310']
  },
  {
    id: 'silicone',
    abbreviation: 'Si',
    name: 'Silicone',
    iconSrc: '/Chemistry%20Products%20Icons/silicone%20icon.svg',
    description: 'Heat Resistant, Waterproof, Flexible',
    features: [
      'Extreme temperature stability from -65°F to 500°F',
      'Excellent UV, chemical, and weather resistance',
      'Ideal for sealing and waterproofing applications'
    ],
    products: ['ForzaSEAL S100', 'ForzaSEAL S110']
  },
  {
    id: 'solvent-based',
    abbreviation: 'So',
    name: 'Solvent Based',
    iconSrc: '/Chemistry%20Products%20Icons/solvent%20based%20icon.svg',
    description: 'Fast Drying, High Initial Tack, Versatile',
    features: [
      'Fast-drying polymer solutions for quick application',
      'Excellent initial tack for immediate hold',
      'Works on both flexible and rigid applications'
    ],
    products: ['ForzaCLEAN C400', 'ForzaPRIME P450']
  },
  {
    id: 'water-based',
    abbreviation: 'Wa',
    name: 'Water Based',
    iconSrc: '/Chemistry%20Products%20Icons/water%20based%20icon.svg',
    description: 'Environmentally Friendly, Quick Drying, Versatile',
    features: [
      'Non-toxic, water-based adhesives for a healthier environment',
      'Quick drying polymer solutions for immediate hold',
      'Works on a wide range of surfaces'
    ],
    products: ['ForzaCLEAN C400', 'ForzaPRIME P450']
  }
];

const ChemistryOverviewSectionV6: React.FC = () => {
  const [selectedChemistry, setSelectedChemistry] = useState<ChemistryData | null>(null);
  const [hoveredChemistry, setHoveredChemistry] = useState<string | null>(null);
  const { mode, getTextClasses } = useGradientMode();

  const handleChemistryClick = (chemistry: ChemistryData) => {
    setSelectedChemistry(chemistry);
  };

  const closePopup = () => {
    setSelectedChemistry(null);
  };

  return (
    <section className="w-full py-16 px-4 relative overflow-hidden bg-gradient-to-br from-[#F16022] via-[#E8551C] to-[#F16022]">
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-white text-center mb-12 font-kallisto leading-tight">
          Ideal Chemistry For Your<br className="hidden md:block" /> Specific Application
        </h2>
        
        {/* Chemistry Grid - Mobile Optimized 4-4-3 Layout */}
        <div className="max-w-7xl mx-auto">
          {/* First Row - 4 chemistry icons (2x2 on mobile) */}
          <div className="grid grid-cols-2 md:flex md:justify-center md:items-center gap-4 sm:gap-6 md:gap-12 lg:gap-16 mb-6 md:mb-12">
            {chemistryData.slice(0, 4).map((chemistry) => (
              <motion.div
                key={chemistry.id}
                className="flex flex-col items-center cursor-pointer group"
                onMouseEnter={() => setHoveredChemistry(chemistry.id)}
                onMouseLeave={() => setHoveredChemistry(null)}
                onClick={() => handleChemistryClick(chemistry)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Mobile Optimized SVG Icon */}
                <div className="relative mb-2 md:mb-6">
                  <motion.img 
                    src={chemistry.iconSrc} 
                    alt={chemistry.name} 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-36 md:h-36 lg:w-44 lg:h-44 object-contain drop-shadow-lg"
                    animate={{
                      filter: hoveredChemistry === chemistry.id 
                        ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.3)) brightness(1.1)' 
                        : 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                
                {/* Chemistry Name - Mobile Optimized */}
                <h3 className="text-white text-xs sm:text-sm md:text-xl lg:text-2xl font-bold text-center font-kallisto group-hover:text-yellow-200 transition-colors duration-300 leading-tight">
                  {chemistry.name}
                </h3>
              </motion.div>
            ))}
          </div>

          {/* Second Row - 4 chemistry icons (2x2 on mobile) */}
          <div className="grid grid-cols-2 md:flex md:justify-center md:items-center gap-4 sm:gap-6 md:gap-12 lg:gap-16 mb-6 md:mb-12">
            {chemistryData.slice(4, 8).map((chemistry) => (
              <motion.div
                key={chemistry.id}
                className="flex flex-col items-center cursor-pointer group"
                onMouseEnter={() => setHoveredChemistry(chemistry.id)}
                onMouseLeave={() => setHoveredChemistry(null)}
                onClick={() => handleChemistryClick(chemistry)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Mobile Optimized SVG Icon */}
                <div className="relative mb-2 md:mb-6">
                  <motion.img 
                    src={chemistry.iconSrc} 
                    alt={chemistry.name} 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-36 md:h-36 lg:w-44 lg:h-44 object-contain drop-shadow-lg"
                    animate={{
                      filter: hoveredChemistry === chemistry.id 
                        ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.3)) brightness(1.1)' 
                        : 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                
                {/* Chemistry Name - Mobile Optimized */}
                <h3 className="text-white text-xs sm:text-sm md:text-xl lg:text-2xl font-bold text-center font-kallisto group-hover:text-yellow-200 transition-colors duration-300 leading-tight">
                  {chemistry.name}
                </h3>
              </motion.div>
            ))}
          </div>

          {/* Third Row - 3 chemistry icons (2+1 on mobile, centered on desktop) */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-12 lg:gap-16">
            {chemistryData.slice(8, 11).map((chemistry) => (
              <motion.div
                key={chemistry.id}
                className="flex flex-col items-center cursor-pointer group"
                onMouseEnter={() => setHoveredChemistry(chemistry.id)}
                onMouseLeave={() => setHoveredChemistry(null)}
                onClick={() => handleChemistryClick(chemistry)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Mobile Optimized SVG Icon */}
                <div className="relative mb-2 md:mb-6">
                  <motion.img 
                    src={chemistry.iconSrc} 
                    alt={chemistry.name} 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-36 md:h-36 lg:w-44 lg:h-44 object-contain drop-shadow-lg"
                    animate={{
                      filter: hoveredChemistry === chemistry.id 
                        ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.3)) brightness(1.1)' 
                        : 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                
                {/* Chemistry Name - Mobile Optimized */}
                <h3 className="text-white text-xs sm:text-sm md:text-xl lg:text-2xl font-bold text-center font-kallisto group-hover:text-yellow-200 transition-colors duration-300 leading-tight">
                  {chemistry.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Popup */}
        <AnimatePresence>
          {selectedChemistry && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={closePopup}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full mx-4 relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closePopup}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>

                {/* Pure SVG Icon in popup */}
                <div className="flex justify-center mb-6">
                  <img 
                    src={selectedChemistry.iconSrc} 
                    alt={selectedChemistry.name} 
                    className="w-20 h-20 md:w-24 md:h-24 object-contain"
                  />
                </div>

                {/* Content */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl md:text-3xl font-black text-[#1B3764] mb-2 font-kallisto">
                    {selectedChemistry.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 font-semibold">
                    {selectedChemistry.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <ul className="text-sm md:text-base text-gray-700 list-disc list-inside text-left space-y-1">
                    {selectedChemistry.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {/* Products */}
                <div className="text-left">
                  <h4 className="font-bold text-[#1B3764] mb-2 text-base md:text-lg">Products</h4>
                  <div className="space-y-1">
                    {selectedChemistry.products.map((product, index) => (
                      <div key={index} className="text-sm md:text-base text-gray-700">
                        {product}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ChemistryOverviewSectionV6;
