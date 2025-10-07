import React from 'react';
import { useGradientMode } from '@/contexts/GradientModeContext';

const NewsHeadlineComponent: React.FC = () => {
  const { mode } = useGradientMode();

  const headlines = [
    "FORZA BOND: REVOLUTIONARY ADHESIVE TECHNOLOGY CHANGES INDUSTRY STANDARDS",
    "FORZA SEAL: UNPRECEDENTED PERFORMANCE IN EXTREME CONDITIONS",
    "FORZA TAPE: NEXT-GENERATION ADHESIVE SOLUTIONS FOR MODERN MANUFACTURING",
    "FORZA CLEANERS: ADVANCED FORMULATIONS FOR SUPERIOR SURFACE PREPARATION",
    "FORZA MANUFACTURING: 30 YEARS OF TRUSTED AMERICAN EXCELLENCE",
    "FORZA RESEARCH: CUTTING-EDGE CHEMISTRY FOR TOMORROW'S CHALLENGES"
  ];

  // Duplicate headlines for seamless loop
  const duplicatedHeadlines = [...headlines, ...headlines];

  return (
    <section className={`w-full py-8 ${
      mode === 'light2' ? 'bg-white' : 'bg-white'
    }`}>
      <div className="w-full overflow-hidden">
        {/* News Ticker Container */}
        <div className="relative bg-gray-900 text-white py-4">
          {/* Scrolling Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-50"></div>
          
          {/* Continuous Scrolling Headlines */}
          <div className="relative z-10 overflow-hidden">
            <div className="flex animate-scroll whitespace-nowrap">
              {duplicatedHeadlines.map((headline, index) => (
                <div key={index} className="flex items-center mr-16">
                  <div className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider mr-4">
                    BREAKING
                  </div>
                  <span className="text-lg md:text-xl lg:text-2xl font-bold font-poppins">
                    {headline}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Subtitle Text */}
        <div className="bg-gray-100 py-6">
          <div className="max-w-4xl mx-auto text-center px-4">
            <p className={`text-sm md:text-base ${
              mode === 'light2' ? 'text-gray-600' : 'text-gray-600'
            } font-poppins`}>
              Stay informed with the latest developments in industrial adhesive technology, 
              manufacturing innovations, and industry breakthroughs from Forza.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsHeadlineComponent;
