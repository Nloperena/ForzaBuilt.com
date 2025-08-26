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

// Lazy load heavy components
const ServiceCardStack = lazy(() => import('@/components/ServiceCardStack'));
const IdealChemistrySection = lazy(() => import('@/components/IdealChemistrySection'));

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
      <section className="relative">
        {/* Optimized Gradient Background */}
        <OptimizedGradient variant="left" opacity={0.8} />

        <ScienceTrianglesBackground 
          variant="small2" 
          position="top-right" 
          opacity={0.61} 
          scale={0.6}
          blendMode="overlay"
        />
        <ScienceTrianglesBackground 
          variant="large" 
          position="bottom-left" 
          opacity={0.61} 
          scale={0.7}
          blendMode="overlay"
        />
        <ProductsSection />
      </section>
      
      {/* Sticky Background Section */}
      <section className="relative">
        <StickyBackgroundSection />
      </section>

      {/* Scroll Stack Cards Section (Grid Layout: 3-2-3-2) */}
      <section className={`relative w-full bg-gradient-to-br from-[${brandColors.primary.blazeOrange.hex}] via-[${brandColors.secondary.rustyNailOrange.hex}] to-[${brandColors.primary.blazeOrange.hex}] text-white`}>
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
      </section>
      


      {/* Scroll Sections with Chemistry Molecule - Desktop Only 
      {!isMobile && <ScrollSections />}*/}

      {/* Our Chemistries Section 
      <ProductChemistriesSectionV2 /> */}

      {/* Ideal Chemistry Section */}
      <Suspense fallback={
        <div className="min-h-[300px] flex items-center justify-center bg-gradient-to-br from-[#1B3764] to-[#2C5F8A]">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg">Loading Chemistry Section...</p>
          </div>
        </div>
      }>
        <IdealChemistrySection />
      </Suspense>

      

      

      {/* Pre-Made in America Spacer with Alternating Backgrounds */}
      <section className="relative py-10">
      </section>

      {/* Made in America Section */}
      <section className="relative">
        <StickyBackgroundSectionV2 />
      </section>
      

      
      {/* Newsletter Section - STANDALONE */}
      <div className="relative w-full">
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
