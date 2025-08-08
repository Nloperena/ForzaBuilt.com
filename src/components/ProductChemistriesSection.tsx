import React from 'react';
import ChemistryCard from './ChemistryCard';
// Chemistry icon paths
const CHEMISTRY_ICONS = {
  epoxy: '/chemistry-icons/Epoxy icon.svg',
  silicone: '/chemistry-icons/Silicone icon.svg',
  ms: '/chemistry-icons/MS icon.svg',
  waterbase: '/chemistry-icons/Waterbase icon.svg'
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
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-[#1b3764] text-white relative">
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

export default ProductChemistriesSection; 