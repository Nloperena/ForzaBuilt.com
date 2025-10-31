import React, { useState, useRef, useEffect } from 'react';
import { Page } from 'react-pdf';
import { motion, AnimatePresence } from 'framer-motion';

interface SimpleBookSpreadProps {
  currentPage: number;
  numPages: number;
  pageWidth: number;
  onPageChange: (page: number) => void;
}

const SimpleBookSpread: React.FC<SimpleBookSpreadProps> = ({
  currentPage,
  numPages,
  pageWidth,
  onPageChange,
}) => {
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isFlipping, setIsFlipping] = useState(false);
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const leftPage = currentPage;
  const rightPage = currentPage + 1 <= numPages ? currentPage + 1 : null;

  const handleNext = () => {
    if (currentPage + 2 <= numPages && !isFlipping) {
      setDirection('forward');
      setIsFlipping(true);
      setTimeout(() => {
        onPageChange(currentPage + 2);
        setIsFlipping(false);
      }, 700);
    }
  };

  const handlePrev = () => {
    if (currentPage - 2 >= 1 && !isFlipping) {
      setDirection('backward');
      setIsFlipping(true);
      setTimeout(() => {
        onPageChange(currentPage - 2);
        setIsFlipping(false);
      }, 700);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Only left mouse button
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY;
    const zoomFactor = delta > 0 ? 0.9 : 1.1;
    setScale(prev => {
      const newScale = prev * zoomFactor;
      // Limit zoom between 0.5x and 3x
      return Math.max(0.5, Math.min(3, newScale));
    });
  };

  // Global mouse move and up handlers for smooth dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      setPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div className="relative flex items-center justify-center w-full h-full overflow-hidden" style={{ perspective: '2000px' }}>
      {/* Book Container */}
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        className={`relative flex shadow-2xl overflow-visible bg-white select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{
          transformStyle: 'preserve-3d',
          borderRadius: '4px',
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transition: isDragging ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out'
        }}
      >
        {/* Left Page - Static or flipping backward */}
        <div
          className="relative overflow-hidden bg-white"
          style={{
            width: pageWidth,
            height: pageWidth * 1.414,
            transformStyle: 'preserve-3d',
          }}
        >
          {isFlipping && direction === 'backward' ? (
            // Flipping page from right to left
            <motion.div
              className="absolute inset-0 bg-white"
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'right center',
              }}
              initial={{ rotateY: -180 }}
              animate={{ rotateY: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
            >
              {/* Front of flipping page (new right page) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <Page
                  pageNumber={currentPage + 1}
                  width={pageWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
              
              {/* Back of flipping page (old left page) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                }}
              >
                <Page
                  pageNumber={currentPage - 2}
                  width={pageWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            </motion.div>
          ) : (
            <Page
              pageNumber={leftPage}
              width={pageWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              loading={
                <div
                  className="bg-gray-100 flex items-center justify-center animate-pulse"
                  style={{
                    width: pageWidth,
                    height: pageWidth * 1.414,
                  }}
                >
                  <div className="text-gray-400">Loading...</div>
                </div>
              }
            />
          )}
        </div>

        {/* Center Spine */}
        {rightPage && (
          <div
            className="w-3 shrink-0 relative"
            style={{
              background:
                'linear-gradient(to right, rgba(0,0,0,0.15), rgba(0,0,0,0.05), rgba(0,0,0,0.15))',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)',
            }}
          />
        )}

        {/* Right Page - Static or flipping forward */}
        {rightPage && (
          <div
            className="relative overflow-hidden bg-white"
            style={{
              width: pageWidth,
              height: pageWidth * 1.414,
              transformStyle: 'preserve-3d',
            }}
          >
            {isFlipping && direction === 'forward' ? (
              // Flipping page from right to left
              <motion.div
                className="absolute inset-0 bg-white"
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'left center',
                }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -180 }}
                transition={{
                  duration: 0.7,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
              >
                {/* Front of flipping page (current right page) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <Page
                    pageNumber={rightPage}
                    width={pageWidth}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>
                
                {/* Back of flipping page (next left page) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <Page
                    pageNumber={currentPage + 2}
                    width={pageWidth}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>
              </motion.div>
            ) : (
              <Page
                pageNumber={rightPage}
                width={pageWidth}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                loading={
                  <div
                    className="bg-gray-100 flex items-center justify-center animate-pulse"
                    style={{
                      width: pageWidth,
                      height: pageWidth * 1.414,
                    }}
                  >
                    <div className="text-gray-400">Loading...</div>
                  </div>
                }
              />
            )}
          </div>
        )}
      </div>

      {/* Navigation Click Areas with corner curl hints */}
      {currentPage > 1 && (
        <button
          onClick={handlePrev}
          onMouseEnter={() => setHoveredSide('left')}
          onMouseLeave={() => setHoveredSide(null)}
          className="absolute left-0 top-0 bottom-0 w-32 hover:bg-white/5 transition-colors cursor-pointer z-10"
          aria-label="Previous pages"
          disabled={isFlipping}
        >
          {/* Corner curl hint on hover */}
          {hoveredSide === 'left' && !isFlipping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-0 left-0 w-16 h-16 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.15) 0%, transparent 100%)',
              }}
            />
          )}
        </button>
      )}
      {currentPage + 2 <= numPages && (
        <button
          onClick={handleNext}
          onMouseEnter={() => setHoveredSide('right')}
          onMouseLeave={() => setHoveredSide(null)}
          className="absolute right-0 top-0 bottom-0 w-32 hover:bg-white/5 transition-colors cursor-pointer z-10"
          aria-label="Next pages"
          disabled={isFlipping}
        >
          {/* Corner curl hint on hover */}
          {hoveredSide === 'right' && !isFlipping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
              style={{
                background: 'linear-gradient(225deg, rgba(0,0,0,0.15) 0%, transparent 100%)',
              }}
            />
          )}
        </button>
      )}

      {/* Subtle shadow under book */}
      <div
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-[85%] h-8 rounded-full opacity-30 blur-xl pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};

export default SimpleBookSpread;

