
/**
 * ConstructionCard Component
 * 
 * Specialized layout for construction management service cards.
 * Displays technology badges, supported technologies, and specialty areas
 * in a structured grid format optimized for showcasing technical capabilities.
 */

import { ServiceCardData } from '@/types/ServiceCard';

interface ConstructionCardProps {
  card: ServiceCardData;
}

const ConstructionCard = ({ card }: ConstructionCardProps) => {
  return (
    <div className="space-y-8 w-full">
      {/* Technology badges - displays primary technologies */}
      <div className="flex items-center space-x-4 mb-8">
        {card.technologies?.map((tech, i) => {
          // Dynamic color assignment for technology badges
          const colors = ['bg-blue-500', 'bg-green-600', 'bg-red-600'];
          const color = colors[i % colors.length];
          
          return (
            <div key={tech} className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded-full ${color} flex items-center justify-center`}>
                <span className="text-white text-xs">{tech[0]}</span>
              </div>
              <span className="text-sm font-medium">{tech}</span>
            </div>
          );
        })}
      </div>

      {/* Service identification badge */}
      <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm">
        <span className="text-orange-500">+</span>
        <span>Project Management Service</span>
      </div>

      {/* Supported technologies tags */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          {card.supportedTech?.map((tech, i) => (
            <span key={i} className="px-3 py-1 bg-white rounded-full text-sm text-slate-600 border border-slate-200">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Specialty areas grid */}
      <div className="space-y-4">
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Specialties</p>
        <div className="grid grid-cols-2 gap-4">
          {card.specialties?.map((specialty, i) => {
            // Icon mapping for different specialty types
            const icons = ['🏠', '🏢', '🏭', '🌉'];
            const colors = ['bg-blue-600', 'bg-green-600', 'bg-orange-600', 'bg-purple-600'];
            
            return (
              <div key={specialty} className="flex items-center space-x-2">
                <div className={`w-8 h-8 ${colors[i % colors.length]} rounded flex items-center justify-center`}>
                  <span className="text-white text-xs">{icons[i % icons.length]}</span>
                </div>
                <span className="font-semibold">{specialty}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ConstructionCard;
