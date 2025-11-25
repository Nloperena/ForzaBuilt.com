import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageOverlay from './ImageOverlay';

export interface XRayOption {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  previewImage: string;
  svgSrc: string;
  bgImage?: string; // Optional background image to layer under SVG
}

interface IndustryXRaySelectorProps {
  industry: string;
  options: XRayOption[];
}

const optionVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.08 },
};

const IndustryXRaySelector: React.FC<IndustryXRaySelectorProps> = ({ industry, options }) => {
  // Default to the first option
  const [selectedVariant, setSelectedVariant] = useState<string | null>(options.length > 0 ? options[0].id : null);
  const [viewportHeight, setViewportHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);

  // Track viewport height and width
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scale factor for short displays
  const scale = useMemo(() => {
    if (viewportHeight < 500) return 0.6;
    if (viewportHeight < 600) return 0.7;
    if (viewportHeight < 800) return 0.85;
    return 1;
  }, [viewportHeight]);

  // Sidebar column width based on viewport height and width
  const sidebarWidth = useMemo(() => {
    if (viewportHeight < 600) return '180px';
    if (viewportHeight < 800) return '220px';
    // Reduce sidebar width on narrower screens to give more room to X-Ray
    if (viewportWidth < 1440) return '260px';
    return '320px';
  }, [viewportHeight, viewportWidth]);

  // X-Ray container min-height based on viewport height - use 85% of viewport height
  const xrayMinHeight = useMemo(() => {
    return `${viewportHeight * 0.85}px`;
  }, [viewportHeight]);

  return (
    <section className="relative bg-white z-[30] pb-2 sm:pb-4">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6">
        {/* Section Header moved here, above the X-Ray selection/display */}
        <div className="text-center mb-3 sm:mb-8 pt-[5rem] mt-[-3rem]">
          <h2 
            className="font-poppins font-normal text-[#1B3764] mb-2 sm:mb-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Product Applications
          </h2>
          <p 
            className="text-[#1B3764]/70 font-poppins"
            style={{ fontSize: 'clamp(0.875rem, 1.2vw + 0.25rem, 1.25rem)' }}
          >
            Cursor over or click to explore product application details
          </p>
        </div>

        {!selectedVariant ? (
          <div className="relative py-8 sm:py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
              {options.map(option => (
                <motion.button
                  key={option.id}
                  type="button"
                  variants={optionVariants}
                  initial="rest"
                  whileHover="hover"
                  className="relative isolate bg-transparent border-none p-0 focus:outline-none"
                  onClick={() => setSelectedVariant(option.id)}
                >
                  <div className="inline-flex flex-col items-center gap-4">
                    <img
                      src={option.previewImage}
                      alt={option.title}
                      className="w-[240px] sm:w-[280px] lg:w-[340px] object-contain"
                    />
                    <p className="text-base font-semibold text-[#1B3764]">{option.title}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <div 
            className="flex flex-col lg:grid lg:items-center lg:gap-8 xl:gap-12"
            style={{
              gridTemplateColumns: `${sidebarWidth} 1fr ${sidebarWidth}`
            }}
          >
            {/* Left selector column */}
            <div 
              className="hidden lg:flex flex-col z-10" 
              style={{ 
                gap: `${Math.max(12, 20 * scale)}px`,
                width: '100%'
              }}
            >
              {options.map(option => {
                const isSelected = option.id === selectedVariant;
                return (
                  <motion.button
                    key={option.id}
                    type="button"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 }}
                    onClick={() => setSelectedVariant(option.id)}
                    className={`rounded-2xl border text-left transition-all duration-300 flex items-center ${
                      isSelected
                        ? 'border-transparent bg-gradient-to-br from-[#1B3764] to-[#2A4A7A] text-white'
                        : 'border-[#1B3764]/15 text-[#1B3764] bg-gray-200'
                    }`}
                    style={{ 
                      padding: `${Math.max(12, 20 * scale)}px`,
                      gap: `${Math.max(12, 20 * scale)}px`
                    }}
                  >
                    <div 
                      className="rounded-xl bg-gray-300 overflow-hidden flex-shrink-0"
                      style={{ 
                        width: `${Math.max(70, 120 * scale)}px`, 
                        height: `${Math.max(56, 112 * scale)}px` 
                      }}
                    >
                      <img
                        src={option.previewImage}
                        alt={option.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p
                      className={`font-semibold ${
                        isSelected ? 'text-white' : 'text-[#1B3764]'
                      }`}
                      style={{ fontSize: `${Math.max(12, 18 * scale)}px` }}
                    >
                      {option.title}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile selections - above X-Ray */}
            <div className="flex lg:hidden flex-col items-center gap-4 mb-6">
              {options.map(option => {
                const isSelected = option.id === selectedVariant;
                return (
                  <motion.button
                    key={option.id}
                    type="button"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    onClick={() => setSelectedVariant(option.id)}
                    className={`rounded-2xl border text-left transition-all duration-300 flex items-center w-full max-w-md ${
                      isSelected
                        ? 'border-transparent bg-gradient-to-br from-[#1B3764] to-[#2A4A7A] text-white'
                        : 'border-[#1B3764]/15 text-[#1B3764] bg-gray-200'
                    }`}
                    style={{ 
                      padding: `${Math.max(12, 20 * scale)}px`,
                      gap: `${Math.max(12, 20 * scale)}px`
                    }}
                  >
                    <div 
                      className="rounded-xl bg-gray-300 overflow-hidden flex-shrink-0"
                      style={{ 
                        width: `${Math.max(70, 120 * scale)}px`, 
                        height: `${Math.max(56, 112 * scale)}px` 
                      }}
                    >
                      <img
                        src={option.previewImage}
                        alt={option.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p
                      className={`font-semibold ${
                        isSelected ? 'text-white' : 'text-[#1B3764]'
                      }`}
                      style={{ fontSize: `${Math.max(12, 18 * scale)}px` }}
                    >
                      {option.title}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            {/* Center X-ray - Grid column 2 */}
            <div className="flex justify-center items-center w-full min-w-0">
              <div 
                className="relative rounded-[32px] isolate w-full"
                style={{ minHeight: xrayMinHeight }}
              >
                {/* Crossfade container - both X-rays rendered, visibility controlled by opacity */}
                <div className="relative w-full" style={{ minHeight: xrayMinHeight }}>
                  {options.map((option) => (
                    <motion.div
                      key={option.id}
                      initial={false}
                      animate={{ 
                        opacity: selectedVariant === option.id ? 1 : 0,
                        pointerEvents: selectedVariant === option.id ? 'auto' : 'none'
                      }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className={selectedVariant === option.id ? 'relative' : 'absolute inset-0'}
                      style={{ zIndex: selectedVariant === option.id ? 2 : 1 }}
                    >
                      <ImageOverlay
                        svgSrc={option.svgSrc}
                        title={option.title}
                        viewportHeight={viewportHeight}
                        viewportWidth={viewportWidth}
                        sidebarWidth={sidebarWidth}
                        industry={industry}
                        bgImage={option.bgImage}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default IndustryXRaySelector;

