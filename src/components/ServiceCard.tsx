
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

const ServiceCard = ({ card, transform, opacity }: ServiceCardProps) => {
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

  return (
    <div 
      className="w-full h-full"
      style={{
        transform, // Applied transform for scroll animations
        opacity,   // Applied opacity for fade effects
      }}
    >
      {/* Main card container with glassmorphism effect */}
      <Card className="w-full h-full bg-white/95 backdrop-blur-lg border-slate-200 shadow-2xl overflow-hidden rounded-none">
        {/* Two-column grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          
          {/* Left Panel - Dynamic content based on card type */}
          <div className="p-8 lg:p-16 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center">
            {renderLeftPanel()}
          </div>

          {/* Right Panel - Consistent across all card types */}
          <div className="p-8 lg:p-16 flex flex-col justify-center bg-white">
            <ServiceCardContent card={card} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ServiceCard;
