import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGradientMode } from '@/contexts/GradientModeContext';
import ExperienceBetterBanner from '@/components/ExperienceBetterBanner';
import MSHeroBanner from '@/components/MSHeroBanner';
import HeroVideoSectionV2 from './HeroVideoSectionV2';

interface ApproachItem {
  title: string;
  description: string;
  bulletPoints: string[];
  image: string;
  video?: string;
}

const approachItems: ApproachItem[] = [
  {
    title: "REAL WORLD KNOW HOW",
    description: "Expert guidance to select and optimize the right products for your specific applications. Our technical team provides recommendations and support every step of the way.",
    bulletPoints: [
      "We've seen it all. With over 30 years in the field, we don't guess—we get it right.",
      "We understand how adhesives & Sealants behave in real-world conditions, not just in lab tests.",
      "We know a thing or two, because we've seen a thing or two.",
      "If you have a unique situation, we've most likely seen it and have already come up with a specific solution for it."
    ],
    image: "/images/approach/Construction Visit.jpg",
    video: "/approach-videos/Real Know How-2.mp4"
  },
  {
    title: "PURPOSE BUILT PRODUCTS",
    description: "Superior quality products engineered for maximum performance and reliability. Every product undergoes rigorous testing to ensure it meets and exceeds industry standards.",
    bulletPoints: [
      "Our solutions are never one-size-fits-all.",
      "We engineer adhesives and sealants for the exact needs our customers face—so they perform exactly as needed, the first time.",
      "Our products deliver guaranteed performance."
    ],
    image: "/images/approach/Products Portfolio.jpg",
    video: "/approach-videos/Product Performance-2.mp4"
  },
  {
    title: "INDUSTRY FOCUSED",
    description: "Deep expertise across all major industries and applications built on decades of experience. Our proven track record demonstrates our ability to solve complex challenges.",
    bulletPoints: [
      "Always Insightful. Never limited in expertise or offerings.",
      "We don't try to serve everyone. We serve the industries we know best—like transportation, construction, marine, and manufacturing.",
      "That's why our formulas, testing, and compliance know-how are second to none.",
      "If it's important to you, it's important to us."
    ],
    image: "/images/approach/Legacy Image.jpg",
    video: "/approach-videos/Industry Focused-2.mp4"
  },
  {
    title: "EXPANSIVE PRODUCT PORTFOLIO",
    description: "Comprehensive range of industrial adhesives, sealants, tapes, and cleaners - all under one roof. This one-stop solution saves time, money, and reduces supply chain risk.",
    bulletPoints: [
      "Most complete and comprehensive portfolio available.",
      "Our product line covers everything from core adhesives and sealants to niche products and specialty tapes.",
      "We don't just cover one or two of your needs, we do them all!",
      "If it bonds, seals, or sticks—we probably make it. If we don't, we'll help you find it."
    ],
    image: "/images/approach/Products Portfolio.jpg",
    video: "/approach-videos/Complete Portfolio-2.mp4"
  },
  {
    title: "COMMON SENSE INNOVATION",
    description: "Safer products and greener technologies designed for today's sustainability challenges. Our commitment to innovation drives us to continuously develop better solutions for the future.",
    bulletPoints: [
      "We Innovate with a purpose, blending cutting-edge science with in-field common sense.",
      "Our R&D teams are always improving what works—and tossing out what doesn't.",
      "We blend great science with great practicality. To create products that aren't just great in theory but that are actually great in use.",
      "Less waste, better chemistries, faster applications, and safer ingredients. Always for the customer."
    ],
    image: "/images/approach/Sustainability Image for Web.jpg",
    video: "/approach-videos/Real Innovation.mp4"
  },
  {
    title: "MADE IN THE USA",
    description: "Proudly manufactured in America with domestic and international components ensuring quality. Supporting the U.S. economy through reliable domestic supply chain management.",
    bulletPoints: [
      "Real people, making real products, making a real difference!",
      "We don't just resell & re-label someone else's products, we actually make them.",
      "We proudly manufacture our products in the USA, in America's heartland.",
      "From R&D to manufacturing, our vertical integration gives us full control over quality, consistency, and availability."
    ],
    image: "/images/approach/R&D image.jpg",
    video: "/approach-videos/Made in USA-2_1.mp4"
  },
  {
    title: "CONSULTATIVE R&D",
    description: "Fully integrated manufacturing and R&D capabilities in the U.S.A. give us complete control over quality and consistency. This integrated approach enables rapid product development and custom formulation capabilities.",
    bulletPoints: [
      "Guaranteed performance with our in-house lab",
      "No wasted time. No off-the-shelf guesswork. Just the right product, right away – proven and validated.",
      "When a product doesn't exist to meet your need, our in-house chemists & testing teams can create & validate custom formulas tailored to your application—fast."
    ],
    image: "/images/approach/R&D image.jpg",
    video: "/approach-videos/R&D Leadership.mp4"
  },
  {
    title: "SUSTAINABILITY THAT WORKS",
    description: "Practical sustainability solutions that deliver real environmental benefits without compromising performance. Our approach balances ecological responsibility with operational excellence.",
    bulletPoints: [
      "We build stronger, safer products without sacrificing performance.",
      "We're pushing for a cleaner, more sustainable future—but never at the cost of quality."
    ],
    image: "/images/approach/Sustainability Image for Web.jpg",
    video: "/approach-videos/Sustainable Solutions.mp4"
  },
  {
    title: "CUSTOMER OBSESSED",
    description: "Dedicated support and attention to every customer's unique needs throughout their partnership with us. Our responsive team provides technical expertise and long-term commitment to your success.",
    bulletPoints: [
      "We answer the phone. We know your name. We help you get the job done.",
      "Our owners and tech teams are hands-on and accessible—no call centers, no runaround, no delays.",
      "Real people. Real care. Real expertise.",
      "We provide the quality & performance of a Fortune 500 company with the service, know-how, & personalized care of a family-owned, corner grocery store."
    ],
    image: "/images/approach/Receptionist at desk.jpg",
    video: "/approach-videos/Customer Obsessed-1.mp4"
  }
];

// Function to convert ALL CAPS titles to proper Title Case
const toTitleCase = (str: string): string => {
  // Handle special cases first
  if (str === 'GREENER CHEMISTRIES') {
    return 'Innovation & Greener Chemistries';
  }
  
  // Split by spaces and hyphens, preserving the separators
  const parts = str.split(/([\s-])/);
  
  return parts
    .map((part, index) => {
      // If it's a separator (space or hyphen), keep it as is
      if (part === ' ' || part === '-') {
        return part;
      }
      
      // Convert to lowercase first
      const lower = part.toLowerCase();
      
      // Preserve R&D
      if (lower === 'r&d') return 'R&D';
      // Preserve USA
      if (lower === 'usa') return 'USA';
      
      // Capitalize first letter of each word
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
};

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
   
      <div className="relative z-20">
          <HeroVideoSectionV2 />
        </div>

      {/* Isolated Section Container */}
      <section ref={sectionRef} className="relative isolate">
        

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#F2611D] to-orange-400 transition-all duration-100 z-50" style={{ width: `${progress}%` }} />

        {/* Scrollable Content */}
        <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative">
          {/* Main Title - overlays both columns */}
          <div className="absolute top-[clamp(24px,4vw,48px)] left-0 right-0 w-full text-center px-[clamp(14px,4vw,32px)] z-30 pointer-events-none">
            <h2 className="text-white text-[clamp(32px,5vw,72px)] font-normal font-poppins leading-tight">
              Powerful Approach To Customer Success
            </h2>
          </div>
          
          {/* LEFT - Titles and blue background */}
          <div className="
            relative
            min-h-[50svh] md:min-h-[55svh] lg:min-h-[75vh]
            px-[clamp(14px,4vw,32px)] pt-[clamp(120px,15vw,180px)] pb-[clamp(24px,5vw,48px)]
            flex items-center justify-center
            [--gap:clamp(12px,2.4vw,24px)] [--lh-head:1.18] [--lh-head-sm:1.28] [--lh-body:1.7]
            bg-gradient-to-r from-[#2c476e] to-[#477197]
          ">
            <div className="w-full">
              <div className="space-y-[clamp(8px,1.5vw,16px)]">
                {approachItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleItemChange(index)}
                    onMouseEnter={() => handleItemChange(index)}
                    className="w-full text-left transition-all duration-500"
                  >
                    <h3 className={`font-poppins leading-[var(--lh-head-sm)] md:leading-[var(--lh-head)] tracking-[-0.01em] ${
                      selectedItem === index
                        ? 'text-[#F2611D] text-[clamp(28px,4vw,64px)] font-bold'
                        : 'text-white text-[clamp(24px,3.5vw,48px)] font-normal'
                    } hover:text-[#F2611D] transition-all duration-500 ease-out`}>
                      {item.title}
                    </h3>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT - Videos with description */}
          <div className="
            relative
            min-h-[50svh] md:min-h-[55svh] lg:min-h-[75vh]
            pt-[clamp(120px,15vw,180px)]
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
                    initial={{ opacity: 0, x: -32 }}
                    animate={{ 
                      opacity: videoLoadedMap[selectedItem] ? 1 : 0,
                      x: videoLoadedMap[selectedItem] ? 0 : -32
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
                    initial={{ opacity: 0, x: -32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                
                                  {/* Uniform greyish dark blue overlay */}
                  <div className="absolute inset-0 bg-[#3a4a6b]/75 z-10"></div>
                
                {/* Overlay content - flexbox layout with items at bottom */}
                <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-8">
                  {/* Top section - empty for spacing */}
                  <div></div>
                  
                  {/* Bottom section - bullet points and description */}
                  <div className="space-y-3">
                    {/* Orange bar and title */}
                    <div className="space-y-1">
                      <div className="w-24 h-1 bg-[#F2611D] opacity-70"></div>
                      <h4 className="text-white text-[clamp(24px,3vw,32px)] font-semibold font-poppins transition-all duration-500">
                        {toTitleCase(approachItems[selectedItem].title)}
                      </h4>
                    </div>
                    
                    {/* Paragraph text */}
                    <p className={`text-white text-[clamp(14px,1.6vw,18px)] leading-relaxed max-w-2xl ${
                      mode === 'light2' ? 'font-poppins' : ''
                    }`}>
                      {approachItems[selectedItem].description}
                    </p>
                    
                    {/* Bullet points */}
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

        </div>
        </div>
      </section>
    </>
  );
};

export default ApproachSectionV3;

