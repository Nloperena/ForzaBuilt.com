import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookViewerV3 } from './BookViewerV3';
import { useBookViewer } from '@/contexts/BookViewerContext';

interface Book {
  id: string;
  title: string;
  subtitle: string;
  pdfUrl: string;
  color: string;
}

type AnimationState = 'idle' | 'reading';

const LibrarySection = () => {
  const [hoveredBook, setHoveredBook] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
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

  const openModal = (book: Book, event: React.MouseEvent) => {
    setSelectedBook(book);
    setAnimationState('reading');
    setIsBookOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setAnimationState('idle');
    setSelectedBook(null);
    setIsBookOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleDownload = () => {
    if (selectedBook) {
      const link = document.createElement('a');
      link.href = selectedBook.pdfUrl;
      link.download = selectedBook.pdfUrl.split('/').pop() || 'document.pdf';
      link.click();
    }
  };

  const handleOpenNewTab = () => {
    if (selectedBook) {
      window.open(selectedBook.pdfUrl, '_blank');
    }
  };

  // Map industry brochures to books with their colors
  const books: Book[] = [
    {
      id: 'industrial',
      title: 'INDUSTRIAL',
      subtitle: 'Manufacturing Solutions',
      pdfUrl: '/documents/industrial.pdf',
      color: '#f16a26' // Industrial orange
    },
    {
      id: 'transportation',
      title: 'TRANSPORTATION',
      subtitle: 'Mobility Solutions',
      pdfUrl: '/documents/transportation.pdf',
      color: '#b83d35' // Transportation red
    },
    {
      id: 'marine',
      title: 'MARINE',
      subtitle: 'Maritime Solutions',
      pdfUrl: '/documents/marine.pdf',
      color: '#147974' // Marine teal
    },
    {
      id: 'composites',
      title: 'COMPOSITES',
      subtitle: 'Advanced Materials',
      pdfUrl: '/documents/composites.pdf',
      color: '#c7c8c9' // Composites gray
    },
    {
      id: 'construction',
      title: 'CONSTRUCTION',
      subtitle: 'Building Solutions',
      pdfUrl: '/documents/construction.pdf',
      color: '#fec770' // Construction yellow
    },
    {
      id: 'insulation',
      title: 'INSULATION',
      subtitle: 'Thermal Solutions',
      pdfUrl: '/documents/insulation.pdf',
      color: '#d0157d' // Insulation pink
    }
  ];

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 py-20 px-4 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#2c476e] mb-4 font-poppins">
          Resource Library
        </h2>
        <p className="text-base md:text-lg text-gray-600 font-normal font-poppins max-w-2xl mx-auto">
          Explore our industry brochures and technical resources
        </p>
      </div>

      {/* Bookshelf Container */}
      <div className="max-w-6xl mx-auto">
        {/* Shelf Background */}
        <div className="relative">
          {/* Shelf surface */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-8 rounded-sm shadow-xl"
            style={{
              background: 'linear-gradient(to bottom, #1e3a5f 0%, #2c476e 50%, #1e3050 100%)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Shelf edge highlight */}
            <div 
              className="absolute top-0 left-0 right-0 h-1 rounded-t-sm"
              style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent)' }}
            />
          </div>

          {/* Books Container */}
          <div className="flex items-end justify-center gap-2 md:gap-3 lg:gap-4 pb-8 px-4" style={{ perspective: '1200px' }}>
            {books.map((book, index) => (
              <motion.div
                key={book.id}
                className="relative group cursor-pointer"
                onClick={(e) => openModal(book, e)}
                style={{
                  transformStyle: 'preserve-3d',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredBook(book.id)}
                onMouseLeave={() => setHoveredBook(null)}
              >
                {/* Book Spine */}
                <motion.div
                  className="relative rounded-sm shadow-2xl"
                  style={{
                    width: 'clamp(60px, 8vw, 120px)',
                    height: 'clamp(280px, 35vw, 400px)',
                    background: 'linear-gradient(to right, #ffffff 0%, #f5f5f5 50%, #ffffff 100%)',
                    boxShadow: hoveredBook === book.id
                      ? `0 8px 32px rgba(0, 0, 0, 0.4), inset 2px 0 4px rgba(0, 0, 0, 0.1), inset -2px 0 4px rgba(0, 0, 0, 0.1)`
                      : `0 4px 16px rgba(0, 0, 0, 0.3), inset 2px 0 4px rgba(0, 0, 0, 0.05), inset -2px 0 4px rgba(0, 0, 0, 0.05)`,
                  }}
                  animate={{
                    rotateY: hoveredBook === book.id ? -15 : 0,
                    translateZ: hoveredBook === book.id ? 40 : 0,
                    translateX: hoveredBook === book.id ? -10 : 0,
                    scale: hoveredBook === book.id ? 1.05 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Book spine content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-between p-2 md:p-3 py-4 md:py-6">
                    {/* Small Forza logo at top */}
                    <div className="opacity-60 shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill={book.color}>
                        <circle cx="12" cy="12" r="10" fill={book.color} opacity="0.8"/>
                      </svg>
                    </div>
                    
                    {/* Vertical stacked text for spine */}
                    <div 
                      className="font-bold text-xs md:text-sm lg:text-base text-center font-kallisto flex-1 flex items-center"
                      style={{
                        color: book.color,
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                        letterSpacing: '0.1em',
                        writingMode: 'vertical-rl',
                        textOrientation: 'upright',
                      }}
                    >
                      {book.title}
                    </div>
                  </div>

                  {/* Book edges/pages effect */}
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.15) 100%)'
                    }}
                  />
                </motion.div>

                {/* Tooltip on hover */}
                {hoveredBook === book.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-50 whitespace-nowrap"
                  >
                    <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl text-sm font-poppins">
                      {book.title}
                      <div className="text-xs text-gray-300 mt-1">{book.subtitle}</div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Subtle call to action */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 font-light font-poppins">
            Click any brochure to view or download
          </p>
        </div>
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
        {animationState === 'reading' && selectedBook && (
          <BookViewerV3
            pdfUrl={selectedBook.pdfUrl}
            bookTitle={selectedBook.title}
            bookSubtitle={selectedBook.subtitle}
            bookColor={selectedBook.color}
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

