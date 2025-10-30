import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from './ui/card';
import { industries } from '../data/industries';
import type { Industry } from '../data/industries';
import { useLandscapeValues } from '@/hooks/use-landscape';
import { useGradientMode } from '@/contexts/GradientModeContext';

import VideoSkeleton from './common/VideoSkeleton';
import EdgeTrianglesBackground from './common/EdgeTrianglesBackground';

function hexToRgba(hex: string, alpha: number): string {
  let normalized = hex.replace('#', '');
  if (normalized.length === 3) {
    normalized = normalized.split('').map((c) => c + c).join('');
  }
  const r = parseInt(normalized.substring(0, 2), 16);
  const g = parseInt(normalized.substring(2, 4), 16);
  const b = parseInt(normalized.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

const IndustriesSectionAlt = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const industriesArr: Industry[] = industries;
  const { mode, getGradientClasses, getTextClasses, getTextSecondaryClasses } = useGradientMode();
  const [videoLoadedStates, setVideoLoadedStates] = useState<boolean[]>(new Array(industriesArr.length).fill(false));
  
  // Landscape optimization values
  const { isLandscape } = useLandscapeValues();

  const handleVideoLoad = (index: number) => {
    setVideoLoadedStates(prev => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });
  };


  return (
    <section className={`pt-4 ${
      mode === 'light2'
        ? 'bg-white'
        : mode === 'light'
          ? 'bg-[#e8e8e8]'
          : `bg-gradient-to-b from-[#2c476e] to-[#81899f]`
    } w-full relative z-20`}>

      {/* Edge triangles positioned at left and right viewport edges (like ProductsSection, but swapped images) */}
      {/* Hide triangles for light2 mode */}
      {mode !== 'light2' && (
        <EdgeTrianglesBackground
          leftImage="/Gradients and Triangles/Small Science Triangles 2.png"
          rightImage="/Gradients and Triangles/Small Science Triangles.png"
          opacity={0.6}
          scale={1.1}
          leftRotation={265}
          rightRotation={295}
          leftFlipH={false}
          rightFlipV={false}
          blendMode="overlay"
        />
      )}
      
      {/* Industries Header Section */}
      {mode === 'light2' ? (
        <div className="w-full bg-white pt-0 md:pt-2 px-4 mx-auto max-w-7xl relative z-10">
          <div className="text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-normal text-[#2c476e] mb-6 sm:mb-8 leading-tight font-poppins">
              PURPOSE-BUILT<br />
              INDUSTRY SOLUTIONS
            </h2>
          </div>
          <div className="text-center relative z-10">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-12 sm:mb-16 font-normal max-w-4xl mx-auto font-poppins invisible">
            At Forza, we're your trusted scientists and mentors - delivering innovative adhesive solutions that secure your success.
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full px-4 mx-auto max-w-7xl relative z-10">
          <div className="text-center relative z-10">
            <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black ${
              mode === 'light'
                ? 'text-[#2c476e]'
                : getTextClasses()
            } mb-1 sm:mb-2 md:mb-4 font-kallisto leading-none break-words block`}>
              PURPOSE-BUILT<br />
              INDUSTRY SOLUTIONS
            </h2>
          </div>
          <div className="text-center relative z-10">
            <p className={`${
              mode === 'light'
                ? 'text-[#2c476e]/80'
                : getTextSecondaryClasses()
            } text-xs sm:text-base md:text-lg mb-6 sm:mb-8 font-light max-w-xl mx-auto`}>
            At Forza, we're your trusted experts and mentors - delivering innovative adhesive solutions that secure your success.
            </p>
          </div>
        </div>
      )}

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-20">
        
        {/* Mobile: Single column list layout */}
        <div className="block md:hidden">
          <div className="space-y-3 sm:space-y-4">
            {industriesArr.map((industry: Industry, index: number) => (
              <div
                key={industry.title}
                className="block"
                style={{
                  marginBottom: index === industriesArr.length - 1 ? '2rem' : '0'
                }}
              >
                <Link 
                  to={`/industries/${industry.title.toLowerCase().replace(/ /g, '-')}`}
                  className="block w-full"
                >
                  <Card
                    className="shadow-lg rounded-xl border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-xl group cursor-pointer w-full text-white relative z-10 backdrop-blur-xl bg-gradient-to-b from-[#2c476e] to-[#81899f]"
                    style={{
                      backgroundImage: 'none',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)',
                      backgroundColor: mode === 'light' || mode === 'light2' ? 'transparent' : 'transparent',
                      background: 'linear-gradient(to bottom, #2c476e, #81899f)'
                    }}
                    onMouseEnter={() => {
                      videoRefs.current[index]?.play();
                    }}
                    onMouseLeave={() => {
                      if (videoRefs.current[index]) {
                        videoRefs.current[index].pause();
                        videoRefs.current[index].currentTime = 0;
                      }
                    }}
                  >
                    <div className="flex h-28 sm:h-32">
                      {/* Video/Image Section */}
                      <div className="relative w-28 sm:w-32 h-full flex-shrink-0">
                        {/* Video Skeleton Loading State */}
                        {!videoLoadedStates[index] && (
                          <VideoSkeleton />
                        )}
                        
                        <video
                          ref={(el) => (videoRefs.current[index] = el)}
                          loop
                          muted
                          playsInline
                          className={`w-full h-full object-cover transition-opacity duration-500 ${
                            videoLoadedStates[index] ? 'opacity-100' : 'opacity-0'
                          }`}
                          preload="metadata"
                          onLoadedData={() => {
                            handleVideoLoad(index);
                            // Ensure video is ready to play on mobile
                            if (videoRefs.current[index]) {
                              videoRefs.current[index].load();
                            }
                          }}
                          onError={(e) => {
                            console.warn(`Video failed to load for ${industry.title}:`, e);
                            // Mark as loaded even on error to hide skeleton
                            handleVideoLoad(index);
                          }}
                        >
                          <source src={industry.videoUrl} type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none"></div>
                        <img
                          src={industry.logo}
                          alt={industry.title + ' logo'}
                          className="absolute right-1 bottom-1 z-20 transform transition-all duration-150 pointer-events-none h-8 sm:h-10 w-auto hover:rotate-5 hover:scale-110"
                          style={{ filter: 'drop-shadow(0px 0px 0px rgba(242, 97, 29, 0))' }}
                        />
                      </div>
                      
                      {/* Content Section */}
                      <div className="flex-1 flex flex-col justify-center px-4 sm:px-5 py-4">
                        <h3
                          className="font-black font-kallisto text-lg sm:text-xl text-left w-full mb-1"
                          style={{
                            lineHeight: 1.1,
                            textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)',
                            color: '#ffffff'
                          }}
                        >
                          {toTitleCase(industry.title)}
                        </h3>
                        <p className="text-xs sm:text-sm font-light text-white/90">
                          Specialized solutions for {industry.title.toLowerCase()} applications
                        </p>
                        
                      </div>
                      
                      {/* Arrow indicator */}
                      <div className="flex items-center justify-center w-8 h-full transition-colors text-white/70 group-hover:text-white">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout with 3 columns */}
        <div className="hidden md:flex w-full flex-col items-center">
          <div className="grid grid-cols-3 gap-6 lg:gap-8 w-full max-w-[1800px] mb-4 mx-auto py-4 sm:py-6 lg:py-8">
            {industriesArr.map((industry: Industry, index: number) => (
              <div
                key={industry.title}
                className="block"
              >
                <Link 
                  to={`/industries/${industry.title.toLowerCase().replace(/ /g, '-')}`}
                  className="block w-full h-full"
                >
                  <Card
                    className="aspect-[4/5] rounded-2xl sm:rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden transition-all duration-300 hover:scale-105 group cursor-pointer w-full backdrop-blur-xl bg-white border-0 shadow-lg text-white"
                    style={{
                      backgroundImage: 'none'
                    }}
                    onMouseEnter={() => {
                      videoRefs.current[index]?.play();
                    }}
                    onMouseLeave={() => {
                      if (videoRefs.current[index]) {
                        videoRefs.current[index].pause();
                        videoRefs.current[index].currentTime = 0;
                      }
                    }}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      {/* Video Skeleton Loading State */}
                      {!videoLoadedStates[index] && (
                        <VideoSkeleton />
                      )}
                      
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        loop
                        muted
                        playsInline
                        className={`w-full h-full object-cover transition-opacity duration-500 ${
                          videoLoadedStates[index] ? 'opacity-100' : 'opacity-0'
                        }`}
                        preload="auto"
                        onLoadedData={() => handleVideoLoad(index)}
                        onError={() => handleVideoLoad(index)}
                      >
                        <source src={industry.videoUrl} type="video/mp4" />
                      </video>
                      {/* Conditional overlay based on mode */}
                      {mode !== 'light2' && (
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none"></div>
                      )}
                      
                      {/* Logo absolutely positioned at bottom right */}
                      <div
                        className={`absolute pointer-events-none z-20 ${
                          mode === 'light2' 
                            ? 'bottom-4 right-4' 
                            : 'bottom-3 sm:bottom-4 right-3 sm:right-4'
                        }`}
                      >
                        <img
                          src={industry.logo}
                          alt={industry.title + ' logo'}
                          className={`transition-transform duration-150 ${
                            mode === 'light2'
                              ? 'w-16 h-16 sm:w-20 sm:h-20'
                              : 'w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 hover:rotate-5 hover:scale-110'
                          }`}
                          style={mode !== 'light2' ? {
                            width: 'clamp(3rem, 5vw, 8rem)',
                            height: 'clamp(3rem, 5vw, 8rem)'
                          } : {}}
                        />
                      </div>
                      
                      {/* Gradient overlay - transparent top, blue gradient bottom with larger spread */}
                      <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
                        style={{
                          zIndex: 9,
                          background: 'linear-gradient(to top, rgba(27, 55, 100, 0.85) 0%, rgba(27, 55, 100, 0.7) 10%, rgba(27, 55, 100, 0.5) 20%, rgba(27, 55, 100, 0.3) 30%, rgba(27, 55, 100, 0.15) 40%, transparent 50%)'
                        }}
                      />
                      
                      {/* Text container */}
                      <div
                        className="absolute bottom-0 left-0 right-0 p-0.5 sm:p-1 md:p-1 lg:p-1.5 pointer-events-none"
                        style={{
                          zIndex: 10
                        }}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <h3
                            className={`font-normal text-left leading-none flex-1 min-w-0 truncate pl-3 sm:pl-4 pt-3 sm:pt-4 pb-3 sm:pb-4 transition-all duration-300 group-hover:font-extrabold ${
                              mode === 'light2' ? 'font-poppins' : 'font-kallisto'
                            }`}
                            style={{
                              color: '#ffffff',
                              fontSize: 'clamp(0.75rem, 2vw, 1.5rem)',
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
                            }}
                          >
                            {toTitleCase(industry.title)}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle afterthought text */}
        <div className="w-full text-center mt-8 pb-16">
          <p className="text-base md:text-lg text-gray-600 font-normal font-poppins">
            Don't see your industry?{' '}
            <a
              href="/contact"
              className="text-[#F2611D] hover:text-[#F2611D]/80 font-medium transition-colors hover:underline underline-offset-4"
            >
              Contact us
            </a>
            {''}
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSectionAlt; 