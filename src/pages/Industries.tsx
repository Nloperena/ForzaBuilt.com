import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import IndustriesSectionClean from '../components/IndustriesSectionClean';
import Footer from '../components/Footer';
import SplitText from '../components/SplitText';
import GradientToggleModal from '../components/GradientToggleModal';
import { useGradientMode } from '@/contexts/GradientModeContext';
// Removed Explore by Product Category section and its dependencies

// Removed Explore by Product Category row component

const Industries = () => {
  const { mode, setMode, getGradientClasses, getTextClasses, getTextSecondaryClasses } = useGradientMode();

  return (
    <div className={`min-h-screen ${
      mode === 'light' || mode === 'light2'
        ? 'bg-gradient-to-b from-gray-100 to-gray-50'
        : 'bg-[#115B87]'
    }`}>
      <Header />

      {/* Hero Section */}
      <section className="relative">
        <div className={`pt-16 sm:pt-20 relative ${
          mode === 'light' || mode === 'light2'
            ? 'bg-gradient-to-b from-gray-100 to-gray-50'
            : 'bg-gradient-to-b from-[#1B3764] to-[#115B87]'
        }`}>
          <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 lg:py-16 [&:has(>div)]:max-w-[2000px]">
            <div className="text-center mx-auto">
              <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black mb-1 sm:mb-2 md:mb-4 leading-none font-kallisto ${getTextClasses()}`}>
                <SplitText
                  text="Better Built Bonds For All Industries"
                  className="block"
                  splitType="words"
                  delay={50}
                  as="span"
                />
              </h1>
              <p className={`text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium leading-relaxed max-w-[1200px] mx-auto ${getTextSecondaryClasses()}`}>
              At Forza, we're your trusted experts and mentors - delivering innovative adhesive solutions that secure your success.
              </p>
            </div>
          </div>
        </div>
      </section>

      <IndustriesSectionClean />
      
      {/* Spacer above footer */}
      <div className={`py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 ${
        mode === 'light' || mode === 'light2'
          ? 'bg-gray-100'
          : 'bg-[#1B3764]'
      }`}></div>
      
      <Footer />
      
      {/* Gradient Toggle Modal */}
      <GradientToggleModal onModeChange={setMode} currentMode={mode} />
    </div>
  );
};

export default Industries; 