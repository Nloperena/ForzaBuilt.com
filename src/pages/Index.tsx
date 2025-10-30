import React from 'react';
import HeaderV2 from '@/components/Header/HeaderV2';
import StickyHeroVideoSection from '@/components/StickyHeroVideoSection';
import IndustriesSectionAlt from '@/components/IndustriesSectionAlt';
import StickyNewsletterSection from '@/components/StickyNewsletterSection';
import OptimizedGradient from '@/components/common/OptimizedGradient';
import DynamicMetaTags from '@/components/DynamicMetaTags';
import ChemistryOverviewSectionV6 from '@/components/ChemistryOverviewSectionV6';
import ProductsSectionRow from '@/components/ProductsSectionRow';
import InteractiveProductsSection from '@/components/InteractiveProductsSection';
import ApproachSectionV3 from '@/components/ApproachSectionV3';
import ProductImageTicker from '@/components/ProductImageTicker';
import MadeInAmericaSection from '@/components/MadeInAmericaSection';
import MadeInAmericaSectionV2 from '@/components/MadeInAmericaSectionV2';
import HeroVideoSectionV2 from '@/components/HeroVideoSectionV2';
import LibrarySection from '@/components/LibrarySection';
import { useGradientMode } from '@/contexts/GradientModeContext';

const Index = () => {
  const { mode } = useGradientMode();

  return (
    <div className={`relative ${mode === 'light' || mode === 'light2' ? 'bg-white' : ''}`}>
      <DynamicMetaTags
        title="ForzaBuilt - Industrial Adhesives, Sealants, Tapes & Cleaning Solutions"
        description="ForzaBuilt delivers premium industrial solutions across transportation, marine, construction, and manufacturing. Expert adhesives, sealants, tapes, and cleaning products for demanding applications."
        url="/"
        type="website"
      />
      <HeaderV2 />

      {/* Sticky Hero Video Section - video stays while content slides over */}
      <StickyHeroVideoSection>
        {/* All content that should slide over the video */}

        {/* Product Image Ticker - New Product Divider */}
        <section className="relative -mt-40 md:-mt-56 lg:-mt-64 xl:-mt-72 z-20">
          <ProductImageTicker
            items={[
              // Pattern: BOND, SEAL, BOND, SEAL, TAPE
              // Cycle 1
              { src: "/product-images/ic932.png", alt: "IC932" }, // BOND
              { src: "/product-images/c-os9.png", alt: "OS9" }, // SEAL
              { src: "/product-images/tac-735r.png", alt: "TAC-735R" }, // BOND
              { src: "/product-images/os2.png", alt: "OS2" }, // SEAL
              { src: "/product-images/t215.png", alt: "T215" }, // TAPE
              // Cycle 2
              { src: "/product-images/tac-738r.png", alt: "TAC-738R" }, // BOND
              { src: "/product-images/os20.png", alt: "OS20" }, // SEAL
              { src: "/product-images/tac-739r.png", alt: "TAC-739R" }, // BOND
              { src: "/product-images/os31.png", alt: "OS31" }, // SEAL
              { src: "/product-images/t220.png", alt: "T220" }, // TAPE
              // Cycle 3
              { src: "/product-images/mc722.png", alt: "MC722" }, // BOND
              { src: "/product-images/os35.png", alt: "OS35" }, // SEAL
              { src: "/product-images/mc723.png", alt: "MC723" }, // BOND
              { src: "/product-images/os37.png", alt: "OS37" }, // SEAL
              { src: "/product-images/t305.png", alt: "T305" }, // TAPE
              // Cycle 4  
              { src: "/product-images/mc724.png", alt: "MC724" }, // BOND
              { src: "/product-images/os45.png", alt: "OS45" }, // SEAL
              { src: "/product-images/mc737.png", alt: "MC737" }, // BOND
              { src: "/product-images/os55.png", alt: "OS55" }, // SEAL
              { src: "/product-images/t350.png", alt: "T350" }, // TAPE
              // Cycle 5
              { src: "/product-images/mc739.png", alt: "MC739" }, // BOND
              { src: "/product-images/os24.png", alt: "OS24" }, // SEAL
              { src: "/product-images/mc741.png", alt: "MC741" }, // BOND
              { src: "/product-images/c-os9.png", alt: "OS9-2" }, // SEAL (repeat)
              { src: "/product-images/t500.png", alt: "T500" }, // TAPE
              // Cycle 6
              { src: "/product-images/ic933.png", alt: "IC933" }, // BOND
              { src: "/product-images/os2.png", alt: "OS2-2" }, // SEAL (repeat)
              { src: "/product-images/ic946.png", alt: "IC946" }, // BOND
              { src: "/product-images/os20.png", alt: "OS20-2" }, // SEAL (repeat)
              { src: "/product-images/t600.png", alt: "T600" }, // TAPE
              // Cycle 7
              { src: "/product-images/c130.png", alt: "C130" }, // BOND
              { src: "/product-images/os31.png", alt: "OS31-2" }, // SEAL (repeat)
              { src: "/product-images/c150.png", alt: "C150" }, // BOND
              { src: "/product-images/os35.png", alt: "OS35-2" }, // SEAL (repeat)
              { src: "/product-images/t715.png", alt: "T715" }, // TAPE
              // Cycle 8
              { src: "/product-images/c331.png", alt: "C331" }, // BOND
              { src: "/product-images/os37.png", alt: "OS37-2" }, // SEAL (repeat)
              { src: "/product-images/r160.png", alt: "R160" }, // BOND
              { src: "/product-images/os45.png", alt: "OS45-2" }, // SEAL (repeat)
              { src: "/product-images/t900.png", alt: "T900" }, // TAPE
              // Cycle 9
              { src: "/product-images/r221.png", alt: "R221" }, // BOND
              { src: "/product-images/os55.png", alt: "OS55-2" }, // SEAL (repeat)
              { src: "/product-images/r519.png", alt: "R519" }, // BOND
              { src: "/product-images/os24.png", alt: "OS24-2" }, // SEAL (repeat)
              { src: "/product-images/t950.png", alt: "T950" }, // TAPE
              // Cycle 10
              { src: "/product-images/r529.png", alt: "R529" }, // BOND
              { src: "/product-images/c-os9.png", alt: "OS9-3" }, // SEAL (repeat)
              { src: "/product-images/fc-car.png", alt: "FC Car" }, // BOND
              { src: "/product-images/os2.png", alt: "OS2-3" }, // SEAL (repeat)
              { src: "/product-images/t970.png", alt: "T970" } // TAPE
            ]}
            speed={95}
            direction="left"
            className="pt-0 pb-10 md:pt-0 md:pb-16"
          />
        </section>

        {/* Industries Section (same as Industries page) */}
        <section className="relative overflow-hidden z-20">
          {/* Optimized Gradient Background (Mirrored) */}
          <OptimizedGradient variant="mirrored" opacity={0.8} />

          <IndustriesSectionAlt />
        </section>

        {/* Products Section Row */}
        <section className="relative z-20">
          {mode === 'light2' ? (
            <InteractiveProductsSection />
          ) : (
            <ProductsSectionRow />
          )}
        </section>

        {/* Hero Video Section V2 - Standalone (no sticky effect) */}
        <div className="relative z-20">
          <HeroVideoSectionV2 />
        </div>

        {/* Chemistry Overview Section - Mobile optimized 4-4-3 layout */}
        <section className="relative" style={{ zIndex: 20 }}>
          <ChemistryOverviewSectionV6 />
        </section>

        {/* Approach Section */}
        <section className="relative z-20">
          <ApproachSectionV3 />
        </section>

        {/* Made in America Sections */}
        <section className="relative z-20">
          <MadeInAmericaSectionV2 />
          <MadeInAmericaSection />
        </section>

        {/* Newsletter Section */}
        <div className="relative z-20">
          <StickyNewsletterSection />
        </div>
      </StickyHeroVideoSection>

    </div>
  );
};

export default Index;
