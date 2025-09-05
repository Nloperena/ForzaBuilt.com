import React, { useState, useRef, useEffect } from 'react';
import { useLandscapeValues } from '@/hooks/use-landscape';
import VideoSkeleton from './common/VideoSkeleton';

const TestimonialsSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isLandscape } = useLandscapeValues();

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleVideoExpand = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleCloseFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsPlaying(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 bg-gradient-to-b from-[#115B87] to-[#1B3764] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_center,rgba(242,97,29,0.6)_0%,rgba(242,97,29,0.5)_25%,rgba(242,97,29,0.35)_45%,rgba(242,97,29,0.2)_65%,rgba(242,97,29,0.1)_80%,rgba(242,97,29,0.03)_90%,transparent_100%)] md:bg-[radial-gradient(ellipse_1800px_1200px_at_center,rgba(242,97,29,0.6)_0%,rgba(242,97,29,0.5)_25%,rgba(242,97,29,0.35)_45%,rgba(242,97,29,0.2)_65%,rgba(242,97,29,0.1)_80%,rgba(242,97,29,0.03)_90%,transparent_100%)]"
          style={{ opacity: 1 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white font-kallisto leading-none mb-4 sm:mb-6">
            What Our Customers Say
          </h2>
          <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
            Hear from industry professionals who trust Forza for their critical bonding and sealing needs
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-white/20 shadow-2xl">
          <div className={`flex ${
            isLandscape 
              ? 'flex-col items-center space-y-6 sm:space-y-8' 
              : 'flex-col md:flex-row items-center md:items-start space-y-6 sm:space-y-8 md:space-y-0 md:space-x-8 lg:space-x-12'
          }`}>
            {/* Video Container */}
            <div 
              className={`flex-shrink-0 flex items-center justify-center overflow-hidden rounded-lg md:rounded-xl w-full transition-all duration-500 ${
                isPlaying 
                  ? 'max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] aspect-video relative z-10' 
                  : isLandscape 
                    ? 'max-w-[200px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[260px] xl:max-w-[280px] aspect-[3/4] md:aspect-[2/3] lg:aspect-[1/1]' 
                    : 'max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg aspect-[4/5] md:aspect-[3/4] lg:aspect-[2/3]'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`relative w-full h-full rounded-lg md:rounded-xl overflow-hidden shadow-xl md:shadow-2xl ${
                isPlaying ? 'rounded-none shadow-none' : ''
              }`}>
                {/* Video Skeleton Loading State */}
                {!isVideoLoaded && (
                  <VideoSkeleton />
                )}
                
                <video
                  ref={videoRef}
                  src="https://videos.ctfassets.net/hdznx4p7ef81/4CqNHu0mxSPaW4l6HQPphS/256d6e3db7569a19f1b33f8e1a57da9c/Sequence_01_2.mp4"
                  className={`w-full h-full object-cover object-center cursor-pointer transition-all duration-500 ${
                    isPlaying ? 'object-contain' : ''
                  } ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                  muted={!isPlaying}
                  loop
                  playsInline
                  controls={isPlaying}
                  onLoadedData={handleVideoLoad}
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