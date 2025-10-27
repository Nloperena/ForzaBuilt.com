import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, Download, ExternalLink } from 'lucide-react';
import { Document, pdfjs } from 'react-pdf';
import FlipbookCore from './FlipbookCore';
import ZoomedPageViewer from './ZoomedPageViewer';
import BookControls from './BookControls';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface FlipbookViewerProps {
  pdfUrl: string;
  bookTitle: string;
  bookSubtitle: string;
  bookColor: string;
  onClose: () => void;
  onDownload: () => void;
  onOpenNewTab: () => void;
}

const FlipbookViewer: React.FC<FlipbookViewerProps> = ({
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

  // Handle page change from flipbook
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
    if ((window as any).__flipbookAPI) {
      (window as any).__flipbookAPI.flipNext();
    }
  }, []);

  const goToPrevPage = useCallback(() => {
    if ((window as any).__flipbookAPI) {
      (window as any).__flipbookAPI.flipPrev();
    }
  }, []);

  const goToPage = useCallback((page: number) => {
    if ((window as any).__flipbookAPI) {
      // Convert to 0-based for page-flip
      (window as any).__flipbookAPI.flipToPage(page - 1);
    }
  }, []);

  // Memoize document options
  const documentOptions = useMemo(
    () => ({
      cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
      cMapPacked: true,
      standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
    }),
    []
  );

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isZoomed) {
          handleZoomOut();
        } else {
          onClose();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isZoomed, handleZoomOut, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed inset-4 md:inset-8 lg:inset-12 z-[9999] flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl shadow-2xl overflow-hidden"
    >
      {/* Top Bar - Only show when not in zoom mode */}
      {!isZoomed && (
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
                <FlipbookCore
                  numPages={numPages}
                  onZoomRequest={handleZoomIn}
                  onPageChange={handlePageChange}
                  bookColor={bookColor}
                />
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
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 z-10">
            <div className="text-white text-xl font-poppins flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              <div>Loading book...</div>
            </div>
          </div>
        )}

        {/* Error overlay */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 z-10">
            <div className="text-center">
              <div className="text-red-400 text-xl font-poppins mb-4">{error}</div>
              <p className="text-gray-400 text-sm">PDF Path: {pdfUrl}</p>
              <p className="text-gray-400 text-sm mt-2">
                Note: PDF files must be placed in the public folder
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls - Only show in flip mode */}
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

export default FlipbookViewer;

