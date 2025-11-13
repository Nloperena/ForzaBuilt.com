import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGradientMode } from '@/contexts/GradientModeContext';
import ExperienceBetterBanner from '@/components/ExperienceBetterBanner';
import ChemistryPopupV2 from '@/components/ChemistryPopupV2';

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
  const [shouldStartTimer, setShouldStartTimer] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { mode, getTextClasses } = useGradientMode();

  useEffect(() => {
    // Cleanup timer on unmount
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (selectedChemistry) {
        setSelectedChemistry(null);
        setShouldStartTimer(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selectedChemistry]);

  const handleChemistryHover = (chemistry: ChemistryData | null) => {
    // Clear any existing hover timer
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }

    if (chemistry) {
      setHoveredChemistry(chemistry.id);
      setShouldStartTimer(false); // Don't start timer while hovering over an icon
      // Show modal after a short delay (e.g., 300ms) when switching chemistries
      hoverTimerRef.current = setTimeout(() => {
        setSelectedChemistry(chemistry);
      }, 300);
    } else {
      setHoveredChemistry(null);
      // Start timer when leaving the icon (only if modal is currently showing)
      if (selectedChemistry) {
        setShouldStartTimer(true);
      }
    }
  };

  const handleChemistryClick = (chemistry: ChemistryData) => {
    // Clear hover timer on click
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setSelectedChemistry(chemistry);
    setShouldStartTimer(false); // Don't auto-close on click
  };

  // Split chemistry data: 6 on top, 5 on bottom
  const topRowChemistries = chemistryData.slice(0, 6);
  const bottomRowChemistries = chemistryData.slice(6, 11);

  return (
    <>
      <ExperienceBetterBanner />
      <section className="w-full relative overflow-hidden
                        pt-5 sm:pt-6 md:pt-8 lg:pt-10
                        pb-3 sm:pb-4 md:pb-5 lg:pb-6
                        px-2 sm:px-4 md:px-6 lg:px-8
                        bg-gradient-to-bl from-[#477197] to-[#2c476e]">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2
          className="font-poppins font-normal text-white text-center leading-tight
                     mb-4 sm:mb-5 md:mb-6 lg:mb-8
                     [text-shadow:0_2px_8px_rgba(0,0,0,0.35)]"
          style={{ fontSize: 'clamp(28px, 2.5vw + 0.5rem, 56px)' }}
        >
          Product Chemistries
        </h2>
        
        {/* Top Row - 6 items */}
        <div className="flex justify-center items-center
                        gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6
                        w-full mb-3 sm:mb-4 md:mb-5
                        flex-wrap">
          {topRowChemistries.map((chemistry) => (
            <motion.div
              key={chemistry.id}
              className="group transition-transform duration-200 hover:-translate-y-1
                         flex-shrink-0
                         max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[180px] xl:max-w-[200px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              tabIndex={0}
              onClick={() => handleChemistryClick(chemistry)}
              onMouseEnter={() => handleChemistryHover(chemistry)}
              onMouseLeave={() => handleChemistryHover(null)}
            >
              <div className="flex flex-col items-center cursor-pointer p-1.5 sm:p-2 md:p-3
                              gap-1 sm:gap-1.5 md:gap-2">
                <div className="relative flex justify-center">
                  <motion.img 
                    src={chemistry.iconSrc} 
                    alt={chemistry.name} 
                    className="
                      w-9 h-9 sm:w-11 sm:h-11 md:w-16 md:h-16 lg:w-24 lg:h-24 xl:w-32 xl:h-32
                      object-contain
                      drop-shadow-lg
                      group-hover:drop-shadow-[0_4px_12px_rgba(242,97,29,0.4)]
                      transition-shadow duration-300
                    "
                    onMouseEnter={() => handleChemistryHover(chemistry)}
                    onMouseLeave={() => handleChemistryHover(null)}
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

        {/* Bottom Row - 5 items */}
        <div className="flex justify-center items-center
                        gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6
                        w-full mb-3 sm:mb-4 md:mb-5
                        flex-wrap">
          {bottomRowChemistries.map((chemistry) => (
            <motion.div
              key={chemistry.id}
              className="group transition-transform duration-200 hover:-translate-y-1
                         flex-shrink-0
                         max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[180px] xl:max-w-[200px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              tabIndex={0}
              onClick={() => handleChemistryClick(chemistry)}
              onMouseEnter={() => handleChemistryHover(chemistry)}
              onMouseLeave={() => handleChemistryHover(null)}
            >
              <div className="flex flex-col items-center cursor-pointer p-1.5 sm:p-2 md:p-3
                              gap-1 sm:gap-1.5 md:gap-2">
                <div className="relative flex justify-center">
                  <motion.img 
                    src={chemistry.iconSrc} 
                    alt={chemistry.name} 
                    className="
                      w-9 h-9 sm:w-11 sm:h-11 md:w-16 md:h-16 lg:w-24 lg:h-24 xl:w-32 xl:h-32
                      object-contain
                      drop-shadow-lg
                      group-hover:drop-shadow-[0_4px_12px_rgba(242,97,29,0.4)]
                      transition-shadow duration-300
                    "
                    onMouseEnter={() => handleChemistryHover(chemistry)}
                    onMouseLeave={() => handleChemistryHover(null)}
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

        {/* Chemistry Popup V2 - Rendered via Portal */}
        <ChemistryPopupV2 
          chemistry={selectedChemistry} 
          onClose={() => {
            setSelectedChemistry(null);
            setShouldStartTimer(false);
          }}
          autoCloseDelay={6000}
          shouldStartTimer={shouldStartTimer}
        />
      </div>
    </section>
    </>
  );
};

export default ChemistryOverviewSectionV7;

