import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import SearchBar from './SearchBar';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
  navigation: Array<{ name: string; href: string; dropdown?: any[] }>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onSignOut,
  navigation,
}) => {
  const { user } = useAuth();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

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
      case 'Tools':
        return [
          { name: 'All Tools', href: '/tools' },
          { name: 'Product Finder', href: '/tools/product-finder' },
          { name: 'Technical Support', href: '/tools/technical-support' },
          { name: 'Resources', href: '/tools/resources' },
        ];
      default:
        return [];
    }
  };

  const hasDropdown = (itemName: string) => {
    return ['Products', 'Industries', 'Tools'].includes(itemName);
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
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
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
            className="fixed inset-y-0 right-0 w-80 z-50 bg-[#1b3764] border-l border-gray-200/20 shadow-2xl rounded-bl-2xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              {activeSubmenu ? (
                <button 
                  onClick={handleBackToMain}
                  className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm font-medium">Back</span>
                </button>
              ) : (
                <Link to="/" onClick={onClose} className="flex items-center justify-center flex-1">
                  <img 
                    src="/src/assets/images/Forza-lion-logo.png" 
                    alt="Forza Built" 
                    className="h-16 w-auto"
                  />
                </Link>
              )}
              
              <button 
                onClick={onClose}
                className="p-2 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-[#1b3764]">
              <div className="p-6 bg-[#1b3764] rounded-tl-2xl">
                {!activeSubmenu ? (
                  <>
                    {/* Search */}
                    <div className="mb-8 bg-[#1b3764]">
                      <SearchBar mobile={true} />
                    </div>

                    {/* Main Navigation */}
                    <nav className="space-y-3 bg-[#1b3764]">
                      {navigation.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-[#1b3764]"
                        >
                          {hasDropdown(item.name) ? (
                            <button
                              onClick={() => handleSubmenuToggle(item.name)}
                              className="w-full flex items-center justify-between py-4 px-4 rounded-2xl text-base font-medium text-[#1b3764] hover:bg-gray-50 hover:text-[#1b3764]/80 transition-all duration-200 group bg-white shadow-sm"
                            >
                              <span>{item.name}</span>
                              <svg 
                                className="h-4 w-4 transition-transform duration-200 text-gray-400 group-hover:text-gray-600" 
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
                              className="block py-4 px-4 rounded-2xl text-base font-medium text-[#1b3764] hover:bg-gray-50 hover:text-[#1b3764]/80 transition-all duration-200 bg-white shadow-sm"
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
                    className="space-y-3 bg-[#1b3764]"
                  >
                    <h2 className="text-xl font-semibold text-white mb-6">{activeSubmenu}</h2>
                    <nav className="space-y-3 bg-[#1b3764]">
                      {getSubmenuItems(activeSubmenu).map((subItem, index) => (
                        <motion.div
                          key={subItem.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-[#1b3764]"
                        >
                          <Link
                            to={subItem.href}
                            onClick={onClose}
                            className="block py-3 px-4 rounded-xl text-sm font-medium text-[#1b3764] hover:bg-gray-50 hover:text-[#1b3764]/80 transition-all duration-200 bg-white shadow-sm"
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
            <div className="border-t border-white/10 p-6 space-y-4 bg-[#1b3764] rounded-bl-2xl">
              <Button asChild className="w-full bg-[#F2611D] hover:bg-[#F2611D]/90 text-white rounded-2xl text-base font-medium py-4 transition-all duration-200 shadow-lg">
                <Link to="/contact" onClick={onClose}>Contact Us</Link>
              </Button>

              {user ? (
                <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <span className="text-[#1b3764] text-sm font-semibold">
                        {user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-white font-medium truncate">{user.email}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      onSignOut();
                      onClose();
                    }}
                    className="text-white/80 hover:text-white text-sm"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button asChild variant="outline" className="w-full border-2 border-white text-white hover:bg-white hover:text-[#1b3764] rounded-2xl text-base font-medium py-4 transition-all duration-200">
                  <Link to="/auth" onClick={onClose}>Sign In</Link>
                </Button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu; 