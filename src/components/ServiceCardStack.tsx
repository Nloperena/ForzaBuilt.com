
/**
 * ServiceCardStack Component
 * 
 * A reusable, data-driven component that creates a stack of service cards with scroll-based animations.
 * This component is designed to be CMS-ready and can accept dynamic card data through props.
 * 
 * Key Features:
 * - Scroll-based stacking animation
 * - Dynamic card generation from data
 * - Self-contained scroll calculations
 * - Responsive to viewport changes
 * - CMS-ready data structure
 * 
 * Animation Logic:
 * - Cards stack on top of each other as user scrolls
 * - Each card scales down slightly and moves up as the next card approaches
 * - Uses sticky positioning to keep cards in view during animation
 * - Calculates relative scroll positions based on component's document position
 */

import { useEffect, useState, useRef } from 'react';
import ServiceCard from './ServiceCard';
import { ServiceCardStackProps, ServiceCardData } from '../types/ServiceCard';

const ServiceCardStack = ({ cards: propCards, className = '' }: ServiceCardStackProps) => {
  // State for tracking scroll position and component positioning
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerTop, setContainerTop] = useState(0);

  /**
   * Default card data - serves as placeholder content and fallback
   * In a CMS implementation, this would be replaced by data from the CMS
   * Each card represents a different service offering with unique content structure
   */
  const defaultCards: ServiceCardData[] = [
    {
      // Construction Management Card
      // Features technology showcase and specialty areas
      id: 'construction',
      title: 'Construction Management',
      icon: '🏗️',
      features: [
        'End-to-end project oversight',
        'Quality control & safety standards', 
        'On-time delivery guaranteed'
      ],
      buttonText: 'Start project',
      technologies: ['AutoCAD', 'Revit', 'SketchUp'],
      supportedTech: ['BIM', 'CAD', '3D Modeling', 'Drone Survey', 'AR/VR'],
      specialties: ['Residential', 'Commercial', 'Industrial', 'Infrastructure']
    },
    {
      // Architectural Design Card
      // Features storytelling and design consultation interface
      id: 'design',
      title: 'Architectural Design',
      icon: '📐',
      features: [
        'Custom architectural solutions',
        'Sustainable design practices',
        'Code compliance expertise'
      ],
      buttonText: 'Get design',
      model: 'Modern Minimalist',
      modelDesc: 'Contemporary design with clean lines',
      storyPrompt: 'Tell me about your dream home.',
      storyText: `Imagine walking into a space where every corner tells a story of thoughtful design and meticulous craftsmanship. Floor-to-ceiling windows flood the open-concept living area with natural light, while exposed steel beams add an industrial elegance. The kitchen island, crafted from locally sourced granite, serves as both a functional workspace and a gathering point for family and friends. This isn't just a house—it's a carefully orchestrated symphony of form and function, designed to enhance every moment of daily life.`
    },
    {
      // Home Renovation Card
      // Features project options with pricing and timeline information
      id: 'renovation',
      title: 'Home Renovation',
      icon: '🔨',
      features: [
        'Complete home transformations',
        'Budget-friendly solutions',
        'Licensed & insured contractors'
      ],
      buttonText: 'Start renovation',
      projectOptions: [
        { name: 'Kitchen Remodel', location: 'Austin, TX', price: '$25K - $50K', duration: '6-8 weeks', flag: '🏠' },
        { name: 'Bathroom Upgrade', location: 'Houston, TX', price: '$15K - $30K', duration: '4-6 weeks', flag: '🛁' },
        { name: 'Basement Finish', location: 'Dallas, TX', price: '$20K - $40K', duration: '8-10 weeks', flag: '🏡' },
        { name: 'Whole House', location: 'San Antonio, TX', price: '$75K - $150K', duration: '12-16 weeks', flag: '🏘️' }
      ]
    }
  ];

  // Use provided cards or fall back to default cards
  // This allows the component to work with or without external data
  const cards = propCards || defaultCards;

  /**
   * Scroll Event Handler
   * Updates the scrollY state whenever the user scrolls
   * This drives all the animation calculations
   */
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup listener on component unmount
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
        // Calculate absolute position from top of document
        setContainerTop(rect.top + window.scrollY);
      }
    };

    // Calculate position on mount and window resize
    updateContainerPosition();
    window.addEventListener('resize', updateContainerPosition);
    
    // Small delay ensures all DOM elements are fully rendered
    const timer = setTimeout(updateContainerPosition, 100);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateContainerPosition);
      clearTimeout(timer);
    };
  }, [cards]); // Re-calculate when cards change (important for dynamic data)

  /**
   * Render the card stack
   * Each card is positioned with sticky positioning and animated based on scroll progress
   */
  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {cards.map((card, index) => {
        // Animation calculations for each card
        const cardHeight = window.innerHeight; // Each card takes full viewport height
        const cardStart = containerTop + (index * cardHeight); // When this card should start animating
        
        // Progress calculation (0 = card just entered view, 1 = card fully animated)
        const progress = Math.max(0, Math.min(1, (scrollY - cardStart) / cardHeight));
        
        // Next card progress (used for fading out current card)
        const nextCardProgress = Math.max(0, Math.min(1, (scrollY - cardStart - cardHeight) / cardHeight));
        
        // Transform calculations
        const currentScale = 1 - progress * 0.05; // Slight scale down as card moves up
        const currentTranslateY = progress * -50; // Move card up as it's being replaced
        
        // Visibility calculation (card should be visible during its animation window)
        const isVisible = scrollY >= cardStart - cardHeight && scrollY < cardStart + cardHeight * 2;
        
        return (
          <div
            key={card.id} // Use card ID for React key (important for dynamic data)
            className="sticky top-0 w-full h-screen flex items-center justify-center"
            style={{
              zIndex: 40 + index, // Each subsequent card has higher z-index
            }}
          >
            <ServiceCard
              card={card}
              transform={`translateY(${currentTranslateY}px) scale(${currentScale})`}
              opacity={isVisible ? 1 - nextCardProgress : 0}
            />
          </div>
        );
      })}
      
      {/* 
        Spacer Element
        Provides the necessary scroll height for the stacking animation to work
        Height is calculated based on number of cards * viewport height
        Without this, there wouldn't be enough scroll distance to animate all cards
      */}
      <div style={{ height: `${cards.length * window.innerHeight}px` }} />
    </div>
  );
};

export default ServiceCardStack;
