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
      icon: <img src={CHEMISTRY_ICONS.ms} alt="MS Chemistry" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 2xl:w-44 2xl:h-44" />,
      description: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetuer Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,'
    },
    {
      name: 'Silicone',
      icon: <img src={CHEMISTRY_ICONS.silicone} alt="Silicone Chemistry" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 2xl:w-44 2xl:h-44" />,
      description: 'More information about Silicone will go here.'
    },
    {
      name: 'Epoxy',
      icon: <img src={CHEMISTRY_ICONS.epoxy} alt="Epoxy Chemistry" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 2xl:w-44 2xl:h-44" />,
      description: 'More information about Epoxy will go here.'
    },
    {
      name: 'Water Base',
      icon: <img src={CHEMISTRY_ICONS.waterbase} alt="Water Base Chemistry" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 2xl:w-44 2xl:h-44" />,
      description: 'More information about Water Base will go here.'
    },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-[#1b3764] text-white relative">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-8xl mx-auto z-10 relative">
        <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black font-kallisto mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-center leading-tight break-words">Product Chemistries</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16">
          {chemistryCategories.map((category, index) => (
            <div key={index} className="aspect-square p-4 sm:p-6 md:p-8 lg:p-12">
              <ChemistryCard title={category.name} icon={category.icon} description={category.description} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductChemistriesSection; 