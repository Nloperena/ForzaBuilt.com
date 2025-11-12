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
      {/* Eagle Hero Video - Simple non-sticky version with overlay text */}
      <div className="relative">
        <EagleHeroVideo />
        
        {/* Text Overlay - positioned on top of video for all modes */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none" style={{ zIndex: 20 }}>
          <h1 className={`text-2xl sm:text-4xl md:text-5xl lg:text-fluid-display font-regular text-white leading-snug ${
            mode === 'light2' ? 'font-poppins' : 'font-kallisto'
          }`}>
            {mode === 'light2' ? (
              <>
                High-Performing<br />
                Industrial Adhesive, Tape<br />
                & Sealant Solutions
              </>
            ) : (
              <>
                <span className="block">High-Performing Industrial Adhesive,</span>
                <span className="block">Tape & Sealant Solutions</span>
              </>
            )}
          </h1>
        </div>
      </div>

      {/* Scrollable content that slides over the sticky video */}
      <div className="relative pointer-events-auto">
        {children}
      </div>
    </>
  );
};

export default StickyHeroVideoSection;
