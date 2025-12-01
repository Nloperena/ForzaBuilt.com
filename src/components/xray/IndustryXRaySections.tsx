import React from 'react';
import IndustryXRaySelector, { XRayOption } from './IndustryXRaySelector';

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
          previewImage: '/New X-Ray Dimensions/New Marine/NEW_PONTOON.svg',
          svgSrc: '/New X-Ray Dimensions/New Marine/NEW_PONTOON.svg'
        },
        {
          id: 'yacht',
          title: 'Yacht / Boat Applications',
          subtitle: '',
          summary: 'Discover yacht construction solutions for hull bonding, deck assembly, and interior finishing.',
          previewImage: '/New X-Ray Dimensions/New Marine/NEW_YACHT.svg',
          svgSrc: '/New X-Ray Dimensions/New Marine/NEW_YACHT.svg'
        }
      ];
    }
    
    if (industryLower.includes('transportation')) {
      return [
        {
          id: 'rv-bus',
          title: 'RV / Motor Coach Applications',
          subtitle: '',
          summary: 'Explore RV & motor coach assemblies including structural bonding for slide-outs, roof sealing, and continuous panel builds.',
          previewImage: '/New X-Ray Dimensions/New Transporation/NEW_RV BUS.svg',
          svgSrc: '/New X-Ray Dimensions/New Transporation/NEW_RV BUS.svg'
        },
        {
          id: 'trailer',
          title: 'Trailer Applications',
          subtitle: '',
          summary: 'Inspect high-strength trailer assemblies covering walls, floors, and chassis bonding for commercial and specialty builds.',
          previewImage: '/New X-Ray Dimensions/New Transporation/NEW_TRAILER.svg',
          svgSrc: '/New X-Ray Dimensions/New Transporation/NEW_TRAILER.svg'
        }
      ];
    }

    if (industryLower.includes('construction')) {
      return [
        {
          id: 'house',
          title: 'Residential Construction',
          subtitle: '',
          summary: 'Explore residential construction applications including structural bonding, panel installation, and finishing solutions.',
          previewImage: '/New X-Ray Dimensions/New Construction/NEW_BIG HOUSE.svg',
          svgSrc: '/New X-Ray Dimensions/New Construction/NEW_BIG HOUSE.svg'
        },
        {
          id: 'office',
          title: 'Commercial Construction',
          subtitle: '',
          summary: 'Discover commercial construction solutions for large-scale building projects, panel systems, and structural applications.',
          previewImage: '/New X-Ray Dimensions/New Construction/NEW_OFFICE.svg',
          svgSrc: '/New X-Ray Dimensions/New Construction/NEW_OFFICE.svg'
        }
      ];
    }

    if (industryLower.includes('insulation')) {
      return [
        {
          id: 'house',
          title: 'Residential Insulation',
          subtitle: '',
          summary: 'Explore residential insulation applications for energy efficiency, thermal barriers, and weatherproofing solutions.',
          previewImage: '/New X-Ray Dimensions/New Insulation/NEW_HOUSE.svg',
          svgSrc: '/New X-Ray Dimensions/New Insulation/NEW_HOUSE.svg'
        },
        {
          id: 'pipe',
          title: 'Pipe Insulation',
          subtitle: '',
          summary: 'Discover pipe insulation solutions for industrial and commercial applications, thermal protection, and energy conservation.',
          previewImage: '/New X-Ray Dimensions/New Insulation/NEW_PIPE.svg',
          svgSrc: '/New X-Ray Dimensions/New Insulation/NEW_PIPE.svg'
        }
      ];
    }

    if (industryLower.includes('composite')) {
      return [
        {
          id: 'windturbine',
          title: 'Wind Turbine Applications',
          subtitle: '',
          summary: 'Explore wind turbine composite applications including blade bonding, structural assembly, and advanced material solutions.',
          previewImage: '/New X-Ray Dimensions/New Composites/NEW_WINDTURBINE.svg',
          svgSrc: '/New X-Ray Dimensions/New Composites/NEW_WINDTURBINE.svg'
        }
      ];
    }

    if (industryLower.includes('industrial')) {
      return [
        {
          id: 'fridge',
          title: 'Refrigeration Applications',
          subtitle: '',
          summary: 'Explore refrigeration and appliance manufacturing applications including panel bonding, insulation, and assembly solutions.',
          previewImage: '/New X-Ray Dimensions/New Industrial/NEW_FRIDGE.svg',
          svgSrc: '/New X-Ray Dimensions/New Industrial/NEW_FRIDGE.svg'
        },
        {
          id: 'garage-door',
          title: 'Garage Door Applications',
          subtitle: '',
          summary: 'Discover garage door manufacturing solutions including panel assembly, hardware mounting, and structural bonding applications.',
          previewImage: '/New X-Ray Dimensions/New Industrial/NEW_GARAGE DOOR.svg',
          svgSrc: '/New X-Ray Dimensions/New Industrial/NEW_GARAGE DOOR.svg'
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
        previewImage: '/New X-Ray Dimensions/New Transporation/NEW_RV BUS.svg',
        svgSrc: '/New X-Ray Dimensions/New Transporation/NEW_RV BUS.svg'
      },
      {
        id: 'trailer',
        title: 'Trailer Applications',
        subtitle: '',
        summary: 'Inspect high-strength trailer assemblies covering walls, floors, and chassis bonding for commercial and specialty builds.',
        previewImage: '/New X-Ray Dimensions/New Transporation/NEW_TRAILER.svg',
        svgSrc: '/New X-Ray Dimensions/New Transporation/NEW_TRAILER.svg'
      }
    ];
  };

  const getIndustryKey = () => {
    if (industryLower.includes('marine')) return 'marine';
    if (industryLower.includes('transportation')) return 'transportation';
    if (industryLower.includes('construction')) return 'construction';
    if (industryLower.includes('insulation')) return 'insulation';
    if (industryLower.includes('composite')) return 'composites';
    if (industryLower.includes('industrial')) return 'industrial';
    return 'transportation'; // default
  };

  return <IndustryXRaySelector industry={getIndustryKey()} options={getXRayOptions()} />;
};

export default IndustryXRaySections;
