import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import SearchBar from './SearchBar';
import { industries } from '@/data/industries';
// Import product images
import canisterSystem from '@/assets/images/Canister System.png';
import os2Cartridge from '@/assets/images/OS2 Cartridge Hero.png';
import rrHandSpraying from '@/assets/images/RR Hand Spraying.png';
import tapeHeroic from '@/assets/images/Tape Heroic Image.png';

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

  // Product items with actual logos
  const productItems = [
    {
      name: 'BOND',
      href: '/products/bond',
      image: canisterSystem,
      color: '#f16022'
    },
    {
      name: 'SEAL',
      href: '/products/seal',
      image: os2Cartridge,
      color: '#faaf40'
    },
    {
      name: 'TAPE',
      href: '/products/tape',
      image: tapeHeroic,
      color: '#d1181f'
    },
    {
      name: 'RUGGED RED',
      href: 'https://ruggedred.com/',
      image: rrHandSpraying,
      color: '#e53935',
      external: true
    }
  ];

  // Industry items with logos
  const industryItems = industries.map(industry => ({
    name: industry.title,
    href: `/industries/${industry.title.toLowerCase().replace(/ /g, '-')}`,
    image: industry.logo,
    color: industry.color || '#1b3764'
  }));

  // Primary navigation items with SVG icons
  const primaryNavItems = [
    {
      name: 'Approach',
      href: '/approach',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      description: 'How we solve problems'
    },
    {
      name: 'About',
      href: '/about',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: 'Our story and mission'
    }
  ];

  // Secondary navigation items with SVG icons
  const secondaryNavItems = [
    {
      name: 'Tools',
      href: '/tools',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      description: 'Product selector & calculators'
    },
    {
      name: 'Contact',
      href: '/contact',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Get in touch with our team'
    },
    {
      name: 'Datasheets',
      href: '/datasheets',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      description: 'Technical specifications'
    }
  ];

  // Tertiary navigation items
  const tertiaryNavItems = [
    { name: 'Careers', href: '/careers' },
    { name: 'Support', href: '/support' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-50 md:hidden bg-[#1b3764]"
          style={{ 
            backgroundColor: '#1b3764',
            backgroundImage: 'linear-gradient(135deg, #1b3764 0%, #1b3764 100%)',
            minHeight: '100vh',
            width: '100vw'
          }}
        >
          {/* Header with close button */}
          <div className="flex justify-between items-center p-6 border-b border-white/20">
            <div className="flex items-center">
              <img 
                src="/src/assets/images/Forza-lion-logo.png" 
                alt="Forza Built" 
                className="h-8 w-auto"
              />
            </div>
            <button 
              type="button" 
              className="text-white hover:text-gray-200 transition-colors duration-200 p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20" 
              onClick={onClose}
              aria-label="Close menu"
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

          {/* Navigation Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Search Bar */}
            <div className="p-6 border-b border-white/20">
              <SearchBar mobile={true} />
            </div>

            {/* Products Section with Logos */}
            <div className="p-6 border-b border-white/20">
              <h3 className="text-white font-bold text-lg mb-4">Our Products</h3>
              <div className="grid grid-cols-2 gap-4">
                {productItems.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group"
                  >
                    {item.external ? (
                      <a 
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105"
                        onClick={onClose}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 mb-3 flex items-center justify-center">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <h4 className="text-white font-bold text-sm mb-1">{item.name}</h4>
                        </div>
                      </a>
                    ) : (
                      <Link 
                        to={item.href} 
                        className="block bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105"
                        onClick={onClose}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 mb-3 flex items-center justify-center">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <h4 className="text-white font-bold text-sm mb-1">{item.name}</h4>
                        </div>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Industries Section with Logos */}
            <div className="p-6 border-b border-white/20">
              <h3 className="text-white font-bold text-lg mb-4">Industries</h3>
              <div className="grid grid-cols-2 gap-4">
                {industryItems.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (idx + 4) * 0.1 }}
                    className="group"
                  >
                    <Link 
                      to={item.href} 
                      className="block bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105"
                      onClick={onClose}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 mb-3 flex items-center justify-center">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <h4 className="text-white font-bold text-sm mb-1">{item.name}</h4>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Primary Navigation Items */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-8">
                {primaryNavItems.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group"
                  >
                    <Link 
                      to={item.href} 
                      className="block bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group-hover:scale-105"
                      onClick={onClose}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 mb-3 flex items-center justify-center text-white group-hover:text-[#F16022] transition-colors duration-300">
                          {item.icon}
                        </div>
                        <h4 className="text-white font-bold text-sm mb-1">{item.name}</h4>
                        <p className="text-white/70 text-xs leading-tight">{item.description}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Secondary Navigation Items */}
              <div className="space-y-3 mb-8">
                {secondaryNavItems.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                    className="group"
                  >
                    <Link 
                      to={item.href} 
                      className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
                      onClick={onClose}
                    >
                      <div className="w-8 h-8 flex items-center justify-center text-white group-hover:text-[#F16022] transition-colors duration-300">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-sm">{item.name}</p>
                        <p className="text-white/60 text-xs">{item.description}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Auth Section */}
              <div className="border-t border-white/20 pt-6 mb-8">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {user.email?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">{user.email}</p>
                        <p className="text-white/60 text-xs">Signed in</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => {
                        onSignOut();
                        onClose();
                      }} 
                      className="w-full bg-[#F16022] hover:bg-[#D35127] text-white border-0 transition-colors duration-200"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button 
                    asChild 
                    className="w-full bg-[#F16022] hover:bg-[#D35127] text-white border-0 transition-colors duration-200"
                  >
                    <Link to="/auth" onClick={onClose}>
                      Sign In
                    </Link>
                  </Button>
                )}
              </div>

              {/* Tertiary Navigation */}
              <div className="border-t border-white/20 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  {tertiaryNavItems.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
                    >
                      <Link 
                        to={item.href} 
                        className="block text-white/70 hover:text-white text-sm transition-colors duration-200"
                        onClick={onClose}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu; 