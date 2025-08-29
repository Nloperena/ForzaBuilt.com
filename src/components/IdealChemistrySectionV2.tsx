import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// ===== CHEMISTRY DATA =====
// Easy to edit - just modify this array to add/remove/change chemistries
export const CHEMISTRY_DATA = [
  {
    id: 'acrylic',
    title: "Acrylic (incl. PSA)",
    iconSrc: '/Chemistry Products Icons/acrylic icon.svg',
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
    id: 'epoxy',
    title: "Epoxy",
    iconSrc: '/Chemistry Products Icons/epoxy icon.svg',
    badges: ["High Strength & Durability", "Rigid", "Excellent Chemical Resistance"],
    features: [
      "Best for metals, composites, concrete, wood, plastics",
      "High/low temperatures, minimal flex",
      "Slow to moderate cure time"
    ],
    products: ["ForzaBOND R160"]
  },
  {
    id: 'modified-epoxy',
    title: "Modified Epoxies",
    iconSrc: '/Chemistry Products Icons/modified epoxy icon.svg',
    badges: ["Combines Epoxy Strength", "Improved Flexibility & Speed"],
    features: [
      "Best for metals, composites needing more flexibility or peel strength"
    ],
    products: ["ForzaBOND R221", "ForzaBOND R220"]
  },
  {
    id: 'ms-polymer',
    title: "MS Polymer",
    iconSrc: '/Chemistry Products Icons/ms icon.svg',
    badges: ["Weatherproof", "Flexible", "Low VOC"],
    features: [
      "Modified silane polymers for flexible, strong bonds",
      "Excellent weatherability with no off-gassing",
      "Good for many substrates including difficult surfaces"
    ],
    products: ["ForzaSEAL S330", "ForzaSEAL S360"]
  },
  {
    id: 'silicone',
    title: "Silicone",
    iconSrc: '/Chemistry Products Icons/silicone icon.svg',
    badges: ["Heat Resistant", "Waterproof", "Flexible"],
    features: [
      "Extreme temperature stability from -65°F to 500°F",
      "Excellent UV, chemical, and weather resistance",
      "Ideal for sealing and waterproofing applications"
    ],
    products: ["ForzaSEAL S100", "ForzaSEAL S110"]
  },
  {
    id: 'polyurethane',
    title: "Polyurethane",
    iconSrc: '/Chemistry Products Icons/polyurethane icon.svg',
    badges: ["Abrasion Resistant", "Impact Resistant", "Paintable"],
    features: [
      "Strong and elastic adhesives that handle movement",
      "Resist weather and moisture for flexible joints",
      "Ideal for structural bonding with movement"
    ],
    products: ["ForzaBOND P300", "ForzaSEAL P310"]
  },
  {
    id: 'hot-melt',
    title: "Hot Melt",
    iconSrc: '/Chemistry Products Icons/hotmelt icon.svg',
    badges: ["Fast Setting", "No VOCs", "High Production"],
    features: [
      "Fast-setting thermoplastic adhesives with instant bonds",
      "Great for high-speed production applications",
      "No solvents or VOCs for safer handling"
    ],
    products: ["ForzaBOND H500", "ForzaBOND H510"]
  },
  {
    id: 'solvent-based',
    title: "Solvent Based",
    iconSrc: '/Chemistry Products Icons/solvent based icon.svg',
    badges: ["Fast Drying", "High Initial Tack", "Versatile"],
    features: [
      "Fast-drying polymer solutions for quick application",
      "Excellent initial tack for immediate hold",
      "Works on both flexible and rigid applications"
    ],
    products: ["ForzaCLEAN C400", "ForzaPRIME P450"]
  },
  {
    id: 'cyanoacrylates',
    title: "Cyanoacrylates",
    iconSrc: '/Chemistry Products Icons/cyanoacrylates icon.svg',
    badges: ["Instant Bond", "High Strength", "Precision Application"],
    features: [
      "Fast-curing adhesives for immediate bonding",
      "Excellent for small, precise applications",
      "Works on plastics, rubber, metal, and ceramics"
    ],
    products: ["ForzaBOND CA100", "ForzaBOND CA110"]
  },
  {
    id: 'methacrylate',
    title: "Methacrylate",
    iconSrc: '/Chemistry Products Icons/methacrylate icon.svg',
    badges: ["High Performance", "Structural", "Temperature Resistant"],
    features: [
      "Two-part structural adhesives for demanding applications",
      "Excellent temperature and chemical resistance",
      "Ideal for metal, composite, and plastic bonding"
    ],
    products: ["ForzaBOND M200", "ForzaBOND M210"]
  },
  {
    id: 'water-based',
    title: "Water Based",
    iconSrc: '/Chemistry Products Icons/water based icon.svg',
    badges: ["Environmentally Friendly", "Quick Drying", "Versatile"],
    features: [
      "Non-toxic, water-based adhesives for a healthier environment",
      "Quick drying polymer solutions for immediate hold",
      "Works on a wide range of surfaces"
    ],
    products: ["ForzaCLEAN C400", "ForzaPRIME P450"]
  }
];

// ===== TYPES =====
interface ChemistryItem {
  id: string;
  title: string;
  iconSrc: string;
  badges: string[];
  features: string[];
  products: string[];
}

// ===== ANIMATION HOOK =====
const useStaggeredAnimations = (itemCount: number, baseDelay: number = 100) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const elementRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          
          if (entry.isIntersecting) {
            const delay = index * baseDelay;
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, index]));
            }, delay);
          } else {
            setVisibleItems(prev => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    elementRefs.current.forEach((ref, index) => {
      if (ref && observerRef.current) {
        observerRef.current.observe(ref);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [baseDelay]);

  const getElementRef = (index: number) => (el: HTMLDivElement | null) => {
    elementRefs.current[index] = el;
  };

  const isVisible = (index: number) => visibleItems.has(index);

  return { getElementRef, isVisible };
};

// ===== ANIMATED HEADING =====
const AnimatedHeading: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-kallisto font-black mb-4 text-white leading-none break-words">
        IDEAL CHEMISTRY FOR YOUR SPECIFIC APPLICATION
      </h2>
    </motion.div>
  );
};

// ===== CHEMISTRY CARD COMPONENTS =====

// Mobile/Desktop Card Component
const ChemistryCardMobile: React.FC<{ item: ChemistryItem; index: number; getElementRef: (index: number) => (el: HTMLDivElement | null) => void; isVisible: (index: number) => boolean }> = ({ 
  item, 
  index, 
  getElementRef, 
  isVisible 
}) => {
  return (
    <motion.div
      ref={getElementRef(index)}
      data-index={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible(index) ? 1 : 0, y: isVisible(index) ? 0 : 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="backdrop-blur-xl bg-white/10 border border-white/20 hover:border-white/30 transition-all duration-300 mb-4 max-w-[1400px] mx-auto relative z-10 rounded-2xl shadow-2xl"
      style={{ 
        minHeight: '200px',
        backgroundColor: '#115B8780'
      }}
    >
      <div className="p-4 md:p-6 relative z-10">
        {/* Header with Icon and Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
            <img
              src={item.iconSrc}
              alt={item.title}
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/products/IC933-bundle-1024x1024.png';
              }}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-kallisto font-bold text-white">
              {item.title}
            </h3>
            {/* Badges */}
            <div className="flex flex-wrap gap-1 mt-1">
              {item.badges.map((badge, badgeIndex) => (
                <span
                  key={badgeIndex}
                  className="px-2 py-1 backdrop-blur-sm bg-white/10 border border-white/20 rounded-full text-white text-xs font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Features List */}
        <div className="mb-4">
          <ul className="text-white/80 text-sm space-y-1 font-poppins">
            {item.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#F2611D] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-xs md:text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Products and Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-white/10">
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-white mb-1">Products:</h4>
            <div className="text-white/80 text-xs md:text-sm font-poppins">
              {item.products.join(', ')}
            </div>
          </div>
          <button className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 shadow-lg">
            See Products
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Desktop Card Component
const ChemistryCardDesktop: React.FC<{ item: ChemistryItem; index: number; getElementRef: (index: number) => (el: HTMLDivElement | null) => void; isVisible: (index: number) => boolean }> = ({ 
  item, 
  index, 
  getElementRef, 
  isVisible 
}) => {
  return (
    <motion.div
      ref={getElementRef(index)}
      data-index={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible(index) ? 1 : 0, y: isVisible(index) ? 0 : 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="backdrop-blur-xl bg-white/10 border border-white/20 hover:border-white/30 transition-all duration-300 mb-6 max-w-[1400px] mx-auto relative z-10 rounded-2xl shadow-2xl"
      style={{ backgroundColor: '#115B8780' }}
    >
      {/* Liquid shine overlay */}
      <div
        className="pointer-events-none absolute -inset-x-1/2 -inset-y-1/2"
        style={{
          background: 'radial-gradient(60% 40% at 50% 50%, rgba(255,255,255,0.15), rgba(255,255,255,0) 60%)',
        }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 relative z-10">
        {/* Left Column - Icon/Image */}
        <div className="lg:col-span-1 flex justify-center items-center">
          <div className="w-32 h-32 lg:w-40 lg:h-40 flex-shrink-0">
            <img
              src={item.iconSrc}
              alt={item.title}
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/products/IC933-bundle-1024x1024.png';
              }}
            />
          </div>
        </div>
        
        {/* Middle Column - Product Details */}
        <div className="lg:col-span-1 flex flex-col justify-center">
          <h3 className="text-xl lg:text-2xl font-kallisto font-bold text-white mb-4">
            {item.title}
          </h3>
          
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {item.badges.map((badge, badgeIndex) => (
              <span
                key={badgeIndex}
                className="px-3 py-1 backdrop-blur-sm bg-white/10 border border-white/20 rounded-full text-white text-sm font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
          
          {/* Features List */}
          <ul className="text-white/80 text-sm space-y-2 font-poppins">
            {item.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#F2611D] rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Right Column - Products and Button */}
        <div className="lg:col-span-1 flex flex-col justify-center items-center text-center">
          <h4 className="text-lg font-semibold text-white mb-3">Products</h4>
          <div className="text-white/80 text-sm font-poppins mb-4 space-y-1">
            {item.products.map((product, productIndex) => (
              <div key={productIndex}>{product}</div>
            ))}
          </div>
          <button className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 shadow-lg">
            See Products
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ===== MAIN COMPONENT =====
const IdealChemistrySectionV2: React.FC = () => {
  const { getElementRef, isVisible } = useStaggeredAnimations(CHEMISTRY_DATA.length, 100);

  return (
    <section className="relative overflow-hidden">
      {/* Background Section with Glassmorphism */}
      <section className="py-12 md:py-16 backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl text-white relative z-10 overflow-hidden">
        {/* Base Background Color */}
        <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundColor: '#115B8760' }}></div>
        
        {/* Orange to Blue Gradient Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div 
            className="absolute inset-0 bg-[radial-gradient(ellipse_800px_533px_at_bottom,rgba(242,97,29,0.8)_0%,rgba(242,97,29,0.7)_35%,rgba(242,97,29,0.5)_60%,rgba(242,97,29,0.3)_80%,rgba(242,97,29,0.15)_90%,rgba(242,97,29,0.05)_95%,transparent_100%)] md:bg-[radial-gradient(ellipse_2400px_1600px_at_bottom,rgba(242,97,29,0.8)_0%,rgba(242,97,29,0.7)_35%,rgba(242,97,29,0.5)_60%,rgba(242,97,29,0.3)_80%,rgba(242,97,29,0.15)_90%,rgba(242,97,29,0.05)_95%,transparent_100%)]"
            style={{ opacity: 0.8 }}
          />
        </div>
        
        {/* Science Triangles Background */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Top triangle */}
          <img
            src="/Gradients and Triangles/Small Science Triangles.png"
            alt="Top Science Triangles"
            className="absolute top-8 right-8 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 opacity-40"
            style={{ 
              mixBlendMode: 'multiply',
              transform: 'scale(5.0) rotate(265deg)'
            }}
          />
          
          {/* Bottom triangle */}
          <img
            src="/Gradients and Triangles/Small Science Triangles 2.png"
            alt="Bottom Science Triangles"
            className="absolute bottom-8 left-8 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 opacity-40"
            style={{ 
              mixBlendMode: 'multiply',
              transform: 'scale(5.0) rotate(295deg)'
            }}
          />
          
          {/* Left middle triangle */}
          <img
            src="/Gradients and Triangles/Small Science Triangles.png"
            alt="Left Middle Science Triangles"
            className="absolute top-1/2 left-16 md:left-20 lg:left-24 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 opacity-40"
            style={{ 
              mixBlendMode: 'multiply',
              transform: 'translateY(-50%) scale(5.0) rotate(180deg)'
            }}
          />
          
          {/* Right middle triangle */}
          <img
            src="/Gradients and Triangles/Small Science Triangles 2.png"
            alt="Right Middle Science Triangles"
            className="absolute top-1/2 right-16 md:right-20 lg:right-24 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 opacity-40"
            style={{ 
              mixBlendMode: 'multiply',
              transform: 'translateY(-50%) scale(5.0) rotate(90deg)'
            }}
          />
        </div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12 relative z-10">
            <AnimatedHeading />
          </div>
          
          {/* Chemistry Cards - Responsive Layout */}
          <div className="space-y-3 relative z-10">
            {/* Mobile/Tablet Layout */}
            <div className="block lg:hidden">
              {CHEMISTRY_DATA.map((item, index) => (
                <ChemistryCardMobile
                  key={item.id}
                  item={item}
                  index={index}
                  getElementRef={getElementRef}
                  isVisible={isVisible}
                />
              ))}
            </div>
            
            {/* Desktop Layout */}
            <div className="hidden lg:block">
              {CHEMISTRY_DATA.map((item, index) => (
                <ChemistryCardDesktop
                  key={item.id}
                  item={item}
                  index={index}
                  getElementRef={getElementRef}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default IdealChemistrySectionV2;
