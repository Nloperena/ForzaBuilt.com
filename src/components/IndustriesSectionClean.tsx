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

const IndustriesSectionClean = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const industriesArr: Industry[] = industries;
  const [videoLoadedStates, setVideoLoadedStates] = useState<boolean[]>(new Array(industriesArr.length).fill(false));
  const { mode } = useGradientMode();
  
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
    <section className="bg-gradient-to-b from-[#115B87] to-[#1B3764] w-full relative">
      {/* Edge triangles positioned at left and right viewport edges (like ProductsSection, but swapped images) */}
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
      

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-20">
        
        {/* Mobile: Single column list layout */}
        <div className="block md:hidden">
          <div className="space-y-2">
            {industriesArr.map((industry: Industry, index: number) => (
              <div
                key={industry.title}
                className="block"
              >
                <Link 
                  to={`/industries/${industry.title.toLowerCase().replace(/ /g, '-')}`}
                  className="block w-full"
                >
                  <Card
                    className="shadow-lg rounded-lg border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-xl group cursor-pointer w-full text-white relative z-10 backdrop-blur-xl bg-white/10"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1), #ffffff)`,
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)'
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
                    <div className="flex h-24 sm:h-28">
                      {/* Video/Image Section */}
                      <div className="relative w-24 sm:w-28 h-full flex-shrink-0">
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
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none"></div>
                        {/* Logo absolutely positioned at bottom right */}
                        <div
                          className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 pointer-events-none z-20"
                        >
                          <img
                            src={industry.logo}
                            alt={industry.title + ' logo'}
                            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 hover:rotate-5 hover:scale-110 transition-transform duration-150"
                            style={{
                              width: 'clamp(3rem, 5vw, 8rem)',
                              height: 'clamp(3rem, 5vw, 8rem)'
                            }}
                          />
                        </div>
                        
                        {/* Gradient bar at bottom with text only */}
                        <div
                          className="absolute bottom-0 left-0 right-0 p-0.5 sm:p-1 md:p-1 lg:p-1.5 pointer-events-none text-white"
                          style={{
                            zIndex: 10,
                            backgroundColor: '#ffffff'
                          }}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <h3
                              className="font-black font-kallisto text-left leading-none flex-1 min-w-0 truncate pl-3 sm:pl-4 pt-3 sm:pt-4 pb-3 sm:pb-4"
                              style={{
                                color: industry.color || '#115B87',
                                fontSize: 'clamp(0.75rem, 2vw, 1.5rem)',
                                textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)',
                              }}
                            >
                              {toTitleCase(industry.title)}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: 3-column grid layout */}
        <div className="hidden md:flex w-full flex-col items-center">
          <div className="grid grid-cols-3 gap-6 lg:gap-8 w-full max-w-7xl mb-8 mx-auto py-4 sm:py-6 lg:py-8">
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
                    className="shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-white/20 overflow-hidden transition-all duration-300 hover:scale-105 aspect-[3/4] lg:aspect-[4/5] xl:aspect-[1/1] group cursor-pointer w-full text-white backdrop-blur-xl bg-white/10"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1), #ffffff)`,
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)'
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
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none"></div>
                      <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 pointer-events-none z-20">
                        <img
                          src={industry.logo}
                          alt={industry.title + ' logo'}
                          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 hover:rotate-5 hover:scale-110 transition-transform duration-150"
                          style={{
                            width: 'clamp(3rem, 5vw, 8rem)',
                            height: 'clamp(3rem, 5vw, 8rem)'
                          }}
                        />
                      </div>
                      <div
                        className="absolute bottom-0 left-0 right-0 p-0.5 sm:p-1 md:p-1 lg:p-1.5 pointer-events-none text-white"
                        style={{
                          zIndex: 10,
                          backgroundColor: '#ffffff'
                        }}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <h3
                            className="font-black font-kallisto text-left leading-none flex-1 min-w-0 truncate pl-3 sm:pl-4 pt-3 sm:pt-4 pb-3 sm:pb-4"
                            style={{
                              color: industry.color || '#115B87',
                              fontSize: 'clamp(0.75rem, 2vw, 1.5rem)',
                              textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)',
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

        {/* Standalone CTA Section: Conditional styling */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-20 mt-8 sm:mt-12 pb-12">
          <div className={`relative max-w-7xl mx-auto overflow-hidden rounded-2xl shadow-2xl ${
            mode === 'light' 
              ? 'bg-gradient-to-r from-[#1B3764] to-[#115B87]' 
              : 'border border-white/20 bg-white/10 backdrop-blur-xl'
          }`}>
            {/* Static liquid shine overlay - only for dark/neutral modes */}
            {mode !== 'light' && (
              <div
                className="pointer-events-none absolute -inset-x-1/2 -inset-y-1/2"
                style={{
                  background: 'radial-gradient(60% 40% at 50% 50%, rgba(255,255,255,0.15), rgba(255,255,255,0) 60%)',
                }}
              />
            )}

            <div className="relative z-10 p-5 sm:p-6 md:p-8 lg:p-10">
              <div className="flex flex-col items-center justify-center text-center gap-5">
                <div className="max-w-2xl">
                  <h3 className={`font-kallisto font-black text-xl sm:text-2xl md:text-3xl leading-tight ${
                    mode === 'light' ? 'text-white' : 'text-white'
                  }`}>
                    Don't see your industry?
                  </h3>
                  <p className={`mt-2 text-sm sm:text-base ${
                    mode === 'light' ? 'text-white/80' : 'text-white/80'
                  }`}>
                    We can still provide purpose built solutions.
                  </p>
                </div>
                <div className="mt-4">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-8 py-3 text-xl border border-[#F2611D] transition-all duration-300"
                  >
                    <span>Contact Us</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSectionClean;
