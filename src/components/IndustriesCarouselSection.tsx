
import React, { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { industries } from '@/data/industries';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import { IndustriesCtaCard } from './IndustriesCtaCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Industry } from '@/data/industries';
import SplitText from './SplitText';
import { Link } from 'react-router-dom';
import { useLandscapeValues } from '@/hooks/use-landscape';

type CarouselCard = Industry | { isCTA: true };

function isCtaCard(card: CarouselCard): card is { isCTA: true } {
  return (card as any).isCTA;
}

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

// Card dimensions with landscape optimization
const CARD_WIDTH_SM = 400; // Mobile - much larger to show fewer cards
const CARD_WIDTH_MD = 450; // Tablet - larger for better touch interaction
const CARD_WIDTH_LG = 520; // Desktop - larger for better viewing
const CARD_WIDTH_XL = 680; // Large desktop - larger for better proportions
const CARD_WIDTH_LANDSCAPE = 800; // Landscape - larger for better viewing
const CARD_GAP = 20; // Default gap - increased for better spacing
const CARD_GAP_LANDSCAPE = 48; // Landscape - increased spacing

// Helper to get dynamic font size for card titles
function getTitleFontSize(title: string) {
  const base = 0.875; // rem (14px) - very small base
  const step = 0.06; // rem (about 1px)
  const min = 0.625; // rem (10px)
  if (title.length <= 6) return '0.875rem'; // 14px for mobile
  let size = 0.875 - (title.length - 6) * step;
  if (size < min) size = min;
  return `${size}rem`;
}

// Memoized text components to prevent re-animation
const MemoizedHeading = React.memo(() => (
  <div className="text-center">
    <SplitText
      key="industries-heading-line1"
      text="Better Built Bonds"
      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white mb-1 sm:mb-2 md:mb-4 font-kallisto leading-none break-words block"
      splitType="words"
      delay={50}
    />
    <SplitText
      key="industries-heading-line2"
      text="for All Industries"
      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white mb-1 sm:mb-2 md:mb-4 font-kallisto leading-none break-words block"
      splitType="words"
      delay={50}
    />
  </div>
));

const MemoizedSubheading = React.memo(() => (
  <SplitText
    key="industries-subheading"
    text="At Forza, we're your trusted scientists and mentors - delivering innovative adhesive solutions that secure your success"
    className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white max-w-3xl sm:max-w-4xl mx-auto"
    splitType="words"
    delay={10}
    duration={0.4}
  />
));

export const IndustriesCarouselSection = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [startIdx, setStartIdx] = useState(0);
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Landscape optimization values
  const { isLandscape, cardWidth: landscapeCardWidth, cardGap: landscapeCardGap, visibleCards: landscapeVisibleCards } = useLandscapeValues();
  
  // Only industry cards for mapping
  const allCards: Industry[] = [...industries];
  const total = allCards.length;
  
  // Responsive number of visible cards with landscape optimization
  const getVisibleCards = () => {
    if (typeof window !== 'undefined') {
      if (isLandscape) return landscapeVisibleCards; // Landscape: fewer but larger cards
      if (window.innerWidth < 640) return 1; // Mobile: 1 card for maximum size
      if (window.innerWidth < 1024) return 2; // Tablet: 2 cards (larger cards)
      if (window.innerWidth < 1280) return 2; // Small desktop: 2 cards (larger cards)
      return 3; // Large desktop: 3 cards (larger cards)
    }
    return 1; // Default to 1 for mobile
  };
  
  const CARDS_VISIBLE = getVisibleCards();
  const maxStart = total - CARDS_VISIBLE;
  const canGoLeft = startIdx > 0;
  const canGoRight = startIdx < maxStart;

  // Responsive card width with landscape optimization
  const getCardWidth = () => {
    if (typeof window !== 'undefined') {
      if (isLandscape) return landscapeCardWidth; // Landscape: larger cards
      if (window.innerWidth < 640) return CARD_WIDTH_SM;
      if (window.innerWidth < 768) return CARD_WIDTH_MD;
      if (window.innerWidth < 1024) return CARD_WIDTH_LG;
      return CARD_WIDTH_XL;
    }
    return CARD_WIDTH_SM;
  };
  
  const cardWidth = getCardWidth();
  const cardGap = isLandscape ? landscapeCardGap : CARD_GAP;
  const containerPadding = isLandscape ? 24 : (window.innerWidth < 640 ? 8 : 16); // More padding for landscape
  const visibleWidth = CARDS_VISIBLE * cardWidth + (CARDS_VISIBLE - 1) * cardGap;
  // Clamp startIdx so last set is always fully visible
  const clampedStartIdx = Math.min(startIdx, total + 1 - CARDS_VISIBLE);

  const handlePrev = () => {
    if (canGoLeft) setStartIdx(startIdx - 1);
  };
  const handleNext = () => {
    if (canGoRight) setStartIdx(startIdx + 1);
  };

  // Pagination dots
  const numPages = total - CARDS_VISIBLE + 1;
  const currentPage = startIdx;

  // Detect mobile and handle video loading
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle video loading for mobile autoplay
  React.useEffect(() => {
    if (isMobile && videoRefs.current.length > 0) {
      const checkAllVideosLoaded = () => {
        const allVideos = videoRefs.current.filter(Boolean);
        const loadedVideos = allVideos.filter(video => video.readyState >= 2);
        
        if (loadedVideos.length === allVideos.length) {
          setVideosLoaded(true);
        }
      };
      
      // Check if videos are already loaded
      checkAllVideosLoaded();
      
      // Listen for video load events
      videoRefs.current.forEach(video => {
        if (video) {
          video.addEventListener('loadeddata', checkAllVideosLoaded);
        }
      });
      
      return () => {
        videoRefs.current.forEach(video => {
          if (video) {
            video.removeEventListener('loadeddata', checkAllVideosLoaded);
          }
        });
      };
    }
  }, [isMobile]);

  return (
    <section className="relative py-20 sm:py-28 md:py-36 lg:py-44 xl:py-52 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #1b3764 0%, #1b3764 70%, #F2611D 100%)' }}>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1b3764]/80 via-[#1b3764]/60 to-[#1b3764]/80"></div>
      <div className="absolute -top-[61%] -right-[85%] w-[150%] h-[100vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F2611D] via-[#F2611D]/90 to-transparent blur-[60px] pointer-events-none" />
      <div
        className="relative z-10 w-full flex justify-center"
        style={{ paddingLeft: containerPadding, paddingRight: containerPadding }}
      >
        <div className="w-full flex flex-col items-center">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24 px-4">
            <div className="max-w-6xl lg:max-w-7xl xl:max-w-8xl 2xl:max-w-9xl mx-auto space-y-6">
              <MemoizedHeading />
              <MemoizedSubheading />
            </div>
          </div>
          
          {/* Carousel Container */}
          <div className="w-full max-w-full lg:max-w-7xl xl:max-w-8xl 2xl:max-w-9xl overflow-hidden px-6 sm:px-10 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-20 xl:py-24">
            <div
              className="relative"
              style={{ 
                width: '100%',
                maxWidth: '100vw'
              }}
            >
              <div
                className="flex flex-row gap-x-1 sm:gap-x-2 md:gap-x-3 lg:gap-x-4 xl:gap-x-6 transition-transform duration-500"
                style={{
                  width: (allCards.length + 1) * cardWidth + allCards.length * cardGap,
                  transform: `translateX(-${clampedStartIdx * (cardWidth + cardGap)}px)`
                }}
              >
                {allCards.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={idx}
                    className="flex-shrink-0"
                  >
                    <Link 
                      to={`/industries/${item.title.toLowerCase().replace(/ /g, '-')}`}
                      className="block w-full h-full"
                    >
                      <Card
                        className={`bg-white shadow-2xl rounded-[0.375rem] sm:rounded-[0.5rem] md:rounded-[0.75rem] lg:rounded-[1rem] xl:rounded-[1.5rem] border border-gray-200 overflow-hidden transition-all duration-300 hover:scale-105 aspect-[3/4] group cursor-pointer ${
                          isLandscape 
                            ? 'w-[540px]' 
                            : 'w-[120px] sm:w-[140px] md:w-[180px] lg:w-[360px] xl:w-[480px]'
                        }`}
                        onMouseEnter={() => {
                          videoRefs.current[idx]?.play();
                        }}
                        onMouseLeave={() => {
                          if (videoRefs.current[idx]) {
                            videoRefs.current[idx].pause();
                            videoRefs.current[idx].currentTime = 0;
                          }
                        }}
                      >
                        <div className="relative w-full h-full overflow-hidden">
                          <motion.video
                            ref={(el) => (videoRefs.current[idx] = el)}
                            autoPlay={isMobile && videosLoaded}
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                            preload="auto"
                          >
                            <source src={item.videoUrl} type="video/mp4" />
                          </motion.video>
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none"></div>
                          <motion.img
                            src={item.logo}
                            alt={item.title + ' logo'}
                            className="absolute right-0 z-20 transform transition-all duration-150 pointer-events-none"
                            style={{ 
                              height: isLandscape ? '280px' : (window.innerWidth < 640 ? '80px' : window.innerWidth < 1024 ? '120px' : window.innerWidth < 1280 ? '240px' : '280px'), 
                              width: 'auto', 
                              bottom: '0px', 
                              filter: 'drop-shadow(0px 0px 0px rgba(242, 97, 29, 0))' 
                            }}
                            variants={childItemVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ rotate: 5, scale: 1.1, filter: 'drop-shadow(0px 0px 25px rgba(242, 97, 29, 1))', transition: { duration: 0.15, ease: [0.42, 0, 0.58, 1] } }}
                            transition={{ duration: 0.15, ease: [0.42, 0, 0.58, 1] }}
                          />
                          <motion.div
                            className={`absolute bottom-0 left-0 right-0 bg-white rounded-b-[0.375rem] sm:rounded-b-[0.5rem] md:rounded-b-[0.75rem] lg:rounded-b-[1rem] xl:rounded-b-[1.5rem] flex items-center pointer-events-none ${
                              isLandscape 
                                ? 'h-[180px] px-20' 
                                : 'h-[48px] sm:h-[56px] md:h-[64px] lg:h-[140px] xl:h-[180px] px-3 sm:px-4 md:px-5 lg:px-12 xl:px-20'
                            }`}
                            variants={childItemVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <motion.h3
                              className="font-black font-kallisto drop-shadow-2xl text-left w-full leading-tight"
                              style={{
                                color: item.color || '#1b3764',
                                fontSize: isLandscape 
                                  ? '3rem' 
                                  : (window.innerWidth < 640 
                                      ? getTitleFontSize(item.title) 
                                      : window.innerWidth < 1024 
                                        ? '1.25rem' 
                                        : window.innerWidth < 1280 
                                          ? '2rem' 
                                          : '3rem'),
                                lineHeight: 1.1,
                              }}
                              variants={childItemVariants}
                              initial="hidden"
                              animate="visible"
                            >
                              {item.title}
                            </motion.h3>
                          </motion.div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
                <IndustriesCtaCard
                  key="cta"
                  size="large"
                  className={`bg-white shadow-2xl rounded-[0.375rem] sm:rounded-[0.5rem] md:rounded-[0.75rem] lg:rounded-[1rem] xl:rounded-[1.5rem] border border-gray-200 overflow-hidden transition-all duration-300 hover:scale-105 aspect-[3/4] flex flex-col justify-center items-center flex-shrink-0 ${
                    isLandscape 
                      ? 'w-[800px]' 
                      : 'w-[400px] sm:w-[450px] md:w-[450px] lg:w-[520px] xl:w-[680px]'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Pagination dots - moved above navigation */}
          <div className="flex justify-center gap-1 sm:gap-2 mt-3 sm:mt-4 md:mt-6">
            {Array.from({ length: numPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setStartIdx(idx)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                  currentPage === idx ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation arrows - moved below pagination */}
          <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 mt-3 sm:mt-4">
            <button
              onClick={() => setStartIdx(Math.max(0, clampedStartIdx - 1))}
              disabled={clampedStartIdx === 0}
              className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10" />
            </button>
            <button
              onClick={() => setStartIdx(Math.min(clampedStartIdx + 1, total + 1 - CARDS_VISIBLE))}
              disabled={clampedStartIdx >= total + 1 - CARDS_VISIBLE}
              className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


export const IndustriesCarouselSectionV2 = () => {
  const allCards: Industry[] = [...industries];
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredCard(index);
    if (videoRefs.current[index]) {
      videoRefs.current[index].play();
    }
  };

  const handleMouseLeave = (index: number) => {
    setHoveredCard(null);
    if (videoRefs.current[index]) {
      videoRefs.current[index].pause();
      videoRefs.current[index].currentTime = 0;
    }
  };

  return (
    <section className="relative py-20 sm:py-28 md:py-36 lg:py-44 xl:py-52 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #1b3764 0%, #1b3764 70%, #F2611D 100%)' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1b3764]/80 via-[#1b3764]/60 to-[#1b3764]/80"></div>
      <div className="absolute -top-[61%] -right-[85%] w-[150%] h-[100vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F2611D] via-[#F2611D]/90 to-transparent blur-[60px] pointer-events-none" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <MemoizedHeading />
            <MemoizedSubheading />
          </div>

          <div className="w-full">
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
              {allCards.map((item, idx) => (
                <Link 
                  key={item.title}
                  to={`/industries/${item.title.toLowerCase().replace(/ /g, '-')}`}
                  className="block w-full sm:w-[48%] md:w-[48%] lg:w-[31%] xl:w-[23%] flex-shrink-0"
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                >
                  <Card className="bg-white shadow-2xl rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:scale-105 aspect-[3/4] group cursor-pointer w-full">
                    <div className="relative w-full h-full overflow-hidden">
                      <motion.video
                        ref={(el) => (videoRefs.current[idx] = el)}
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        preload="auto"
                      >
                        <source src={item.videoUrl} type="video/mp4" />
                      </motion.video>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none"></div>
                      <motion.img
                        src={item.logo}
                        alt={item.title + ' logo'}
                        className="absolute right-2 bottom-12 sm:right-4 sm:bottom-16 md:bottom-20 lg:bottom-24 z-20 transform transition-all duration-150 pointer-events-none w-1/3 sm:w-1/4"
                        whileHover={{ rotate: 5, scale: 1.1, filter: 'drop-shadow(0px 0px 25px rgba(242, 97, 29, 1))' }}
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 bg-white p-3 sm:p-4 md:p-5 flex items-center pointer-events-none"
                      >
                        <motion.h3
                          className="font-black font-kallisto text-base sm:text-lg md:text-xl lg:text-2xl text-left w-full leading-tight"
                          style={{ color: item.color || '#1b3764' }}
                        >
                          {item.title}
                        </motion.h3>
                      </motion.div>
                    </div>
                  </Card>
                </Link>
              ))}
              <div className="w-full sm:w-[48%] md:w-[48%] lg:w-[31%] xl:w-[23%] flex-shrink-0">
                <IndustriesCtaCard size="large" className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export const IndustriesCarouselSectionV3 = () => {
  const allCards: Industry[] = [...industries];
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredCard(index);
    if (videoRefs.current[index]) {
      videoRefs.current[index].play();
    }
  };

  const handleMouseLeave = (index: number) => {
    setHoveredCard(null);
    if (videoRefs.current[index]) {
      videoRefs.current[index].pause();
      videoRefs.current[index].currentTime = 0;
    }
  };

  return (
    <section className="relative py-20 sm:py-28 md:py-36 lg:py-44 xl:py-52 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #1b3764 0%, #1b3764 70%, #F2611D 100%)' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1b3764]/80 via-[#1b3764]/60 to-[#1b3764]/80"></div>
      <div className="absolute -top-[61%] -right-[85%] w-[150%] h-[100vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F2611D] via-[#F2611D]/90 to-transparent blur-[60px] pointer-events-none" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <MemoizedHeading />
            <MemoizedSubheading />
          </div>

          <div className="w-full">
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
              {allCards.map((item, idx) => (
                <Link 
                  key={item.title}
                  to={`/industries/${item.title.toLowerCase().replace(/ /g, '-')}`}
                  className="block w-full sm:w-[48%] md:w-[48%] lg:w-[31%] xl:w-[23%] flex-shrink-0"
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                >
                  <Card className="bg-white shadow-2xl rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:scale-105 aspect-[3/4] group cursor-pointer w-full">
                    <div className="relative w-full h-full overflow-hidden">
                      <motion.video
                        ref={(el) => (videoRefs.current[idx] = el)}
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        preload="auto"
                      >
                        <source src={item.videoUrl} type="video/mp4" />
                      </motion.video>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none"></div>
                      
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 bg-white p-3 sm:p-4 md:p-5 flex items-center justify-between pointer-events-none"
                      >
                        <motion.h3
                          className="font-black font-kallisto text-left leading-tight"
                          style={{ 
                            color: item.color || '#1b3764',
                            fontSize: 'clamp(0.75rem, 3vw, 1.5rem)'
                          }}
                        >
                          {item.title}
                        </motion.h3>
                        <motion.img
                          src={item.logo}
                          alt={item.title + ' logo'}
                          className="w-1/4 h-auto"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                        />
                      </motion.div>
                    </div>
                  </Card>
                </Link>
              ))}
              <div className="w-full sm:w-[48%] md:w-[48%] lg:w-[31%] xl:w-[23%] flex-shrink-0">
                <IndustriesCtaCard size="large" className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const IndustriesCarouselSectionV4 = () => {
  const allCards: Industry[] = [...industries];
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredCard(index);
    if (videoRefs.current[index]) {
      videoRefs.current[index].play();
    }
  };

  const handleMouseLeave = (index: number) => {
    setHoveredCard(null);
    if (videoRefs.current[index]) {
      videoRefs.current[index].pause();
      videoRefs.current[index].currentTime = 0;
    }
  };

  return (
    <section className="relative py-4 sm:py-10 md:py-20 lg:py-28 xl:py-36 w-full overflow-hidden bg-[#115B87]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#115B87]/80 via-[#115B87]/60 to-[#115B87]/80"></div>

      <div className="relative z-10 w-full px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-3 sm:mb-6 md:mb-10 lg:mb-16 xl:mb-20">
            <MemoizedHeading />
            <MemoizedSubheading />
          </div>

          <div className="w-full overflow-hidden min-h-[60vh] flex items-center justify-center sm:min-h-0 sm:block">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-6 lg:gap-8 xl:gap-10 max-w-full">
              {allCards.map((item, idx) => (
                <Link
                  key={item.title}
                  to={`/industries/${item.title.toLowerCase().replace(/ /g, '-')}`}
                  className="block w-[48%] sm:w-[48%] md:w-[45%] lg:w-[32%] xl:w-[24%] 2xl:w-[22%] flex-shrink-0"
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                >
                  <Card className="bg-white shadow-xl sm:shadow-2xl rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:scale-105 aspect-[3/4] group cursor-pointer w-full">
                    <div className="relative w-full h-full overflow-hidden">
                      <motion.video
                        ref={(el) => (videoRefs.current[idx] = el)}
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        preload="metadata"
                        onLoadedData={() => {
                          // Ensure video is ready to play on mobile
                          if (videoRefs.current[idx]) {
                            videoRefs.current[idx].load();
                          }
                        }}
                        onError={(e) => {
                          console.warn(`Video failed to load for ${item.title}:`, e);
                        }}
                      >
                        <source src={item.videoUrl} type="video/mp4" />
                      </motion.video>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none"></div>
                      
                      {/* Logo absolutely positioned at bottom right */}
                      <motion.div
                        className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 pointer-events-none z-20"
                      >
                        <motion.img
                          src={item.logo}
                          alt={item.title + ' logo'}
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
                              color: item.color || '#1b3764',
                              fontSize: 'clamp(0.75rem, 2vw, 1.5rem)',
                            }}
                          >
                            {item.title}
                          </motion.h3>
                        </div>
                      </motion.div>
                    </div>
                  </Card>
                </Link>
              ))}
              <div className="w-[48%] sm:w-[48%] md:w-[45%] lg:w-[32%] xl:w-[24%] 2xl:w-[22%] flex-shrink-0">
                <IndustriesCtaCard size="large" className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
