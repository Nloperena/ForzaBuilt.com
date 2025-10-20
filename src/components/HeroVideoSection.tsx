import React, { useState, useEffect } from 'react';
import VideoSkeleton from './common/VideoSkeleton';

const HeroVideoSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  
  useEffect(() => {
    // Start loading video immediately for better mobile performance
    setIsVideoVisible(true);
    
    // Fallback timeout to prevent infinite loading on slow connections
    const timeout = setTimeout(() => {
      if (!isVideoLoaded) {
        setIsVideoLoaded(true);
      }
    }, 3000); // Reduced to 3 seconds for faster fallback

    return () => {
      clearTimeout(timeout);
    };
  }, [isVideoLoaded]);

  const handleVideoLoad = () => {
    // Directly fade in video when loaded
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    // If video fails to load, still show the section
    console.warn('Video failed to load, showing fallback');
    setIsVideoLoaded(true);
  };

  return (
    <section className="relative h-[50vh] flex items-center justify-center overflow-hidden hero-video-section">
      {/* Video Skeleton Loading State */}
      {!isVideoLoaded && (
        <VideoSkeleton />
      )}
      
      {/* Video - always load for better mobile performance */}
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
        style={{ zIndex: 1 }}
      >
        <source src="https://video-previews.elements.envatousercontent.com/adba67ed-69e8-4b91-8b79-f03dbf259b24/watermarked_preview/watermarked_preview.mp4" type="video/mp4" />
      </video>
    </section>
  );
};

export default HeroVideoSection; 