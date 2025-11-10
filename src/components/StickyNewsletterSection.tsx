import React from 'react';
import NewsletterSection from './NewsletterSection';
import FooterV2 from './FooterV2';
import LibrarySectionV2 from './LibrarySectionV2';

interface StickyNewsletterSectionProps {
  children?: React.ReactNode;
}

const StickyNewsletterSection: React.FC<StickyNewsletterSectionProps> = ({ children }) => {
  return (
    <>
      {/* Newsletter and Footer Section - Seamlessly connected */}
      <div className="relative">
      <LibrarySectionV2 />
        <NewsletterSection />
     
        
        <FooterV2 />
      </div>
    </>
  );
};

export default StickyNewsletterSection;
