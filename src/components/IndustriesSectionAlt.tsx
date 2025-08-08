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
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-32">
          <div className="max-w-6xl mx-auto space-y-8">
            <h2 className="font-extrabold text-white font-kallisto text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl whitespace-nowrap">
              Better Built Bonds for All Industries
            </h2>
            <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
              At Forza, we're your trusted scientists and mentors - delivering innovative adhesive solutions that secure your success
            </p>
          </div>
        </div>
        
        {/* Mobile: Single column list layout */}
        <div className="block md:hidden">
          <div className="space-y-4">
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

        {/* Desktop: Grid layout with landscape optimization */}
        <div className="hidden md:block w-full flex flex-col items-center">
          <div className={`grid gap-8 lg:gap-12 w-full max-w-7xl mb-20 mx-auto py-8 sm:py-12 lg:py-16 ${
            isLandscape 
              ? 'grid-cols-2 gap-12 lg:gap-16' // Landscape: 2 columns with more spacing
              : 'grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12'
          }`}>
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
                    className={`bg-white shadow-2xl rounded-[1rem] sm:rounded-[2rem] border border-gray-200 overflow-hidden aspect-square transition-all duration-300 hover:scale-105 group cursor-pointer w-full h-full ${
                      isLandscape 
                        ? 'min-h-[600px]' // Landscape: 3x taller cards
                        : 'min-h-[320px] lg:min-h-[500px] xl:min-h-[600px]'
                    }`}
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
                      <motion.img
                        src={industry.logo}
                        alt={industry.title + ' logo'}
                        className={`absolute right-0 z-20 transform transition-all duration-150 pointer-events-none w-auto bottom-0 ${
                          isLandscape ? 'h-[300px]' : 'h-[150px] lg:h-[250px] xl:h-[300px]'
                        }`}
                        style={{ filter: 'drop-shadow(0px 0px 0px rgba(242, 97, 29, 0))' }}
                        variants={childItemVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ rotate: 5, scale: 1.1, filter: 'drop-shadow(0px 0px 25px rgba(242, 97, 29, 1))', transition: { duration: 0.15, ease: [0.42, 0, 0.58, 1] } }}
                        transition={{ duration: 0.15, ease: [0.42, 0, 0.58, 1] }}
                      />
                      <motion.div
                        className={`absolute bottom-0 left-0 right-0 bg-white rounded-b-[1rem] sm:rounded-b-[2rem] flex items-center pointer-events-none ${
                          isLandscape ? 'h-[150px] px-20' : 'h-[72px] px-8 lg:h-[120px] lg:px-16 xl:h-[150px] xl:px-20'
                        }`}
                        variants={childItemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <motion.h3
                          className={`font-black font-kallisto drop-shadow-2xl text-left w-full ${
                            isLandscape ? 'text-4xl lg:text-5xl' : 'text-xl lg:text-3xl xl:text-4xl'
                          }`}
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
                      </motion.div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
            <IndustriesCtaCard size="large" className={`bg-white shadow-2xl rounded-[1rem] sm:rounded-[2rem] border border-gray-200 overflow-hidden aspect-square transition-all duration-300 hover:scale-110 flex flex-col justify-center items-center ${
              isLandscape ? 'min-h-[600px]' : 'min-h-[320px] lg:min-h-[500px] xl:min-h-[600px]'
            }`} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSectionAlt; 