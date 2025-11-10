import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGradientMode } from '@/contexts/GradientModeContext';
import ExperienceBetterBanner from '@/components/ExperienceBetterBanner';

interface ChemistryData {
  id: string;
  abbreviation: string;
  name: string;
  description: string;
  features: string[];
  iconSrc: string;
}

const chemistryData: ChemistryData[] = [
  {
    id: 'acrylic',
    abbreviation: 'Ac',
    name: 'Acrylic',
    iconSrc: '/images/icons/chemistry/Acrylic icon.svg',
    description: 'Durable, UV Resistant, Flexible',
    features: [
      'Best for metals, glass, plastics, rubber',
      'High/low temperature tolerant',
      'Moisture, UV-resistant',
      'Quick handling & fast strength'
    ]
  },
  {
    id: 'epoxy',
    abbreviation: 'Ep',
    name: 'Epoxy',
    iconSrc: '/images/icons/chemistry/Epoxy Icon.svg',
    description: 'High Strength & Durability, Rigid, Excellent Chemical Resistance',
    features: [
      'Best for metals, composites, concrete, wood, plastics',
      'High/low temperatures, minimal flex',
      'Slow to moderate cure time'
    ],
  },
  {
    id: 'modified-epoxy',
    abbreviation: 'Mo',
    name: 'Modified Epoxy',
    iconSrc: '/images/icons/chemistry/Modified Epoxy icon.svg',
    description: 'Combines Epoxy Strength, Improved Flexibility & Speed',
    features: [
      'Best for metals, composites needing more flexibility or peel strength'
    ],
  },
  {
    id: 'cyanoacrylates',
    abbreviation: 'Cy',
    name: 'Cyanoacrylates',
    iconSrc: '/images/icons/chemistry/Cyanoacrylates Icon.svg',
    description: 'Instant Bond, High Strength, Precision Application',
    features: [
      'Fast-curing adhesives for immediate bonding',
      'Excellent for small, precise applications',
      'Works on plastics, rubber, metal, and ceramics'
    ],
  },
  {
    id: 'hot-melt',
    abbreviation: 'Ho',
    name: 'Hot Melt',
    iconSrc: '/images/icons/chemistry/Hotmelt icon.svg',
    description: 'Fast Setting, No VOCs, High Production',
    features: [
      'Fast-setting thermoplastic adhesives with instant bonds',
      'Great for high-speed production applications',
      'No solvents or VOCs for safer handling'
    ],
  },
  {
    id: 'methacrylate',
    abbreviation: 'Me',
    name: 'Methacrylate',
    iconSrc: '/images/icons/chemistry/Methacrylate icon.svg',
    description: 'High Performance, Structural, Temperature Resistant',
    features: [
      'Two-part structural adhesives for demanding applications',
      'Excellent temperature and chemical resistance',
      'Ideal for metal, composite, and plastic bonding'
    ],
  },
  {
    id: 'ms',
    abbreviation: 'Ms',
    name: 'MS',
    iconSrc: '/images/icons/chemistry/MS icon.svg',
    description: 'Weatherproof, Flexible, Low VOC',
    features: [
      'Modified silane polymers for flexible, strong bonds',
      'Excellent weatherability with no off-gassing',
      'Good for many substrates including difficult surfaces'
    ],
  },
  {
    id: 'polyurethane',
    abbreviation: 'Po',
    name: 'Polyurethane',
    iconSrc: '/images/icons/chemistry/Polyurethane icon.svg',
    description: 'Abrasion Resistant, Impact Resistant, Paintable',
    features: [
      'Strong and elastic adhesives that handle movement',
      'Resist weather and moisture for flexible joints',
      'Ideal for structural bonding with movement'
    ],
  },
  {
    id: 'silicone',
    abbreviation: 'Si',
    name: 'Silicone',
    iconSrc: '/images/icons/chemistry/Silicone icon.svg',
    description: 'Heat Resistant, Waterproof, Flexible',
    features: [
      'Extreme temperature stability from -65°F to 500°F',
      'Excellent UV, chemical, and weather resistance',
      'Ideal for sealing and waterproofing applications'
    ],
  },
  {
    id: 'solvent-based',
    abbreviation: 'So',
    name: 'Solvent Based',
    iconSrc: '/images/icons/chemistry/Solvent Based icon.svg',
    description: 'Fast Drying, High Initial Tack, Versatile',
    features: [
      'Fast-drying polymer solutions for quick application',
      'Excellent initial tack for immediate hold',
      'Works on both flexible and rigid applications'
    ],
  },
  {
    id: 'water-based',
    abbreviation: 'Wa',
    name: 'Water Based',
    iconSrc: '/images/icons/chemistry/Water Based icon.svg',
    description: 'Environmentally Friendly, Quick Drying, Versatile',
    features: [
      'Non-toxic, water-based adhesives for a healthier environment',
      'Quick drying polymer solutions for immediate hold',
      'Works on a wide range of surfaces'
    ],
  }
];

const ChemistryOverviewSectionV7: React.FC = () => {
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
    <>
      <ExperienceBetterBanner />
      <section className="w-full relative overflow-hidden
                        pt-8 sm:pt-10 md:pt-12 lg:pt-16
                        pb-12 sm:pb-14 md:pb-16 lg:pb-20 xl:pb-24
                        px-2 sm:px-4 md:px-6 lg:px-8
                        bg-gradient-to-bl from-[#477197] to-[#2c476e]">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2
          className="font-poppins font-normal text-white text-center leading-tight
                     mb-6 sm:mb-8 md:mb-10 lg:mb-12
                     [text-shadow:0_2px_8px_rgba(0,0,0,0.35)]"
          style={{ fontSize: 'clamp(28px, 2.5vw + 0.5rem, 56px)' }}
        >
          Product Chemistries
        </h2>
        
        {/* Unified Chemistry Grid - Responsive across all sizes */}
        <div className="flex flex-wrap justify-center items-start
                        gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6
                        w-full mb-4 sm:mb-6 md:mb-8">
          {chemistryData.map((chemistry) => (
            <motion.div
              key={chemistry.id}
              className="group transition-transform duration-200 hover:-translate-y-1
                         flex-shrink-0
                         w-[22%] sm:w-[18%] md:w-[15%] lg:w-[15%] xl:w-[15%]
                         max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[180px] xl:max-w-[200px]"
              onMouseEnter={() => setHoveredChemistry(chemistry.id)}
              onMouseLeave={() => setHoveredChemistry(null)}
              onClick={() => handleChemistryClick(chemistry)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              tabIndex={0}
            >
              <div className="flex flex-col items-center cursor-pointer p-1.5 sm:p-2 md:p-3
                              gap-1 sm:gap-1.5 md:gap-2">
                <div className="relative">
                  <motion.img 
                    src={chemistry.iconSrc} 
                    alt={chemistry.name} 
                    className="
                      w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20
                      object-contain
                      drop-shadow-lg
                      group-hover:drop-shadow-[0_4px_12px_rgba(242,97,29,0.4)]
                      transition-shadow duration-300
                    "
                    animate={{
                      filter: hoveredChemistry === chemistry.id 
                        ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.3)) brightness(1.1)' 
                        : 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))'
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                
                <h3
                  className="
                    font-poppins font-normal text-white text-center
                    text-[10px] sm:text-xs md:text-sm lg:text-base
                    leading-tight
                    whitespace-normal
                    min-h-[2em] sm:min-h-[2.5em] md:min-h-[2.5em]
                    px-0.5
                  "
                >
                  {chemistry.name}
                </h3>
              </div>
            </motion.div>
          ))}
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
                className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 max-w-md w-full mx-4 relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closePopup}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 text-xl sm:text-2xl font-bold"
                >
                  ×
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-4 sm:mb-6">
                  <img 
                    src={selectedChemistry.iconSrc} 
                    alt={selectedChemistry.name} 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                  />
                </div>

                {/* Content */}
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-normal text-[#2c476e] mb-2 font-poppins">
                    {selectedChemistry.name}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 font-normal font-poppins">
                    {selectedChemistry.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-4 sm:mb-6">
                  <ul className="text-xs sm:text-sm md:text-base text-gray-700 list-disc list-outside text-left space-y-1 font-poppins pl-5">
                    {selectedChemistry.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
    </>
  );
};

export default ChemistryOverviewSectionV7;

