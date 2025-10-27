import React from 'react';
import NewsletterSection from './NewsletterSection';
import Footer from './Footer';
import LibrarySection from './LibrarySection';

interface StickyNewsletterSectionProps {
  children?: React.ReactNode;
}

const StickyNewsletterSection: React.FC<StickyNewsletterSectionProps> = ({ children }) => {
  return (
    <>
      {/* Newsletter and Footer Section - Seamlessly connected */}
      <div className="relative">
        <NewsletterSection />
        <LibrarySection />
        <Footer />
      </div>
    </>
  );
};

export default StickyNewsletterSection;
