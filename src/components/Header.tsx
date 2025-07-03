import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut } from 'lucide-react';

// Data for navigation and search
import { products as productsData } from '@/data/products';
import { industries as industriesData } from '@/data/industries';
import { productCategories } from '@/data/productCategories';

const navigation = [
  { name: 'Products', href: '/products' },
  { name: 'Industries', href: '/industries' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Tools', href: '/tools' },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // State from original glass nav
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [activeOverlayContent, setActiveOverlayContent] = useState<string | null>(null);
  const [animationDirection, setAnimationDirection] = useState('down');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // State for search
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<{ name: string; href: string; type: string }[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const [hoveredVideoUrl, setHoveredVideoUrl] = useState<string | null>(null);
  const [slideDirection, setSlideDirection] = useState(1);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // Refs from original glass nav
  const headerRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeOverlayContent === 'industries' && industriesData.length > 0) {
      setHoveredVideoUrl(industriesData[0].videoUrl);
    } else if (activeOverlayContent === 'products' && productsData.length > 0) {
      setHoveredVideoUrl(productsData[0].videoUrl);
    } else {
      setHoveredVideoUrl(null);
    }
  }, [activeOverlayContent]);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const productResults = productCategories
        .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(p => ({ name: p.title, href: `/products/${p.title.toLowerCase().replace(/ /g, '-')}`, type: 'Product Category' }));
      const industryResults = industriesData
        .filter(i => i.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(i => ({ name: i.title, href: `/industries/${i.title.toLowerCase().replace(/ /g, '-')}`, type: 'Industry' }));
      setSearchResults([...productResults, ...industryResults]);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchTerm]);

  const handleNavClick = (content: string) => {
    // Navigate to the page
    const navItem = navigation.find(item => item.name.toLowerCase() === content);
    if (navItem) {
      navigate(navItem.href);
    }
  };

  const handleNavHover = (content: string) => {
    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }

    if (isOverlayOpen && activeOverlayContent === content) {
      return; // Already open
    }
    
    const navItems = navigation.map(i => i.name.toLowerCase());
    const oldIndex = navItems.indexOf(activeOverlayContent || '');
    const newIndex = navItems.indexOf(content);
    
    if (oldIndex !== -1 && newIndex !== -1) {
      setSlideDirection(newIndex > oldIndex ? 1 : -1);
    }

    setAnimationDirection('down');
    setIsOverlayOpen(true);
    setActiveOverlayContent(content);
  };

  const handleNavLeave = () => {
    // Set a timeout to close the overlay after a delay
    const timeout = setTimeout(() => {
      closeOverlay();
    }, 300); // 300ms delay
    setHoverTimeout(timeout);
  };

  const handleOverlayEnter = () => {
    // Clear the timeout when entering the overlay
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const closeOverlay = () => {
    setAnimationDirection('up');
    setIsOverlayOpen(false);
    setActiveOverlayContent(null);
  };
  
  const handleSignOut = async () => {
    await signOut();
    setMobileMenuOpen(false);
    closeOverlay(); // Close any open overlays on sign out
  };

  return (
    <header ref={headerRef} className="fixed top-0 w-full z-50 bg-[rgb(39,65,108)] backdrop-blur-sm bg-opacity-70">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="https://forzabuilt.com/wp-content/uploads/2022/12/Forza-Corporate-Masterbrand-horizontal-Positive.webp" 
              alt="Forza Logo" 
              className="h-8 w-auto filter brightness-0 invert"
            />
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {['Industries', 'Products', 'Tools'].includes(item.name) ? (
                  <div 
                    ref={item.name === 'Industries' ? industriesRef : item.name === 'Products' ? productsRef : toolsRef}
                    onMouseEnter={() => handleNavHover(item.name.toLowerCase())}
                    onMouseLeave={handleNavLeave}
                  >
                    <button
                      type="button"
                      onClick={() => handleNavClick(item.name.toLowerCase())}
                      className={`flex items-center space-x-1 text-xl font-medium transition-colors hover:text-[#F2611D] ${
                        (isOverlayOpen && activeOverlayContent === item.name.toLowerCase()) || location.pathname.startsWith(item.href)
                          ? 'text-[#F2611D]'
                          : 'text-white'
                      }`}
                    >
                      <span>{item.name}</span>
                      <motion.svg
                        animate={{ rotate: (isOverlayOpen && activeOverlayContent === item.name.toLowerCase()) ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-5 h-5"
                        fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`text-xl font-medium transition-colors hover:text-[#F2611D] ${location.pathname === item.href 
                        ? 'text-[#F2611D] bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg' 
                        : 'text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
             <div ref={searchRef} className="relative flex items-center">
              <input
                type="text"
                placeholder={isSearchFocused ? "Search for products and industries..." : "Search..."}
                className={`py-2 px-4 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#F2611D] transition-all duration-300 ease-in-out ${isSearchFocused ? 'w-64' : 'w-40'}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => !showSearchResults && searchTerm.length === 0 && setIsSearchFocused(false)}
              />
            </div>

            <Button asChild className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-8 py-6 text-xl">
              <Link to="/contact">Contact Us</Link>
            </Button>
            
            {/* Auth Section */}
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-white text-sm hidden lg:inline">{user.email}</span>
                  <Button onClick={handleSignOut} size="lg" className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full flex items-center space-x-2">
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              ) : (
                <Button asChild size="lg" className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-8 py-6 text-xl">
                  <Link to="/auth">
                    Sign In
                  </Link>
                </Button>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button type="button" className="text-white focus:outline-none" onClick={() => setMobileMenuOpen(true)}>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            initial={{ opacity: 0, y: animationDirection === 'down' ? -20 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: animationDirection === 'up' ? -20 : 20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="global-nav-overlay fixed top-[72px] left-0 w-full bg-[#1b3764] backdrop-blur-sm bg-opacity-90 z-40 shadow-xl overflow-hidden"
            onMouseEnter={handleOverlayEnter}
            onMouseLeave={handleNavLeave}
            onClick={closeOverlay}
          >
            {/* Background Video - Plays only on hover */}
            {hoveredVideoUrl && (
              <>
                <video
                  key={hoveredVideoUrl}
                  loop
                  muted
                  autoPlay
                  playsInline
                  className="absolute top-0 left-0 w-full h-full object-cover -z-20"
                >
                  <source src={hoveredVideoUrl} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/50 -z-10"></div> {/* Scrim */}
              </>
            )}

            <div className="container mx-auto px-6 h-72 relative flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence initial={false} custom={slideDirection}>
                <motion.div
                  key={activeOverlayContent}
                  custom={slideDirection}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={{
                    enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
                    center: { x: 0, opacity: 1 },
                    exit: (direction: number) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0 }),
                  }}
                  transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
                  className="absolute"
                >
                  {activeOverlayContent === 'industries' && (
                    <div className="flex flex-row items-start justify-center space-x-12 text-center" onMouseLeave={() => setHoveredVideoUrl(null)}>
                      {industriesData.map(industry => (
                        <Link
                          key={industry.title}
                          to={`/industries/${industry.title.toLowerCase().replace(/ /g, '-')}`}
                          className="flex flex-col items-center w-36 text-white hover:text-[#F2611D] transition-colors duration-300 group"
                          onMouseEnter={() => setHoveredVideoUrl(industry.videoUrl)}
                        >
                          <div className="w-24 h-24 flex items-center justify-center mb-4">
                            <img src={industry.logo} alt={`${industry.title} Logo`} className="max-w-full max-h-full object-contain"/>
                          </div>
                          <h3 className="text-xl font-semibold">{industry.title}</h3>
                          <p className="text-xs mt-1 text-white/80">{industry.description}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                  {activeOverlayContent === 'products' && (
                    <div className="flex flex-row items-center justify-center space-x-8 text-center" onMouseLeave={() => setHoveredVideoUrl(null)}>
                      {productsData.map(product => {
                        if (product.name === 'RuggedRed') {
                          return (
                            <a
                              key={product.name}
                              href={product.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col items-center w-48 text-white hover:text-[#F2611D] transition-colors duration-300 group"
                              onMouseEnter={() => setHoveredVideoUrl('https://videos.ctfassets.net/hdznx4p7ef81/4bBm5VZIdxCP0jstaQKLB6/405885ebcbeb8e443ba0887395e5d1c2/Firefighter_Spray_Wipe_1.mp4?q=70&fm=mp4&w=1280')}
                            >
                              <div className="w-40 h-24 flex items-center justify-center">
                                <img src={product.hoverImage} alt={`${product.name} Logo`} className="max-w-full max-h-full object-contain"/>
                              </div>
                            </a>
                          );
                        }
                        
                        return (
                          <Link
                            key={product.name}
                            to={`/products/${product.name.toLowerCase()}`}
                            className="flex flex-col items-center w-48 text-white hover:text-[#F2611D] transition-colors duration-300 group"
                            onMouseEnter={() => setHoveredVideoUrl(product.videoUrl)}
                          >
                            <div className="w-40 h-24 flex items-center justify-center">
                              <img src={product.hoverImage} alt={`${product.name} Logo`} className="max-w-full max-h-full object-contain"/>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                  {activeOverlayContent === 'tools' && (
                    <div><h3 className="text-white text-2xl">Tools</h3></div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-[#1b3764] z-50 p-6 md:hidden"
          >
            <div className="flex justify-end mb-8">
              <button type="button" className="text-white" onClick={() => setMobileMenuOpen(false)}>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <nav className="flex flex-col space-y-6">
              {navigation.map((item) => (
                <Link key={item.name} to={item.href} className="text-white text-2xl font-medium" onClick={() => setMobileMenuOpen(false)}>{item.name}</Link>
              ))}
              <div className="border-t border-white/20 pt-6">
                {user ? (
                   <div className="flex items-center space-x-4">
                    <span className="text-white text-lg">{user.email}</span>
                    <Button onClick={handleSignOut} variant="outline" className="border-white text-white hover:bg-white hover:text-[#1b3764]">Sign Out</Button>
                   </div>
                ) : (
                  <Button asChild variant="outline" className="w-full border-white text-white hover:bg-white hover:text-[#1b3764]">
                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                  </Button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
