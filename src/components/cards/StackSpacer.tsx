
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
   */
  const scrollHeight = cardCount * window.innerHeight;

  return (
    <div 
      style={{ height: `${scrollHeight}px` }}
      className="pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default StackSpacer;
