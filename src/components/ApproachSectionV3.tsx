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
    image: "/images/approach/Products Portfolio.jpg"
  },
  {
    title: "OPTIMIZATIONS",
    description: "Expert guidance to select and optimize the right products for your specific applications.",
    bulletPoints: [
      "Technical support and expertise",
      "Application-specific recommendations",
      "Performance optimization"
    ],
    image: "/images/approach/Construction Visit.jpg"
  },
  {
    title: "SUSTAINABILITY",
    description: "Innovation & Greener Chemistries leading the way to a sustainable future.",
    bulletPoints: [
      "Safer products & greener technologies.",
      "Made in the U.S.A. for sustainable supply chain.",
      "Always accelerating towards the future today."
    ],
    image: "/images/approach/Sustainability Image for Web.jpg"
  },
  {
    title: "R&D LAB",
    description: "Fully integrated manufacturing and R&D capabilities in the U.S.A.",
    bulletPoints: [
      "Full control over quality & consistency",
      "Rapid product development",
      "Custom formulation capabilities"
    ],
    image: "/images/approach/R&D image.jpg"
  },
  {
    title: "CLIENT FOCUS",
    description: "Dedicated support and attention to every customer's unique needs.",
    bulletPoints: [
      "Responsive customer service",
      "Technical support team",
      "Long-term partnership focus"
    ],
    image: "/images/approach/Receptionist at desk.jpg"
  },
  {
    title: "LEGACY",
    description: "Deep expertise across all major industries and applications.",
    bulletPoints: [
      "Decades of industry experience",
      "Application-specific knowledge",
      "Proven track record"
    ],
    image: "/images/approach/Legacy Image.jpg"
  }
];

const ApproachSectionV3 = () => {
  const [selectedItem, setSelectedItem] = useState(2);
  const [previousItem, setPreviousItem] = useState(2);
  const { mode } = useGradientMode();
  const [progress, setProgress] = useState(0);
  const cycleTimerRef = useRef<NodeJS.Timeout>();
  const progressIntervalRef = useRef<NodeJS.Timeout>();
  const isUserInteractingRef = useRef(false);

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
      {/* Top Banner - Outside the sticky container */}
      <ExperienceBetterBanner />

      {/* Isolated Section Container - Contains sticky background */}
      <section className="relative isolate">
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#F2611D] to-orange-400 transition-all duration-100 z-50" style={{ width: `${progress}%` }} />

        {/* Background Image Layer - non-sticky */}
        <div className="hidden lg:block relative pointer-events-none z-[3]">
          <div className="absolute inset-0 grid grid-cols-2">
            {/* Left half - Locked background images */}
            <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50">
              {/* Previous image */}
              <img
                src={approachItems[previousItem].image}
                alt={approachItems[previousItem].title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  objectPosition: 'center center',
                  transform: 'scale(1.15)'
                }}
              />
              {/* Current image */}
              <img
                key={selectedItem}
                src={approachItems[selectedItem].image}
                alt={approachItems[selectedItem].title}
                className="absolute inset-0 w-full h-full object-cover animate-in slide-in-from-right duration-700"
                style={{
                  objectPosition: 'center center',
                  transform: 'scale(1.15)'
                }}
              />
            </div>
            {/* Right half - background for text content */}
            <div className="relative bg-gradient-to-r from-[#2c476e] to-[#477197]"></div>
          </div>
        </div>

        {/* Scrollable Content - Acts as window over sticky background */}
        <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* LEFT - Transparent window on desktop, normal image on mobile */}
          <div className="
            relative
            min-h-[62svh] md:min-h-[68svh] lg:min-h-[100vh]
            flex items-center justify-center
            overflow-hidden lg:overflow-visible
          ">
            {/* Mobile only - inline image */}
            <div className="lg:hidden absolute inset-0">
              <img
                key={selectedItem}
                src={approachItems[selectedItem].image}
                alt={approachItems[selectedItem].title}
                className="w-full h-full object-cover animate-in slide-in-from-right duration-700"
                style={{
                  objectPosition: 'center center',
                  transform: 'scale(1.15)'
                }}
              />
            </div>
          </div>

          {/* RIGHT - Scrollable text content */}
          <div className="
            relative
            min-h-[62svh] md:min-h-[68svh] lg:min-h-[100vh]
            px-[clamp(14px,4vw,32px)] py-[clamp(32px,6vw,64px)]
            flex items-center justify-center
            [--gap:clamp(12px,2.4vw,24px)] [--lh-head:1.18] [--lh-head-sm:1.28] [--lh-body:1.7]
            bg-gradient-to-r from-[#2c476e] to-[#477197]
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
    </>
  );
};

export default ApproachSectionV3;

