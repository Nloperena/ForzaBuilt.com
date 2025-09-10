import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/utils/products';
import { industries as industriesData } from '@/data/industries';
import { useGradientMode } from '@/contexts/GradientModeContext';

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
  const { mode } = useGradientMode();
  const productsData = getProducts();
  
  // Debug logging
  console.log('NavigationOverlay mode:', mode);
  
  const renderContent = () => {
    switch (activeContent) {
      case 'products':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Show main product categories instead of individual products */}
            <Link
              to="/products/bond"
              className={`group block p-6 rounded-lg transition-all duration-300 ${
                mode === 'light' || mode === 'light2' 
                  ? 'hover:bg-[#1B3764]/10' 
                  : 'hover:bg-white/10'
              }`}
              onClick={onClose}
            >
              <h3 
                className="text-xl font-semibold mb-2 group-hover:text-[#F2611D] transition-colors"
                style={{ color: mode === 'light' || mode === 'light2' ? '#1B3764' : 'white' }}
              >
                Industrial Adhesives
              </h3>
              <p 
                className="text-sm"
                style={{ color: mode === 'light' || mode === 'light2' ? 'rgba(27, 55, 100, 0.8)' : 'rgba(255, 255, 255, 0.8)' }}
              >
                High-performance bonding solutions for demanding industrial applications
              </p>
            </Link>
            <Link
              to="/products/seal"
              className={`group block p-6 rounded-lg transition-all duration-300 ${
                mode === 'light' || mode === 'light2' 
                  ? 'hover:bg-[#1B3764]/10' 
                  : 'hover:bg-white/10'
              }`}
              onClick={onClose}
            >
              <h3 
                className="text-xl font-semibold mb-2 group-hover:text-[#F2611D] transition-colors"
                style={{ color: mode === 'light' || mode === 'light2' ? '#1B3764' : 'white' }}
              >
                Industrial Sealants
              </h3>
              <p 
                className="text-sm"
                style={{ color: mode === 'light' || mode === 'light2' ? 'rgba(27, 55, 100, 0.8)' : 'rgba(255, 255, 255, 0.8)' }}
              >
                Advanced sealing solutions for leak prevention and environmental protection
              </p>
            </Link>
            <Link
              to="/products/tape"
              className={`group block p-6 rounded-lg transition-all duration-300 ${
                mode === 'light' || mode === 'light2' 
                  ? 'hover:bg-[#1B3764]/10' 
                  : 'hover:bg-white/10'
              }`}
              onClick={onClose}
            >
              <h3 
                className="text-xl font-semibold mb-2 group-hover:text-[#F2611D] transition-colors"
                style={{ color: mode === 'light' || mode === 'light2' ? '#1B3764' : 'white' }}
              >
                Industrial Tapes
              </h3>
              <p 
                className="text-sm"
                style={{ color: mode === 'light' || mode === 'light2' ? 'rgba(27, 55, 100, 0.8)' : 'rgba(255, 255, 255, 0.8)' }}
              >
                Specialized tapes for industrial applications and high-performance needs
              </p>
            </Link>
          </div>
        );

      case 'industries':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industriesData.map((industry) => (
              <Link
                key={industry.title}
                to={`/industries/${industry.title.toLowerCase().replace(/\s+/g, '-')}`}
                className={`group block p-6 rounded-lg transition-all duration-300 ${
                mode === 'light' || mode === 'light2' 
                  ? 'hover:bg-[#1B3764]/10' 
                  : 'hover:bg-white/10'
              }`}
                onClick={onClose}
              >
                <h3 
                  className="text-xl font-semibold mb-2 group-hover:text-[#F2611D] transition-colors"
                  style={{ color: mode === 'light' || mode === 'light2' ? '#1B3764' : 'white' }}
                >
                  {industry.title}
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: mode === 'light' || mode === 'light2' ? 'rgba(27, 55, 100, 0.8)' : 'rgba(255, 255, 255, 0.8)' }}
                >
                  {industry.description}
                </p>
              </Link>
            ))}
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
          className="global-nav-overlay fixed top-[72px] left-0 w-full bg-[#115B87] border-b border-white/20 z-40 shadow-2xl overflow-hidden"
          onMouseEnter={() => {}} // Keep overlay open
          onMouseLeave={onClose}
        >
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 
                  className="text-3xl font-bold mb-2 capitalize"
                  style={{ color: mode === 'light' || mode === 'light2' ? '#1B3764' : 'white' }}
                >
                  {activeContent}
                </h2>
                <p 
                  style={{ color: mode === 'light' || mode === 'light2' ? 'rgba(27, 55, 100, 0.8)' : 'rgba(255, 255, 255, 0.8)' }}
                >
                  Explore our {activeContent} and find the perfect solution for your needs.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="hover:text-[#F2611D]"
                style={{ color: mode === 'light' || mode === 'light2' ? '#1B3764' : 'white' }}
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