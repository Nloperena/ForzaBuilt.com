import React from 'react';
import { getIndustryBrochureGradient } from '../styles/brandStandards';

interface IndustryBrochureSectionProps {
  industry: string;
  title?: string;
  description?: string;
  brochureImage?: string;
  brochureLink?: string;
}

const IndustryBrochureSection: React.FC<IndustryBrochureSectionProps> = ({
  industry,
  title,
  description,
  brochureImage = 'https://images.ctfassets.net/hdznx4p7ef81/4jxIKgkpgtrlvx5f2KjDF7/59fe168521bb160bf71c906caa33dbe4/Marine-PDF-Cover_sample.png', // Placeholder image
  brochureLink = '/downloads/forza-industry-brochure.pdf' // Default PDF link
}) => {
  // Default titles and descriptions for each industry
  const defaultContent = {
    marine: {
      title: 'Marine Brochure',
      description: 'Download our Marine Digital Brochure that goes into depth with our solutions, products, and applications Marine Industry specific.'
    },
    transportation: {
      title: 'Transportation Brochure',
      description: 'Download our Transportation Digital Brochure that goes into depth with our solutions, products, and applications Transportation Industry specific.'
    },
    construction: {
      title: 'Construction Brochure',
      description: 'Download our Construction Digital Brochure that goes into depth with our solutions, products, and applications Construction Industry specific.'
    },
    industrial: {
      title: 'Industrial Brochure',
      description: 'Download our Industrial Digital Brochure that goes into depth with our solutions, products, and applications Industrial Industry specific.'
    },
    foam: {
      title: 'Foam Brochure',
      description: 'Download our Foam Digital Brochure that goes into depth with our solutions, products, and applications Foam Industry specific.'
    },
    composites: {
      title: 'Composites Brochure',
      description: 'Download our Composites Digital Brochure that goes into depth with our solutions, products, and applications Composites Industry specific.'
    },
    insulation: {
      title: 'Insulation Brochure',
      description: 'Download our Insulation Digital Brochure that goes into depth with our solutions, products, and applications Insulation Industry specific.'
    }
  };

  const content = defaultContent[industry.toLowerCase() as keyof typeof defaultContent] || defaultContent.industrial;
  const gradientColors = getIndustryBrochureGradient(industry);

  // Debug logging
  console.log('IndustryBrochureSection Debug:', {
    industry,
    industryLower: industry.toLowerCase(),
    gradientColors,
    content: content.title
  });

  return (
    <section 
      className="w-full py-20 px-4"
      style={{
        background: `linear-gradient(315deg, ${gradientColors})`
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left: Brochure Image */}
        <div className="flex-shrink-0 w-full lg:w-1/2 flex justify-center">
          <img
            src={brochureImage}
            alt={`Forza ${content.title} Cover`}
            className="w-72 md:w-80 lg:w-96 rounded-xl shadow-2xl border-4 border-white/10 bg-white/10 transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
        
        {/* Right: Text and Button */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 font-kallisto drop-shadow-lg">
            {title || content.title}
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/90 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {description || content.description}
          </p>
          <a
            href={brochureLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#F2611D] hover:bg-[#d94e0c] text-white font-bold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
          >
            Download Brochure
          </a>
        </div>
      </div>
    </section>
  );
};

export default IndustryBrochureSection; 