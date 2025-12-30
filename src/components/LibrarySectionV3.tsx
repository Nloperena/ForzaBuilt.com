import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PDFViewerV2 from './PDFViewerV2';
import { useBookViewer } from '@/contexts/BookViewerContext';

interface Brochure {
  id: string;
  title: string;
  label: string;
  coverImage: string;
  pdfUrl: string;
  shelf: 'top' | 'bottom';
  type?: 'brochure' | 'blog';
  linkUrl?: string;
}

type AnimationState = 'idle' | 'reading';

// Function to convert ALL CAPS to Title Case
const toTitleCase = (str: string): string => {
  return str.toLowerCase().split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

const LibrarySectionV3 = () => {
  const [hoveredBrochure, setHoveredBrochure] = useState<string | null>(null);
  const [selectedBrochure, setSelectedBrochure] = useState<Brochure | null>(null);
  const [animationState, setAnimationState] = useState<AnimationState>('idle');
  const { setIsBookOpen } = useBookViewer();

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && animationState === 'reading') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [animationState]);

  const openModal = (brochure: Brochure, event: React.MouseEvent) => {
    if (brochure.type === 'blog' && brochure.linkUrl) {
      window.location.href = brochure.linkUrl;
      return;
    }
    setSelectedBrochure(brochure);
    setAnimationState('reading');
    setIsBookOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setAnimationState('idle');
    setSelectedBrochure(null);
    setIsBookOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleDownload = () => {
    if (selectedBrochure) {
      const link = document.createElement('a');
      link.href = selectedBrochure.pdfUrl;
      link.download = selectedBrochure.pdfUrl.split('/').pop() || 'document.pdf';
      link.click();
    }
  };

  const handleOpenNewTab = () => {
    if (selectedBrochure) {
      window.open(selectedBrochure.pdfUrl, '_blank');
    }
  };

  // Brochures organized by shelf
  const brochures: Brochure[] = [
    // Top shelf - 4 brochures
    {
      id: 'industrial',
      title: 'INDUSTRIAL',
      label: 'Industrial Brochure',
      coverImage: '/documents/Industrial Brochure 2.png',
      pdfUrl: '/documents/Forza_Industrial Brochure_V15.pdf',
      shelf: 'top'
    },
    {
      id: 'transportation',
      title: 'TRANSPORTATION',
      label: 'Transportation Brochure',
      coverImage: '/documents/Transportation Brochure 1.png',
      pdfUrl: '/documents/CompanyBrochure_Transportation_V37.pdf',
      shelf: 'top'
    },
    {
      id: 'marine',
      title: 'MARINE',
      label: 'Marine Brochure',
      coverImage: '/documents/Marine Brochure 2.png',
      pdfUrl: '/documents/CompanyBrochure_Marine_V40.3.pdf',
      shelf: 'top'
    },
    {
      id: 'composites',
      title: 'COMPOSITES',
      label: 'Composites Brochure',
      coverImage: '/documents/Composites Brochure 1.png',
      pdfUrl: '/documents/Forza_Composites Brochure_V22.1.pdf',
      shelf: 'top'
    },
    // Bottom shelf - 3 brochures
    {
      id: 'construction',
      title: 'CONSTRUCTION',
      label: 'Construction Brochure',
      coverImage: '/documents/Construction Brochure 1.png',
      pdfUrl: '/documents/Construction Brochure V31.2.pdf',
      shelf: 'bottom'
    },
    {
      id: 'insulation',
      title: 'INSULATION',
      label: 'Insulation Brochure',
      coverImage: '/documents/Insulation Brochure 1.png',
      pdfUrl: '/documents/CompanyBrochure_Insulation_V27.1.pdf',
      shelf: 'bottom'
    },
    {
      id: 'spray-guide',
      title: 'CANISTER ADHESIVE SPRAY GUIDE',
      label: 'Canister Spray Guide',
      coverImage: '/documents/Spray Guide 1.png',
      pdfUrl: '/documents/spray-guide.pdf',
      shelf: 'bottom'
    }
  ];

  const topShelfBrochures = brochures.filter(b => b.shelf === 'top');
  const bottomShelfBrochures = brochures.filter(b => b.shelf === 'bottom');

  // Consistent gap spacing for both rows
  const gapClasses = 'gap-2 sm:gap-4 md:gap-6';

  const renderBrochure = (brochure: Brochure, index: number) => {
    const content = (
      <>
        {/* Brochure Cover */}
        <motion.div
          className="relative flex flex-col items-center w-full"
          style={{
            perspective: '1000px',
            maxWidth: 'clamp(80px, 12vw, 180px)'
          }}
          animate={{
            scale: hoveredBrochure === brochure.id ? 1.05 : 1,
            rotateY: hoveredBrochure === brochure.id ? -8 : 0,
            z: hoveredBrochure === brochure.id ? 20 : 0
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div
            className="relative overflow-hidden aspect-[3/4] w-full"
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: 'none'
            }}
          >
            {/* Brochure Cover Image */}
            <img
              src={brochure.coverImage}
              alt={brochure.label}
              className="w-full h-full object-contain block"
            />
          </div>
          
          {/* Name label below brochure */}
          <div 
            className="w-full text-center font-poppins font-bold text-slate-700 tracking-wide pointer-events-none z-30"
            style={{
              fontSize: 'clamp(0.55rem, 1.5vw, 0.7rem)',
              textShadow: '0 1px 0 rgba(255,255,255,0.7)',
              wordBreak: 'break-word',
              lineHeight: '1.1',
              marginTop: '-0.75rem',
              paddingTop: '0.0625rem'
            }}
          >
            {brochure.label}
          </div>
        </motion.div>
      </>
    );

    return (
      <motion.div
        key={brochure.id}
        className="relative group cursor-pointer flex flex-col items-center w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.4 }}
        onMouseEnter={() => setHoveredBrochure(brochure.id)}
        onMouseLeave={() => setHoveredBrochure(null)}
        onTouchStart={() => setHoveredBrochure(brochure.id)}
      >
        {brochure.type === 'blog' && brochure.linkUrl ? (
          <Link to={brochure.linkUrl} className="flex flex-col items-center w-full">
            {content}
          </Link>
        ) : (
          <div onClick={(e) => openModal(brochure, e)} className="flex flex-col items-center w-full">
            {content}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <>
      <section className="relative bg-white px-2 sm:px-4 overflow-hidden">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto text-center pt-6 sm:pt-8 md:pt-10 lg:pt-12 mb-1 sm:mb-1.5 md:mb-2">
          <h2
            className="font-poppins font-normal text-[#2c476e] mb-0.5 sm:mb-1 font-poppins leading-tight"
            style={{ fontSize: 'clamp(28px, 2.5vw + 0.5rem, 56px)' }}
          >
            Resource Library
          </h2>
        </div>

        {/* Grid Layout with Consistent Spacing */}
        <div className="max-w-7xl mx-auto pb-6 sm:pb-8 md:pb-10 lg:pb-12">
          {/* Top Shelf - 4 brochures */}
          <div className="flex justify-center">
            <div className={`grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 ${gapClasses} mb-1 sm:mb-1.5 md:mb-2 px-2 sm:px-0`}>
              {topShelfBrochures.map((brochure, index) => renderBrochure(brochure, index))}
            </div>
          </div>

          {/* Bottom Shelf - 3 brochures, centered */}
          <div className="flex justify-center">
            <div className={`grid grid-cols-3 sm:grid-cols-3 ${gapClasses} px-2 sm:px-0`}>
              {bottomShelfBrochures.map((brochure, index) => renderBrochure(brochure, index + topShelfBrochures.length))}
            </div>
          </div>
        </div>
      </section>

      {/* Backdrop - Shows during reading state */}
      <AnimatePresence>
        {animationState === 'reading' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
          />
        )}
      </AnimatePresence>

      {/* PDF Viewer - Shows only during reading state */}
      <AnimatePresence>
        {animationState === 'reading' && selectedBrochure && (
          <PDFViewerV2
            pdfUrl={selectedBrochure.pdfUrl}
            bookTitle={toTitleCase(selectedBrochure.title)}
            bookSubtitle={selectedBrochure.label}
            bookColor="#2c476e"
            onClose={closeModal}
            onDownload={handleDownload}
            onOpenNewTab={handleOpenNewTab}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default LibrarySectionV3;

