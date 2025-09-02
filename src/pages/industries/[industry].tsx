import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { industries } from '../../data/industries';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import IdealChemistrySection from '../../components/IdealChemistrySection';
import IndustryStackableCards from '../../components/StackableCards/IndustryStackableCards';
import { getCardsByIndustry, getBackgroundGradientByIndustry } from '@/data/stackableCardsData';
 
import MarineProductsGrid from '../../components/MarineProductsGrid';
import ProductsExplorerClone from '@/components/ProductsExplorerClone';
import IndustryBrochureSection from '../../components/IndustryBrochureSection';
import ConstructionProductSelection from '../../components/ConstructionProductSelection';
import XRayExplorer from '../../components/xray/XRayExplorer';
import { MARINE_DATA } from '../../data/industries/marine';
import { CONSTRUCTION_DATA } from '../../data/industries/construction';
import { TRANSPORTATION_DATA } from '../../data/industries/transportation';
import { COMPOSITES_DATA } from '../../data/industries/composites';
import { INSULATION_DATA } from '../../data/industries/insulation';
import IdealChemistriesSection from '@/components/IdealChemistriesSection';


import { motion, AnimatePresence } from 'framer-motion';

const IndustryPage = () => {
  const { industry } = useParams();
  const industryData = industries.find(
    (ind) => ind.title.toLowerCase().replace(/\s+/g, '-') === industry
  );

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  // Handle page transition animation when industry changes
  useEffect(() => {
    setIsPageTransitioning(true);
    const timer = setTimeout(() => {
      setIsPageTransitioning(false);
    }, 300); // Match the animation duration
    return () => clearTimeout(timer);
  }, [industry]);



 

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



  if (!industryData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#115B87] text-white">
        <h1 className="text-4xl font-extrabold mb-4 font-kallisto">Industry Not Found</h1>
        <p className="text-lg">Sorry, we couldn't find the industry you're looking for.</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#115B87] min-h-screen flex flex-col relative">
      <Header />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={industry}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full relative"
        >
          {/* Hero Banner */}
          <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden z-[5] hero-video-area">
        <video
          key={industryData.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center z-[5] rounded-xl"
        >
          <source src={industryData.videoUrl} type="video/mp4" />
        </video>
      </section>

      {/* Title Section - First content after video */}
      <section style={{ background: 'linear-gradient(#ffffff 50%, #ffffff 50%)' }} className="relative z-[20] pt-16 sm:pt-24 md:pt-32 lg:pt-40 xl:pt-48">
        <motion.div 
          className="w-full px-4 sm:px-6 md:px-10 text-center"
          style={{ marginTop: '-5rem' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white mb-1 sm:mb-2 md:mb-4 leading-none font-kallisto text-center w-full"
          >
            {industryData.title.toUpperCase()}
          </h1>
          {industryData.logo ? (
            <motion.img
              src={industryData.logo}
              alt={`${industryData.title} icon`}
              className="inline-block align-middle h-10 sm:h-14 md:h-20 lg:h-24 xl:h-28 w-auto object-contain mt-2 mx-auto"
              style={{ filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.3))' }}
              loading="lazy"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
            />
          ) : null}
        </motion.div>
      </section>



      {/* Dynamic Industry Headings Section */}
      <section className="bg-white text-[#1b3764] py-8 sm:py-12 md:py-16 relative z-[30]">
          <div className="w-full px-4 sm:px-6 max-w-[1600px] mx-auto">
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6 md:mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Icons removed per brand standards; title only */}
              <h3 
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black text-center leading-none break-words font-kallisto text-[#1b3764]"
              >
                {`Building High-Performance ${industryData.title.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())} Adhesive, Tape & Sealant Solutions`}
              </h3>
            </motion.div>
          </div>
        </section>



      {/* X-Ray Explorer Sections */}
      {industryData.title.toLowerCase() === 'marine' && (
        <>
          <section className="bg-white relative z-[30]">
            <XRayExplorer industry={MARINE_DATA} xrayIndex={0} />
          </section>
          <section className="bg-white relative z-[30]">
            <XRayExplorer industry={MARINE_DATA} xrayIndex={1} />
          </section>
        </>
      )}

      {industryData.title.toLowerCase() === 'construction' && (
        <>
          <section className="bg-white relative z-[30]">
            <XRayExplorer industry={CONSTRUCTION_DATA} xrayIndex={0} />
          </section>
          <section className="bg-white relative z-[30]">
            <XRayExplorer industry={CONSTRUCTION_DATA} xrayIndex={1} />
          </section>
        </>
      )}

      {industryData.title.toLowerCase() === 'transportation' && (
        <>
          <section className="bg-white relative z-[30]">
            <XRayExplorer industry={TRANSPORTATION_DATA} xrayIndex={0} />
          </section>
          <section className="bg-white relative z-[30]">
            <XRayExplorer industry={TRANSPORTATION_DATA} xrayIndex={1} />
          </section>
        </>
      )}

      {industryData.title.toLowerCase() === 'composites' && (
        <section className="bg-white relative z-[30]">
          <XRayExplorer industry={COMPOSITES_DATA} xrayIndex={0} />
        </section>
      )}

      {industryData.title.toLowerCase() === 'insulation' && (
        <>
          <section className="bg-white relative z-[30]">
            <XRayExplorer industry={INSULATION_DATA} xrayIndex={0} />
          </section>
          <section className="bg-white relative z-[30]">
            <XRayExplorer industry={INSULATION_DATA} xrayIndex={1} />
          </section>
        </>
      )}

      {/* Stackable Cards Section - removed old version */}



      {/* New Two-Column Stack using industry gradient/glassmorphism */}
      {(() => {
        const industryKey = industryData.title.toLowerCase();
        // Map industry titles to valid industry keys
        const getIndustryKey = (title: string) => {
          const titleLower = title.toLowerCase();
          if (titleLower.includes('marine')) return 'marine';
          if (titleLower.includes('transportation')) return 'transportation';
          if (titleLower.includes('construction')) return 'construction';
          if (titleLower.includes('industrial')) return 'industrial';
          if (titleLower.includes('composite')) return 'composites';
          if (titleLower.includes('insulation')) return 'insulation';
          return 'industrial'; // default fallback
        };
        
        const validIndustryKey = getIndustryKey(industryData.title);
        const gradient = getBackgroundGradientByIndustry(validIndustryKey);
        
        return (
          <div className="relative z-[30]">
            <IndustryStackableCards industry={validIndustryKey} />
          </div>
        );
      })()}

      {/* Dynamic Products Section removed per request */}

      {/* Products Explorer - carbon copy of product pages with line switcher */}
      <div className="relative z-[30]">
        <ProductsExplorerClone industryName={industryData.title} />
      </div>

      {/* Industry Brochure Section */}
      <div className="relative z-[30]">
        <IndustryBrochureSection industry={industryData.title} />
      </div>

      {/* Chemistries Section - match homepage version */}
      <div className="relative z-[30]">
        <IdealChemistriesSection />
      </div>

        </motion.div>
      </AnimatePresence>

      {/* Spacer above footer */}
      <div className="py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16"></div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default IndustryPage; 