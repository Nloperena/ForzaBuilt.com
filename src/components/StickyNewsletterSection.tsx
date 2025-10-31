import React from 'react';
import NewsletterSection from './NewsletterSection';
import FooterV2 from './FooterV2';
import LibrarySection from './LibrarySection';

interface StickyNewsletterSectionProps {
  children?: React.ReactNode;
}

const StickyNewsletterSection: React.FC<StickyNewsletterSectionProps> = ({ children }) => {
  return (
    <>
      {/* Newsletter and Footer Section - Seamlessly connected */}
      <div className="relative">
      <LibrarySection />
        <NewsletterSection />
     
        
        <FooterV2 />
      </div>
    </>
  );
};

export default StickyNewsletterSection;
