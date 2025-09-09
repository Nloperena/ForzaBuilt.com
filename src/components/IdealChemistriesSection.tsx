import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EdgeTrianglesBackground from './common/EdgeTrianglesBackground';
import { useGradientMode } from '@/contexts/GradientModeContext';

const CHEMISTRY_ICONS = {
  acrylic: '/Chemistry%20Products%20Icons/acrylic%20icon.svg',
  epoxy: '/Chemistry%20Products%20Icons/epoxy%20icon.svg',
  modifiedEpoxy: '/Chemistry%20Products%20Icons/modified%20epoxy%20icon.svg',
  polyurethane: '/Chemistry%20Products%20Icons/polyurethane%20icon.svg',
  ms: '/Chemistry%20Products%20Icons/ms%20icon.svg',
  silicone: '/Chemistry%20Products%20Icons/silicone%20icon.svg',
  hotMelt: '/Chemistry%20Products%20Icons/hotmelt%20icon.svg',
  solventBase: '/Chemistry%20Products%20Icons/solvent%20based%20icon.svg',
  waterBased: '/Chemistry%20Products%20Icons/water%20based%20icon.svg',
  cyanoacrylates: '/Chemistry%20Products%20Icons/cyanoacrylates%20icon.svg',
  methacrylate: '/Chemistry%20Products%20Icons/methacrylate%20icon.svg',
};

const chemistries = [
  {
    title: "Acrylic (incl. PSA)",
    iconSrc: CHEMISTRY_ICONS.acrylic,
    badges: ["Durable", "Good UV/Weather Resistance", "Flexible"],
    features: [
      "Best For metals, glass, plastics, rubber",
      "High/low temperature tolerant",
      "Moisture, UV-resistant",
      "Quick handling & fast strength"
    ],
    products: ["ForzaTAPE T215", "ForzaTAPE T220", "ForzaTAPE T446"]
  },
  {
    title: "Epoxy",
    iconSrc: CHEMISTRY_ICONS.epoxy,
    badges: ["High Strength & Durability", "Rigid", "Excellent Chemical Resistance"],
    features: [
      "Best for metals, composites, concrete, wood, plastics",
      "High/low temperatures, minimal flex",
      "Slow to moderate cure time"
    ],
    products: ["ForzaBOND R160"]
  },
  {
    title: "Modified Epoxies",
    iconSrc: CHEMISTRY_ICONS.modifiedEpoxy,
    badges: ["Combines Epoxy Strength", "Improved Flexibility & Speed"],
    features: [
      "Best for metals, composites needing more flexibility or peel strength"
    ],
    products: ["ForzaBOND R221", "ForzaBOND R220"]
  },
  {
    title: "MS Polymer",
    iconSrc: CHEMISTRY_ICONS.ms,
    badges: ["Weatherproof", "Flexible", "Low VOC"],
    features: [
      "Modified silane polymers for flexible, strong bonds",
      "Excellent weatherability with no off-gassing",
      "Good for many substrates including difficult surfaces"
    ],
    products: ["ForzaSEAL S330", "ForzaSEAL S360"]
  },
  {
    title: "Silicone",
    iconSrc: CHEMISTRY_ICONS.silicone,
    badges: ["Heat Resistant", "Waterproof", "Flexible"],
    features: [
      "Extreme temperature stability from -65°F to 500°F",
      "Excellent UV, chemical, and weather resistance",
      "Ideal for sealing and waterproofing applications"
    ],
    products: ["ForzaSEAL S100", "ForzaSEAL S110"]
  },
  {
    title: "Polyurethane",
    iconSrc: CHEMISTRY_ICONS.polyurethane,
    badges: ["Abrasion Resistant", "Impact Resistant", "Paintable"],
    features: [
      "Strong and elastic adhesives that handle movement",
      "Resist weather and moisture for flexible joints",
      "Ideal for structural bonding with movement"
    ],
    products: ["ForzaBOND P300", "ForzaSEAL P310"]
  },
  {
    title: "Hot Melt",
    iconSrc: CHEMISTRY_ICONS.hotMelt,
    badges: ["Fast Setting", "No VOCs", "High Production"],
    features: [
      "Fast-setting thermoplastic adhesives with instant bonds",
      "Great for high-speed production applications",
      "No solvents or VOCs for safer handling"
    ],
    products: ["ForzaBOND H500", "ForzaBOND H510"]
  },
  {
    title: "Solvent Based",
    iconSrc: CHEMISTRY_ICONS.solventBase,
    badges: ["Fast Drying", "High Initial Tack", "Versatile"],
    features: [
      "Fast-drying polymer solutions for quick application",
      "Excellent initial tack for immediate hold",
      "Works on both flexible and rigid applications"
    ],
    products: ["ForzaCLEAN C400", "ForzaPRIME P450"]
  },
  {
    title: "Cyanoacrylates",
    iconSrc: CHEMISTRY_ICONS.cyanoacrylates,
    badges: ["Instant Bond", "High Strength", "Precision Application"],
    features: [
      "Fast-curing adhesives for immediate bonding",
      "Excellent for small, precise applications",
      "Works on plastics, rubber, metal, and ceramics"
    ],
    products: ["ForzaBOND CA100", "ForzaBOND CA110"]
  },
  {
    title: "Methacrylate",
    iconSrc: CHEMISTRY_ICONS.methacrylate,
    badges: ["High Performance", "Structural", "Temperature Resistant"],
    features: [
      "Two-part structural adhesives for demanding applications",
      "Excellent temperature and chemical resistance",
      "Ideal for metal, composite, and plastic bonding"
    ],
    products: ["ForzaBOND M200", "ForzaBOND M210"]
  },
  {
    title: "Water Based",
    iconSrc: CHEMISTRY_ICONS.waterBased,
    badges: ["Environmentally Friendly", "Quick Drying", "Versatile"],
    features: [
      "Non-toxic, water-based adhesives for a healthier environment",
      "Quick drying polymer solutions for immediate hold",
      "Works on a wide range of surfaces"
    ],
    products: ["ForzaCLEAN C400", "ForzaPRIME P450"]
  }
];

const IdealChemistriesSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(0);
  const { mode, getGradientClasses, getTextClasses, getTextSecondaryClasses } = useGradientMode();
  
  // Show 3 cards at a time on desktop, 1 on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const cardsToShow = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, chemistries.length - cardsToShow);

  const handlePrev = () => {
    if (isAnimating || currentIndex <= 0) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex(prev => Math.max(0, prev - 1));
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handleNext = () => {
    if (isAnimating || currentIndex >= maxIndex) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
    setTimeout(() => setIsAnimating(false), 800);
  };

  const visibleChemistries = chemistries.slice(currentIndex, currentIndex + cardsToShow);

  return (
    <section className={`w-full py-16 px-2 md:px-0 relative overflow-hidden ${
      mode === 'light' || mode === 'light2'
        ? 'bg-white'
        : 'bg-gradient-to-b from-[#115B87] to-[#1B3764]'
    }`} style={{
      backgroundColor: mode === 'light' || mode === 'light2' ? '#ffffff' : undefined,
      background: mode === 'light' || mode === 'light2' ? '#ffffff' : 'linear-gradient(to bottom, #115B87, #1B3764)'
    }}>
      {/* Edge Triangles Background */}
      <EdgeTrianglesBackground 
        leftImage="/Gradients and Triangles/Small Science Triangles 2.png"
        rightImage="/Gradients and Triangles/Small Science Triangles.png"
        opacity={0.6}
        scale={0.8}
        leftRotation={45}
        rightRotation={315}
        leftFlipH={false}
        rightFlipV={true}
        blendMode="overlay"
      />
      
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <h2 className={`text-4xl md:text-6xl font-black ${getTextClasses()} text-center mb-12 font-kallisto leading-tight`}>
          Ideal Chemistry For Your<br className="hidden md:block" /> Specific Application
        </h2>
        
        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button 
            onClick={handlePrev} 
            disabled={currentIndex <= 0 || isAnimating} 
            className={`${getTextSecondaryClasses()} hover:${getTextClasses()} text-2xl sm:text-3xl px-2 py-1 disabled:opacity-30 transition-all duration-200`}
          >
            &#8592;
          </button>
          
          {/* Cards Container */}
          <div className="relative w-full max-w-7xl overflow-hidden">
            <div className="flex gap-4 sm:gap-6 md:gap-8 justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                {visibleChemistries.map((chem, idx) => (
                  <motion.div
                    key={`${currentIndex}-${chem.title}-${idx}`}
                    custom={direction}
                                         initial={{ 
                       x: direction > 0 ? 300 : -300, 
                       opacity: 0
                     }}
                     animate={{ 
                       x: 0, 
                       opacity: 1,
                       transition: {
                         delay: idx * 0.15,
                         duration: 0.5,
                         ease: "easeOut"
                       }
                     }}
                     exit={{ 
                       x: direction > 0 ? -300 : 300, 
                       opacity: 0,
                       transition: {
                         delay: (visibleChemistries.length - 1 - idx) * 0.1,
                         duration: 0.4,
                         ease: "easeIn"
                       }
                     }}
                    className={`rounded-2xl sm:rounded-3xl border ${
                      mode === 'light' || mode === 'light2' ? 'border-gray-200/50 hover:border-gray-300' : 'border-white/20 hover:border-white/30'
                    } p-4 sm:p-6 md:p-8 flex flex-col items-center shadow-lg sm:shadow-2xl transition-all duration-300 hover:scale-105 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] ${
                      mode === 'light' || mode === 'light2' ? 'bg-white/90' : 'bg-white/10'
                    }`}
                    style={{
                      background: mode === 'light' || mode === 'light2' 
                        ? 'linear-gradient(to bottom, #1B3764 0%, #115B87 100%)'
                        : 'linear-gradient(to bottom, #1B3764 0%, #115B87 100%)',
                      boxShadow: mode === 'light' || mode === 'light2' 
                        ? '0 4px 12px rgba(0, 0, 0, 0.1)' 
                        : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                  >
                    {/* Icon */}
                    <div className="mb-4 sm:mb-6">
                      <img src={chem.iconSrc} alt={chem.title} className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 object-contain" />
                    </div>
                    
                    {/* Name */}
                    <h3 className="text-lg sm:text-xl md:text-2xl font-black text-center mb-3 sm:mb-4 font-kallisto text-white">{chem.title}</h3>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 sm:gap-2 justify-center mb-3 sm:mb-4">
                      {chem.badges.map(tag => (
                        <span key={tag} className="text-xs font-semibold px-2 sm:px-3 py-1 rounded-full bg-white/20 text-white">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Description */}
                    <ul className="text-xs sm:text-sm mb-4 sm:mb-6 list-disc list-inside text-left text-white/90">
                      {chem.features.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                    
                    {/* Products */}
                    <div className="w-full text-left mb-3 sm:mb-4">
                      <span className="block font-bold mb-1 text-sm sm:text-base text-white">Products</span>
                      {chem.products.map(prod => (
                        <div key={prod} className="text-xs sm:text-sm text-white/90">{prod}</div>
                      ))}
                    </div>
                    
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          <button 
            onClick={handleNext} 
            disabled={currentIndex >= maxIndex || isAnimating} 
            className={`${getTextSecondaryClasses()} hover:${getTextClasses()} text-2xl sm:text-3xl px-2 py-1 disabled:opacity-30 transition-all duration-200`}
          >
            &#8594;
          </button>
        </div>
        
        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => { 
                if (isAnimating) return;
                setDirection(i > currentIndex ? 1 : -1); 
                setCurrentIndex(i); 
              }}
              disabled={isAnimating}
              className={`w-3 h-3 rounded-full transition-all disabled:opacity-50 ${
                i === currentIndex ? 'bg-[#F16022] scale-125' : 'bg-white/30'
              }`}
              aria-label={`Go to page ${i + 1}`}
              animate={{ 
                scale: i === currentIndex ? 1.25 : 1, 
                backgroundColor: i === currentIndex ? '#F16022' : 'rgba(255,255,255,0.3)' 
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IdealChemistriesSection;
