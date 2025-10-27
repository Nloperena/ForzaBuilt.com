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
    <div 
      className="absolute inset-0 z-[10001] flex flex-col rounded-t-3xl overflow-hidden" 
      style={{
        background: 'linear-gradient(135deg, rgba(30, 58, 95, 0.98) 0%, rgba(44, 71, 110, 0.98) 50%, rgba(30, 48, 80, 0.98) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
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

      {/* Minimal Zoom Controls Bar */}
      <div 
        className="text-white p-2 flex items-center justify-between shrink-0"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <button
          onClick={onExitZoom}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          title="Exit Zoom"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 0.75}
            className="p-1.5 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          
          <div className="text-xs font-poppins min-w-[3rem] text-center">
            {Math.round(zoomLevel * 100)}%
          </div>
          
          <button
            onClick={handleZoomIn}
            disabled={zoomLevel >= 3.0}
            className="p-1.5 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="text-xs">
          {currentPage} / {numPages}
        </div>
      </div>

      {/* Scrollable Page Container */}
      <div className="flex-1 overflow-auto flex items-start justify-center p-8" style={{
        background: 'rgba(0, 0, 0, 0.2)',
      }}>
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

      {/* Minimal Navigation Controls */}
      <div 
        className="text-white p-2 flex items-center justify-center gap-3 shrink-0"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <button
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          className="p-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors"
          title="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          onClick={handleNextPage}
          disabled={currentPage >= numPages}
          className="p-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors"
          title="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ZoomedPageViewer;

