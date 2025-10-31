import React, { useState, useEffect, useRef } from 'react';
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
    title: "COMPLETE PORTFOLIO",
    description: "Comprehensive range of industrial adhesives, sealants, tapes, and cleaners - all under one roof.",
    bulletPoints: [
      "World's most comprehensive portfolio",
      "One-stop solution for all bonding needs",
      "Saves time, money & reduces risk"
    ],
    image: "/images/approach/Products Portfolio.jpg",
    video: "/approach-videos/Product Performance.mp4"
  },
  {
    title: "REAL KNOW HOW",
    description: "Expert guidance to select and optimize the right products for your specific applications.",
    bulletPoints: [
      "Technical support and expertise",
      "Application-specific recommendations",
      "Performance optimization"
    ],
    image: "/images/approach/Construction Visit.jpg",
    video: "/approach-videos/Real Know How.mp4"
  },
  {
    title: "REAL INNOVATION",
    description: "Innovation & Greener Chemistries leading the way to a sustainable future.",
    bulletPoints: [
      "Safer products & greener technologies.",
      "Made in the U.S.A. for sustainable supply chain.",
      "Always accelerating towards the future today."
    ],
    image: "/images/approach/Sustainability Image for Web.jpg"
  },
  {
    title: "R&D LEADERSHIP",
    description: "Fully integrated manufacturing and R&D capabilities in the U.S.A.",
    bulletPoints: [
      "Full control over quality & consistency",
      "Rapid product development",
      "Custom formulation capabilities"
    ],
    image: "/images/approach/R&D image.jpg"
  },
  {
    title: "CUSTOMER-OBSESSED",
    description: "Dedicated support and attention to every customer's unique needs.",
    bulletPoints: [
      "Responsive customer service",
      "Technical support team",
      "Long-term partnership focus"
    ],
    image: "/images/approach/Receptionist at desk.jpg"
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
    video: "/approach-videos/Industry Focused.mp4"
  }
];

const ApproachSectionV3 = () => {
  const [selectedItem, setSelectedItem] = useState(2);
  const [previousItem, setPreviousItem] = useState(2);
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


  // Handle video loading and playback
  useEffect(() => {
    const currentItem = approachItems[selectedItem];
    const previousItemObj = approachItems[previousItem];

    // Load and play current video if it has one
    if (currentItem.video && currentVideoRef.current) {
      const video = currentVideoRef.current;
      let timeout: NodeJS.Timeout;
      
      const handleLoadedData = () => {
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

      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);
      
      return () => {
        clearTimeout(timeout);
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
      };
    }

    // Load and play previous video if it has one
    if (previousItemObj.video && previousVideoRef.current) {
      const video = previousVideoRef.current;
      let timeout: NodeJS.Timeout;
      
      const handlePrevLoadedData = () => {
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

      video.addEventListener('loadeddata', handlePrevLoadedData);
      video.addEventListener('error', handlePrevError);
      
      return () => {
        clearTimeout(timeout);
        video.removeEventListener('loadeddata', handlePrevLoadedData);
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
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 overflow-hidden">
                {/* Previous content (beneath) - image or video */}
                {approachItems[previousItem].video && !videoErrorMap[previousItem] && (
                  <video
                    key={`prev-video-${previousItem}`}
                    ref={previousVideoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  >
                    <source src={approachItems[previousItem].video} type="video/mp4" />
                  </video>
                )}
                {/* Only show image if video failed or doesn't exist */}
                {(!approachItems[previousItem].video || videoErrorMap[previousItem]) && (
                  <img
                    src={approachItems[previousItem].image}
                    alt={approachItems[previousItem].title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                
                {/* Current content (on top) - image or video */}
                {approachItems[selectedItem].video && !videoErrorMap[selectedItem] && (
                  <video
                    key={`video-${selectedItem}`}
                    ref={currentVideoRef}
                    className={`absolute inset-0 w-full h-full object-cover animate-in slide-in-from-right duration-700 ${
                      videoLoadedMap[selectedItem] ? 'opacity-100' : 'opacity-0'
                    }`}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                  >
                    <source src={approachItems[selectedItem].video} type="video/mp4" />
                  </video>
                )}
                {/* Only show image if no video or video failed */}
                {(!approachItems[selectedItem].video || videoErrorMap[selectedItem]) && (
                  <img
                    key={`img-${selectedItem}`}
                    src={approachItems[selectedItem].image}
                    alt={approachItems[selectedItem].title}
                    className="absolute inset-0 w-full h-full object-cover animate-in slide-in-from-right duration-700"
                  />
                )}
                
                {/* Very light dark overlay over the entire photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent z-10"></div>
                
                {/* Overlay bullet points */}
                <div className="absolute inset-0 z-20 flex items-end justify-start p-6 md:p-8">
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
                        <li key={`${selectedItem}-${idx}`} className="flex items-start animate-in fade-in slide-in-from-left-2 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                          <span className="text-[#F2611D] mr-2 font-bold">•</span>
                          {point}
                        </li>
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
                <h2 className="text-white text-[clamp(22px,3vw,48px)] font-normal mb-3 font-poppins leading-[var(--lh-head-sm)] md:leading-[var(--lh-head)] tracking-[-0.01em]">
                  VALUE PROPOSITION
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
              <div className="space-y-[clamp(16px,3vw,32px)]">
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

