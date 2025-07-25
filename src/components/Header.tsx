import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useHeaderState } from '@/hooks/useHeaderState';
import Logo from './Header/Logo';
import NavigationItem from './Header/NavigationItem';
import AuthSection from './Header/AuthSection';
import MobileMenu from './Header/MobileMenu';
import OverlayContent from './Header/OverlayContent';
import SearchBar from './Header/SearchBar';

const Header = () => {
  const {
    // State
    isOverlayOpen,
    activeOverlayContent,
    animationDirection,
    slideDirection,
    mobileMenuOpen,
    hoveredVideoUrl,
    isScrolled,
    navigation,
    
    // Refs
    headerRef,
    
    // Handlers
    handleNavClick,
    handleNavHover,
    handleNavLeave,
    handleOverlayEnter,
    closeOverlay,
    handleSignOut,
    openMobileMenu,
    closeMobileMenu,
    setHoveredVideoUrl,
  } = useHeaderState();

  return (
    <header 
      ref={headerRef} 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#1b3764]/90 backdrop-blur-md shadow-lg' 
          : 'bg-[var(--forza-blue-velvet)] backdrop-blur-sm bg-opacity-70'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo className="h-6 w-auto sm:h-8 md:h-10" />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <NavigationItem
                key={item.name}
                item={item}
                isOverlayOpen={isOverlayOpen}
                activeOverlayContent={activeOverlayContent}
                onMouseEnter={handleNavHover}
                onMouseLeave={handleNavLeave}
                onClick={handleNavClick}
              />
            ))}
            
            <SearchBar />
            
            <Button asChild className="forza-btn-primary rounded-full px-8 py-6 text-xl">
              <Link to="/contact">Contact Us</Link>
            </Button>
            
            <AuthSection onSignOut={handleSignOut} />
          </div>

          {/* Mobile Navigation - Simplified and Clean */}
          <div className="lg:hidden flex items-center space-x-2 sm:space-x-3">
            {/* Mobile Contact Button */}
            <Button asChild className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium">
              <Link to="/contact">Contact</Link>
            </Button>

            {/* Mobile Auth */}
            <AuthSection onSignOut={handleSignOut} mobile={true} />

            {/* Mobile Menu Toggle */}
            <button 
              type="button" 
              className="text-white hover:text-gray-200 transition-colors duration-200 p-1 sm:p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20" 
              onClick={openMobileMenu}
              aria-label="Open mobile menu"
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Navigation Overlay */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            initial={{ opacity: 0, y: animationDirection === 'down' ? -20 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: animationDirection === 'up' ? -20 : 20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="global-nav-overlay fixed top-[72px] left-0 w-full bg-[var(--forza-blue-velvet)] backdrop-blur-sm bg-opacity-90 z-40 shadow-xl overflow-hidden"
            onMouseEnter={handleOverlayEnter}
            onMouseLeave={handleNavLeave}
            onClick={closeOverlay}
          >
            {/* Background Video */}
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
                <div className="absolute inset-0 bg-black/50 -z-10"></div>
              </>
            )}

            <div className="container mx-auto px-6 h-56 relative flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <OverlayContent
                activeContent={activeOverlayContent}
                slideDirection={slideDirection}
                onVideoUrlChange={setHoveredVideoUrl}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
        onSignOut={handleSignOut}
        navigation={navigation}
      />
    </header>
  );
};

export default Header;
