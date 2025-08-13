import React from 'react';
import Header from '../components/Header';
import ProductsSection from '../components/ProductsSection';
import Footer from '../components/Footer';

/* COMMENTED OUT - OLD PRODUCTS PAGE CONTENT (for later restoration)
import OldProductsSection from '../components/OldProductsSection';
*/

const Products = () => {
  return (
    <div className="bg-[#1b3764] min-h-screen">
      <Header />
      {/* Top negative space to match Industries page */}
      <div className="h-16 sm:h-24 md:h-32 lg:h-40 xl:h-48" />
      {/* Using the homepage products component that shows 4 product categories */}
      <ProductsSection />
      
      {/* COMMENTED OUT - OLD PRODUCTS PAGE CONTENT (for later restoration)
      <OldProductsSection />
      */}
      
      <Footer />
    </div>
  );
};

export default Products; 