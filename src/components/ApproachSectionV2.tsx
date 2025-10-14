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
    title: "PRODUCT PORTFOLIO",
    description: "Comprehensive range of industrial adhesives, sealants, tapes, and cleaners - all under one roof.",
    bulletPoints: [
      "World's most comprehensive portfolio",
      "One-stop solution for all bonding needs",
      "Saves time, money & reduces risk"
    ],
    image: "/approach-greener-chem.png"
  },
  {
    title: "PRODUCT OPTIMIZATION",
    description: "Expert guidance to select and optimize the right products for your specific applications.",
    bulletPoints: [
      "Technical support and expertise",
      "Application-specific recommendations",
      "Performance optimization"
    ],
    image: "/approach-greener-chem.png"
  },
  {
    title: "GREENER CHEMISTRIES",
    description: "Innovation & Greener Chemistries leading the way to a sustainable future.",
    bulletPoints: [
      "Safer products & greener technologies.",
      "Made in the U.S.A. for sustainable supply chain.",
      "Always accelerating towards the future today."
    ],
    image: "/approach-greener-chem.png"
  },
  {
    title: "R&D MANUFACTURING",
    description: "Fully integrated manufacturing and R&D capabilities in the U.S.A.",
    bulletPoints: [
      "Full control over quality & consistency",
      "Rapid product development",
      "Custom formulation capabilities"
    ],
    image: "/approach-greener-chem.png"
  },
  {
    title: "CUSTOMER ATTENTION",
    description: "Dedicated support and attention to every customer's unique needs.",
    bulletPoints: [
      "Responsive customer service",
      "Technical support team",
      "Long-term partnership focus"
    ],
    image: "/approach-greener-chem.png"
  },
  {
    title: "INDUSTRY KNOWLEDGE",
    description: "Deep expertise across all major industries and applications.",
    bulletPoints: [
      "Decades of industry experience",
      "Application-specific knowledge",
      "Proven track record"
    ],
    image: "/approach-greener-chem.png"
  }
];

const ApproachSectionV2 = () => {
  const [selectedItem, setSelectedItem] = useState(2); // Default to "GREENER CHEMISTRIES"
  const { mode } = useGradientMode();
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = -rect.top;
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate overflow-visible">
      {/* Top Banner */}
      <ExperienceBetterBanner />

      {/* Background halves */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-1 lg:grid-cols-2 -z-10" style={{ top: '100px' }}>
        <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50" />
        <div className="bg-[#293350]" />
      </div>

      <div className="relative mx-auto px-6 sm:px-8 lg:px-10 2xl:px-14 py-8 md:py-12 overflow-visible z-0">
        {/* Two scalable squares */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-visible relative z-0">
          {/* LEFT SQUARE - Image */}
          <div className="
            relative
            min-h-[62svh] md:min-h-[68svh] lg:min-h-[74svh]
            p-[clamp(14px,4vw,32px)]
            flex items-center justify-center
            overflow-visible
          " style={{ overflow: 'visible' }}>
            {/* Product image */}
            <img
              src={approachItems[selectedItem].image}
              alt={approachItems[selectedItem].title}
              className="
                block w-full h-full object-cover
                drop-shadow-2xl
                opacity-100 translate-y-0 transition-all duration-700 will-change-transform
              "
              style={{
                transform: `translateY(${scrollY * 0.3}px)`,
                transition: 'transform 0.1s ease-out'
              }}
            />
          </div>

          {/* RIGHT SQUARE - Text */}
          <div className="
            relative
            min-h-[62svh] md:min-h-[68svh] lg:min-h-[74svh]
            p-[clamp(14px,4vw,32px)]
            flex items-center justify-center
            [--gap:clamp(12px,2.4vw,24px)] [--lh-head:1.18] [--lh-head-sm:1.28] [--lh-body:1.7]
          ">
            <div className="w-full">
              <div className="space-y-[var(--gap)] mb-[var(--gap)]">
                {approachItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedItem(index)}
                    className="w-full text-left transition-all duration-300"
                  >
                    <h3 className={`font-normal leading-[var(--lh-head-sm)] md:leading-[var(--lh-head)] tracking-[-0.01em] ${
                      selectedItem === index
                        ? 'text-[#F2611D] text-[clamp(28px,4vw,64px)]'
                        : 'text-white text-[clamp(22px,3.2vw,48px)]'
                    } hover:text-[#F2611D] transition-colors duration-300 ${
                      mode === 'light2' ? 'font-poppins' : 'font-kallisto'
                    }`}>
                      {item.title}
                    </h3>
                  </button>
                ))}
              </div>

              <div className="border-t border-white/20 pt-6 mt-6">
                <h4 className={`text-white text-[clamp(18px,2.2vw,22px)] font-bold mb-4 ${
                  mode === 'light2' ? 'font-poppins' : 'font-kallisto'
                }`}>
                  {approachItems[selectedItem].title === 'GREENER CHEMISTRIES' 
                    ? 'Innovation & Greener Chemistries'
                    : approachItems[selectedItem].title}
                </h4>
                <ul className={`space-y-2 text-white text-[clamp(16px,1.8vw,20px)] ${
                  mode === 'light2' ? 'font-poppins' : ''
                }`} style={{ lineHeight: '3.4' }}>
                  {approachItems[selectedItem].bulletPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start transition-all duration-300 hover:scale-105 cursor-pointer">
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

