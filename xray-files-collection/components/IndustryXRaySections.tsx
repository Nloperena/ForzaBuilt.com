import React from 'react';
import IndustryXRaySelector, { XRayOption } from './IndustryXRaySelector';

// Import Marine images
import MarinePontoonImage from '@/assets/images/Marine-stickstackcard-images/marine-pontoon.png';
import MarineYachtImage from '@/assets/images/Marine-stickstackcard-images/marine-yacht.png';

interface IndustryXRaySectionsProps {
  industry: string;
}

const IndustryXRaySections: React.FC<IndustryXRaySectionsProps> = ({ industry }) => {
  const industryLower = industry.toLowerCase();

  // Configuration for different industries
  const getXRayOptions = (): XRayOption[] => {
    if (industryLower.includes('marine')) {
      return [
        {
          id: 'pontoon',
          title: 'Pontoon Applications',
          subtitle: '',
          summary: 'Explore pontoon assembly applications including deck bonding, rail attachment, and furniture installation.',
          previewImage: MarinePontoonImage,
          svgSrc: '/img/marine/marine-overlay-pontoon.svg',
          bgImage: MarinePontoonImage // Use image as background
        },
        {
          id: 'yacht',
          title: 'Yacht / Boat Applications',
          subtitle: '',
          summary: 'Discover yacht construction solutions for hull bonding, deck assembly, and interior finishing.',
          previewImage: MarineYachtImage,
          svgSrc: '/img/marine/marine-overlay.svg',
          bgImage: MarineYachtImage // Use image as background
        }
      ];
    }
    
    // Default to Transportation configuration
    return [
      {
        id: 'rv-bus',
        title: 'RV / Motor Coach Applications',
        subtitle: '',
        summary: 'Explore RV & motor coach assemblies including structural bonding for slide-outs, roof sealing, and continuous panel builds.',
        previewImage: '/img/transportation/RV Bus Exploded-NEW.png',
        svgSrc: '/img/transportation/RV Bus Exploded-NEW.svg'
      },
      {
        id: 'trailer',
        title: 'Trailer Applications',
        subtitle: '',
        summary: 'Inspect high-strength trailer assemblies covering walls, floors, and chassis bonding for commercial and specialty builds.',
        previewImage: '/img/transportation/Trailer PostX-Ray.png',
        svgSrc: '/img/transportation/Trailer Exploded Graphic2.svg'
      }
    ];
  };

  const industryKey = industryLower.includes('marine') ? 'marine' : 'transportation';

  return <IndustryXRaySelector industry={industryKey} options={getXRayOptions()} />;
};

export default IndustryXRaySections;
