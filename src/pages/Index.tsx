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
import InteractiveProductsSection from '@/components/InteractiveProductsSection';
import ApproachSectionV2 from '@/components/ApproachSectionV2';
import ProductImageTicker from '@/components/ProductImageTicker';
import MadeInAmericaSection from '@/components/MadeInAmericaSection';
import MadeInAmericaSectionV2 from '@/components/MadeInAmericaSectionV2';
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
        
        {/* Product Image Ticker - New Product Divider */}
        <section className="relative">
          <ProductImageTicker
            items={[
              { src: "/product-images/c-os9.png", alt: "OS9" },
              { src: "/product-images/c130.png", alt: "C130" },
              { src: "/product-images/c150.png", alt: "C150" },
              { src: "/product-images/c331.png", alt: "C331" },
              { src: "/product-images/ic933.png", alt: "IC933" },
              { src: "/product-images/ic946.png", alt: "IC946" },
              { src: "/product-images/os2.png", alt: "OS2" },
              { src: "/product-images/os20.png", alt: "OS20" },
              { src: "/product-images/os24.png", alt: "OS24" },
              { src: "/product-images/os31.png", alt: "OS31" },
              { src: "/product-images/os35.png", alt: "OS35" },
              { src: "/product-images/os37.png", alt: "OS37" },
              { src: "/product-images/os45.png", alt: "OS45" },
              { src: "/product-images/os55.png", alt: "OS55" },
              { src: "/product-images/r160.png", alt: "R160" },
              { src: "/product-images/r221.png", alt: "R221" },
              { src: "/product-images/r519.png", alt: "R519" },
              { src: "/product-images/r529.png", alt: "R529" },
              { src: "/product-images/t215.png", alt: "T215" },
              { src: "/product-images/t220.png", alt: "T220" },
              { src: "/product-images/t305.png", alt: "T305" },
              { src: "/product-images/t350.png", alt: "T350" },
              { src: "/product-images/t500.png", alt: "T500" },
              { src: "/product-images/t600.png", alt: "T600" },
              { src: "/product-images/t715.png", alt: "T715" },
              { src: "/product-images/t900.png", alt: "T900" },
              { src: "/product-images/t950.png", alt: "T950" },
              { src: "/product-images/t970.png", alt: "T970" },
              { src: "/product-images/mc722.png", alt: "MC722" },
              { src: "/product-images/mc723.png", alt: "MC723" },
              { src: "/product-images/mc724.png", alt: "MC724" },
              { src: "/product-images/mc737.png", alt: "MC737" },
              { src: "/product-images/mc739.png", alt: "MC739" },
              { src: "/product-images/mc741.png", alt: "MC741" },
              { src: "/product-images/tac-734g.png", alt: "TAC-734G" },
              { src: "/product-images/tac-735r.png", alt: "TAC-735R" },
              { src: "/product-images/tac-738r.png", alt: "TAC-738R" },
              { src: "/product-images/tac-739r.png", alt: "TAC-739R" },
              { src: "/product-images/fc-car.png", alt: "FC Car" },
              { src: "/product-images/frp.png", alt: "FRP" }
            ]}
            speed={150}
            direction="left"
            className="py-10 md:py-16"
          />
        </section>
        
        {/* Industries Section (same as Industries page) */}
        <section className="relative overflow-hidden">
          {/* Optimized Gradient Background (Mirrored) */}
          <OptimizedGradient variant="mirrored" opacity={0.8} />

          <IndustriesSectionAlt />
        </section>

        {/* Products Section Row */}
        <section className="relative">
          {mode === 'light2' ? (
            <InteractiveProductsSection />
          ) : (
            <ProductsSectionRow />
          )}
        </section>


        {/* Made in America Section */}
        

        {/* Sticky Background Section */}
        
        {/* <StickyBackgroundSection> */}
          {/* Chemistry Overview Section - Mobile optimized 4-4-3 layout */}
          <section className="relative" style={{ zIndex: 20 }}>
            
            <ChemistryOverviewSectionV6 />
            <section className="relative">
          <ApproachSectionV2 />
        </section>
        
        {/* Approach Section - New component with flipped layout */}
        
        
            <section className="relative">
          <MadeInAmericaSection />
        </section>
          </section>

          {/* Factory Video Background Section */}
          <MadeInAmericaSectionV2 />

          {/* Sticky Newsletter Section - Newsletter as background */}
          <StickyNewsletterSection />
        {/* </StickyBackgroundSection> */}
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

    
    </div>
  );
};

export default Index;
