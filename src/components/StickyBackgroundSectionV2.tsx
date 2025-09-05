import React, { useState, useRef, useEffect } from 'react';
import VideoSkeleton from './common/VideoSkeleton';
import { useGradientMode } from '@/contexts/GradientModeContext';

const StickyBackgroundSectionV2 = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { mode, getGradientClasses, getTextClasses } = useGradientMode();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <>
      <section ref={sectionRef} className="relative h-[40vh] overflow-hidden" style={{ marginTop: '7rem' }}>
        {/* Video Skeleton Loading State */}
        {!isVideoLoaded && (
          <VideoSkeleton />
        )}
        
        {/* Sticky Video Background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={handleVideoLoad}
          className="fixed inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ 
            zIndex: -1,
            opacity: isInView && isVideoLoaded ? 1 : 0
          }}
        >
          <source src="https://videos.ctfassets.net/hdznx4p7ef81/10s1OuRSDAglRlWOWuKlyY/44aa091229bd400168477bd2c4a0cf16/ManufacturedinAmericaStinger_1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* White overlay that fades out */}
        <div 
          className="fixed inset-0 bg-white transition-opacity duration-1000"
          style={{ 
            zIndex: -1,
            opacity: isInView && isVideoLoaded ? 0 : 1
          }}
        />
        
        <div className="fixed inset-0 pointer-events-none">
          <div 
            className="absolute top-0 left-0 w-full h-12" 
            style={{ background: 'var(--gradient-overlay-top)' }}
          ></div>
          <div 
            className="absolute bottom-0 left-0 w-full h-12" 
            style={{ background: 'var(--gradient-overlay-bottom)' }}
          ></div>
        </div>
        
        {/* Content Area - positioned to scroll over the video */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 md:px-8 w-full z-10">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black mb-4 md:mb-6 leading-none text-white font-kallisto text-center">
            Proudly Manufactured<br/> in America
          </h1>
          
          {/* American Flag Video - Appended under heading */}
          <div className="flex justify-center">
            <div className="w-48 md:w-64 lg:w-80">
              <video
                src="/American%20Flag.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-auto object-contain rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Spacer section to create scrolling effect and reveal full video */}
      <section className="relative h-[15vh] bg-transparent">
        {/* This section allows scrolling to reveal the full video underneath */}
      </section>
      
      {/* Appended Content Section */}
      <section className={`bg-gradient-to-b from-[#115B87] to-[#1B3764] pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24 pb-16 relative z-10`}>
        <div className="max-w-6xl mx-auto text-center">
          {/* Combined Main Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black mb-6 sm:mb-8 font-kallisto leading-none text-white">
            <div>Fully Integrated Factory</div>
            <div>Proudly Manufactured</div>
            <div>in America</div>
          </h2>
          
          {/* Single Paragraph */}
          <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-8 text-white/80">
            Real people, making real products, making a real difference! We don't just resell & re-label someone else's products, we actually make them. We proudly manufacture our products in the USA, in America's heartland. From R&D to manufacturing, our vertical integration gives us full control over quality, consistency, and availability.
          </p>
        </div>
      </section>
    </>
  );
};

export default StickyBackgroundSectionV2; 