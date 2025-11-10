import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { getIndustryColors, typography } from '@/styles/brandStandards';

export interface GenericCardData {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  imageUrl?: string;
  icon?: string;
  badge?: string;
  buttonText?: string;
  buttonLink?: string;
  layout?: 'default' | 'reversed' | 'centered';
  theme?: 'marine' | 'construction' | 'automotive' | 'aerospace' | 'transportation' | 'industrial' | /* 'foam' | */ 'composites' | 'insulation' | 'custom';
  customStyles?: {
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
  };
}

interface GenericCardProps {
  card: GenericCardData;
  transform: string;
  opacity: number;
  blur?: number;
}

const GenericCard: React.FC<GenericCardProps> = ({ 
  card, 
  transform, 
  opacity, 
  blur = 0 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Reset image loading state when card changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [card.id]);

  const getThemeStyles = () => {
    const industryColors = getIndustryColors(card.theme || 'industrial');
    
    // All themes now use the same structure with brand colors
    return {
      background: `linear-gradient(to bottom right, ${industryColors.primary}66, ${industryColors.secondary}66)`,
      text: 'text-white',
      accent: industryColors.accent,
      badge: 'bg-white/20 text-white',
      titleFont: typography.headings.fontFamily,
      bodyFont: typography.body.fontFamily
    };
  };

  const themeStyles = getThemeStyles();
  const isReversed = card.layout === 'reversed';
  const isCentered = card.layout === 'centered';

  const renderContent = () => (
    <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-12 3xl:space-y-16 w-full h-full flex flex-col justify-center px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20">
      {/* Badge intentionally removed */}
      
      {/* Title */}
      <h3 className={`font-bold ${themeStyles.text} leading-tight text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl`}
          style={{ 
            fontFamily: themeStyles.titleFont,
            fontWeight: typography.headings.fontWeight,
            lineHeight: typography.headings.lineHeight
          }}>
        {card.title}
      </h3>
      
      {/* Subtitle */}
      {card.subtitle && (
        <p className={`text-[10px] sm:text-[11px] md:text-xs lg:text-sm xl:text-base ${themeStyles.text}/70 leading-relaxed`} 
           style={{ 
             fontFamily: themeStyles.bodyFont,
             fontWeight: typography.body.fontWeight,
             lineHeight: typography.body.lineHeight
           }}>
          {card.subtitle}
        </p>
      )}
      
      {/* Description */}
      {card.description && (
        <p className={`text-[10px] sm:text-xs md:text-xs lg:text-sm xl:text-base ${themeStyles.text}/90 leading-relaxed max-w-2xl xl:max-w-3xl`} 
           style={{ 
             fontFamily: themeStyles.bodyFont,
             fontWeight: typography.body.fontWeight,
             lineHeight: typography.body.lineHeight
           }}>
          {card.description}
        </p>
      )}
      
      {/* Features */}
      {card.features && card.features.length > 0 && (
        <div className="space-y-1 sm:space-y-1.5 md:space-y-2 lg:space-y-3 xl:space-y-4">
          <h4 className={`text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-semibold ${themeStyles.text} mb-1 sm:mb-2 md:mb-3 lg:mb-4`}
              style={{
                fontFamily: themeStyles.titleFont,
                fontWeight: typography.subheads.fontWeight,
                lineHeight: typography.subheads.lineHeight
              }}>
            Key Benefits:
          </h4>
          <ul className="space-y-1 sm:space-y-1.5 md:space-y-2 lg:space-y-3 xl:space-y-4">
            {card.features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-1.5 sm:space-x-2 md:space-x-3 lg:space-x-4 xl:space-x-5">
                <span className={`${themeStyles.text} mt-0.5 sm:mt-1 text-[10px] sm:text-xs md:text-xs lg:text-sm xl:text-base flex-shrink-0`}>•</span>
                <span className={`text-[10px] sm:text-xs md:text-xs lg:text-sm xl:text-base ${themeStyles.text}/90 leading-relaxed`} 
                       style={{ 
                         fontFamily: themeStyles.bodyFont,
                         fontWeight: typography.body.fontWeight,
                         lineHeight: typography.body.lineHeight
                       }}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* CTA buttons removed */}
    </div>
  );

  const renderImage = () => {
    if (!card.imageUrl) {
      // Fallback content when no image is provided
      return (
        <div className="w-full h-full flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12">
          <div className="text-center">
                            <div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl 3xl:text-10xl mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-5 2xl:mb-6 3xl:mb-8">{card.icon}</div>
                <h3 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-5xl font-bold ${themeStyles.text} mb-0.5 sm:mb-1 md:mb-2 xl:mb-3 2xl:mb-4 3xl:mb-5`}>{card.title}</h3>
            <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl ${themeStyles.text}/70`}>Learn more about our solutions</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="w-full h-full flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 2xl:p-16 3xl:p-20 relative">
        {/* Loading state */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${themeStyles.text}`}></div>
          </div>
        )}
        
        {/* Error state */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`${themeStyles.text}/70 text-center`}>
              <div className="text-4xl mb-2">📷</div>
              <div className="text-sm">Image unavailable</div>
            </div>
          </div>
        )}
        
        {/* Image */}
        <img 
          src={card.imageUrl} 
          alt={card.title}
          className={`object-contain max-h-full max-w-full w-auto h-auto rounded-xl transition-opacity duration-300 ${
            imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            display: 'block', 
            margin: '0 auto',
            maxHeight: 'calc(100vh - 4rem)', // Fallback for browsers that don't support dvh
            width: 'auto'
          }}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          loading="eager"
        />
      </div>
    );
  };

  if (isCentered) {
    return (
      <div 
        className="w-full h-full"
        style={{
          transform,
          opacity,
          filter: blur > 0 ? `blur(${blur}px)` : 'none',
        }}
      >
        <Card className="w-full h-full backdrop-blur-lg border-white/20 shadow-2xl overflow-hidden rounded-3xl" style={{ background: themeStyles.background }}>
          <div className="flex flex-col items-center justify-center h-full p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12 text-center">
            {renderContent()}
            {card.imageUrl && (
              <div className="mt-4 md:mt-8 w-full max-w-md">
                {renderImage()}
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div 
      className="w-full h-full"
      style={{
        transform,
        opacity,
        filter: blur > 0 ? `blur(${blur}px)` : 'none',
      }}
    >
      <Card className="w-full h-full backdrop-blur-lg border-white/20 shadow-2xl overflow-hidden rounded-3xl" style={{ background: themeStyles.background }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left Panel */}
          <div className={`p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12 flex items-center ${isReversed ? '' : 'bg-white/10'}`}>
            {isReversed ? renderImage() : renderContent()}
          </div>

          {/* Right Panel */}
          <div className={`p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12 flex flex-col justify-center ${isReversed ? 'bg-white/10' : ''}`}>
            {isReversed ? renderContent() : renderImage()}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GenericCard;