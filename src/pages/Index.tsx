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
      <WhyChooseSection />
      <TrustedBySection />

      {/* Main Content - Card Stack */}
      <ServiceCardStack />

      {/* Bottom Placeholder Components */}
      <CallToActionSection />
      <FooterSection />

      {/* Spacer to allow scrolling */}
      <div style={{ height: `${(3 + 5) * window.innerHeight}px` }} />
    </div>
  );
};

export default Index;
