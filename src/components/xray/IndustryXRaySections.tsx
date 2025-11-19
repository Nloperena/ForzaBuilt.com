import React from 'react';
import { motion } from 'framer-motion';
import StaticXRayExplorer from './StaticXRayExplorer';
import TransportationXRayExplorer from './TransportationXRayExplorer';
import { MARINE_DATA } from '../../data/industries/marine';
import { CONSTRUCTION_DATA } from '../../data/industries/construction';
import { COMPOSITES_DATA } from '../../data/industries/composites';
import { INSULATION_DATA } from '../../data/industries/insulation';

interface XRaySectionConfig {
  component: 'static' | 'transportation';
  data?: any;
  variant?: 'rv-bus' | 'trailer';
  xrayIndex?: number;
}

interface IndustryXRaySectionsProps {
  industry: string;
}

const IndustryXRaySections: React.FC<IndustryXRaySectionsProps> = ({ industry }) => {
  const industryLower = industry.toLowerCase();
  
  // Configuration map for X-Ray sections
  const xrayConfigs: Record<string, XRaySectionConfig[]> = {
    marine: [
      { component: 'static', data: MARINE_DATA, xrayIndex: 0 },
      { component: 'static', data: MARINE_DATA, xrayIndex: 1 },
    ],
    construction: [
      { component: 'static', data: CONSTRUCTION_DATA, xrayIndex: 0 },
      { component: 'static', data: CONSTRUCTION_DATA, xrayIndex: 1 },
    ],
    transportation: [
      { component: 'transportation', variant: 'rv-bus' },
      { component: 'transportation', variant: 'trailer' },
    ],
    composites: [
      { component: 'static', data: COMPOSITES_DATA, xrayIndex: 0 },
    ],
    insulation: [
      { component: 'static', data: INSULATION_DATA, xrayIndex: 0 },
      { component: 'static', data: INSULATION_DATA, xrayIndex: 1 },
    ],
  };

  const configs = xrayConfigs[industryLower];
  
  if (!configs || configs.length === 0) {
    return null;
  }

  // Format industry name for display in Title Case
  const getIndustryDisplayName = (industryName: string): string => {
    const industryLower = industryName.toLowerCase();
    if (industryLower.includes('transportation')) {
      return 'Trailer & Transportation';
    }
    // Convert to Title Case
    return industryName
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      {/* Section Header - Only for transportation */}
      {industryLower === 'transportation' && (
        <section className="bg-white relative z-[30] pt-12 pb-8">
          <div className="w-full px-4">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 
                className="text-2xl md:text-4xl font-normal text-[#1B3764] mb-4 font-poppins"
              >
                {getIndustryDisplayName(industry)}
              </h2>
              <p 
                className="text-lg text-[#1B3764] max-w-2xl mx-auto font-normal font-poppins"
              >
                Cursor over or click to learn more about our Trailer & Transportation product line applications
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {configs.map((config, index) => {
        const bgClass = index % 2 === 0 ? 'bg-gray-50' : 'bg-white';
        
        return (
          <section key={index} className={`${bgClass} relative z-[30]`}>
            {config.component === 'static' && config.data ? (
              <StaticXRayExplorer industry={config.data} xrayIndex={config.xrayIndex || 0} />
            ) : config.component === 'transportation' && config.variant ? (
              <TransportationXRayExplorer variant={config.variant} />
            ) : null}
          </section>
        );
      })}
    </>
  );
};

export default IndustryXRaySections;

