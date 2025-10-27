import React, { useState, useCallback } from 'react';
import { Page } from 'react-pdf';
import { ZoomIn, ZoomOut, Maximize2, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ZoomedPageViewerProps {
  numPages: number;
  onExitZoom: () => void;
  initialPage?: number;
}

const ZoomedPageViewer: React.FC<ZoomedPageViewerProps> = ({
  numPages,
  onExitZoom,
  initialPage = 1,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [zoomLevel, setZoomLevel] = useState(1.5);
  const baseWidth = 600;

  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3.0));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  }, []);

  const handleZoomReset = useCallback(() => {
    setZoomLevel(1.5);
  }, []);

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(numPages, prev + 1));
  }, [numPages]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleNextPage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevPage();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onExitZoom();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleNextPage, handlePrevPage, onExitZoom]);

  return (
    <div className="fixed inset-0 z-[10000] bg-gray-900 flex flex-col">
      {/* Zoom Controls Bar */}
      <div className="bg-[#2c476e] text-white p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onExitZoom}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
            <span>Exit Zoom</span>
          </button>
          
          <div className="h-6 w-px bg-white/20"></div>
          
          <div className="text-sm">
            Page {currentPage} of {numPages}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 0.75}
            className="p-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          
          <div className="text-sm font-poppins min-w-[4rem] text-center">
            {Math.round(zoomLevel * 100)}%
          </div>
          
          <button
            onClick={handleZoomIn}
            disabled={zoomLevel >= 3.0}
            className="p-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleZoomReset}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            title="Reset Zoom"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Page Container */}
      <div className="flex-1 overflow-auto bg-gray-800 flex items-start justify-center p-8">
        <div className="shadow-2xl">
          <Page
            pageNumber={currentPage}
            width={baseWidth * zoomLevel}
            renderTextLayer={true}  // Enable text selection in zoom mode
            renderAnnotationLayer={true}
            loading={
              <div 
                className="bg-white flex items-center justify-center animate-pulse"
                style={{ 
                  width: `${baseWidth * zoomLevel}px`, 
                  height: `${baseWidth * zoomLevel * 1.414}px`,
                }}
              >
                <div className="text-gray-400">Loading page...</div>
              </div>
            }
          />
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="bg-[#2c476e] text-white p-4 flex items-center justify-center gap-4 shrink-0">
        <button
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Previous</span>
        </button>

        <div className="text-center px-4">
          <div className="text-lg font-bold">
            Page {currentPage} of {numPages}
          </div>
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPage >= numPages}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors"
        >
          <span>Next</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ZoomedPageViewer;

