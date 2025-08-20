import React, { useEffect, useRef, useState } from 'react';
import GenericCardStackItem from './GenericCardStackItem';
import GenericCard from './GenericCard';
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
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  // Detect mobile/tablet to switch from sticky stack to simple column list
  useEffect(() => {
    const check = () => {
      if (typeof window !== 'undefined') {
        setIsSmallScreen(window.innerWidth < 1024); // < lg breakpoint
      }
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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
        <div className="text-center py-10 md:py-12 mt-12 px-4">
          {title && (
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-2 font-kallisto">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-light">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      {/* Cards presentation: sticky stack on desktop; simple single-column list on mobile/tablet */}
      {isSmallScreen ? (
        <div className="relative px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-1 gap-4 sm:gap-6">
          {cards.map((card) => (
            <div key={card.id} className="w-full">
              <GenericCard card={card} transform={"none"} opacity={1} blur={0} />
            </div>
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default StackableCards; 