import React from 'react';
import ChemistryCard from './ChemistryCard';
import { FlaskConical, Beaker, Blocks, Droplets } from 'lucide-react';

const ProductChemistriesSection = () => {
  // Define static chemistry categories for the flip-box section
  const chemistryCategories = [
    {
      name: 'MS',
      icon: <FlaskConical className="w-24 h-24" />,
      description: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetuer Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,'
    },
    {
      name: 'Silicone',
      icon: <Beaker className="w-24 h-24" />,
    },
    {
      name: 'Epoxy',
      icon: <Blocks className="w-24 h-24" />,
    },
    {
      name: 'Water Base',
      icon: <Droplets className="w-24 h-24" />,
    },
  ];

  return (
    <section className="py-20 bg-[#1b3764] text-white relative">
      <div className="w-full px-4 max-w-7xl mx-auto z-10 relative">
        <h2 className="text-5xl font-extrabold mb-8 text-center font-kallisto">Product Chemistries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {chemistryCategories.map((category, index) => (
            <div key={index} className="aspect-square">
              <ChemistryCard title={category.name} icon={category.icon} description={category.description} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductChemistriesSection; 