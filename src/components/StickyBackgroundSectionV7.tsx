import React from 'react';

const StickyBackgroundSectionV7 = () => {
  return (
    <>
      {/* Sticky Video Background Section */}
      <div className="relative">
        <section className="sticky top-0 h-[60vh] overflow-hidden bg-gradient-to-b from-[#115B87] to-[#1B3764] shadow-2xl">
          {/* Background Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 1 }}
          >
            <source src="https://videos.ctfassets.net/hdznx4p7ef81/10s1OuRSDAglRlWOWuKlyY/44aa091229bd400168477bd2c4a0cf16/ManufacturedinAmericaStinger_1.mp4" type="video/mp4" />
          </video>

          {/* Fallback background - always visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#115B87] to-[#1B3764]" style={{ zIndex: 0 }} />

          {/* Gradient overlays for depth */}
          <div className="absolute inset-0" style={{ zIndex: 2 }}>
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>


          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 md:px-8" style={{ zIndex: 10 }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black mb-4 md:mb-6 leading-none text-white font-kallisto" style={{ textShadow: '2px 2px 0 rgba(0, 0, 0, 0.25)' }}>
              Proudly Manufactured<br/> in America
            </h1>
            
            <div className="flex justify-center mt-6">
              <div className="w-48 md:w-64 lg:w-80 drop-shadow-2xl">
                <video
                  src="/American%20Flag.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-auto object-contain rounded-2xl shadow-2xl border-2 border-white/20"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Smooth transition content - no harsh white break */}
        <div className="relative" style={{ zIndex: 20 }}>
          {/* Content Section - seamless blue continuation */}
          <section className="bg-gradient-to-b from-[#115B87] to-[#1B3764] pt-20 pb-20 shadow-inner">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black mb-6 sm:mb-8 font-kallisto leading-none text-white" style={{ textShadow: '2px 2px 0 rgba(0, 0, 0, 0.25)' }}>
                Fully Integrated U.S. Factory
              </h2>
              
              <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-8 text-white/90 drop-shadow-sm px-4" style={{ paddingLeft: 'max(1rem, 1rem)', paddingRight: 'max(1rem, 1rem)' }}>
                Real people, making real products, making a real difference! We don't just resell & re-label someone else's products, we actually make them. We proudly manufacture our products in the USA*, in America's heartland. From R&D to manufacturing, our vertical integration gives us full control over quality, consistency, and availability.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default StickyBackgroundSectionV7;
