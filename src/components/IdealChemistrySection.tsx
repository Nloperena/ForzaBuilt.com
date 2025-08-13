import React, { useEffect, useState, useRef } from 'react';
import { brandColors } from '@/styles/brandStandards';

// Chemistry icons paths - using available icons and fallbacks
const CHEMISTRY_ICONS = {
  acrylic: '/chemistry-icons/Epoxy icon.svg', // Using epoxy icon as fallback
  epoxy: '/chemistry-icons/Epoxy icon.svg',
  modifiedEpoxy: '/chemistry-icons/Epoxy icon.svg',
  polyurethane: '/chemistry-icons/Waterbase icon.svg',
  ms: '/chemistry-icons/MS icon.svg',
  silicone: '/chemistry-icons/Silicone icon.svg',
  hotMelt: '/chemistry-icons/Epoxy icon.svg', // Using epoxy icon as fallback
  solventBase: '/chemistry-icons/Waterbase icon.svg',
};

interface ChemistryCardProps {
  title: string;
  iconSrc: string;
  badges: string[];
  features: string[];
  products: string[];
  index: number;
}

const ChemistryCard: React.FC<ChemistryCardProps> = ({
  title,
  iconSrc,
  badges,
  features,
  products,
  index,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger animation when card comes into view
          const timer = setTimeout(() => setIsVisible(true), 200 + (index * 100));
          return () => clearTimeout(timer);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className={`bg-gradient-to-br from-[${brandColors.primary.regalBlue.hex}] to-[${brandColors.secondary.blueVelvet.hex}] rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-center">
        {/* Left - Chemistry Icon */}
        <div 
          className={`flex justify-center transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <img 
              src={iconSrc} 
              alt={`${title} Chemistry Icon`} 
              className="w-full h-full object-contain filter brightness-0 invert opacity-90"
            />
          </div>
        </div>
        
        {/* Middle - Info */}
        <div 
          className={`space-y-4 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <h3 className="text-xl md:text-2xl font-kallisto font-black text-white text-center md:text-left">
            {title.split(' ').map((word, wordIndex) => (
              <span key={wordIndex}>
                {word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()}
                {wordIndex < title.split(' ').length - 1 ? ' ' : ''}
              </span>
            ))}
          </h3>
          
          {/* Badges */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
            {badges.map((badge, badgeIndex) => (
              <span 
                key={badgeIndex} 
                className={`bg-[${brandColors.primary.regalBlue.hex}]/30 text-[${brandColors.secondary.slateGrey.hex}] px-3 py-1 rounded-full text-sm font-poppins font-medium transition-all duration-500 ease-out ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${700 + (badgeIndex * 100)}ms` }}
              >
                {badge}
              </span>
            ))}
          </div>
          
          {/* Description/Features */}
          <div className="text-white/90 space-y-2 text-sm md:text-base font-poppins">
            {features.map((feature, featureIndex) => (
              <p 
                key={featureIndex}
                className={`transition-all duration-700 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0 translate-x-0' : 'opacity-0 translate-y-4 -translate-x-4'
                }`}
                style={{ transitionDelay: `${900 + (featureIndex * 200)}ms` }}
              >
                • {feature}
              </p>
            ))}
          </div>
        </div>
        
        {/* Right - Products & Button */}
        <div 
          className={`flex flex-col justify-center items-center space-y-4 border-l border-white/20 pl-4 md:pl-6 h-full transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          <h3 className="text-xl md:text-2xl font-kallisto font-black text-white text-center">
            Products
          </h3>
          <ul className="text-white/80 text-sm md:text-base text-center list-none space-y-1 font-poppins">
            {products.map((product, productIndex) => (
              <li 
                key={productIndex}
                className={`transition-all duration-500 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
                style={{ transitionDelay: `${1100 + (productIndex * 100)}ms` }}
              >
                {product}
              </li>
            ))}
          </ul>
          <button 
            className={`bg-[${brandColors.primary.blazeOrange.hex}] hover:bg-[${brandColors.primary.blazeOrange.hex}]/80 text-white px-6 py-3 rounded-lg font-poppins font-bold transition-all duration-500 ease-out mt-4 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '1300ms' }}
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
      title: "Solvent Base",
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
    }
  ];

  return (
    <section className={`py-16 md:py-24 bg-gradient-to-b from-[${brandColors.secondary.blueVelvet.hex}] to-[${brandColors.primary.regalBlue.hex}] text-white`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-kallisto font-black mb-6 text-white leading-none">
            IDEAL CHEMISTRY FOR YOUR SPECIFIC APPLICATION
          </h2>
        </div>
        
        {/* Chemistry Cards */}
        <div className="grid grid-cols-1 gap-6 md:gap-8 max-w-7xl mx-auto">
          {chemistries.map((chemistry, index) => (
            <ChemistryCard
              key={index}
              title={chemistry.title}
              iconSrc={chemistry.iconSrc}
              badges={chemistry.badges}
              features={chemistry.features}
              products={chemistry.products}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IdealChemistrySection;
