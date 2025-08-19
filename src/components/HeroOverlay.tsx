import React from 'react';
import SplitText from './SplitText';

const HeroOverlay = () => {
  return (
    <div className="bg-[#1b3764] pt-16 sm:pt-20 relative">
              <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 lg:py-16 [&:has(>div)]:max-w-[2000px]">
        <div className="text-center w-full mx-auto">
          <SplitText
            text="High-Performing Industrial Adhesive, Tape & Sealant Solutions"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white mb-1 sm:mb-2 md:mb-4 leading-none break-words w-full font-kallisto"
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