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
}

// Industry-specific brochure images
const brochureImages = {
  construction: 'https://images.ctfassets.net/hdznx4p7ef81/6jBEejAIdtJWPMDFa7ODTP/f0029a96cf46735546cb0b6beb014ae8/Screenshot_2025-07-10_164759.png',
  transportation: 'https://images.ctfassets.net/hdznx4p7ef81/772ZlCwQ3zKrHEKNvPpDl5/fca49f6515208b5b9108e0f07d3652bb/Screenshot_2025-07-10_164841.png',
  marine: 'https://images.ctfassets.net/hdznx4p7ef81/2fYEToT9dN8JbL3JVhzzgU/a667b7ce0d2970ebe7c3f4f09783730e/Screenshot_2025-07-10_165017.png',
  industrial: 'https://images.ctfassets.net/hdznx4p7ef81/2FhgmLweRofhzps04eNz6Q/ad7f4fd7e6aa7079cb3f0f124d14bc2c/Screenshot_2025-07-10_165040.png',
  composites: 'https://images.ctfassets.net/hdznx4p7ef81/XkATLSGsd1iJ1yxrEgyu9/09147b64d2a99153d9198d23170362a5/Screenshot_2025-07-10_165111.png',
  insulation: 'https://images.ctfassets.net/hdznx4p7ef81/6Tu8ZRocj145EIVBFJFdcR/23a25fc03e1aa2722fb0fcb690f153a5/Screenshot_2025-07-10_165128.png',
  foam: 'https://images.ctfassets.net/hdznx4p7ef81/4jxIKgkpgtrlvx5f2KjDF7/59fe168521bb160bf71c906caa33dbe4/Marine-PDF-Cover_sample.png' // Fallback for foam since no image was provided
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
  backgroundColor
}) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  
  // Get content first
  const content = defaultContent[industry.toLowerCase() as keyof typeof defaultContent] || defaultContent.industrial;
  
  const pdfUrl = `/brochures/${industry.toLowerCase()}.pdf`;
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
      className={`w-full py-16 md:py-36 px-4 md:px-6 lg:px-8 ${backgroundColor === 'white' ? 'bg-white' : ''}`}
      style={{
        background: backgroundColor === 'white' ? 'white' : `linear-gradient(to top, ${gradientColors})`
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
          {/* Left: Brochure Image */}
          <div className="flex-shrink-0 w-full lg:w-1/2 flex justify-center">
            <div className="relative group">
              <img
                src={imageToUse}
                alt={`Forza ${content.title} Cover`}
                className={`w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[28rem] rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  backgroundColor === 'white'
                    ? 'border-0 bg-white'
                    : 'border-white/20 bg-white/10 border-4'
                }`}
                loading="lazy"
              />
              {/* Hover overlay effect */}
              <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
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
                href={`/brochures/${industry.toLowerCase()}.pdf`}
                download
                className={`group inline-flex items-center gap-2 font-bold text-xs sm:text-sm px-4 md:px-5 py-2 md:py-2.5 rounded-full shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
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
                className="inline-flex items-center gap-2 bg-[#F2611D] hover:bg-[#d94e0c] text-white font-bold text-xs sm:text-sm px-4 md:px-5 py-2 md:py-2.5 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
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