import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookViewerV3 } from './BookViewerV3';
import { useBookViewer } from '@/contexts/BookViewerContext';

interface Brochure {
  id: string;
  title: string;
  label: string;
  coverImage: string;
  pdfUrl: string;
  shelf: 'top' | 'bottom';
}

type AnimationState = 'idle' | 'reading';

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

  const topShelfBrochures = brochures.filter(b => b.shelf === 'top');
  const bottomShelfBrochures = brochures.filter(b => b.shelf === 'bottom');

  const renderShelf = (shelfBrochures: Brochure[], shelfIndex: number) => (
    <div key={shelfIndex} className="relative mb-16 md:mb-20">
      {/* Container with brochures positioned above shelf */}
      <div className="relative pb-12 md:pb-16">
        {/* Brochures positioned above shelf */}
        <div className="flex items-end justify-center gap-4 md:gap-6 lg:gap-8 px-4 relative z-10" style={{ marginBottom: '0' }}>
        {shelfBrochures.map((brochure, index) => (
          <motion.div
            key={brochure.id}
            className="relative group cursor-pointer flex flex-col items-center"
            onClick={(e) => openModal(brochure, e)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (shelfIndex * 0.1) + (index * 0.1), duration: 0.5 }}
            onMouseEnter={() => setHoveredBrochure(brochure.id)}
            onMouseLeave={() => setHoveredBrochure(null)}
          >
            {/* Brochure Cover */}
            <motion.div
              className="relative"
              style={{
                width: 'clamp(160px, 18vw, 240px)',
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
                className="relative rounded-lg overflow-hidden"
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow: 'none'
                }}
              >
                {/* Brochure Cover Image */}
                <img
                  src={brochure.coverImage}
                  alt={brochure.label}
                  className="w-full h-auto block"
                  style={{
                    objectFit: 'contain'
                  }}
                />
              </div>

              {/* Name label overlapping shelf (no layout shift) */}
              <div
                className="absolute -bottom-3 md:-bottom-4 left-1/2 -translate-x-1/2 font-poppins text-[10px] md:text-xs text-slate-700 tracking-wide pointer-events-none z-30"
                style={{
                  textShadow: '0 1px 0 rgba(255,255,255,0.7)'
                }}
              >
                {brochure.label}
              </div>
            </motion.div>

            {/* Label below brochure removed per request */}
            </motion.div>
          ))}
        </div>

        {/* Shelf Surface positioned below brochures (SVG asset) */}
        <img
          src="/Final Resource Files/Shelf.svg"
          alt="Shelf"
          className="absolute bottom-0 left-0 right-0 w-full h-12 md:h-16"
          style={{ zIndex: 1 }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/Final Resource Files/Shelf.png'; }}
        />
      </div>
    </div>
  );

  return (
    <section className="relative bg-white py-16 md:py-20 px-4 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-[#2c476e] mb-4 font-poppins">
          Resource Library
        </h2>
        <div className="text-base md:text-lg lg:text-xl text-gray-600 font-normal font-poppins max-w-3xl mx-auto space-y-1">
          <p>Explore our industry brochures and technical resources.</p>
          <p>Click any brochure to view or download.</p>
        </div>
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

      {/* Book Viewer - Shows only during reading state */}
      <AnimatePresence>
        {animationState === 'reading' && selectedBrochure && (
          <BookViewerV3
            pdfUrl={selectedBrochure.pdfUrl}
            bookTitle={selectedBrochure.title}
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
