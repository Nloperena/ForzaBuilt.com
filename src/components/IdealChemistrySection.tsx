import React, { useEffect, useRef, useState } from 'react';
import { brandColors } from '@/styles/brandStandards';
import EdgeTrianglesBackground from './common/EdgeTrianglesBackground';

// Custom hook for managing multiple slide up animations
const useStaggeredAnimations = (itemCount: number, baseDelay: number = 100) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const elementRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create observer for all items
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          
          if (entry.isIntersecting) {
            // Add staggered delay based on index
            const delay = index * baseDelay;
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, index]));
            }, delay);
          } else {
            // Hide item when out of view
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

    // Observe all elements
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

// Animated heading component
const AnimatedHeading: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-kallisto font-black mb-4 text-white leading-none break-words">
        IDEAL CHEMISTRY FOR YOUR SPECIFIC APPLICATION
      </h2>
    </div>
  );
};

// Chemistry icons paths - updated to use assets in public/Chemistry Products Icons
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

interface ChemistryItemProps {
  title: string;
  iconSrc: string;
  badges: string[];
  features: string[];
  products: string[];
}

// Mobile/Desktop variant (existing design)
const ChemistryItem: React.FC<ChemistryItemProps & { index: number; getElementRef: (index: number) => (el: HTMLDivElement | null) => void; isVisible: (index: number) => boolean }> = ({
  title,
  iconSrc,
  badges,
  features,
  products,
  index,
  getElementRef,
  isVisible,
}) => {
  return (
    <div
      ref={getElementRef(index)}
      data-index={index}
      className={`bg-[#1b3764] rounded-lg border border-white/10 hover:border-white/20 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] mb-4 max-w-[1400px] mx-auto relative z-10 transform ${
        isVisible(index)
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="p-4 md:p-6">
        {/* Header with Icon and Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
            <img
              src={iconSrc}
              alt={title}
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/products/IC933-bundle-1024x1024.png';
              }}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-kallisto font-bold text-white">
              {title}
            </h3>
            {/* Badges */}
            <div className="flex flex-wrap gap-1 mt-1">
              {badges.map((badge, badgeIndex) => (
                <span
                  key={badgeIndex}
                  className="px-2 py-1 bg-white/10 border border-white/20 rounded-full text-white text-xs font-medium"
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
            {features.map((feature, featureIndex) => (
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
              {products.join(', ')}
            </div>
          </div>
          <button 
            className="forza-btn-primary"
          >
            See Products
          </button>
        </div>
      </div>
    </div>
  );
};

// Tablet/Landscape variant (new three-column design)
const ChemistryItemTablet: React.FC<ChemistryItemProps & { index: number; getElementRef: (index: number) => (el: HTMLDivElement | null) => void; isVisible: (index: number) => boolean }> = ({
  title,
  iconSrc,
  badges,
  features,
  products,
  index,
  getElementRef,
  isVisible,
}) => {
  return (
    <div
      ref={getElementRef(index)}
      data-index={index}
      className={`bg-gradient-to-r from-[#1b3764] to-[#1b3764] rounded-lg border border-white/10 hover:border-white/20 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] mb-6 max-w-[1400px] mx-auto relative z-10 transform ${
        isVisible(index)
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Left Column - Icon/Image */}
        <div className="lg:col-span-1 flex justify-center items-center">
          <div className="w-32 h-32 lg:w-40 lg:h-40 flex-shrink-0">
            <img
              src={iconSrc}
              alt={title}
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
            {title}
          </h3>
          
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {badges.map((badge, badgeIndex) => (
              <span
                key={badgeIndex}
                className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white text-sm font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
          
          {/* Features List */}
          <ul className="text-white/80 text-sm space-y-2 font-poppins">
            {features.map((feature, featureIndex) => (
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
            {products.map((product, productIndex) => (
              <div key={productIndex}>{product}</div>
            ))}
          </div>
          <button 
            className="forza-btn-primary"
          >
            See Products
          </button>
        </div>
      </div>
    </div>
  );
};

const IdealChemistrySection: React.FC = () => {
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
      products: [
        "ForzaTAPE T215",
        "ForzaTAPE T220",
        "ForzaTAPE T446"
      ]
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
      products: [
        "ForzaBOND R160"
      ]
    },
    {
      title: "Modified Epoxies",
      iconSrc: CHEMISTRY_ICONS.modifiedEpoxy,
      badges: ["Combines Epoxy Strength", "Improved Flexibility & Speed"],
      features: [
        "Best for metals, composites needing more flexibility or peel strength"
      ],
      products: [
        "ForzaBOND R221",
        "ForzaBOND R220"
      ]
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
      products: [
        "ForzaSEAL S330",
        "ForzaSEAL S360"
      ]
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
      products: [
        "ForzaSEAL S100",
        "ForzaSEAL S110"
      ]
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
      products: [
        "ForzaBOND P300",
        "ForzaSEAL P310"
      ]
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
      products: [
        "ForzaBOND H500",
        "ForzaBOND H510"
      ]
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
      products: [
        "ForzaCLEAN C400",
        "ForzaPRIME P450"
      ]
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
      products: [
        "ForzaBOND CA100",
        "ForzaBOND CA110"
      ]
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
      products: [
        "ForzaBOND M200",
        "ForzaBOND M210"
      ]
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
      products: [
        "ForzaCLEAN C400",
        "ForzaPRIME P450"
      ]
    }
  ];

  // Initialize the animation system for all chemistry items
  const { getElementRef, isVisible } = useStaggeredAnimations(chemistries.length, 100);

  return (
    <section className="relative overflow-hidden">
      {/* Ideal Chemistry Content Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#1b3764] to-[#1b3764] text-white relative z-10 overflow-hidden">
        {/* Orange to Blue Gradient Background - Bottom */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 2400px 1600px at bottom, rgba(242, 97, 29, 0.8) 0%, rgba(242, 97, 29, 0.7) 35%, rgba(242, 97, 29, 0.5) 60%, rgba(242, 97, 29, 0.3) 80%, rgba(242, 97, 29, 0.15) 90%, rgba(242, 97, 29, 0.05) 95%, transparent 100%)',
              opacity: 1
            }}
          />
        </div>
        
        {/* Custom positioned triangles - Top and bottom */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Top triangle */}
          <img
            src="/Gradients and Triangles/Small Science Triangles.png"
            alt="Top Science Triangles"
            className="absolute top-8 right-8 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 opacity-60"
            style={{ 
              mixBlendMode: 'overlay',
              transform: 'scale(5.0) rotate(265deg)'
            }}
          />
          
          {/* Bottom triangle */}
          <img
            src="/Gradients and Triangles/Small Science Triangles 2.png"
            alt="Bottom Science Triangles"
            className="absolute bottom-8 left-8 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 opacity-60"
            style={{ 
              mixBlendMode: 'overlay',
              transform: 'scale(5.0) rotate(295deg)'
            }}
          />
          
          {/* Left middle triangle - slightly offset inward */}
          <img
            src="/Gradients and Triangles/Small Science Triangles.png"
            alt="Left Middle Science Triangles"
            className="absolute top-1/2 left-16 md:left-20 lg:left-24 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 opacity-60"
            style={{ 
              mixBlendMode: 'overlay',
              transform: 'translateY(-50%) scale(5.0) rotate(180deg)'
            }}
          />
          
          {/* Right middle triangle - slightly offset inward */}
          <img
            src="/Gradients and Triangles/Small Science Triangles 2.png"
            alt="Right Middle Science Triangles"
            className="absolute top-1/2 right-16 md:right-20 lg:right-24 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 opacity-60"
            style={{ 
              mixBlendMode: 'overlay',
              transform: 'translateY(-50%) scale(5.0) rotate(90deg)'
            }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12 relative z-10">
            <AnimatedHeading />
          </div>
          
          {/* Chemistry List - Responsive variants */}
          <div className="space-y-3 relative z-10">
            {/* Mobile/Desktop variant (hidden on lg+) */}
            <div className="lg:hidden">
              {chemistries.map((chemistry, index) => (
                <ChemistryItem
                  key={index}
                  title={chemistry.title}
                  iconSrc={chemistry.iconSrc}
                  badges={chemistry.badges}
                  features={chemistry.features}
                  products={chemistry.products}
                  index={index}
                  getElementRef={getElementRef}
                  isVisible={isVisible}
                />
              ))}
            </div>
            
            {/* Tablet/Landscape variant (hidden on md and below) */}
            <div className="hidden lg:block">
              {chemistries.map((chemistry, index) => (
                <ChemistryItemTablet
                  key={index}
                  title={chemistry.title}
                  iconSrc={chemistry.iconSrc}
                  badges={chemistry.badges}
                  features={chemistry.features}
                  products={chemistry.products}
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

export default IdealChemistrySection;
