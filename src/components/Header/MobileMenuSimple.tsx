import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGradientMode } from '@/contexts/GradientModeContext';
import { getProducts } from '@/utils/products';
import { industries as industriesData } from '@/data/industries';
import SearchBar from './SearchBar';

interface MobileMenuSimpleProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenuSimple: React.FC<MobileMenuSimpleProps> = ({
  isOpen,
  onClose,
}) => {
  const { mode } = useGradientMode();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Use blue logo for light modes, regular logo for dark modes
  const logoSrc = mode === 'light' || mode === 'light2' 
    ? '/logos/forza-logo-blue.svg' 
    : '/logos/forza-logo-full.png';
  
  // Main navigation matching desktop
  const navigation = [
    { name: 'Products', href: '/products', hasSubmenu: true },
    { name: 'Industries', href: '/industries', hasSubmenu: true },
    { name: 'About', href: '/about', hasSubmenu: false },
    { name: 'Blog', href: '/blog', hasSubmenu: false },
  ];

  const productsData = getProducts();

  const renderProductsContent = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#1B3764] mb-3">Product Categories</h3>
      <div className="grid grid-cols-2 gap-3">
        <Link
          to="/products/bond"
          onClick={onClose}
          className="flex flex-col items-center p-4 bg-[#1B3764]/5 hover:bg-[#1B3764]/10 rounded-xl transition-all duration-200 border border-[#1B3764]/10"
        >
          <img 
            src={mode === 'light' || mode === 'light2' ? '/logos/forza-bond-mb-color.svg' : '/products/brand-logos/product-line-brands-white-bond.svg'} 
            alt="Industrial Adhesives" 
            className="h-12 w-auto mb-2"
          />
          <span className="text-sm font-medium text-[#1B3764] text-center">Adhesives</span>
        </Link>
        <Link
          to="/products/seal"
          onClick={onClose}
          className="flex flex-col items-center p-4 bg-[#1B3764]/5 hover:bg-[#1B3764]/10 rounded-xl transition-all duration-200 border border-[#1B3764]/10"
        >
          <img 
            src={mode === 'light' || mode === 'light2' ? '/logos/forza-seal-mb-color.svg' : '/products/brand-logos/product-line-brands-white-seal.svg'} 
            alt="Industrial Sealants" 
            className="h-12 w-auto mb-2"
          />
          <span className="text-sm font-medium text-[#1B3764] text-center">Sealants</span>
        </Link>
        <Link
          to="/products/tape"
          onClick={onClose}
          className="flex flex-col items-center p-4 bg-[#1B3764]/5 hover:bg-[#1B3764]/10 rounded-xl transition-all duration-200 border border-[#1B3764]/10"
        >
          <img 
            src={mode === 'light' || mode === 'light2' ? '/logos/forza-tape-mb-color.svg' : '/products/brand-logos/product-line-brands-white-tape.svg'} 
            alt="Industrial Tapes" 
            className="h-12 w-auto mb-2"
          />
          <span className="text-sm font-medium text-[#1B3764] text-center">Tapes</span>
        </Link>
        <Link
          to="/products/ruggedred"
          onClick={onClose}
          className="flex flex-col items-center p-4 bg-[#1B3764]/5 hover:bg-[#1B3764]/10 rounded-xl transition-all duration-200 border border-[#1B3764]/10"
        >
          <img 
            src="/products/brand-logos/product-line-brands-white-ruggedred.svg" 
            alt="Rugged Red" 
            className="h-12 w-auto mb-2"
          />
          <span className="text-sm font-medium text-[#1B3764] text-center">Cleaning</span>
        </Link>
      </div>
    </div>
  );

  const renderIndustriesContent = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#1B3764] mb-3">Industries We Serve</h3>
      <div className="grid grid-cols-2 gap-3">
        {industriesData.slice(0, 6).map((industry) => (
          <Link
            key={industry.title}
            to={`/industries/${industry.title.toLowerCase().replace(/ /g, '-')}`}
            onClick={onClose}
            className="flex flex-col items-center p-4 bg-[#1B3764]/5 hover:bg-[#1B3764]/10 rounded-xl transition-all duration-200 border border-[#1B3764]/10"
          >
            <img 
              src={industry.logo} 
              alt={`${industry.title} Logo`} 
              className="h-12 w-auto mb-2"
            />
            <span className="text-sm font-medium text-[#1B3764] text-center">{industry.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />
          
          {/* Menu Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-96 h-auto z-50 bg-white shadow-2xl rounded-l-3xl border border-[#1B3764]/20"
            style={{ top: '72px', maxHeight: 'calc(100vh - 72px)' }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#1B3764]/20">
              <Link to="/" onClick={onClose} className="flex items-center">
                <img 
                  src={logoSrc} 
                  alt="Forza Built" 
                  className="h-12 w-auto object-contain"
                />
              </Link>
              
              <button 
                onClick={onClose}
                className="p-2 text-[#1B3764]/80 hover:text-[#1B3764] transition-colors rounded-full hover:bg-[#1B3764]/10"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-6 border-b border-[#1B3764]/20">
              <SearchBar />
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto">
              <nav className="p-6 space-y-1">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.hasSubmenu ? (
                      <button
                        onClick={() => setActiveSection(activeSection === item.name.toLowerCase() ? null : item.name.toLowerCase())}
                        className="w-full flex items-center justify-between py-4 px-4 text-base font-medium text-[#1B3764] hover:bg-[#1B3764]/10 rounded-xl transition-all duration-200"
                      >
                        <span>{item.name}</span>
                        <svg 
                          className={`h-5 w-5 transition-transform duration-200 ${
                            activeSection === item.name.toLowerCase() ? 'rotate-180' : ''
                          }`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={onClose}
                        className="block py-4 px-4 text-base font-medium text-[#1B3764] hover:bg-[#1B3764]/10 rounded-xl transition-all duration-200"
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Submenu Content */}
              <AnimatePresence>
                {activeSection && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    {activeSection === 'products' && renderProductsContent()}
                    {activeSection === 'industries' && renderIndustriesContent()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#1B3764]/20">
              <Button asChild className="w-full bg-[#F2611D] hover:bg-[#F2611D]/90 text-white rounded-xl py-3 text-base font-medium">
                <Link to="/contact" onClick={onClose}>Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenuSimple;
