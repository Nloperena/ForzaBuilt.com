import React, { useState } from 'react';
// This component can be hidden by modals using data-component="header" selector
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

const HoverDropdown: React.FC<{ items: MenuItem[]; widthClass?: string; variant?: 'default' | 'industries' }> = ({ items, widthClass = 'w-[760px]', variant = 'default' }) => {
  // Determine responsive width based on variant - same size across all breakpoints
  const responsiveWidth = variant === 'industries' 
    ? 'w-[640px] 2xl:w-[720px]'
    : 'w-[440px] 2xl:w-[500px]';
  
  return (
    <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-0 ${responsiveWidth} rounded-lg bg-[#2c476e] text-white shadow-2xl border-x border-b border-white/10 border-t-0 overflow-hidden z-50`}> 
              {variant === 'industries' ? (
        <div className="grid grid-cols-6">
          {items.map((it, idx) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <Link to={it.href} className={`group relative z-30 flex flex-col items-center justify-center gap-2 py-2 lg:py-2 xl:py-2 2xl:py-2.5 min-h-[80px] lg:min-h-[85px] xl:min-h-[90px] 2xl:min-h-[95px] transition-colors hover:bg-[#F2611D] cursor-pointer ${it.label.toLowerCase() === 'transportation' ? 'px-[1rem] lg:px-[1rem] xl:px-[1rem] 2xl:px-[1rem]' : 'px-3 lg:px-3 xl:px-3 2xl:px-3'}`}>
                {it.iconSrc ? (
                  <img src={it.iconSrc} alt="" className="w-6 h-6 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 object-contain" />
                ) : null}
                {/* Transportation font size: 10% smaller than base (base: 12/13/14/15px, 10% reduction = 0.9 multiplier) */}
                <span className={`font-poppins font-normal group-hover:font-bold text-center ${
                  it.label.toLowerCase() === 'transportation' 
                    ? 'text-[10.8px] lg:text-[11.7px] xl:text-[12.6px] 2xl:text-[13.5px]' // 10% smaller: 12*0.9, 13*0.9, 14*0.9, 15*0.9
                    : 'text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]'
                }`}>{toTitleCase(it.label)}</span>
                {idx < items.length - 1 && <span className="absolute right-0 top-4 bottom-4 w-px bg-white/20" aria-hidden />}
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4">
          {items.map((it, idx) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <Link to={it.href} className="group relative z-30 flex items-center justify-center gap-0.5 lg:gap-0.5 xl:gap-1 2xl:gap-1.5 py-2 lg:py-2 xl:py-2 2xl:py-2.5 px-3 lg:px-3 xl:px-3 2xl:px-3 min-h-[70px] lg:min-h-[75px] xl:min-h-[80px] 2xl:min-h-[85px] transition-colors hover:bg-[#F2611D] cursor-pointer">
                {it.iconSrc ? (
                  <img src={it.iconSrc} alt="" className="hidden md:block w-6 h-6 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 object-contain" />
                ) : null}
                <span className="font-poppins text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] font-normal group-hover:font-bold">{toTitleCase(it.label)}</span>
                {idx < items.length - 1 && <span className="absolute right-0 top-4 bottom-4 w-px bg-white/20" aria-hidden />}
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

 const HeaderV2: React.FC = () => {
   const { mode } = useGradientMode();
   const { isBookOpen } = useBookViewer();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isIndustry = location.pathname.startsWith('/industries');
  const isAbout = location.pathname === '/about';
  const isBlog = location.pathname.startsWith('/blog');
  const isProduct = location.pathname.startsWith('/products') || location.pathname.startsWith('/product');
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isScrollingUp, setIsScrollingUp] = React.useState(false);
    const [lastScrollY, setLastScrollY] = React.useState(0);
    const [pinnedDropdown, setPinnedDropdown] = React.useState<string | null>(null);
   
   React.useEffect(() => {
     const onScroll = () => {
       const currentScrollY = window.scrollY;
       setIsScrolled(currentScrollY > 8);
       
      // For desktop only: hide navbar when scrolling down
      if (window.innerWidth >= 1024) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsScrollingUp(true); // Actually means scrolling down
        } else if (currentScrollY < lastScrollY) {
          setIsScrollingUp(false); // Actually means scrolling up
        }
      }
       
       setLastScrollY(currentScrollY);
     };
     onScroll();
     window.addEventListener('scroll', onScroll, { passive: true });
     return () => window.removeEventListener('scroll', onScroll);
   }, [lastScrollY]);
   const isLight = mode === 'light' || mode === 'light2';

  const headerBg = (isHome || isIndustry || isAbout || isBlog || isProduct) && !isScrolled
    ? 'bg-transparent'
     : isLight
       ? 'bg-white/90 backdrop-blur-md'
       : 'bg-[#1b3764]/70 backdrop-blur-md';
  const isTransparent = (isHome || isIndustry || isAbout || isBlog || isProduct) && !isScrolled;
  const baseNavText = isTransparent ? 'text-white' : 'text-[#1B3764]';
   const headerShadow = isScrolled ? 'shadow-sm' : '';

  // Keep header fixed on transparent routes to avoid layout jumps
  const positionClass = (isHome || isIndustry || isAbout || isBlog || isProduct) ? 'fixed' : 'sticky';
  
  // Desktop: hide navbar when scrolling down past 100px
  const shouldHideOnDesktop = isScrollingUp && lastScrollY > 100;
  
  // Hide navbar when PDF viewer is open
  const shouldHideForPDF = isBookOpen;

  return (
    <header data-component="header" className={`${positionClass} top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${headerBg} ${headerShadow} ${shouldHideOnDesktop ? 'lg:-translate-y-full' : ''} ${shouldHideForPDF ? '-translate-y-full' : ''}`}> 
      <nav className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto p-4 lg:p-[0.85rem]">
        <div className="h-16 md:h-20 lg:h-16 xl:h-20 2xl:h-24 flex items-center justify-between">
          {/* Left logo */}
          <div className="flex items-center relative z-30">
            {/* Use white logo on transparent home top; blue when scrolled/white bg */}
            <Logo className="h-12 md:h-14 lg:h-12 xl:h-16 2xl:h-24 w-auto" isWhiteBackground={!isTransparent && (isLight || isScrolled)} />
          </div>

          {/* Center nav */}
          <div className="hidden lg:flex items-center gap-1.5 lg:gap-2.5 xl:gap-3 2xl:gap-4 relative z-20">
            {/* Products */}
            <div className="relative group" onMouseLeave={() => pinnedDropdown !== 'products' && setPinnedDropdown(null)}>
              <div onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setPinnedDropdown(pinnedDropdown === 'products' ? null : 'products');
              }} className={`px-1.5 lg:px-2 xl:px-2.5 2xl:px-3 py-1 lg:py-1.5 xl:py-2 2xl:py-2.5 rounded-md font-normal text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] capitalize ${baseNavText} transition-all group-hover:bg-[#2c476e] group-hover:text-white group-hover:font-bold group-hover:shadow-xl group-hover:mb-0 group-hover:relative group-hover:z-10 group-hover:rounded-t-md group-hover:rounded-b-none border border-transparent cursor-pointer`}>Products ▾</div>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150">
                <div className="mt-0 z-20 relative">
                  <HoverDropdown items={productsItems} variant="default" />
                </div>
              </div>
            </div>

            {/* Industries */}
            <div className="relative group" onMouseLeave={() => pinnedDropdown !== 'industries' && setPinnedDropdown(null)}>
              <div onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setPinnedDropdown(pinnedDropdown === 'industries' ? null : 'industries');
              }} className={`px-1.5 lg:px-2 xl:px-2.5 2xl:px-3 py-1 lg:py-1.5 xl:py-2 2xl:py-2.5 rounded-md font-normal text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] capitalize ${baseNavText} transition-all group-hover:bg-[#2c476e] group-hover:text-white group-hover:font-bold group-hover:shadow-xl group-hover:mb-0 group-hover:relative group-hover:z-10 group-hover:rounded-t-md group-hover:rounded-b-none border border-transparent cursor-pointer`}>Industries ▾</div>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150">
                <div className="mt-0 z-20 relative">
                  <HoverDropdown items={industriesItems} variant="industries" />
                </div>
              </div>
            </div>

            <Link to="/about" className={`px-1 lg:px-1.5 xl:px-2 py-1 lg:py-1.5 xl:py-2 rounded-md font-normal text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] capitalize ${baseNavText} hover:font-bold`}>About</Link>
            <Link to="/blog" className={`px-1 lg:px-1.5 xl:px-2 py-1 lg:py-1.5 xl:py-2 rounded-md font-normal text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] capitalize ${baseNavText} hover:font-bold`}>Blog</Link>
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-2 lg:gap-3 xl:gap-4 2xl:gap-5 relative z-30">
            <SearchBar />
            <Link to="/contact" className="rounded-full bg-[#F2611D] text-white px-2.5 lg:px-3 xl:px-5 2xl:px-6 py-1 lg:py-1.5 xl:py-2 2xl:py-2.5 text-xs lg:text-xs xl:text-sm 2xl:text-base font-medium hover:bg-[#F2611D]/90">Contact Us</Link>
          </div>

          {/* Mobile */}
          <button className="lg:hidden p-2" aria-label="Open menu">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default HeaderV2;


