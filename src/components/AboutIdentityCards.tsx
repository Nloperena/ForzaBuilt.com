import React, { useState } from 'react';
import VideoSkeleton from './common/VideoSkeleton';

const AboutIdentityCards = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section className="py-10 md:py-14 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center max-w-4xl mx-auto">
        {/* Forza Definition Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 border border-white/20 w-96 h-96 mx-auto aspect-square relative overflow-hidden">
          {/* Glassmorphic overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-2xl md:rounded-3xl"></div>
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl md:rounded-3xl"></div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
            <img
              src="/logos/Forza-lion-logo.png"
              alt="Forza lion logo"
              className="w-28 md:w-32 h-auto mb-3 md:mb-4"
            />
            <h3 className="text-white text-xl md:text-2xl font-extrabold font-kallisto mb-2">Forza</h3>
            <div className="text-xs md:text-sm text-white/90 space-y-1 font-poppins">
              <p><span className="italic">noun</span> / italian for "force" / <span className="italic">forza</span></p>
              <p>Strength, Power, Force</p>
            </div>
          </div>
        </div>

        {/* Made in America Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 border border-white/20 w-96 h-96 mx-auto aspect-square relative overflow-hidden">
          {/* Glassmorphic overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-2xl md:rounded-3xl"></div>
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl md:rounded-3xl"></div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
            <div className="w-32 md:w-36 mb-3 md:mb-4 relative">
              {/* Video Skeleton Loading State */}
              {!isVideoLoaded && (
                <VideoSkeleton className="rounded-lg" />
              )}
              
              <video
                src="/American%20Flag.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onLoadedData={handleVideoLoad}
                className={`w-full h-auto object-contain rounded-lg transition-opacity duration-500 ${
                  isVideoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                aria-label="American flag waving"
              />
            </div>
            <h3 className="text-white text-xl md:text-2xl font-extrabold font-kallisto mb-2">Made in America</h3>
            <div className="text-xs md:text-sm text-white/90 space-y-1 font-poppins">
              <p>We proudly manufacture our high-performance products in America.</p>
              <p>Quality you can trust, built right here at home.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIdentityCards;


