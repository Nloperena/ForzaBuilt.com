import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VideoSkeleton from './common/VideoSkeleton';
import { useGradientMode } from '@/contexts/GradientModeContext';
import { Button } from '@/components/ui/button';

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
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-normal text-white mb-1 sm:mb-2 md:mb-4 leading-relaxed font-kallisto">
                <span className="block">High-Performing Industrial Adhesive,</span>
                <span className="block">Tape & Sealant Solutions</span>
              </h1>
            </div>
          </div>
        </section>
      )}

      {/* Sticky Video Background Section */}
      <div className="relative">
        <section className="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-[#293350] to-[#81899f] shadow-2xl">
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
          <div className="absolute inset-0 bg-gradient-to-b from-[#293350] to-[#81899f]" style={{ zIndex: 0 }} />

          {/* Thin blue overlay for text readability (light2 mode only) */}
          {mode === 'light2' && (
            <div className="absolute inset-0 bg-[#293350]/40" style={{ zIndex: 2 }} />
          )}

          {/* Text Overlay for light2 mode */}
          {mode === 'light2' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4" style={{ zIndex: 3 }}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-semibold text-white mb-6 sm:mb-8 leading-tight font-poppins">
                High-Performing<br />
                Industrial Adhesives, Tape<br />
                & Sealant Solutions
              </h1>
              <Button asChild className="bg-[#F2611D] hover:bg-[#F2611D]/90 text-white rounded-full px-10 py-7 text-xl font-medium shadow-lg">
                <Link to="/products">Products</Link>
              </Button>
            </div>
          )}

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
