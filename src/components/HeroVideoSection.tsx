import React, { useState, useEffect, useRef } from 'react';
import { createOptimizedVideo } from '@/utils/videoOptimization';

const HeroVideoSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Create optimized video element
    const video = createOptimizedVideo('/ForzaLionLoop-1-2.mp4', {
      preload: 'metadata',
      poster: '/Forza-lion-logo.png',
      fallbackImage: '/Forza-lion-logo.png',
      onLoad: () => {
        setIsVideoLoaded(true);
      },
      onError: () => {
        console.error('Video failed to load, falling back to poster image');
        setHasError(true);
        setIsVideoLoaded(true);
      },
      onTimeout: () => {
        console.log('Video loading timeout, showing poster image');
        setHasError(true);
        setIsVideoLoaded(true);
      },
      timeoutMs: 3000
    });

    // Set video attributes
    video.className = `absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
      isVideoLoaded ? 'opacity-100' : 'opacity-0'
    }`;
    video.style.zIndex = '1';
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    // Replace container content with video
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(video);
    videoRef.current = video;

    // Cleanup function
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.remove();
      }
    };
  }, [isVideoLoaded]);

  return (
    <section className="relative h-[50vh] flex items-center justify-center overflow-hidden hero-video-section">
      {/* Loading state */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#1B3764] to-[#2C5F8A] flex items-center justify-center z-10">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-white/40 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}
      
      {/* Video container */}
      <div 
        ref={containerRef}
        className={`absolute inset-0 transition-opacity duration-500 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ zIndex: 1 }}
      />
      
      {/* Fallback poster image if video fails */}
      {hasError && (
        <img 
          src="/Forza-lion-logo.png" 
          alt="Forza Lion Logo" 
          className="absolute inset-0 w-full h-full object-cover z-1"
        />
      )}
    </section>
  );
};

export default HeroVideoSection; 