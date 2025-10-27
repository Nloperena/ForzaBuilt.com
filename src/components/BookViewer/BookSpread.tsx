import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookPage from './BookPage';

interface BookSpreadProps {
  leftPage: number;
  rightPage: number | null;
  numPages: number;
  onPageChange: (newPage: number) => void;
  bookColor: string;
  zoom: number;
  triggerFlip: 'forward' | 'backward' | null;
  showSkeletons: boolean;
}

const BookSpread: React.FC<BookSpreadProps> = ({
  leftPage,
  rightPage,
  numPages,
  onPageChange,
  bookColor,
  zoom,
  triggerFlip,
  showSkeletons,
}) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'forward' | 'backward'>('forward');
  const [hoveredZone, setHoveredZone] = useState<'left' | 'right' | null>(null);
  const [flippingPageContent, setFlippingPageContent] = useState<number | null>(null);
  const [targetPages, setTargetPages] = useState<{ left: number; right: number | null } | null>(null);

  // Listen for external flip triggers
  useEffect(() => {
    if (triggerFlip && !isFlipping) {
      if (triggerFlip === 'forward' && rightPage && rightPage < numPages) {
        handleFlip('forward');
      } else if (triggerFlip === 'backward' && leftPage > 1) {
        handleFlip('backward');
      }
    }
  }, [triggerFlip, isFlipping, rightPage, numPages, leftPage]);

  // Calculate responsive page dimensions with zoom
  const basePageWidth = typeof window !== 'undefined' 
    ? Math.min(window.innerWidth * 0.35, 500) 
    : 400;
  const pageWidth = basePageWidth * zoom;

  const handleFlip = (direction: 'forward' | 'backward') => {
    if (isFlipping) return;

    if (direction === 'forward' && rightPage && rightPage < numPages) {
      // Calculate target pages for forward flip
      const nextLeft = rightPage + 1;
      const nextRight = nextLeft + 1 <= numPages ? nextLeft + 1 : null;
      
      setFlippingPageContent(rightPage);
      setTargetPages({ left: nextLeft, right: nextRight });
      setFlipDirection('forward');
      setIsFlipping(true);
      
      // Complete flip and update pages after animation
      setTimeout(() => {
        onPageChange(nextLeft);
        setIsFlipping(false);
        setFlippingPageContent(null);
        setTargetPages(null);
      }, 600);
    } else if (direction === 'backward' && leftPage > 1) {
      // Calculate target pages for backward flip
      const prevRight = leftPage - 1;
      const prevLeft = prevRight - 1 >= 1 ? prevRight - 1 : 1;
      
      setFlippingPageContent(leftPage);
      setTargetPages({ left: prevLeft, right: prevRight });
      setFlipDirection('backward');
      setIsFlipping(true);
      
      // Complete flip and update pages after animation
      setTimeout(() => {
        onPageChange(prevLeft);
        setIsFlipping(false);
        setFlippingPageContent(null);
        setTargetPages(null);
      }, 600);
    }
  };

  const handleClick = (zone: 'left' | 'right') => {
    if (zone === 'right') {
      handleFlip('forward');
    } else if (zone === 'left') {
      handleFlip('backward');
    }
  };

  // Calculate pages to preload (4 spreads = 8 pages ahead and behind)
  const pagesToPreload = [];
  for (let i = leftPage - 8; i <= leftPage + 12; i++) {
    if (i >= 1 && i <= numPages && i !== leftPage && i !== rightPage) {
      pagesToPreload.push(i);
    }
  }

  return (
    <>
      {/* Hidden preloaded pages - no skeleton needed as they're offscreen */}
      <div className="hidden">
        {pagesToPreload.map(pageNum => (
          <BookPage key={`preload-${pageNum}`} pageNumber={pageNum} width={pageWidth} showSkeleton={false} />
        ))}
      </div>

      <div 
        className="relative flex items-center justify-center transition-all duration-500 ease-out"
        style={{ 
          perspective: '2500px',
          transform: `scale(${zoom})`,
          transformOrigin: 'center center',
        }}
      >
        {/* Book Container */}
        <div className="relative flex shadow-2xl rounded-lg overflow-visible bg-white transition-all duration-300">
          {/* Left Page - static, wider if it's the only page */}
          <div
            className="relative cursor-pointer overflow-hidden"
            style={{
              width: rightPage ? pageWidth : pageWidth * 1.5,
              transformStyle: 'preserve-3d',
            }}
            onMouseEnter={() => setHoveredZone('left')}
            onMouseLeave={() => setHoveredZone(null)}
            onClick={() => handleClick('left')}
          >
            <BookPage 
              pageNumber={leftPage} 
              width={rightPage ? pageWidth : pageWidth * 1.5}
              showSkeleton={showSkeletons}
            />
            
            {/* Corner curl hint on hover */}
            {hoveredZone === 'left' && leftPage > 1 && !isFlipping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-0 left-0 w-16 h-16 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.15) 0%, transparent 100%)',
                }}
              />
            )}
          </div>

          {/* Central Spine/Binding - only show if there's a right page */}
          {rightPage && (
            <div 
              className="w-4 relative shrink-0"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.25), rgba(0,0,0,0.15), rgba(0,0,0,0.25))',
                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.4)',
              }}
            />
          )}

          {/* Right Page Container - handles flipping or static display */}
          {rightPage && (
            <div className="relative overflow-visible" style={{ width: pageWidth, height: pageWidth * 1.4 }}>
              {/* Static underlying page (visible when not flipping or as target) */}
              {!isFlipping && (
                <div
                  className="relative cursor-pointer h-full overflow-hidden"
                  style={{
                    width: pageWidth,
                    transformStyle: 'preserve-3d',
                  }}
                  onMouseEnter={() => setHoveredZone('right')}
                  onMouseLeave={() => setHoveredZone(null)}
                  onClick={() => handleClick('right')}
                >
                  <BookPage pageNumber={rightPage} width={pageWidth} showSkeleton={showSkeletons} />
                  
                  {/* Corner curl hint on hover */}
                  {hoveredZone === 'right' && rightPage < numPages && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
                      style={{
                        background: 'linear-gradient(225deg, rgba(0,0,0,0.15) 0%, transparent 100%)',
                      }}
                    />
                  )}
                </div>
              )}

              {/* Flipping Page Animation */}
              {isFlipping && flippingPageContent && targetPages && (
                <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
                  {flipDirection === 'forward' ? (
                    // Forward flip: right page flips left
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        transformStyle: 'preserve-3d',
                        transformOrigin: 'left center',
                      }}
                      initial={{ rotateY: 0 }}
                      animate={{ rotateY: -180 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.43, 0.13, 0.23, 0.96],
                      }}
                    >
                      {/* Front of flipping page (current content) - visible 0° to 90° */}
                      <div
                        className="absolute inset-0 overflow-hidden rounded-r-lg"
                        style={{
                          backfaceVisibility: 'hidden',
                        }}
                      >
                        <BookPage pageNumber={flippingPageContent} width={pageWidth} />
                      </div>
                      
                      {/* Back of flipping page (next left page) - visible 90° to 180° */}
                      <div
                        className="absolute inset-0 overflow-hidden rounded-l-lg"
                        style={{
                          transform: 'rotateY(180deg)',
                          backfaceVisibility: 'hidden',
                        }}
                      >
                        <BookPage pageNumber={targetPages.left} width={pageWidth} showSkeleton={false} />
                      </div>
                    </motion.div>
                  ) : (
                    // Backward flip: left page flips right
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        transformStyle: 'preserve-3d',
                        transformOrigin: 'right center',
                        transform: 'rotateY(-180deg)',
                      }}
                      initial={{ rotateY: -180 }}
                      animate={{ rotateY: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.43, 0.13, 0.23, 0.96],
                      }}
                    >
                      {/* Front of flipping page (previous right page) - visible during flip */}
                      <div
                        className="absolute inset-0 overflow-hidden rounded-l-lg"
                        style={{
                          transform: 'rotateY(180deg)',
                          backfaceVisibility: 'hidden',
                        }}
                      >
                        <BookPage pageNumber={targetPages.right || targetPages.left} width={pageWidth} showSkeleton={false} />
                      </div>
                      
                      {/* Back of flipping page (current left page) - visible at start */}
                      <div
                        className="absolute inset-0 overflow-hidden rounded-r-lg"
                        style={{
                          backfaceVisibility: 'hidden',
                        }}
                      >
                        <BookPage pageNumber={flippingPageContent} width={pageWidth} />
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Static target page underneath (visible after flip completes) */}
                  <div className="absolute inset-0 -z-10">
                    <BookPage 
                      pageNumber={flipDirection === 'forward' ? targetPages.right || targetPages.left : rightPage} 
                      width={pageWidth}
                      showSkeleton={false}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Shadow under book */}
        <div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] h-12 rounded-full opacity-40 blur-2xl pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)',
          }}
        />
      </div>
    </>
  );
};

export default BookSpread;
