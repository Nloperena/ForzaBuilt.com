import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface BookControlsProps {
  currentPage: number;
  numPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onGoToPage: (page: number) => void;
  onZoom: () => void;
}

const BookControls: React.FC<BookControlsProps> = ({
  currentPage,
  numPages,
  onNextPage,
  onPrevPage,
  onGoToPage,
  onZoom,
}) => {
  const [sliderValue, setSliderValue] = useState(currentPage);
  const [isSliding, setIsSliding] = useState(false);

  // Update slider when page changes externally
  useEffect(() => {
    if (!isSliding) {
      setSliderValue(currentPage);
    }
  }, [currentPage, isSliding]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSliderValue(value);
    setIsSliding(true);
  };

  const handleSliderRelease = () => {
    onGoToPage(sliderValue);
    setIsSliding(false);
  };

  // Calculate display (show spread if not last page)
  const rightPage = currentPage + 1 <= numPages ? currentPage + 1 : null;

  return (
    <div 
      className="text-white p-2 shrink-0"
      style={{
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Minimal Controls */}
      <div className="flex items-center justify-center gap-3 max-w-4xl mx-auto">
        {/* Previous Button */}
        <button
          onClick={onPrevPage}
          disabled={currentPage <= 1}
          className="p-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors"
          title="Previous"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Compact Page Counter */}
        <div className="text-center min-w-[100px]">
          <div className="text-sm font-poppins">
            {rightPage ? `${currentPage}-${rightPage}` : currentPage} / {numPages}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={onNextPage}
          disabled={currentPage >= numPages}
          className="p-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors"
          title="Next"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Divider */}
        <div className="h-4 w-px bg-white/20"></div>

        {/* Zoom Button */}
        <button
          onClick={onZoom}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          title="Zoom to read"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default BookControls;

