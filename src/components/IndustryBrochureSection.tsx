import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getIndustryBrochureGradient } from '../styles/brandStandards';
import PDFViewerV2 from './PDFViewerV2/PDFViewerV2';

interface IndustryBrochureSectionProps {
  industry: string;
  title?: string;
  description?: string;
  brochureImage?: string;
  brochureLink?: string;
  backgroundColor?: string;
  className?: string;
  compact?: boolean;
}

// Industry-specific brochure images
const brochureImages = {
  construction: '/documents/Construction Brochure 1.png',
  transportation: '/documents/Transportation Brochure 1.png',
  marine: '/documents/Marine Brochure 2.png',
  industrial: '/documents/Industrial Brochure 2.png',
  composites: '/documents/Composites Brochure 1.png',
  insulation: '/documents/Insulation Brochure 1.png',
  foam: '/documents/Marine Brochure 2.png' // Fallback for foam since no image was provided
};

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

const IndustryBrochureSection: React.FC<IndustryBrochureSectionProps> = ({
  industry,
  title,
  description,
  brochureImage,
  brochureLink = '/downloads/forza-industry-brochure.pdf', // Default PDF link
  backgroundColor,
  className = '',
  compact = false
}) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  
  // Get content first
  const content = defaultContent[industry.toLowerCase() as keyof typeof defaultContent] || defaultContent.industrial;
  
  // Map industry to new brochure PDF filenames
  const brochurePdfMap: { [key: string]: string } = {
    industrial: '/documents/Forza_Industrial Brochure_V15.pdf',
    transportation: '/documents/CompanyBrochure_Transportation_V37.pdf',
    marine: '/documents/CompanyBrochure_Marine_V40.3.pdf',
    composites: '/documents/Forza_Composites Brochure_V22.1.pdf',
    construction: '/documents/Construction Brochure V31.2.pdf',
    insulation: '/documents/CompanyBrochure_Insulation_V27.1.pdf'
  };
  
  const pdfUrl = brochurePdfMap[industry.toLowerCase()] || `/documents/${industry.toLowerCase()}.pdf`;
  const brochureTitle = title || content.title;
  
  const handleView = () => {
    setIsViewerOpen(true);
  };
  
  const handleClose = () => {
    setIsViewerOpen(false);
  };
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${industry.toLowerCase()}-brochure.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleOpenNewTab = () => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  const gradientColors = getIndustryBrochureGradient(industry);
  
  // Use provided brochureImage or fall back to industry-specific image
  const imageToUse = brochureImage || brochureImages[industry.toLowerCase() as keyof typeof brochureImages] || brochureImages.construction;

  return (
    <section 
      className={`w-full px-4 md:px-6 lg:px-8 ${
        compact ? 'py-6 md:py-8' : 'py-8 md:py-12'
      } ${backgroundColor === 'white' ? 'bg-white' : ''} ${className}`}
      style={{
        background: backgroundColor === 'white' ? 'white' : `linear-gradient(to top, ${gradientColors})`
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 xl:gap-10">
          {/* Left: Brochure Image */}
          <div className="flex-shrink-0 w-full lg:w-1/2 flex justify-center">
            <div className="relative group">
              <img
                src={imageToUse}
                alt={`Forza ${content.title} Cover`}
                className={`w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  backgroundColor === 'white'
                    ? 'border-0 bg-white'
                    : 'border-white/20 bg-white/10 border-4'
                }`}
                loading="lazy"
              />
              {/* Hover overlay effect */}
              <div className={`absolute inset-0 transition-all duration-300 ${
                backgroundColor === 'white'
                  ? 'bg-[#115B87]/0 group-hover:bg-[#115B87]/5'
                  : 'bg-black/0 group-hover:bg-black/10'
              }`}></div>
            </div>
          </div>
          
          {/* Right: Text and Button */}
          <div className="flex-1 text-center lg:text-left space-y-6 lg:space-y-8">
            <div className="space-y-4 lg:space-y-6">
              <h2 className={`font-normal leading-tight ${
                backgroundColor === 'white' 
                  ? 'text-[#2c476e] font-poppins' 
                  : 'text-white font-poppins drop-shadow-lg'
              }`}
              style={{ fontSize: 'clamp(28px, 2.5vw + 0.5rem, 56px)' }}>
                {title || content.title}
              </h2>
              <p className={`text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed ${
                backgroundColor === 'white' 
                  ? 'text-gray-600' 
                  : 'text-white/90'
              }`}>
                {description || content.description}
              </p>
            </div>
            
            {/* Download and View Buttons */}
            <div className="flex justify-center lg:justify-start gap-4">
              <a
                href={pdfUrl}
                download
                className={`group inline-flex items-center justify-center gap-2 font-bold text-xs sm:text-sm px-4 md:px-5 py-2 md:py-2.5 rounded-full shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  backgroundColor === 'white'
                    ? 'border-2 border-[#477197] hover:bg-[#477197] text-[#477197] hover:text-white'
                    : 'border-2 border-white/50 hover:bg-white/30 backdrop-blur-sm text-white hover:border-white/70'
                }`}
              >
                <svg 
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-[-2px]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
                Download
              </a>
              <button
                onClick={handleView}
                className="inline-flex items-center justify-center gap-2 bg-[#F2611D] hover:bg-[#d94e0c] text-white font-bold text-xs sm:text-sm px-4 md:px-5 py-2 md:py-2.5 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                  />
                </svg>
                View
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* PDF Viewer Backdrop */}
      <AnimatePresence>
        {isViewerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
          />
        )}
      </AnimatePresence>

      {/* PDF Viewer */}
      <AnimatePresence>
        {isViewerOpen && (
          <PDFViewerV2
            pdfUrl={pdfUrl}
            bookTitle={brochureTitle}
            bookSubtitle={content.description}
            bookColor="#2c476e"
            onClose={handleClose}
            onDownload={handleDownload}
            onOpenNewTab={handleOpenNewTab}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default IndustryBrochureSection; 
