import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useHeaderState } from '@/hooks/useHeaderState';
import Logo from './Header/Logo';
import NavigationItem from './Header/NavigationItem';
import DrawerContentV2 from './Header/DrawerContentV2';
import SearchBar from './Header/SearchBar';
import { useGradientMode } from '@/contexts/GradientModeContext';
import { useBookViewer } from '@/contexts/BookViewerContext';

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
    isHeaderHovered,
    navigation,
    
    // Refs
    headerRef,
    
    // Handlers
    handleNavClick,
    handleNavHover,
    handleNavLeave,
    handleOverlayEnter,
    closeOverlay,
    openMobileMenu,
    closeMobileMenu,
    setHoveredVideoUrl,
    setIsHeaderHovered,
  } = useHeaderState();
  
  const { mode } = useGradientMode();
  const { isBookOpen } = useBookViewer();

  // Keyboard support for closing drawer
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOverlayOpen) {
        closeOverlay();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOverlayOpen, closeOverlay]);

  // Determine if navbar has white background (light mode or scrolled in light2 mode)
  const isNavbarWhite = mode === 'light' || (mode === 'light2' && isScrolled);

  // Hide header when book is open
  if (isBookOpen) {
    return null;
  }

  return (
    <header 
      ref={headerRef} 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        mode === 'light' 
          ? 'bg-white border-b border-gray-200 shadow-lg' 
          : 'bg-transparent'
      }`}
      onMouseEnter={() => {
        setIsHeaderHovered(true);
        handleOverlayEnter();
      }}
      onMouseLeave={() => {
        setIsHeaderHovered(false);
        closeOverlay();
      }}
    >
      {/* Animated Gradient Background Layer */}
      {mode !== 'light' && (
        <div 
          className={`absolute inset-0 bg-gradient-to-b from-[white] to-[white] transition-opacity duration-500 ${
            isScrolled ? 'opacity-100 shadow-lg' : 'opacity-0'
          }`}
          style={{ zIndex: -1 }}
        />
      )}
      <nav className="max-w-[2000px] mx-auto px-4 sm:px-6 py-3 sm:py-4 relative z-10">
        {/* Left-aligned layout */}
        <div className="flex items-center justify-between">
          {/* Left Logo */}
          <div className="flex-shrink-0">
            <Logo className="h-32 w-auto" isScrolled={isScrolled} isWhiteBackground={isNavbarWhite} />
          </div>
          
          {/* Center Navigation */}
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
                isNavbarWhite={isNavbarWhite}
              />
            ))}
          </div>
          
          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            {/* Desktop Right Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <SearchBar />
              <Button asChild className={`${isNavbarWhite ? 'text-white bg-[#F2611D] hover:bg-[#F2611D]/80' : 'text-white bg-[#F2611D] hover:bg-[#F2611D]/80'} rounded-full px-8 py-6 text-xl border border-[#F2611D]`}>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
            
            {/* Mobile Navigation Button */}
            <button 
              type="button"
              className={`lg:hidden p-2 transition-colors ${isNavbarWhite ? 'text-[#1B3764] hover:text-[#1B3764]/70' : 'text-white hover:text-white/80'}`}
              onClick={openMobileMenu}
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Premium App Drawer V2 */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed left-0 right-0 z-40 overflow-hidden"
            style={{ top: headerRef.current?.offsetHeight ?? 72 }}
            onMouseEnter={handleOverlayEnter}
            onMouseLeave={handleNavLeave}
          >
            {/* Premium Gradient Background with Glass Morphism */}
            <div className="relative w-full">
              {/* Main Drawer Container */}
              <div className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 backdrop-blur-xl shadow-2xl">
                {/* Content Container */}
                <div className="relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
                  <div className="relative min-h-[300px]">
                    <DrawerContentV2
                      activeContent={activeOverlayContent}
                      slideDirection={slideDirection}
                    />
                  </div>
                </div>
                
                {/* Bottom Shadow Gradient for Depth */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
              
              {/* Backdrop Blur Overlay */}
              <div 
                className="fixed inset-0 bg-black/20 backdrop-blur-[2px] -z-10"
                onClick={closeOverlay}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu removed - using HeaderV2 instead */}
    </header>
  );
};

export default Header;
