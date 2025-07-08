import React from 'react';
import GenericCard, { GenericCardData } from './GenericCard';

interface GenericCardStackItemProps {
  card: GenericCardData;
  index: number;
  progress: number;
  nextCardProgress: number;
  isVisible: boolean;
  onCardClick?: (cardId: string) => void;
}

const GenericCardStackItem: React.FC<GenericCardStackItemProps> = ({ 
  card, 
  index, 
  progress, 
  nextCardProgress, 
  isVisible,
  onCardClick
}) => {
  /**
   * Transform Calculations
   * These calculations determine how each card moves and scales
   * as the user scrolls through the stack
   */
  const currentScale = 1 - progress * 0.05; // Slight scale down as card moves up
  const currentTranslateY = progress * -50; // Move card up as it's being replaced
  
  /**
   * CSS Transform String
   * Combines translation and scaling for smooth animation
   */
  const transformString = `translateY(${currentTranslateY}px) scale(${currentScale})`;
  
  /**
   * Opacity Calculation
   * Cards fade out when the next card starts taking over
   */
  const opacity = isVisible ? 1 - nextCardProgress : 0;

  /**
   * Blur Calculation
   * Cards underneath get blurred based on their position
   */
  const blurAmount = Math.max(0, (1 - opacity) * 10); // Blur up to 10px when card is fading out

  return (
    <div
      className="sticky top-0 w-full h-screen flex items-center justify-center px-4"
      style={{
        zIndex: 40 + index, // Each subsequent card has higher z-index
      }}
      onClick={() => onCardClick?.(card.id)}
    >
      <div className="w-full max-w-none">
        <GenericCard
          card={card}
          transform={transformString}
          opacity={opacity}
          blur={blurAmount}
        />
      </div>
    </div>
  );
};

export default GenericCardStackItem; 