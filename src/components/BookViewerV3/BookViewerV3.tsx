import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Download, ExternalLink } from 'lucide-react';
import { Document, pdfjs } from 'react-pdf';
import SimpleBookSpread from './SimpleBookSpread';
import ZoomedPageViewer from './ZoomedPageViewer';
import BookControls from './BookControls';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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
      className="fixed inset-x-0 bottom-0 top-12 md:top-16 z-[9999] flex flex-col rounded-t-3xl shadow-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(30, 58, 95, 0.98) 0%, rgba(44, 71, 110, 0.98) 50%, rgba(30, 48, 80, 0.98) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderBottom: 'none',
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

      {/* Minimal Top Bar - Only show when not in zoom mode */}
      {!isZoomed && (
        <div 
          className="flex justify-between items-center px-3 py-2 text-white shrink-0"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div>
            <h3 className="text-sm font-semibold font-poppins">{bookTitle}</h3>
          </div>
          <div className="flex items-center gap-1">
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
                  
                  {/* Minimal Zoom hint button */}
                  <button
                    onClick={handleZoomIn}
                    className="absolute bottom-14 right-4 p-2 text-white rounded-lg shadow-lg hover:brightness-110 transition-all"
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                    title="Zoom to read"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </button>
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
              background: 'rgba(30, 58, 95, 0.9)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <div className="text-white text-xl font-poppins flex flex-col items-center gap-4">
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
              background: 'rgba(30, 58, 95, 0.9)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <div className="text-center">
              <div className="text-red-300 text-xl font-poppins mb-4">{error}</div>
              <p className="text-white/70 text-sm">PDF Path: {pdfUrl}</p>
              <p className="text-white/70 text-sm mt-2">
                Note: PDF files must be placed in the public folder
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls - Only show in book mode */}
      {!isLoading && !error && !isZoomed && (
        <BookControls
          currentPage={currentPage}
          numPages={numPages}
          onNextPage={goToNextPage}
          onPrevPage={goToPrevPage}
          onGoToPage={goToPage}
          onZoom={handleZoomIn}
        />
      )}
    </motion.div>
  );
};

export default BookViewerV3;

