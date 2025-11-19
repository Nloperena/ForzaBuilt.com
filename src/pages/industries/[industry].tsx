import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { industries } from '../../data/industries';
import HeaderV2 from '../../components/Header/HeaderV2';
import FooterV2 from '../../components/FooterV2';
import HybridStackableCards from '../../components/HybridStackableCards';
import IndustryXRaySections from '../../components/xray/IndustryXRaySections';
import ChemistryOverviewSectionV7 from '@/components/ChemistryOverviewSectionV7';
import IndustryBrochureSection from '../../components/IndustryBrochureSection';
import NewsletterSection from '@/components/NewsletterSection';
import IndustryHeroBanner from '../../components/industries/IndustryHeroBanner';
import IndustryTitleSection from '../../components/industries/IndustryTitleSection';
import IndustryHeadingsSection from '../../components/industries/IndustryHeadingsSection';
import IndustryProductsSection from '../../components/industries/IndustryProductsSection';
import ProductQuickViewModal from '../../components/industries/ProductQuickViewModal';
import IndustryArticlesSection from '../../components/industries/IndustryArticlesSection';

import { motion, AnimatePresence } from 'framer-motion';

const IndustryPage = () => {
  const { industry } = useParams();
  const industryData = industries.find(
    (ind) => ind.title.toLowerCase().replace(/\s+/g, '-') === industry
  );

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heroLayout, setHeroLayout] = useState<'flex' | 'overlay'>('flex');
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  
  const handleProductSelect = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

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

  // Intersection observer to detect when hero section is visible
  const heroRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

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
          {/* Hero Layout Toggle Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isHeroVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed top-20 right-4 z-50"
            style={{ pointerEvents: isHeroVisible ? 'auto' : 'none' }}
          >
            {/* Toggle Switch */}
            <div className="bg-gray-300 rounded-full p-1 w-24 cursor-pointer shadow-lg transition-all duration-300 hover:shadow-xl" onClick={() => setHeroLayout(heroLayout === 'flex' ? 'overlay' : 'flex')}>
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${
                  heroLayout === 'flex' 
                    ? 'bg-white text-[#2c476e]' 
                    : 'bg-[#F2611D] text-white'
                }`}
              >
                {heroLayout === 'flex' ? 'Flex' : 'Over'}
              </motion.div>
            </div>
          </motion.div>

          {/* Hero Video and Title Banner Container - FLEX LAYOUT */}
          <div ref={heroRef}>
            {heroLayout === 'flex' && (
              <div className="relative w-full flex flex-col overflow-hidden" style={{ height: '100vh', minHeight: '100vh' }}>
              {/* Hero Banner - Flex to fill available space */}
              <div className="flex-1 overflow-hidden">
                <IndustryHeroBanner 
                  videoUrl={industryData.videoUrl} 
                  industryTitle={industryData.title}
                  variant="simple"
                />
              </div>

              {/* Title Section - Fixed height at bottom, flex-shrink-0 to prevent shrinking */}
              <div className="flex-shrink-0 z-[10]">
                <IndustryTitleSection 
                  title={industryData.title}
                  logo={industryData.logo}
                  color={industryData.color || '#1B3764'}
                />
              </div>
            </div>
          )}

            {/* Hero Video and Title Banner Container - OVERLAY LAYOUT (Full viewport video with white text overlay at bottom) */}
            {heroLayout === 'overlay' && (
              <div className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: '100vh' }}>
                <IndustryHeroBanner 
                  videoUrl={industryData.videoUrl} 
                  industryTitle={industryData.title}
                  logo={industryData.logo}
                  color={industryData.color || '#1B3764'}
                  variant="overlay"
                />
              </div>
            )}
          </div>

      {/* Dynamic Industry Headings Section */}
          <IndustryHeadingsSection industryTitle={industryData.title} />

          {/* X-Ray Explorer Sections */}
          <IndustryXRaySections industry={industryData.title} />

          {/* Hybrid Stackable Cards Section */}
          <div className="relative z-[30]">
            <HybridStackableCards 
              industry={validIndustryKey}
              maxCards={2}
            />
          </div>

          {/* Product Cards Section */}
          <IndustryProductsSection 
            industryData={industryData}
            onProductSelect={handleProductSelect}
          />

          {/* Chemistries Section */}
          <div className="relative z-[30]">
            <ChemistryOverviewSectionV7 showBanner={false} />
      </div>

      {/* Industry Brochure Section */}
      <div className="relative z-[30]">
        <IndustryBrochureSection industry={industryData.title} backgroundColor="white" />
      </div>

          {/* Industry Articles Section */}
          <IndustryArticlesSection industryName={industryData.title} />

        </motion.div>
      </AnimatePresence>

      {/* Product Quick View Modal */}
      <ProductQuickViewModal 
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={closeModal}
      />
                  
      <NewsletterSection showHeading={true} />
      
      {/* Footer */}
      <FooterV2 />
    </div>
  );
};

export default IndustryPage; 
