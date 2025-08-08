import React from 'react';

const StickyBackgroundSectionV2 = () => {
  return (
    <>
      <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="fixed inset-0 w-full h-full object-cover"
          style={{ zIndex: -1 }}
        >
          <source src="https://videos.ctfassets.net/hdznx4p7ef81/10s1OuRSDAglRlWOWuKlyY/44aa091229bd400168477bd2c4a0cf16/ManufacturedinAmericaStinger_1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
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
        <div className="relative z-10 text-white text-center px-4 md:px-8 max-w-[1600px] w-full">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl 2xl:text-10xl font-black mb-4 md:mb-6 leading-none text-white drop-shadow-lg font-kallisto" style={{ textShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(255,255,255,0.1), 0 4px 8px rgba(0,0,0,0.5)' }}>
            Proudly Manufactured in America
          </h1>
          
          {/* American Flag Image - Appended under heading */}
          <div className="flex justify-center mb-4 md:mb-6">
            <div className="w-48 md:w-64 lg:w-80">
              <video
                src="https://videos.ctfassets.net/hdznx4p7ef81/7FAYaB8msFZnVuKOMhuFse/30b2c632640ff0043ceea78211521787/Gen-4_Flag8.webm"
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
      <section className="bg-[#1b3764] py-6 sm:py-8 md:py-12 lg:py-16" style={{ boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.2), inset 0 -2px 4px rgba(255,255,255,0.05)' }}>
        <div className="max-w-4xl mx-auto px-3 sm:px-6 md:px-8 text-center">
          {/* Subheading */}
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-2 sm:mb-3 md:mb-4 text-white font-kallisto" style={{ textShadow: 'inset 0 1px 2px rgba(0,0,0,0.2), inset 0 -1px 2px rgba(255,255,255,0.1)' }}>
            Proudly Made in America
          </h2>
          

          
          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed max-w-2xl sm:max-w-3xl mx-auto" style={{ textShadow: 'inset 0 1px 1px rgba(0,0,0,0.1)' }}>
            We're proud to manufacture our high-performance industrial adhesives, tapes, and sealants right here in the USA.
          </p>
        </div>
      </section>
    </>
  );
};

export default StickyBackgroundSectionV2; 