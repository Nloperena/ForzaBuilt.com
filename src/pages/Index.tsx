import React, { useMemo } from 'react';
import HeaderV2 from '@/components/Header/HeaderV2';
import StickyHeroVideoSection from '@/components/StickyHeroVideoSection';
import IndustriesSectionAlt from '@/components/IndustriesSectionAlt';
import StickyNewsletterSection from '@/components/StickyNewsletterSection';
import OptimizedGradient from '@/components/common/OptimizedGradient';
import DynamicMetaTags from '@/components/DynamicMetaTags';
import ChemistryOverviewSectionV7 from '@/components/ChemistryOverviewSectionV7';
import ProductsSectionRow from '@/components/ProductsSectionRow';
import InteractiveProductsSectionV6 from '@/components/InteractiveProductsSectionV6';
import ApproachSectionUnified from '@/components/ApproachSectionUnified';
import ApproachSectionV3 from '@/components/ApproachSectionV3';
import ProductImageTicker from '@/components/ProductImageTicker';
import MadeInAmericaSection from '@/components/MadeInAmericaSection';
import MadeInAmericaSectionV2 from '@/components/MadeInAmericaSectionV2';
import { useGradientMode } from '@/contexts/GradientModeContext';
const Index = () => {
  const { mode } = useGradientMode();

  // Predefined ticker items with full Vercel Blob Storage URLs and product names
  const tickerItems = useMemo(() => [
    // Cycle 1
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/IC932 Canister.png', alt: 'ForzaBOND® IC932' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Construction/C-OS9 Sausage.png', alt: 'ForzaSEAL® C-OS9' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Marine/TAC-735R Canister and Aerosol.png', alt: 'ForzaBOND® TAC-735R' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/OS2 Cartridge.png', alt: 'ForzaSEAL® OS2' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/OS10 Cartridge.png', alt: 'ForzaSEAL® OS10' },
    // Cycle 2
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Marine/TAC-738R Canister and Aerosol.png', alt: 'ForzaBOND® TAC-738R' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/OS20 Sausage.png', alt: 'ForzaSEAL® OS20' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Marine/TAC-739R Canister and Aerosol.png', alt: 'ForzaBOND® TAC-739R' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/OS31 Cartridge.png', alt: 'ForzaSEAL® OS31' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/OS25 Cartridge.png', alt: 'ForzaSEAL® OS25' },
    // Cycle 3
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Marine/MC722 Canister.png', alt: 'ForzaBOND® MC722' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/OS35 Cartridge.png', alt: 'ForzaSEAL® OS35' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Marine/MC723 Canister and Aerosol.png', alt: 'ForzaBOND® MC723' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/OS37 Cartridge.png', alt: 'ForzaSEAL® OS37' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/T305- Foam Tape.png', alt: 'T305' },
    // Cycle 4
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Marine/MC724 Canister and Aerosol.png', alt: 'ForzaBOND® MC724' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/OS61 Cartridge.png', alt: 'ForzaSEAL® OS61' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Marine/MC737 Canister.png', alt: 'ForzaBOND® MC737' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Construction/C-OS55 Sausage.png', alt: 'ForzaSEAL® C-OS55' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/T350- Thermal Break Tape.png', alt: 'T350' },
    // Cycle 5
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Marine/MC737 Canister.png', alt: 'ForzaBOND® MC737' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/OS24 Cartridge.png', alt: 'ForzaSEAL® OS24' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Marine/MC741 Canister.png', alt: 'ForzaBOND® MC741' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Construction/C-OS9 Sausage.png', alt: 'ForzaSEAL® C-OS9' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Construction/C-T500 Tape.png', alt: 'ForzaTAPE® C-T500' },
    // Cycle 6
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/IC933 Canister and Aerosol.png', alt: 'ForzaBOND® IC933' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/OS2 Cartridge.png', alt: 'ForzaSEAL® OS2' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/IC946 Canister and Aerosol.png', alt: 'ForzaBOND® IC946' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/OS20 Sausage.png', alt: 'ForzaSEAL® OS20' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Insulation/R-T600 Tape.png', alt: 'ForzaTAPE® R-T600' },
    // Cycle 7
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/C130 Drum.png', alt: 'ForzaBOND® C130' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/OS31 Cartridge.png', alt: 'ForzaSEAL® OS31' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/C150 1 gal pail.png', alt: 'ForzaBOND® C150' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/OS35 Cartridge.png', alt: 'ForzaSEAL® OS35' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/OA12 Cartridge.png', alt: 'ForzaBOND® OA12' },
    // Cycle 8
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/C331 5 gal Pail.png', alt: 'ForzaBOND® C331' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/OS37 Cartridge.png', alt: 'ForzaSEAL® OS37' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/R160 2 part.png', alt: 'R160' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/OS61 Cartridge.png', alt: 'ForzaSEAL® OS61' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/T900 Butyl Tape.png', alt: 'T900' },
    // Cycle 9
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/R221 2 part.png', alt: 'R221' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Construction/C-OS55 Sausage.png', alt: 'ForzaSEAL® C-OS55' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/R519 2 part.png', alt: 'R519' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/OS24 Cartridge.png', alt: 'ForzaSEAL® OS24' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/T950 FSK Bonding Tape.png', alt: 'T950' },
    // Cycle 10
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/r529.png', alt: 'R529' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Construction/C-OS9 Sausage.png', alt: 'ForzaSEAL® C-OS9' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/OA13 Cartridge.png', alt: 'ForzaBOND® OA13' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/OS2 Cartridge.png', alt: 'ForzaSEAL® OS2' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images/Industrial/T970 Foil Bonding Tape.png', alt: 'T970' }
  ], []);

  return (
    <div className={`relative overflow-x-hidden ${mode === 'light' || mode === 'light2' ? 'bg-white' : ''}`}>
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
        <section className="relative -mt-40 md:-mt-56 lg:-mt-64 xl:-mt-68">
          <ProductImageTicker
            items={tickerItems}
            speed={95}
            direction="left"
            className="pt-0 pb-10 md:pt-0 md:pb-16"
          />
        </section>

        {/* Industries Section */}
        <section className="relative overflow-hidden">
          <OptimizedGradient variant="mirrored" opacity={0.8} />
          <IndustriesSectionAlt />
        </section>

        {/* Products Section */}
        <section className="relative">
          {mode === 'light2' ? (
            <InteractiveProductsSectionV6 />
          ) : (
            <ProductsSectionRow />
          )}
        </section>

        {/* Chemistry Overview Section */}
        <section className="relative">
          <ChemistryOverviewSectionV7 />
        </section>

        {/* Approach Section */}
        <ApproachSectionUnified />

    

        {/* Made in America Sections */}
        <section className="relative">
          <MadeInAmericaSectionV2 />
          <MadeInAmericaSection />
        </section>

        {/* Newsletter Section */}
        <section className="relative">
          <StickyNewsletterSection />
        </section>
      </StickyHeroVideoSection>
    </div>
  );
};

export default Index;
