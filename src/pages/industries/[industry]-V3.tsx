import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { industries } from '../../data/industries';
import HeaderV2 from '../../components/Header/HeaderV2';
import FooterV2 from '../../components/FooterV2';
import HybridStackableCards from '../../components/HybridStackableCards';
import ExperienceBetterBanner from '../../components/ExperienceBetterBanner'; // Import new component
import IndustryXRaySections from '../../components/xray/IndustryXRaySections';
import ChemistryOverviewSectionV7 from '@/components/ChemistryOverviewSectionV7';
import IndustryBrochureSection from '../../components/IndustryBrochureSection';
import NewsletterSection from '@/components/NewsletterSection';
import StickyIndustryHeroVideoSection from '../../components/industries/StickyIndustryHeroVideoSection';
import IndustryTitleSection from '../../components/industries/IndustryTitleSection';
import IndustryHeadingsSection from '../../components/industries/IndustryHeadingsSection';
import IndustryProductsSection from '../../components/industries/IndustryProductsSection';
import ProductQuickViewModal from '../../components/industries/ProductQuickViewModal';
import IndustryArticlesSection from '../../components/industries/IndustryArticlesSection';

const IndustryPageV3 = () => {
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
    <div className={`relative overflow-x-hidden bg-[#115B87] min-h-screen flex flex-col`}>
      <HeaderV2 />

      {/* Sticky Hero Video Section - video stays while content slides over */}
      <StickyIndustryHeroVideoSection 
        videoUrl={industryData.videoUrl} 
        industryTitle={industryData.title}
      >
        {/* All content that should slide over the video */}

        {/* Industry Title Section - Transparent background with white text */}
        <section className="relative -mt-40 md:-mt-56 lg:-mt-64 xl:-mt-68 z-[25]">
          <div style={{ background: 'transparent' }}>
            <IndustryTitleSection 
              title={industryData.title}
              logo={industryData.logo}
              color="#ffffff"
            />
          </div>
        </section>

        {/* Dynamic Industry Headings Section */}
        <section className="relative z-[25] bg-white">
          <IndustryHeadingsSection industryTitle={industryData.title} />
        </section>
      </StickyIndustryHeroVideoSection>

      {/* Hybrid Stackable Cards Section - Outside sticky wrapper so sticky positioning works */}
      <div className="relative z-[30]">
        <HybridStackableCards 
          industry={validIndustryKey}
          maxCards={3}
        />
      </div>

      {/* Performance Elevated Banner */}
      <div className="relative z-[45] bg-[#1B3764]">
        <ExperienceBetterBanner textColor="#FFFFFF" highlightColor="#F2611D" />
      </div>

      {/* X-Ray Explorer Sections - Scrolls over the cards section */}
      <section className="relative z-[40] bg-white">
        <IndustryXRaySections industry={industryData.title} />
      </section>

      {/* Continue with remaining content */}
      <div className="relative z-[25]">
        {/* Product Cards Section */}
        <section className="relative bg-white">
          <IndustryProductsSection 
            industryData={industryData}
            onProductSelect={handleProductSelect}
          />
        </section>

        {/* Chemistries Section */}
        <section className="relative bg-white">
          <ChemistryOverviewSectionV7 showBanner={false} />
        </section>

        {/* Industry Brochure Section */}
        <section className="relative bg-white">
          <IndustryBrochureSection industry={industryData.title} backgroundColor="white" />
        </section>

        {/* Industry Articles Section */}
        <section className="relative bg-white">
          <IndustryArticlesSection industryName={industryData.title} />
        </section>

        {/* Newsletter Section */}
        <section className="relative bg-white">
          <NewsletterSection showHeading={true} />
        </section>
      </div>

      {/* Product Quick View Modal */}
      <ProductQuickViewModal 
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={closeModal}
      />
      
      {/* Footer */}
      <FooterV2 />
    </div>
  );
};

export default IndustryPageV3;

