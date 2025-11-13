import React from 'react';
import NewsletterSection from './NewsletterSection';
import FooterV2 from './FooterV2';
import LibrarySectionV3 from './LibrarySectionV3';
import RecentNewsArticlesSection from './RecentNewsArticlesSection';

interface StickyNewsletterSectionProps {
  children?: React.ReactNode;
}

const StickyNewsletterSection: React.FC<StickyNewsletterSectionProps> = ({ children }) => {
  return (
    <>
      {/* Newsletter and Footer Section - Seamlessly connected */}
      <div className="relative">
      <LibrarySectionV3 />
      <RecentNewsArticlesSection />
        <NewsletterSection />
     
        
        <FooterV2 />
      </div>
    </>
  );
};

export default StickyNewsletterSection;
