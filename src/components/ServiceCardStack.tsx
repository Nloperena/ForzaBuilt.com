
/**
 * ServiceCardStack Component
 * 
 * A reusable, data-driven component that creates a stack of service cards with scroll-based animations.
 * This component has been refactored to be more maintainable by delegating specific responsibilities
 * to focused hooks and components.
 * 
 * Key Features:
 * - Scroll-based stacking animation
 * - Dynamic card generation from data
 * - Self-contained scroll calculations
 * - Responsive to viewport changes
 * - CMS-ready data structure
 * 
 * Architecture:
 * - Uses useScrollCalculator hook for scroll logic
 * - Uses CardStackItem components for individual card rendering
 * - Uses StackSpacer component for scroll height management
 */

import { useRef } from 'react';
import CardStackItem from './cards/CardStackItem';
import StackSpacer from './cards/StackSpacer';
import { useScrollCalculator } from '../hooks/useScrollCalculator';
import { ServiceCardStackProps, ServiceCardData } from '../types/ServiceCard';

const ServiceCardStack = ({ cards: propCards, className = '' }: ServiceCardStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Default card data - serves as placeholder content and fallback
   * In a CMS implementation, this would be replaced by data from the CMS
   * Each card represents a different service offering with unique content structure
   */
  const defaultCards: ServiceCardData[] = [
    {
      // Construction Management Card
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
  const cards = propCards || defaultCards;

  // Use the scroll calculator hook for all scroll-related logic
  const { getCardProgress } = useScrollCalculator({
    cardCount: cards.length,
    containerRef
  });

  /**
   * Render the card stack
   * Each card is wrapped in a CardStackItem component that handles
   * positioning, animations, and styling
   */
  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {cards.map((card, index) => {
        const { progress, nextCardProgress, isVisible } = getCardProgress(index);
        
        return (
          <CardStackItem
            key={card.id}
            card={card}
            index={index}
            progress={progress}
            nextCardProgress={nextCardProgress}
            isVisible={isVisible}
          />
        );
      })}
      
      {/* Spacer element for scroll height */}
      <StackSpacer cardCount={cards.length} />
    </div>
  );
};

export default ServiceCardStack;
