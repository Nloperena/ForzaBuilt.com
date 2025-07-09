import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductTooltipProps {
  product: {
    sku: string;
    name: string;
    blurb: string;
    url: string;
    thumb: string;
  };
  isPinned?: boolean;
  onClose?: () => void;
}

const ProductTooltip: React.FC<ProductTooltipProps> = ({ 
  product, 
  isPinned = false, 
  onClose 
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className={`
          absolute z-50 pointer-events-auto
          ${isPinned 
            ? 'bottom-4 right-4 left-4 md:left-auto md:w-72' 
            : 'bottom-4 right-4 w-64 hidden md:block'
          }
        `}
        initial={{ y: 20, scale: 0.9 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, scale: 0.9 }}
        transition={{ type: "spring", duration: 0.3 }}
      >
        <div className="overflow-hidden shadow-xl border-2 bg-white/95 backdrop-blur-sm rounded-lg group">
          <div className="relative w-full aspect-[4/3]">
            {/* Background Image */}
            <img 
              src={product.thumb}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Close Button for Pinned State */}
            {isPinned && onClose && (
              <button
                onClick={onClose}
                className="absolute top-1.5 right-1.5 h-5 w-5 p-0 bg-black/20 hover:bg-black/40 text-white border border-white/20 backdrop-blur-sm z-10 rounded-full flex items-center justify-center"
                aria-label="Close product details"
              >
                <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            
            {/* Content Overlay */}
            <div className="absolute inset-0 p-3 flex flex-col justify-end text-white">
              <div className="space-y-1">
                <h3 className="font-semibold text-base leading-tight line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-xs text-white/60">
                  SKU: {product.sku}
                </p>
                
                <div className="flex gap-1.5 mt-2">
                  <a 
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm rounded px-2 py-1.5 text-xs font-medium text-center flex items-center justify-center gap-1 transition-colors"
                  >
                    View Product
                    <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  
                  {!isPinned && (
                    <button 
                      onClick={() => {/* Add to favorites logic */}}
                      className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm rounded px-2 py-1.5 text-xs font-medium transition-colors"
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile-specific tap instruction */}
        {!isPinned && (
          <motion.p
            className="md:hidden text-xs text-gray-600 text-center mt-2 px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Tap the highlighted area to pin this product card
          </motion.p>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductTooltip; 