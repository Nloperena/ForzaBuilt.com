import React from 'react';
import StackableCards from './StackableCards';
import { 
  getCardsByIndustry, 
  getBackgroundGradientByIndustry
} from '@/data/stackableCardsData';

interface IndustryStackableCardsProps {
  industry: 'marine' | 'transportation' | 'construction' | 'industrial' | /* 'foam' | */ 'composites' | 'insulation';
  title?: string;
  subtitle?: string;
  onCardClick?: (cardId: string) => void;
}

const IndustryStackableCards: React.FC<IndustryStackableCardsProps> = ({
  industry,
  title,
  subtitle,
  onCardClick
}) => {
  const cards = getCardsByIndustry(industry);
  const backgroundGradient = getBackgroundGradientByIndustry(industry);

  // Default titles if not provided
  const defaultTitles = {
    marine: 'Marine Solutions',
    transportation: 'Transportation Solutions',
    construction: 'Construction Solutions',
    industrial: 'Industrial Solutions',
    // foam: 'Foam Solutions',
    composites: 'Composite Solutions',
    insulation: 'Insulation Solutions'
  };

  const defaultSubtitles = {
    marine: 'Custom-formulated solutions for the marine industry, ensuring structural integrity and performance in demanding environments.',
    transportation: 'Heavy-duty adhesive solutions designed for the demanding requirements of commercial transportation.',
    construction: 'Comprehensive construction solutions that ensure quality, safety, and efficiency in every project.',
    industrial: 'Advanced adhesive and bonding solutions designed specifically for industrial manufacturing applications.',
    // foam: 'Advanced bonding solutions designed specifically for foam materials, ensuring strong adhesion without compromising foam properties.',
    composites: 'Specialized adhesive and bonding solutions that meet the rigorous requirements of composite material manufacturing.',
    insulation: 'High-performance bonding solutions for insulation materials, ensuring energy efficiency and long-term performance.'
  };

  return (
    <StackableCards
      cards={cards}
      title={title || defaultTitles[industry]}
      subtitle={subtitle || defaultSubtitles[industry]}
      industry={industry}
      onCardClick={onCardClick}
    />
  );
};

// Industry-specific components for easy usage
export const MarineStackableCards: React.FC<{ onCardClick?: (cardId: string) => void }> = ({ onCardClick }) => (
  <IndustryStackableCards industry="marine" onCardClick={onCardClick} />
);

export const TransportationStackableCards: React.FC<{ onCardClick?: (cardId: string) => void }> = ({ onCardClick }) => (
  <IndustryStackableCards industry="transportation" onCardClick={onCardClick} />
);

export const ConstructionStackableCards: React.FC<{ onCardClick?: (cardId: string) => void }> = ({ onCardClick }) => (
  <IndustryStackableCards industry="construction" onCardClick={onCardClick} />
);

export const IndustrialStackableCards: React.FC<{ onCardClick?: (cardId: string) => void }> = ({ onCardClick }) => (
  <IndustryStackableCards industry="industrial" onCardClick={onCardClick} />
);

// export const FoamStackableCards: React.FC<{ onCardClick?: (cardId: string) => void }> = ({ onCardClick }) => (
//   <IndustryStackableCards industry="foam" onCardClick={onCardClick} />
// );

export const CompositesStackableCards: React.FC<{ onCardClick?: (cardId: string) => void }> = ({ onCardClick }) => (
  <IndustryStackableCards industry="composites" onCardClick={onCardClick} />
);

export const InsulationStackableCards: React.FC<{ onCardClick?: (cardId: string) => void }> = ({ onCardClick }) => (
  <IndustryStackableCards industry="insulation" onCardClick={onCardClick} />
);

export default IndustryStackableCards; 