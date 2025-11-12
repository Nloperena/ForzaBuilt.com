import React, { useState, useEffect } from 'react';
import VideoSkeleton from './common/VideoSkeleton';

const EagleHeroVideo: React.FC = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  useEffect(() => {
    // Fallback timeout to prevent infinite loading on slow connections
    const timeout = setTimeout(() => {
      if (!isVideoLoaded) {
        console.warn('Eagle video took too long to load, showing fallback');
        setIsVideoLoaded(true);
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isVideoLoaded]);

  const handleVideoLoad = () => {
    console.log('Eagle video loaded successfully');
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    console.warn('Eagle video failed to load, showing fallback');
    setIsVideoLoaded(true);
  };

  return (
    <section className="relative h-[60vh] md:h-screen overflow-hidden bg-gradient-to-b from-[#2c476e] to-[#81899f] shadow-2xl">
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
        onLoadStart={() => console.log('Eagle video loading started')}
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
        <source src="/videos/backgrounds/Eagle Header Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback background - always visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2c476e] to-[#81899f]" style={{ zIndex: 0 }} />
    </section>
  );
};

export default EagleHeroVideo;

