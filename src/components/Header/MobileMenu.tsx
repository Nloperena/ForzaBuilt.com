import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
  navigation: Array<{ name: string; href: string }>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onSignOut,
  navigation,
}) => {
  const { user } = useAuth();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-0 bg-[#1b3764] z-50 p-6 md:hidden"
        >
          <div className="flex justify-end mb-8">
            <button 
              type="button" 
              className="text-white" 
              onClick={onClose}
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </div>
          
          <nav className="flex flex-col space-y-6">
            {navigation.map((item) => (
              <Link 
                key={item.name} 
                to={item.href} 
                className="text-white text-2xl font-medium" 
                onClick={onClose}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="border-t border-white/20 pt-6">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-white text-lg">{user.email}</span>
                  <Button 
                    onClick={() => {
                      onSignOut();
                      onClose();
                    }} 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-[#1b3764]"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full border-white text-white hover:bg-white hover:text-[#1b3764]"
                >
                  <Link to="/auth" onClick={onClose}>
                    Sign In
                  </Link>
                </Button>
              )}
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu; 