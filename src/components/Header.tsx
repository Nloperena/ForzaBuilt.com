import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useHeaderState } from '@/hooks/useHeaderState';
import Logo from './Header/Logo';
import NavigationItem from './Header/NavigationItem';
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
    openMobileMenu,
    closeMobileMenu,
    setHoveredVideoUrl,
  } = useHeaderState();

  return (
    <header 
      ref={headerRef} 
      className="fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-2xl bg-white/50 border-b border-white/60 shadow-2xl"
      style={{ backgroundColor: '#115B8730' }}
      onMouseEnter={handleOverlayEnter}
      onMouseLeave={handleNavLeave}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo className="h-8 w-auto sm:h-[4.5rem]" />
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
            
            <Button asChild className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-8 py-6 text-xl border border-[#F2611D]">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center lg:hidden">
            <button 
              type="button"
              className="p-2 text-white/80 hover:text-white transition-colors"
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

      {/* Navigation Overlay */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            initial={{ opacity: 0, y: animationDirection === 'down' ? -20 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: animationDirection === 'up' ? -20 : 20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="global-nav-overlay fixed left-0 w-full bg-[var(--forza-blue-velvet)] backdrop-blur-sm bg-opacity-90 z-40 shadow-sm overflow-hidden font-kallisto"
            style={{ top: headerRef.current?.offsetHeight ?? 72 }}
            onMouseEnter={handleOverlayEnter}
            onMouseLeave={handleNavLeave}
            onClick={closeOverlay}
          >
            {/* Default Gradient Background (when no video is hovered) */}
            {!hoveredVideoUrl && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#1B3764] to-[#2C5F8A] -z-20"></div>
            )}
            
            {/* Background Video (only when hovered) */}
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
        navigation={navigation}
      />
    </header>
  );
};

export default Header;
