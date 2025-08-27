import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card } from './ui/card';
import { industries } from '../data/industries';
import type { Industry } from '../data/industries';
import { useLandscapeValues } from '@/hooks/use-landscape';
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
  
  // Landscape optimization values
  const { isLandscape } = useLandscapeValues();



  return (
    <section className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 bg-[#1b3764] w-full relative">
      {/* Orange to Blue Gradient Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_top_right,rgba(242,97,29,0.8)_0%,rgba(242,97,29,0.7)_25%,rgba(242,97,29,0.5)_45%,rgba(242,97,29,0.3)_65%,rgba(242,97,29,0.15)_80%,rgba(242,97,29,0.05)_90%,transparent_100%)] md:bg-[radial-gradient(ellipse_1800px_1200px_at_top_right,rgba(242,97,29,0.8)_0%,rgba(242,97,29,0.7)_25%,rgba(242,97,29,0.5)_45%,rgba(242,97,29,0.3)_65%,rgba(242,97,29,0.15)_80%,rgba(242,97,29,0.05)_90%,transparent_100%)]"
          style={{ opacity: 1 }}
        />
      </div>
      
      {/* Edge triangles positioned at left and right viewport edges */}
      <EdgeTrianglesBackground 
        leftImage="/Gradients and Triangles/Small Science Triangles 2.png"
        rightImage="/Gradients and Triangles/Small Science Triangles.png"
        opacity={0.6}
        scale={1.3}
        leftRotation={280}
        rightRotation={280}
        leftFlipH={true}
        rightFlipV={true}
        blendMode="overlay"
      />
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-20">
        {/* Header Section */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 relative z-10">
          <div className="max-w-6xl mx-auto space-y-8">
            <h2 className="font-black text-white font-kallisto text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-none break-words">
              Better Built Bonds for All Industries
            </h2>
            <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
              At Forza, we're your trusted scientists and mentors - delivering innovative adhesive solutions that secure your success
            </p>
          </div>
        </div>
        
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
                    className="shadow-lg rounded-lg border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-xl group cursor-pointer w-full text-white relative z-10"
                    style={{
                      backgroundImage: `linear-gradient(to right, #1b3764, #1b3764, ${industry.color || '#f16a26'})`
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
                        <video
                          ref={(el) => (videoRefs.current[index] = el)}
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                          preload="metadata"
                          poster={industry.logo}
                          onLoadedData={() => {
                            // Ensure video is ready to play
                            if (videoRefs.current[index]) {
                              videoRefs.current[index]!.load();
                            }
                          }}
                          onError={(e) => {
                            console.error(`Video failed to load for ${industry.title}:`, e);
                          }}
                        >
                          <source src={industry.videoUrl} type="video/mp4" />
                          {/* Fallback to logo image if video fails */}
                          <img src={industry.logo} alt={industry.title + ' logo'} className="w-full h-full object-cover" />
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
                      <div className="flex-1 flex flex-col justify-center px-4 py-3">
                        <h3
                          className="font-black font-kallisto text-lg sm:text-xl text-left w-full mb-1"
                          style={{
                            color: '#ffffff',
                            lineHeight: 1.1,
                          }}
                        >
                          {toTitleCase(industry.title)}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/80 font-light">
                          Specialized solutions for {industry.title.toLowerCase()} applications
                        </p>
                        
                      </div>
                      
                      {/* Arrow indicator */}
                      <div className="flex items-center justify-center w-8 h-full text-gray-400 group-hover:text-[#F2611D] transition-colors">
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
                    className="shadow-xl sm:shadow-2xl rounded-lg sm:rounded-xl md:rounded-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:scale-105 aspect-[3/4] lg:aspect-[4/5] xl:aspect-[1/1] group cursor-pointer w-full text-white"
                    style={{
                      backgroundImage: `linear-gradient(to right, #1b3764, #1b3764, ${industry.color || '#f16a26'})`
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
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        preload="auto"
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
                          backgroundImage: `linear-gradient(to right, #1b3764, #1b3764, ${industry.color || '#f16a26'})`
                        }}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <h3
                            className="font-black font-kallisto text-left leading-none flex-1 min-w-0 truncate pl-3 sm:pl-4 pt-3 sm:pt-4 pb-3 sm:pb-4"
                            style={{
                              color: '#ffffff',
                              fontSize: 'clamp(0.75rem, 2vw, 1.5rem)',
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

        {/* Standalone CTA Section: Glassmorphic liquid shine */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-20 mt-8 sm:mt-12">
          <div className="relative max-w-7xl mx-auto overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl">
            {/* Static liquid shine overlay */}
            <div
              className="pointer-events-none absolute -inset-x-1/2 -inset-y-1/2"
              style={{
                background: 'radial-gradient(60% 40% at 50% 50%, rgba(255,255,255,0.15), rgba(255,255,255,0) 60%)',
              }}
            />

            <div className="relative z-10 p-5 sm:p-6 md:p-8 lg:p-10">
              <div className="flex flex-col items-center justify-center text-center gap-5">
                <div className="max-w-2xl">
                  <h3 className="text-white font-kallisto font-black text-xl sm:text-2xl md:text-3xl leading-tight">
                    Don't see your industry?
                  </h3>
                  <p className="mt-2 text-white/80 text-sm sm:text-base">
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

export default IndustriesSectionAlt; 