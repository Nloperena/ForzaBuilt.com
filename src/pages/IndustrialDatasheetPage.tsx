import React from 'react';
import { IndustrialDatasheet } from '../components/IndustrialDatasheet';
import Header from '../components/Header';
import Footer from '../components/Footer';

const IndustrialDatasheetPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#115B87]">
      <Header />
      
      {/* Main Content */}
      <div className="py-8 pt-20">
        <IndustrialDatasheet />
      </div>

      <Footer />
    </div>
  );
};

export default IndustrialDatasheetPage; 