import React from 'react';
import { motion } from 'framer-motion';
import StaticXRayExplorer from './StaticXRayExplorer';
import { MARINE_DATA } from '../../data/industries/marine';
import { CONSTRUCTION_DATA } from '../../data/industries/construction';
import { COMPOSITES_DATA } from '../../data/industries/composites';
import { INSULATION_DATA } from '../../data/industries/insulation';
import TransportationXRaySelector from './TransportationXRaySelector';

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
    composites: [
      { component: 'static', data: COMPOSITES_DATA, xrayIndex: 0 },
    ],
    insulation: [
      { component: 'static', data: INSULATION_DATA, xrayIndex: 0 },
      { component: 'static', data: INSULATION_DATA, xrayIndex: 1 },
    ],
  };

  const configs = xrayConfigs[industryLower];
  
  if (industryLower === 'transportation') {
    return (
      <>
        <section className="bg-white relative z-[30] pt-8 pb-0">
          <div className="w-full px-4">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 
                className="font-normal text-[#1B3764] font-poppins leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 3rem)' }}
              >
                Product Applications
              </h2>
              <p 
                className="text-[#1B3764]/70 max-w-2xl mx-auto font-normal font-poppins mt-2"
                style={{ fontSize: 'clamp(0.875rem, 1.2vw + 0.25rem, 1.25rem)' }}
              >
                Cursor over or click to explore product application details
              </p>
            </motion.div>
          </div>
        </section>
        <TransportationXRaySelector />
      </>
    );
  }

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
        <section className="bg-white relative z-[30] pt-8 pb-0">
          <div className="w-full px-4">
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 
                className="font-normal text-[#1B3764] font-poppins leading-tight"
                style={{ fontSize: 'clamp(28px, 2.5vw + 0.5rem, 56px)' }}
              >
                Trailer & Transportation
              </h2>
              <p 
                className="text-lg text-[#1B3764] max-w-2xl mx-auto font-normal font-poppins mt-3"
              >
                Cursor over or click to explore each X-Ray and see where our solutions power every build detail.
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* X-Rays in Single Row */}
      <section className="relative overflow-visible pt-6 pb-12 bg-white z-[30]">
        <div className="w-full px-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center md:items-start">
            {configs.map((config, index) => (
              <div key={index} className="w-full md:w-1/2 max-w-3xl relative">
            {config.component === 'static' && config.data ? (
              <StaticXRayExplorer industry={config.data} xrayIndex={config.xrayIndex || 0} />
            ) : config.component === 'transportation' && config.variant ? (
              <TransportationXRayExplorer variant={config.variant} />
            ) : null}
              </div>
            ))}
          </div>
        </div>
          </section>
    </>
  );
};

export default IndustryXRaySections;

