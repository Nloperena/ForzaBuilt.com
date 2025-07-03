import React, { useState, useRef } from 'react';

const TestimonialsSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Only collapse if not playing
    if (!isPlaying) {
      setIsExpanded(false);
    }
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        // If already playing, pause and reset
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
        videoRef.current.muted = true;
        setIsExpanded(false); // Collapse when paused
      } else {
        // Start playing with audio
        videoRef.current.muted = false;
        videoRef.current.play();
        setIsPlaying(true);
        setIsExpanded(true); // Ensure expanded when playing
      }
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsExpanded(false);
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  return (
    <section className="py-20 bg-[#1b3764] relative overflow-hidden" style={{ backgroundImage: "url('/assets/images/abstract-background-pattern.svg')", backgroundRepeat: 'repeat' }}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-6xl font-extrabold text-white text-center mb-14 tracking-tight font-kallisto">What Our Clients Say</h2>
        <div className="relative">
          <div 
            className={`rounded-2xl flex flex-col items-center p-6 md:p-12 gap-10 transition-all duration-500 ease-in-out ${
              isExpanded ? 'md:flex-col' : 'md:flex-row'
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Video Container */}
            <div className={`flex-shrink-0 flex items-center justify-center overflow-hidden rounded-xl transition-all duration-500 ease-in-out ${
              isExpanded 
                ? 'w-full max-w-4xl aspect-video' 
                : 'w-full max-w-sm md:max-w-md lg:max-w-lg aspect-[9/16]'
            }`}>
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
                <video
                  ref={videoRef}
                  src="https://videos.ctfassets.net/hdznx4p7ef81/4CqNHu0mxSPaW4l6HQPphS/256d6e3db7569a19f1b33f8e1a57da9c/Sequence_01_2.mp4"
                  className={`w-full h-full object-cover cursor-pointer transition-all duration-500 ${
                    isExpanded ? 'object-top' : 'object-center'
                  }`}
                  muted
                  loop
                  playsInline
                  onClick={handleVideoClick}
                  onEnded={handleVideoEnded}
                />
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer" onClick={handleVideoClick}>
                    <svg className="w-20 h-20 text-white/90 hover:text-white transition" fill="currentColor" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="32" fill="black" fillOpacity="0.4" />
                      <polygon points="26,20 50,32 26,44" fill="white" />
                    </svg>
                  </div>
                )}
                {isPlaying && (
                  <div className="absolute top-4 right-4 bg-black/50 rounded-full p-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Text Content */}
            <div className={`flex-1 flex flex-col items-center text-center transition-all duration-500 ease-in-out ${
              isExpanded ? 'w-full' : 'w-full md:w-auto'
            }`}>
              <div className="text-4xl font-extrabold text-white mb-2 leading-tight font-kallisto">
                Alex Johnson
              </div>
              <div className="font-normal text-lg text-white/80 mb-4">
                Marine Engineering
              </div>
              {!isExpanded && (
                <div className="flex items-center justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-9 h-9 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/>
                    </svg>
                  ))}
                </div>
              )}
              <div className="text-white text-base leading-snug max-w-2xl">
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