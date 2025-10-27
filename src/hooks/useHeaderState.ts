import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { getProducts } from '@/utils/products';
import { industries as industriesData } from '@/data/industries';
import { tools as toolsData } from '@/data/tools';

const navigation = [
  { name: 'Products', href: '/products' },
  { name: 'Industries', href: '/industries' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
];

export const useHeaderState = () => {
  const navigate = useNavigate();
  const productsData = getProducts();

  // Overlay state
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [activeOverlayContent, setActiveOverlayContent] = useState<string | null>(null);
  const [animationDirection, setAnimationDirection] = useState('down');
  const [slideDirection, setSlideDirection] = useState(1);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Video state
  const [hoveredVideoUrl, setHoveredVideoUrl] = useState<string | null>(null);

  // Scroll state
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Header hover state
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  // Refs
  const headerRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Change background when scrolled past 100px (adjust as needed)
      setIsScrolled(scrollTop > 100);
      
      // Close overlay immediately when scrolling (even if hovering)
      if (isOverlayOpen) {
        setAnimationDirection('up');
        setIsOverlayOpen(false);
        setActiveOverlayContent(null);
        
        // Clear any pending hover timeout
        if (hoverTimeout) {
          clearTimeout(hoverTimeout);
          setHoverTimeout(null);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOverlayOpen, hoverTimeout]);

  // Update video URL when overlay content changes
  useEffect(() => {
    // Don't auto-select any video - let user hover to see videos
    setHoveredVideoUrl(null);
  }, [activeOverlayContent]);

  const closeOverlay = useCallback(() => {
    setAnimationDirection('up');
    setIsOverlayOpen(false);
    setActiveOverlayContent(null);
  }, []);

  const handleNavClick = useCallback((content: string) => {
    const lower = content.toLowerCase();
    // For dropdown items, toggle the overlay instead of navigating
    if (['products', 'industries'].includes(lower)) {
      if (isOverlayOpen && activeOverlayContent === lower) {
        // Close if the same menu button is clicked again
        closeOverlay();
      } else {
        // Open and show the requested content
        setAnimationDirection('down');
        setIsOverlayOpen(true);
        setActiveOverlayContent(lower);
      }
      return;
    }

    // Default behavior for non-dropdown items: navigate
    const navItem = navigation.find(item => item.name.toLowerCase() === lower);
    if (navItem) {
      closeOverlay();
      navigate(navItem.href);
    }
  }, [navigate, closeOverlay, isOverlayOpen, activeOverlayContent]);

  const handleNavHover = useCallback((content: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }

    // Don't show overlay for blog (direct navigation)
    if (content === 'blog') {
      return;
    }

    if (isOverlayOpen && activeOverlayContent === content) {
      return;
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
  }, [hoverTimeout, isOverlayOpen, activeOverlayContent]);

  const handleNavLeave = useCallback(() => {
    // Close submenu after 1 second delay
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    
    const timeout = setTimeout(() => {
      setAnimationDirection('up');
      setIsOverlayOpen(false);
      setActiveOverlayContent(null);
    }, 1000); // 1 second delay
    
    setHoverTimeout(timeout);
  }, [hoverTimeout]);

  const handleOverlayEnter = useCallback(() => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  }, [hoverTimeout]);



  const openMobileMenu = useCallback(() => {
    setMobileMenuOpen(true);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return {
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
    productsRef,
    industriesRef,
    toolsRef,
    searchRef,
    
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
  };
}; 