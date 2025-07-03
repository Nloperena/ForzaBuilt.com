/**
 * ServiceCard Component
 * 
 * Main service card component that renders different layouts based on card type.
 * This component is data-driven and delegates to specialized card components
 * for different service types while maintaining consistent styling and behavior.
 * 
 * The component uses conditional rendering to display appropriate content
 * based on the card's ID and available data properties.
 */

import { Card } from '@/components/ui/card';
import { ServiceCardProps } from '../types/ServiceCard';
import ConstructionCard from './cards/ConstructionCard';
import ArchitecturalCard from './cards/ArchitecturalCard';
import RenovationCard from './cards/RenovationCard';
import ServiceCardContent from './cards/ServiceCardContent';

const ServiceCard = ({ card, transform, opacity, blur = 0 }: ServiceCardProps) => {
  /**
   * Renders the appropriate left panel content based on card type
   * Each card type has its own specialized component for optimal presentation
   */
  const renderLeftPanel = () => {
    switch (card.id) {
      case 'construction':
        return <ConstructionCard card={card} />;
      case 'design':
        return <ArchitecturalCard card={card} />;
      case 'renovation':
        return <RenovationCard card={card} />;
      case 'marine-yacht':
      case 'marine-pontoon':
        return (
          <div className="space-y-3 md:space-y-4 w-full h-full flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/20 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base font-medium backdrop-blur-sm">
              <span>Marine Solutions</span>
            </div>
            
            {/* Title */}
            <h3 className="font-bold text-white leading-tight mb-2"
                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)', wordBreak: 'break-word' }}>
              {card.title}
            </h3>
            
            {/* Description */}
            <p className="text-sm md:text-base text-white/90 leading-relaxed mb-2" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>{card.storyText}</p>
            
            {/* Features */}
            <div className="space-y-1.5 md:space-y-2">
              <h4 className="text-base md:text-lg font-semibold text-white mb-1.5 md:mb-2">Key Benefits:</h4>
              <ul className="space-y-1.5 md:space-y-2">
                {card.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-white mt-0.5 md:mt-1 text-sm md:text-lg flex-shrink-0">•</span>
                    <span className="text-sm md:text-base text-white/90 leading-relaxed" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)' }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* CTA Button */}
            <div className="pt-1 md:pt-2">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base shadow-md hover:shadow-lg transform hover:scale-105">
                {card.buttonText}
              </button>
            </div>
          </div>
        );
      default:
        // Fallback for unknown card types - displays basic info
        return (
          <div className="space-y-6 w-full">
            <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm">
              <span className="text-orange-500">{card.icon}</span>
              <span>Service</span>
            </div>
          </div>
        );
    }
  };

  const renderRightPanel = () => {
    if (card.imageUrl) {
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
    }
    return <ServiceCardContent card={card} />;
  };

  // Determine if this card should have reversed layout (image on left, text on right)
  const isReversed = card.id === 'marine-pontoon'; // Second card gets reversed layout

  return (
    <div 
      className="w-full h-full"
      style={{
        transform, // Applied transform for scroll animations
        opacity,   // Applied opacity for fade effects
        filter: blur > 0 ? `blur(${blur}px)` : 'none', // Applied blur for cards underneath
      }}
    >
      {/* Main card container with glassmorphism effect */}
      <Card className="w-full h-full bg-white/20 backdrop-blur-lg border-white/20 shadow-2xl overflow-hidden rounded-3xl">
        {/* Two-column grid layout - always 2 columns, 1 row */}
        <div className="grid grid-cols-2 h-full">
          
          {/* Left Panel - Dynamic content based on card type and layout */}
          <div className={`p-4 md:p-8 lg:p-12 flex items-center ${isReversed ? 'bg-white/10' : 'bg-white/10'}`}>
            {isReversed ? renderRightPanel() : renderLeftPanel()}
          </div>

          {/* Right Panel - Image or content */}
          <div className={`p-4 md:p-8 lg:p-12 flex flex-col justify-center ${isReversed ? 'bg-white/10' : 'bg-white/10'}`}>
            {isReversed ? renderLeftPanel() : renderRightPanel()}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ServiceCard;
