import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { industries } from '../../data/industries';
import HeaderV2 from '../../components/Header/HeaderV2';
import FooterV2 from '../../components/FooterV2';
import HybridStackableCards from '../../components/HybridStackableCards';
import IndustryXRaySections from '../../components/xray/IndustryXRaySections';
import ChemistryOverviewSectionV6 from '@/components/ChemistryOverviewSectionV6';
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
          {/* Hero Banner */}
          <IndustryHeroBanner 
            videoUrl={industryData.videoUrl} 
            industryTitle={industryData.title}
          />

          {/* Title Section */}
          <IndustryTitleSection 
            title={industryData.title}
            logo={industryData.logo}
            color={industryData.color || '#1B3764'}
          />

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
            <ChemistryOverviewSectionV6 showBanner={false} />
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
