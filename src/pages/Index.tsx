import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import TrustedBySection from '@/components/TrustedBySection';
import ServiceCardStack from '@/components/ServiceCardStack';
import CallToActionSection from '@/components/CallToActionSection';
import FooterSection from '@/components/FooterSection';
import { ServiceCardData } from '@/types/ServiceCard';

const Index = () => {
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
      <Header />
      
      {/* Hero section */}
      <HeroSection />
      
      {/* First service card stack with default data */}
      <ServiceCardStack />
      
      {/* Other sections */}
      <WhyChooseSection />
      <TrustedBySection />

      {/* Second service card stack with custom data */}
      <ServiceCardStack 
        cards={sampleCards} 
        className="bg-gradient-to-b from-slate-50 to-white"
      />

      {/* Footer sections */}
      <CallToActionSection />
      <FooterSection />
    </div>
  );
};

export default Index;
