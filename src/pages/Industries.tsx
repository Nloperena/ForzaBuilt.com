import React from 'react';
import IndustriesSectionAlt from '../components/IndustriesSectionAlt';
import Footer from '../components/Footer';

const Industries = () => {
  return (
    <div className="bg-[#1b3764] min-h-screen">
      <IndustriesSectionAlt />
      {/* Placeholder for more detailed industry content */}
      <section className="py-20 bg-white text-[#1b3764]">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">Explore Industry Solutions</h3>
          <p className="text-lg mb-8">Select an industry above to learn more about our specialized solutions, case studies, and product recommendations for your sector.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Industries; 