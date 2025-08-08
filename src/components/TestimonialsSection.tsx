import React, { useState, useRef } from 'react';
import { useLandscapeValues } from '@/hooks/use-landscape';

const TestimonialsSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
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

  const handleVideoExpand = () => {
    // If video is not playing, start it
    if (!isPlaying && videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleCloseFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      videoRef.current.muted = true;
    }
  };

  // Handle escape key and click outside to close playing video
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isPlaying) {
        handleCloseFullscreen();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (isPlaying && videoRef.current && !videoRef.current.contains(event.target as Node)) {
        handleCloseFullscreen();
      }
    };

    if (isPlaying) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when video is playing
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isPlaying]);

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
          <div className={`rounded-lg sm:rounded-xl md:rounded-2xl flex items-center p-3 sm:p-4 md:p-6 lg:p-8 gap-4 sm:gap-6 md:gap-8 lg:gap-10 ${
            isLandscape 
              ? 'flex-col' 
              : 'flex-col md:flex-row'
          }`}>
            {/* Video Container */}
            <div 
              className={`flex-shrink-0 flex items-center justify-center overflow-hidden rounded-lg md:rounded-xl w-full transition-all duration-500 ${
                isPlaying 
                  ? 'max-w-none aspect-video' 
                  : isLandscape 
                    ? 'max-w-[200px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[260px] xl:max-w-[280px] aspect-[3/4] md:aspect-[2/3] lg:aspect-[1/1]' 
                    : 'max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg aspect-[4/5] md:aspect-[3/4] lg:aspect-[2/3]'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`relative w-full h-full rounded-lg md:rounded-xl overflow-hidden shadow-xl md:shadow-2xl ${
                isPlaying ? 'rounded-none shadow-none' : ''
              }`}>
                <video
                  ref={videoRef}
                  src="https://videos.ctfassets.net/hdznx4p7ef81/4CqNHu0mxSPaW4l6HQPphS/256d6e3db7569a19f1b33f8e1a57da9c/Sequence_01_2.mp4"
                  className={`w-full h-full object-cover object-center cursor-pointer transition-all duration-500 ${
                    isPlaying ? 'object-contain' : ''
                  }`}
                  muted={!isPlaying}
                  loop
                  playsInline
                  controls={isPlaying}
                  onClick={handleVideoClick}
                  onEnded={handleVideoEnded}
                />
                {!isPlaying && (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer" onClick={handleVideoClick}>
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 text-white/90 hover:text-white transition" fill="currentColor" viewBox="0 0 64 64">
                        <circle cx="32" cy="32" r="32" fill="black" fillOpacity="0.4" />
                        <polygon points="26,20 50,32 26,44" fill="white" />
                      </svg>
                    </div>
                    {/* Expand button */}
                    <button
                      onClick={handleVideoExpand}
                      className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 bg-black/50 hover:bg-black/70 rounded-full p-1 sm:p-1.5 md:p-2 transition-colors"
                      title="Expand video"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </button>
                  </>
                )}
                {/* Close button for playing state */}
                {isPlaying && (
                  <button
                    onClick={handleCloseFullscreen}
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
                    title="Close video"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Text Content */}
            <div className={`flex-1 flex flex-col ${
              isLandscape 
                ? 'items-center text-center' 
                : 'items-center md:items-start text-center md:text-left'
            }`}>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-white mb-1 sm:mb-2 leading-tight font-kallisto">
                Alex Johnson
              </div>
              <div className="font-normal text-sm sm:text-base md:text-lg text-white/80 mb-2 sm:mb-3 md:mb-4">
                Marine Engineering
              </div>
              <div className={`flex items-center mb-2 sm:mb-3 md:mb-4 ${
                isLandscape 
                  ? 'justify-center' 
                  : 'justify-center md:justify-start'
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