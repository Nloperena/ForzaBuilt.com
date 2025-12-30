import React from 'react';
import { useGradientMode } from '@/contexts/GradientModeContext';
import EagleHeroVideo from './EagleHeroVideo';

interface StickyHeroVideoSectionProps {
  children?: React.ReactNode;
}

const StickyHeroVideoSection: React.FC<StickyHeroVideoSectionProps> = ({ children }) => {
  const { getGradientClasses, mode } = useGradientMode();

  return (
      <div className="relative">
      {/* Sticky Video Background Section */}
      <div className="sticky top-0" style={{ zIndex: 1 }}>
        <EagleHeroVideo />
        
        {/* Text Overlay - centered on mobile and desktop */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pointer-events-none text-center" style={{ zIndex: 20, padding: '0 0 4rem 0' }}>
          <h1 className={`font-regular text-white leading-tight ${
            mode === 'light2' ? 'font-poppins' : 'font-kallisto'
          }`} style={{ fontSize: 'clamp(1.5rem, 3vw + 0.5rem, 4.5rem)' }}>
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
      <div className="relative pointer-events-auto" style={{ zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
};

export default StickyHeroVideoSection;
