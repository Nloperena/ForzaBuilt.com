import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { useScrollCalculator } from '../../hooks/useScrollCalculator';
import { getIndustryColors, typography } from '@/styles/brandStandards';

export interface IndustryCardData {
  id: string;
  title: string;
  icon?: string;
  features: string[];
  storyText?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
}

interface IndustryStackableCardsV2Props {
  cards: IndustryCardData[];
  industryKey: string; // used for theming colors
  className?: string;
}

interface RenderTransformArgs {
  transform: string;
  opacity: number;
  index: number;
}

const CardStackItemV2: React.FC<{
  index: number;
  progress: number;
  nextCardProgress: number;
  isVisible: boolean;
  render: (args: RenderTransformArgs) => React.ReactNode;
}> = ({ index, progress, nextCardProgress, isVisible, render }) => {
  const currentScale = 1 - progress * 0.05;
  const currentTranslateY = progress * -50;
  const transformString = `translateY(${currentTranslateY}px) scale(${currentScale})`;
  const opacity = isVisible ? Math.max(0, 1 - nextCardProgress * 3) : 0;

  return (
    <div
      className="sticky top-16 w-full h-screen flex items-center justify-center px-1 sm:px-2 md:px-4 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20"
      style={{ zIndex: 40 + index }}
    >
      <div className="w-full max-w-none">
        {render({ transform: transformString, opacity, index })}
      </div>
    </div>
  );
};

const ServiceCardV2: React.FC<{
  card: IndustryCardData;
  industryKey: string;
  transform: string;
  opacity: number;
  index?: number;
}> = ({ card, industryKey, transform, opacity, index }) => {
  const industryColors = getIndustryColors(industryKey as any);

  const renderLeftPanel = () => (
    <div className="space-y-2 sm:space-y-3 md:space-y-3 lg:space-y-4 xl:space-y-5 2xl:space-y-6 3xl:space-y-8 w-full flex flex-col justify-center px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 3xl:px-16">
      <h3
        className="font-bold text-white leading-tight text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-4xl"
        style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.headings.fontWeight, lineHeight: typography.headings.lineHeight }}
      >
        {card.title}
      </h3>
      {card.storyText && (
        <p
          className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm xl:text-base 2xl:text-[18px] 3xl:text-[20px] text-white/90 leading-tight max-w-4xl xl:max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl"
          style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight, lineHeight: typography.body.lineHeight }}
        >
          {card.storyText}
        </p>
      )}
      {card.features?.length > 0 && (
        <div className="space-y-0.5 sm:space-y-1 md:space-y-1.5 lg:space-y-2 xl:space-y-2.5 2xl:space-y-3 3xl:space-y-4">
          <h4
            className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl font-semibold text-white mb-1 sm:mb-2 md:mb-3 lg:mb-4"
            style={{ fontFamily: typography.headings.fontFamily, fontWeight: typography.subheads.fontWeight, lineHeight: typography.subheads.lineHeight }}
          >
            Key Benefits:
          </h4>
          <ul className="space-y-0.5 sm:space-y-1 md:space-y-1.5 lg:space-y-2 xl:space-y-2.5 2xl:space-y-3 3xl:space-y-4">
            {card.features.map((feature, idx) => (
              <li key={idx} className="flex items-start space-x-1 sm:space-x-1 md:space-x-1.5 lg:space-x-2 xl:space-x-2.5 2xl:space-x-3 3xl:space-x-3.5">
                <span className="text-white mt-0.5 sm:mt-1 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm 2xl:text-base 3xl:text-[18px] flex-shrink-0">•</span>
                <span
                  className="text-[9px] sm:text-[10px] md:text-[11px] lg:text-xs xl:text-sm 2xl:text-base 3xl:text-[18px] text-white/90 leading-tight"
                  style={{ fontFamily: typography.body.fontFamily, fontWeight: typography.body.fontWeight, lineHeight: typography.body.lineHeight }}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderRightPanel = () => (
    <div className="w-full h-full flex items-center justify-center px-2 sm:px-3 md:px-4 lg:px-0 xl:px-0 2xl:px-0 3xl:px-0">
      <div className="w-full h-full max-w-full max-h-full flex items-center justify-center">
        {card.imageUrl ? (
          <img
            src={card.imageUrl}
            alt={card.title}
            className="object-contain max-h-full max-w-full w-auto h-auto rounded-xl transition-opacity duration-300 opacity-100"
            style={{ maxHeight: '80vh' }}
            loading="eager"
          />
        ) : (
          <div className="text-center text-white/90">
            <div className="text-2xl mb-2">{card.icon}</div>
            <div className="text-xs">Image unavailable</div>
          </div>
        )}
      </div>
    </div>
  );

  const isReversed = index === 0 ? true : false;

  return (
    <div
      className="w-full"
      style={{ transform, opacity }}
    >
      <Card
        className="w-full max-h-full backdrop-blur-2xl border-white/20 shadow-2xl overflow-hidden rounded-3xl relative"
        style={{ background: `linear-gradient(to bottom right, ${industryColors.primary}4D, ${industryColors.secondary}33)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl pointer-events-none"></div>
        <div className="grid grid-cols-2">
          <div className={`px-2 sm:px-3 md:px-4 lg:px-0 xl:px-0 2xl:px-0 3xl:px-0 py-6 md:py-8 lg:py-10 flex items-center relative z-10 ${isReversed ? 'bg-white/10' : 'bg-white/5'}`}>
            {isReversed ? renderRightPanel() : renderLeftPanel()}
          </div>
          <div className={`px-2 sm:px-3 md:px-4 lg:px-0 xl:px-0 2xl:px-0 3xl:px-0 py-6 md:py-8 lg:py-10 flex flex-col justify-center relative z-10 ${isReversed ? 'bg-white/5' : 'bg-white/10'}`}>
            {isReversed ? renderLeftPanel() : renderRightPanel()}
          </div>
        </div>
      </Card>
    </div>
  );
};

const IndustryStackableCardsV2: React.FC<IndustryStackableCardsV2Props> = ({ cards, industryKey, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { getCardProgress } = useScrollCalculator({ cardCount: cards.length, containerRef });

  return (
    <div ref={containerRef} className={`relative w-full px-1 sm:px-2 md:px-4 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 2xl:py-24 3xl:py-28 ${className}`}>
      <div className="relative">
        {cards.map((card, index) => {
          const { progress, nextCardProgress, isVisible } = getCardProgress(index);
          return (
            <CardStackItemV2
              key={card.id}
              index={index}
              progress={progress}
              nextCardProgress={nextCardProgress}
              isVisible={isVisible}
              render={({ transform, opacity }) => (
                <ServiceCardV2 card={card} industryKey={industryKey} transform={transform} opacity={opacity} index={index} />
              )}
            />
          );
        })}
        <div className="pointer-events-none" aria-hidden="true" style={{ height: `${(cards.length - 1) * window.innerHeight * 0.8 + window.innerHeight * 0.05}px` }} />
      </div>
    </div>
  );
};

export default IndustryStackableCardsV2;


