import React, { useState, useEffect, useRef } from 'react';
import { useGradientMode } from '@/contexts/GradientModeContext';

const ApproachSection = () => {
  const { mode } = useGradientMode();
  const [selectedItem, setSelectedItem] = useState(2); // Default to "GREENER CHEMISTRIES"
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

  const approachItems = [
    "PRODUCT PORTFOLIO",
    "PRODUCT OPTIMIZATION", 
    "GREENER CHEMISTRIES",
    "R&D MANUFACTURING",
    "CUSTOMER ATTENTION",
    "INDUSTRY KNOWLEDGE"
  ];

  return (
    <section ref={sectionRef} className="relative isolate overflow-visible">
      {/* Top Banner */}
      <div className="bg-white py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
            {/* Left side - Main slogan */}
            <div className="space-y-1">
              <h2 className={`text-[clamp(28px,4vw,48px)] font-bold text-[#115B87] leading-tight ${
                mode === 'light2' ? 'font-poppins' : 'font-kallisto'
              }`}>
                Experience Better.
              </h2>
              <h2 className={`text-[clamp(28px,4vw,48px)] font-bold text-[#F2611D] leading-tight ${
                mode === 'light2' ? 'font-poppins' : 'font-kallisto'
              }`}>
                Today.
              </h2>
            </div>
            
            {/* Right side - Mission statement */}
            <div className="md:max-w-md">
              <p className={`text-[clamp(18px,2vw,22px)] text-gray-600 leading-relaxed ${
                mode === 'light2' ? 'font-poppins' : ''
              }`}>
                Creating New Standards & Raising Expectations for Performance, Solutions & Customer Experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Flipped Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
        {/* LEFT SECTION - Products Image (Now on left) */}
        <div className="relative bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 flex items-center justify-center p-0 overflow-hidden min-h-[400px]">
          {/* Main image - covers full square */}
          <img
            src="/approach-greener-chem.png"
            alt="Forza Industrial Products - Greener Chemistries"
            className="w-full h-full object-cover"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          />
        </div>

        {/* RIGHT SECTION - Values List (Now on right) */}
        <div className="bg-[#2c476e] flex items-center p-8 md:p-12">
          <div className="w-full max-w-md">
            {/* Main values list */}
            <div className="space-y-2 mb-8">
              {approachItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedItem(index)}
                  className={`text-[clamp(24px,3vw,32px)] font-normal uppercase tracking-wide font-poppins transition-all duration-300 text-left hover:scale-105 ${
                    selectedItem === index 
                      ? 'text-[#F2611D]' 
                      : 'text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Innovation section */}
            <div className="border-t border-white/20 pt-6">
              <h4 className={`text-white text-[clamp(18px,2.2vw,22px)] font-bold mb-4 ${
                mode === 'light2' ? 'font-poppins' : 'font-kallisto'
              }`}>
                Innovation & Greener Chemistries
              </h4>
              <ul className={`space-y-2 text-white text-[clamp(16px,2vw,22px)] leading-relaxed ${
                mode === 'light2' ? 'font-poppins' : ''
              }`}>
                <li className="flex items-start transition-all duration-300 hover:scale-105 cursor-pointer">
                  <span className="text-[#F2611D] mr-2">•</span>
                  Safer products & greener technologies.
                </li>
                <li className="flex items-start transition-all duration-300 hover:scale-105 cursor-pointer">
                  <span className="text-[#F2611D] mr-2">•</span>
                  Made in the U.S.A. for sustainable supply chain.
                </li>
                <li className="flex items-start transition-all duration-300 hover:scale-105 cursor-pointer">
                  <span className="text-[#F2611D] mr-2">•</span>
                  Always accelerating towards the future today.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
