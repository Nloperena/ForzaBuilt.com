import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGradientMode } from '@/contexts/GradientModeContext';

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
    iconSrc: '/Chemistry Icons/acrylic icon.svg',
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
    iconSrc: '/Chemistry Icons/epoxy icon.svg',
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
    iconSrc: '/Chemistry Icons/modified epoxy icon.svg',
    description: 'Combines Epoxy Strength, Improved Flexibility & Speed',
    features: [
      'Best for metals, composites needing more flexibility or peel strength'
    ],
  },
  {
    id: 'cyanoacrylates',
    abbreviation: 'Cy',
    name: 'Cyanoacrylates',
    iconSrc: '/Chemistry Icons/cyanoacrylates icon.svg',
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
    iconSrc: '/Chemistry Icons/hotmelt icon.svg',
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
    iconSrc: '/Chemistry Icons/methacrylate icon.svg',
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
    iconSrc: '/Chemistry Icons/ms icon.svg',
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
    iconSrc: '/Chemistry Icons/polyurethane icon.svg',
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
    iconSrc: '/Chemistry Icons/silicone icon.svg',
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
    iconSrc: '/Chemistry Icons/solvent based icon.svg',
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
    iconSrc: '/Chemistry Icons/water based icon.svg',
    description: 'Environmentally Friendly, Quick Drying, Versatile',
    features: [
      'Non-toxic, water-based adhesives for a healthier environment',
      'Quick drying polymer solutions for immediate hold',
      'Works on a wide range of surfaces'
    ],
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
    <section className="w-full relative overflow-hidden
                        py-[clamp(40px,6vw,96px)] px-[clamp(16px,4vw,48px)]
                        bg-gradient-to-bl from-[#477197] to-[#2c476e]">
      
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <h2
          className="font-poppins font-normal text-white text-center
                     text-[clamp(28px,6vw,56px)] md:text-[clamp(40px,4.5vw,64px)]
                     leading-[1.12] md:leading-[1.12]
                     mb-[clamp(18px,3.5vw,40px)]
                     [text-shadow:0_2px_8px_rgba(0,0,0,0.35)]">
          Ideal Chemistry For Your <br className="hidden md:block" />
          Specific Application
        </h2>
        
        {/* Chemistry Grid - Single responsive grid */}
        <div className="max-w-screen-2xl mx-auto">
          {/* First Row - 6 chemistry icons */}
          <div
            className="
              grid
              grid-cols-2 xs:grid-cols-3
              md:[grid-template-columns:repeat(6,minmax(9.5rem,1fr))]
              justify-items-center
              gap-x-[clamp(14px,3vw,28px)]
              gap-y-[clamp(18px,4vw,40px)]
              w-full
              mx-auto
              mb-[clamp(12px,3vw,32px)]
            "
          >
            {chemistryData.slice(0, 6).map((chemistry) => (
              <motion.div
                key={chemistry.id}
                className="group transition-transform duration-200 hover:-translate-y-1.5"
                onMouseEnter={() => setHoveredChemistry(chemistry.id)}
                onMouseLeave={() => setHoveredChemistry(null)}
                onClick={() => handleChemistryClick(chemistry)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                tabIndex={0}
              >
                <div className="flex flex-col items-center cursor-pointer
                                gap-[clamp(8px,1.6vw,20px)]">
                  <div className="relative">
                    <motion.img 
                      src={chemistry.iconSrc} 
                      alt={chemistry.name} 
                      className="
                        w-[clamp(5.5rem,9vw,13rem)]
                        h-[clamp(5.5rem,9vw,13rem)]
                        object-contain
                        drop-shadow-lg
                        group-hover:drop-shadow-[0_8px_20px_rgba(242,97,29,0.35)]
                        transition-shadow duration-300
                      "
                      animate={{
                        filter: hoveredChemistry === chemistry.id 
                          ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.3)) brightness(1.1)' 
                          : 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  
                  <h3
                    className="
                      font-poppins font-normal text-white text-center
                      text-[clamp(12px,1.6vw,20px)]
                      leading-[1.18] md:leading-[1.15]
                      sm:whitespace-nowrap
                      whitespace-normal
                      min-h-[2.2em] md:min-h-[2em]
                    "
                  >
                    {chemistry.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Second Row - 5 chemistry icons */}
          <div
            className="
              grid
              grid-cols-2 xs:grid-cols-3
              md:[grid-template-columns:repeat(5,minmax(9.5rem,1fr))]
              justify-items-center
              gap-x-[clamp(14px,3vw,28px)]
              gap-y-[clamp(18px,4vw,40px)]
              w-full
              md:max-w-[min(68rem,100%)]
              mx-auto
            "
          >
            {chemistryData.slice(6, 11).map((chemistry) => (
              <motion.div
                key={chemistry.id}
                className="group transition-transform duration-200 hover:-translate-y-1.5"
                onMouseEnter={() => setHoveredChemistry(chemistry.id)}
                onMouseLeave={() => setHoveredChemistry(null)}
                onClick={() => handleChemistryClick(chemistry)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                tabIndex={0}
              >
                <div className="flex flex-col items-center cursor-pointer
                                gap-[clamp(8px,1.6vw,20px)]">
                  <div className="relative">
                    <motion.img 
                      src={chemistry.iconSrc} 
                      alt={chemistry.name} 
                      className="
                        w-[clamp(5.5rem,9vw,13rem)]
                        h-[clamp(5.5rem,9vw,13rem)]
                        object-contain
                        drop-shadow-lg
                        group-hover:drop-shadow-[0_8px_20px_rgba(242,97,29,0.35)]
                        transition-shadow duration-300
                      "
                      animate={{
                        filter: hoveredChemistry === chemistry.id 
                          ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.3)) brightness(1.1)' 
                          : 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  
                  <h3
                    className="
                      font-poppins font-normal text-white text-center
                      text-[clamp(12px,1.6vw,20px)]
                      leading-[1.18] md:leading-[1.15]
                      sm:whitespace-nowrap
                      whitespace-normal
                      min-h-[2.2em] md:min-h-[2em]
                    "
                  >
                    {chemistry.name}
                  </h3>
                </div>
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
                  <h3 className="text-2xl md:text-3xl font-normal text-[#2c476e] mb-2 font-poppins">
                    {selectedChemistry.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 font-normal font-poppins">
                    {selectedChemistry.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <ul className="text-sm md:text-base text-gray-700 list-disc list-outside text-left space-y-1 font-poppins pl-5">
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
  );
};

export default ChemistryOverviewSectionV6;
