import React from 'react';
import NewsletterSection from './NewsletterSection';
import Footer from './Footer';

interface StickyNewsletterSectionProps {
  children?: React.ReactNode;
}

const StickyNewsletterSection: React.FC<StickyNewsletterSectionProps> = ({ children }) => {
  return (
    <>
      {/* Newsletter and Footer Section - Seamlessly connected */}
      <div className="relative">
        <NewsletterSection />
        <Footer />
      </div>
    </>
  );
};

export default StickyNewsletterSection;
