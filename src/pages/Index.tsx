import Header from '@/components/Header';
import HeroOverlay from '@/components/HeroOverlay';
import HeroVideoSection from '@/components/HeroVideoSection';
import IndustriesSectionAlt from '@/components/IndustriesSectionAlt';
import ProductsSection from '@/components/ProductsSection';
import StickyBackgroundSection from '@/components/StickyBackgroundSection';
import ScrollSections from '@/components/ScrollSections';
import ServiceCardStack from '@/components/ServiceCardStack';
import StickyBackgroundSectionV2 from '@/components/StickyBackgroundSectionV2';
import ThirtyYearsTrustSection from '@/components/ThirtyYearsTrustSection';
import ShinyFaqSection from '@/components/ShinyFaqSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import ProductChemistriesSectionV2 from '@/components/ProductChemistriesSectionV2';
import IdealChemistrySection from '@/components/IdealChemistrySection';
import { useIsMobile } from '@/hooks/use-mobile';
import DynamicMetaTags from '@/components/DynamicMetaTags';
import { getCardsByIndustry } from '@/data/stackableCardsData';
import { brandColors, getIndustryGradient } from '@/styles/brandStandards';
import type { ServiceCardData } from '@/types/ServiceCard';

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
      <HeroOverlay />
      
      {/* Hero Video Section */}
      <HeroVideoSection />
      
      {/* Industries Section (same as Industries page) */}
      <IndustriesSectionAlt />
      
      {/* Products Section */}
      <ProductsSection />
      
      {/* Sticky Background Section */}
      <StickyBackgroundSection />

      {/* Scroll Stack Cards Section (Grid Layout: 3-2-3-2) */}
      <section className={`relative w-full bg-gradient-to-br from-[${brandColors.primary.blazeOrange.hex}] via-[${brandColors.secondary.rustyNailOrange.hex}] to-[${brandColors.primary.blazeOrange.hex}] text-white`}>
        <ServiceCardStack />
      </section>
      
      {/* Scroll Sections with Chemistry Molecule - Desktop Only 
      {!isMobile && <ScrollSections />}*/}

      {/* Our Chemistries Section 
      <ProductChemistriesSectionV2 /> */}

      {/* Ideal Chemistry Section */}
      <IdealChemistrySection />

      {/* Made in America Section */}
      <StickyBackgroundSectionV2 />
      
      {/* Trust Building Section - 30 Years Badge - STANDALONE */}
      <div className="relative w-full">
        <ThirtyYearsTrustSection />
      </div>
      
      {/* FAQ Section (shiny glassmorphic) - STANDALONE */}
      <div className="relative w-full">
        <ShinyFaqSection />
      </div>
      
      {/* Newsletter Section - STANDALONE */}
      <div className="relative w-full">
        <NewsletterSection />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
