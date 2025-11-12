import React, { useState, useEffect } from 'react';
 
import VideoSkeleton from './common/VideoSkeleton';
import HeroVideoBackground from '@/components/HeroVideoBackground';
import { useGradientMode } from '@/contexts/GradientModeContext';
 

interface StickyHeroVideoSectionProps {
  children?: React.ReactNode;
}

const StickyHeroVideoSection: React.FC<StickyHeroVideoSectionProps> = ({ children }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { getGradientClasses, mode } = useGradientMode();
  
  useEffect(() => {
    // Fallback timeout to prevent infinite loading on slow connections
    const timeout = setTimeout(() => {
      if (!isVideoLoaded) {
        setIsVideoLoaded(true);
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isVideoLoaded]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    console.warn('Video failed to load, showing fallback');
    setIsVideoLoaded(true);
  };

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

      
        <section className="sticky top-0 h-[60vh] md:h-screen overflow-hidden bg-gradient-to-b from-[#2c476e] to-[#81899f] shadow-2xl">
          {/* Video Skeleton Loading State */}
          {!isVideoLoaded && (
            <VideoSkeleton />
          )}
          
          {/* Background Video via reusable component */}
          <HeroVideoBackground
            src="/videos/backgrounds/Eagle Header Video.mp4"
            onLoaded={handleVideoLoad}
            onError={handleVideoError}
            overlayClassName={mode === 'light2' ? 'bg-[#2c476e]/40' : undefined}
          />

          {/* Fallback gradient behind video */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2c476e] to-[#81899f]" style={{ zIndex: 0 }} />

          {/* Text Overlay for light2 mode */}
          {mode === 'light2' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4" style={{ zIndex: 3 }}>
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-fluid-display font-regular text-white mb-6 sm:mb-8 font-poppins leading-snug">
                High-Performing<br />
                Industrial Adhesive, Tape<br />
                & Sealant Solutions
              </h1>
            </div>
          )}

          {/* Gradient overlays for depth */}
         
        </section>

      {/* Scrollable content that slides over the sticky video */}
      <div className="relative">
        {children}
      </div>
    </>
  );
};

export default StickyHeroVideoSection;
