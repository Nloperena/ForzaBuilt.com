import React from 'react';
import { getIndustryColors } from '@/styles/brandStandards';
import { getBackgroundGradientByIndustry } from '@/data/stackableCardsData';

const BrandColorsTest: React.FC = () => {
  const industries = ['marine', 'transportation', 'construction', 'industrial', 'foam', 'composites', 'insulation'];

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Brand Colors Test</h1>
      
      {industries.map((industry) => {
        const colors = getIndustryColors(industry);
        const gradient = getBackgroundGradientByIndustry(industry);
        
        return (
          <div key={industry} className="border rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold capitalize">{industry}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Primary Color</h3>
                <div 
                  className="w-full h-16 rounded border"
                  style={{ backgroundColor: colors.primary }}
                />
                <p className="text-sm mt-1">{colors.primary}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Secondary Color</h3>
                <div 
                  className="w-full h-16 rounded border"
                  style={{ backgroundColor: colors.secondary }}
                />
                <p className="text-sm mt-1">{colors.secondary}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Accent Color</h3>
                <div 
                  className="w-full h-16 rounded border"
                  style={{ backgroundColor: colors.accent }}
                />
                <p className="text-sm mt-1">{colors.accent}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Gradient</h3>
              <div 
                className="w-full h-16 rounded border"
                style={{ 
                  background: `linear-gradient(to right, ${gradient})`
                }}
              />
              <p className="text-sm mt-1">{gradient}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BrandColorsTest; 