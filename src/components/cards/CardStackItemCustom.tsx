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
  isLast?: boolean;
  render: (args: RenderArgs) => React.ReactNode;
}

const CardStackItemCustom: React.FC<CardStackItemCustomProps> = ({
  index,
  progress,
  nextCardProgress,
  isVisible,
  isLast = false,
  render,
}) => {
  const isDesktopOrTablet = typeof window !== 'undefined' ? window.innerWidth >= 768 : false;
  const currentScale = isDesktopOrTablet ? 1 - progress * 0.03 : 1;
  const currentTranslateY = isDesktopOrTablet ? progress * -100 : 0;
  const transformString = `translateY(${currentTranslateY}px) scale(${currentScale})`;
  // Slow down fade so the last card (and all cards) linger longer before disappearing
  const mobileFadeMultiplier = 0.25; // slow fade on mobile so each card stays visible longer
  const desktopFadeMultiplier = 0.8;
  // Delay fade on mobile until the next card is well underway
  const mobileFadeStart = 0.6;
  const adjustedNextProgress = isDesktopOrTablet
    ? nextCardProgress
    : Math.max(0, (nextCardProgress - mobileFadeStart) / (1 - mobileFadeStart));
  // For the last card, also allow fading during the end of its own progress so it doesn't pop
  const selfFadeStart = 0.8;
  const adjustedSelfProgress = isDesktopOrTablet
    ? progress
    : Math.max(0, (progress - selfFadeStart) / (1 - selfFadeStart));
  const fadeProgress = isLast
    ? Math.max(adjustedNextProgress, adjustedSelfProgress)
    : adjustedNextProgress;
  const fadeMultiplier = isDesktopOrTablet ? desktopFadeMultiplier : (isLast ? 1 : mobileFadeMultiplier);
  const opacity = isVisible
    ? Math.max(0, 1 - fadeProgress * fadeMultiplier)
    : 0;

  return (
    <div
      className={`sticky top-16 md:top-16 w-full h-[80vh] ${index === 0 && progress < 0.1 ? 'md:h-[70vh]' : 'md:h-[100vh]'} flex items-center justify-center px-1 sm:px-2 md:px-4 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 transition-[height] duration-700 ease-&lsqb;cubic-bezier(0.22,1,0.36,1)&rsqb;`}
      style={{ zIndex: 40 + index }}
    >
      <div className="w-full max-w-none">
        {render({ transform: transformString, opacity, index })}
      </div>
    </div>
  );
};

export default CardStackItemCustom;
