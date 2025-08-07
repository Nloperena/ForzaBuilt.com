import Header from '@/components/Header';
import HeroOverlay from '@/components/HeroOverlay';
import HeroVideoSection from '@/components/HeroVideoSection';
import { IndustriesCarouselSectionV4 as IndustriesCarouselSection } from '@/components/IndustriesCarouselSection';
import ProductsSection from '@/components/ProductsSection';
import StickyBackgroundSection from '@/components/StickyBackgroundSection';
import ScrollSections from '@/components/ScrollSections';

import InteractiveBuildingMap from '@/components/InteractiveBuildingMap';
import ServiceCardStack from '@/components/ServiceCardStack';
import { ServiceCardData } from '@/types/ServiceCard';
import StickyBackgroundSectionV2 from '@/components/StickyBackgroundSectionV2';
import TestimonialsSection from '@/components/TestimonialsSection';
import FaqSection from '@/components/FaqSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import ProductChemistriesSection from '@/components/ProductChemistriesSection';
import { useIsMobile } from '@/hooks/use-mobile';
import DynamicMetaTags from '@/components/DynamicMetaTags';

const Index = () => {
  const isMobile = useIsMobile();
  
  /**
   * Sample card data for demonstration
   * In a real CMS implementation, this would come from:
   * - API calls to headless CMS
   * - GraphQL queries
   * - Database queries
   * - Static site generation from CMS data
   */
  const sampleCards: ServiceCardData[] = [
    {
      id: 'premium-construction',
      title: 'Premium Construction',
      icon: '🏗️',
      features: [
        'Luxury project management',
        'Premium materials sourcing',
        'White-glove service delivery'
      ],
      buttonText: 'Start premium project',
      technologies: ['Autodesk Suite', 'BIM 360', 'Procore'],
      supportedTech: ['4D Modeling', 'IoT Sensors', 'Drone Mapping', 'AI Planning'],
      specialties: ['Luxury Residential', 'High-rise Commercial', 'Smart Buildings', 'Sustainable Design']
    },
    {
      id: 'modern-architecture',
      title: 'Modern Architecture',
      icon: '🏛️',
      features: [
        'Cutting-edge design solutions',
        'Smart building integration',
        'Environmental sustainability focus'
      ],
      buttonText: 'Design now',
      model: 'Neo-Futuristic',
      modelDesc: 'Forward-thinking design with smart technology',
      storyPrompt: 'Describe your vision for the future.',
      storyText: 'Step into tomorrow with architecture that seamlessly blends form, function, and technology. Smart glass panels automatically adjust to optimize natural lighting while integrated IoT systems learn your preferences. Living walls purify the air as solar panels power your daily life. This is architecture that doesn\'t just shelter—it enhances, protects, and inspires.'
    }
  ];

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
      
      {/* Scroll Sections with Chemistry Molecule - Desktop Only */}
      {!isMobile && <ScrollSections />}

      {/* Our Chemistries Section */}
      <ProductChemistriesSection />



      {/* First service card stack with default data */}
    

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
