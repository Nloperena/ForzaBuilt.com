import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import IndustriesSectionAlt from '../components/IndustriesSectionAlt';
import Footer from '../components/Footer';
// Removed Explore by Product Category section and its dependencies

// Removed Explore by Product Category row component

const Industries = () => {
  return (
    <div className="bg-[#115B87] min-h-screen">
      <Header />
      <div className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24" />
      <IndustriesSectionAlt />
      
      {/* Spacer above footer */}
      <div className="py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16"></div>
      
      <Footer />
    </div>
  );
};

export default Industries; 