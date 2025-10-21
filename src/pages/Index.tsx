import React from 'react';
import Header from '@/components/Header';
import StickyHeroVideoSection from '@/components/StickyHeroVideoSection';
import IndustriesSectionAlt from '@/components/IndustriesSectionAlt';
import StickyNewsletterSection from '@/components/StickyNewsletterSection';
import OptimizedGradient from '@/components/common/OptimizedGradient';
import DynamicMetaTags from '@/components/DynamicMetaTags';
import ChemistryOverviewSectionV6 from '@/components/ChemistryOverviewSectionV6';
import ProductsSectionRow from '@/components/ProductsSectionRow';
import InteractiveProductsSection from '@/components/InteractiveProductsSection';
import ApproachSectionV2 from '@/components/ApproachSectionV2';
import ProductImageTicker from '@/components/ProductImageTicker';
import MadeInAmericaSection from '@/components/MadeInAmericaSection';
import MadeInAmericaSectionV2 from '@/components/MadeInAmericaSectionV2';
import HeroVideoSectionV2 from '@/components/HeroVideoSectionV2';
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
      <Header />

      {/* Sticky Hero Video Section - video stays while content slides over */}
      <StickyHeroVideoSection>
        {/* All content that should slide over the video */}

        {/* Product Image Ticker - New Product Divider */}
        <section className="relative">
          <ProductImageTicker
            items={[
              // BOND 1
              { src: "/product-images/tac-734g.png", alt: "TAC-734G" },
              // SEAL 1
              { src: "/product-images/c-os9.png", alt: "OS9" },
              // TAPE 1
              { src: "/product-images/t215.png", alt: "T215" },
              // BOND 2
              { src: "/product-images/tac-735r.png", alt: "TAC-735R" },
              // SEAL 2
              { src: "/product-images/os2.png", alt: "OS2" },
              // TAPE 2
              { src: "/product-images/t220.png", alt: "T220" },
              // BOND 3
              { src: "/product-images/tac-738r.png", alt: "TAC-738R" },
              // SEAL 3
              { src: "/product-images/os20.png", alt: "OS20" },
              // TAPE 3
              { src: "/product-images/t305.png", alt: "T305" },
              // BOND 4
              { src: "/product-images/tac-739r.png", alt: "TAC-739R" },
              // SEAL 4
              { src: "/product-images/os31.png", alt: "OS31" },
              // TAPE 4
              { src: "/product-images/t350.png", alt: "T350" },
              // BOND 5
              { src: "/product-images/mc722.png", alt: "MC722" },
              // SEAL 5
              { src: "/product-images/os35.png", alt: "OS35" },
              // TAPE 5
              { src: "/product-images/t500.png", alt: "T500" },
              // BOND 6
              { src: "/product-images/mc723.png", alt: "MC723" },
              // SEAL 6
              { src: "/product-images/os37.png", alt: "OS37" },
              // TAPE 6
              { src: "/product-images/t600.png", alt: "T600" },
              // BOND 7
              { src: "/product-images/mc724.png", alt: "MC724" },
              // SEAL 7
              { src: "/product-images/os45.png", alt: "OS45" },
              // TAPE 7
              { src: "/product-images/t715.png", alt: "T715" },
              // BOND 8
              { src: "/product-images/mc737.png", alt: "MC737" },
              // SEAL 8
              { src: "/product-images/os55.png", alt: "OS55" },
              // TAPE 8
              { src: "/product-images/t900.png", alt: "T900" },
              // BOND 9
              { src: "/product-images/mc739.png", alt: "MC739" },
              // TAPE 9
              { src: "/product-images/t950.png", alt: "T950" },
              // BOND 10
              { src: "/product-images/mc741.png", alt: "MC741" },
              // TAPE 10
              { src: "/product-images/t970.png", alt: "T970" },
              // BOND 11
              { src: "/product-images/ic933.png", alt: "IC933" },
              // BOND 12
              { src: "/product-images/ic946.png", alt: "IC946" },
              // BOND 13
              { src: "/product-images/c130.png", alt: "C130" },
              // BOND 14
              { src: "/product-images/c150.png", alt: "C150" },
              // BOND 15
              { src: "/product-images/c331.png", alt: "C331" },
              // BOND 16
              { src: "/product-images/r160.png", alt: "R160" },
              // BOND 17
              { src: "/product-images/r221.png", alt: "R221" },
              // BOND 18
              { src: "/product-images/r519.png", alt: "R519" },
              // BOND 19
              { src: "/product-images/r529.png", alt: "R529" },
              // BOND 20
              { src: "/product-images/os24.png", alt: "OS24" },
              // BOND 21
              { src: "/product-images/fc-car.png", alt: "FC Car" },
              // BOND 22
              { src: "/product-images/frp.png", alt: "FRP" }
            ]}
            speed={95}
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

        {/* Hero Video Section V2 - Standalone (no sticky effect) */}
        <HeroVideoSectionV2 />

        {/* Chemistry Overview Section - Mobile optimized 4-4-3 layout */}
        <section className="relative" style={{ zIndex: 20 }}>
          <ChemistryOverviewSectionV6 />
        </section>

        {/* Approach Section */}
        <section className="relative">
          <ApproachSectionV2 />
        </section>

        {/* Made in America Sections */}
        <section className="relative">
          <MadeInAmericaSectionV2 />
          <MadeInAmericaSection />
        </section>

        {/* Newsletter Section */}
        <StickyNewsletterSection />
      </StickyHeroVideoSection>

    </div>
  );
};

export default Index;
