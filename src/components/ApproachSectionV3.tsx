import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGradientMode } from '@/contexts/GradientModeContext';
import ExperienceBetterBanner from '@/components/ExperienceBetterBanner';
import MSHeroBanner from '@/components/MSHeroBanner';

interface ApproachItem {
  title: string;
  description: string;
  bulletPoints: string[];
  image: string;
  video?: string;
}

const approachItems: ApproachItem[] = [
  {
    title: "REAL KNOW HOW",
    description: "Expert guidance to select and optimize the right products for your specific applications.",
    bulletPoints: [
      "Technical support and expertise",
      "Application-specific recommendations",
      "Performance optimization"
    ],
    image: "/images/approach/Construction Visit.jpg",
    video: "/approach-videos/Real Know How-2.mp4"
  },
  {
    title: "PRODUCT PERFORMANCE",
    description: "Superior quality products engineered for maximum performance and reliability.",
    bulletPoints: [
      "Rigorous testing and quality control",
      "Performance-tested in real-world conditions",
      "Built to exceed industry standards"
    ],
    image: "/images/approach/Products Portfolio.jpg",
    video: "/approach-videos/Product Performance-2.mp4"
  },
  {
    title: "INDUSTRY-FOCUSED",
    description: "Deep expertise across all major industries and applications.",
    bulletPoints: [
      "Decades of industry experience",
      "Application-specific knowledge",
      "Proven track record"
    ],
    image: "/images/approach/Legacy Image.jpg",
    video: "/approach-videos/Industry Focused-2.mp4"
  },
  {
    title: "COMPLETE PORTFOLIO",
    description: "Comprehensive range of industrial adhesives, sealants, tapes, and cleaners - all under one roof.",
    bulletPoints: [
      "World's most comprehensive portfolio",
      "One-stop solution for all bonding needs",
      "Saves time, money & reduces risk"
    ],
    image: "/images/approach/Products Portfolio.jpg",
    video: "/approach-videos/Complete Portfolio-2.mp4"
  },
  {
    title: "REAL INNOVATION",
    description: "Innovation & Greener Chemistries leading the way to a sustainable future.",
    bulletPoints: [
      "Safer products & greener technologies.",
      "Made in the U.S.A. for sustainable supply chain.",
      "Always accelerating towards the future today."
    ],
    image: "/images/approach/Sustainability Image for Web.jpg",
    video: "/approach-videos/Sustainable Solutions.mp4"
  },
  {
    title: "MADE IN USA",
    description: "Proudly manufactured in America with domestic and international components.",
    bulletPoints: [
      "American-made quality and craftsmanship",
      "Supporting the U.S. economy",
      "Reliable domestic supply chain"
    ],
    image: "/images/approach/R&D image.jpg",
    video: "/approach-videos/Made in USA-2.mp4"
  },
  {
    title: "R&D LEADERSHIP",
    description: "Fully integrated manufacturing and R&D capabilities in the U.S.A.",
    bulletPoints: [
      "Full control over quality & consistency",
      "Rapid product development",
      "Custom formulation capabilities"
    ],
    image: "/images/approach/R&D image.jpg",
    video: "/approach-videos/R&D Leadership.mp4"
  },
  {
    title: "CUSTOMER-OBSESSED",
    description: "Dedicated support and attention to every customer's unique needs.",
    bulletPoints: [
      "Responsive customer service",
      "Technical support team",
      "Long-term partnership focus"
    ],
    image: "/images/approach/Receptionist at desk.jpg",
    video: "/approach-videos/Customer Obsessed-1.mp4"
  }
];

const ApproachSectionV3 = () => {
  const [selectedItem, setSelectedItem] = useState(1);
  const [previousItem, setPreviousItem] = useState(1);
  const { mode } = useGradientMode();
  const [progress, setProgress] = useState(0);
  const [videoLoadedMap, setVideoLoadedMap] = useState<Record<number, boolean>>({});
  const [videoErrorMap, setVideoErrorMap] = useState<Record<number, boolean>>({});
  const cycleTimerRef = useRef<NodeJS.Timeout>();
  const progressIntervalRef = useRef<NodeJS.Timeout>();
  const isUserInteractingRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const previousVideoRef = useRef<HTMLVideoElement>(null);
  const videoLoadedMapRef = useRef<Record<number, boolean>>({});
  const videoErrorMapRef = useRef<Record<number, boolean>>({});
  const videoRefsMap = useRef<Map<number, HTMLVideoElement>>(new Map());

  // Keep refs in sync with state
  useEffect(() => {
    videoLoadedMapRef.current = videoLoadedMap;
  }, [videoLoadedMap]);

  useEffect(() => {
    videoErrorMapRef.current = videoErrorMap;
  }, [videoErrorMap]);

  useEffect(() => {
    // Auto-cycle every 4 seconds
    cycleTimerRef.current = setInterval(() => {
      if (!isUserInteractingRef.current) {
        setSelectedItem(prev => {
          const nextIndex = (prev + 1) % approachItems.length;
          setPreviousItem(prev);
          return nextIndex;
        });
        setProgress(0);
      }
    }, 4000);

    // Progress bar animation
    progressIntervalRef.current = setInterval(() => {
      if (!isUserInteractingRef.current) {
        setProgress(prev => {
          if (prev >= 100) return 0;
          return prev + (100 / 40);
        });
      }
    }, 100);

    return () => {
      if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  // Preload adjacent videos for smoother transitions
  useEffect(() => {
    const preloadIndices = [
      (selectedItem + 1) % approachItems.length,
      (selectedItem - 1 + approachItems.length) % approachItems.length,
    ];

    preloadIndices.forEach((index) => {
      const item = approachItems[index];
      if (item.video && !videoLoadedMap[index] && !videoErrorMap[index]) {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.src = item.video;
        video.muted = true;
        video.playsInline = true;
        // Preload in background
        video.load();
      }
    });
  }, [selectedItem, videoLoadedMap, videoErrorMap]);

  // Handle video loading and playback
  useEffect(() => {
    const currentItem = approachItems[selectedItem];
    const previousItemObj = approachItems[previousItem];

    // Load and play current video if it has one
    if (currentItem.video && currentVideoRef.current) {
      const video = currentVideoRef.current;
      
      // If video element already has a different src, we need to reload it
      const source = video.querySelector('source');
      if (source && source.src !== currentItem.video) {
        video.load(); // Reload video when source changes
      }
      
      let timeout: NodeJS.Timeout;
      
      const handleCanPlayThrough = () => {
        clearTimeout(timeout);
        setVideoLoadedMap(prev => ({ ...prev, [selectedItem]: true }));
        setVideoErrorMap(prev => {
          const newMap = { ...prev };
          delete newMap[selectedItem];
          return newMap;
        });
        video.play().catch(() => {
          // Auto-play failed, but video is loaded so we'll still use it
        });
      };

      const handleError = () => {
        clearTimeout(timeout);
        setVideoErrorMap(prev => ({ ...prev, [selectedItem]: true }));
      };

      // Set timeout for video loading (5 seconds)
      timeout = setTimeout(() => {
        if (!videoLoadedMapRef.current[selectedItem] && !videoErrorMapRef.current[selectedItem]) {
          handleError();
        }
      }, 5000);

      video.addEventListener('canplaythrough', handleCanPlayThrough);
      video.addEventListener('error', handleError);
      
      return () => {
        clearTimeout(timeout);
        video.removeEventListener('canplaythrough', handleCanPlayThrough);
        video.removeEventListener('error', handleError);
      };
    }

    // Load and play previous video if it has one
    if (previousItemObj.video && previousVideoRef.current) {
      const video = previousVideoRef.current;
      
      // If video element already has a different src, we need to reload it
      const source = video.querySelector('source');
      if (source && source.src !== previousItemObj.video) {
        video.load(); // Reload video when source changes
      }
      
      let timeout: NodeJS.Timeout;
      
      const handlePrevCanPlayThrough = () => {
        clearTimeout(timeout);
        setVideoLoadedMap(prev => ({ ...prev, [previousItem]: true }));
        setVideoErrorMap(prev => {
          const newMap = { ...prev };
          delete newMap[previousItem];
          return newMap;
        });
        video.play().catch(() => {
          // Auto-play failed, but video is loaded so we'll still use it
        });
      };

      const handlePrevError = () => {
        clearTimeout(timeout);
        setVideoErrorMap(prev => ({ ...prev, [previousItem]: true }));
      };

      // Set timeout for video loading (5 seconds)
      timeout = setTimeout(() => {
        if (!videoLoadedMapRef.current[previousItem] && !videoErrorMapRef.current[previousItem]) {
          handlePrevError();
        }
      }, 5000);

      video.addEventListener('canplaythrough', handlePrevCanPlayThrough);
      video.addEventListener('error', handlePrevError);
      
      return () => {
        clearTimeout(timeout);
        video.removeEventListener('canplaythrough', handlePrevCanPlayThrough);
        video.removeEventListener('error', handlePrevError);
      };
    }
  }, [selectedItem, previousItem]);

  const handleItemChange = (index: number) => {
    if (index !== selectedItem) {
      setPreviousItem(selectedItem);
      setSelectedItem(index);
      setProgress(0);
      isUserInteractingRef.current = true;
      if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      cycleTimerRef.current = setTimeout(() => {
        isUserInteractingRef.current = false;
      }, 8000);
    }
  };

  return (
    <>

      
      {/* MS Hero Banner */}
      <MSHeroBanner />

      {/* Isolated Section Container */}
      <section ref={sectionRef} className="relative isolate">
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#F2611D] to-orange-400 transition-all duration-100 z-50" style={{ width: `${progress}%` }} />

        {/* Scrollable Content */}
        <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* LEFT - Transparent window on desktop, normal image on mobile */}
            <div className="
            relative
            min-h-[50svh] md:min-h-[55svh] lg:min-h-[75vh]
            flex items-center justify-center
            overflow-hidden lg:overflow-visible
          ">
              {/* Inline image (all breakpoints) with solid background to avoid hero flash */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2c476e] to-[#477197] overflow-hidden">
                {/* Previous content (beneath) - image or video */}
                {approachItems[previousItem].video && !videoErrorMap[previousItem] && (
                  <video
                    ref={previousVideoRef}
                    key="previous-video"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      videoLoadedMap[selectedItem] && selectedItem !== previousItem ? 'opacity-0' : 'opacity-100'
                    }`}
                    muted
                    loop
                    playsInline
                    preload="none"
                  >
                    <source key={approachItems[previousItem].video} src={approachItems[previousItem].video} type="video/mp4" />
                  </video>
                )}
                {/* Only show image if video failed or doesn't exist */}
                {(!approachItems[previousItem].video || videoErrorMap[previousItem]) && (
                  <img
                    src={approachItems[previousItem].image}
                    alt={approachItems[previousItem].title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      videoLoadedMap[selectedItem] && selectedItem !== previousItem ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                )}
                
                {/* Current content (on top) - image or video */}
                {approachItems[selectedItem].video && !videoErrorMap[selectedItem] && (
                  <motion.video
                    ref={currentVideoRef}
                    key={`current-video-${selectedItem}`}
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ 
                      opacity: videoLoadedMap[selectedItem] ? 1 : 0,
                      x: videoLoadedMap[selectedItem] ? 0 : 32
                    }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                  >
                    <source key={approachItems[selectedItem].video} src={approachItems[selectedItem].video} type="video/mp4" />
                  </motion.video>
                )}
                {/* Only show image if no video or video failed */}
                {(!approachItems[selectedItem].video || videoErrorMap[selectedItem]) && (
                  <motion.img
                    key={`current-image-${selectedItem}`}
                    src={approachItems[selectedItem].image}
                    alt={approachItems[selectedItem].title}
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                
                {/* Very light dark overlay over the entire photo */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent z-10"></div>
                
                {/* Overlay bullet points - moved to top */}
                <div className="absolute inset-0 z-20 flex items-start justify-start p-6 md:p-8">
                  <div className="max-w-md">
                    <h4 className={`text-white text-[clamp(16px,2vw,20px)] font-bold mb-3 transition-all duration-500 ${
                      mode === 'light2' ? 'font-poppins' : 'font-kallisto'
                    }`}>
                      {approachItems[selectedItem].title === 'GREENER CHEMISTRIES' 
                        ? 'Innovation & Greener Chemistries'
                        : approachItems[selectedItem].title}
                    </h4>
                    <ul className={`space-y-1.5 text-white text-[clamp(14px,1.6vw,18px)] ${
                      mode === 'light2' ? 'font-poppins' : ''
                    }`}>
                      {approachItems[selectedItem].bulletPoints.map((point, idx) => (
                        <motion.li
                          key={`${selectedItem}-${idx}`}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: idx * 0.1,
                            ease: 'easeOut'
                          }}
                        >
                          <span className="text-[#F2611D] mr-2 font-bold">•</span>
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
          </div>

          {/* RIGHT - Scrollable text content */}
          <div className="
            relative
            min-h-[50svh] md:min-h-[55svh] lg:min-h-[75vh]
            px-[clamp(14px,4vw,32px)] py-[clamp(24px,5vw,48px)]
            flex items-center justify-center
            [--gap:clamp(12px,2.4vw,24px)] [--lh-head:1.18] [--lh-head-sm:1.28] [--lh-body:1.7]
            bg-gradient-to-r from-[#2c476e] to-[#477197]
          ">
            <div className="w-full">
              {/* VALUE PROPOSITION Heading */}
              <div className="mb-6">
                <h2 className="text-white text-[clamp(22px,3vw,64px)] font-normal mb-3 font-poppins leading-[var(--lh-head-sm)] md:leading-[var(--lh-head)] tracking-[-0.01em]">
                  Value Proposition
                </h2>
                {/* VALUE PROPOSITION Bullet Points */}
                <ul className="space-y-1.5 mb-6">
                  <li className="text-white text-[clamp(14px,1.5vw,18px)] font-poppins">
                    Big-Picture Expertise. Small-Town Care
                  </li>
                  <li className="text-white text-[clamp(14px,1.5vw,18px)] font-poppins">
                    We unleash the strength and spirit of America's Heartland to build high-performance adhesives and sealants—while delivering the kind of customer care that big companies forgot how to give.
                  </li>
                  <li className="text-white text-[clamp(14px,1.5vw,18px)] font-poppins">
                    Purpose-Built Performance. Guaranteed Strength.
                  </li>
                </ul>
              </div>
              <div className="space-y-[clamp(8px,1.5vw,16px)]">
                {approachItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleItemChange(index)}
                    onMouseEnter={() => handleItemChange(index)}
                    className="w-full text-left transition-all duration-500"
                  >
                    <h3 className={`leading-[var(--lh-head-sm)] md:leading-[var(--lh-head)] tracking-[-0.01em] ${
                      selectedItem === index
                        ? 'text-[#F2611D] text-[clamp(22px,3vw,48px)] font-bold'
                        : 'text-white text-[clamp(18px,2.5vw,36px)] font-normal'
                    } hover:text-[#F2611D] transition-all duration-500 ease-out ${
                      mode === 'light2' ? 'font-poppins' : 'font-kallisto'
                    }`}>
                      {item.title}
                    </h3>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default ApproachSectionV3;

