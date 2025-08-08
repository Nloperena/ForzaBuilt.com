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

import React, { useRef } from 'react';
import CardStackItem from './cards/CardStackItem';
import StackSpacer from './cards/StackSpacer';
import { useScrollCalculator } from '../hooks/useScrollCalculator';
import { ServiceCardData } from '../types/ServiceCard';

const ServiceCardStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const cards: ServiceCardData[] = [
    {
      id: 'marine-yacht',
      title: 'Marine Yacht Solutions',
      icon: '🚢',
      features: [
        'Ensure boat and yacht structural integrity, watertight sealing, and surface bonding over the long haul',
        'Precisely match our marine customers\' specific and demanding product requirements',
        'Provide cutting-edge chemistries and technologies that over-deliver for mission-critical manufacturing and design requirements',
        'Deliver a wide array of applications',
        'Achieve unparalleled levels of process efficiency and performance'
      ],
      buttonText: 'Learn More',
      storyText: 'Forza stands above the competition by offering unparalleled custom-formulated line of marine solutions that ensure boat and yacht structural integrity, watertight sealing, and surface bonding over the long haul.',
      imageUrl: 'https://forzabuilt.com/wp-content/uploads/2023/05/marine-yacht.png'
    },
    {
      id: 'marine-pontoon',
      title: 'Marine Pontoon Solutions',
      icon: '🛥️',
      features: [
        'Full R&D formulations lab for custom solutions',
        'Rugged enough for the most demanding marine needs',
        'Simple and intuitive for today\'s manufacturing environment',
        'Committed to exceeding marine customers\' expectations',
        'Tailor-made solutions for pontoon applications'
      ],
      buttonText: 'Learn More',
      storyText: 'With a full R&D formulations lab at our disposal, we\'re able to deliver tailor-made marine solutions that are rugged enough to meet the most demanding needs of the Marine industry while remaining simple and intuitive for today\'s manufacturing environment.',
      imageUrl: 'https://forzabuilt.com/wp-content/uploads/2023/05/marine-pontoon.png'
    }
  ];

  // Use the scroll calculator hook for all scroll-related logic
  const { getCardProgress } = useScrollCalculator({
    cardCount: cards.length,
    containerRef
  });

  return (
    <div ref={containerRef} className="relative w-full px-4 py-16 bg-gradient-to-r from-[#1b3764] to-[#137875]">
      <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 font-kallisto">
          Marine Solutions
        </h2>
        <p className="text-xl text-white/90 max-w-3xl mx-auto font-light">
          Custom-formulated solutions for the marine industry, ensuring structural integrity and performance in demanding environments.
        </p>
      </div>
      
      <div className="relative">
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
    </div>
  );
};

export default ServiceCardStack;
