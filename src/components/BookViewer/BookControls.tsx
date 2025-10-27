import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface BookControlsProps {
  currentPage: number;
  numPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onGoToPage: (page: number) => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
}

const BookControls: React.FC<BookControlsProps> = ({
  currentPage,
  numPages,
  onNextPage,
  onPrevPage,
  onGoToPage,
  zoom,
  onZoomIn,
  onZoomOut,
  onZoomReset,
}) => {
  const [jumpToPage, setJumpToPage] = useState('');
  const [sliderValue, setSliderValue] = useState(currentPage);
  const [isSliding, setIsSliding] = useState(false);

  // Update slider when page changes externally
  React.useEffect(() => {
    if (!isSliding) {
      setSliderValue(currentPage);
    }
  }, [currentPage, isSliding]);

  const handleJumpToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpToPage);
    if (pageNum >= 1 && pageNum <= numPages) {
      onGoToPage(pageNum);
      setJumpToPage('');
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSliderValue(value);
    setIsSliding(true);
  };

  const handleSliderRelease = () => {
    onGoToPage(sliderValue);
    setIsSliding(false);
  };

  const rightPage = currentPage + 1 <= numPages ? currentPage + 1 : null;
  const progress = (currentPage / numPages) * 100;

  return (
    <div className="bg-[#2c476e] text-white p-4 border-t border-gray-700 shrink-0">
      {/* Page Slider with Preview */}
      <div className="max-w-5xl mx-auto mb-4">
        <div className="relative">
          {/* Slider */}
          <input
            type="range"
            min="1"
            max={numPages}
            value={sliderValue}
            onChange={handleSliderChange}
            onMouseUp={handleSliderRelease}
            onTouchEnd={handleSliderRelease}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
            style={{
              background: `linear-gradient(to right, #60a5fa 0%, #60a5fa ${(sliderValue / numPages) * 100}%, #374151 ${(sliderValue / numPages) * 100}%, #374151 100%)`
            }}
          />
          
          {/* Page markers */}
          <div className="flex justify-between mt-1 px-1">
            <span className="text-xs text-gray-400">Page 1</span>
            <span className="text-xs text-gray-400">Page {numPages}</span>
          </div>

          {/* Hover tooltip showing page number */}
          {isSliding && (
            <div 
              className="absolute -top-10 bg-gray-900 text-white px-3 py-1 rounded text-sm font-bold shadow-lg pointer-events-none"
              style={{
                left: `${(sliderValue / numPages) * 100}%`,
                transform: 'translateX(-50%)',
              }}
            >
              Page {sliderValue}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-4 max-w-5xl mx-auto">
        {/* Previous Button */}
        <button
          onClick={onPrevPage}
          disabled={currentPage <= 1}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors font-poppins"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page Counter */}
        <div className="text-center">
          <div className="text-lg font-bold font-poppins">
            {rightPage ? `${currentPage}-${rightPage}` : currentPage} of {numPages}
          </div>
          <div className="text-xs text-gray-300">
            {rightPage ? 'Pages' : 'Page'}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={onNextPage}
          disabled={currentPage >= numPages}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors font-poppins"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2 ml-4 border-l border-white/20 pl-4">
          <button
            onClick={onZoomOut}
            disabled={zoom <= 0.6}
            className="p-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          
          <div className="text-sm font-poppins min-w-[3rem] text-center">
            {Math.round(zoom * 100)}%
          </div>
          
          <button
            onClick={onZoomIn}
            disabled={zoom >= 2.0}
            className="p-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          
          <button
            onClick={onZoomReset}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            title="Reset Zoom"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookControls;

