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
  // Pattern: BOND, SEAL, BOND, SEAL, TAPE (or SEAL) - alternating cycles
  const tickerItems = useMemo(() => [
    // Cycle 1
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/IC932%20Canister.webp', alt: 'ForzaBOND® IC932' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Construction/C-OS9%20Sausage.webp', alt: 'ForzaSEAL® C-OS9' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Composites/TAC-735R%2022L%20and%20Aerosol.webp', alt: 'ForzaBOND® TAC-735R' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/OS2%20Cartridge.webp', alt: 'ForzaSEAL® OS2' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/OS10%20Cartridge.webp', alt: 'ForzaSEAL® OS10' },
    // Cycle 2
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Composites/TAC-738R%2022L%20and%20Aerosol.webp', alt: 'ForzaBOND® TAC-738R' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/OS20%20Sausage.webp', alt: 'ForzaSEAL® OS20' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Composites/TAC-739R%2022L%20and%20Aerosol.webp', alt: 'ForzaBOND® TAC-739R' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/OS31%20Cartridge.webp', alt: 'ForzaSEAL® OS31' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/OS25%20Cartridge.webp', alt: 'ForzaSEAL® OS25' },
    // Cycle 3
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Marine/MC722%20Canister.webp', alt: 'ForzaBOND® MC722' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/OS35%20Cartridge.webp', alt: 'ForzaSEAL® OS35' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Marine/MC723%20Canister%20and%20Aerosol.webp', alt: 'ForzaBOND® MC723' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/OS37%20Cartridge.webp', alt: 'ForzaSEAL® OS37' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/T305-%20Foam%20Tape.webp', alt: 'T305 (Foam Tape)' },
    // Cycle 4
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Marine/MC724%20Canister%20and%20Aerosol.webp', alt: 'ForzaBOND® MC724' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/OS61%20Cartridge.webp', alt: 'ForzaSEAL® OS61' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Marine/MC737%20Canister.webp', alt: 'ForzaBOND® MC737' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Construction/C-OS55%20Sausage.webp', alt: 'ForzaSEAL® C-OS55' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/T350-%20Thermal%20Break%20Tape.webp', alt: 'T350 (Thermal Break Tape)' },
    // Cycle 5
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Marine/MC741%20Canister.webp', alt: 'ForzaBOND® MC741' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/OS24%20Cartridge.webp', alt: 'ForzaSEAL® OS24' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/IC933%20Canister%20and%20Aerosol.webp', alt: 'ForzaBOND® IC933' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Construction/C-OS9%20Sausage.webp', alt: 'ForzaSEAL® C-OS9' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Construction/C-T500%20Tape.webp', alt: 'ForzaTAPE® C-T500' },
    // Cycle 6
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/IC946%20Canister%20and%20Aerosol.webp', alt: 'ForzaBOND® IC946' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/OS2%20Cartridge.webp', alt: 'ForzaSEAL® OS2' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/C130%20Drum.webp', alt: 'ForzaBOND® C130' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/OS20%20Sausage.webp', alt: 'ForzaSEAL® OS20' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/T900%20Butyl%20Tape.webp', alt: 'T900 (Butyl Tape)' },
    // Cycle 7
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/C150%201%20gal%20pail.webp', alt: 'ForzaBOND® C150' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/OS31%20Cartridge.webp', alt: 'ForzaSEAL® OS31' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/OA12%20Cartridge.webp', alt: 'ForzaBOND® OA12' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/OS35%20Cartridge.webp', alt: 'ForzaSEAL® OS35' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/FRP%203.5%20gal%20pail.webp', alt: 'FRP - Fiberglass Reinforced Plastic Adhesive' },
    // Cycle 8
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/C331%205%20gal%20Pail.webp', alt: 'ForzaBOND® C331' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/OS37%20Cartridge.webp', alt: 'ForzaSEAL® OS37' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/81-0389%205%20gal%20pail.webp', alt: '81-0389 - High Performance Contact Adhesive' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/OS61%20Cartridge.webp', alt: 'ForzaSEAL® OS61' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/T900%20Butyl%20Tape.webp', alt: 'T900 (Butyl Tape)' },
    // Cycle 9
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/S228%201%20gal%20pail.webp', alt: 'S228 - Adhesive Primer and Promoter' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Construction/C-OS55%20Sausage.webp', alt: 'ForzaSEAL® C-OS55' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/OSA%20tin%20can.webp', alt: 'OSA - Solvent Based Adhesive' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/OS24%20Cartridge.webp', alt: 'ForzaSEAL® OS24' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/T950%20FSK%20Bonding%20Tape.webp', alt: 'T950 (FSK Bonding Tape)' },
    // Cycle 10
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/OA13%20Cartridge.webp', alt: 'ForzaBOND® OA13' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Construction/C-OS9%20Sausage.webp', alt: 'ForzaSEAL® C-OS9' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/IC932%20Canister.webp', alt: 'ForzaBOND® IC932' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/OS2%20Cartridge.webp', alt: 'ForzaSEAL® OS2' },
    { src: 'https://jw4to4yw6mmciodr.public.blob.vercel-storage.com/product-images-web-optimized/Industrial/T970%20Foil%20Bonding%20Tape.webp', alt: 'T970 (Foil Bonding Tape)' }
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
