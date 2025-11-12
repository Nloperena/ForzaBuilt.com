import React from 'react';
import { useGradientMode } from '@/contexts/GradientModeContext';
import EagleHeroVideo from './EagleHeroVideo';

interface StickyHeroVideoSectionProps {
  children?: React.ReactNode;
}

const StickyHeroVideoSection: React.FC<StickyHeroVideoSectionProps> = ({ children }) => {
  const { getGradientClasses, mode } = useGradientMode();

  return (
    <>
      {/* H1 Header Section - positioned above the video (hidden for light2) */}
      {mode !== 'light2' && (
        <section className={`bg-gradient-to-b ${getGradientClasses()} pt-16 sm:pt-20`}>
          <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 lg:py-16 [&:has(>div)]:max-w-[2000px]">
            <div className="text-center mx-auto">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-fluid-display font-normal text-white mb-1 sm:mb-2 md:mb-4 font-kallisto leading-snug">
                <span className="block">High-Performing Industrial Adhesive,</span>
                <span className="block">Tape & Sealant Solutions</span>
              </h1>
            </div>
          </div>
        </section>
      )}

      
      {/* Eagle Hero Video - Simple non-sticky version */}
      <EagleHeroVideo />

      {/* Text Overlay for light2 mode */}
      {mode === 'light2' && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none" style={{ zIndex: 40 }}>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-fluid-display font-regular text-white mb-6 sm:mb-8 font-poppins leading-snug">
            High-Performing<br />
            Industrial Adhesive, Tape<br />
            & Sealant Solutions
          </h1>
        </div>
      )}

      {/* Scrollable content that slides over the sticky video */}
      <div className="relative pointer-events-auto">
        {children}
      </div>
    </>
  );
};

export default StickyHeroVideoSection;
