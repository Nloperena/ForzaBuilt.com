import React from 'react';
import SplitText from './SplitText';

const HeroOverlay = () => {
  return (
    <div className="bg-[#1b3764] pt-16 sm:pt-20 shadow-2xl relative z-10">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 lg:py-16 [&:has(>div)]:max-w-[1800px]">
        <div className="text-center w-full mx-auto">
          <SplitText
            text="High-Performing Industrial Adhesive, Tape & Sealant Solutions"
            className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black text-white mb-1 sm:mb-2 md:mb-4 leading-tight break-words w-full font-kallisto"
            splitType="words"
            delay={50}
            as="h1"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroOverlay; 