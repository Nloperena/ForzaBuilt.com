import Header from '@/components/Header';
import HeroOverlay from '@/components/HeroOverlay';
import HeroVideoSection from '@/components/HeroVideoSection';
import IndustriesSectionAlt from '@/components/IndustriesSectionAlt';
import ProductsSection from '@/components/ProductsSection';
import StickyBackgroundSection from '@/components/StickyBackgroundSection';
import ScrollSections from '@/components/ScrollSections';
import ServiceCardStack from '@/components/ServiceCardStack';
import StickyBackgroundSectionV2 from '@/components/StickyBackgroundSectionV2';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import ProductChemistriesSectionV2 from '@/components/ProductChemistriesSectionV2';
import IdealChemistrySection from '@/components/IdealChemistrySection';
import ProductChemistriesSection from '@/components/ProductChemistriesSection';
import ScienceTrianglesBackground from '@/components/common/ScienceTrianglesBackground';
import MultiScienceTrianglesBackground from '@/components/common/MultiScienceTrianglesBackground';
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
      <section className="relative">
        <ScienceTrianglesBackground 
          variant="small" 
          position="top-right" 
          opacity={0.61} 
          scale={0.6}
          blendMode="overlay"
        />
        <HeroOverlay />
      </section>
      
      {/* Hero Video Section */}
      <section className="relative">
        <ScienceTrianglesBackground 
          variant="small2" 
          position="bottom-left" 
          opacity={0.61} 
          scale={0.8}
          blendMode="overlay"
        />
        <HeroVideoSection />
      </section>
      
      {/* Industries Section (same as Industries page) */}
      <section className="relative">
        {/* Left Side Gradient Background (Mirrored) */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <img
            src="/Gradients and Triangles/Main Gradient.png"
            alt="Left Side Gradient Background"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-80 transform scale-x-[-1]"
            style={{ mixBlendMode: 'overlay' }}
          />
        </div>

        <ScienceTrianglesBackground 
          variant="small" 
          position="top-right" 
          opacity={0.61} 
          scale={0.8}
          blendMode="overlay"
        />
        <ScienceTrianglesBackground 
          variant="large" 
          position="bottom-left" 
          opacity={0.61} 
          scale={0.7}
          blendMode="overlay"
        />
        <IndustriesSectionAlt />
      </section>
      


      {/* Products Section */}
      <section className="relative">
        {/* Left Side Gradient Background */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <img
            src="/Gradients and Triangles/Main Gradient.png"
            alt="Left Side Gradient Background"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
            style={{ mixBlendMode: 'overlay' }}
          />
        </div>

        <ScienceTrianglesBackground 
          variant="small2" 
          position="top-right" 
          opacity={0.61} 
          scale={0.8}
          blendMode="overlay"
        />
        <ScienceTrianglesBackground 
          variant="large" 
          position="bottom-left" 
          opacity={0.61} 
          scale={0.9}
          blendMode="overlay"
        />
        <ProductsSection />
      </section>
      
      {/* Sticky Background Section */}
      <section className="relative">
        <ScienceTrianglesBackground 
          variant="large" 
          position="center" 
          opacity={0.61} 
          scale={1.2}
          blendMode="overlay"
        />
        <ScienceTrianglesBackground 
          variant="small" 
          position="top-left" 
          opacity={0.61} 
          scale={0.8}
          blendMode="overlay"
        />
        <StickyBackgroundSection />
      </section>

      {/* Scroll Stack Cards Section (Grid Layout: 3-2-3-2) */}
      <section className={`relative w-full bg-gradient-to-br from-[${brandColors.primary.blazeOrange.hex}] via-[${brandColors.secondary.rustyNailOrange.hex}] to-[${brandColors.primary.blazeOrange.hex}] text-white`}>
        <MultiScienceTrianglesBackground 
          elements={[
            {
              variant: 'small',
              position: 'top-left',
              opacity: 0.61,
              scale: 0.7,
              delay: 0,
              blendMode: 'overlay'
            },
            {
              variant: 'small2',
              position: 'bottom-right',
              opacity: 0.61,
              scale: 0.8,
              delay: 200,
              blendMode: 'overlay'
            }
          ]}
        />
        <ServiceCardStack />
      </section>
      


      {/* Scroll Sections with Chemistry Molecule - Desktop Only 
      {!isMobile && <ScrollSections />}*/}

      {/* Our Chemistries Section 
      <ProductChemistriesSectionV2 /> */}

      {/* Ideal Chemistry Section */}
      <section className="relative">
        <MultiScienceTrianglesBackground 
          elements={[
            {
              variant: 'small2',
              position: 'bottom-right',
              opacity: 0.61,
              scale: 0.8,
              delay: 0,
              blendMode: 'overlay'
            },
            {
              variant: 'small',
              position: 'top-left',
              opacity: 0.61,
              scale: 0.6,
              delay: 300,
              blendMode: 'overlay'
            },
            {
              variant: 'large',
              position: 'center',
              opacity: 0.61,
              scale: 0.5,
              delay: 600,
              blendMode: 'overlay'
            }
          ]}
        />
        <IdealChemistrySection />
      </section>

      

      

      {/* Pre-Made in America Spacer with Alternating Backgrounds */}
      <section className="relative py-10">
        <ScienceTrianglesBackground 
          variant="large" 
          position="top-left" 
          opacity={0.61} 
          scale={0.6}
          blendMode="overlay"
        />
        <ScienceTrianglesBackground 
          variant="small" 
          position="bottom-right" 
          opacity={0.61} 
          scale={0.6}
          blendMode="overlay"
        />
      </section>

      {/* Made in America Section */}
      <section className="relative">
        <StickyBackgroundSectionV2 />
      </section>
      

      
      {/* Newsletter Section - STANDALONE */}
      <div className="relative w-full">
        <ScienceTrianglesBackground 
          variant="small" 
          position="center" 
          opacity={0.61} 
          scale={0.9}
          blendMode="overlay"
        />
        <ScienceTrianglesBackground 
          variant="large" 
          position="top-right" 
          opacity={0.61} 
          scale={0.5}
          blendMode="overlay"
        />
        <NewsletterSection />
      </div>
      
      {/* Footer */}
      <section className="relative">
        <ScienceTrianglesBackground 
          variant="large" 
          position="bottom-right" 
          opacity={0.61} 
          scale={1.0}
          blendMode="overlay"
        />
        <Footer />
      </section>
    </div>
  );
};

export default Index;
