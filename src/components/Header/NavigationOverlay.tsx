import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { products as productsData } from '@/data/products';
import { industries as industriesData } from '@/data/industries';

interface NavigationOverlayProps {
  isOpen: boolean;
  activeContent: string | null;
  animationDirection: string;
  onClose: () => void;
  onContentChange: (content: string) => void;
}

const NavigationOverlay: React.FC<NavigationOverlayProps> = ({
  isOpen,
  activeContent,
  animationDirection,
  onClose,
  onContentChange,
}) => {
  const renderContent = () => {
    switch (activeContent) {
      case 'products':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsData.map((product) => (
              <Link
                key={product.name}
                to={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group block p-6 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300"
                onClick={onClose}
              >
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#F2611D] transition-colors">
                  {product.name}
                </h3>
                <p className="text-white/80 text-sm">{product.description}</p>
              </Link>
            ))}
          </div>
        );

      case 'industries':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industriesData.map((industry) => (
              <Link
                key={industry.title}
                to={`/industries/${industry.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="group block p-6 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300"
                onClick={onClose}
              >
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#F2611D] transition-colors">
                  {industry.title}
                </h3>
                <p className="text-white/80 text-sm">{industry.description}</p>
              </Link>
            ))}
          </div>
        );

      case 'tools':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/tools/product-selector"
              className="group block p-6 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300"
              onClick={onClose}
            >
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#F2611D] transition-colors">
                Product Selector
              </h3>
              <p className="text-white/80 text-sm">Find the perfect product for your application</p>
            </Link>
            <Link
              to="/tools/sealant-calculator"
              className="group block p-6 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300"
              onClick={onClose}
            >
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#F2611D] transition-colors">
                Sealant Calculator
              </h3>
              <p className="text-white/80 text-sm">Calculate sealant requirements for your project</p>
            </Link>
            <Link
              to="/tools/compatibility"
              className="group block p-6 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300"
              onClick={onClose}
            >
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#F2611D] transition-colors">
                Compatibility Checker
              </h3>
              <p className="text-white/80 text-sm">Check product compatibility</p>
            </Link>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="global-nav-overlay fixed top-[72px] left-0 w-full bg-[#1b3764] backdrop-blur-sm bg-opacity-90 z-40 shadow-xl overflow-hidden"
          onMouseEnter={() => {}} // Keep overlay open
          onMouseLeave={onClose}
        >
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2 capitalize">
                  {activeContent}
                </h2>
                <p className="text-white/80">
                  Explore our {activeContent} and find the perfect solution for your needs.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:text-[#F2611D]"
              >
                ✕
              </Button>
            </div>
            {renderContent()}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavigationOverlay; 