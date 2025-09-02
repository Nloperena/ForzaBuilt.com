import React, { lazy, Suspense } from 'react';
import Header from '@/components/Header';
import HeroOverlay from '@/components/HeroOverlay';
import HeroVideoSection from '@/components/HeroVideoSection';
import IndustriesSectionAlt from '@/components/IndustriesSectionAlt';
import ProductsSection from '@/components/ProductsSection';
import StickyBackgroundSection from '@/components/StickyBackgroundSection';
import ScrollSections from '@/components/ScrollSections';
import StickyBackgroundSectionV2 from '@/components/StickyBackgroundSectionV2';
import NewsletterSection from '@/components/NewsletterSection';
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
import ProductsSectionRow from '@/components/ProductsSectionRow';

// Lazy load heavy components
const ServiceCardStack = lazy(() => import('@/components/ServiceCardStack'));
// import IdealChemistrySection from '@/components/IdealChemistrySection';
// import IdealChemistrySectionV2 from '@/components/IdealChemistrySectionV2';

const Index = () => {
  const isMobile = useIsMobile();
  


  return (
    <div className="relative">
      <DynamicMetaTags
        title="ForzaBuilt - Industrial Adhesives, Sealants, Tapes & Cleaning Solutions"
        description="ForzaBuilt delivers premium industrial solutions across transportation, marine, construction, and manufacturing. Expert adhesives, sealants, tapes, and cleaning products for demanding applications."
        url="/"
        type="website"
      />
      <Header />
      
      {/* Hero section */}
      <section className="relative">
        <HeroOverlay />
      </section>
      
      {/* Hero Video Section */}
      <section className="relative">
        <HeroVideoSection />
      </section>
      
      {/* Industries Section (same as Industries page) */}
      <section className="relative overflow-hidden">
        {/* Optimized Gradient Background (Mirrored) */}
        <OptimizedGradient variant="mirrored" opacity={0.8} />

        <IndustriesSectionAlt />
      </section>

      {/* Products Section */}
      <section className="relative overflow-hidden">
        {/* Orange to Blue Gradient Background - Bottom Right */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div 
            className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_center_bottom,rgba(242,97,29,0.6)_0%,rgba(242,97,29,0.5)_25%,rgba(242,97,29,0.35)_45%,rgba(242,97,29,0.2)_65%,rgba(242,97,29,0.1)_80%,rgba(242,97,29,0.03)_90%,transparent_100%)] md:bg-[radial-gradient(ellipse_1800px_1200px_at_center_bottom,rgba(242,97,29,0.6)_0%,rgba(242,97,29,0.5)_25%,rgba(242,97,29,0.35)_45%,rgba(242,97,29,0.2)_65%,rgba(242,97,29,0.1)_80%,rgba(242,97,29,0.03)_90%,transparent_100%)]"
            style={{ opacity: 1 }}
          />
        </div>
        <ProductsSectionRow />
      </section>
      
      {/* Sticky Background Section */}
      <section className="relative">
        <StickyBackgroundSection />
      </section>

      {/* Scroll Stack Cards Section (Grid Layout: 3-2-3-2) - COMMENTED OUT */}
      {/* <section className={`relative w-full bg-gradient-to-br from-[${brandColors.primary.blazeOrange.hex}] via-[${brandColors.secondary.rustyNailOrange.hex}] to-[${brandColors.primary.blazeOrange.hex}] text-white`}>
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

      

      



      {/* Ideal Chemistries Section - new version */}
      <IdealChemistriesSection />

      {/* Made in America Section */}
      <section className="relative">
        <StickyBackgroundSectionV2 />
      </section>

      {/* Edge Triangles Background spanning both sections and divider */}
      {/* Removed EdgeTrianglesBackground overlay and its parent div */}

      {/* Orange Divider */}
      <div className="flex justify-center items-center h-12 w-full relative z-10" style={{ background: '#115B87' }}>
        <div className="w-full max-w-5xl h-3 bg-[#F16022] rounded-full" style={{ borderRadius: '999px' }}></div>
      </div>

      {/* Newsletter Section - STANDALONE */}
      <div className="relative w-full z-10">
        <NewsletterSection />
      </div>
      
      {/* Footer */}
      <section className="relative">
        <Footer />
      </section>
    </div>
  );
};

export default Index;
