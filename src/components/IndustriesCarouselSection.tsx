import React, { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { industries } from '@/data/industries';
import { motion, AnimatePresence } from 'framer-motion';
import { IndustriesCtaCard } from './IndustriesCtaCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Industry } from '@/data/industries';
import SplitText from './SplitText';
import { Link } from 'react-router-dom';

type CarouselCard = Industry | { isCTA: true };

function isCtaCard(card: CarouselCard): card is { isCTA: true } {
  return (card as any).isCTA;
}

const childItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  }),
  exit: { opacity: 0, y: -50, transition: { duration: 0.3, ease: 'easeIn' } },
};

const CARD_WIDTH = 372; // px, matches Apple large
const CARD_WIDTH_MD = 405; // px, matches Apple xlarge
const CARD_GAP = 32; // px, gap-x-8

// Helper to get dynamic font size for card titles
function getTitleFontSize(title: string) {
  const base = 1.5; // rem (24px)
  const step = 0.13; // rem (about 2px)
  const min = 1.0; // rem (16px)
  if (title.length <= 6) return '2.25rem'; // 36px
  let size = 2.25 - (title.length - 6) * step;
  if (size < min) size = min;
  return `${size}rem`;
}

export const IndustriesCarouselSection = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  const [startIdx, setStartIdx] = useState(0);
  const [currentBackgroundVideo, setCurrentBackgroundVideo] = useState<string>('');
  // Only industry cards for mapping
  const allCards: Industry[] = [...industries];
  const total = allCards.length;
  const CARDS_VISIBLE = 4;
  const maxStart = total - CARDS_VISIBLE;
  const canGoLeft = startIdx > 0;
  const canGoRight = startIdx < maxStart;

  // Responsive card width
  const getCardWidth = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return CARD_WIDTH_MD;
      return CARD_WIDTH;
    }
    return CARD_WIDTH;
  };
  const cardWidth = getCardWidth();
  const containerPadding = 80; // Increased padding to allow for scale-up on hover
  const visibleWidth = CARDS_VISIBLE * cardWidth + (CARDS_VISIBLE - 1) * CARD_GAP;
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
    <section className="relative py-20 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #1b3764 0%, #2a4a7a 50%, #1b3764 100%)' }}>
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
          <div className="text-center mb-8">
            <SplitText
              text="Better Built Bonds for All Industries"
              className="text-5xl md:text-8xl font-extrabold text-white mb-4 whitespace-nowrap font-kallisto"
              splitType="words"
              delay={50}
            />
            <SplitText
              text="At Forza, we're your trusted scientists and mentors - delivering innovative adhesive solutions that secure your success"
              className="text-xl md:text-3xl text-white max-w-4xl mx-auto"
              splitType="words"
              delay={10}
              duration={0.4}
            />
          </div>
          <div className="w-full flex flex-row items-center justify-center gap-4 md:gap-6">
            <button
              onClick={() => setStartIdx(Math.max(0, clampedStartIdx - 1))}
              disabled={clampedStartIdx === 0}
              className="h-12 w-12 md:h-16 md:w-16 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              aria-label="Previous"
            >
              <ChevronLeft className="h-8 w-8 md:h-10 md:w-10" />
            </button>
            <div
              className="relative overflow-hidden"
              style={{ width: visibleWidth, padding: '20px 0' }}
            >
              <div
                className="flex flex-row gap-x-8 md:gap-x-8 transition-transform duration-500"
                style={{
                  minWidth: (allCards.length + 1) * cardWidth + allCards.length * CARD_GAP,
                  transform: `translateX(-${clampedStartIdx * (cardWidth + CARD_GAP)}px)`
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
                        className="bg-white shadow-2xl rounded-[2rem] border border-gray-200 overflow-hidden transition-all duration-300 hover:scale-105 w-[340px] md:w-[372px] lg:w-[405px] aspect-[3/4] group cursor-pointer"
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
                            style={{ height: '180px', width: 'auto', bottom: '0px', filter: 'drop-shadow(0px 0px 0px rgba(242, 97, 29, 0))' }}
                            variants={childItemVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ rotate: 5, scale: 1.1, filter: 'drop-shadow(0px 0px 25px rgba(242, 97, 29, 1))', transition: { duration: 0.15, ease: [0.42, 0, 0.58, 1] } }}
                            transition={{ duration: 0.15, ease: [0.42, 0, 0.58, 1] }}
                          />
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 bg-white rounded-b-[2rem] h-[56px] md:h-[72px] flex items-center px-6 md:px-8 pointer-events-none"
                            variants={childItemVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <motion.h3
                              className="font-black font-kallisto drop-shadow-2xl text-left w-full"
                              style={{
                                color: item.color || '#1b3764',
                                fontSize: getTitleFontSize(item.title),
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
                  className="bg-white shadow-2xl rounded-[2rem] border border-gray-200 overflow-hidden transition-all duration-300 hover:scale-105 w-[340px] md:w-[372px] lg:w-[405px] aspect-[3/4] flex flex-col justify-center items-center flex-shrink-0"
                />
              </div>
            </div>
            <button
              onClick={() => setStartIdx(Math.min(clampedStartIdx + 1, total + 1 - CARDS_VISIBLE))}
              disabled={clampedStartIdx >= total + 1 - CARDS_VISIBLE}
              className="h-12 w-12 md:h-16 md:w-16 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              aria-label="Next"
            >
              <ChevronRight className="h-8 w-8 md:h-10 md:w-10" />
            </button>
          </div>
          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: numPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setStartIdx(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentPage === idx ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 