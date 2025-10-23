import React from 'react';
import { useGradientMode } from '@/contexts/GradientModeContext';

const ExperienceBetterBanner = () => {
  const { mode } = useGradientMode();

  return (
    <div className="bg-white py-8 md:py-12 relative z-10">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
          {/* Left side - Main slogan */}
          <div className="space-y-1">
            <h2 className={`text-[clamp(28px,4vw,48px)] font-bold text-[#2c476e] leading-tight ${
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
            <p className={`text-[clamp(16px,2vw,22px)] text-[#2c476e] leading-relaxed ${
              mode === 'light2' ? 'font-poppins' : ''
            }`}>
              Creating New Standards & Raising Expectations for Performance, Solutions & Customer Experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceBetterBanner;
















