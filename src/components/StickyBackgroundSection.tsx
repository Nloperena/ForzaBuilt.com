import React from 'react';
import SplitText from './SplitText';

const StickyBackgroundSection = () => {
  return (
    <section className="relative h-[40vh] md:h-[60vh] lg:h-[70vh] flex items-center justify-start overflow-hidden bg-cover bg-center md:bg-fixed" style={{ backgroundImage: "url('https://images.ctfassets.net/hdznx4p7ef81/6uNXx70LW8jZoxCoOyfZ1K/e6b08291f567d425f146053925714b99/Manufacturing_2.jpg')", backgroundPosition: 'center 20%' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-8 sm:h-12 bg-gradient-to-b from-black/60 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-8 sm:h-12 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
      </div>
      <div className="relative z-10 text-white text-left px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full h-full flex flex-col justify-center">
        <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6 xl:space-y-8">
          <div className="text-[clamp(1.25rem,6vw,6rem)] font-heavy leading-none font-kallisto text-[#096688] drop-shadow-lg">
            Purpose-Built
          </div>
          <div className="text-[clamp(1.25rem,6vw,6rem)] font-heavy leading-none font-kallisto text-[#808080] drop-shadow-lg">
            Performance
          </div>
          <div className="text-[clamp(1.25rem,6vw,6rem)] font-heavy leading-none font-kallisto text-[#F2611D] drop-shadow-lg">
            Guaranteed
          </div>
          <div className="text-[clamp(1.25rem,6vw,6rem)] font-heavy leading-none font-kallisto text-[#F2611D] drop-shadow-lg">
            Strength
          </div>
        </div>
      </div>
    </section>
  );
};

export default StickyBackgroundSection; 