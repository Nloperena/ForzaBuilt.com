import React, { useState } from 'react';
// This component can be hidden by modals using data-component="header" selector
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGradientMode } from '@/contexts/GradientModeContext';
import { useBookViewer } from '@/contexts/BookViewerContext';
import { useDrawer } from '@/contexts/DrawerContext';
import Logo from '@/components/Header/Logo';
import SearchBar from '@/components/Header/SearchBar';
import { industries as industriesData } from '@/data/industries';
import { ChevronRight, X } from 'lucide-react';

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
   const { isDrawerOpen } = useDrawer();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = location.pathname === '/';
  const isIndustry = location.pathname.startsWith('/industries');
  const isAbout = location.pathname === '/about';
  const isBlog = location.pathname.startsWith('/blog');
  const isBlogDetail = location.pathname.startsWith('/blog/') && location.pathname !== '/blog';
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

   // Lock body scroll when mobile menu is open
   React.useEffect(() => {
     if (mobileMenuOpen) {
       // Save current scroll position
       const scrollY = window.scrollY;
       // Lock scroll
       document.body.style.position = 'fixed';
       document.body.style.top = `-${scrollY}px`;
       document.body.style.width = '100%';
       document.body.style.overflow = 'hidden';
     } else {
       // Restore scroll
       const scrollY = document.body.style.top;
       document.body.style.position = '';
       document.body.style.top = '';
       document.body.style.width = '';
       document.body.style.overflow = '';
       // Restore scroll position
       if (scrollY) {
         window.scrollTo(0, parseInt(scrollY || '0') * -1);
       }
     }
     
     return () => {
       // Cleanup: ensure scroll is restored if component unmounts
       if (mobileMenuOpen) {
         const scrollY = document.body.style.top;
         document.body.style.position = '';
         document.body.style.top = '';
         document.body.style.width = '';
         document.body.style.overflow = '';
         if (scrollY) {
           window.scrollTo(0, parseInt(scrollY || '0') * -1);
         }
       }
     };
   }, [mobileMenuOpen]);
   const isLight = mode === 'light' || mode === 'light2';

  // On mobile, product and industry pages should always have white background
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const shouldForceWhiteOnMobile = isMobile && (isProduct || isIndustry);
  
  const headerBg = shouldForceWhiteOnMobile
    ? 'bg-white'
    : (isHome || isIndustry || isAbout || (isBlog && !isBlogDetail) || isProduct) && !isScrolled
    ? 'bg-transparent'
    : isBlogDetail || isLight
      ? 'bg-white/90 backdrop-blur-md'
      : 'bg-[#1b3764]/70 backdrop-blur-md';
  const isTransparent = !shouldForceWhiteOnMobile && (isHome || isIndustry || isAbout || (isBlog && !isBlogDetail) || isProduct) && !isScrolled;
  const baseNavText = isTransparent ? 'text-white' : 'text-[#1B3764]';
   const headerShadow = isScrolled || shouldForceWhiteOnMobile ? 'shadow-sm' : '';

  // On mobile for product/industry pages, use sticky instead of fixed to take up space
  const positionClass = shouldForceWhiteOnMobile 
    ? 'sticky' 
    : (isHome || isIndustry || isAbout || isBlog || isProduct) ? 'fixed' : 'sticky';
  
  // Desktop: hide navbar when scrolling down past 100px
  // Don't hide if mobile menu is open
  const shouldHideOnDesktop = isScrollingUp && lastScrollY > 100 && !mobileMenuOpen;
  
  // Hide navbar when PDF viewer is open
  const shouldHideForPDF = isBookOpen;
  
  // Hide navbar on mobile when drawer is open (hide on all screen sizes, but especially mobile)
  // Don't hide if mobile menu is open
  const shouldHideForDrawer = isDrawerOpen && !mobileMenuOpen;

  return (
    <header data-component="header" className={`${positionClass} top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${headerBg} ${headerShadow} ${shouldHideOnDesktop ? 'lg:-translate-y-full' : ''} ${shouldHideForPDF ? '-translate-y-full' : ''} ${shouldHideForDrawer ? '-translate-y-full' : ''}`}> 
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
              <Link 
                to="/products"
                onMouseEnter={() => setPinnedDropdown('products')}
                className={`px-1.5 lg:px-2 xl:px-2.5 2xl:px-3 py-1 lg:py-1.5 xl:py-2 2xl:py-2.5 rounded-md font-normal text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] capitalize ${baseNavText} transition-all group-hover:bg-[#2c476e] group-hover:text-white group-hover:font-bold group-hover:shadow-xl group-hover:mb-0 group-hover:relative group-hover:z-10 group-hover:rounded-t-md group-hover:rounded-b-none border border-transparent cursor-pointer`}
              >
                Products ▾
              </Link>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150">
                <div className="mt-0 z-20 relative">
                  <HoverDropdown items={productsItems} variant="default" />
                </div>
              </div>
            </div>

            {/* Industries */}
            <div className="relative group" onMouseLeave={() => pinnedDropdown !== 'industries' && setPinnedDropdown(null)}>
              <Link 
                to="/industries"
                onMouseEnter={() => setPinnedDropdown('industries')}
                className={`px-1.5 lg:px-2 xl:px-2.5 2xl:px-3 py-1 lg:py-1.5 xl:py-2 2xl:py-2.5 rounded-md font-normal text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] capitalize ${baseNavText} transition-all group-hover:bg-[#2c476e] group-hover:text-white group-hover:font-bold group-hover:shadow-xl group-hover:mb-0 group-hover:relative group-hover:z-10 group-hover:rounded-t-md group-hover:rounded-b-none border border-transparent cursor-pointer`}
              >
                Industries ▾
              </Link>
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
          <button 
            className={`lg:hidden p-2 transition-colors ${baseNavText}`}
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>
      </nav>

      {/* New Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
              className="fixed right-0 top-0 bottom-0 z-[101] w-80 sm:w-96 bg-white shadow-2xl overflow-y-auto lg:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10 flex items-center justify-between">
                <Logo className="h-8 w-auto" isWhiteBackground={true} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="p-4 space-y-1">
                {/* Products */}
                <div className="space-y-0.5">
                  <Link
                    to="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <span className="font-poppins font-medium text-[#1B3764] text-sm">Products</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#F2611D] transition-colors" />
                  </Link>
                  <div className="ml-3 border-l-2 border-gray-100 pl-3">
                    {productsItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-0.5 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-poppins text-xs text-gray-700 leading-[0.5] lg:leading-normal">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Industries */}
                <div className="space-y-0.5">
                  <Link
                    to="/industries"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <span className="font-poppins font-medium text-[#1B3764] text-sm">Industries</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#F2611D] transition-colors" />
                  </Link>
                  <div className="ml-3 border-l-2 border-gray-100 pl-3">
                    {industriesItems.slice(0, 6).map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 py-0.5 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        {item.iconSrc && (
                          <img src={item.iconSrc} alt="" className="w-5 h-5 object-contain" />
                        )}
                        <span className="font-poppins text-xs text-gray-700 leading-[0.5] lg:leading-normal">{toTitleCase(item.label)}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* About */}
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="font-poppins font-medium text-[#1B3764] text-sm">About</span>
                </Link>

                {/* Blog */}
                <Link
                  to="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="font-poppins font-medium text-[#1B3764] text-sm">Blog</span>
                </Link>

                {/* Contact Button */}
                <div className="pt-3 border-t border-gray-200">
                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center rounded-full bg-[#F2611D] text-white px-5 py-2.5 text-sm font-poppins font-medium hover:bg-[#F2611D]/90 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default HeaderV2;


