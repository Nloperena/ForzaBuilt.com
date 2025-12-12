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
    console.log('Slogan Slam video loaded successfully');
    setIsVideoLoaded(true);
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Slogan Slam video failed to load:', e);
    console.error('Video source:', '/videos/misc/Forza Slogan Slam Final 3.mp4');
    setIsVideoLoaded(true);
  };

  return (
    <section className="relative h-[525px] md:h-[563px] lg:h-[600px] xl:h-[750px] 2xl:h-[525px] min-[1920px]:h-[750px] min-[2560px]:h-[825px] overflow-hidden bg-gradient-to-b from-[#2c476e] to-[#81899f] shadow-2xl py-0">
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
        preload="auto"
        onLoadedData={handleVideoLoad}
        onCanPlay={handleVideoLoad}
        onError={handleVideoError}
        onLoadStart={() => console.log('Slogan Slam video loading started')}
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
        <source src="/videos/misc/Forza Slogan Slam Final 3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback background - always visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2c476e] to-[#81899f]" style={{ zIndex: 0 }} />
    </section>
  );
};

export default HeroVideoSectionV2;

