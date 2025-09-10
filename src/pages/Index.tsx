import React, { lazy, Suspense } from 'react';
import Header from '@/components/Header';
import StickyHeroVideoSection from '@/components/StickyHeroVideoSection';
import IndustriesSectionAlt from '@/components/IndustriesSectionAlt';
import StickyBackgroundSection from '@/components/StickyBackgroundSection';
import ScrollSections from '@/components/ScrollSections';
import StickyNewsletterSection from '@/components/StickyNewsletterSection';
import Footer from '@/components/Footer';
import ProductChemistriesSectionV2 from '@/components/ProductChemistriesSectionV2';
import ProductChemistriesSection from '@/components/ProductChemistriesSection';
import ScienceTrianglesBackground from '@/components/common/ScienceTrianglesBackground';
import MultiScienceTrianglesBackground from '@/components/common/MultiScienceTrianglesBackground';
import OptimizedGradient from '@/components/common/OptimizedGradient';
import { useIsMobile } from '@/hooks/use-mobile';
import DynamicMetaTags from '@/components/DynamicMetaTags';
import { getCardsByIndustry } from '@/data/stackableCardsData';
import { brandColors, getIndustryGradient } from '@/styles/brandStandards';
import type { ServiceCardData } from '@/types/ServiceCard';
import EdgeTrianglesBackground from '@/components/common/EdgeTrianglesBackground';
import IdealChemistriesSection from '@/components/IdealChemistriesSection';
import ChemistryOverviewSectionV6 from '@/components/ChemistryOverviewSectionV6';
import ProductsSectionRow from '@/components/ProductsSectionRow';
import GradientToggleModal from '@/components/GradientToggleModal';
import { useGradientMode } from '@/contexts/GradientModeContext';

// Lazy load heavy components
const ServiceCardStack = lazy(() => import('@/components/ServiceCardStack'));
// import IdealChemistrySection from '@/components/IdealChemistrySection';
// import IdealChemistrySectionV2 from '@/components/IdealChemistrySectionV2';

const Index = () => {
  const isMobile = useIsMobile();
  const { mode, setMode, getGradientClasses } = useGradientMode();
  
  // Get divider background color based on mode
  const getDividerBackgroundColor = () => {
    switch (mode) {
      case 'light':
      case 'light2':
        return '#ffffff'; // White gradient base for light modes
      case 'dark':
      default:
        return '#1B3764'; // Darker blue to match dark mode
    }
  };
  


  return (
    <div className={`relative ${mode === 'light' || mode === 'light2' ? 'bg-white' : ''}`}>
      <DynamicMetaTags
        title="ForzaBuilt - Industrial Adhesives, Sealants, Tapes & Cleaning Solutions"
        description="ForzaBuilt delivers premium industrial solutions across transportation, marine, construction, and manufacturing. Expert adhesives, sealants, tapes, and cleaning products for demanding applications."
        url="/"
        type="website"
      />
      <Header />
      
      {/* Sticky Hero Video Section - video stays while content slides over */}
      <StickyHeroVideoSection>
        {/* All content that should slide over the video */}
        
        {/* Divider/Products Section */}
        {mode === 'light2' ? (
          <section className="relative w-full pb-0 -mt-[22rem] bg-[#e8e8e8]" style={{ paddingTop: '0rem' }}>
            <div className="w-full flex items-center justify-center">
              <img 
                src="/Industrail Bundle HeroImg.png" 
                alt="Forza Industrial Products Bundle - Adhesives, Sealants, Tapes & Cleaning Solutions"
                className="w-full h-auto object-contain object-center max-w-[900px]"
                style={{ zIndex: 1 }}
              />
            </div>
          </section>
        ) : (
          <section 
            className={`relative w-full h-2 sm:h-16 ${
              mode === 'light'
                ? ''
                : 'bg-gradient-to-b from-[#115B87] to-[#1B3764]'
            }`}
            style={mode === 'light' ? { backgroundColor: '#e8e8e8' } : {}}
          >
          </section>
        )}
        
        {/* Industries Section (same as Industries page) */}
        <section className="relative overflow-hidden">
          {/* Optimized Gradient Background (Mirrored) */}
          <OptimizedGradient variant="mirrored" opacity={0.8} />

          <IndustriesSectionAlt />
        </section>

        {/* Products Section Row */}
        <section className="relative">
          <ProductsSectionRow />
        </section>

        {/* Sticky Background Section */}
        <section className="relative">
          <StickyBackgroundSection />
        </section>
      </StickyHeroVideoSection>

      {/* Scroll Stack Cards Section (Grid Layout: 3-2-3-2) - COMMENTED OUT */}
      {/* <section className="relative w-full bg-gradient-to-br from-[#F16022] via-[#D35127] to-[#F16022] text-white">
        <Suspense fallback={
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white text-lg">Loading...</p>
            </div>
          </div>
        }>
          <ServiceCardStack />
        </Suspense>
      </section> */}


      {/* Scroll Sections with Chemistry Molecule - Desktop Only 
      {!isMobile && <ScrollSections />}*/}

      {/* Our Chemistries Section 
      <ProductChemistriesSectionV2 /> */}

      {/* Ideal Chemistry Section */}
      {/* <Suspense fallback={
        <div className="min-h-[300px] flex items-center justify-center bg-gradient-to-br from-[#1B3764] to-[#2C5F8A]">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg">Loading Chemistry Section...</p>
          </div>
        </div>
      }>
        <IdealChemistrySection />
      </Suspense> */}

      

      



      
      {/* Chemistry Overview Section - Mobile optimized 4-4-3 layout */}
      <ChemistryOverviewSectionV6 />

      {/* Sticky Newsletter Section - Newsletter slides over video background */}
      <StickyNewsletterSection />
      
      {/* Footer */}
      <section className="relative">
        <Footer />
      </section>

      {/* Gradient Toggle Modal */}
      <GradientToggleModal 
        currentMode={mode} 
        onModeChange={setMode} 
      />
    </div>
  );
};

export default Index;
