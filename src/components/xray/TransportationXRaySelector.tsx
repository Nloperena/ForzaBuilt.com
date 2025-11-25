import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { typography } from '@/styles/brandStandards';
import RVBusOverlay from './RVBusOverlay';
import TrailerOverlay from './TrailerOverlay';

type XRayVariant = 'rv-bus' | 'trailer';

interface XRayOption {
  id: XRayVariant;
  title: string;
  subtitle: string;
  summary: string;
  previewImage: string;
}

const OPTIONS: XRayOption[] = [
  {
    id: 'rv-bus',
    title: 'RV / Motor Coach Applications',
    subtitle: '',
    summary:
      'Explore RV & motor coach assemblies including structural bonding for slide-outs, roof sealing, and continuous panel builds.',
    previewImage: '/img/transportation/RV Bus Exploded-NEW.png',
  },
  {
    id: 'trailer',
    title: 'Trailer Applications',
    subtitle: '',
    summary:
      'Inspect high-strength trailer assemblies covering walls, floors, and chassis bonding for commercial and specialty builds.',
    previewImage: '/img/transportation/Trailer PostX-Ray.png',
  },
];

const optionVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.08 },
};

const TransportationXRaySelector: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<XRayVariant | null>('rv-bus');
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

  // Sidebar column width based on viewport height
  const sidebarWidth = useMemo(() => {
    if (viewportHeight < 600) return '200px';
    if (viewportHeight < 800) return '260px';
    return '320px';
  }, [viewportHeight]);

  // X-Ray container min-height based on viewport height - use full viewport height
  const xrayMinHeight = useMemo(() => {
    // Use full viewport height for all displays
    return `${viewportHeight}px`;
  }, [viewportHeight]);

  const selectedOption = selectedVariant
    ? OPTIONS.find(option => option.id === selectedVariant)
    : null;

  return (
    <section className="relative bg-white z-[30] pb-2 sm:pb-4">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6">
        {/* Section Header moved here, above the X-Ray selection/display */}
        <div className="text-center mb-3 sm:mb-8 pt-[5rem]">
          <h2 
            className="font-poppins font-normal text-[#1B3764] mb-2 sm:mb-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight }}
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
              {OPTIONS.map(option => (
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
              {OPTIONS.map(option => {
                const isSelected = option.id === selectedVariant;
                return (
                  <motion.button
                    key={option.id}
                    type="button"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: option.id === 'trailer' ? 0.05 : 0 }}
                    onClick={() => setSelectedVariant(option.id)}
                    className={`rounded-2xl border text-left transition-all duration-300 flex items-center ${
                      isSelected
                        ? 'border-transparent bg-gradient-to-br from-[#115B87] to-[#1a6fa0] text-white'
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
              {OPTIONS.map(option => {
                const isSelected = option.id === selectedVariant;
                return (
                  <motion.button
                    key={option.id}
                    type="button"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: option.id === 'trailer' ? 0.05 : 0 }}
                    onClick={() => setSelectedVariant(option.id)}
                    className={`rounded-2xl border text-left transition-all duration-300 flex items-center w-full max-w-md ${
                      isSelected
                        ? 'border-transparent bg-gradient-to-br from-[#115B87] to-[#1a6fa0] text-white'
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
                  {/* RV/Bus X-Ray */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      opacity: selectedVariant === 'rv-bus' ? 1 : 0,
                      pointerEvents: selectedVariant === 'rv-bus' ? 'auto' : 'none'
                    }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className={selectedVariant === 'rv-bus' ? 'relative' : 'absolute inset-0'}
                    style={{ zIndex: selectedVariant === 'rv-bus' ? 2 : 1 }}
                  >
                    <RVBusOverlay viewportHeight={viewportHeight} viewportWidth={viewportWidth} />
                  </motion.div>
                  
                  {/* Trailer X-Ray */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      opacity: selectedVariant === 'trailer' ? 1 : 0,
                      pointerEvents: selectedVariant === 'trailer' ? 'auto' : 'none'
                    }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className={selectedVariant === 'trailer' ? 'relative' : 'absolute inset-0'}
                    style={{ zIndex: selectedVariant === 'trailer' ? 2 : 1 }}
                  >
                    <TrailerOverlay viewportHeight={viewportHeight} viewportWidth={viewportWidth} />
                  </motion.div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default TransportationXRaySelector;

