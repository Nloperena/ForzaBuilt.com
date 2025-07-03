import React from 'react';
import SplitText from './SplitText';

const StickyBackgroundSection = () => {
  return (
    <section className="relative h-[65vh] flex items-center justify-start overflow-hidden bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.ctfassets.net/hdznx4p7ef81/6uNXx70LW8jZoxCoOyfZ1K/e6b08291f567d425f146053925714b99/Manufacturing_2.jpg')" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black/60 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
      </div>
      <div className="relative z-10 text-white text-left px-24 max-w-3xl w-full">
        <SplitText
          text="Purpose Built"
          className="text-7xl font-heavy mb-2 leading-none font-kallisto text-[#274690] drop-shadow-lg"
          splitType="words"
          delay={50}
        />
        <SplitText
          text="Performance"
          className="text-7xl font-heavy mb-2 leading-none font-kallisto text-[#808080] drop-shadow-lg"
          splitType="words"
          delay={50}
        />
        <SplitText
          text="Guaranteed"
          className="text-7xl font-heavy mb-2 leading-none font-kallisto text-[#F2611D] drop-shadow-lg"
          splitType="words"
          delay={50}
        />
        <SplitText
          text="Strength"
          className="text-7xl font-heavy leading-none font-kallisto text-[#F2611D] drop-shadow-lg"
          splitType="words"
          delay={50}
        />
      </div>
    </section>
  );
};

export default StickyBackgroundSection; 