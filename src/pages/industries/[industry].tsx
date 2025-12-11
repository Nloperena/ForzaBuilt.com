import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { industries } from '../../data/industries';
import HeaderV2 from '../../components/Header/HeaderV2';
import FooterV2 from '../../components/FooterV2';
import HybridStackableCards from '../../components/HybridStackableCards';
import ExperienceBetterBanner from '../../components/ExperienceBetterBanner';
import IndustryXRaySections from '../../components/xray/IndustryXRaySections';
import NewsletterSection from '@/components/NewsletterSection';
import IndustryHeroBanner from '../../components/industries/IndustryHeroBanner';
import IndustryProductsSection from '../../components/industries/IndustryProductsSection';
import IndustryBrochureArticlesSection from '../../components/industries/IndustryBrochureArticlesSection';
import { getIndustryColorHex } from '@/utils/industryHelpers';

import { motion, AnimatePresence } from 'framer-motion';

const IndustryPage = () => {
  const { industry } = useParams();
  const industryData = industries.find(
    (ind) => ind.title.toLowerCase().replace(/\s+/g, '-') === industry
  );


  if (!industryData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#115B87] text-white">
        <h1 className="text-4xl font-extrabold mb-4 font-kallisto">Industry Not Found</h1>
        <p className="text-lg">Sorry, we couldn't find the industry you're looking for.</p>
        <FooterV2 />
      </div>
    );
  }

  // Map industry titles to valid industry keys for HybridStackableCards
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


  return (
    <div className="bg-[#115B87] min-h-screen flex flex-col relative">
      <HeaderV2 />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={industry}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full relative"
        >
          {/* Hero Video Section - Full screen with title and subtitle overlay */}
          <div className="relative">
            <IndustryHeroBanner 
              videoUrl={industryData.videoUrl} 
              industryTitle={industryData.title}
              logo={industryData.logo}
              variant="simple"
              subtitle={`Building High-Performing\n${industryData.title.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())} Adhesive, Tape\n& Sealant Solutions`}
            />
          </div>

          {/* Industry Title & Icon Section - White Background */}
          <section className="bg-white py-2 md:py-3 relative z-[30]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8">
                {industryData.logo && (
                  <div className="relative" style={{ width: 'clamp(4rem, 8vw, 10rem)', height: 'clamp(4rem, 8vw, 10rem)' }}>
                    <img
                      src={industryData.logo}
                      alt={`${industryData.title} icon`}
                      className="w-auto h-full object-contain"
                    />
                  </div>
                )}
                <h1
                  className="font-black mb-0 leading-none font-kallisto"
                  style={{ 
                    fontSize: 'clamp(2rem, 4vw + 0.5rem, 5rem)',
                    color: industryData.color || getIndustryColorHex(industryData.title),
                    fontFamily: 'Kallisto, Poppins, sans-serif'
                  }}
                >
                  {industryData.title.toUpperCase()}
                </h1>
              </div>
            </div>
          </section>

          {/* Hybrid Stackable Cards Section */}
          <div className="relative z-[30]">
            <HybridStackableCards 
              industry={validIndustryKey}
              maxCards={3}
            />
          </div>
          {/* Performance Elevated Banner - Dark on left, light on right */}
          <div className="relative z-[45] bg-gradient-to-r from-[#2c476e] to-[#477197]">
            <ExperienceBetterBanner textColor="#FFFFFF" highlightColor="#F2611D" />
          </div>
          {/* X-Ray Explorer Sections - Single Row */}
          <IndustryXRaySections industry={industryData.title} />

          {/* Product Cards Section */}
          <IndustryProductsSection 
            industryData={industryData}
            onProductSelect={() => {}}
          />

      {/* Combined Brochure & Articles Section */}
      <div className="relative z-[30]">
        <IndustryBrochureArticlesSection 
          industry={industryData.title}
          industryName={industryData.title}
        />
      </div>

        </motion.div>
      </AnimatePresence>
                  
      <NewsletterSection showHeading={true} />
      
      {/* Footer */}
      <FooterV2 />
    </div>
  );
};

export default IndustryPage; 
