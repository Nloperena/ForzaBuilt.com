import React, { useRef } from 'react';
import GenericCardStackItem from './GenericCardStackItem';
import StackSpacer from '../cards/StackSpacer';
import { useScrollCalculator } from '../../hooks/useScrollCalculator';
import { GenericCardData } from './GenericCard';
import { getIndustryGradient } from '../../styles/brandStandards';

interface StackableCardsProps {
  cards: GenericCardData[];
  title?: string;
  subtitle?: string;
  className?: string;
  industry?: string; // Add industry prop for dynamic gradients
  backgroundGradient?: string;
  onCardClick?: (cardId: string) => void;
}

const StackableCards: React.FC<StackableCardsProps> = ({
  cards,
  title,
  subtitle,
  className = '',
  industry = 'industrial', // Default industry
  backgroundGradient,
  onCardClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Use the scroll calculator hook for all scroll-related logic
  const { getCardProgress } = useScrollCalculator({
    cardCount: cards.length,
    containerRef
  });

  const handleCardClick = (cardId: string) => {
    onCardClick?.(cardId);
  };

  // Use dynamic gradient if industry is provided, otherwise use backgroundGradient prop
  const gradientColors = industry ? getIndustryGradient(industry) : (backgroundGradient || '#09668D, #1B3764');

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full ${className}`}
      style={{
        background: `linear-gradient(315deg, ${gradientColors})`
      }}
      data-gradient={gradientColors} // Debug attribute
      data-industry={industry} // Debug attribute
    >
      {/* Header Section */}
      {(title || subtitle) && (
        <div className="text-center py-16 mt-20 px-4">
          {title && (
            <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-extrabold text-white mb-3 font-kallisto">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-2xl text-white/90 max-w-3xl mx-auto font-light">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      {/* Cards Stack */}
      <div className="relative">
        {cards.map((card, index) => {
          const { progress, nextCardProgress, isVisible } = getCardProgress(index);
          
          return (
            <GenericCardStackItem
              key={card.id}
              card={card}
              index={index}
              progress={progress}
              nextCardProgress={nextCardProgress}
              isVisible={isVisible}
              onCardClick={handleCardClick}
            />
          );
        })}
        
        {/* Spacer element for scroll height */}
        <StackSpacer cardCount={cards.length} />
      </div>
    </div>
  );
};

export default StackableCards; 