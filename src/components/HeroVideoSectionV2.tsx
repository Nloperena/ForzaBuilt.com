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
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#2c476e] to-[#81899f] shadow-2xl py-0 md:h-[563px] lg:h-[600px] xl:h-[750px] 2xl:h-[525px] min-[1920px]:h-[750px] min-[2560px]:h-[825px]">
      {/* Video Skeleton Loading State */}
      {!isVideoLoaded && (
        <VideoSkeleton className="absolute inset-0 md:h-[563px] lg:h-[600px] xl:h-[750px] 2xl:h-[525px] min-[1920px]:h-[750px] min-[2560px]:h-[825px]" />
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
        className={`w-full transition-opacity duration-700 md:absolute md:inset-0 md:h-full md:object-cover ${
          isVideoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          zIndex: 1,
          objectFit: 'contain',
          height: 'auto',
          display: 'block'
        }}
      >
        <source src="/videos/misc/Forza Slogan Slam Final 3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback background - always visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2c476e] to-[#81899f] md:block hidden" style={{ zIndex: 0 }} />
    </section>
  );
};

export default HeroVideoSectionV2;

