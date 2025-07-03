import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const MadeInAmerica = () => {
  return (
    <section className="pt-16 md:pt-24 px-0 md:px-0 text-[#1b3764] bg-[#1b3764]" style={{ marginTop: '-20rem' }}>
      <div className="max-w-[1000px] mx-auto relative overflow-visible">
        {/* Subtle pyramid background - REMOVED */}
        
        <div className="flex flex-col items-center justify-center text-center relative z-10">
          {/* Video Container - Top of Pyramid (Widest) */}
          <div className="w-full h-[60vh] flex justify-center z-10">
            <div className="relative w-full h-full flex justify-center">
              <video
                src="https://videos.ctfassets.net/hdznx4p7ef81/7FAYaB8msFZnVuKOMhuFse/30b2c632640ff0043ceea78211521787/Gen-4_Flag8.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain mt-[9rem]"
              />
            </div>
          </div>

          {/* Full-width white background behind content */}
          <div
            className="w-screen left-1/2 -translate-x-1/2 absolute z-0"
            style={{
              top: '48vh', // Move further down as requested
              minHeight: '400px',
              height: 'calc(100% - 48vh)',
              background: 'white',
              paddingTop: '20vh', // Reduce padding to bring text closer to video
            }}
            aria-hidden="true"
          ></div>

          {/* Content Area with white background, positioned below video */}
          <div className="relative w-full bg-transparent pt-8 rounded-t-[2rem] z-20 px-4">
            {/* Divider line - tapered width */}
            <div className="w-3/4 max-w-lg mx-auto mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-[#1b3764]/20 to-transparent rounded-full"></div>
            </div>

            {/* Heading - Middle of Pyramid (Medium Width) */}
            <div className="max-w-[1800px] mx-auto mb-6 w-full">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1b3764] uppercase font-kallisto">
                Made in America
              </h2>
            </div>
            
            {/* Divider line - narrower */}
            <div className="w-1/2 max-w-md mx-auto mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-[#1b3764]/20 to-transparent rounded-full"></div>
            </div>
            
            {/* Paragraph - Narrower than heading */}
            <div className="max-w-[1800px] mx-auto mb-10 w-full">
              <p className="text-lg text-[#1b3764]">
                We're proud to manufacture our high-performance industrial adhesives, tapes, and sealants right here in the USA. Our commitment to American manufacturing ensures superior quality, faster delivery, and stronger support for our local communities.
              </p>
            </div>
            
            {/* Divider line - narrowest */}
            <div className="w-1/3 max-w-xs mx-auto mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-[#1b3764]/20 to-transparent rounded-full"></div>
            </div>
            
            {/* Button - Bottom of Pyramid (Narrowest) */}
            <div className="max-w-xs mx-auto overflow-hidden rounded-[2rem] group hover:transform hover:scale-105 transition-all duration-300 bg-[#F2611D] mb-10">
              <Link to="/products" className="block">
                <Button className="w-full bg-[#F2611D] hover:bg-[#F2611D]/90 text-white px-8 py-6 text-xl whitespace-nowrap border-0 rounded-[2rem]">
                  Explore Our Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MadeInAmerica; 