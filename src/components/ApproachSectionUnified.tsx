import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useGradientMode } from '@/contexts/GradientModeContext';
import HeroVideoSectionV2 from './HeroVideoSectionV2';
import { getFontSize, getFontSizeValue } from '@/styles/typography';
import VideoSkeleton from './common/VideoSkeleton';

interface ApproachItem {
  title: string;
  description: string;
  bulletPoints: string[];
  image: string;
  video?: string;
}

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
      "Our products deliver guaranteed performance"
    ],
    image: "/images/approach/Products Portfolio.jpg",
    video: "/videos/backgrounds/Purpose Built Products.mp4"
  },
  {
    title: "INDUSTRY FOCUSED",
    description: "Deep expertise across all major industries and applications built on decades of experience. Our proven track record demonstrates our ability to solve complex challenges.",
    bulletPoints: [
      "Always Insightful. Never limited in expertise or offerings",
      "We don't try to serve everyone. We serve the industries we know best—like transportation, construction, marine, and manufacturing.",
      "That's why our formulas, testing, and compliance know-how are second to none.",
      "If it's important to you, it's important to us."
    ],
    image: "/images/approach/Legacy Image.jpg",
    video: "/videos/backgrounds/Industry Summary Page Video.mp4"
  },
  {
    title: "EXPANSIVE PRODUCT PORTFOLIO",
    description: "Comprehensive range of industrial adhesives, sealants, tapes, and cleaners - all under one roof. This one-stop solution saves time, money, and reduces supply chain risk.",
    bulletPoints: [
      "Most complete and comprehensive portfolio available",
      "Our product line covers everything from core adhesives and sealants to niche products and specialty tapes.",
      "We don't just cover one or two of your needs, we do them all!",
      "If it bonds, seals, or sticks—we probably make it. If we don't, we'll help you find it."
    ],
    image: "/images/approach/Products Portfolio.jpg",
    video: "/videos/backgrounds/Product Summary Page Video.mp4"
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
    video: "/videos/backgrounds/Sustainability That Works.mp4"
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

const ApproachSectionUnified = () => {
  const { mode } = useGradientMode();
  const [selectedItem, setSelectedItem] = useState(1);
  const [previousItem, setPreviousItem] = useState(0);
  const [progress, setProgress] = useState(11.11);
  const sectionRef = useRef<HTMLElement>(null);
  const titlesContainerRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const previousVideoRef = useRef<HTMLVideoElement>(null);
  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const [videoLoadedMap, setVideoLoadedMap] = useState<{ [key: number]: boolean }>({});
  const [videoErrorMap, setVideoErrorMap] = useState<{ [key: number]: boolean }>({});

  const handleItemChange = useCallback((index: number) => {
    if (index !== selectedItem) {
      setPreviousItem(selectedItem);
      // Reset loading state for the new item to show skeleton
      if (approachItems[index].video && !videoLoadedMap[index]) {
        setVideoLoadedMap((prev) => ({ ...prev, [index]: false }));
      }
      setSelectedItem(index);
    }
  }, [selectedItem, videoLoadedMap]);

  useEffect(() => {
    const updateTitleFontSizes = () => {
      titleRefs.current.forEach((el) => {
        if (el) {
          const computedStyle = window.getComputedStyle(el);
          const fontSize = computedStyle.fontSize;
        }
      });
    };

    updateTitleFontSizes();
    const timeoutId = setTimeout(updateTitleFontSizes, 0);
    return () => clearTimeout(timeoutId);
  }, [selectedItem]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      setProgress(scrollProgress * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const preloadVideos = () => {
      const indicesToPreload = [previousItem, selectedItem];
      indicesToPreload.forEach((index) => {
        if (approachItems[index].video && !videoLoadedMap[index]) {
          const video = document.createElement('video');
          video.src = approachItems[index].video!;
          video.preload = 'auto';
          video.addEventListener('canplay', () => {
            setVideoLoadedMap((prev) => ({ ...prev, [index]: true }));
          });
          video.addEventListener('error', () => {
            setVideoErrorMap((prev) => ({ ...prev, [index]: true }));
          });
        }
      });
    };

    preloadVideos();
  }, [selectedItem, previousItem, videoLoadedMap]);

  const handleVideoLoadedMetadata = (itemIndex: number) => {
    setVideoLoadedMap((prev) => ({ ...prev, [itemIndex]: true }));
    if (itemIndex === selectedItem && currentVideoRef.current) {
      currentVideoRef.current.play().catch(() => {});
    }
  };

  const handleVideoError = (itemIndex: number) => {
    setVideoErrorMap((prev) => ({ ...prev, [itemIndex]: true }));
  };

  return (
    <>
      <div className="relative z-20">
        <HeroVideoSectionV2 />
      </div>

      {/* UNIFIED WRAPPER - Base gradient background with everything layered on top */}
      <div className="relative bg-gradient-to-br from-[#477197] to-[#2c476e] lg:bg-gradient-to-br lg:from-[#477197] lg:via-50% lg:to-[#2c476e]">
        
        {/* HEADING SECTION - transparent, on top of gradient */}
        <div className="relative pt-[clamp(20px,4vw,40px)] pb-[clamp(20px,4vw,40px)]">
          <div className="w-full px-[clamp(14px,4vw,32px)]">
            <div className="flex flex-col items-center gap-2">
              <h2 
                className="font-normal font-poppins leading-tight text-[white]" 
                style={{
                  fontSize: getFontSizeValue('industryPageHeading'),
                  lineHeight: '1.1',
                  textAlign: 'center'
                }}
              >
                Powerful Approach To Customer Success
              </h2>
            </div>
          </div>
        </div>

        {/* APPROACH CONTENT SECTION */}
        <section ref={sectionRef} className="relative isolate">
          {/* Progress bar */}
          <div className="absolute bottom-0 t-0 h-0.5 bg-gradient-to-r from-[#F2611D] to-orange-400 transition-all duration-100 z-50" style={{ width: `${progress}%` }} />

          {/* Scrollable Content - transparent background */}
          <div className="relative">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 relative">
              {/* LEFT - Titles - transparent background */}
              <div 
                ref={titlesContainerRef}
                className="
                relative
                min-h-[auto] md:min-h-[36svh] lg:min-h-[55vh] xl:min-h-[65vh]
                px-[clamp(14px,4vw,32px)] 
                py-[clamp(12px,2vw,20px)]
                flex items-start lg:items-center justify-start lg:justify-center
                [--gap:clamp(12px,2.4vw,24px)] [--lh-head:1.18] [--lh-head-sm:1.28] [--lh-body:1.7]
              ">
                <div className="w-full flex flex-col items-start h-full">
                  <div className="space-y-[clamp(12px,2vw,20px)] w-full flex flex-col">
                    {approachItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleItemChange(index)}
                        onMouseEnter={() => handleItemChange(index)}
                        className="w-full text-left transition-all duration-500 cursor-pointer"
                        style={{ transform: 'none' }}
                      >
                        <h3 
                          ref={(el) => { titleRefs.current[index] = el; }}
                          className={`font-poppins leading-[var(--lh-head-sm)] md:leading-[var(--lh-head)] tracking-[-0.01em] lg:whitespace-nowrap block transition-all duration-500 ease-out ${
                            selectedItem === index
                              ? 'text-[#F2611D] font-bold'
                              : 'text-white font-normal'
                          }`}
                          style={{
                            fontSize: selectedItem === index
                              ? 'clamp(18px, 2vw + 0.5rem, 56px)'
                              : 'clamp(14px, 1.5vw + 0.4rem, 48px)',
                            transform: 'none',
                            display: 'block'
                          }}
                        >
                          {toTitleCase(item.title)}
                        </h3>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT - Videos with description */}
              <div className="
                relative
                aspect-square md:aspect-auto md:min-h-[36svh] lg:min-h-[55vh] xl:min-h-[65vh]
                py-[clamp(12px,2vw,20px)]
                flex items-center justify-center
                overflow-hidden lg:overflow-visible
              ">
                {/* Inline image (all breakpoints) - relative z-20 to appear above gradient */}
                <div className="absolute inset-0 overflow-hidden z-20">
                  {/* Show skeleton when switching videos and new video hasn't loaded yet */}
                  {approachItems[selectedItem].video && !videoErrorMap[selectedItem] && !videoLoadedMap[selectedItem] && (
                    <VideoSkeleton className="absolute inset-0 z-30" backgroundColor="blue" />
                  )}
                  
                  {/* Previous content (beneath) - image or video - hidden when switching */}
                  {selectedItem === previousItem && approachItems[previousItem].video && !videoErrorMap[previousItem] && (
                    <video
                      ref={previousVideoRef}
                      key="previous-video"
                      className="absolute inset-0 w-full h-full object-cover opacity-100"
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="auto"
                    >
                      <source src={approachItems[previousItem].video} type="video/mp4" />
                    </video>
                  )}
                  {/* Only show image if video failed or doesn't exist, and we're still on previous item */}
                  {selectedItem === previousItem && (!approachItems[previousItem].video || videoErrorMap[previousItem]) && (
                    <img
                      src={approachItems[previousItem].image}
                      alt={approachItems[previousItem].title}
                      className="absolute inset-0 w-full h-full object-cover opacity-100"
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
                      preload="auto"
                      onCanPlay={() => handleVideoLoadedMetadata(selectedItem)}
                      onError={() => handleVideoError(selectedItem)}
                    >
                      <source src={approachItems[selectedItem].video} type="video/mp4" />
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
                  
                  {/* Uniform dark blue overlay to darken image/video */}
                  <div className="absolute inset-0 z-10" style={{ backgroundColor: 'rgba(44, 71, 110, 0.6)' }}></div>
                  
                  {/* Overlay content - flexbox layout: top-aligned on mobile, bottom-aligned on desktop */}
                  <div className="absolute inset-0 z-20 flex flex-col justify-start md:justify-between p-6 md:p-8">
                    {/* Top section - empty for spacing on desktop */}
                    <div className="hidden md:block"></div>
                    
                    {/* Content section - bullet points and description */}
                    <div className="space-y-3">
                      {/* Orange bar and title */}
                      <div className="space-y-1">
                        <div className="w-24 h-1 bg-[#F2611D] opacity-70"></div>
                        <h4 className="text-white font-semibold font-poppins transition-all duration-500" style={{
                          fontSize: 'clamp(16px, 1.5vw + 0.5rem, 32px)',
                          lineHeight: '1.2'
                        }}>
                          {toTitleCase(approachItems[selectedItem].title)}
                        </h4>
                      </div>
                      
                      {/* Description */}
                      <p className="text-white font-bold font-poppins leading-relaxed transition-all duration-500" style={{
                        fontSize: 'clamp(12px, 0.9vw + 0.3rem, 16px)',
                        lineHeight: '1.5'
                      }}>
                        {approachItems[selectedItem].description}
                      </p>
                      
                      {/* Bullet Points */}
                      <ul className="space-y-2">
                        {approachItems[selectedItem].bulletPoints.map((point, idx) => (
                          <li key={idx} className="flex gap-2 text-white transition-all duration-500" style={{
                            fontSize: 'clamp(11px, 0.85vw + 0.2rem, 14px)',
                            lineHeight: '1.4'
                          }}>
                            <span className="text-[#F2611D] flex-shrink-0 mt-1 font-bold">•</span>
                            <span className="font-bold">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ApproachSectionUnified;

