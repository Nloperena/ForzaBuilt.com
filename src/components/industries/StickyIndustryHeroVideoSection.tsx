import React, { useState, useEffect } from 'react';
import VideoSkeleton from '../common/VideoSkeleton';

interface StickyIndustryHeroVideoSectionProps {
  videoUrl: string;
  industryTitle: string;
  children?: React.ReactNode;
}

const StickyIndustryHeroVideoSection: React.FC<StickyIndustryHeroVideoSectionProps> = ({ 
  videoUrl, 
  industryTitle,
  children 
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!videoLoaded) {
        console.warn('Industry video took too long to load, showing fallback');
        setVideoLoaded(true);
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [videoLoaded]);

  const handleVideoLoad = () => {
    console.log('Industry video loaded successfully');
    setVideoLoaded(true);
  };

  const handleVideoError = () => {
    console.warn('Industry video failed to load, showing fallback');
    setVideoLoaded(true);
  };

  return (
    <>
      {/* Sticky Video Background Section */}
      <section className="sticky top-0 h-[60vh] md:h-screen overflow-hidden bg-gradient-to-b from-[#2c476e] to-[#81899f] shadow-2xl md:pt-12 2xl:pt-0" style={{ zIndex: 1 }}>
        {/* Video Skeleton Loading State */}
        {!videoLoaded && (
          <VideoSkeleton />
        )}
        
        {/* Background Video */}
        <video
          key={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={handleVideoLoad}
          onCanPlay={handleVideoLoad}
          onError={handleVideoError}
          onLoadStart={() => console.log('Industry video loading started')}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
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
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Fallback background - always visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c476e] to-[#81899f]" style={{ zIndex: 0 }} />

        {/* Blue overlay on top of video */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c476e]/60 to-[#81899f]/60" style={{ zIndex: 2 }} />
      </section>

      {/* Content that will slide over the sticky video background */}
      <div className="relative pointer-events-auto" style={{ zIndex: 10 }}>
        {children}
      </div>
    </>
  );
};

export default StickyIndustryHeroVideoSection;

