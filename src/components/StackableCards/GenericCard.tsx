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
      {/* Badge */}
      {card.badge && (
        <div className={`inline-flex items-center space-x-2 sm:space-x-3 ${themeStyles.badge} px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 2xl:px-10 3xl:px-12 py-1.5 sm:py-2 md:py-3 lg:py-4 xl:py-5 2xl:py-6 3xl:py-8 rounded-full text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl font-medium backdrop-blur-sm`}>
          {card.icon && <span className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl">{card.icon}</span>}
          <span>{card.badge}</span>
        </div>
      )}
      
      {/* Title */}
      <h3 className={`font-bold ${themeStyles.text} leading-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl`}
          style={{ 
            fontFamily: themeStyles.titleFont,
            fontWeight: typography.headings.fontWeight,
            lineHeight: typography.headings.lineHeight
          }}>
        {card.title}
      </h3>
      
      {/* Subtitle */}
      {card.subtitle && (
        <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl ${themeStyles.text}/70 leading-relaxed`} 
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
        <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl ${themeStyles.text}/90 leading-relaxed max-w-4xl xl:max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl`} 
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
        <div className="space-y-1.5 sm:space-y-2 md:space-y-3 lg:space-y-4 xl:space-y-5 2xl:space-y-6 3xl:space-y-8">
          <h4 className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl font-semibold ${themeStyles.text} mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-5 2xl:mb-6 3xl:mb-8`}
              style={{
                fontFamily: themeStyles.titleFont,
                fontWeight: typography.subheads.fontWeight,
                lineHeight: typography.subheads.lineHeight
              }}>
            Key Benefits:
          </h4>
          <ul className="space-y-1.5 sm:space-y-2 md:space-y-3 lg:space-y-4 xl:space-y-5 2xl:space-y-6 3xl:space-y-8">
            {card.features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-1.5 sm:space-x-2 md:space-x-3 lg:space-x-4 xl:space-x-5 2xl:space-x-6 3xl:space-x-8">
                <span className={`${themeStyles.text} mt-0.5 sm:mt-1 text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl flex-shrink-0`}>•</span>
                <span className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl ${themeStyles.text}/90 leading-relaxed`} 
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
      
      {/* CTA Button */}
      {card.buttonText && (
        <div className="pt-1 sm:pt-2 md:pt-3 lg:pt-4 xl:pt-5 2xl:pt-6 3xl:pt-8">
          {card.buttonLink ? (
            <a 
              href={card.buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 text-white px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-8 3xl:py-10 rounded-lg font-semibold transition-all text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl shadow-md hover:shadow-lg transform hover:scale-105 inline-block"
              style={{
                backgroundColor: themeStyles.accent,
                fontFamily: themeStyles.bodyFont,
                fontWeight: typography.subheads.fontWeight
              }}
            >
              {card.buttonText}
            </a>
          ) : (
            <button 
              className="hover:opacity-90 text-white px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-8 3xl:py-10 rounded-lg font-semibold transition-all text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl shadow-md hover:shadow-lg transform hover:scale-105"
              style={{
                backgroundColor: themeStyles.accent,
                fontFamily: themeStyles.bodyFont,
                fontWeight: typography.subheads.fontWeight
              }}
            >
              {card.buttonText}
            </button>
          )}
        </div>
      )}
    </div>
  );

  const renderImage = () => {
    if (!card.imageUrl) {
      // Fallback content when no image is provided
      return (
        <div className="w-full h-full flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 2xl:p-16 3xl:p-20">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-9xl 2xl:text-10xl 3xl:text-12xl mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-5 2xl:mb-6 3xl:mb-8">{card.icon}</div>
            <h3 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl font-bold ${themeStyles.text} mb-0.5 sm:mb-1 md:mb-2 xl:mb-3 2xl:mb-4 3xl:mb-5`}>{card.title}</h3>
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
          <div className="flex flex-col items-center justify-center h-full p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 2xl:p-16 3xl:p-24 text-center">
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
          <div className={`p-3 sm:p-4 md:p-6 lg:p-8 xl:p-16 2xl:p-20 3xl:p-24 flex items-center ${isReversed ? '' : 'bg-white/10'}`}>
            {isReversed ? renderImage() : renderContent()}
          </div>

          {/* Right Panel */}
          <div className={`p-3 sm:p-4 md:p-6 lg:p-8 xl:p-16 2xl:p-20 3xl:p-24 flex flex-col justify-center ${isReversed ? 'bg-white/10' : ''}`}>
            {isReversed ? renderContent() : renderImage()}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GenericCard;