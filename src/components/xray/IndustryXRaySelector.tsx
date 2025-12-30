import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ImageOverlay from './ImageOverlay';

interface Product {
  id: string;
  name: string;
  imageUrl?: string;
  description?: string;
  sku?: string;
  thumb?: string;
}

export interface XRayOption {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  previewImage: string;
  svgSrc: string;
}

interface IndustryXRaySelectorProps {
  industry: string;
  options: XRayOption[];
}

const IndustryXRaySelector: React.FC<IndustryXRaySelectorProps> = ({ industry, options }) => {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(options.length > 0 ? options[0].id : null);
  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Helper function to get industry gradient
  const getIndustryGradient = (industryName: string) => {
    const industryLower = industryName.toLowerCase();
    
    switch (industryLower) {
      case 'marine':
        return 'from-[#137875] via-[#1b3764] to-[#1b3764]';
      case 'industrial':
        return 'from-[#f16a26] via-[#1b3764] to-[#1b3764]';
      case 'transportation':
        return 'from-[#b83d35] via-[#1b3764] to-[#1b3764]';
      case 'construction':
        return 'from-[#fec770] via-[#1b3764] to-[#1b3764]';
      case 'composites':
        return 'from-[#9a9b9c] via-[#1b3764] to-[#1b3764]';
      case 'insulation':
        return 'from-[#d0157d] via-[#1b3764] to-[#1b3764]';
      default:
        return 'from-[#1b3764] to-[#1b3764]';
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectedProduct || hoveredProduct) {
        const target = event.target as Node;
        const isInsideModal = modalRef.current?.contains(target);
        const isPath = target instanceof SVGPathElement || target instanceof SVGPolygonElement;
        
        if (!isInsideModal && !isPath) {
          handleCloseModal();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside, true);
    return () => document.removeEventListener('mousedown', handleClickOutside, true);
  }, [selectedProduct, hoveredProduct]);

  useEffect(() => {
    const handleScroll = () => {
      if (selectedProduct || hoveredProduct) {
        handleCloseModal();
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedProduct, hoveredProduct]);

  const handleProductHover = (product: Product | null) => {
    if (!selectedProduct) {
      setHoveredProduct(product);
    }
  };

  const handleProductSelect = (product: Product | null) => {
    setSelectedProduct(product);
    setHoveredProduct(null);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setHoveredProduct(null);
  };

  const displayProduct = selectedProduct || hoveredProduct;

  return (
    <section className="relative w-full bg-white overflow-visible">
      <div className="relative w-full">
        {/* Left: Thumbnails - centered to full section height */}
        <div className="absolute left-4 md:left-6 lg:left-8 2xl:left-12 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 md:gap-3 lg:gap-4">
          {options.map((option) => {
            const isSelected = selectedVariant === option.id;
            return (
              <motion.button
                key={option.id}
                onClick={() => {
                  setSelectedVariant(option.id);
                  handleCloseModal();
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  group flex items-center gap-2 md:gap-3 lg:gap-4 px-2 md:px-3 lg:px-4 2xl:px-5 py-2 md:py-2.5 lg:py-3 2xl:py-4 rounded-lg md:rounded-xl lg:rounded-2xl border transition-all duration-300 shadow-lg backdrop-blur-sm
                  w-40 md:w-48 lg:w-56 2xl:w-72
                  ${isSelected 
                    ? 'bg-[#33486c] border-[#33486c] text-white ring-2 ring-[#33486c]/20' 
                    : 'bg-gray-200/80 border-gray-300 text-[#1B3764] hover:bg-gray-100 hover:border-[#1B3764]/30'
                  }
                `}
              >
                <div className={`
                  w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 2xl:w-20 2xl:h-20 rounded-md md:rounded-lg lg:rounded-xl overflow-hidden flex-shrink-0 border
                  ${isSelected ? 'border-white/20' : 'border-gray-300'}
                `}>
                  <img 
                    src={option.previewImage} 
                    alt={option.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className={`font-semibold text-xs md:text-sm lg:text-base 2xl:text-lg leading-tight ${isSelected ? 'text-white' : 'text-[#1B3764]'}`}>
                    {option.title}
                  </p>
                  <p className={`text-[10px] md:text-xs lg:text-sm 2xl:text-base mt-0.5 ${isSelected ? 'text-white/70' : 'text-gray-500'}`}>
                    View Applications
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right: Product Modal - centered to full section height, aligned with thumbnails */}
        <AnimatePresence>
          {displayProduct && (
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group absolute right-4 md:right-6 lg:right-8 2xl:right-12 
                         top-1/2 -translate-y-1/2 lg:-mt-[8rem] 2xl:-mt-[12rem] z-50
                         w-44 md:w-52 lg:w-60 2xl:w-72
                         h-32 md:h-[340px]
                         overflow-hidden transition-all duration-500 hover:scale-[1.02] rounded-xl md:rounded-2xl bg-gradient-to-b from-[#477197] to-[#2c476e] border border-gray-200 hover:border-gray-300 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedProduct && (
                <button
                  onClick={handleCloseModal}
                  className="absolute top-1.5 right-1.5 md:top-2 md:right-2 lg:top-2.5 lg:right-2.5 p-0.5 md:p-1 text-white/70 hover:text-white rounded-full transition-colors z-30"
                >
                  <X className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                </button>
              )}

              {/* Desktop: Product Image - Larger with space for text */}
              {(displayProduct.thumb || displayProduct.imageUrl) && (
                <div className="absolute inset-0 hidden md:block pb-20" style={{ transform: 'translateY(-3%) scale(0.85)' }}>
                  <img
                    src={displayProduct.thumb || displayProduct.imageUrl}
                    alt={displayProduct.name}
                    className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105 opacity-100"
                  />
                </div>
              )}

              {/* Mobile: Horizontal layout with image and info */}
              <div className="flex md:hidden items-center gap-3 flex-1 p-3">
                {(displayProduct.thumb || displayProduct.imageUrl) && (
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-transparent relative flex items-center justify-center flex-shrink-0">
                    <img
                      src={displayProduct.thumb || displayProduct.imageUrl}
                      alt={displayProduct.name}
                      className="max-w-full max-h-full object-contain transition-opacity duration-500 opacity-100"
                    />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  {displayProduct.sku && (
                    <h3 className="text-xs font-kallisto font-bold mb-0.5 leading-tight line-clamp-1 text-white">
                      {displayProduct.sku}
                    </h3>
                  )}
                  <p className="text-[10px] text-white line-clamp-2">
                    {displayProduct.description}
                  </p>
                </div>
              </div>

              {/* Desktop: Content Section with title and description */}
              <div className="hidden md:block p-2.5 absolute bottom-0 left-0 right-0">
                <div className="space-y-0.5">
                  {displayProduct.sku && (
                    <h3 className="text-sm font-poppins font-bold leading-tight line-clamp-2 text-white">
                      {displayProduct.sku}
                    </h3>
                  )}
                  <p className="text-xs text-white line-clamp-2">
                    {displayProduct.description}
                  </p>
                  
                  {/* Button Row */}
                  <div className="flex gap-1.5 mt-2 pt-2">
                    {/* Details Button */}
                    <a
                      href={`/products/${displayProduct.category?.toLowerCase() || 'bond'}/${displayProduct.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 inline-flex items-center justify-center bg-[#F2611D] hover:bg-[#d9551a] text-white rounded-full px-2 py-1 text-xs font-medium transition-all duration-300"
                    >
                      Details
                    </a>
                  </div>
                </div>
              </div>

              {/* Mobile: Bottom buttons */}
              <div className="flex md:hidden items-center gap-2 p-3">
                <a
                  href={`/products/${displayProduct.category?.toLowerCase() || 'bond'}/${displayProduct.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full flex items-center justify-center bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full px-2 py-1 text-xs font-medium transition-all duration-300 border border-white/30"
                >
                  Details
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Header */}
        <div className="relative z-20 w-full px-4 sm:px-6 pt-16 pb-6 text-center">
          <div className="inline-block">
            <h2 
              className="font-poppins font-normal text-[#1B3764] mb-2"
              style={{ fontSize: 'clamp(22px, 2vw + 0.5rem, 44px)' }}
            >
              Products In Use
            </h2>
            <p 
              className="text-[#1B3764]/70 font-poppins max-w-2xl mx-auto"
              style={{ fontSize: 'clamp(0.875rem, 1.2vw + 0.25rem, 1.125rem)' }}
            >
              Cursor over or click to explore product application details
            </p>
          </div>
        </div>

        {/* X-Ray Display Area */}
        <div className="relative w-full aspect-[16/9] min-h-[600px]">
          <div className="absolute inset-0 w-full h-full z-0">
            {options.map((option) => (
              <div
                key={option.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                  selectedVariant === option.id ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <ImageOverlay
                  svgSrc={option.svgSrc}
                  title={option.title}
                  industry={industry}
                  activeProductId={selectedProduct?.id}
                  onProductHover={handleProductHover}
                  onProductSelect={handleProductSelect}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryXRaySelector;
