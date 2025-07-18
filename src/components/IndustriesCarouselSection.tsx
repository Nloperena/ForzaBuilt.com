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
const CARD_WIDTH_SM = 140; // Mobile
const CARD_WIDTH_MD = 160; // Tablet
const CARD_WIDTH_LG = 360; // Desktop - 3x larger
const CARD_WIDTH_XL = 480; // Large desktop - 3x larger
const CARD_WIDTH_LANDSCAPE = 540; // Landscape - 3x larger cards
const CARD_GAP = 8; // Default gap
const CARD_GAP_LANDSCAPE = 24; // Landscape - more spacing

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
  <SplitText
    key="industries-heading"
    text="Better Built Bonds for All Industries"
    className="text-lg sm:text-2xl md:text-4xl lg:text-6xl xl:text-8xl font-extrabold text-white mb-2 sm:mb-4 whitespace-normal sm:whitespace-nowrap font-kallisto"
    splitType="words"
    delay={50}
  />
));

const MemoizedSubheading = React.memo(() => (
  <SplitText
    key="industries-subheading"
    text="At Forza, we're your trusted scientists and mentors - delivering innovative adhesive solutions that secure your success"
    className="text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl text-white max-w-4xl mx-auto"
    splitType="words"
    delay={10}
    duration={0.4}
  />
));

export const IndustriesCarouselSection = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  const [startIdx, setStartIdx] = useState(0);
  const [currentBackgroundVideo, setCurrentBackgroundVideo] = useState<string>('');
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
      if (window.innerWidth < 640) return 2; // Mobile: 2 cards
      if (window.innerWidth < 1024) return 2; // Tablet: 2 cards (larger cards)
      if (window.innerWidth < 1280) return 2; // Small desktop: 2 cards (3x larger cards)
      return 3; // Large desktop: 3 cards (3x larger cards)
    }
    return 2; // Default
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

  // Update background video when carousel position changes
  React.useEffect(() => {
    const centerCardIndex = Math.floor(startIdx + CARDS_VISIBLE / 2);
    const centerCard = allCards[centerCardIndex];
    if (centerCard && centerCard.videoUrl !== currentBackgroundVideo) {
      setCurrentBackgroundVideo(centerCard.videoUrl);
      if (backgroundVideoRef.current) {
        backgroundVideoRef.current.src = centerCard.videoUrl;
        backgroundVideoRef.current.load();
        backgroundVideoRef.current.play();
      }
    }
  }, [startIdx, currentBackgroundVideo, allCards]);

  return (
    <section className="relative py-16 sm:py-24 md:py-32 lg:py-40 xl:py-48 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #1b3764 0%, #2a4a7a 50%, #1b3764 100%)' }}>
      {/* Dynamic background video container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={backgroundVideoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20 transition-opacity duration-1000"
          style={{ filter: 'brightness(0.3) contrast(1.2)' }}
        >
          <source src={currentBackgroundVideo || allCards[0]?.videoUrl || ''} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b3764]/80 via-[#1b3764]/60 to-[#1b3764]/80"></div>
      </div>
      <div className="absolute -top-[61%] -right-[85%] w-[150%] h-[100vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F2611D] via-[#F2611D]/90 to-transparent blur-[60px] pointer-events-none" />
      <div
        className="relative z-10 w-full flex justify-center"
        style={{ paddingLeft: containerPadding, paddingRight: containerPadding }}
      >
        <div className="w-full flex flex-col items-center">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24 px-4">
            <div className="max-w-6xl mx-auto space-y-6">
              <MemoizedHeading />
              <MemoizedSubheading />
            </div>
          </div>
          
          {/* Carousel Container */}
          <div className="w-full max-w-full overflow-hidden px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16 xl:py-20">
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
                        className={`bg-white shadow-2xl rounded-[0.375rem] sm:rounded-[0.5rem] md:rounded-[0.75rem] lg:rounded-[1rem] xl:rounded-[1.5rem] border border-gray-200 overflow-hidden transition-all duration-300 hover:scale-110 aspect-[3/4] group cursor-pointer ${
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
                              height: isLandscape ? '180px' : (window.innerWidth < 640 ? '40px' : window.innerWidth < 1024 ? '60px' : window.innerWidth < 1280 ? '150px' : '180px'), 
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
                                ? 'h-[120px] px-12' 
                                : 'h-[24px] sm:h-[32px] md:h-[40px] lg:h-[96px] xl:h-[120px] px-1 sm:px-2 md:px-3 lg:px-8 xl:px-12'
                            }`}
                            variants={childItemVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <motion.h3
                              className="font-black font-kallisto drop-shadow-2xl text-left w-full"
                              style={{
                                color: item.color || '#1b3764',
                                fontSize: isLandscape ? '2rem' : (window.innerWidth < 640 ? getTitleFontSize(item.title) : window.innerWidth < 1024 ? '1rem' : window.innerWidth < 1280 ? '1.75rem' : '2rem'),
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
                  className={`bg-white shadow-2xl rounded-[0.375rem] sm:rounded-[0.5rem] md:rounded-[0.75rem] lg:rounded-[1rem] xl:rounded-[1.5rem] border border-gray-200 overflow-hidden transition-all duration-300 hover:scale-110 aspect-[3/4] flex flex-col justify-center items-center flex-shrink-0 ${
                    isLandscape 
                      ? 'w-[540px]' 
                      : 'w-[120px] sm:w-[140px] md:w-[180px] lg:w-[360px] xl:w-[480px]'
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