import React, { useState, useEffect, useRef } from 'react';
import { useGradientMode } from '@/contexts/GradientModeContext';
import ExperienceBetterBanner from '@/components/ExperienceBetterBanner';

interface ApproachItem {
  title: string;
  description: string;
  bulletPoints: string[];
  image: string;
}

const approachItems: ApproachItem[] = [
  {
    title: "PORTFOLIO",
    description: "Comprehensive range of industrial adhesives, sealants, tapes, and cleaners - all under one roof.",
    bulletPoints: [
      "World's most comprehensive portfolio",
      "One-stop solution for all bonding needs",
      "Saves time, money & reduces risk"
    ],
    image: "/approach-images/Products Portfolio.jpg"
  },
  {
    title: "OPTIMIZATIONS",
    description: "Expert guidance to select and optimize the right products for your specific applications.",
    bulletPoints: [
      "Technical support and expertise",
      "Application-specific recommendations",
      "Performance optimization"
    ],
    image: "/approach-images/Construction Visit.jpg"
  },
  {
    title: "SUSTAINABILITY",
    description: "Innovation & Greener Chemistries leading the way to a sustainable future.",
    bulletPoints: [
      "Safer products & greener technologies.",
      "Made in the U.S.A. for sustainable supply chain.",
      "Always accelerating towards the future today."
    ],
    image: "/approach-images/Sustainability Image for Web.jpg"
  },
  {
    title: "R&D LAB",
    description: "Fully integrated manufacturing and R&D capabilities in the U.S.A.",
    bulletPoints: [
      "Full control over quality & consistency",
      "Rapid product development",
      "Custom formulation capabilities"
    ],
    image: "/approach-images/R&D image.jpg"
  },
  {
    title: "CLIENT FOCUS",
    description: "Dedicated support and attention to every customer's unique needs.",
    bulletPoints: [
      "Responsive customer service",
      "Technical support team",
      "Long-term partnership focus"
    ],
    image: "/approach-images/Receptionist at desk.jpg"
  },
  {
    title: "LEGACY",
    description: "Deep expertise across all major industries and applications.",
    bulletPoints: [
      "Decades of industry experience",
      "Application-specific knowledge",
      "Proven track record"
    ],
    image: "/approach-images/Legacy Image.jpg"
  }
];

const ApproachSectionV2 = () => {
  const [selectedItem, setSelectedItem] = useState(2); // Default to "GREENER CHEMISTRIES"
  const [previousItem, setPreviousItem] = useState(2);
  const { mode } = useGradientMode();
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const cycleTimerRef = useRef<NodeJS.Timeout>();
  const progressIntervalRef = useRef<NodeJS.Timeout>();
  const isUserInteractingRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionHeight = sectionRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress (0 to 1)
        const scrollProgress = (windowHeight - rect.top) / (windowHeight + sectionHeight);
        
        // Very subtle parallax range (-15px to 15px)
        const parallaxOffset = (scrollProgress - 0.5) * 30;
        
        setScrollY(parallaxOffset);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

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
          return prev + (100 / 40); // 100% over 4000ms (40 intervals of 100ms)
        });
      }
    }, 100);

    return () => {
      if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  const handleItemChange = (index: number) => {
    if (index !== selectedItem) {
      setPreviousItem(selectedItem);
      setSelectedItem(index);
      setProgress(0);
      isUserInteractingRef.current = true;
      // Reset auto-cycle after user interaction
      if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      cycleTimerRef.current = setTimeout(() => {
        isUserInteractingRef.current = false;
      }, 8000);
    }
  };

  return (
    <section ref={sectionRef} className="relative isolate overflow-visible">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-[#F2611D] to-orange-400 transition-all duration-100 z-50" style={{ width: `${progress}%` }} />
      
      {/* Top Banner */}
      <ExperienceBetterBanner />

      {/* Background halves */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-1 lg:grid-cols-2 -z-10" style={{ top: '100px' }}>
        <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50" />
        <div className="bg-gradient-to-r from-[#293350] to-[#4a5a7a]" />
      </div>

      <div className="relative overflow-visible z-0">
        {/* Two scalable squares */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden relative z-0">
          {/* LEFT SQUARE - Image */}
          <div className="
            relative
            min-h-[62svh] md:min-h-[68svh] lg:min-h-[74svh]
            flex items-center justify-center
            overflow-hidden
          ">
            {/* Previous approach image (stays in place) */}
            <img
              src={approachItems[previousItem].image}
              alt={approachItems[previousItem].title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                objectPosition: 'center center',
                transform: `translateY(${scrollY}px) translateZ(0) scale(1.15)`,
                willChange: 'transform'
              }}
            />

            {/* Current approach image (slides over) */}
            <img
              key={selectedItem}
              src={approachItems[selectedItem].image}
              alt={approachItems[selectedItem].title}
              className="
                absolute inset-0 w-full h-full object-cover
                animate-in slide-in-from-right duration-700
              "
              style={{
                objectPosition: 'center center',
                transform: `translateY(${scrollY}px) translateZ(0) scale(1.15)`,
                willChange: 'transform'
              }}
            />
          </div>

          {/* RIGHT SQUARE - Text */}
          <div className="
            relative
            min-h-[62svh] md:min-h-[68svh] lg:min-h-[74svh]
            px-[clamp(14px,4vw,32px)] py-[clamp(32px,6vw,64px)]
            flex items-center justify-center
            [--gap:clamp(12px,2.4vw,24px)] [--lh-head:1.18] [--lh-head-sm:1.28] [--lh-body:1.7]
          ">
            <div className="w-full">
              <div className="space-y-[var(--gap)] mb-[var(--gap)]">
                {approachItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleItemChange(index)}
                    className="w-full text-left transition-all duration-500"
                  >
                    <h3 className={`leading-[var(--lh-head-sm)] md:leading-[var(--lh-head)] tracking-[-0.01em] ${
                      selectedItem === index
                        ? 'text-[#F2611D] text-[clamp(28px,4vw,64px)] font-bold'
                        : 'text-white text-[clamp(22px,3.2vw,48px)] font-normal'
                    } hover:text-[#F2611D] transition-all duration-500 ease-out ${
                      mode === 'light2' ? 'font-poppins' : 'font-kallisto'
                    }`}>
                      {item.title}
                    </h3>
                  </button>
                ))}
              </div>

              <div className="border-t border-white/20 pt-6 mt-6">
                <h4 className={`text-white text-[clamp(18px,2.2vw,22px)] font-bold mb-4 transition-all duration-500 ${
                  mode === 'light2' ? 'font-poppins' : 'font-kallisto'
                }`}>
                  {approachItems[selectedItem].title === 'GREENER CHEMISTRIES' 
                    ? 'Innovation & Greener Chemistries'
                    : approachItems[selectedItem].title}
                </h4>
                <ul className={`space-y-0 text-white text-[clamp(16px,1.8vw,20px)] ${
                  mode === 'light2' ? 'font-poppins' : ''
                }`} style={{ lineHeight: '1.8' }}>
                  {approachItems[selectedItem].bulletPoints.map((point, idx) => (
                    <li key={`${selectedItem}-${idx}`} className="flex items-start animate-in fade-in slide-in-from-left-2 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                      <span className="text-[#F2611D] mr-2">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSectionV2;

