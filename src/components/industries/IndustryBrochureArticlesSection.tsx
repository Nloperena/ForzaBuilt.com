import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getIndustryGradient } from '@/styles/brandStandards';
import PDFViewerV2 from '../PDFViewerV2/PDFViewerV2';
import blogPostsData from '@/data/blogPosts.json';
import type { BlogPost } from '@/types/Blog';
import { toTitleCase } from '../../utils/industryHelpers';

interface IndustryBrochureArticlesSectionProps {
  industry: string;
  industryName: string;
}

// Industry-specific brochure images
const brochureImages = {
  construction: '/documents/Construction Brochure 1.png',
  transportation: '/documents/Transportation Brochure 1.png',
  marine: '/documents/Marine Brochure 2.png',
  industrial: '/documents/Industrial Brochure 2.png',
  composites: '/documents/Composites Brochure 1.png',
  insulation: '/documents/Insulation Brochure 1.png',
  foam: '/documents/Marine Brochure 2.png'
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

const IndustryBrochureArticlesSection: React.FC<IndustryBrochureArticlesSectionProps> = ({
  industry,
  industryName
}) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  
  // Get brochure content
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
  const brochureTitle = content.title;
  const imageToUse = brochureImages[industry.toLowerCase() as keyof typeof brochureImages] || brochureImages.construction;

  // Get articles
  const recentArticles = useMemo(() => {
    return [...blogPostsData]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }, []);

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

  // Get the same gradient as stackable cards
  const gradientColors = getIndustryGradient(industry.toLowerCase());

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <>
    <section 
      className="relative" 
      style={{ 
        paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)', 
        paddingBottom: 'clamp(2rem, 4vw, 3rem)', 
        paddingLeft: 'clamp(0.5rem, 2vw, 1rem)', 
        paddingRight: 'clamp(0.5rem, 2vw, 1rem)',
        background: `linear-gradient(315deg, ${gradientColors})`
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Brochure Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8 flex justify-center"
        >
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12 max-w-5xl">
            {/* Left: Brochure Image */}
            <div className="relative group flex-shrink-0">
              <img
                src={imageToUse}
                alt={`Forza ${content.title} Cover`}
                className="w-32 sm:w-40 md:w-56 lg:w-72 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 bg-white"
                loading="lazy"
              />
            </div>

            {/* Right: Text and Buttons */}
            <div className="flex-1 text-left flex flex-col items-start">
              <h2 className="text-white font-poppins font-normal leading-tight mb-2 sm:mb-3 md:mb-4" style={{ fontSize: 'clamp(18px, 2vw + 0.5rem, 44px)' }}>
                {content.title}
              </h2>
              <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-5 md:mb-6 leading-relaxed max-w-[500px]">
                {content.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                <a
                  href={pdfUrl}
                  download
                  className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 font-bold text-xs sm:text-sm px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 border-white/50 hover:bg-white/30 backdrop-blur-sm text-white hover:border-white/70"
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
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#F2611D] hover:bg-[#d94e0c] text-white font-bold text-xs sm:text-sm px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
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
        </motion.div>

        {/* Divider Line */}
        <div className="flex justify-center my-8">
          <div className="w-full max-w-[400px] h-1 bg-[#F2611D]"></div>
        </div>

        {/* Articles Section */}
        <div className="w-full max-w-5xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-white font-poppins font-normal text-center mb-6 md:mb-8 lg:mb-10" 
              style={{ fontSize: 'clamp(28px, 2.5vw + 0.5rem, 48px)' }}
            >
              {industryName?.trim().toLowerCase() === 'transportation' ? 'Featured Articles' : `${toTitleCase(industryName)} Articles`}
            </motion.h2>

            {/* Articles Grid - Centered with consistent spacing */}
            <div className="flex justify-center">
              <motion.div 
                className="grid grid-cols-3 md:grid-cols-3 gap-2 sm:gap-3 md:gap-5 lg:gap-6 mb-6 md:mb-8 w-full px-2 sm:px-0"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
              >
                {recentArticles.map((article: BlogPost) => (
                  <motion.div key={article.id} variants={itemVariants}>
                    <Link
                      to={`/blog/${article.id}`}
                      className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 block h-full"
                    >
                      {/* Image Section */}
                      <div className="bg-gray-200 h-32 sm:h-36 md:h-44 flex items-center justify-center overflow-hidden">
                        {article.image ? (
                          <motion.img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          />
                        ) : (
                          <span className="text-gray-400 text-sm">image here</span>
                        )}
                      </div>

                      {/* Content Section - White background */}
                      <div className="p-2 sm:p-3 md:p-4">
                        <h3 className="font-poppins font-bold text-[#2c476e] text-xs sm:text-sm md:text-base mb-1 sm:mb-2 group-hover:text-[#F2611D] transition-colors duration-300 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="font-poppins text-gray-600 text-[10px] sm:text-xs md:text-sm leading-relaxed line-clamp-2">
                          {article.excerpt}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* View All Button */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            >
              <Link
                to="/blog"
                className="bg-[#F2611D] hover:bg-[#E6540D] text-white font-poppins font-bold px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs sm:text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                View All
              </Link>
            </motion.div>
        </div>
      </div>
    </section>

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
    </>
  );
};

export default IndustryBrochureArticlesSection;

