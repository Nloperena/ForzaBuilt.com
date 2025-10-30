import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGradientMode } from '@/contexts/GradientModeContext';
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
  return (
    <div className={`absolute left-1/2 -translate-x-1/2 top-full -mt-2 ${widthClass} rounded-lg bg-[#2c476e] text-white shadow-2xl border border-white/10 overflow-hidden z-20`}> 
      {variant === 'industries' ? (
        <div className="grid grid-cols-6">
          {items.map((it, idx) => (
            <Link key={it.label} to={it.href} className="group relative z-30 flex flex-col items-center justify-center gap-3 py-6 px-6 transition-colors hover:bg-[#F2611D]">
              {it.iconSrc ? (
                <img src={it.iconSrc} alt="" className="w-12 h-12 object-contain rounded-full bg-white/10 p-1" />
              ) : null}
              <span className="font-poppins text-xl font-normal group-hover:font-bold">{toTitleCase(it.label)}</span>
              {idx < items.length - 1 && <span className="absolute right-0 top-4 bottom-4 w-px bg-white/20" aria-hidden />}
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 divide-x divide-white/20">
          {items.map((it) => (
            <Link key={it.label} to={it.href} className="group relative z-30 flex items-center justify-center gap-3 py-6 px-6 transition-colors hover:bg-[#F2611D]">
              {it.iconSrc ? (
                <img src={it.iconSrc} alt="" className="hidden md:block w-8 h-8 object-contain" />
              ) : null}
              <span className="font-poppins text-lg font-normal group-hover:font-bold">{toTitleCase(it.label)}</span>
              <span className="absolute right-0 top-0 h-full w-px bg-white/20" aria-hidden />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

 const HeaderV2: React.FC = () => {
  const { mode } = useGradientMode();
  const location = useLocation();
  const isHome = location.pathname === '/';
   const [isScrolled, setIsScrolled] = React.useState(false);
   React.useEffect(() => {
     const onScroll = () => setIsScrolled(window.scrollY > 8);
     onScroll();
     window.addEventListener('scroll', onScroll, { passive: true });
     return () => window.removeEventListener('scroll', onScroll);
   }, []);
   const isLight = mode === 'light' || mode === 'light2';

  const headerBg = isHome && !isScrolled
    ? 'bg-transparent'
     : isLight
       ? 'bg-white/90 backdrop-blur-md'
       : 'bg-[#1b3764]/70 backdrop-blur-md';
   const headerShadow = isScrolled ? 'shadow-sm' : '';

  const positionClass = isHome && !isScrolled ? 'fixed' : 'sticky';

  return (
    <header className={`${positionClass} top-0 left-0 right-0 z-50 transition-colors duration-200 ${headerBg} ${headerShadow}`}> 
       <nav className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4">
         <div className="h-24 md:h-28 flex items-center justify-between">
          {/* Left logo */}
          <div className="flex items-center">
             <Logo className="h-16 md:h-20 lg:h-24 w-auto" isWhiteBackground={isScrolled || isLight} />
          </div>

          {/* Center nav */}
          <div className="hidden lg:flex items-center gap-6 relative">
            {/* Products */}
            <div className="relative group">
              <Link to="/products" className="px-4 py-2 rounded-md font-normal text-[17px] capitalize text-[#1B3764] transition-all group-hover:bg-[#2c476e] group-hover:text-white group-hover:font-bold group-hover:shadow-xl group-hover:-mb-2 group-hover:relative group-hover:z-30 border border-transparent">Products ▾</Link>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150">
                <div className="mt-0 z-10 relative">
                  <HoverDropdown items={productsItems} widthClass="w-[880px]" />
                </div>
              </div>
            </div>

            {/* Industries */}
            <div className="relative group">
              <Link to="/industries" className="px-4 py-2 rounded-md font-normal text-[17px] capitalize text-[#1B3764] transition-all group-hover:bg-[#2c476e] group-hover:text-white group-hover:font-bold group-hover:shadow-xl group-hover:-mb-2 group-hover:relative group-hover:z-30 border border-transparent">Industries ▾</Link>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150">
                <div className="mt-0 z-10 relative">
                  <HoverDropdown items={industriesItems} widthClass="w-[1200px]" variant="industries" />
                </div>
              </div>
            </div>

            <Link to="/about" className="px-3 py-2 rounded-md font-normal text-[17px] capitalize text-[#1B3764] hover:text-[#1B3764]/80 hover:font-bold">About</Link>
            <Link to="/blog" className="px-3 py-2 rounded-md font-normal text-[17px] capitalize text-[#1B3764] hover:text-[#1B3764]/80 hover:font-bold">Blog</Link>
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-6">
            <SearchBar />
            <Link to="/contact" className="rounded-full bg-[#F2611D] text-white px-6 py-3 text-base font-medium hover:bg-[#F2611D]/90">Contact Us</Link>
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


