import React from 'react';
import SplitText from './SplitText';
import { useGradientMode } from '@/contexts/GradientModeContext';

const StickyBackgroundSection = () => {
  const { getTextClasses } = useGradientMode();
  
  return (
    <section className="relative h-[40vh] md:h-[60vh] lg:h-[70vh] flex items-center justify-start overflow-hidden bg-cover bg-center md:bg-fixed" style={{ backgroundImage: "url('https://images.ctfassets.net/hdznx4p7ef81/6uNXx70LW8jZoxCoOyfZ1K/e6b08291f567d425f146053925714b99/Manufacturing_2.jpg')", backgroundPosition: 'center 20%' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-8 sm:h-12 bg-gradient-to-b from-black/60 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-8 sm:h-12 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
      </div>
      <div className={`relative ${getTextClasses()} text-left px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full h-full flex flex-col justify-center`}>
        <div className="space-y-1 sm:space-y-1 md:space-y-2 lg:space-y-2 xl:space-y-3">
          <div className="text-[clamp(1.25rem,6vw,6rem)] font-heavy leading-none font-kallisto text-[#096688]" style={{ textShadow: '2px 2px 0 rgba(0, 0, 0, 0.25)' }}>
            Purpose-Built
          </div>
          <div className="text-[clamp(1.25rem,6vw,6rem)] font-heavy leading-none font-kallisto text-[#808080]" style={{ textShadow: '2px 2px 0 rgba(0, 0, 0, 0.25)' }}>
            Performance
          </div>
          <div className="text-[clamp(1.25rem,6vw,6rem)] font-heavy leading-none font-kallisto text-[#F2611D]" style={{ textShadow: '2px 2px 0 rgba(0, 0, 0, 0.25)' }}>
            Guaranteed
          </div>
          <div className="text-[clamp(1.25rem,6vw,6rem)] font-heavy leading-none font-kallisto text-[#F2611D]" style={{ textShadow: '2px 2px 0 rgba(0, 0, 0, 0.25)' }}>
            Strength
          </div>
        </div>
      </div>
    </section>
  );
};

export default StickyBackgroundSection; 