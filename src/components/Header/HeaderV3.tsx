import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGradientMode } from '@/contexts/GradientModeContext';
import { useBookViewer } from '@/contexts/BookViewerContext';
import Logo from '@/components/Header/Logo';
import SearchBar from '@/components/Header/SearchBar';
import { industries as industriesData } from '@/data/industries';

const toTitleCase = (text: string) => text
  ? text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
  : text;

type MenuItem = { label: string; href: string; iconSrc?: string };

const productsItems: MenuItem[] = [
  { label: 'Adhesives', href: '/products/bond' },
  { label: 'Sealants', href: '/products/seal' },
  { label: 'Tapes', href: '/products/tape' },
  { label: 'Cleaners', href: '/products/ruggedred' },
];

const industriesItems: MenuItem[] = industriesData.slice(0, 6).map((ind) => ({
  label: ind.title,
  href: `/industries/${ind.title.toLowerCase().replace(/ /g, '-')}`,
  iconSrc: ind.logo,
}));

interface DropdownProps {
  items: MenuItem[];
  variant?: 'default' | 'industries';
  isOpen: boolean;
}

const ScalableDropdown: React.FC<DropdownProps> = ({ items, variant = 'default', isOpen }) => {
  // Determine responsive sizing based on variant and screen size
  const getDropdownClasses = () => {
    if (variant === 'industries') {
      return 'w-screen sm:w-[420px] md:w-[460px] lg:w-[500px] xl:w-[800px] 2xl:w-[900px] max-h-[90vh] overflow-y-auto';
    }
    return 'w-screen sm:w-[280px] md:w-[320px] lg:w-[340px] xl:w-[560px] 2xl:w-[640px] max-h-[90vh] overflow-y-auto';
  };

  const gridCols = variant === 'industries' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6' : 'grid-cols-2 lg:grid-cols-4';
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`absolute left-1/2 -translate-x-1/2 top-full mt-0 ${getDropdownClasses()} bg-[#2c476e] text-white shadow-2xl border-x border-b border-white/10 border-t-0 overflow-hidden rounded-lg z-[100]`}
        >
          <div className={`grid ${gridCols} gap-0`}>
            {items.map((it, idx) => (
              <motion.div
                key={it.label}
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.2, delay: idx * 0.03 }}
              >
                <Link 
                  to={it.href} 
                  className="group relative flex flex-col items-center justify-center gap-1 sm:gap-0.5 py-2 sm:py-0.5 lg:py-1 xl:py-2 2xl:py-2.5 px-2 sm:px-0.5 lg:px-0.5 xl:px-1.5 2xl:px-2 min-h-[60px] sm:min-h-[50px] lg:min-h-[55px] xl:min-h-[90px] 2xl:min-h-[100px] transition-colors hover:bg-[#F2611D]"
                >
                  {it.iconSrc ? (
                    <img 
                      src={it.iconSrc} 
                      alt="" 
                      className="w-5 h-5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9 object-contain" 
                    />
                  ) : null}
                  <span className="font-poppins text-[9px] sm:text-[8px] lg:text-[9px] xl:text-[12px] 2xl:text-[13px] font-normal group-hover:font-bold text-center leading-tight">
                    {toTitleCase(it.label)}
                  </span>
                  {idx < items.length - 1 && variant !== 'default' && (
                    <span className="hidden lg:block absolute right-0 top-4 bottom-4 w-px bg-white/20" aria-hidden />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const HeaderV3: React.FC = () => {
  const { mode } = useGradientMode();
  const { isBookOpen } = useBookViewer();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isIndustry = location.pathname.startsWith('/industries');
  
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isScrollingUp, setIsScrollingUp] = React.useState(false);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  React.useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 8);
      
      // For desktop only: hide navbar when scrolling down
      if (window.innerWidth >= 1024) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsScrollingUp(true);
        } else if (currentScrollY < lastScrollY) {
          setIsScrollingUp(false);
        }
      }
      
      setLastScrollY(currentScrollY);
    };
    
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  const isLight = mode === 'light' || mode === 'light2';

  const headerBg = (isHome || isIndustry) && !isScrolled
    ? 'bg-transparent'
    : isLight
      ? 'bg-white/90 backdrop-blur-md'
      : 'bg-[#1b3764]/70 backdrop-blur-md';
  
  const isTransparent = (isHome || isIndustry) && !isScrolled;
  const baseNavText = isTransparent ? 'text-white' : 'text-[#1B3764]';
  const headerShadow = isScrolled ? 'shadow-sm' : '';

  const positionClass = (isHome || isIndustry) ? 'fixed' : 'sticky';
  const shouldHideOnDesktop = isScrollingUp && lastScrollY > 100;
  const shouldHideForPDF = isBookOpen;

  return (
    <header 
      className={`${positionClass} top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${headerBg} ${headerShadow} ${shouldHideOnDesktop ? 'lg:-translate-y-full' : ''} ${shouldHideForPDF ? '-translate-y-full' : ''}`}
    >
      <nav className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-3 sm:px-4">
        <div className="h-16 md:h-20 lg:h-16 xl:h-22 2xl:h-24 flex items-center justify-between">
          {/* Left logo */}
          <div className="flex items-center relative z-30 py-3 md:pt-12 md:pb-4 2xl:py-3">
            <Logo 
              className="h-12 md:h-14 lg:h-12 xl:h-20 2xl:h-24 w-auto" 
              isWhiteBackground={!isTransparent && (isLight || isScrolled)} 
            />
          </div>

          {/* Center nav */}
          <div className="hidden lg:flex items-center gap-1 lg:gap-1.5 xl:gap-2 2xl:gap-3 relative z-20">
            {/* Products */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown('products')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link 
                to="/products" 
                className={`px-2 lg:px-2.5 xl:px-3 2xl:px-3.5 py-2 lg:py-2 xl:py-2.5 2xl:py-3 rounded-md font-normal text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] capitalize ${baseNavText} transition-all hover:bg-[#2c476e] hover:text-white hover:font-bold hover:shadow-lg border border-transparent`}
              >
                Products ▾
              </Link>
              <ScalableDropdown 
                items={productsItems} 
                variant="default" 
                isOpen={openDropdown === 'products'}
              />
            </div>

            {/* Industries */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown('industries')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link 
                to="/industries" 
                className={`px-2 lg:px-2.5 xl:px-3 2xl:px-3.5 py-2 lg:py-2 xl:py-2.5 2xl:py-3 rounded-md font-normal text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] capitalize ${baseNavText} transition-all hover:bg-[#2c476e] hover:text-white hover:font-bold hover:shadow-lg border border-transparent`}
              >
                Industries ▾
              </Link>
              <ScalableDropdown 
                items={industriesItems} 
                variant="industries" 
                isOpen={openDropdown === 'industries'}
              />
            </div>

            <Link 
              to="/about" 
              className={`px-2 lg:px-2.5 xl:px-3 2xl:px-3.5 py-2 lg:py-2 xl:py-2.5 2xl:py-3 rounded-md font-normal text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] capitalize ${baseNavText} hover:font-bold transition-all`}
            >
              About
            </Link>
            <Link 
              to="/blog" 
              className={`px-2 lg:px-2.5 xl:px-3 2xl:px-3.5 py-2 lg:py-2 xl:py-2.5 2xl:py-3 rounded-md font-normal text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] capitalize ${baseNavText} hover:font-bold transition-all`}
            >
              Blog
            </Link>
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-2 lg:gap-3 xl:gap-4 2xl:gap-5 relative z-30">
            <SearchBar />
            <Link 
              to="/contact" 
              className="rounded-full bg-[#F2611D] text-white px-2.5 lg:px-3 xl:px-5 2xl:px-6 py-1.5 lg:py-2 xl:py-2.5 2xl:py-3 text-xs lg:text-xs xl:text-sm 2xl:text-base font-medium hover:bg-[#F2611D]/90 transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="lg:hidden p-2" aria-label="Open menu">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default HeaderV3;

