import React from 'react';
import SplitText from './SplitText';

const HeroOverlay = () => {
  return (
    <div className="bg-[#1b3764]/95 backdrop-blur-sm pt-20 shadow-2xl">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 [&:has(>div)]:max-w-[1800px]">
        <div className="text-center w-full mx-auto">
          <SplitText
            text="High-Performing Industrial Adhesive, Tape & Sealant Solutions"
            className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-extrabold text-white mb-6 sm:mb-12 leading-tight w-full font-kallisto"
            splitType="words"
            delay={50}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroOverlay; 