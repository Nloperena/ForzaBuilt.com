
/**
 * StackSpacer Component
 * 
 * Provides the necessary scroll height for the stacking animation to work.
 * This component creates the scrollable area that drives the card animations.
 * 
 * Without this spacer, there wouldn't be enough scroll distance to animate
 * all cards in the stack. The height is calculated based on the number of
 * cards multiplied by the viewport height.
 */

interface StackSpacerProps {
  cardCount: number;
}

const StackSpacer = ({ cardCount }: StackSpacerProps) => {
  /**
   * Calculate total scroll height needed
   * Each card needs scroll distance for smooth animation
   * Reduced significantly to prevent excessive height and bring sections closer together
   */
  const isDesktopOrTablet = typeof window !== 'undefined' ? window.innerWidth >= 768 : false;
  // Much smaller values to prevent excessive height - cards should animate smoothly without huge gaps
  const perCardFactor = isDesktopOrTablet ? 0.4 : 0.3; // Reduced from 0.7/0.5 to 0.4/0.3
  const scrollHeight = cardCount * window.innerHeight * perCardFactor;

  return (
    <div 
      style={{ height: `${scrollHeight}px` }}
      className="pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default StackSpacer;
