import React, { useState, useEffect } from 'react';
import VideoSkeleton from '../common/VideoSkeleton';
import ImageSkeleton from '../common/ImageSkeleton';
import { motion } from 'framer-motion';

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

  const handleIconLoad = () => {
    setIconLoaded(true);
  };

  const handleIconError = () => {
    setIconLoaded(true);
  };

  // Simple variant - full screen video with title and subtitle overlay (like homepage)
  if (variant === 'simple') {
    return (
      <section className="relative h-[60vh] md:h-screen overflow-hidden bg-gradient-to-b from-[#2c476e] to-[#81899f] md:pt-12 2xl:pt-0">
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

        {/* Title, Logo, and Subtitle Overlay - Centered on video */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none" style={{ zIndex: 20 }}>
          <motion.div 
            className="w-full flex flex-col items-center justify-center"
            style={{ gap: 'clamp(1rem, 2vw, 2rem)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            {/* Title and Icon Row */}
            <div className="flex items-center justify-center" style={{ gap: 'clamp(1rem, 2vw, 2rem)' }}>
              <h1
                className="font-black mb-0 leading-none font-kallisto text-white"
                style={{ 
                  fontSize: 'clamp(1.5rem, 4vw + 0.5rem, 6rem)'
                }}
              >
                {industryTitle.toUpperCase()}
              </h1>
              {logo && (
                <div className="relative" style={{ width: 'clamp(5rem, 8vw, 14rem)', height: 'clamp(5rem, 8vw, 14rem)' }}>
                  {!iconLoaded && <VideoSkeleton />}
                  <motion.img
                    src={logo}
                    alt={`${industryTitle} icon`}
                    className="w-auto h-full object-contain transition-opacity duration-500"
                    style={{ 
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
            </div>

            {/* High-Performance Subtitle - Regular Poppins */}
            <motion.h3
              className="font-regular text-center leading-tight font-poppins text-white"
              style={{ 
                fontSize: 'clamp(1.5rem, 3vw + 0.5rem, 4.5rem)',
                maxWidth: '1100px',
                marginTop: 'clamp(0.5rem, 1vw, 1.5rem)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            >
              {`Building High-Performance ${industryTitle.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())} Adhesive, Tape & Sealant Solutions`}
            </motion.h3>
          </motion.div>
        </div>
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

