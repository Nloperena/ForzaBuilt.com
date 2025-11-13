import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useGradientMode } from '@/contexts/GradientModeContext';
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
      "Our products deliver guaranteed performance"
    ],
    image: "/images/approach/Products Portfolio.jpg",
    video: "/approach-videos/Product Performance-2.mp4"
  },
  {
    title: "INDUSTRY FOCUSED",
    description: "Specialized expertise tailored to your industry's unique challenges. Our proven solutions have been developed and refined across transportation, marine, construction, manufacturing, and more.",
    bulletPoints: [
      "We don't believe in generic solutions.",
      "Our technical experts work within your specific industry to develop solutions that overcome its particular challenges.",
      "Each industry demands specific performance characteristics, and we engineer products to meet those requirements exactly"
    ],
    image: "/images/approach/Industry Focused.jpg",
    video: "/approach-videos/Industry Focused-2.mp4"
  },
  {
    title: "EXPANSIVE PRODUCT PORTFOLIO",
    description: "Over 140 different formulations across adhesives, sealants, and tapes. This extensive range ensures we have the perfect solution for virtually any application.",
    bulletPoints: [
      "With 140+ products, we have solutions for virtually every application.",
      "Our broad portfolio means we can find the exact chemistry and performance characteristics needed.",
      "Don't settle for close enough—find the perfect fit from our extensive selection"
    ],
    image: "/images/approach/Product Portfolio.jpg",
    video: "/approach-videos/Expansive Portfolio-2.mp4"
  },
  {
    title: "COMMON SENSE INNOVATION",
    description: "Practical, efficient solutions designed to solve real customer problems. We innovate based on decades of field experience, not just lab theory.",
    bulletPoints: [
      "We innovate where it matters—in products that solve real problems.",
      "Our R&D process is grounded in field reality and customer feedback.",
      "We focus on meaningful improvements that make a real difference in your applications"
    ],
    image: "/images/approach/Innovation.jpg",
    video: "/approach-videos/Common Sense Innovation-2.mp4"
  },
  {
    title: "MADE IN THE USA",
    description: "Quality American manufacturing at our modern facility. We control our entire supply chain to ensure consistent excellence in every batch.",
    bulletPoints: [
      "We manufacture at our own facility in the USA, maintaining full control and quality.",
      "This allows us to ensure consistent quality and fast response times.",
      "American-made means you can count on consistency and reliability"
    ],
    image: "/images/approach/USA Factory.jpg",
    video: "/approach-videos/Made in USA-2.mp4"
  },
  {
    title: "CONSULTATIVE R&D",
    description: "Our technical team works closely with your team to develop custom formulations and solutions tailored to your specific needs and challenges.",
    bulletPoints: [
      "When off-the-shelf solutions aren't enough, we develop custom formulations.",
      "Our R&D team works directly with your engineers to create solutions that fit your exact requirements.",
      "Custom doesn't mean slow or expensive—it means tailored to your success"
    ],
    image: "/images/approach/RnD.jpg",
    video: "/approach-videos/Consultative RnD-2.mp4"
  },
  {
    title: "SUSTAINABILITY THAT WORKS",
    description: "Environmental responsibility integrated into our products and processes. We develop sustainable solutions without compromising performance.",
    bulletPoints: [
      "Sustainability isn't a compromise on performance.",
      "We've developed eco-friendly formulations that deliver the same reliability our customers expect.",
      "Doing good for the environment and your bottom line go hand in hand"
    ],
    image: "/images/approach/Sustainability.jpg",
    video: "/approach-videos/Sustainability-2.mp4"
  },
  {
    title: "CUSTOMER OBSESSED",
    description: "Your success is our success. We're committed to providing exceptional service, technical support, and partnerships that drive real results.",
    bulletPoints: [
      "Every decision we make is focused on customer success.",
      "From technical support to custom development, we're here to help you succeed.",
      "Our customers' wins are our wins—that's the ForzaBuilt difference"
    ],
    image: "/images/approach/Customer Success.jpg",
    video: "/approach-videos/Customer Obsessed-2.mp4"
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
      setSelectedItem(index);
    }
  }, [selectedItem]);

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
          video.addEventListener('canplay', () => {
            setVideoLoadedMap((prev) => ({ ...prev, [index]: true }));
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

      {/* UNIFIED COLOR WRAPPER - Contains both heading and approach content - matches products section */}
      <div className="relative">
        {/* Background color grid matching products section */}
        <div className="pointer-events-none absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-[#f3f5f7]"></div>
          <div className="bg-gradient-to-r from-[#477197] to-[#2c476e]"></div>
        </div>
        <div className="relative z-10">
        
        {/* HEADING SECTION */}
        <div className="relative pt-[clamp(20px,4vw,40px)] pb-[clamp(20px,4vw,40px)]">
          <div className="w-full px-[clamp(14px,4vw,32px)]">
            <div className="flex flex-col items-center gap-2">
              <h2 
                className="font-normal font-poppins leading-tight text-[#2c476e]" 
                style={{
                  fontSize: 'clamp(28px, 3vw, 56px)',
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

          {/* Scrollable Content */}
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative">
              {/* LEFT - Titles */}
              <div 
                ref={titlesContainerRef}
                className="
                relative
                min-h-[32svh] md:min-h-[36svh] lg:min-h-[40vh]
                px-[clamp(14px,4vw,32px)] 
                py-[clamp(24px,4vw,40px)]
                flex items-center justify-center
                [--gap:clamp(12px,2.4vw,24px)] [--lh-head:1.18] [--lh-head-sm:1.28] [--lh-body:1.7]
              ">
                <div className="w-full flex flex-col items-start">
                  <div className="space-y-[clamp(6px,1.2vw,8px)] w-full">
                    {approachItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleItemChange(index)}
                        onMouseEnter={() => handleItemChange(index)}
                        className="block text-left"
                        style={{ transform: 'none', width: 'fit-content' }}
                      >
                        <h3 
                          ref={(el) => { titleRefs.current[index] = el; }}
                          className={`font-poppins leading-[var(--lh-head-sm)] md:leading-[var(--lh-head)] tracking-[-0.01em] whitespace-nowrap px-3 py-1.5 rounded block ${
                            selectedItem === index
                              ? 'text-white font-bold bg-white/20'
                              : 'text-white font-normal bg-white/10'
                          }`}
                          style={{
                            fontSize: 'clamp(14px, 1.5vw + 0.4rem, 36px)',
                            transform: 'none',
                            display: 'block'
                          }}
                        >
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
                min-h-[32svh] md:min-h-[36svh] lg:min-h-[40vh]
                py-[clamp(24px,4vw,40px)]
                flex items-center justify-center
                overflow-hidden lg:overflow-visible
              ">
                {/* Inline image (all breakpoints) - relative z-20 to appear above gradient */}
                <div className="absolute inset-0 overflow-hidden z-20">
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
                      onLoadedMetadata={() => handleVideoLoadedMetadata(selectedItem)}
                      onError={() => handleVideoError(selectedItem)}
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
                  
                  {/* Uniform dark overlay to darken image/video */}
                  <div className="absolute inset-0 bg-black/40 z-10"></div>
                  
                  {/* Overlay content - flexbox layout with items at bottom */}
                  <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-8">
                    {/* Top section - empty for spacing */}
                    <div></div>
                    
                    {/* Bottom section - bullet points and description */}
                    <div className="space-y-3">
                      {/* Orange bar and title */}
                      <div className="space-y-1">
                        <div className="w-24 h-1 bg-[#F2611D] opacity-70"></div>
                        <h4 className="text-white font-semibold font-poppins transition-all duration-500" style={{
                          fontSize: 'clamp(16px, 1.5vw + 0.5rem, 32px)',
                          lineHeight: '1.2'
                        }}>
                          {approachItems[selectedItem].title}
                        </h4>
                      </div>
                      
                      {/* Description */}
                      <p className="text-white/80 font-poppins leading-relaxed transition-all duration-500" style={{
                        fontSize: 'clamp(12px, 0.9vw + 0.3rem, 16px)',
                        lineHeight: '1.5'
                      }}>
                        {approachItems[selectedItem].description}
                      </p>
                      
                      {/* Bullet Points */}
                      <ul className="space-y-2">
                        {approachItems[selectedItem].bulletPoints.map((point, idx) => (
                          <li key={idx} className="flex gap-2 text-white/75 transition-all duration-500" style={{
                            fontSize: 'clamp(11px, 0.85vw + 0.2rem, 14px)',
                            lineHeight: '1.4'
                          }}>
                            <span className="text-[#F2611D] flex-shrink-0 mt-1">•</span>
                            <span>{point}</span>
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
      </div>
    </>
  );
};

export default ApproachSectionUnified;

