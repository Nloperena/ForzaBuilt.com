import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from './ui/card';
import { industries } from '../data/industries';
import type { Industry } from '../data/industries';
import { useLandscapeValues } from '@/hooks/use-landscape';
import { useGradientMode } from '@/contexts/GradientModeContext';
import { getFontSize } from '@/styles/typography';

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
    <section className={`pt-2 md:pt-3 lg:pt-4 ${
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
        <div className="w-full bg-white pt-4 md:pt-6 px-4 mx-auto max-w-7xl relative z-10">
          <div className="text-center relative z-10">
            <h2
              className="font-regular text-[#2c476e] mb-6 sm:mb-8 leading-tight font-poppins"
              style={getFontSize('industriesHeading')}
            >
              Industries We Serve
            </h2>
          </div>
        </div>
      ) : (
        <div className="w-full pt-4 md:pt-6 px-4 mx-auto max-w-7xl relative z-10">
          <div className="text-center relative z-10">
            <h2
              className={`font-black ${
                mode === 'light'
                  ? 'text-[#2c476e]'
                  : getTextClasses()
              } mb-1 sm:mb-2 md:mb-4 font-kallisto leading-snug break-words block`}
              style={getFontSize('industriesHeading')}
            >
              Industries We Serve
            </h2>
          </div>
        </div>
      )}

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 2xl:px-32">
        
        {/* Mobile & iPad: 2 column x 3 row grid with desktop-style cards */}
        <div className="block md:hidden">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto">
            {industriesArr.slice(0, 6).map((industry: Industry, index: number) => (
              <Link 
                key={industry.title}
                to={`/industries/${industry.title.toLowerCase().replace(/ /g, '-')}`}
                className="block w-full h-full"
              >
                <Card
                  className="aspect-[6/4] rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 group cursor-pointer w-full backdrop-blur-xl bg-white border-0 shadow-lg text-white"
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
                  onTouchStart={() => {
                    videoRefs.current[index]?.play();
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
                      preload="metadata"
                      onLoadedData={() => {
                        handleVideoLoad(index);
                        if (videoRefs.current[index]) {
                          videoRefs.current[index].load();
                        }
                      }}
                      onError={() => handleVideoLoad(index)}
                    >
                      <source src={industry.videoUrl} type="video/mp4" />
                    </video>
                    
                    {/* Conditional overlay based on mode */}
                    {mode !== 'light2' && (
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none"></div>
                    )}
                    
                    {/* Gradient overlay - transparent top, blue gradient bottom */}
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
                      style={{
                        zIndex: 9,
                        background: 'linear-gradient(to top, rgba(27, 55, 100, 0.85) 0%, rgba(27, 55, 100, 0.7) 10%, rgba(27, 55, 100, 0.5) 20%, rgba(27, 55, 100, 0.3) 30%, rgba(27, 55, 100, 0.15) 40%, transparent 50%)'
                      }}
                    />
                    
                    {/* Text and Icon container - bottom left */}
                    <div
                      className="absolute bottom-0 left-0 pt-2 pr-2 pb-2 pl-2"
                      style={{
                        zIndex: 10
                      }}
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <img
                          src={industry.logo}
                          alt={industry.title + ' logo'}
                          className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-150"
                          style={{
                            filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.8))'
                          }}
                        />
                        <h3
                          className="font-poppins font-normal text-left leading-none cursor-pointer transition-all duration-300 group-hover:font-bold"
                          style={{
                            color: '#ffffff',
                            fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          {toTitleCase(industry.title)}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          
          {/* "Don't see your industry? Contact Us" text */}
          <div className="text-center mt-6 mb-4">
            <p className={`text-sm sm:text-base font-poppins ${
              mode === 'light' || mode === 'light2' 
                ? 'text-gray-600' 
                : 'text-white/90'
            }`}>
              Don't see your industry?{' '}
              <a
                href="/contact"
                className="text-[#F2611D] hover:text-[#F2611D]/80 font-medium transition-colors hover:underline underline-offset-4"
              >
                Contact Us
              </a>
            </p>
          </div>
        </div>

        {/* Desktop: Grid layout with 3 columns */}
        <div className="sr-only md:not-sr-only md:flex w-full flex-col items-center">
          <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8 xl:gap-10 w-full max-w-[1000px] lg:max-w-[1100px] xl:max-w-[1200px] mb-3 md:mb-4 mx-auto py-2 sm:py-3 md:py-3 lg:py-4">
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
                    className="aspect-[6/4] rounded-xl lg:rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 group cursor-pointer w-full backdrop-blur-xl bg-white border-0 shadow-lg text-white"
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
                        className="absolute bottom-0 left-0 pt-1.5 sm:pt-2 md:pt-2.5 lg:pt-3 pr-1.5 sm:pr-2 md:pr-2.5 lg:pr-3 pb-0 pl-0"
                        style={{
                          zIndex: 10
                        }}
                      >
                        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5">
                          <img
                            src={industry.logo}
                            alt={industry.title + ' logo'}
                            className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 transition-transform duration-150"
                            style={{
                              filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.8))'
                            }}
                          />
                          <h3
                            className="font-poppins font-normal text-left leading-none cursor-pointer transition-all duration-300 group-hover:font-bold"
                            style={{
                              color: '#ffffff',
                              fontSize: 'clamp(0.75rem, 1.5vw, 1.25rem)',
                              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
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

        {/* Subtle afterthought text - Desktop only */}
        <div className="hidden md:block w-full text-center mt-4 md:mt-6 lg:mt-6 pb-8 md:pb-12 lg:pb-14">
          <p className="font-poppins text-gray-600 font-normal" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}>
            Don't see your industry?{' '}
            <a
              href="/contact"
              className="text-[#F2611D] hover:text-[#F2611D]/80 font-medium transition-colors hover:underline underline-offset-4"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSectionAlt; 