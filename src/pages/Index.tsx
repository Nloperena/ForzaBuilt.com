import Header from '@/components/Header';
import HeroOverlay from '@/components/HeroOverlay';
import HeroVideoSection from '@/components/HeroVideoSection';
import { IndustriesCarouselSectionV4 as IndustriesCarouselSection } from '@/components/IndustriesCarouselSection';
import ProductsSection from '@/components/ProductsSection';
import StickyBackgroundSection from '@/components/StickyBackgroundSection';
import ScrollSections from '@/components/ScrollSections';
import ServiceCardStack from '@/components/ServiceCardStack';
import StickyBackgroundSectionV2 from '@/components/StickyBackgroundSectionV2';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqSection from '@/components/FaqSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import ProductChemistriesSectionV2 from '@/components/ProductChemistriesSectionV2';
import { useIsMobile } from '@/hooks/use-mobile';
import DynamicMetaTags from '@/components/DynamicMetaTags';
import { getCardsByIndustry } from '@/data/stackableCardsData';
import { getIndustryGradient } from '@/styles/brandStandards';
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
      
      {/* Industries Section */}
      <IndustriesCarouselSection />
      
      {/* Products Section */}
      <ProductsSection />
      
      {/* Sticky Background Section */}
      <StickyBackgroundSection />

      {/* Scroll Stack Cards Section (Grid Layout: 3-2-3-2) */}
      <section className="relative w-full bg-gradient-to-br from-[#f16a26] via-[#D35127] to-[#f16a26] text-white">
        <ServiceCardStack />
      </section>
      
      {/* Scroll Sections with Chemistry Molecule - Desktop Only */}
      {!isMobile && <ScrollSections />}

      {/* Our Chemistries Section */}
      <ProductChemistriesSectionV2 />

      {/* Chemistry Types Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#1b3764] to-[#0f2a4a] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-kallisto font-black mb-6 text-white leading-none">
              IDEAL CHEMISTRY FOR YOUR SPECIFIC APPLICATION
            </h2>
          </div>
          
          {/* Chemistry Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {/* Acrylic Card */}
            <div className="bg-gradient-to-br from-[#2a4a7a] to-[#1b3764] rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
              <div className="flex flex-col h-full">
                {/* Top - Image */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-32 h-32 md:w-40 md:h-40">
                    <img 
                      src="/product-images/t215.png" 
                      alt="Acrylic PSA Tape" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                {/* Middle - Info */}
                <div className="flex-1 space-y-4 mb-6">
                  <h3 className="text-xl md:text-2xl font-kallisto font-bold text-white text-center">
                    Acrylic (incl. PSA)
                  </h3>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    <span className="bg-[#4a7cba]/30 text-[#a8c4f0] px-3 py-1 rounded-full text-sm font-medium">
                      Durable
                    </span>
                    <span className="bg-[#4a7cba]/30 text-[#a8c4f0] px-3 py-1 rounded-full text-sm font-medium">
                      Good UV/Weather Resistance
                    </span>
                    <span className="bg-[#4a7cba]/30 text-[#a8c4f0] px-3 py-1 rounded-full text-sm font-medium">
                      Flexible
                    </span>
                  </div>
                  
                  {/* Description */}
                  <div className="text-white/90 space-y-2 text-sm md:text-base">
                    <p>• Best For metals, glass, plastics, rubber</p>
                    <p>• High/low temperature tolerant</p>
                    <p>• Moisture, UV-resistant</p>
                    <p>• Quick handling & fast strength</p>
                  </div>
                </div>
                
                {/* Bottom - Products & Button */}
                <div className="mt-auto pt-4">
                  <p className="text-white/80 text-sm md:text-base mb-3 text-center">
                    <strong>Products:</strong> ForzaTAPE T215, ForzaTAPE T220, ForzaTAPE T446
                  </p>
                  <div className="flex justify-center">
                    <button className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                      See Products
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Epoxy Card */}
            <div className="bg-gradient-to-br from-[#2a4a7a] to-[#1b3764] rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
              <div className="flex flex-col h-full">
                {/* Top - Image */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-32 h-32 md:w-40 md:h-40">
                    <img 
                      src="/product-images/r160.png" 
                      alt="Epoxy Adhesive" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                {/* Middle - Info */}
                <div className="flex-1 space-y-4 mb-6">
                  <h3 className="text-xl md:text-2xl font-kallisto font-bold text-white text-center">
                    Epoxy
                  </h3>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    <span className="bg-[#4a7cba]/30 text-[#a8c4f0] px-3 py-1 rounded-full text-sm font-medium">
                      High Strength & Durability
                    </span>
                    <span className="bg-[#4a7cba]/30 text-[#a8c4f0] px-3 py-1 rounded-full text-sm font-medium">
                      Rigid
                    </span>
                    <span className="bg-[#4a7cba]/30 text-[#a8c4f0] px-3 py-1 rounded-full text-sm font-medium">
                      Excellent Chemical Resistance
                    </span>
                  </div>
                  
                  {/* Description */}
                  <div className="text-white/90 space-y-2 text-sm md:text-base">
                    <p>• Best for metals, composites, concrete, wood, plastics</p>
                    <p>• High/low temperatures, minimal flex</p>
                    <p>• Slow to moderate cure time</p>
                  </div>
                </div>
                
                {/* Bottom - Products & Button */}
                <div className="mt-auto pt-4">
                  <p className="text-white/80 text-sm md:text-base mb-3 text-center">
                    <strong>Products:</strong> ForzaBOND R160
                  </p>
                  <div className="flex justify-center">
                    <button className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                      See Products
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modified Epoxies Card */}
            <div className="bg-gradient-to-br from-[#2a4a7a] to-[#1b3764] rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl">
              <div className="flex flex-col h-full">
                {/* Top - Image */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-32 h-32 md:w-40 md:h-40">
                    <img 
                      src="/product-images/r221.png" 
                      alt="Modified Epoxy Adhesive" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                {/* Middle - Info */}
                <div className="flex-1 space-y-4 mb-6">
                  <h3 className="text-xl md:text-2xl font-kallisto font-bold text-white text-center">
                    Modified Epoxies
                  </h3>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    <span className="bg-[#4a7cba]/30 text-[#a8c4f0] px-3 py-1 rounded-full text-sm font-medium">
                      Combines Epoxy Strength
                    </span>
                    <span className="bg-[#4a7cba]/30 text-[#a8c4f0] px-3 py-1 rounded-full text-sm font-medium">
                      Improved Flexibility & Speed
                    </span>
                  </div>
                  
                  {/* Description */}
                  <div className="text-white/90 space-y-2 text-sm md:text-base">
                    <p>• Best for metals, composites needing more flexibility or peel strength</p>
                  </div>
                </div>
                
                {/* Bottom - Products & Button */}
                <div className="mt-auto pt-4">
                  <p className="text-white/80 text-sm md:text-base mb-3 text-center">
                    <strong>Products:</strong> ForzaBOND R221, ForzaBOND R220
                  </p>
                  <div className="flex justify-center">
                    <button className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                      See Products
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>





      {/* Made in America Section */}
      <StickyBackgroundSectionV2 />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* FAQ Section */}
      <FaqSection />
      
      {/* Newsletter Section */}
      <NewsletterSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
