
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import TrustedBySection from '@/components/TrustedBySection';
import ServiceCardStack from '@/components/ServiceCardStack';
import CallToActionSection from '@/components/CallToActionSection';
import FooterSection from '@/components/FooterSection';

const Index = () => {
  return (
    <div className="relative">
      <Header />
      
      {/* Top Placeholder Components */}
      <HeroSection />
      <ServiceCardStack />
      <WhyChooseSection />
      <TrustedBySection />

      {/* Main Content - Card Stacks */}
      <ServiceCardStack />
      

      {/* Bottom Placeholder Components */}
      <CallToActionSection />
      <FooterSection />
    </div>
  );
};

export default Index;
