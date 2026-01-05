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
import ProductImageTicker from '@/components/ProductImageTicker';
import MadeInAmericaSection from '@/components/MadeInAmericaSection';
import MadeInAmericaSectionV2 from '@/components/MadeInAmericaSectionV2';
import { useGradientMode } from '@/contexts/GradientModeContext';
const Index = () => {
  const { mode } = useGradientMode();

  // Predefined ticker items with full Vercel Blob Storage URLs and product names
  const tickerItems = useMemo(() => [
    // Cycle 1
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/ic932.webp', alt: 'ForzaBOND® IC932' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Construction/c-os9.webp', alt: 'ForzaSEAL® C-OS9' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Composites/tac-735r.webp', alt: 'ForzaBOND® TAC-735R' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/os2.webp', alt: 'ForzaSEAL® OS2' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/os10.webp', alt: 'ForzaSEAL® OS10' },
    // Cycle 2
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Composites/tac-738r.webp', alt: 'ForzaBOND® TAC-738R' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/os20.webp', alt: 'ForzaSEAL® OS20' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Marine/tac-739r.webp', alt: 'ForzaBOND® TAC-739R' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/os31.webp', alt: 'ForzaSEAL® OS31' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/os25.webp', alt: 'ForzaSEAL® OS25' },
    // Cycle 3
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Marine/mc722.webp', alt: 'ForzaBOND® MC722' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/os35.webp', alt: 'ForzaSEAL® OS35' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Marine/mc723.webp', alt: 'ForzaBOND® MC723' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/os37.webp', alt: 'ForzaSEAL® OS37' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/t305.webp', alt: 'T305' },
    // Cycle 4
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Marine/mc724.webp', alt: 'ForzaBOND® MC724' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/os61.webp', alt: 'ForzaSEAL® OS61' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Marine/mc737.webp', alt: 'ForzaBOND® MC737' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Construction/c-os55.webp', alt: 'ForzaSEAL® C-OS55' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/t350.webp', alt: 'T350' },
    // Cycle 5
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Marine/mc737.webp', alt: 'ForzaBOND® MC737' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/os24.webp', alt: 'ForzaSEAL® OS24' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Marine/mc741.webp', alt: 'ForzaBOND® MC741' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Construction/c-os9.webp', alt: 'ForzaSEAL® C-OS9' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Construction/c-t500.webp', alt: 'ForzaTAPE® C-T500' },
    // Cycle 6
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Construction/ic933.webp', alt: 'ForzaBOND® IC933' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/os2.webp', alt: 'ForzaSEAL® OS2' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Construction/ic946.webp', alt: 'ForzaBOND® IC946' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/os20.webp', alt: 'ForzaSEAL® OS20' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Transportation/r-t600.webp', alt: 'ForzaTAPE® R-T600' },
    // Cycle 7
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/c130.webp', alt: 'ForzaBOND® C130' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/os31.webp', alt: 'ForzaSEAL® OS31' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/c150.webp', alt: 'ForzaBOND® C150' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/os35.webp', alt: 'ForzaSEAL® OS35' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/oa12.webp', alt: 'ForzaBOND® OA12' },
    // Cycle 8
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/c331.webp', alt: 'ForzaBOND® C331' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/os37.webp', alt: 'ForzaSEAL® OS37' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/r160.webp', alt: 'R160' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/os61.webp', alt: 'ForzaSEAL® OS61' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/t900.webp', alt: 'T900' },
    // Cycle 9
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/r221.webp', alt: 'R221' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Construction/c-os55.webp', alt: 'ForzaSEAL® C-OS55' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/r519.webp', alt: 'R519' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/os24.webp', alt: 'ForzaSEAL® OS24' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/t950.webp', alt: 'T950' },
    // Cycle 10
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/mc739.webp', alt: 'MC739' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Construction/c-os9.webp', alt: 'ForzaSEAL® C-OS9' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/oa13.webp', alt: 'ForzaBOND® OA13' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/os2.webp', alt: 'ForzaSEAL® OS2' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/t970.webp', alt: 'T970' }
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
