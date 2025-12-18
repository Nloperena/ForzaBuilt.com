import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { getIndustryLogo, toTitleCase } from '../../utils/industryHelpers';

interface Product {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  category?: string;
  industry?: string[];
}

interface ProductQuickViewModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
}

const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({ isOpen, product, onClose }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-gradient-to-r from-[#477197] to-[#2c476e] rounded-2xl md:rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Industry Badge */}
              <div className="mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-base font-bold uppercase tracking-wide bg-transparent text-white">
                  {getIndustryLogo(product.industry?.[0] || '') ? (
                    <img 
                      src={getIndustryLogo(product.industry?.[0] || '')} 
                      alt={`${product.industry?.[0] || ''} icon`}
                      className="h-8 w-8 object-contain"
                    />
                  ) : (
                    <span className="capitalize">{product.industry?.[0]?.charAt(0) || ''}</span>
                  )}
                  <span className="capitalize">{product.industry?.[0] || ''}</span>
                </div>
              </div>
              
              {/* Product Image */}
              <div className="mb-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-64 object-contain"
                />
              </div>
              
              {/* Product Info */}
              <div className="space-y-3">
                <h3 className="text-xl font-poppins font-bold text-white">
                  {product.name}
                </h3>
                
                <p className="text-sm text-white">
                  {toTitleCase(product.description || '')}
                </p>
                
                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Link
                    to={`/products/${product.category?.toLowerCase() || 'bond'}/${product.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#F2611D] hover:bg-[#d9551a] text-white rounded-full px-4 md:px-5 py-2 md:py-2.5 text-xs sm:text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <span>Product Details</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductQuickViewModal;

