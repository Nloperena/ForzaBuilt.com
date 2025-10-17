import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useHeaderState } from '@/hooks/useHeaderState';
import Logo from './Header/Logo';
import NavigationItem from './Header/NavigationItem';
import FlowingMenu from './Header/FlowingMenu';
import OverlayContent from './Header/OverlayContent';
import SearchBar from './Header/SearchBar';
import { useGradientMode } from '@/contexts/GradientModeContext';

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

  return (
    <header 
      ref={headerRef} 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        mode === 'light' 
          ? 'bg-white border-b border-gray-200 shadow-lg' 
          : mode === 'light2'
          ? (isScrolled || isHeaderHovered)
            ? 'bg-[#293350] border-b border-[#293350] shadow-lg'
            : 'bg-transparent border-b border-transparent shadow-none'
          : 'backdrop-blur-2xl bg-white/50 border-b border-white/60'
      }`}
      style={
        mode === 'light' 
          ? { backgroundColor: '#ffffff' } 
          : mode === 'light2'
          ? (isScrolled || isHeaderHovered)
            ? { backgroundColor: '#293350' }
            : { backgroundColor: 'transparent' }
          : { backgroundColor: '#29335030' }
      }
      onMouseEnter={() => {
        setIsHeaderHovered(true);
        handleOverlayEnter();
      }}
      onMouseLeave={() => {
        setIsHeaderHovered(false);
        handleNavLeave();
      }}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        {/* Always centered layout */}
        <div className="flex items-center justify-between">
          {/* Left Navigation */}
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
          </div>
          
          {/* Centered Logo */}
          <div className="flex-shrink-0">
            <Logo className="h-8 w-auto sm:h-[4.5rem]" isScrolled={isScrolled} />
          </div>
          
          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            {/* Desktop Right Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <SearchBar />
              <Button asChild className="bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-8 py-6 text-xl border border-[#F2611D]">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
            
            {/* Mobile Navigation Button */}
            <button 
              type="button"
              className="lg:hidden p-2 transition-colors text-white hover:text-white/80"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="global-nav-overlay fixed left-0 w-full z-40 overflow-hidden font-kallisto flex justify-center"
            style={{ top: headerRef.current?.offsetHeight ?? 72 }}
            onMouseEnter={handleOverlayEnter}
            onMouseLeave={handleNavLeave}
            onClick={closeOverlay}
          >
            <div className={`w-full max-w-[1400px] relative rounded-b-2xl overflow-hidden ${
              mode === 'light' || mode === 'light2'
                ? 'bg-white'
                : 'bg-[var(--forza-blue-velvet)] bg-opacity-90'
            }`}>
              {/* Default Gradient Background - only for dark mode */}
              {mode !== 'light' && mode !== 'light2' && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#293350] to-[#81899f] -z-20"></div>
              )}

              <div className="px-6 h-56 relative flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <OverlayContent
                  activeContent={activeOverlayContent}
                  slideDirection={slideDirection}
                  onVideoUrlChange={setHoveredVideoUrl}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flowing Mobile Menu */}
      <FlowingMenu
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
      />
    </header>
  );
};

export default Header;
