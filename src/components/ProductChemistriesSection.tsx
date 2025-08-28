import React from 'react';
import ChemistryCard from './ChemistryCard';
// Chemistry icon paths - updated to use regular Chemistry Products Icons (no white background)
const CHEMISTRY_ICONS = {
  acrylic: '/Chemistry%20Products%20Icons/acrylic%20icon.svg',
  epoxy: '/Chemistry%20Products%20Icons/epoxy%20icon.svg',
  modifiedEpoxy: '/Chemistry%20Products%20Icons/modified%20epoxy%20icon.svg',
  silicone: '/Chemistry%20Products%20Icons/silicone%20icon.svg',
  ms: '/Chemistry%20Products%20Icons/ms%20icon.svg',
  waterbase: '/Chemistry%20Products%20Icons/water%20based%20icon.svg',
  hotmelt: '/Chemistry%20Products%20Icons/hotmelt%20icon.svg',
  solventbase: '/Chemistry%20Products%20Icons/solvent%20based%20icon.svg',
  polyurethane: '/Chemistry%20Products%20Icons/polyurethane%20icon.svg',
  cyanoacrylates: '/Chemistry%20Products%20Icons/cyanoacrylates%20icon.svg',
  methacrylate: '/Chemistry%20Products%20Icons/methacrylate%20icon.svg',
  rubberbased: '/Chemistry%20Products%20Icons/rubber%20based%20icon.svg'
};

const ProductChemistriesSection = () => {
  // Define static chemistry categories for the flip-box section
  const chemistryCategories = [
    {
      name: 'MS',
      icon: <img src={CHEMISTRY_ICONS.ms} alt="MS Chemistry" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-64 lg:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96" />,
      description: 'Modified Silane polymers for flexible, strong bonds with excellent weatherability and no off-gassing.'
    },
    {
      name: 'Silicone',
      icon: <img src={CHEMISTRY_ICONS.silicone} alt="Silicone Chemistry" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-64 lg:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96" />,
      description: 'Extreme temperature stability with excellent UV, chemical, and weather resistance for demanding applications.'
    },
    {
      name: 'Epoxy',
      icon: <img src={CHEMISTRY_ICONS.epoxy} alt="Epoxy Chemistry" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-64 lg:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96" />,
      description: 'High strength thermosetting resins with excellent chemical resistance for structural bonding.'
    },
    {
      name: 'Water Base',
      icon: <img src={CHEMISTRY_ICONS.waterbase} alt="Water Base Chemistry" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-64 lg:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96" />,
      description: 'Low VOC, eco-friendly solutions for porous substrates with safe handling properties.'
    },
    {
      name: 'Hot Melt',
      icon: <img src={CHEMISTRY_ICONS.ms} alt="Hot Melt Chemistry" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-64 lg:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96" />,
      description: 'Fast-setting thermoplastic adhesives with instant bonds and no VOCs for high-speed production.'
    },
    {
      name: 'Solvent Base',
      icon: <img src={CHEMISTRY_ICONS.ms} alt="Solvent Base Chemistry" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-64 lg:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96" />,
      description: 'Fast-drying polymer solutions with excellent initial tack for flexible and rigid bonding applications.'
    },
    {
      name: 'Acrylic',
      icon: <img src={CHEMISTRY_ICONS.ms} alt="Acrylic Chemistry" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-64 lg:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96" />,
      description: 'Durable pressure-sensitive adhesives with excellent UV and weather resistance for flexible applications.'
    },
    {
      name: 'Polyurethane',
      icon: <img src={CHEMISTRY_ICONS.ms} alt="Polyurethane Chemistry" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-64 lg:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96" />,
      description: 'Strong and elastic adhesives that handle movement and resist weather and moisture for flexible joints.'
    }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white/10 text-white relative">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-8xl mx-auto z-10 relative">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-8xl font-black font-kallisto mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-center leading-none break-words">Product Chemistries</h2>
        

        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-8 xl:gap-12">
                      {chemistryCategories.map((category, index) => (
              <div key={index} className="p-4 sm:p-6 md:p-8 lg:p-8 xl:p-12 min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px] xl:min-h-[400px]">
                <ChemistryCard title={category.name} icon={category.icon} description={category.description} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

// Duplicate of the first chemistry component for safe experimentation
const ProductChemistriesSectionExperimental: React.FC = () => {
  // Define static chemistry categories for the flip-box section
  const chemistryCategories = [
    {
      name: 'MS',
      icon: <img src={CHEMISTRY_ICONS.ms} alt="MS Chemistry" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-64 lg:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96" />,
      description: 'Modified Silane polymers for flexible, strong bonds with excellent weatherability and no off-gassing.'
    },
    {
      name: 'Silicone',
      icon: <img src={CHEMISTRY_ICONS.silicone} alt="Silicone Chemistry" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-64 lg:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96" />,
      description: 'Extreme temperature stability with excellent UV, chemical, and weather resistance for demanding applications.'
    },
    {
      name: 'Epoxy',
      icon: <img src={CHEMISTRY_ICONS.epoxy} alt="Epoxy Chemistry" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-64 lg:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96" />,
      description: 'High strength thermosetting resins with excellent chemical resistance for structural bonding.'
    },
    {
      name: 'Water Base',
      icon: <img src={CHEMISTRY_ICONS.waterbase} alt="Water Base Chemistry" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-64 lg:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96" />,
      description: 'Low VOC, eco-friendly solutions for porous substrates with safe handling properties.'
    },
    {
      name: 'Hot Melt',
      icon: <img src={CHEMISTRY_ICONS.ms} alt="Hot Melt Chemistry" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-64 lg:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96" />,
      description: 'Fast-setting thermoplastic adhesives with instant bonds and no VOCs for high-speed production.'
    },
    {
      name: 'Solvent Base',
      icon: <img src={CHEMISTRY_ICONS.ms} alt="Solvent Base Chemistry" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-64 lg:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96" />,
      description: 'Fast-drying polymer solutions with excellent initial tack for flexible and rigid bonding applications.'
    },
    {
      name: 'Acrylic',
      icon: <img src={CHEMISTRY_ICONS.ms} alt="Acrylic Chemistry" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-64 lg:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96" />,
      description: 'Durable pressure-sensitive adhesives with excellent UV and weather resistance for flexible applications.'
    },
    {
      name: 'Polyurethane',
      icon: <img src={CHEMISTRY_ICONS.ms} alt="Polyurethane Chemistry" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-64 lg:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96" />,
      description: 'Strong and elastic adhesives that handle movement and resist weather and moisture for flexible joints.'
    }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white/10 text-white relative">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-8xl mx-auto z-10 relative">
        <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-8xl font-black font-kallisto mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-center leading-none break-words">Product Chemistries - Experimental</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-8 xl:gap-12">
          {chemistryCategories.map((category, index) => (
            <div key={index} className="p-4 sm:p-6 md:p-8 lg:p-8 xl:p-12 min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px] xl:min-h-[400px]">
              <ChemistryCard title={category.name} icon={category.icon} description={category.description} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// V2 Chemistry Section - CSS-only flip cards with selection state
const ProductChemistriesSectionV2: React.FC = () => {
  const [selectedCard, setSelectedCard] = React.useState<string | null>(null);

  const handleCardSelect = (categoryName: string) => {
    setSelectedCard(selectedCard === categoryName ? null : categoryName);
  };

  // Chemistry categories for V2
  const chemistryCategoriesV2 = [
    {
      name: 'MS',
      iconSrc: CHEMISTRY_ICONS.ms,
      description: 'Modified Silane polymers for flexible, strong bonds with excellent weatherability and no off-gassing.'
    },
    {
      name: 'Silicone',
      iconSrc: CHEMISTRY_ICONS.silicone,
      description: 'Extreme temperature stability with excellent UV, chemical, and weather resistance for demanding applications.'
    },
    {
      name: 'Epoxy',
      iconSrc: CHEMISTRY_ICONS.epoxy,
      description: 'High strength thermosetting resins with excellent chemical resistance for structural bonding.'
    },
    {
      name: 'Water Base',
      iconSrc: CHEMISTRY_ICONS.waterbase,
      description: 'Low VOC, eco-friendly solutions for porous substrates with safe handling properties.'
    },
    {
      name: 'Hot Melt',
      iconSrc: CHEMISTRY_ICONS.ms,
      description: 'Fast-setting thermoplastic adhesives with instant bonds and no VOCs for high-speed production.'
    },
    {
      name: 'Solvent Base',
      iconSrc: CHEMISTRY_ICONS.ms,
      description: 'Fast-drying polymer solutions with excellent initial tack for flexible and rigid bonding applications.'
    },
    {
      name: 'Acrylic',
      iconSrc: CHEMISTRY_ICONS.ms,
      description: 'Durable pressure-sensitive adhesives with excellent UV and weather resistance for flexible applications.'
    },
    {
      name: 'Polyurethane',
      iconSrc: CHEMISTRY_ICONS.ms,
      description: 'Strong and elastic adhesives that handle movement and resist weather and moisture for flexible joints.'
    }
  ];

  // CSS-only flip card component
  const ChemistryFlipCard = ({ 
    category, 
    isSelected, 
    onSelect 
  }: { 
    category: { name: string; iconSrc: string; description: string };
    isSelected: boolean;
    onSelect: () => void;
  }) => {
    return (
      <div 
        className={`group relative w-full h-[clamp(220px,22vw,360px)] [perspective:1200px] transition-all duration-300 ${
          isSelected ? 'scale-100' : 'scale-95 hover:scale-98'
        }`}
        onClick={onSelect}
      >
        <div className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
          isSelected ? '[transform:rotateY(180deg)]' : 'group-hover:[transform:rotateY(180deg)]'
        }`}>
          {/* Front */}
          <div className="absolute inset-0 bg-white rounded-2xl flex flex-col items-center justify-center gap-3 p-4 text-[#1b3764] [backface-visibility:hidden]">
            <div className="flex items-center justify-center">
              <img
                src={category.iconSrc}
                alt={`${category.name} Chemistry`}
                className="w-[clamp(72px,9vw,160px)] h-[clamp(72px,9vw,160px)] object-contain"
              />
            </div>
            <div className="font-kallisto font-black uppercase text-center text-[clamp(12px,1.6vw,20px)] leading-[1.1]">
              {category.name}
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 rounded-2xl bg-[#1b3764] text-white p-4 sm:p-5 md:p-6 flex items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <div>
              <div className="font-kallisto font-black uppercase mb-2 text-[clamp(12px,1.6vw,20px)] leading-[1.1]">
                {category.name}
              </div>
              <p className="font-kallisto font-medium text-[clamp(12px,1.4vw,18px)] leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24 bg-white/10 text-white">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[2000px] mx-auto">
        <h2 className="text-center font-kallisto font-black leading-[1.1] text-4xl md:text-5xl lg:text-5xl xl:text-6xl mb-6 sm:mb-8 md:mb-10">
          Product Chemistries V2
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {chemistryCategoriesV2.map((cat) => (
            <ChemistryFlipCard 
              key={cat.name} 
              category={cat} 
              isSelected={selectedCard === cat.name}
              onSelect={() => handleCardSelect(cat.name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Horizontal Chemistry Row - Small icons in a horizontal row layout
const HorizontalChemistryRow: React.FC = () => {
  const [selectedChemistry, setSelectedChemistry] = React.useState<string | null>(null);

  const handleChemistrySelect = (chemistryName: string) => {
    setSelectedChemistry(selectedChemistry === chemistryName ? null : chemistryName);
  };

  const chemistryItems = [
    { name: 'MS', icon: CHEMISTRY_ICONS.ms, description: 'Modified Silane' },
    { name: 'Silicone', icon: CHEMISTRY_ICONS.silicone, description: 'Temperature Stable' },
    { name: 'Epoxy', icon: CHEMISTRY_ICONS.epoxy, description: 'High Strength' },
    { name: 'Water Base', icon: CHEMISTRY_ICONS.waterbase, description: 'Low VOC' },
    { name: 'Hot Melt', icon: CHEMISTRY_ICONS.ms, description: 'Fast Setting' },
    { name: 'Solvent Base', icon: CHEMISTRY_ICONS.ms, description: 'Quick Drying' },
    { name: 'Acrylic', icon: CHEMISTRY_ICONS.ms, description: 'UV Resistant' },
    { name: 'Polyurethane', icon: CHEMISTRY_ICONS.ms, description: 'Flexible' }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-[#1b3764] text-white">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-8xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black font-kallisto mb-8 text-center leading-none">
          Chemistry Types
        </h2>
        
        {/* Horizontal Chemistry Row */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
          {chemistryItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleChemistrySelect(item.name)}
              className={`group flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl transition-all duration-300 ${
                selectedChemistry === item.name 
                  ? 'bg-white text-[#1b3764] scale-105 shadow-lg' 
                  : 'bg-white/10 text-white hover:bg-white/20 hover:scale-102'
              }`}
            >
              {/* Chemistry Icon */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center">
                <img
                  src={item.icon}
                  alt={`${item.name} Chemistry`}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Chemistry Name */}
              <div className="text-center">
                <div className="font-kallisto font-black text-sm sm:text-base md:text-lg uppercase leading-tight">
                  {item.name}
                </div>
                <div className="font-poppins font-medium text-xs sm:text-sm text-opacity-80 mt-1">
                  {item.description}
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {/* Selected Chemistry Info */}
        {selectedChemistry && (
          <div className="mt-8 text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-white font-poppins text-sm md:text-base">
                <span className="font-bold">{selectedChemistry}</span> chemistry selected
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductChemistriesSection; 