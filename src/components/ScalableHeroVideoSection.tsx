import React, { useState, useEffect, useRef } from 'react';
import VideoSkeleton from './common/VideoSkeleton';

const ScalableHeroVideoSection: React.FC = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoAspectRatio, setVideoAspectRatio] = useState<number | null>(null);
  
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
    // Get video dimensions and set aspect ratio
    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleLoadedMetadata = () => {
        if (video.videoWidth && video.videoHeight) {
          const aspectRatio = video.videoWidth / video.videoHeight;
          setVideoAspectRatio(aspectRatio);
        }
      };
      
      const handleCanPlay = () => {
        setIsVideoLoaded(true);
        if (video.videoWidth && video.videoHeight && !videoAspectRatio) {
          const aspectRatio = video.videoWidth / video.videoHeight;
          setVideoAspectRatio(aspectRatio);
        }
        video.play().catch((err) => {
          console.warn('Video autoplay failed:', err);
        });
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
  }, [videoAspectRatio]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Slogan Slam video failed to load:', e);
    setIsVideoLoaded(true);
  };

  // Default aspect ratio (16:9) if video metadata hasn't loaded yet
  const aspectRatioStyle = videoAspectRatio 
    ? { aspectRatio: `${videoAspectRatio}` }
    : { aspectRatio: '16 / 9' };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#2c476e] to-[#81899f] shadow-2xl">
      {/* Container that maintains video aspect ratio */}
      <div 
        className="relative w-full"
        style={aspectRatioStyle}
      >
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
            objectFit: 'contain',
            objectPosition: 'center'
          }}
        >
          <source src="/videos/backgrounds/Forza Slogan Slam Final.mp4" type="video/mp4" />
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

export default ScalableHeroVideoSection;

