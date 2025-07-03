import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { industries } from '../../data/industries';
import Footer from '../../components/Footer';
import ProductChemistriesSection from '../../components/ProductChemistriesSection';
import ServiceCardStack from '../../components/ServiceCardStack';
import XRayWipe from '../../components/XRayWipe';
import InteractiveBuildingMap from '../../components/InteractiveBuildingMap';
import MarineProductsGrid from '../../components/MarineProductsGrid';
import MarineBrochureSection from '../../components/MarineBrochureSection';
import ApplicationsModal from '../../components/ApplicationsModal';
import { motion } from 'framer-motion';

const IndustryPage = () => {
  const { industry } = useParams();
  const industryData = industries.find(
    (ind) => ind.title.toLowerCase().replace(/\s+/g, '-') === industry
  );

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasReached100, setHasReached100] = useState(false);
  const [hasBeenManuallyClosed, setHasBeenManuallyClosed] = useState(false);
  const [modalOpacity, setModalOpacity] = useState(0);
  const [xrayProgress, setXrayProgress] = useState(0);

  useEffect(() => {
    if (expandedIndex === null) return;
    const handleClick = (e: MouseEvent) => {
      const card = document.getElementById(`product-card-${expandedIndex}`);
      if (card && !card.contains(e.target as Node)) {
        setExpandedIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [expandedIndex]);

  // Handle X-Ray progress changes
  const handleXRayProgress = (progress: number) => {
    // Track X-Ray progress for InteractiveBuildingMap
    setXrayProgress(progress);
    
    // Track when we reach 100%
    if (progress >= 100) {
      setHasReached100(true);
    }
    
    // Reset manual close flag when we reach 100% and then go back below 75%
    if (hasReached100 && progress < 75) {
      setHasBeenManuallyClosed(false);
    }
    
    // Calculate modal opacity based on progress
    let opacity = 0;
    if (progress >= 70 && progress <= 110 && !hasBeenManuallyClosed) {
      // Extended fade in from 70% to 80%, stay at full opacity from 80% to 90%, extended fade out from 90% to 110%
      if (progress <= 80) {
        opacity = (progress - 70) / 10; // 0 to 1 from 70% to 80%
      } else if (progress <= 90) {
        opacity = 1; // Full opacity from 80% to 90%
      } else {
        opacity = 1 - ((progress - 90) / 20); // 1 to 0 from 90% to 110%
      }
    }
    
    setModalOpacity(opacity);
    setIsModalVisible(opacity > 0);
  };

  if (!industryData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#1b3764] text-white">
        <h1 className="text-4xl font-extrabold mb-4 font-kallisto">Industry Not Found</h1>
        <p className="text-lg">Sorry, we couldn't find the industry you're looking for.</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#1b3764] min-h-screen flex flex-col">
      {/* Hero Banner */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden z-10">
        <video
          key={industryData.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center z-[50] rounded-xl"
        >
          <source src={industryData.videoUrl} type="video/mp4" />
        </video>
      </section>

      {/* Title Overlap Container */}
      <div className="relative z-40 flex justify-center -mt-20">
        <div className="w-full px-10 py-4 bg-white text-center relative flex items-center justify-center">
          <h1 className="text-9xl md:text-11xl font-extrabold font-kallisto flex items-center" style={{ color: industryData.color || '#1b3764', marginTop: '-5rem' }}>
            {(industryData.title.charAt(0) + industryData.title.slice(1).toLowerCase()).toUpperCase()}
            {industryData.logo && (
              <img
                src={industryData.logo}
                alt={industryData.title + ' logo'}
                className="inline-block align-middle ml-2 h-64 w-auto object-contain"
                loading="lazy"
              />
            )}
          </h1>
        </div>
      </div>

      {/* About Section */}
      <section className="bg-white text-[#1b3764] flex-1 -mb-20">
        <div className="w-full px-4 max-w-[1600px] mx-auto">
          {industryData.pageHeadline && (
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-12 text-center leading-tight font-kallisto text-[#1b3764]">{industryData.pageHeadline}</h3>
          )}
        </div>
      </section>

      {/* Scroll Stack Cards Section */}
      {/* XRay Wipe Section - Before and After Comparison */}
      <section className="py-20-custom bg-white mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <XRayWipe
            beforeSrc="https://images.ctfassets.net/hdznx4p7ef81/1AmgiwUCYVKuHYBzr0zVfi/d5ccc0c8a64e211d9cd50d656c64dbee/Boat-Pre-X-Ray__2_.png"
            afterContent={
              <div className="w-full h-full">
                <InteractiveBuildingMap scrollProgress={xrayProgress} />
              </div>
            }
            altBefore="Construction site before completion"
            height={700}
            wipeDirection="btt"
            onProgressChange={handleXRayProgress}
          />
        </div>
      </section>

      {/* Applications Modal */}
      <ApplicationsModal 
        isVisible={isModalVisible} 
        onClose={() => {
          setIsModalVisible(false);
          setHasBeenManuallyClosed(true);
        }}
        opacity={modalOpacity}
      />

      <section className="bg-gradient-to-b from-slate-50 to-white">
        <ServiceCardStack />
      </section>

      {/* Marine Products Grid */}
      {industryData.title === 'MARINE' && industryData.products && (
        <MarineProductsGrid products={industryData.products} />
      )}

      {/* Chemistries Section */}
      <ProductChemistriesSection />

      
      {industryData.title === 'MARINE' && <MarineBrochureSection />}
    </div>
  );
};

export default IndustryPage; 