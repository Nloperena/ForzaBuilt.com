import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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

const CARDS_PER_PAGE = 3;

const cardVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.96,
  }),
  center: (i) => ({
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  }),
  exit: (direction) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  }),
};

const IdealChemistriesSection: React.FC = () => {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const totalPages = Math.ceil(chemistries.length / CARDS_PER_PAGE);

  const handlePrev = () => {
    setDirection(-1);
    setPage((p) => Math.max(0, p - 1));
  };
  const handleNext = () => {
    setDirection(1);
    setPage((p) => Math.min(totalPages - 1, p + 1));
  };

  // Responsive: 1 card on mobile, 3 on desktop
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const cardsPerPage = isMobile ? 1 : CARDS_PER_PAGE;
  const startIdx = page * cardsPerPage;
  const visibleChemistries = chemistries.slice(startIdx, startIdx + cardsPerPage);

  return (
    <section className="w-full bg-[#196b8c] py-16 px-2 md:px-0">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-white text-center mb-12 font-kallisto leading-tight">
          Ideal Chemistry For Your<br className="hidden md:block" /> Specific Application
        </h2>
        <div className="flex items-center justify-center gap-4 mb-8">
          <button onClick={handlePrev} disabled={page === 0} className="hidden md:inline text-white/70 hover:text-white text-3xl px-2 py-1 disabled:opacity-30">&#8592;</button>
          <div className="relative w-full max-w-7xl flex items-center justify-center overflow-visible">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={page}
                className={`grid grid-cols-1 md:grid-cols-3 gap-8 w-full`}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                variants={{}}
                transition={{ staggerChildren: 0.08 }}
              >
                {visibleChemistries.map((chem, idx) => (
                  <motion.div
                    key={chem.title}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: 'spring', stiffness: 200, damping: 20, delay: idx * 0.08 }}
                    className="bg-[#23648A] rounded-3xl border border-white/20 p-6 sm:p-8 flex flex-col items-center shadow-xl transition-transform hover:scale-105"
                  >
                    {/* Icon */}
                    <div className="mb-6">
                      <img src={chem.iconSrc} alt={chem.title} className="w-24 h-24 object-contain" />
                    </div>
                    {/* Name */}
                    <h3 className="text-2xl font-black text-white text-center mb-4 font-kallisto">{chem.title}</h3>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {chem.badges.map(tag => (
                        <span key={tag} className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* Description */}
                    <ul className="text-white/90 text-sm mb-6 list-disc list-inside text-center">
                      {chem.features.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                    {/* Products */}
                    <div className="w-full text-left mb-4">
                      <span className="block text-white font-bold mb-1">Products</span>
                      {chem.products.map(prod => (
                        <div key={prod} className="text-white/90 text-sm">{prod}</div>
                      ))}
                    </div>
                    {/* Button */}
                    <button className="mt-auto bg-[#F16022] hover:bg-[#e55b1c] text-white font-bold rounded-full px-6 py-2 text-base transition-colors">
                      See Products
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <button onClick={handleNext} disabled={page === totalPages - 1} className="hidden md:inline text-white/70 hover:text-white text-3xl px-2 py-1 disabled:opacity-30">&#8594;</button>
        </div>
        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => { setDirection(i > page ? 1 : -1); setPage(i); }}
              className={`w-3 h-3 rounded-full ${i === page ? 'bg-[#F16022] scale-125' : 'bg-white/30'} transition-all`}
              aria-label={`Go to page ${i + 1}`}
              animate={{ scale: i === page ? 1.25 : 1, backgroundColor: i === page ? '#F16022' : 'rgba(255,255,255,0.3)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IdealChemistriesSection;
