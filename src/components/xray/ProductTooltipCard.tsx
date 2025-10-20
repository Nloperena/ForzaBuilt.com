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
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-8 right-8 bg-[#D1D5DB] rounded-xl p-6 shadow-2xl pointer-events-none z-[9999] w-96"
        >
          <div className="space-y-6">
            {/* Large Product Image - Focal Point */}
            <div className="flex justify-center">
              <img
                src={product.thumb}
                alt={product.name}
                className="w-64 h-64 object-contain rounded-lg"
              />
            </div>
            
            {/* Product Information */}
            <div className="space-y-3">
              <div className="text-center">
                <h3 className="font-bold text-2xl mb-2 text-[#1B3764]">
                  {product.sku}
                </h3>
                <p className="text-base text-[#1B3764] mb-3 leading-relaxed">
                  {product.name}
                </p>
                <p className="text-sm text-[#1B3764] leading-relaxed line-clamp-3">
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

