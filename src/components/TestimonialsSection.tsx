import React, { useState, useRef } from 'react';
import { useLandscapeValues } from '@/hooks/use-landscape';

const TestimonialsSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isLandscape } = useLandscapeValues();

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        // If already playing, pause and reset
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
        videoRef.current.muted = true;
      } else {
        // Start playing with audio
        videoRef.current.muted = false;
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  return (
    <section className={`bg-[#1b3764] relative overflow-hidden ${
      isLandscape 
        ? 'py-4 sm:py-6 md:py-8 lg:py-10' 
        : 'py-6 sm:py-8 md:py-10 lg:py-12'
    }`} style={{ backgroundImage: "url('/assets/images/abstract-background-pattern.svg')", backgroundRepeat: 'repeat' }}>
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
                    <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-5xl font-extrabold text-white text-center tracking-tight font-kallisto ${
            isLandscape 
              ? 'mb-2 sm:mb-3 md:mb-4 lg:mb-6' 
              : 'mb-4 sm:mb-6 md:mb-8 lg:mb-10'
          }`}>What Our Clients Say</h2>
        <div className="relative">
          <div className={`rounded-lg sm:rounded-xl md:rounded-2xl flex items-start p-3 sm:p-4 md:p-6 lg:p-8 gap-4 sm:gap-6 md:gap-8 lg:gap-10 ${
            isLandscape 
              ? 'flex-col' 
              : 'flex-row'
          }`}>
            {/* Video Container - Left Side */}
            <div className={`flex-shrink-0 flex items-start justify-center overflow-hidden rounded-lg md:rounded-xl ${
              isLandscape 
                ? 'w-full max-w-[200px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[260px] xl:max-w-[280px] aspect-[3/4] md:aspect-[2/3] lg:aspect-[1/1]' 
                : 'w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] xl:w-[280px] aspect-[4/5] md:aspect-[3/4] lg:aspect-[2/3]'
            }`}>
              <div className="relative w-full h-full rounded-lg md:rounded-xl overflow-hidden shadow-xl md:shadow-2xl">
                <video
                  ref={videoRef}
                  src="https://videos.ctfassets.net/hdznx4p7ef81/4CqNHu0mxSPaW4l6HQPphS/256d6e3db7569a19f1b33f8e1a57da9c/Sequence_01_2.mp4"
                  className="w-full h-full object-cover object-center cursor-pointer transition-all duration-500"
                  muted
                  loop
                  playsInline
                  onClick={handleVideoClick}
                  onEnded={handleVideoEnded}
                />
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer" onClick={handleVideoClick}>
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 text-white/90 hover:text-white transition" fill="currentColor" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="32" fill="black" fillOpacity="0.4" />
                      <polygon points="26,20 50,32 26,44" fill="white" />
                    </svg>
                  </div>
                )}
                {isPlaying && (
                  <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 bg-black/50 rounded-full p-1 sm:p-1.5 md:p-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Text Content - Right Side */}
            <div className={`flex-1 flex flex-col justify-start ${
              isLandscape 
                ? 'items-center text-center' 
                : 'items-start text-left'
            }`}>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-white mb-1 sm:mb-2 leading-tight font-kallisto pt-2 sm:pt-3 md:pt-4">
                Alex Johnson
              </div>
              <div className="font-normal text-sm sm:text-base md:text-lg text-white/80 mb-2 sm:mb-3 md:mb-4">
                Marine Engineering
              </div>
              <div className={`flex items-center mb-2 sm:mb-3 md:mb-4 ${
                isLandscape 
                  ? 'justify-center' 
                  : 'justify-start'
              }`}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/>
                  </svg>
                ))}
              </div>
              <div className="text-white text-sm sm:text-base leading-relaxed max-w-lg sm:max-w-xl md:max-w-2xl">
                These are the captions of the video. These are the captions of the video. These are the captions of the video. These are the captions of the video. These are the captions of the video. These are the captions of the video. These are the captions of the video. These are the captions of the video. These are the captions of the video. These are the captions of the video. These are the captions of the video. These are the captions of the video.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 