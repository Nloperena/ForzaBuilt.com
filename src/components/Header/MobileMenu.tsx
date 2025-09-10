import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGradientMode } from '@/contexts/GradientModeContext';

import SearchBar from './SearchBar';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSignOut?: () => void;
  navigation: Array<{ name: string; href: string; dropdown?: any[] }>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onSignOut,
  navigation,
}) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { mode } = useGradientMode();
  
  // Use blue logo for light modes, regular logo for dark modes
  const logoSrc = mode === 'light' || mode === 'light2' 
    ? '/forza-logo-blue.svg' 
    : '/forza-logo-full.png';

  const handleSubmenuToggle = (itemName: string) => {
    setActiveSubmenu(activeSubmenu === itemName ? null : itemName);
  };

  const handleBackToMain = () => {
    setActiveSubmenu(null);
  };

  const getSubmenuItems = (itemName: string) => {
    switch (itemName) {
      case 'Products':
        return [
          { name: 'All Products', href: '/products' },
          { name: 'Bond', href: '/products/bond' },
          { name: 'Tape', href: '/products/tape' },
          { name: 'Seal', href: '/products/seal' },
          { name: 'RuggedRed', href: '/products/ruggedred' },
        ];
      case 'Industries':
        return [
          { name: 'All Industries', href: '/industries' },
          { name: 'Transportation', href: '/industries/transportation' },
          { name: 'Marine', href: '/industries/marine' },
          { name: 'Construction', href: '/industries/construction' },
          { name: 'Industrial', href: '/industries/industrial' },
          { name: 'Composites', href: '/industries/composites' },
          { name: 'Insulation', href: '/industries/insulation' },
        ];

      default:
        return [];
    }
  };

  const hasDropdown = (itemName: string) => {
    return ['Products', 'Industries'].includes(itemName);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm w-screen h-screen"
            onClick={onClose}
          />
          
          {/* Menu Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 30,
              mass: 0.8
            }}
            className="fixed inset-y-0 right-0 w-80 z-50 bg-gradient-to-b from-white via-gray-50 to-white border-l border-[#1B3764]/20 shadow-2xl rounded-bl-2xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#1B3764]/20 bg-gradient-to-r from-white to-gray-50">
              {activeSubmenu ? (
                <button 
                  onClick={handleBackToMain}
                  className="flex items-center space-x-2 text-[#1B3764] hover:text-[#1B3764]/80 transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm font-medium">Back</span>
                </button>
              ) : (
                <Link to="/" onClick={onClose} className="flex items-center justify-start flex-1">
                  <img 
                    src={logoSrc} 
                    alt="Forza Built" 
                    className="h-20 w-auto object-contain"
                  />
                </Link>
              )}
              
              <button 
                onClick={onClose}
                className="p-2 text-[#1B3764]/80 hover:text-[#1B3764] transition-colors rounded-full hover:bg-white/10"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#115B87] to-[#1B3764]">
              <div className="p-6">
                {!activeSubmenu ? (
                  <>
                    {/* Search */}
                    <div className="mb-8">
                      <SearchBar mobile={true} />
                    </div>

                    {/* Main Navigation */}
                    <nav className="space-y-2">
                      {navigation.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {hasDropdown(item.name) ? (
                            <button
                              onClick={() => handleSubmenuToggle(item.name)}
                              className="w-full flex items-center justify-between py-4 px-4 rounded-2xl text-base font-medium text-[#1B3764] bg-white/10 hover:bg-white/20 hover:text-[#1B3764] transition-all duration-200 group border border-[#1B3764]/20"
                            >
                              <span>{item.name}</span>
                              <svg 
                                className="h-4 w-4 transition-transform duration-200 text-[#1B3764]/60 group-hover:text-[#1B3764]" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          ) : (
                            <Link
                              to={item.href}
                              onClick={onClose}
                              className="block py-4 px-4 rounded-2xl text-base font-medium text-[#1B3764] bg-white/10 hover:bg-white/20 hover:text-[#1B3764] transition-all duration-200 border border-[#1B3764]/20"
                            >
                              {item.name}
                            </Link>
                          )}
                        </motion.div>
                      ))}
                    </nav>
                  </>
                ) : (
                  /* Submenu */
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <h2 className="text-xl font-semibold text-[#1B3764] mb-6">{activeSubmenu}</h2>
                    <nav className="space-y-2">
                      {getSubmenuItems(activeSubmenu).map((subItem, index) => (
                        <motion.div
                          key={subItem.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            to={subItem.href}
                            onClick={onClose}
                            className="block py-3 px-4 rounded-xl text-sm font-medium text-[#1B3764] bg-white/10 hover:bg-white/20 hover:text-[#1B3764] transition-all duration-200 border border-[#1B3764]/20"
                          >
                            {subItem.name}
                          </Link>
                        </motion.div>
                      ))}
                    </nav>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-[#1B3764]/20 p-6 space-y-4 bg-gradient-to-r from-[#1B3764] to-[#115B87] rounded-bl-2xl">
              <Button asChild className="w-full bg-[#F2611D] hover:bg-[#F2611D]/90 text-[#1B3764] rounded-2xl text-base font-medium py-4 transition-all duration-200 shadow-lg">
                <Link to="/contact" onClick={onClose}>Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu; 