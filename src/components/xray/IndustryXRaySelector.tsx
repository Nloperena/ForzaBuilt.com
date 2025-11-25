import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageOverlay from './ImageOverlay';

export interface XRayOption {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  previewImage: string;
  svgSrc: string;
  bgImage?: string;
}

interface IndustryXRaySelectorProps {
  industry: string;
  options: XRayOption[];
}

const IndustryXRaySelector: React.FC<IndustryXRaySelectorProps> = ({ industry, options }) => {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(options.length > 0 ? options[0].id : null);

  // Handle escape key to close/reset if needed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Optional: deselect or similar behavior
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Section Header */}
      <div className="w-full px-4 sm:px-6 pt-16 pb-6 text-center">
        <h2 
          className="font-poppins font-normal text-[#1B3764] mb-2"
          style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
        >
          Products In Use
        </h2>
        <p 
          className="text-[#1B3764]/70 font-poppins max-w-2xl mx-auto"
          style={{ fontSize: 'clamp(0.875rem, 1.2vw + 0.25rem, 1.125rem)' }}
        >
          Cursor over or click to explore product application details
        </p>
      </div>

      {/* X-Ray Display Area */}
      <div className="relative w-full h-[100vh]">
        <div className="absolute inset-0 w-full h-full z-0">
          {options.map((option) => (
            <div
              key={option.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                selectedVariant === option.id ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <ImageOverlay
                svgSrc={option.svgSrc}
                title={option.title}
                industry={industry}
                bgImage={option.bgImage}
              />
            </div>
          ))}
        </div>

        {/* Floating Selectors (Top Left) */}
        <div className="absolute top-8 left-8 z-40 flex flex-col gap-4">
        {options.map((option) => {
          const isSelected = selectedVariant === option.id;
          return (
            <motion.button
              key={option.id}
              onClick={() => setSelectedVariant(option.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                group flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-300 shadow-lg backdrop-blur-sm
                ${isSelected 
                  ? 'bg-[#1B3764] border-[#1B3764] text-white ring-2 ring-[#1B3764]/20' 
                  : 'bg-gray-200/80 border-gray-300 text-[#1B3764] hover:bg-gray-100 hover:border-[#1B3764]/30'
                }
              `}
              style={{ width: '220px' }}
            >
              <div className={`
                w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border
                ${isSelected ? 'border-white/20' : 'border-gray-300'}
              `}>
                <img 
                  src={option.previewImage} 
                  alt={option.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className={`font-semibold text-sm leading-tight ${isSelected ? 'text-white' : 'text-[#1B3764]'}`}>
                  {option.title}
                </p>
                <p className={`text-xs mt-0.5 ${isSelected ? 'text-white/70' : 'text-gray-500'}`}>
                  View Application
                </p>
              </div>
            </motion.button>
          );
        })}
        </div>
      </div>
    </section>
  );
};

export default IndustryXRaySelector;

