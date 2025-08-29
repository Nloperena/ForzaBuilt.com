import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { getProducts } from '@/utils/products';
import { industries as industriesData } from '@/data/industries';
import { tools as toolsData } from '@/data/tools';

const navigation = [
  { name: 'Products', href: '/products' },
  { name: 'Industries', href: '/industries' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    const navItem = navigation.find(item => item.name.toLowerCase() === content);
    if (navItem) {
      // Close overlay before navigation
      closeOverlay();
      navigate(navItem.href);
    }
  }, [navigate, closeOverlay]);

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
    const timeout = setTimeout(() => {
      closeOverlay();
    }, 500);
    setHoverTimeout(timeout);
  }, []);

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
  };
}; 