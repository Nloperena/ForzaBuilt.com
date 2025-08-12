import React from 'react';
import Header from '../components/Header';
import ProductsSection from '../components/ProductsSection';
import Footer from '../components/Footer';

/* COMMENTED OUT - OLD PRODUCTS PAGE CONTENT (for later restoration)
import OldProductsSection from '../components/OldProductsSection';
*/

const Products = () => {
  return (
    <div className="min-h-screen">
      <Header />
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