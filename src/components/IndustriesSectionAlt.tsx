import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card } from './ui/card';
import { industries } from '../data/industries';
import { motion, easeInOut } from 'framer-motion';
import { IndustriesCtaCard } from './IndustriesCtaCard';
import type { Industry } from '../data/industries';
import { useLandscapeValues } from '@/hooks/use-landscape';

const childItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeInOut } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: easeInOut,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  }),
  exit: { opacity: 0, y: -50, transition: { duration: 0.3, ease: easeInOut } },
};

const IndustriesSectionAlt = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const industriesArr: Industry[] = industries;
  
  // Landscape optimization values
  const { isLandscape } = useLandscapeValues();

  return (
    <section className="py-16 sm:py-24 md:py-32 lg:py-40 xl:py-48 bg-[#1b3764] w-full">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-20">
        <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
          <div className="max-w-6xl mx-auto space-y-8">
            <h2 className="font-black text-white font-kallisto text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-none break-words">
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
              <motion.div
                key={industry.title}
                variants={cardVariants}
                initial="hidden"
                animate={"visible"}
                exit="exit"
                custom={index}
                className="block"
              >
                <Link 
                  to={`/industries/${industry.title.toLowerCase().replace(/ /g, '-')}`}
                  className="block w-full"
                >
                  <Card
                    className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl group cursor-pointer w-full"
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
                        <motion.video
                          ref={(el) => (videoRefs.current[index] = el)}
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                          preload="auto"
                        >
                          <source src={industry.videoUrl} type="video/mp4" />
                        </motion.video>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none"></div>
                        <motion.img
                          src={industry.logo}
                          alt={industry.title + ' logo'}
                          className="absolute right-1 bottom-1 z-20 transform transition-all duration-150 pointer-events-none h-8 sm:h-10 w-auto"
                          style={{ filter: 'drop-shadow(0px 0px 0px rgba(242, 97, 29, 0))' }}
                          variants={childItemVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover={{ rotate: 5, scale: 1.1, filter: 'drop-shadow(0px 0px 25px rgba(242, 97, 29, 1))', transition: { duration: 0.15, ease: [0.42, 0, 0.58, 1] } }}
                          transition={{ duration: 0.15, ease: [0.42, 0, 0.58, 1] }}
                        />
                      </div>
                      
                      {/* Content Section */}
                      <div className="flex-1 flex flex-col justify-center px-4 py-3">
                        <motion.h3
                          className="font-black font-kallisto text-lg sm:text-xl text-left w-full mb-1"
                          style={{
                            color: industry.color || '#1b3764',
                            lineHeight: 1.1,
                          }}
                          variants={childItemVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {industry.title}
                        </motion.h3>
                        <p className="text-xs sm:text-sm text-gray-600 font-light">
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
              </motion.div>
            ))}
            
            {/* Mobile CTA Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate={"visible"}
              exit="exit"
              custom={industriesArr.length}
              className="block"
            >
              <IndustriesCtaCard size="large" className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl w-full h-24 sm:h-28" />
            </motion.div>
          </div>
        </div>

        {/* Desktop: Grid layout with 2 columns */}
        <div className="hidden md:block w-full flex flex-col items-center">
          <div className="grid grid-cols-2 gap-6 lg:gap-8 w-full max-w-7xl mb-8 mx-auto py-4 sm:py-6 lg:py-8">
            {industriesArr.map((industry: Industry, index: number) => (
              <motion.div
                key={industry.title}
                variants={cardVariants}
                initial="hidden"
                animate={"visible"}
                exit="exit"
                custom={index}
                className="block"
              >
                <Link 
                  to={`/industries/${industry.title.toLowerCase().replace(/ /g, '-')}`}
                  className="block w-full h-full"
                >
                  <Card
                    className="bg-white shadow-xl sm:shadow-2xl rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:scale-105 aspect-[3/4] group cursor-pointer w-full"
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
                      <motion.video
                        ref={(el) => (videoRefs.current[index] = el)}
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        preload="auto"
                      >
                        <source src={industry.videoUrl} type="video/mp4" />
                      </motion.video>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none"></div>
                      {/* Logo absolutely positioned at bottom right */}
                      <motion.div
                        className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 pointer-events-none z-20"
                      >
                        <motion.img
                          src={industry.logo}
                          alt={industry.title + ' logo'}
                          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32"
                          style={{
                            width: 'clamp(3rem, 5vw, 8rem)',
                            height: 'clamp(3rem, 5vw, 8rem)'
                          }}
                          whileHover={{ rotate: 5, scale: 1.1, filter: 'drop-shadow(0px 0px 25px rgba(242, 97, 29, 1))' }}
                        />
                      </motion.div>
                      
                      {/* White bar at bottom with text only */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 bg-white p-0.5 sm:p-1 md:p-1 lg:p-1.5 pointer-events-none"
                        style={{ zIndex: 10 }}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <motion.h3
                            className="font-black font-kallisto text-left leading-none flex-1 min-w-0 truncate pl-3 sm:pl-4 pt-3 sm:pt-4 pb-3 sm:pb-4"
                            style={{
                              color: industry.color || '#1b3764',
                              fontSize: 'clamp(0.75rem, 2vw, 1.5rem)',
                            }}
                          >
                            {industry.title}
                          </motion.h3>
                        </div>
                      </motion.div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
            <IndustriesCtaCard size="large" className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSectionAlt; 