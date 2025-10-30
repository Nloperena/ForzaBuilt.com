import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGradientMode } from '@/contexts/GradientModeContext';
import { getProducts } from '@/utils/products';
import { industries as industriesData } from '@/data/industries';

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
  hasSubmenu?: boolean;
  submenuItems?: any[];
}

interface FlowingMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items?: MenuItemProps[];
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ isOpen, onClose, items = [] }) => {
  const { mode } = useGradientMode();
  const [expandedItem, setExpandedItem] = React.useState<string | null>(null);

  // Create menu items from our data with submenus
  const menuItems: MenuItemProps[] = [
    {
      link: '/products',
      text: 'Products',
      image: '/images/heroes/Bond Heroic Image 1.png',
      hasSubmenu: true,
      submenuItems: [
        {
          link: '/products/bond',
          text: 'Adhesives',
          image: mode === 'light' || mode === 'light2' ? '/forza-bond-mb-color.svg' : '/products/brand-logos/product-line-brands-white-bond.svg'
        },
        {
          link: '/products/seal',
          text: 'Sealants',
          image: mode === 'light' || mode === 'light2' ? '/forza-seal-mb-color.svg' : '/products/brand-logos/product-line-brands-white-seal.svg'
        },
        {
          link: '/products/tape',
          text: 'Tapes',
          image: mode === 'light' || mode === 'light2' ? '/forza-tape-mb-color.svg' : '/products/brand-logos/product-line-brands-white-tape.svg'
        },
        {
          link: '/products/ruggedred',
          text: 'Cleaning',
          image: '/products/brand-logos/product-line-brands-white-ruggedred.svg'
        }
      ]
    },
    {
      link: '/industries',
      text: 'Industries',
      image: '/videos/backgrounds/Final-Construction-Page-Banner-Video-1.mp4',
      hasSubmenu: true,
      submenuItems: industriesData.slice(0, 6).map(industry => ({
        link: `/industries/${industry.title.toLowerCase().replace(/ /g, '-')}`,
        text: industry.title,
        image: industry.logo
      }))
    },
    {
      link: '/about',
      text: 'About',
      image: '/videos/misc/ForzaLionLoop-1-2.mp4',
      hasSubmenu: false
    },
    {
      link: '/blog',
      text: 'Blog',
      image: '/videos/misc/Forza Slogan Slam Final 1.mp4',
      hasSubmenu: false
    }
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
            className="fixed inset-0 z-40 bg-black/80"
            onClick={onClose}
          />
          
          {/* Flowing Menu Container */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-b from-[#2c476e] to-[#81899f] shadow-2xl"
            style={{ height: '90vh' }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-white/20 bg-[#2c476e]">
              <div className="flex items-center space-x-3">
                <img 
                  src="/forza-logo-full.png" 
                  alt="Forza Built" 
                  className="h-12 w-auto"
                />
                <span className="text-base font-semibold text-white">Navigation</span>
              </div>
              
              <button 
                onClick={onClose}
                className="p-3 text-white hover:text-white transition-colors rounded-full hover:bg-white/20 bg-white/10"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Flowing Menu Items */}
            <div className="flex-1 overflow-y-auto">
              <nav className="flex flex-col">
                {menuItems.map((item, idx) => (
                  <FlowingMenuItem 
                    key={idx} 
                    {...item} 
                    onClose={onClose}
                    isExpanded={expandedItem === item.text.toLowerCase()}
                    onToggle={() => setExpandedItem(expandedItem === item.text.toLowerCase() ? null : item.text.toLowerCase())}
                  />
                ))}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const FlowingMenuItem: React.FC<MenuItemProps & { 
  onClose: () => void;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ 
  link, 
  text, 
  image, 
  hasSubmenu = false,
  submenuItems = [],
  onClose,
  isExpanded,
  onToggle
}) => {
  return (
    <div className="border-b border-white/10">
      {hasSubmenu ? (
        <button
          onClick={onToggle}
          className="flex items-center justify-between w-full px-6 py-6 relative cursor-pointer uppercase no-underline font-semibold text-white text-xl hover:text-[#060010] focus:text-white focus-visible:text-[#060010] transition-colors duration-200 bg-transparent hover:bg-white/5"
        >
          <span>{text}</span>
          <svg 
            className={`w-6 h-6 transition-all duration-300 text-white ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      ) : (
        <Link
          to={link}
          onClick={onClose}
          className="flex items-center justify-start w-full px-6 py-6 relative cursor-pointer uppercase no-underline font-semibold text-white text-xl hover:text-[#060010] focus:text-white focus-visible:text-[#060010] transition-colors duration-200 bg-transparent hover:bg-white/5"
        >
          {text}
        </Link>
      )}

      {/* Submenu */}
      <AnimatePresence>
        {hasSubmenu && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-[#2c476e] text-white border-t border-white/10 shadow-2xl"
          >
            <div className="p-4">
              <div className={`grid ${submenuItems.length >= 6 ? 'grid-cols-6' : 'grid-cols-4'} divide-x divide-white/20`}>
                {submenuItems.map((subItem, idx) => (
                  <Link
                    key={idx}
                    to={subItem.link}
                    onClick={onClose}
                    className="group relative flex flex-col items-center justify-center gap-3 py-6 px-6 transition-colors hover:bg-[#F2611D]"
                  >
                    {subItem.image ? (
                      <img 
                        src={subItem.image} 
                        alt={subItem.text} 
                        className="w-12 h-12 object-contain rounded-full bg-white/10 p-1"
                      />
                    ) : null}
                    <span className="font-poppins text-base md:text-lg font-normal group-hover:font-bold text-white text-center">{subItem.text?.toLowerCase().replace(/\b\w/g, (c: string) => c.toUpperCase())}</span>
                    {idx < submenuItems.length - 1 && <span className="absolute right-0 top-4 bottom-4 w-px bg-white/20" aria-hidden />}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlowingMenu;