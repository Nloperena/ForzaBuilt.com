import React from 'react';
import { useParams } from 'react-router-dom';
import IndustryStackableCards from './IndustryStackableCards';
import { industries } from '@/data/industries';

interface DynamicIndustryCardsProps {
  onCardClick?: (cardId: string) => void;
  customTitle?: string;
  customSubtitle?: string;
}

const DynamicIndustryCards: React.FC<DynamicIndustryCardsProps> = ({
  onCardClick,
  customTitle,
  customSubtitle
}) => {
  const { industry } = useParams();
  
  // Find the industry data from the industries array
  const industryData = industries.find(
    (ind) => ind.title.toLowerCase().replace(/\s+/g, '-') === industry
  );

  // Map industry titles to our card system
  const getIndustryKey = (title: string): string => {
    const industryMap: { [key: string]: string } = {
      'TRANSPORTATION': 'transportation',
      'MARINE': 'marine',
      'CONSTRUCTION': 'construction',
      'INDUSTRIAL': 'industrial',
      // 'FOAM': 'foam',
      'COMPOSITES': 'composites',
      'INSULATION': 'insulation'
    };
    
    return industryMap[title] || 'marine'; // Default to marine if not found
  };

  if (!industryData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#115B87] text-white">
        <h1 className="text-4xl font-extrabold mb-4 font-kallisto">Industry Not Found</h1>
        <p className="text-lg">Sorry, we couldn't find the industry you're looking for.</p>
      </div>
    );
  }

  const industryKey = getIndustryKey(industryData.title) as any;

  return (
    <IndustryStackableCards
      key={industryKey} // Force complete re-render when industry changes
      industry={industryKey}
      title={customTitle}
      subtitle={customSubtitle}
      onCardClick={onCardClick}
    />
  );
};

export default DynamicIndustryCards; 