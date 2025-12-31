import React, { useState, useEffect, useRef } from 'react';
import VideoSkeleton from './common/VideoSkeleton';

const HeroVideoSectionV2: React.FC = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
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

  useEffect(() => {
    // Ensure video loads and plays properly
    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleCanPlay = () => {
        setIsVideoLoaded(true);
        video.play().catch((err) => {
          console.warn('Video autoplay failed:', err);
        });
      };
      
      const handleLoadedMetadata = () => {
        // Video metadata loaded, ready to play
      };
      
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      // Force load
      video.load();
      
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Slogan Slam video failed to load:', e);
    setIsVideoLoaded(true);
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#2c476e] to-[#81899f] shadow-2xl">
      {/* Mobile: Shorter height, Desktop: Fixed height */}
      <div className="relative w-full min-h-[35vh] md:h-[563px] lg:h-[600px] xl:h-[750px] 2xl:h-[525px] min-[1920px]:h-[750px] min-[2560px]:h-[825px]">
        {/* Video Skeleton Loading State */}
        {!isVideoLoaded && (
          <VideoSkeleton className="absolute inset-0 w-full h-full" />
        )}
        
        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={handleVideoLoad}
          onCanPlay={handleVideoLoad}
          onError={handleVideoError}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            zIndex: 1,
            objectFit: 'cover',
            objectPosition: 'center',
            minHeight: '100%',
            minWidth: '100%'
          }}
        >
          <source src="/videos/misc/Forza Slogan Slam Final 3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Fallback background gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#2c476e] to-[#81899f]" 
          style={{ zIndex: 0 }} 
        />
      </div>
    </section>
  );
};

export default HeroVideoSectionV2;


