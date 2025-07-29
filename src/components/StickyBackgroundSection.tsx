import React from 'react';
import SplitText from './SplitText';

const StickyBackgroundSection = () => {
  return (
    <section className="relative h-[30vh] md:h-[65vh] flex items-center justify-center overflow-hidden bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.ctfassets.net/hdznx4p7ef81/6uNXx70LW8jZoxCoOyfZ1K/e6b08291f567d425f146053925714b99/Manufacturing_2.jpg')", backgroundPosition: 'center 20%' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-8 sm:h-12 bg-gradient-to-b from-black/60 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-8 sm:h-12 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
      </div>
      <div className="relative z-10 text-white text-center md:text-left px-2 sm:px-4 md:px-0 ml-0 md:ml-8 max-w-xs sm:max-w-sm md:max-w-4xl lg:max-w-5xl w-full">
        <div className="space-y-2 md:space-y-4">
          <SplitText
            text="Purpose Built"
            className="block text-xl sm:text-2xl md:text-6xl lg:text-7xl font-heavy leading-none font-kallisto text-[#096688] drop-shadow-lg"
            splitType="chars"
            delay={50}
          />
          <SplitText
            text="Performance"
            className="block text-xl sm:text-2xl md:text-6xl lg:text-7xl font-heavy leading-none font-kallisto text-[#808080] drop-shadow-lg"
            splitType="chars"
            delay={50}
          />
          <SplitText
            text="Guaranteed"
            className="block text-xl sm:text-2xl md:text-6xl lg:text-7xl font-heavy leading-none font-kallisto text-[#F2611D] drop-shadow-lg"
            splitType="chars"
            delay={50}
          />
          <SplitText
            text="Strength"
            className="block text-xl sm:text-2xl md:text-6xl lg:text-7xl font-heavy leading-none font-kallisto text-[#F2611D] drop-shadow-lg"
            splitType="chars"
            delay={50}
          />
        </div>
      </div>
    </section>
  );
};

export default StickyBackgroundSection; 