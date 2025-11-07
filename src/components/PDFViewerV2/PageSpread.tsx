import React, { useState, useRef, useEffect } from 'react';
import { Page } from 'react-pdf';
import { motion, AnimatePresence } from 'framer-motion';

interface PageSpreadProps {
  currentPage: number;
  numPages: number;
  pageWidth: number;
  onPageChange: (page: number) => void;
}

interface PageBoxProps {
  pageNumber: number | null;
  pageWidth: number;
  isLeft: boolean;
  isFlipping: boolean;
  flipDirection: 'forward' | 'backward' | null;
  nextPageNumber: number | null;
  position: { x: number; y: number };
  scale: number;
  onMouseDown: (e: React.MouseEvent) => void;
  onWheel: (e: React.WheelEvent) => void;
  onReset: () => void;
}

const PageBox: React.FC<PageBoxProps> = ({
  pageNumber,
  pageWidth,
  isLeft,
  isFlipping,
  flipDirection,
  nextPageNumber,
  position,
  scale,
  onMouseDown,
  onWheel,
  onReset,
}) => {
  if (!pageNumber) {
    return (
      <div
        className="relative bg-gray-100 rounded shadow-lg"
        style={{
          width: pageWidth,
          height: pageWidth * 1.414,
        }}
      />
    );
  }

  return (
    <div className="relative">
      <div
        onMouseDown={onMouseDown}
        onWheel={onWheel}
        className={`relative bg-white rounded shadow-2xl overflow-hidden select-none cursor-grab ${
          isFlipping ? 'pointer-events-none' : ''
        }`}
        style={{
          width: pageWidth,
          height: pageWidth * 1.414,
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <AnimatePresence mode="wait">
          {isFlipping && flipDirection ? (
            <motion.div
              key={`flip-${pageNumber}`}
              className="absolute inset-0 bg-white"
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: isLeft ? 'right center' : 'left center',
              }}
              initial={{ rotateY: 0 }}
              animate={{ 
                rotateY: flipDirection === 'forward' ? (isLeft ? 180 : -180) : (isLeft ? -180 : 180),
              }}
              exit={{ rotateY: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.42, 0, 0.58, 1], // Smooth ease-in-out for realistic page turn
              }}
            >
              {/* Front of flipping page (current page) */}
              <motion.div
                className="absolute inset-0 overflow-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                }}
                animate={{
                  boxShadow: [
                    'inset 0 0 0 rgba(0,0,0,0)',
                    'inset -20px 0 30px rgba(0,0,0,0.15)',
                    'inset 0 0 0 rgba(0,0,0,0)',
                  ],
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.42, 0, 0.58, 1],
                }}
              >
                <Page
                  pageNumber={pageNumber}
                  width={pageWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </motion.div>
              
              {/* Back of flipping page (next page) */}
              {nextPageNumber && (
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                  animate={{
                    boxShadow: [
                      'inset 0 0 0 rgba(0,0,0,0)',
                      'inset 20px 0 30px rgba(0,0,0,0.15)',
                      'inset 0 0 0 rgba(0,0,0,0)',
                    ],
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.42, 0, 0.58, 1],
                  }}
                >
                  <Page
                    pageNumber={nextPageNumber}
                    width={pageWidth}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={`page-${pageNumber}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <Page
                pageNumber={pageNumber}
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Reset button */}
      {(position.x !== 0 || position.y !== 0 || scale !== 1) && (
        <button
          onClick={onReset}
          className="absolute top-2 right-2 p-1.5 text-white rounded shadow-lg hover:brightness-110 transition-all z-20"
          style={{
            background: 'rgba(44, 71, 110, 0.25)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(71, 113, 151, 0.3)',
          }}
          title="Reset position and zoom"
        >
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

const PageSpread: React.FC<PageSpreadProps> = ({
  currentPage,
  numPages,
  pageWidth,
  onPageChange,
}) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'forward' | 'backward' | null>(null);
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
  const [flipStartPage, setFlipStartPage] = useState(currentPage);
  
  // Shared drag state for both pages
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const leftPage = currentPage;
  // Show first page as cover only (no right page), unless we're flipping forward from cover
  const rightPage = currentPage === 1 ? null : (currentPage + 1 <= numPages ? currentPage + 1 : null);
  
  // During forward flip from cover, show right page for animation
  const showRightPageForFlip = isFlipping && flipDirection === 'forward' && flipStartPage === 1;

  // Calculate pages during flip
  const getLeftPageForFlip = () => {
    if (isFlipping && flipDirection === 'backward') {
      if (flipStartPage === 2) {
        // Going back from page 2 to page 1 (cover)
        return null; // No left page during flip when going to cover
      }
      return flipStartPage - 2;
    }
    return null;
  };

  const getRightPageForFlip = () => {
    if (isFlipping && flipDirection === 'forward') {
      if (flipStartPage === 1) {
        // Going forward from page 1 (cover) to page 2
        // Show page 3 on the back of the flipping page (page 2)
        return 3;
      }
      return flipStartPage + 2;
    }
    return null;
  };

  const handleNext = () => {
    if (!isFlipping) {
      let nextPage: number;
      if (currentPage === 1) {
        // From cover (page 1), go to page 2 (showing 2-3)
        nextPage = 2;
      } else {
        // From any other spread, go forward by 2 pages
        nextPage = currentPage + 2;
      }
      
      if (nextPage <= numPages) {
        setFlipStartPage(currentPage);
        setFlipDirection('forward');
        setIsFlipping(true);
        setTimeout(() => {
          onPageChange(nextPage);
          setIsFlipping(false);
          setFlipDirection(null);
        }, 700);
      }
    }
  };

  const handlePrev = () => {
    if (!isFlipping) {
      let prevPage: number;
      if (currentPage === 2) {
        // From pages 2-3, go back to cover (page 1)
        prevPage = 1;
      } else {
        // From any other spread, go back by 2 pages
        prevPage = currentPage - 2;
      }
      
      if (prevPage >= 1) {
        setFlipStartPage(currentPage);
        setFlipDirection('backward');
        setIsFlipping(true);
        setTimeout(() => {
          onPageChange(prevPage);
          setIsFlipping(false);
          setFlipDirection(null);
        }, 700);
      }
    }
  };

  // Shared drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || isFlipping) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    e.preventDefault();
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY;
    const zoomFactor = delta > 0 ? 0.9 : 1.1;
    setScale(prev => {
      const newScale = prev * zoomFactor;
      return Math.max(0.5, Math.min(3, newScale));
    });
  };

  const handleReset = () => {
    setPosition({ x: 0, y: 0 });
    setScale(1);
  };

  // Global mouse move and up handlers for synchronized dragging
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

  const pageHeight = pageWidth * 1.414;

  return (
    <div 
      className="relative w-full flex items-start justify-center" 
      style={{ 
        perspective: '2000px',
        height: `${pageHeight}px`,
        maxHeight: `${pageHeight}px`,
      }}
    >
      {/* Two Separate Page Boxes */}
      <div className="flex items-start gap-4" style={{ height: `${pageHeight}px` }}>
        {/* Left Page Box */}
        <PageBox
          pageNumber={leftPage}
          pageWidth={pageWidth}
          isLeft={true}
          isFlipping={isFlipping && flipDirection === 'backward'}
          flipDirection={isFlipping && flipDirection === 'backward' ? flipDirection : null}
          nextPageNumber={getLeftPageForFlip()}
          position={position}
          scale={scale}
          onMouseDown={handleMouseDown}
          onWheel={handleWheel}
          onReset={handleReset}
        />

        {/* Right Page Box */}
        {(rightPage || showRightPageForFlip) && (
          <PageBox
            pageNumber={rightPage || (showRightPageForFlip ? 2 : null)}
            pageWidth={pageWidth}
            isLeft={false}
            isFlipping={isFlipping && flipDirection === 'forward'}
            flipDirection={isFlipping && flipDirection === 'forward' ? flipDirection : null}
            nextPageNumber={getRightPageForFlip()}
            position={position}
            scale={scale}
            onMouseDown={handleMouseDown}
            onWheel={handleWheel}
            onReset={handleReset}
          />
        )}
      </div>

      {/* Navigation Click Areas */}
      {currentPage > 1 && (
        <button
          onClick={handlePrev}
          onMouseEnter={() => setHoveredSide('left')}
          onMouseLeave={() => setHoveredSide(null)}
          className="absolute left-0 top-0 bottom-0 w-32 hover:bg-white/5 transition-colors cursor-pointer z-10"
          aria-label="Previous pages"
          disabled={isFlipping}
        >
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

    </div>
  );
};

export default PageSpread;
