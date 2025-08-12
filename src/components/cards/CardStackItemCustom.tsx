/**
 * CardStackItemCustom
 * A reusable stack item wrapper that applies the same sticky positioning
 * and scroll-based transforms as CardStackItem, but lets you render any
 * custom card content via a render prop.
 */

import React from 'react';

interface RenderArgs {
  transform: string;
  opacity: number;
  index: number;
}

interface CardStackItemCustomProps {
  index: number;
  progress: number;
  nextCardProgress: number;
  isVisible: boolean;
  render: (args: RenderArgs) => React.ReactNode;
}

const CardStackItemCustom: React.FC<CardStackItemCustomProps> = ({
  index,
  progress,
  nextCardProgress,
  isVisible,
  render,
}) => {
  const currentScale = 1 - progress * 0.03;
  const currentTranslateY = progress * -100;
  const transformString = `translateY(${currentTranslateY}px) scale(${currentScale})`;
  // Slow down fade so the last card (and all cards) linger longer before disappearing
  const opacity = isVisible ? Math.max(0, 1 - nextCardProgress * 0.8) : 0;

  return (
    <div
      className="sticky top-0 w-full h-screen flex items-center justify-center px-1 sm:px-2 md:px-4 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20"
      style={{ zIndex: 40 + index }}
    >
      <div className="w-full max-w-none">
        {render({ transform: transformString, opacity, index })}
      </div>
    </div>
  );
};

export default CardStackItemCustom;
