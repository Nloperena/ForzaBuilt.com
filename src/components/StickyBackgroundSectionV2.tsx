import React, { useState, useEffect, useRef } from 'react';

const StickyBackgroundSectionV2 = () => {
  const [isInView, setIsInView] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Start playing video when in view
          if (videoRef.current) {
            videoRef.current.play();
          }
        } else {
          setIsInView(false);
          // Pause video when out of view
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
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
      <section ref={sectionRef} className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Video Background with Fade-in Effect */}
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
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
          className="absolute inset-0 bg-white transition-opacity duration-1000"
          style={{ 
            zIndex: -1,
            opacity: isInView && isVideoLoaded ? 0 : 1
          }}
        />
        
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-0 left-0 w-full h-12" 
            style={{ background: 'var(--gradient-overlay-top)' }}
          ></div>
          <div 
            className="absolute bottom-0 left-0 w-full h-12" 
            style={{ background: 'var(--gradient-overlay-bottom)' }}
          ></div>
        </div>
        
        {/* Content Area */}
        <div className="relative text-white text-center px-4 md:px-8 max-w-[1600px] w-full z-10">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black mb-4 md:mb-6 leading-none text-white font-kallisto">
            <span className="whitespace-nowrap">Proudly Manufactured</span><br />
            in America
          </h1>
          
          {/* American Flag Image - Appended under heading */}
          <div className="flex justify-center mb-4 md:mb-6">
            <div className="w-48 md:w-64 lg:w-80">
              <video
                src="/American%20Flag.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Appended Content Section */}
      <section className="bg-[#1b3764] pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 md:px-8 text-center">
          {/* Subheading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white mb-2 sm:mb-3 md:mb-4 font-kallisto leading-none">
            <span className="whitespace-nowrap">Proudly Manufactured</span><br />
            in America
          </h2>
          
          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed max-w-2xl sm:max-w-3xl mx-auto">
            We're proud to manufacture our high-performance industrial adhesives, tapes, and sealants right here in the USA.
          </p>
        </div>
      </section>
    </>
  );
};

export default StickyBackgroundSectionV2; 