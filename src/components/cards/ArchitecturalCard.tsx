
/**
 * ArchitecturalCard Component
 * 
 * Specialized layout for architectural design service cards.
 * Features design model showcase, consultation interface mockup,
 * and storytelling elements to engage users in the design process.
 */

import { ServiceCardData } from '@/types/ServiceCard';

interface ArchitecturalCardProps {
  card: ServiceCardData;
}

const ArchitecturalCard = ({ card }: ArchitecturalCardProps) => {
  return (
    <div className="space-y-6 w-full">
      {/* Design model header */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-sm">M</span>
        </div>
        <div>
          <h3 className="font-semibold text-lg">{card.model}</h3>
          <p className="text-slate-600">{card.modelDesc}</p>
        </div>
      </div>

      {/* Consultation interface mockup */}
      <div className="bg-white rounded-lg p-4 border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-slate-500">Start your consultation</span>
          <button className="text-orange-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Story/consultation example */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <span className="text-sm font-medium">{card.storyPrompt}</span>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-start space-x-2 mb-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
            <p className="text-sm text-slate-700 leading-relaxed">{card.storyText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitecturalCard;
