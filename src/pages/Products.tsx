import React, { useState } from 'react';
import HeaderV2 from '../components/Header/HeaderV2';
import InteractiveProductsSectionV5 from '../components/InteractiveProductsSectionV5';
import FooterV2 from '../components/FooterV2';
import IndustryHeroBanner from '../components/industries/IndustryHeroBanner';
import ProductQuickViewModal from '../components/industries/ProductQuickViewModal';
import ExperienceBetterBanner from '../components/ExperienceBetterBanner';
import { motion, AnimatePresence } from 'framer-motion';

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleProductSelect = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="bg-[#115B87] min-h-screen flex flex-col relative">
      <HeaderV2 />
      
      <AnimatePresence mode="wait">
        <motion.div
          key="products"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full relative"
        >
          {/* Hero Video Section - Full screen with title and subtitle overlay */}
          <div className="relative">
            <IndustryHeroBanner 
              videoUrl="/videos/backgrounds/Product Summary Page Video.mp4" 
              industryTitle="Our Products"
              variant="simple"
              useTitleCase={true}
              subtitle="We Offer The Best Performing And Widest Range Of Adhesive, Sealant, Specialty Tape, And Industrial Cleaning Solutions. If We Don't Have It, We'll Make It Custom For You." />
          </div>

          {/* Products Grid Section */}
          <div className="relative z-[30]">
            <InteractiveProductsSectionV5 />
          </div>

        </motion.div>
      </AnimatePresence>

      {/* Product Quick View Modal */}
      <ProductQuickViewModal 
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={closeModal}
      />

      {/* Performance Elevated Banner */}
      <ExperienceBetterBanner />
      
      {/* Footer */}
      <FooterV2 />
    </div>
  );
};

export default Products;
