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
  subtitle?: string;
  useTitleCase?: boolean;
}

const IndustryHeroBanner: React.FC<IndustryHeroBannerProps> = ({ 
  videoUrl, 
  industryTitle, 
  logo, 
  color = '#1B3764', 
  variant = 'simple',
  subtitle,
  useTitleCase = false
}) => {
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
      <section className="relative h-[60vh] md:h-[88vh] overflow-hidden bg-gradient-to-b from-[#2c476e] to-[#81899f] md:pt-12 2xl:pt-0">
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

        {/* Subtitle Overlay - Centered on video (title and logo removed) */}
        {subtitle && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none" style={{ zIndex: 20 }}>
            <motion.h3
              className="font-regular text-center leading-tight font-poppins text-white"
              style={{ 
                fontSize: 'clamp(1.5rem, 3vw + 0.5rem, 4.5rem)',
                maxWidth: '1100px'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              {subtitle.split('\n').map((line, i) => {
                // Wrap "Industrial Products" to prevent orphan
                const parts = [];
                const regex = /(Industrial Products)/g;
                let lastIndex = 0;
                let match;
                let key = 0;
                
                while ((match = regex.exec(line)) !== null) {
                  // Add text before the match
                  if (match.index > lastIndex) {
                    parts.push(line.substring(lastIndex, match.index));
                  }
                  // Add the wrapped match
                  parts.push(
                    <span key={key++} style={{ whiteSpace: 'nowrap' }}>{match[0]}</span>
                  );
                  lastIndex = regex.lastIndex;
                }
                // Add remaining text
                if (lastIndex < line.length) {
                  parts.push(line.substring(lastIndex));
                }
                
                // If no match found, just use the line as-is
                const content = parts.length > 0 ? parts : [line];
                
                return (
                  <span key={i}>
                    {content}
                    {i < subtitle.split('\n').length - 1 && <br />}
                  </span>
                );
              })}
            </motion.h3>
          </div>
        )}
      </section>
    );
  }

  // Overlay variant - video with title overlay at bottom
  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden bg-gradient-to-b from-[#2c476e] to-[#81899f] z-[5]">
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

    </section>
  );
};

export default IndustryHeroBanner;

