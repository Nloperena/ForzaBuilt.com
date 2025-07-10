
/**
 * useScrollCalculator Hook
 * 
 * Custom hook that handles all scroll-based calculations for the ServiceCardStack.
 * This hook encapsulates the complex logic for determining scroll positions,
 * container positioning, and animation progress calculations.
 * 
 * Key Responsibilities:
 * - Track current scroll position
 * - Calculate container's position in the document
 * - Provide scroll progress for individual cards
 * - Handle viewport changes and container repositioning
 */

import { useEffect, useState, useRef, RefObject } from 'react';

interface UseScrollCalculatorProps {
  cardCount: number;
  containerRef: RefObject<HTMLDivElement>;
}

interface ScrollCalculatorReturn {
  scrollY: number;
  containerTop: number;
  getCardProgress: (cardIndex: number) => {
    progress: number;
    nextCardProgress: number;
    isVisible: boolean;
  };
}

export const useScrollCalculator = ({ 
  cardCount, 
  containerRef 
}: UseScrollCalculatorProps): ScrollCalculatorReturn => {
  const [scrollY, setScrollY] = useState(0);
  const [containerTop, setContainerTop] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  /**
   * Scroll Event Handler
   * Updates the scrollY state whenever the user scrolls
   * This drives all the animation calculations
   */
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Container Position Calculator
   * Determines where this component sits in the document
   * This is crucial for calculating relative scroll positions
   * 
   * Why this matters:
   * - Component might be placed anywhere in the document
   * - Scroll animations need to trigger at the right viewport position
   * - Must account for other content above this component
   */
  useEffect(() => {
    const updateContainerPosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerTop(rect.top + window.scrollY);
        setIsInitialized(true);
      }
    };

    // Initial position calculation
    updateContainerPosition();
    
    // Add event listeners
    window.addEventListener('resize', updateContainerPosition);
    
    // Multiple delayed updates to handle image loading
    const timers = [
      setTimeout(updateContainerPosition, 100),
      setTimeout(updateContainerPosition, 500),
      setTimeout(updateContainerPosition, 1000),
      setTimeout(updateContainerPosition, 2000)
    ];

    return () => {
      window.removeEventListener('resize', updateContainerPosition);
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [containerRef, cardCount]);

  /**
   * Card Progress Calculator
   * Calculates animation progress for a specific card based on scroll position
   */
  const getCardProgress = (cardIndex: number) => {
    // Don't calculate progress until container is properly positioned
    if (!isInitialized) {
      return { progress: 0, nextCardProgress: 0, isVisible: false };
    }

    const cardHeight = window.innerHeight;
    const cardStart = containerTop + (cardIndex * cardHeight);
    
    // Progress calculation (0 = card just entered view, 1 = card fully animated)
    const progress = Math.max(0, Math.min(1, (scrollY - cardStart) / cardHeight));
    
    // Next card progress (used for fading out current card)
    const nextCardProgress = Math.max(0, Math.min(1, (scrollY - cardStart - cardHeight) / cardHeight));
    
    // Visibility calculation (card should be visible during its animation window)
    const isVisible = scrollY >= cardStart - cardHeight && scrollY < cardStart + cardHeight * 2;
    
    return { progress, nextCardProgress, isVisible };
  };

  return {
    scrollY,
    containerTop,
    getCardProgress
  };
};
