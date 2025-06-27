
/**
 * RenovationCard Component
 * 
 * Specialized layout for home renovation service cards.
 * Displays project options with pricing, location, and timeline information
 * in an organized list format with project type toggles.
 */

import { ServiceCardData } from '@/types/ServiceCard';

interface RenovationCardProps {
  card: ServiceCardData;
}

const RenovationCard = ({ card }: RenovationCardProps) => {
  return (
    <div className="space-y-6 w-full">
      {/* Project type toggle */}
      <div className="flex space-x-1 bg-slate-200 rounded-lg p-1 w-fit">
        <button className="px-4 py-2 rounded-md bg-white shadow-sm text-sm font-medium">Residential</button>
        <button className="px-4 py-2 rounded-md text-sm font-medium text-slate-600">Commercial</button>
      </div>

      {/* Project options list */}
      <div className="space-y-3">
        {card.projectOptions?.map((project, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200">
            <div className="flex items-center space-x-4">
              {/* Project type icon */}
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 text-lg">{project.flag}</span>
              </div>
              {/* Project details */}
              <div>
                <h4 className="font-semibold">{project.name}</h4>
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                  <span>{project.location}</span>
                  <span>|</span>
                  <span>{project.price}</span>
                  <span>|</span>
                  <span>{project.duration}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Visual indicator */}
      <div className="flex justify-center">
        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default RenovationCard;
