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
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-regular text-[#2c476e] mb-6 sm:mb-8 leading-tight font-poppins">
              Purpose-Built
              Solutions
            </h2>
          </div>
        </div>
      ) : (
        <div className="w-full px-4 mx-auto max-w-7xl relative z-10">
          <div className="text-center relative z-10">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black ${
              mode === 'light'
                ? 'text-[#2c476e]'
                : getTextClasses()
            } mb-1 sm:mb-2 md:mb-4 font-kallisto leading-none break-words block`}>
              Purpose-Built
              Solutions
            </h2>
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
                      </div>
                      
                      {/* Content Section */}
                      <div className="flex-1 flex flex-col justify-center px-4 sm:px-5 py-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={industry.logo}
                            alt={industry.title + ' logo'}
                            className="h-10 sm:h-12 w-auto transform transition-all duration-150"
                            style={{ filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.8))' }}
                          />
                          <h3
                            className="font-poppins text-xl sm:text-2xl text-left cursor-pointer transition-all duration-300 group-hover:font-bold"
                            style={{
                              lineHeight: 1.1,
                              textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)',
                              color: '#ffffff'
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
                            {toTitleCase(industry.title)}
                          </h3>
                        </div>
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
        <div className="sr-only md:not-sr-only md:flex w-full flex-col items-center">
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
                    className="aspect-[6/4] rounded-2xl sm:rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden transition-all duration-300 hover:scale-105 group cursor-pointer w-full backdrop-blur-xl bg-white border-0 shadow-lg text-white"
                    style={{
                      backgroundImage: 'none'
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
                      
                      
                      {/* Gradient overlay - transparent top, blue gradient bottom with larger spread */}
                      <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
                        style={{
                          zIndex: 9,
                          background: 'linear-gradient(to top, rgba(27, 55, 100, 0.85) 0%, rgba(27, 55, 100, 0.7) 10%, rgba(27, 55, 100, 0.5) 20%, rgba(27, 55, 100, 0.3) 30%, rgba(27, 55, 100, 0.15) 40%, transparent 50%)'
                        }}
                      />
                      
                      {/* Text and Icon container - bottom left */}
                      <div
                        className="absolute bottom-0 left-0 pt-3 sm:pt-4 md:pt-4 lg:pt-5 pr-3 sm:pr-4 md:pr-4 lg:pr-5 pb-0 pl-0"
                        style={{
                          zIndex: 10
                        }}
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <img
                            src={industry.logo}
                            alt={industry.title + ' logo'}
                            className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 transition-transform duration-150"
                            style={{
                              filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.8))'
                            }}
                          />
                          <h3
                            className="font-poppins font-normal text-left leading-none cursor-pointer transition-all duration-300 group-hover:font-bold"
                            style={{
                              color: '#ffffff',
                              fontSize: 'clamp(1rem, 2.5vw, 2rem)',
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
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
          <p className="text-xl md:text-3xl text-gray-600 font-normal font-poppins">
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