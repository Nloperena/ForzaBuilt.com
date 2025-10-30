import React from 'react';
import { Link } from 'react-router-dom';
import { useGradientMode } from '@/contexts/GradientModeContext';
import Logo from '@/components/Header/Logo';

type MenuItem = { label: string; href: string; iconSrc?: string };

const productsItems: MenuItem[] = [
  { label: 'Adhesives', href: '/products/bond' },
  { label: 'Sealants', href: '/products/seal' },
  { label: 'Tapes', href: '/products/tape' },
  { label: 'Cleaners', href: '/products/ruggedred' },
];

const industriesItems: MenuItem[] = [
  { label: 'Industrial', href: '/industries/industrial', iconSrc: '/products/brand-logos/product-line-brands-white-bond.svg' },
  { label: 'Transportation', href: '/industries/transportation', iconSrc: '/img/industries/transportation.png' },
  { label: 'Marine', href: '/industries/marine', iconSrc: '/img/industries/marine.png' },
  { label: 'Composites', href: '/industries/composites', iconSrc: '/img/industries/composites.png' },
  { label: 'Construction', href: '/industries/construction', iconSrc: '/img/industries/construction.png' },
  { label: 'Insulation', href: '/industries/insulation', iconSrc: '/img/industries/insulation.png' },
];

const HoverDropdown: React.FC<{ items: MenuItem[]; widthClass?: string }> = ({ items, widthClass = 'w-[760px]' }) => {
  return (
    <div className={`absolute left-1/2 -translate-x-1/2 top-full ${widthClass} rounded-lg bg-[#2c476e] text-white shadow-2xl border border-white/10 overflow-hidden`}> 
      <div className="grid grid-cols-4 divide-x divide-white/20">
        {items.map((it) => (
          <Link key={it.label} to={it.href} className="group relative flex items-center justify-center gap-3 py-6 px-6 hover:bg-white/10 transition-colors">
            {it.iconSrc ? (
              <img src={it.iconSrc} alt="" className="hidden md:block w-8 h-8 object-contain" />
            ) : null}
            <span className="font-poppins text-lg">{it.label}</span>
            <span className="absolute right-0 top-0 h-full w-px bg-white/20" aria-hidden />
          </Link>
        ))}
      </div>
    </div>
  );
};

const HeaderV2: React.FC = () => {
  const { mode } = useGradientMode();
  const isLight = mode === 'light' || mode === 'light2';

  return (
    <header className={`sticky top-0 z-50 ${isLight ? 'bg-white/90 backdrop-blur-md' : 'bg-[#1b3764]/70 backdrop-blur-md'} shadow-sm`}> 
      <nav className="max-w-7xl mx-auto px-4">
        <div className="h-20 flex items-center justify-between">
          {/* Left logo */}
          <div className="flex items-center">
            <Logo className="h-10 md:h-12 w-auto" isWhiteBackground={isLight} />
          </div>

          {/* Center nav */}
          <div className="hidden lg:flex items-center gap-6 relative">
            {/* Products */}
            <div className="relative group">
              <Link to="/products" className="px-4 py-2 rounded-md font-semibold text-[17px] text-[#1B3764] transition-all group-hover:bg-white group-hover:shadow-xl group-hover:-mb-2 group-hover:relative group-hover:z-20 border border-transparent group-hover:border-white/60">Products ▾</Link>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150">
                <div className="mt-0">
                  <HoverDropdown items={productsItems} widthClass="w-[880px]" />
                </div>
              </div>
            </div>

            {/* Industries */}
            <div className="relative group">
              <Link to="/industries" className="px-4 py-2 rounded-md font-semibold text-[17px] text-[#1B3764] transition-all group-hover:bg-white group-hover:shadow-xl group-hover:-mb-2 group-hover:relative group-hover:z-20 border border-transparent group-hover:border-white/60">Industries ▾</Link>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150">
                <div className="mt-0">
                  <HoverDropdown items={industriesItems} widthClass="w-[1120px]" />
                </div>
              </div>
            </div>

            <Link to="/about" className="px-3 py-2 rounded-md font-medium text-[17px] text-[#1B3764] hover:text-[#1B3764]/80">About</Link>
            <Link to="/blog" className="px-3 py-2 rounded-md font-medium text-[17px] text-[#1B3764] hover:text-[#1B3764]/80">Blog</Link>
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
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


