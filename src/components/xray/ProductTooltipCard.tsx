import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductTooltipCardProps {
  product: {
    sku: string;
    name: string;
    blurb: string;
    thumb: string;
  } | null;
  isVisible: boolean;
}

const ProductTooltipCard: React.FC<ProductTooltipCardProps> = ({ product, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && product && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed right-4 top-1/2 -translate-y-1/2 bg-[#D1D5DB] rounded-2xl p-4 md:p-6 shadow-2xl pointer-events-none z-40 w-80 md:w-96 lg:w-full lg:max-w-sm"
        >
          <div className="space-y-4 md:space-y-6">
            {/* Product Image */}
            <div className="flex justify-center">
              <img
                src={product.thumb}
                alt={product.name}
                className="w-40 h-40 md:w-56 md:h-56 object-contain"
              />
            </div>
            
            {/* Product Information */}
            <div className="space-y-3">
              <div className="text-center">
                <h3 className="font-bold text-xl md:text-2xl mb-2 text-[#1B3764]">
                  {product.sku}
                </h3>
                <p className="text-sm md:text-base text-[#1B3764] mb-3 leading-relaxed">
                  {product.name}
                </p>
                <p className="text-xs md:text-sm text-[#1B3764] leading-relaxed line-clamp-4">
                  {product.blurb}
                </p>
              </div>

              {/* Call to Action */}
              <div className="text-center pt-3 border-t border-[#1B3764]/20">
                <div className="text-xs text-[#1B3764]/70">
                  Click highlighted area for details
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductTooltipCard;

