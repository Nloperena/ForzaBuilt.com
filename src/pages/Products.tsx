import React from 'react';
import Header from '../components/Header';
import ProductsSection from '../components/ProductsSection';
import Footer from '../components/Footer';

const Products = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Matches homepage and industry page aesthetic */}
      <section className="relative bg-white pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 leading-tight text-[#293350] font-poppins">
              Our Products
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-gray-600 font-poppins max-w-3xl mx-auto">
              We offer the best performing and widest range of adhesive, sealant, specialty tape, and industrial cleaning solutions, including customization and environmentally friendly technologies. If we don't have it, we'll make it custom for you!
            </p>
          </div>
        </div>
      </section>

      {/* Using the homepage products component that shows 4 product categories */}
      <ProductsSection />
      
      <Footer />
    </div>
  );
};

export default Products;
