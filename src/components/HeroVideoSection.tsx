import React, { useState, useEffect } from 'react';

const HeroVideoSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  useEffect(() => {
    // Only start loading video when component is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector('.hero-video-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const handleVideoLoad = () => {
    // Directly fade in video when loaded
    setIsVideoLoaded(true);
  };

  return (
    <section className="relative h-[50vh] flex items-center justify-center overflow-hidden hero-video-section">
      {/* Clean loading state */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#1B3764] to-[#2C5F8A] flex items-center justify-center">
          {/* Simple loading indicator */}
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-white/40 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}
      
      {/* Video - only load when visible */}
      {isVideoVisible && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          onLoadedData={handleVideoLoad}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ zIndex: 1 }}
        >
          <source src="https://forzabuilt.com/wp-content/uploads/2024/12/ForzaLionLoop-1-2.mp4" type="video/mp4" />
        </video>
      )}
    </section>
  );
};

export default HeroVideoSection; 