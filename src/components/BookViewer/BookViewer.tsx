import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink } from 'lucide-react';
import { Document, pdfjs } from 'react-pdf';
import BookSpread from './BookSpread';
import BookControls from './BookControls';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface BookViewerProps {
  pdfUrl: string;
  bookTitle: string;
  bookSubtitle: string;
  bookColor: string;
  onClose: () => void;
  onDownload: () => void;
  onOpenNewTab: () => void;
}

const BookViewer: React.FC<BookViewerProps> = ({
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1.2); // Start at 120% zoom
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Handle PDF load success
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
    console.log(`PDF loaded successfully: ${numPages} pages`);
    // After initial pages load, disable skeleton for all future navigation
    setTimeout(() => setIsFirstLoad(false), 2000);
  };

  // Handle PDF load error
  const onDocumentLoadError = (error: Error) => {
    console.error('PDF load error:', error);
    setError(`Failed to load PDF: ${error.message}`);
    setIsLoading(false);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevPage();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, numPages]);

  const [isNavigating, setIsNavigating] = useState(false);
  const [triggerFlip, setTriggerFlip] = useState<'forward' | 'backward' | null>(null);

  const goToNextPage = useCallback(() => {
    if (isNavigating) return;
    setIsNavigating(true);
    setTriggerFlip('forward');
    // Release the lock after animation completes
    setTimeout(() => {
      setIsNavigating(false);
      setTriggerFlip(null);
    }, 1000);
  }, [isNavigating]);

  const goToPrevPage = useCallback(() => {
    if (isNavigating) return;
    setIsNavigating(true);
    setTriggerFlip('backward');
    // Release the lock after animation completes
    setTimeout(() => {
      setIsNavigating(false);
      setTriggerFlip(null);
    }, 1000);
  }, [isNavigating]);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const goToPage = useCallback((page: number) => {
    const adjustedPage = page % 2 === 0 ? page - 1 : page;
    setCurrentPage(Math.max(1, Math.min(adjustedPage, numPages)));
  }, [numPages]);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.2, 2.0)); // Max 200%
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.2, 0.6)); // Min 60%
  }, []);

  const handleZoomReset = useCallback(() => {
    setZoom(1.2); // Reset to 120%
  }, []);

  // Memoize document options to prevent unnecessary reloads
  const documentOptions = useMemo(() => ({
    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
    cMapPacked: true,
    standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
  }), []);

  // Calculate left and right page numbers
  const leftPage = currentPage;
  const rightPage = currentPage + 1 <= numPages ? currentPage + 1 : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed inset-4 md:inset-8 lg:inset-12 z-[9999] flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl shadow-2xl overflow-hidden"
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 bg-[#2c476e] text-white border-b border-gray-700 shrink-0">
        <div>
          <h3 className="text-xl font-bold font-poppins">{bookTitle}</h3>
          <p className="text-sm text-gray-200">{bookSubtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenNewTab}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Open in new tab"
          >
            <ExternalLink className="h-5 w-5" />
          </button>
          <button
            onClick={onDownload}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Download"
          >
            <Download className="h-5 w-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Book Content Area */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden">
        {error ? (
          <div className="text-center">
            <div className="text-red-400 text-xl font-poppins mb-4">{error}</div>
            <p className="text-gray-400 text-sm">PDF Path: {pdfUrl}</p>
            <p className="text-gray-400 text-sm mt-2">
              Note: PDF files must be placed in the public folder
            </p>
          </div>
        ) : isLoading ? (
          <div className="text-white text-xl font-poppins flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <div>Loading book...</div>
          </div>
        ) : null}
        
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={null}
          error={null}
          options={documentOptions}
        >
          {!isLoading && !error && (
            <BookSpread
              leftPage={leftPage}
              rightPage={rightPage}
              numPages={numPages}
              onPageChange={handlePageChange}
              bookColor={bookColor}
              zoom={zoom}
              triggerFlip={triggerFlip}
              showSkeletons={isFirstLoad}
            />
          )}
        </Document>
      </div>

      {/* Bottom Controls */}
      {!isLoading && !error && (
        <BookControls
          currentPage={currentPage}
          numPages={numPages}
          onNextPage={goToNextPage}
          onPrevPage={goToPrevPage}
          onGoToPage={goToPage}
          zoom={zoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onZoomReset={handleZoomReset}
        />
      )}
    </motion.div>
  );
};

export default BookViewer;

