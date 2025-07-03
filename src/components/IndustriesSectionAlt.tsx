import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card } from './ui/card';
import { industries } from '../data/industries';
import { motion } from 'framer-motion';
import { IndustriesCtaCard } from './IndustriesCtaCard';
import type { Industry } from '../data/industries';

const childItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.42, 0, 0.58, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: [0.42, 0, 0.58, 1],
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  }),
  exit: { opacity: 0, y: -50, transition: { duration: 0.3, ease: [0.42, 0, 0.58, 1] } },
};

function getTitleFontSize(title: string) {
  const base = 1.5; // rem (24px)
  const step = 0.13; // rem (about 2px)
  const min = 1.0; // rem (16px)
  if (title.length <= 6) return '2.25rem'; // 36px
  let size = 2.25 - (title.length - 6) * step;
  if (size < min) size = min;
  return `${size}rem`;
}

const IndustriesSectionAlt = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const industriesArr: Industry[] = industries;

  return (
    <section className="py-20 bg-[#1b3764] w-full">
      <div className="w-full px-20">
        <div className="text-center mb-16">
          <h2 className="text-8xl font-extrabold text-white mb-6 whitespace-nowrap font-kallisto">
            Better Built Bonds for All Industries
          </h2>
          <p className="text-3xl text-white max-w-4xl mx-auto">
            At Forza, we're your trusted scientists and mentors - delivering innovative adhesive solutions that secure your success
          </p>
        </div>
        <div className="w-full flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-14 gap-y-14 w-full max-w-[60rem] mb-14 mx-auto">
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
                    className="bg-white shadow-2xl rounded-[2rem] border border-gray-200 overflow-hidden aspect-square transition-all duration-300 hover:scale-105 min-h-[260px] md:min-h-[320px] lg:min-h-[360px] group cursor-pointer w-full h-full"
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
                        className="absolute right-0 z-20 transform transition-all duration-150 pointer-events-none"
                        style={{ height: '150px', width: 'auto', bottom: '0px', filter: 'drop-shadow(0px 0px 0px rgba(242, 97, 29, 0))' }}
                        variants={childItemVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ rotate: 5, scale: 1.1, filter: 'drop-shadow(0px 0px 25px rgba(242, 97, 29, 1))', transition: { duration: 0.15, ease: [0.42, 0, 0.58, 1] } }}
                        transition={{ duration: 0.15, ease: [0.42, 0, 0.58, 1] }}
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 bg-white rounded-b-[2rem] h-[72px] flex items-center px-8 pointer-events-none"
                        variants={childItemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <motion.h3
                          className="font-black font-kallisto drop-shadow-2xl text-left w-full"
                          style={{
                            color: industry.color || '#1b3764',
                            fontSize: getTitleFontSize(industry.title),
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
            <IndustriesCtaCard size="large" className="bg-white shadow-2xl rounded-[2rem] border border-gray-200 overflow-hidden aspect-square transition-all duration-300 hover:scale-105 min-h-[260px] md:min-h-[320px] lg:min-h-[360px] flex flex-col justify-center items-center" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSectionAlt; 