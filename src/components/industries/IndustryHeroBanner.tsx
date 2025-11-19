import React, { useState, useEffect } from 'react';
import VideoSkeleton from '../common/VideoSkeleton';
import { motion } from 'framer-motion';
import ImageSkeleton from '../common/ImageSkeleton';

interface IndustryHeroBannerProps {
  videoUrl: string;
  industryTitle: string;
  logo?: string;
  color?: string;
  variant?: 'simple' | 'overlay';
}

const IndustryHeroBanner: React.FC<IndustryHeroBannerProps> = ({ videoUrl, industryTitle, logo, color = '#1B3764', variant = 'simple' }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [iconLoaded, setIconLoaded] = useState(false);

  useEffect(() => {
    // Fallback timeout to prevent infinite loading on slow connections
    const timeout = setTimeout(() => {
      if (!videoLoaded) {
        setVideoLoaded(true);
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [videoLoaded]);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = () => {
    setVideoLoaded(true);
  };

  const handleIconLoad = () => {
    setIconLoaded(true);
  };

  const handleIconError = () => {
    setIconLoaded(true);
  };

  // Simple variant - just video
  if (variant === 'simple') {
    return (
      <section className="relative w-full h-full flex items-center justify-center overflow-hidden z-[5] hero-video-area">
        {!videoLoaded && <ImageSkeleton className="rounded-xl" />}
        <video
          key={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover object-center z-[5] transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            width: '100%',
            height: '100%',
            minWidth: '100%',
            minHeight: '100%'
          }}
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </section>
    );
  }

  // Overlay variant - video with title overlay at bottom
  return (
    <section className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#2c476e] to-[#81899f] z-[5]">
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
      </video>

      {/* Fallback background - always visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2c476e] to-[#81899f]" style={{ zIndex: 0 }} />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" style={{ zIndex: 2 }} />

      {/* Title and Logo Overlay - Positioned at bottom */}
      <div className="absolute inset-0 flex items-end justify-center pb-8 md:pb-12 lg:pb-16 px-4 pointer-events-none" style={{ zIndex: 20 }}>
        <motion.div 
          className="w-full flex items-center justify-center"
          style={{ 
            gap: 'clamp(1rem, 2vw, 2rem)'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <h1
            className="font-black mb-0 leading-none font-kallisto text-white"
            style={{ 
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.5)',
              fontSize: 'clamp(2rem, 5vw + 0.5rem, 6rem)'
            }}
          >
            {industryTitle.toUpperCase()}
          </h1>
          {logo && (
            <div className="relative" style={{ width: 'clamp(4rem, 8vw, 12rem)', height: 'clamp(4rem, 8vw, 12rem)' }}>
              {!iconLoaded && <VideoSkeleton />}
              <motion.img
                src={logo}
                alt={`${industryTitle} icon`}
                className="w-auto h-full object-contain transition-opacity duration-500"
                style={{ 
                  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8))',
                  opacity: iconLoaded ? 1 : 0
                }}
                loading="lazy"
                onLoad={handleIconLoad}
                onError={handleIconError}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: iconLoaded ? 1 : 0, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
              />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default IndustryHeroBanner;

