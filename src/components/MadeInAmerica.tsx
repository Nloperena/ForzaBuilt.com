import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import VideoSkeleton from './common/VideoSkeleton';

const MadeInAmerica = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section className="pt-16 md:pt-20 lg:pt-24 px-0 md:px-0 text-[#115B87] bg-[#115B87]" style={{ marginTop: '-10rem md:-20rem' }}>
      <div className="max-w-[1000px] mx-auto relative overflow-visible">
        {/* Subtle pyramid background - REMOVED */}
        
        <div className="flex flex-col items-center justify-center text-center relative z-10">
          {/* Video Container - Top of Pyramid (Widest) */}
          <div className="w-full h-[40vh] md:h-[60vh] flex justify-center z-10">
            <div className="relative w-full h-full flex justify-center">
              {/* Video Skeleton Loading State */}
              {!isVideoLoaded && (
                <VideoSkeleton className="mt-[2rem] sm:mt-[3rem] md:mt-[4rem] lg:mt-[6rem] xl:mt-[9rem]" />
              )}
              
              <video
                src="/American%20Flag.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onLoadedData={handleVideoLoad}
                className={`w-full h-full object-contain mt-[2rem] sm:mt-[3rem] md:mt-[4rem] lg:mt-[6rem] xl:mt-[9rem] transition-opacity duration-500 ${
                  isVideoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          </div>

          {/* Full-width white background behind content */}
          <div
            className="w-screen left-1/2 -translate-x-1/2 absolute z-0"
            style={{
              top: '35vh', // Move closer on mobile
              minHeight: '300px',
              height: 'calc(100% - 35vh)',
              background: 'white',
              paddingTop: '15vh', // Reduce padding on mobile
            }}
            aria-hidden="true"
          ></div>

          {/* Content Area with white background, positioned below video */}
          <div className="relative w-full bg-transparent pt-6 md:pt-8 rounded-t-[1rem] md:rounded-t-[2rem] z-20 px-4 md:px-6">
            {/* Divider line - tapered width */}
            <div className="w-3/4 max-w-lg mx-auto mb-6 md:mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-[#1b3764]/20 to-transparent rounded-full"></div>
            </div>

            {/* Heading - Middle of Pyramid (Medium Width) */}
            <div className="max-w-[2000px] mx-auto mb-4 md:mb-6 w-full">
              <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-5xl font-extrabold text-[#1b3764] uppercase font-kallisto">
                Made in America
              </h2>
            </div>
            
            {/* Divider line - narrower */}
            <div className="w-1/2 max-w-md mx-auto mb-6 md:mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-[#1b3764]/20 to-transparent rounded-full"></div>
            </div>
            
            {/* Paragraph - Narrower than heading */}
            <div className="max-w-[2000px] mx-auto mb-8 md:mb-10 w-full">
              <p className="text-base md:text-lg text-[#1b3764]">
                We're proud to manufacture our high-performance industrial adhesives, and sealants right here in the America. Our commitment to American manufacturing ensures superior quality, faster delivery, and stronger support for our local communities.
              </p>
            </div>
            
            {/* Divider line - narrowest */}
            <div className="w-1/3 max-w-xs mx-auto mb-6 md:mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-[#1b3764]/20 to-transparent rounded-full"></div>
            </div>
            
            {/* Button - Bottom of Pyramid (Narrowest) */}
            <div className="max-w-xs mx-auto overflow-hidden rounded-[1rem] md:rounded-[2rem] group hover:transform hover:scale-105 transition-all duration-300 bg-[#F2611D] mb-8 md:mb-10">
              <Link to="/products" className="block">
                <Button className="w-full bg-[#F2611D] hover:bg-[#F2611D]/90 text-white px-6 md:px-8 py-4 md:py-6 text-lg md:text-xl whitespace-nowrap border-0 rounded-[1rem] md:rounded-[2rem]">
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