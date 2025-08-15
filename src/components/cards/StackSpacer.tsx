
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
   * Each card needs one full viewport height of scroll distance
   * Reduced to 35% to minimize gap after last card disappears and bring next section closer
   */
  // Allocate more scroll depth so the last card doesn't fade out too quickly
  const isDesktopOrTablet = typeof window !== 'undefined' ? window.innerWidth >= 768 : false;
  const perCardFactor = isDesktopOrTablet ? 0.5 : 0.55; // increase mobile scroll space to ensure later cards have room without large blank tail
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
