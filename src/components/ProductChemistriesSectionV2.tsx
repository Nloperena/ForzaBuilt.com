import React from 'react';

// Chemistry icon paths - updated to use organized chemistry icons
const CHEMISTRY_ICONS = {
  acrylic: '/images/icons/chemistry/Acrylic icon.svg',
  epoxy: '/images/icons/chemistry/Epoxy Icon.svg',
  modifiedEpoxy: '/images/icons/chemistry/Modified Epoxy icon.svg',
  silicone: '/images/icons/chemistry/Silicone icon.svg',
  ms: '/images/icons/chemistry/MS icon.svg',
  waterbase: '/images/icons/chemistry/Water Based icon.svg',
  hotmelt: '/images/icons/chemistry/Hotmelt icon.svg',
  solventbase: '/images/icons/chemistry/Solvent Based icon.svg',
  polyurethane: '/images/icons/chemistry/Polyurethane icon.svg',
  cyanoacrylates: '/images/icons/chemistry/Cyanoacrylates Icon.svg',
  methacrylate: '/images/icons/chemistry/Methacrylate icon.svg',
  rubberbased: '/images/icons/chemistry/rubber based icon.svg'
};

type ChemistryCategory = {
  name: string;
  iconSrc: string;
  description: string;
};

const CATEGORIES: ChemistryCategory[] = [
  {
    name: 'MS',
    iconSrc: CHEMISTRY_ICONS.ms,
    description:
      'Modified Silane polymers for flexible, strong bonds with excellent weatherability and no off-gassing.'
  },
  {
    name: 'Silicone',
    iconSrc: CHEMISTRY_ICONS.silicone,
    description:
      'Extreme temperature stability with excellent UV, chemical, and weather resistance for demanding applications.'
  },
  {
    name: 'Epoxy',
    iconSrc: CHEMISTRY_ICONS.epoxy,
    description:
      'High strength thermosetting resins with excellent chemical resistance for structural bonding.'
  },
  {
    name: 'Water Base',
    iconSrc: CHEMISTRY_ICONS.waterbase,
    description:
      'Low VOC, eco-friendly solutions for porous substrates with safe handling properties.'
  },
  {
    name: 'Hot Melt',
    iconSrc: CHEMISTRY_ICONS.ms,
    description:
      'Fast-setting thermoplastic adhesives with instant bonds and no VOCs for high-speed production.'
  },
  {
    name: 'Solvent Base',
    iconSrc: CHEMISTRY_ICONS.ms,
    description:
      'Fast-drying polymer solutions with excellent initial tack for flexible and rigid bonding applications.'
  },
  {
    name: 'Acrylic',
    iconSrc: CHEMISTRY_ICONS.ms,
    description:
      'Durable pressure-sensitive adhesives with excellent UV and weather resistance for flexible applications.'
  },
  {
    name: 'Polyurethane',
    iconSrc: CHEMISTRY_ICONS.ms,
    description:
      'Strong and elastic adhesives that handle movement and resist weather and moisture for flexible joints.'
  }
];

// A self-contained, CSS-only flip card with selection state
function ChemistryFlipCard({ 
  category, 
  isSelected, 
  onSelect 
}: { 
  category: ChemistryCategory;
  isSelected: boolean;
  onSelect: () => void;
}) {
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
                      <div className="absolute inset-0 rounded-2xl bg-[#115B87] text-white p-4 sm:p-5 md:p-6 flex items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
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
}

const ProductChemistriesSectionV2: React.FC = () => {
  const [selectedCard, setSelectedCard] = React.useState<string | null>(null);

  const handleCardSelect = (categoryName: string) => {
    setSelectedCard(selectedCard === categoryName ? null : categoryName);
  };

  return (
          <section className="py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-b from-[#115B87] to-[#1B3764] text-white">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[2000px] mx-auto">
                    <h2 className="text-center font-kallisto font-black leading-[1.1] text-4xl md:text-5xl lg:text-5xl xl:text-6xl mb-6 sm:mb-8 md:mb-10">
              Product Chemistries
            </h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {CATEGORIES.map((cat) => (
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

export default ProductChemistriesSectionV2;


