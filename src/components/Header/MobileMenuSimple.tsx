import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGradientMode } from '@/contexts/GradientModeContext';

interface MobileMenuSimpleProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenuSimple: React.FC<MobileMenuSimpleProps> = ({
  isOpen,
  onClose,
}) => {
  const { mode } = useGradientMode();
  
  // Use blue logo for light modes, regular logo for dark modes
  const logoSrc = mode === 'light' || mode === 'light2' 
    ? '/forza-logo-blue.svg' 
    : '/forza-logo-full.png';
  
  // Simplified navigation - just the essential links
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Industries', href: '/industries' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

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
            className="fixed top-0 right-0 w-80 h-auto z-50 bg-gradient-to-b from-[#1B3764] to-[#115B87] shadow-2xl rounded-l-3xl border border-white/20"
            style={{ top: '72px', maxHeight: 'calc(100vh - 72px)' }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-white/20">
              <Link to="/" onClick={onClose} className="flex items-center">
                <img 
                  src={logoSrc} 
                  alt="Forza Built" 
                  className="h-12 w-auto object-contain"
                />
              </Link>
              
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

            {/* Navigation */}
            <nav className="p-4 space-y-2">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className="block py-3 px-4 text-base font-medium text-white bg-white/10 hover:bg-white/20 hover:text-white rounded-2xl transition-all duration-200 border border-white/20"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/20">
              <Button asChild className="w-full bg-[#F2611D] hover:bg-[#F2611D]/90 text-white rounded-2xl">
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
