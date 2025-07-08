import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { products as productsData } from '@/data/products';
import { industries as industriesData } from '@/data/industries';

const navigation = [
  { name: 'Products', href: '/products' },
  { name: 'Industries', href: '/industries' },
  { name: 'Approach', href: '/approach' },
  { name: 'About', href: '/about' },
  { name: 'Tools', href: '/tools' },
];

export const useHeaderState = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

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

  // Refs
  const headerRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Update video URL when overlay content changes
  useEffect(() => {
    if (activeOverlayContent === 'industries' && industriesData.length > 0) {
      setHoveredVideoUrl(industriesData[0].videoUrl);
    } else if (activeOverlayContent === 'products' && productsData.length > 0) {
      setHoveredVideoUrl(productsData[0].videoUrl);
    } else {
      setHoveredVideoUrl(null);
    }
  }, [activeOverlayContent]);

  const handleNavClick = useCallback((content: string) => {
    const navItem = navigation.find(item => item.name.toLowerCase() === content);
    if (navItem) {
      navigate(navItem.href);
    }
  }, [navigate]);

  const handleNavHover = useCallback((content: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
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
    }, 300);
    setHoverTimeout(timeout);
  }, []);

  const handleOverlayEnter = useCallback(() => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  }, [hoverTimeout]);

  const closeOverlay = useCallback(() => {
    setAnimationDirection('up');
    setIsOverlayOpen(false);
    setActiveOverlayContent(null);
  }, []);

  const handleSignOut = useCallback(async () => {
    await signOut();
    setMobileMenuOpen(false);
    closeOverlay();
  }, [signOut, closeOverlay]);

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
    handleSignOut,
    openMobileMenu,
    closeMobileMenu,
    setHoveredVideoUrl,
  };
}; 