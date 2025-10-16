import React from 'react';

interface StickyComponentBackgroundSectionProps {
  stickyComponent: React.ReactNode;
  children?: React.ReactNode;
}

const StickyComponentBackgroundSection: React.FC<StickyComponentBackgroundSectionProps> = ({ 
  stickyComponent, 
  children 
}) => {
  return (
    <div className="relative">
      {/* Sticky Component Background Section */}
      <section className="sticky top-0 h-screen overflow-hidden">
        {/* Your component (e.g., InteractiveProductsSection) goes here */}
        <div className="absolute inset-0 w-full h-full">
          {stickyComponent}
        </div>
      </section>

      {/* Content that will slide over the sticky component background */}
      <div className="relative" style={{ zIndex: 20 }}>
        {children}
      </div>
    </div>
  );
};

export default StickyComponentBackgroundSection;

