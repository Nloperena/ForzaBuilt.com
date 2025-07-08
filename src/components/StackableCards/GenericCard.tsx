import React from 'react';
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
  theme?: 'marine' | 'construction' | 'automotive' | 'aerospace' | 'transportation' | 'industrial' | 'foam' | 'composites' | 'insulation' | 'custom';
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
    <div className="space-y-3 md:space-y-4 w-full h-full flex flex-col justify-center">
      {/* Badge */}
      {card.badge && (
        <div className={`inline-flex items-center space-x-2 ${themeStyles.badge} px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base font-medium backdrop-blur-sm`}>
          {card.icon && <span>{card.icon}</span>}
          <span>{card.badge}</span>
        </div>
      )}
      
      {/* Title */}
      <h3 className={`font-bold ${themeStyles.text} leading-tight mb-2`}
          style={{ 
            fontSize: 'clamp(1.25rem, 2.5vw, 2rem)', 
            wordBreak: 'break-word',
            fontFamily: themeStyles.titleFont,
            fontWeight: typography.headings.fontWeight,
            lineHeight: typography.headings.lineHeight
          }}>
        {card.title}
      </h3>
      
      {/* Subtitle */}
      {card.subtitle && (
        <p className={`text-sm md:text-base ${themeStyles.text}/70 leading-relaxed mb-2`} 
           style={{ 
             fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
             fontFamily: themeStyles.bodyFont,
             fontWeight: typography.body.fontWeight,
             lineHeight: typography.body.lineHeight
           }}>
          {card.subtitle}
        </p>
      )}
      
      {/* Description */}
      {card.description && (
        <p className={`text-sm md:text-base ${themeStyles.text}/90 leading-relaxed mb-2`} 
           style={{ 
             fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
             fontFamily: themeStyles.bodyFont,
             fontWeight: typography.body.fontWeight,
             lineHeight: typography.body.lineHeight
           }}>
          {card.description}
        </p>
      )}
      
      {/* Features */}
      {card.features && card.features.length > 0 && (
        <div className="space-y-1.5 md:space-y-2">
          <h4 className={`text-base md:text-lg font-semibold ${themeStyles.text} mb-1.5 md:mb-2`}
              style={{
                fontFamily: themeStyles.titleFont,
                fontWeight: typography.subheads.fontWeight,
                lineHeight: typography.subheads.lineHeight
              }}>
            Key Benefits:
          </h4>
          <ul className="space-y-1.5 md:space-y-2">
            {card.features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className={`${themeStyles.text} text-sm md:text-lg flex-shrink-0`}>•</span>
                <span className={`text-sm md:text-base ${themeStyles.text}/90 leading-relaxed`} 
                       style={{ 
                         fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)',
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
        <div className="pt-1 md:pt-2">
          {card.buttonLink ? (
            <a 
              href={card.buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold transition-all text-sm md:text-base shadow-md hover:shadow-lg transform hover:scale-105 inline-block"
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
              className="hover:opacity-90 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold transition-all text-sm md:text-base shadow-md hover:shadow-lg transform hover:scale-105"
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
    if (!card.imageUrl) return null;
    console.log('Rendering image for card:', card.title, card.imageUrl);
    return (
      <div className="flex items-center justify-center h-full">
        <img 
          src={card.imageUrl} 
          alt={card.title}
          className="object-contain max-h-full max-w-full w-auto h-auto rounded-xl"
          style={{ 
            display: 'block', 
            margin: '0 auto',
            maxHeight: 'calc(100vh - 4rem)',
            width: 'auto'
          }}
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
          <div className="flex flex-col items-center justify-center h-full p-8 md:p-12 text-center">
            {renderContent()}
            {card.imageUrl && (
              <div className="mt-8 w-full max-w-md">
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
        <div className="grid grid-cols-2 h-full">
          {/* Left Panel */}
          <div className="p-4 md:p-8 lg:p-12 flex items-center">
            {isReversed ? renderImage() : renderContent()}
          </div>

          {/* Right Panel */}
          <div className="p-4 md:p-8 lg:p-12 flex flex-col justify-center">
            {isReversed ? renderContent() : renderImage()}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GenericCard; 