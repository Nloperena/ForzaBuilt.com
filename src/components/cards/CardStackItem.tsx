/**
 * CardStackItem Component
 * 
 * Individual card wrapper component that handles positioning, animations,
 * and rendering for a single card in the stack. This component encapsulates
 * all the transform calculations and styling for individual cards.
 * 
 * Key Responsibilities:
 * - Apply scroll-based transforms and opacity
 * - Handle sticky positioning
 * - Manage z-index stacking
 * - Render the actual ServiceCard component
 * - Mobile-optimized responsive design
 * - Ultra-wide and foldable display support
 */

import ServiceCard from '../ServiceCard';
import { ServiceCardData } from '@/types/ServiceCard';

interface CardStackItemProps {
  card: ServiceCardData;
  index: number;
  progress: number;
  nextCardProgress: number;
  isVisible: boolean;
}

const CardStackItem = ({ 
  card, 
  index, 
  progress, 
  nextCardProgress, 
  isVisible 
}: CardStackItemProps) => {
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

  return (
    <div
      className="sticky top-0 w-full h-screen flex items-center justify-center px-1 sm:px-2 md:px-4 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20"
      style={{
        zIndex: 40 + index, // Each subsequent card has higher z-index
      }}
    >
      <div className="w-full h-full max-w-none">
        <ServiceCard
          card={card}
          transform={transformString}
          opacity={opacity}
          index={index}
        />
      </div>
    </div>
  );
};

export default CardStackItem;
