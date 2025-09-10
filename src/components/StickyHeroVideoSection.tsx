import React, { useState, useEffect } from 'react';
import VideoSkeleton from './common/VideoSkeleton';
import { useGradientMode } from '@/contexts/GradientModeContext';

interface StickyHeroVideoSectionProps {
  children?: React.ReactNode;
}

const StickyHeroVideoSection: React.FC<StickyHeroVideoSectionProps> = ({ children }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { getGradientClasses } = useGradientMode();
  
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
      {/* H1 Header Section - positioned above the video */}
      <section className={`bg-gradient-to-b ${getGradientClasses()} pt-16 sm:pt-20`}>
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 lg:py-16 [&:has(>div)]:max-w-[2000px]">
          <div className="text-center mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white mb-1 sm:mb-2 md:mb-4 leading-none font-kallisto">
              <span className="block">High-Performing Industrial Adhesive,</span>
              <span className="block">Tape & Sealant Solutions</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Sticky Video Background Section */}
      <div className="relative">
        <section className="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-[#115B87] to-[#1B3764] shadow-2xl">
          {/* Video Skeleton Loading State */}
          {!isVideoLoaded && (
            <VideoSkeleton />
          )}
          
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onLoadedData={handleVideoLoad}
            onCanPlay={handleVideoLoad}
            onError={handleVideoError}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              zIndex: 1,
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              minWidth: '100%',
              minHeight: '100%'
            }}
          >
            <source src="/ForzaLionLoop-1-2.mp4" type="video/mp4" />
          </video>

          {/* Fallback background - always visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#115B87] to-[#1B3764]" style={{ zIndex: 0 }} />

          {/* Gradient overlays for depth */}
          <div className="absolute inset-0" style={{ zIndex: 2 }}>
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </section>

        {/* Content that will slide over the sticky video background */}
        <div className="relative" style={{ zIndex: 20 }}>
          {children}
        </div>
      </div>
    </>
  );
};

export default StickyHeroVideoSection;
