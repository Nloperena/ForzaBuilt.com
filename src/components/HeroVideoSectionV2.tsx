import React, { useState, useEffect } from 'react';
import VideoSkeleton from './common/VideoSkeleton';

const HeroVideoSectionV2: React.FC = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
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
    <section className="relative h-[600px] md:h-[650px] lg:h-[700px] xl:h-[900px] 2xl:h-[600px] min-[1920px]:h-[900px] min-[2560px]:h-[1000px] overflow-hidden bg-gradient-to-b from-[#2c476e] to-[#81899f] shadow-2xl py-0">
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
        <source src="/videos/misc/Forza Slogan Slam Final 1.mp4" type="video/mp4" />
      </video>

      {/* Fallback background - always visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2c476e] to-[#81899f]" style={{ zIndex: 0 }} />
    </section>
  );
};

export default HeroVideoSectionV2;

