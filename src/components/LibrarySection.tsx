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

const LibrarySection = () => {
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
    // If it's a blog item, navigate to blog page instead
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
      coverImage: '/Final Resource Files/Industrial Brochure.png',
      pdfUrl: '/documents/industrial.pdf',
      shelf: 'top'
    },
    {
      id: 'transportation',
      title: 'TRANSPORTATION',
      label: 'Transportation Brochure',
      coverImage: '/Final Resource Files/Transportation Brochure.png',
      pdfUrl: '/documents/transportation.pdf',
      shelf: 'top'
    },
    {
      id: 'marine',
      title: 'MARINE',
      label: 'Marine Brochure',
      coverImage: '/Final Resource Files/Marine Brochure.png',
      pdfUrl: '/documents/marine.pdf',
      shelf: 'top'
    },
    {
      id: 'composites',
      title: 'COMPOSITES',
      label: 'Composites Brochure',
      coverImage: '/Final Resource Files/Composites Brochure.png',
      pdfUrl: '/documents/composites.pdf',
      shelf: 'top'
    },
    // Bottom shelf - 3 brochures
    {
      id: 'construction',
      title: 'CONSTRUCTION',
      label: 'Construction Brochure',
      coverImage: '/Final Resource Files/Construction Brochure.png',
      pdfUrl: '/documents/construction.pdf',
      shelf: 'bottom'
    },
    {
      id: 'insulation',
      title: 'INSULATION',
      label: 'Insulation Brochure',
      coverImage: '/Final Resource Files/Insulation Brochure.png',
      pdfUrl: '/documents/insulation.pdf',
      shelf: 'bottom'
    },
    {
      id: 'spray-guide',
      title: 'CANISTER ADHESIVE SPRAY GUIDE',
      label: 'Canister Spray Guide',
      coverImage: '/Final Resource Files/Spray Guide.png',
      pdfUrl: '/documents/spray-guide.pdf', // TODO: Add PDF file when available
      shelf: 'bottom'
    }
  ];

  // Blog shelf item
  const blogItem: Brochure = {
    id: 'articles',
    title: 'ARTICLES',
    label: 'Articles & Blog Posts',
    coverImage: '/Final Resource Files/Articles Brochure Mockup.png',
    pdfUrl: '',
    shelf: 'bottom',
    type: 'blog',
    linkUrl: '/blog'
  };

  const topShelfBrochures = brochures.filter(b => b.shelf === 'top');
  const bottomShelfBrochures = [...brochures.filter(b => b.shelf === 'bottom'), blogItem];

  const renderShelf = (shelfBrochures: Brochure[], shelfIndex: number) => (
    <div key={shelfIndex} className="relative" style={{ marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
      {/* Container with brochures - no shelf */}
      <div className="relative">
        {/* Brochures container */}
        <div className="flex items-start justify-center px-4 relative z-10" style={{ 
          gap: 'clamp(0.75rem, 1.5vw, 1.5rem)'
        }}>
        {shelfBrochures.map((brochure, index) => {
          const content = (
            <>
            {/* Brochure Cover */}
            <motion.div
              className="relative flex flex-col items-center"
              style={{
                width: 'clamp(120px, 15vw, 240px)',
                perspective: '1000px'
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
              
              {/* Name label below brochure - brought closer and centered */}
              <div 
                className="w-full text-center font-poppins font-bold text-slate-700 tracking-wide pointer-events-none z-30"
                style={{
                  marginTop: '-0.75rem',
                  fontSize: 'clamp(0.7rem, 1vw, 0.9rem)',
                  textShadow: '0 1px 0 rgba(255,255,255,0.7)',
                  wordBreak: 'break-word',
                  lineHeight: '1.2'
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
              className="relative group cursor-pointer flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (shelfIndex * 0.1) + (index * 0.1), duration: 0.5 }}
              onMouseEnter={() => setHoveredBrochure(brochure.id)}
              onMouseLeave={() => setHoveredBrochure(null)}
            >
              {brochure.type === 'blog' && brochure.linkUrl ? (
                <Link to={brochure.linkUrl} className="flex flex-col items-center">
                  {content}
                </Link>
              ) : (
                <div onClick={(e) => openModal(brochure, e)} className="flex flex-col items-center">
                  {content}
                </div>
              )}
            </motion.div>
          );
        })}
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative bg-white py-4 md:py-6 lg:py-8 px-4 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto text-center mb-6 md:mb-8">
        <h2
          className="text-fluid-heading font-normal text-[#2c476e] mb-4 font-poppins"
        >
          Resource Library
        </h2>
      </div>

      {/* Shelves Container */}
      <div className="max-w-7xl mx-auto">
        {/* Top Shelf */}
        {renderShelf(topShelfBrochures, 0)}

        {/* Bottom Shelf */}
        {renderShelf(bottomShelfBrochures, 1)}
      </div>

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
    </section>
  );
};

export default LibrarySection;
