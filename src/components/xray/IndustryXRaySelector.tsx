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
                    View Application
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
              className="absolute right-4 md:right-6 lg:right-8 2xl:right-12 
                         top-1/2 -translate-y-1/2 lg:-mt-[8rem] 2xl:-mt-[12rem] z-40
                         w-44 md:w-52 lg:w-60 2xl:w-72
                         bg-[#dbe1e8]/95 backdrop-blur-md shadow-2xl rounded-lg border border-white/20 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-2.5 md:p-3 lg:p-4 2xl:p-5 relative text-center">
                {selectedProduct && (
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-1.5 right-1.5 md:top-2 md:right-2 lg:top-2.5 lg:right-2.5 p-0.5 md:p-1 text-[#1B3764]/50 hover:text-[#1B3764] rounded-full transition-colors"
                  >
                    <X className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                  </button>
                )}

                <div className="flex flex-col items-center">
                  {(displayProduct.thumb || displayProduct.imageUrl) && (
                    <div className="w-full h-20 md:h-24 lg:h-28 2xl:h-36 mb-2 md:mb-2.5 lg:mb-3 flex items-center justify-center">
                      <img
                        src={displayProduct.thumb || displayProduct.imageUrl}
                        alt={displayProduct.name}
                        className="w-full h-full object-contain drop-shadow-lg"
                      />
                    </div>
                  )}

                  <div className="w-full space-y-0.5 mb-1.5 md:mb-2">
                    {displayProduct.sku && (
                      <h2 className="text-sm md:text-base lg:text-lg 2xl:text-xl font-bold text-[#1B3764] tracking-tight">
                        {displayProduct.sku}
                      </h2>
                    )}
                  </div>
                  
                  <p className="text-[9px] md:text-[10px] lg:text-xs 2xl:text-sm text-[#1B3764]/80 leading-relaxed mb-1.5 md:mb-2 lg:mb-2.5 px-0.5 line-clamp-3">
                    {displayProduct.description}
                  </p>

                  <div className="w-full h-px bg-[#1B3764]/20 mb-1.5 md:mb-2 lg:mb-2.5"></div>

                  <a
                    href={`/product/${displayProduct.id}`}
                    className="block w-full py-1.5 md:py-2 lg:py-2.5 text-center font-semibold text-white bg-[#F2611D] rounded hover:bg-[#F2611D]/90 transition-colors shadow-sm text-[10px] md:text-xs lg:text-sm"
                  >
                    View Product Details
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Header */}
        <div className="relative z-20 w-full px-4 sm:px-6 pt-16 pb-6 text-center">
          <div className="inline-block">
            <h2 
              className="font-poppins font-normal text-[#1B3764] mb-2"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
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
