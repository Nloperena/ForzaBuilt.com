import React, { useState, useRef } from 'react';
import { useGradientMode } from '@/contexts/GradientModeContext';

interface StickyBackgroundSectionProps {
  children?: React.ReactNode;
}

const StickyBackgroundSection: React.FC<StickyBackgroundSectionProps> = ({ children }) => {
  const { getTextClasses } = useGradientMode();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    setVideoError(true);
    console.error('Failed to load video');
  };
  
  return (
    <div className="relative">
      {/* Sticky Video Background Section */}
      <section className="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-[#293350] to-[#81899f] shadow-2xl">
        {/* Fallback background */}
        {(!isVideoLoaded || videoError) && (
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: "url('https://images.ctfassets.net/hdznx4p7ef81/6uNXx70LW8jZoxCoOyfZ1K/e6b08291f567d425f146053925714b99/Manufacturing_2.jpg')", 
              backgroundPosition: 'center 20%',
              zIndex: 0
            }}
          />
        )}
        
        {/* Video Background - Self-contained within section */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ 
            opacity: isVideoLoaded && !videoError ? 1 : 0,
            zIndex: 1
          }}
        >
          <source src="/Forza Slogan Slam Final 1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
      </section>

      {/* Content that will slide over the sticky video background */}
      <div className="relative" style={{ zIndex: 20 }}>
        {children}
      </div>
    </div>
  );
};

export default StickyBackgroundSection; 