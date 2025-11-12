import React from 'react';
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
  // Determine responsive width based on variant - scaled for larger displays
  const responsiveWidth = variant === 'industries' 
    ? 'w-[420px] md:w-[460px] lg:w-[500px] xl:w-[800px] 2xl:w-[900px]'
    : 'w-[280px] md:w-[320px] lg:w-[340px] xl:w-[560px] 2xl:w-[640px]';
  
  return (
    <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-0 ${responsiveWidth} ${variant === 'default' ? 'rounded-lg' : 'rounded-lg'} bg-[#2c476e] text-white shadow-2xl border-x border-b border-white/10 border-t-0 overflow-hidden z-20`}> 
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
              <Link to={it.href} className="group relative z-30 flex flex-col items-center justify-center gap-0.5 py-0.5 lg:py-1 xl:py-2 2xl:py-2.5 px-0.5 lg:px-0.5 xl:px-1.5 2xl:px-2 min-h-[50px] lg:min-h-[55px] xl:min-h-[90px] 2xl:min-h-[100px] transition-colors hover:bg-[#F2611D]">
                {it.iconSrc ? (
                  <img src={it.iconSrc} alt="" className="w-4 h-4 lg:w-5 lg:h-5 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9 object-contain" />
                ) : null}
                <span className="font-poppins text-[8px] lg:text-[9px] xl:text-[12px] 2xl:text-[13px] font-normal group-hover:font-bold text-center leading-tight">{toTitleCase(it.label)}</span>
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
              <Link to={it.href} className="group relative z-30 flex items-center justify-center gap-0.5 lg:gap-1 xl:gap-3 2xl:gap-3.5 py-0.5 lg:py-1 xl:py-2 2xl:py-2.5 px-0.5 lg:px-0.5 xl:px-1.5 2xl:px-2 min-h-[50px] lg:min-h-[55px] xl:min-h-[90px] 2xl:min-h-[100px] transition-colors hover:bg-[#F2611D]">
                {it.iconSrc ? (
                  <img src={it.iconSrc} alt="" className="hidden md:block w-4 h-4 lg:w-5 lg:h-5 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9 object-contain" />
                ) : null}
                <span className="font-poppins text-[8px] lg:text-[9px] xl:text-[12px] 2xl:text-[13px] font-normal group-hover:font-bold leading-tight">{toTitleCase(it.label)}</span>
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
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isScrollingUp, setIsScrollingUp] = React.useState(false);
    const [lastScrollY, setLastScrollY] = React.useState(0);
   
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

  const headerBg = (isHome || isIndustry) && !isScrolled
    ? 'bg-transparent'
     : isLight
       ? 'bg-white/90 backdrop-blur-md'
       : 'bg-[#1b3764]/70 backdrop-blur-md';
  const isTransparent = (isHome || isIndustry) && !isScrolled;
  const baseNavText = isTransparent ? 'text-white' : 'text-[#1B3764]';
   const headerShadow = isScrolled ? 'shadow-sm' : '';

  // Keep header fixed on transparent routes to avoid layout jumps
  const positionClass = (isHome || isIndustry) ? 'fixed' : 'sticky';
  
  // Desktop: hide navbar when scrolling down past 100px
  const shouldHideOnDesktop = isScrollingUp && lastScrollY > 100;
  
  // Hide navbar when PDF viewer is open
  const shouldHideForPDF = isBookOpen;

  return (
    <header className={`${positionClass} top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${headerBg} ${headerShadow} ${shouldHideOnDesktop ? 'lg:-translate-y-full' : ''} ${shouldHideForPDF ? '-translate-y-full' : ''}`}> 
       <nav className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4">
         <div className="h-16 md:h-20 lg:h-16 xl:h-22 2xl:h-24 flex items-center justify-between">
          {/* Left logo */}
          <div className="flex items-center relative z-30 py-2 md:py-3">
            {/* Use white logo on transparent home top; blue when scrolled/white bg */}
            <Logo className="h-12 md:h-14 lg:h-16 xl:h-20 2xl:h-24 w-auto" isWhiteBackground={!isTransparent && (isLight || isScrolled)} />
          </div>

          {/* Center nav */}
          <div className="hidden lg:flex items-center gap-1.5 lg:gap-2.5 xl:gap-3 2xl:gap-4 relative z-20">
            {/* Products */}
            <div className="relative group">
              <Link to="/products" className={`px-1.5 lg:px-2 xl:px-2.5 2xl:px-3 py-1 lg:py-1.5 xl:py-2 2xl:py-2.5 rounded-md font-normal text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] capitalize ${baseNavText} transition-all group-hover:bg-[#2c476e] group-hover:text-white group-hover:font-bold group-hover:shadow-xl group-hover:mb-0 group-hover:relative group-hover:z-10 border border-transparent`}>Products ▾</Link>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150">
                <div className="mt-0 z-20 relative">
                  <HoverDropdown items={productsItems} variant="default" />
                </div>
              </div>
            </div>

            {/* Industries */}
            <div className="relative group">
              <Link to="/industries" className={`px-1.5 lg:px-2 xl:px-2.5 2xl:px-3 py-1 lg:py-1.5 xl:py-2 2xl:py-2.5 rounded-md font-normal text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] capitalize ${baseNavText} transition-all group-hover:bg-[#2c476e] group-hover:text-white group-hover:font-bold group-hover:shadow-xl group-hover:mb-0 group-hover:relative group-hover:z-10 border border-transparent`}>Industries ▾</Link>
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


