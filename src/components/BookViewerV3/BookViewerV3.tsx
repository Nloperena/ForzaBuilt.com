import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink } from 'lucide-react';
import { Document, pdfjs } from 'react-pdf';
import SimpleBookSpread from './SimpleBookSpread';
import ZoomedPageViewer from './ZoomedPageViewer';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Animated Page Counter Component
const PageCounter: React.FC<{ currentPage: number; numPages: number }> = ({ currentPage, numPages }) => {
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [prevPage, setPrevPage] = useState(currentPage);

  useEffect(() => {
    if (currentPage > prevPage) {
      setDirection('down');
    } else if (currentPage < prevPage) {
      setDirection('up');
    }
    setPrevPage(currentPage);
  }, [currentPage, prevPage]);

  // Format page display
  const getPageDisplay = () => {
    if (currentPage === 1) {
      return `1 / ${numPages}`;
    } else {
      const rightPage = currentPage + 1 <= numPages ? currentPage + 1 : null;
      return rightPage ? `${currentPage}-${rightPage} / ${numPages}` : `${currentPage} / ${numPages}`;
    }
  };

  return (
    <div className="absolute bottom-6 right-6 z-30">
      <div
        className="text-white text-sm font-poppins px-4 py-2 rounded-lg"
        style={{
          background: 'rgba(44, 71, 110, 0.25)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(71, 113, 151, 0.3)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div className="relative h-6 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              initial={{ 
                opacity: 0, 
                y: direction === 'up' ? 20 : -20 
              }}
              animate={{ 
                opacity: 1, 
                y: 0 
              }}
              exit={{ 
                opacity: 0, 
                y: direction === 'up' ? -20 : 20 
              }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {getPageDisplay()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

interface BookViewerV3Props {
  pdfUrl: string;
  bookTitle: string;
  bookSubtitle: string;
  bookColor: string;
  onClose: () => void;
  onDownload: () => void;
  onOpenNewTab: () => void;
}

const BookViewerV3: React.FC<BookViewerV3Props> = ({
  pdfUrl,
  bookTitle,
  bookSubtitle,
  bookColor,
  onClose,
  onDownload,
  onOpenNewTab,
}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageWidth, setPageWidth] = useState(450);

  // Calculate responsive page width - maximize space usage
  useEffect(() => {
    const updateWidth = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Available height: viewport - top gap - drawer handle - header - controls - padding
      const topGap = window.innerWidth < 768 ? 48 : 64;
      const drawerHandle = 24; // py-2
      const header = 40;
      const controls = 48;
      const verticalPadding = window.innerWidth < 768 ? 16 : 32; // p-2 md:p-4
      const availableHeight = viewportHeight - topGap - drawerHandle - header - controls - verticalPadding;
      
      // Available width: viewport - minimal side padding for 2-page spread
      const horizontalPadding = window.innerWidth < 768 ? 16 : 32;
      const availableWidth = viewportWidth - horizontalPadding;
      
      // Calculate page width based on constraints
      // Option 1: Fit by height (A4 ratio = 1.414)
      const widthByHeight = availableHeight / 1.414;
      
      // Option 2: Fit by width (2 pages + spine + minimal gap)
      const spine = 12;
      const widthByWidth = (availableWidth - spine) / 2;
      
      // Use the smaller to ensure it fits, but be aggressive
      const calculatedWidth = Math.min(widthByHeight, widthByWidth);
      
      setPageWidth(Math.max(280, Math.min(calculatedWidth, 800)));
    };

    // Slight delay to ensure drawer is mounted and dimensions are correct
    const timeoutId = setTimeout(updateWidth, 100);
    
    window.addEventListener('resize', updateWidth);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  // Handle PDF load success
  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
    console.log(`PDF loaded successfully: ${numPages} pages`);
  }, []);

  // Handle PDF load error
  const onDocumentLoadError = useCallback((error: Error) => {
    console.error('PDF load error:', error);
    setError(`Failed to load PDF: ${error.message}`);
    setIsLoading(false);
  }, []);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Handle zoom toggle
  const handleZoomIn = useCallback(() => {
    setIsZoomed(true);
  }, []);

  const handleZoomOut = useCallback(() => {
    setIsZoomed(false);
  }, []);

  // Navigation handlers  
  const goToNextPage = useCallback(() => {
    if (currentPage + 2 <= numPages) {
      setCurrentPage(currentPage + 2);
    }
  }, [currentPage, numPages]);

  const goToPrevPage = useCallback(() => {
    if (currentPage - 2 >= 1) {
      setCurrentPage(currentPage - 2);
    }
  }, [currentPage]);

  const goToPage = useCallback(
    (page: number) => {
      // Ensure we're on an odd page (left page of spread)
      const adjustedPage = page % 2 === 0 ? page - 1 : page;
      setCurrentPage(Math.max(1, Math.min(adjustedPage, numPages)));
    },
    [numPages]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isZoomed) return; // Let zoom viewer handle keys

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevPage();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isZoomed, goToNextPage, goToPrevPage, onClose]);

  // Memoize document options
  const documentOptions = useMemo(
    () => ({
      cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
      cMapPacked: true,
      standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
    }),
    []
  );

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ 
        type: 'spring',
        damping: 30,
        stiffness: 300,
        mass: 0.8,
      }}
      className="fixed bottom-0 left-0 right-0 h-[95vh] md:h-[92vh] z-[9999] flex flex-col overflow-hidden rounded-t-3xl"
      style={{
        background: 'rgba(44, 71, 110, 0.15)',
        backdropFilter: 'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        borderTop: '1px solid rgba(71, 113, 151, 0.3)',
        borderLeft: '1px solid rgba(71, 113, 151, 0.3)',
        borderRight: '1px solid rgba(71, 113, 151, 0.3)',
        boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.12)',
      }}
    >
      {/* Drawer Handle Indicator */}
      <div className="w-full flex justify-center py-2 shrink-0">
        <div 
          className="w-12 h-1 rounded-full bg-white/30"
          style={{
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>

      {/* Top Bar with Controls - Only show when not in zoom mode */}
      {!isZoomed && !isLoading && !error && (
        <div 
          className="flex justify-between items-center px-4 py-3 text-white shrink-0"
          style={{
            background: 'rgba(44, 71, 110, 0.12)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(71, 113, 151, 0.2)',
          }}
        >
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold font-poppins">{bookTitle}</h3>
            </div>
            
            {/* Navigation Controls */}
            <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={goToPrevPage}
              disabled={currentPage <= 1}
              className="p-1.5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors"
              title="Previous"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Next Button */}
            <button
              onClick={goToNextPage}
              disabled={currentPage + 2 > numPages}
              className="p-1.5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors"
              title="Next"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Divider */}
            <div className="h-4 w-px bg-white/20 mx-1"></div>
            
            {/* Zoom Button */}
            <button
              onClick={handleZoomIn}
              className="p-1.5 hover:bg-white/10 rounded transition-colors"
              title="Zoom to read"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </button>
            
            {/* Divider */}
            <div className="h-4 w-px bg-white/20 mx-1"></div>
            
            {/* Action Buttons */}
            <button
              onClick={onOpenNewTab}
              className="p-1.5 hover:bg-white/10 rounded transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={onDownload}
              className="p-1.5 hover:bg-white/10 rounded transition-colors"
              title="Download"
            >
              <Download className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded transition-colors"
              title="Close"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Animated Page Counter - Bottom Right */}
        {!isZoomed && !isLoading && !error && numPages > 0 && (
          <PageCounter currentPage={currentPage} numPages={numPages} />
        )}
        {/* Always render Document so it can load */}
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={null}
          error={null}
          options={documentOptions}
        >
          {!isLoading && !error && (
            <>
              {!isZoomed ? (
                <div className="flex-1 flex items-center justify-center p-2 overflow-hidden relative">
                  <SimpleBookSpread
                    currentPage={currentPage}
                    numPages={numPages}
                    pageWidth={pageWidth}
                    onPageChange={handlePageChange}
                  />
                </div>
              ) : (
                <ZoomedPageViewer
                  numPages={numPages}
                  onExitZoom={handleZoomOut}
                  initialPage={currentPage}
                />
              )}
            </>
          )}
        </Document>

        {/* Loading overlay */}
        {isLoading && (
          <div 
            className="absolute inset-0 flex items-center justify-center z-10 rounded-2xl"
            style={{
              background: 'rgba(44, 71, 110, 0.15)',
              backdropFilter: 'blur(24px) saturate(160%)',
              WebkitBackdropFilter: 'blur(24px) saturate(160%)',
              border: '1px solid rgba(71, 113, 151, 0.3)',
            }}
          >
            <div 
              className="text-white text-xl font-poppins flex flex-col items-center gap-4 p-8 rounded-2xl"
              style={{
                background: 'rgba(44, 71, 110, 0.25)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(71, 113, 151, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              }}
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              <div>Loading book...</div>
            </div>
          </div>
        )}

        {/* Error overlay */}
        {error && (
          <div 
            className="absolute inset-0 flex items-center justify-center z-10 rounded-2xl"
            style={{
              background: 'rgba(44, 71, 110, 0.15)',
              backdropFilter: 'blur(24px) saturate(160%)',
              WebkitBackdropFilter: 'blur(24px) saturate(160%)',
              border: '1px solid rgba(71, 113, 151, 0.3)',
            }}
          >
            <div 
              className="text-center p-8 rounded-2xl"
              style={{
                background: 'rgba(44, 71, 110, 0.25)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(71, 113, 151, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              }}
            >
              <div className="text-red-300 text-xl font-poppins mb-4">{error}</div>
              <p className="text-white/70 text-sm">PDF Path: {pdfUrl}</p>
              <p className="text-white/70 text-sm mt-2">
                Note: PDF files must be placed in the public folder
              </p>
            </div>
          </div>
        )}
      </div>

    </motion.div>
  );
};

export default BookViewerV3;

