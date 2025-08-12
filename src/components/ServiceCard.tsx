/**
 * ServiceCard Component
 * 
 * Main service card component that renders a generic layout for stackable cards.
 * This component is data-driven and provides a consistent layout for all card types.
 * Optimized for mobile devices, ultra-wide displays, and foldable devices with responsive design.
 */

import { Card } from '@/components/ui/card';
import { getIndustryColors, typography } from '@/styles/brandStandards';
import { ServiceCardProps } from '../types/ServiceCard';

const ServiceCard = ({ card, transform, opacity, index }: ServiceCardProps & { index?: number }) => {
  /**
   * Renders the left panel content with card information
   * Optimized for mobile, ultra-wide, and foldable displays with responsive typography and spacing
   */
  const renderLeftPanel = () => {
    const colors = getIndustryColors((card as any).theme || 'industrial');
    const titleFont = typography.headings.fontFamily;
    const bodyFont = typography.body.fontFamily;
    return (
      <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 xl:space-y-6 2xl:space-y-8 3xl:space-y-10 w-full h-full flex flex-col justify-center px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20">
        {/* Removed Solutions badge per request */}
        
        {/* Title */}
        <h3
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl font-bold leading-tight text-white"
          style={{ fontFamily: titleFont }}
        >
          {card.title}
        </h3>
        
        {/* Description */}
        {card.storyText && (
          <p
            className="text-[10px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg 3xl:text-xl leading-normal max-w-4xl xl:max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl text-white/90"
            style={{ fontFamily: bodyFont }}
          >
            {card.storyText}
          </p>
        )}
        
        {/* Features */}
        <div className="space-y-1">
          <h4
            className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl font-semibold mb-0.5 sm:mb-1 md:mb-1.5 lg:mb-2 xl:mb-3 2xl:mb-4 3xl:mb-5 text-white"
            style={{ fontFamily: titleFont }}
          >
            Key Benefits:
          </h4>
          <ul className="space-y-0.5 sm:space-y-0.5 md:space-y-1 lg:space-y-1 xl:space-y-1 2xl:space-y-1 3xl:space-y-1.5">
            {card.features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-1 sm:space-x-1 md:space-x-1.5 lg:space-x-2">
                <span className="mt-0.5 text-[10px] sm:text-[11px] md:text-xs lg:text-sm flex-shrink-0 text-white">•</span>
                <span className="text-[11px] sm:text-xs md:text-xs lg:text-sm leading-relaxed text-white/90" style={{ fontFamily: bodyFont }}>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        

      </div>
    );
  };

  const renderRightPanel = () => {
    if (card.imageUrl) {
      return (
        <div className="w-full h-full flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-0 xl:px-0 2xl:px-0 3xl:px-0">
          <div className="w-full h-full max-w-full max-h-full flex items-center justify-center">
            <img 
              src={card.imageUrl} 
              alt={card.title}
              className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg"
              style={{ maxHeight: '80vh' }}
            />
          </div>
        </div>
      );
    }
    
    // Fallback content when no image is provided
    return (
      <div className="w-full h-full flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-0 xl:px-0 2xl:px-0 3xl:px-0">
        <div className="text-center text-white">
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl 3xl:text-10xl mb-0.5 sm:mb-1 md:mb-1.5 lg:mb-2 xl:mb-3 2xl:mb-4 3xl:mb-5">{card.icon}</div>
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl font-bold mb-0.5 sm:mb-1 md:mb-1.5 xl:mb-2 2xl:mb-3 3xl:mb-4" style={{ fontFamily: titleFont }}>{card.title}</h3>
          <p className="text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl leading-normal text-white/80" style={{ fontFamily: bodyFont }}>Learn more about our services</p>
        </div>
      </div>
    );
  };

  // Determine if this card should have reversed layout (image on left, text on right)
  // First card (index 0) has image on top on mobile, second card (index 1) has image on bottom
  const isReversed = index === 0 ? true : (card.id.includes('pontoon') || card.id.includes('architecture'));

  return (
    <div 
      className="w-full h-full"
      style={{
        transform, // Applied transform for scroll animations
        opacity,   // Applied opacity for fade effects
      }}
    >
      {/* Main card container with enhanced glassmorphism effect */}
      <Card
        className="w-full h-full max-h-full backdrop-blur-xl border-white/20 shadow-2xl overflow-hidden rounded-3xl relative"
        style={{ background: `linear-gradient(to bottom right, ${getIndustryColors((card as any).theme || 'industrial').primary}80, ${getIndustryColors((card as any).theme || 'industrial').secondary}80)` }}
      >
        {/* Responsive grid layout - two columns on all screen sizes */}
        <div className="grid grid-cols-2 h-full">
          
          {/* Left Panel - Dynamic content based on card type and layout */}
          <div className={`px-3 sm:px-4 md:px-6 lg:px-0 xl:px-0 2xl:px-0 3xl:px-0 flex items-center relative z-10 bg-white/10`}>
            {isReversed ? renderRightPanel() : renderLeftPanel()}
          </div>

          {/* Right Panel - Image or content */}
          <div className={`px-3 sm:px-4 md:px-6 lg:px-0 xl:px-0 2xl:px-0 3xl:px-0 flex flex-col justify-center relative z-10 bg-white/10`}>
            {isReversed ? renderLeftPanel() : renderRightPanel()}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ServiceCard;
