
/**
 * ServiceCardContent Component
 * 
 * Shared content component for the right panel of all service cards.
 * Displays the service title, features list, and call-to-action button
 * in a consistent format across all card types.
 */

import { Button } from '@/components/ui/button';
import { ServiceCardData } from '@/types/ServiceCard';

interface ServiceCardContentProps {
  card: ServiceCardData;
}

const ServiceCardContent = ({ card }: ServiceCardContentProps) => {
  return (
    <div className="space-y-8">
      {/* Service icon */}
      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
        <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
      </div>

      {/* Service title */}
      <h2 className="text-5xl font-bold text-slate-800 leading-tight">
        {card.title}
      </h2>

      {/* Feature list with numbered items */}
      <div className="space-y-6">
        {card.features.map((feature, i) => (
          <div key={i} className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-1">
              <span className="text-orange-600 font-semibold text-sm">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <p className="text-xl text-slate-600 leading-relaxed">{feature}</p>
          </div>
        ))}
      </div>

      {/* Call-to-action button */}
      <div className="pt-4">
        <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
          {card.buttonText}
        </Button>
      </div>
    </div>
  );
};

export default ServiceCardContent;
