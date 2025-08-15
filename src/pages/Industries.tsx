import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import IndustriesSectionAlt from '../components/IndustriesSectionAlt';
import Footer from '../components/Footer';
// Removed Explore by Product Category section and its dependencies

// Removed Explore by Product Category row component

const Industries = () => {
  return (
    <div className="bg-[#1b3764] min-h-screen">
      <Header />
      <IndustriesSectionAlt />
      
      <Footer />
    </div>
  );
};

export default Industries; 