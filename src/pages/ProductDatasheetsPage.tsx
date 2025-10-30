import React from 'react';
import HeaderV2 from '@/components/Header/HeaderV2';
import Footer from '@/components/Footer';
import ProductDatasheetView from '@/components/ProductDatasheetView';

const ProductDatasheetsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#115B87] flex flex-col">
      <Header />
      <main className="flex-1 pt-20 pb-10">
        <ProductDatasheetView />
      </main>
      <Footer />
    </div>
  );
};

export default ProductDatasheetsPage; 