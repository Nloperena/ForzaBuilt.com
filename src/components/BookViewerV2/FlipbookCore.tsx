import React, { useRef, useEffect, useState, useCallback } from 'react';
import { PageFlip } from 'page-flip';
import { Page } from 'react-pdf';

interface FlipbookCoreProps {
  numPages: number;
  onZoomRequest: () => void;
  onPageChange?: (page: number) => void;
  bookColor?: string;
}

const FlipbookCore: React.FC<FlipbookCoreProps> = ({
  numPages,
  onZoomRequest,
  onPageChange,
  bookColor = '#2c476e',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<PageFlip | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageWidth, setPageWidth] = useState(500);
  const [isInitialized, setIsInitialized] = useState(false);
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [isRenderingPages, setIsRenderingPages] = useState(true);

  // Calculate responsive page dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      // Calculate page width based on container (accounting for 2-page spread)
      const maxPageWidth = Math.min(
        containerWidth / 2.2, // Leave some margin for spread
        containerHeight / 1.5, // Maintain aspect ratio
        600 // Max width
      );
      
      setPageWidth(Math.max(300, maxPageWidth));
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Extract canvas and convert to image after page renders
  const extractCanvasImage = useCallback((pageNumber: number) => {
    // Find the canvas for this page number
    const pageElement = document.querySelector(`[data-page-number="${pageNumber}"]`);
    if (!pageElement) {
      console.warn(`Could not find page element for page ${pageNumber}`);
      return;
    }
    
    const canvas = pageElement.querySelector('canvas');
    if (!canvas) {
      console.warn(`Could not find canvas for page ${pageNumber}`);
      return;
    }
    
    try {
      const imageUrl = canvas.toDataURL('image/png');
      console.log(`Extracted page ${pageNumber} as image, length: ${imageUrl.length}`);
      setPageImages(prev => {
        const newImages = [...prev];
        newImages[pageNumber - 1] = imageUrl;
        return newImages;
      });
    } catch (error) {
      console.error(`Error converting page ${pageNumber} to image:`, error);
    }
  }, []);

  // Initialize page-flip once all pages are rendered
  useEffect(() => {
    if (!containerRef.current || numPages === 0 || isInitialized || pageImages.length < numPages) {
      return;
    }

    setIsRenderingPages(false);

    try {
      const pageFlipInstance = new PageFlip(containerRef.current, {
        width: pageWidth,
        height: pageWidth * 1.414, // A4 aspect ratio
        size: 'stretch',
        minWidth: 315,
        maxWidth: 1000,
        minHeight: 445,
        maxHeight: 1414,
        maxShadowOpacity: 0.5,
        showCover: true,
        mobileScrollSupport: true,
        swipeDistance: 30,
        clickEventForward: true,
        useMouseEvents: true,
        flippingTime: 700,
        usePortrait: false,
        startZIndex: 0,
        autoSize: true,
        maxTextureSize: 2048,
        drawShadow: true,
      });

      pageFlipRef.current = pageFlipInstance;

      // Load from images
      pageFlipInstance.loadFromImages(pageImages);

      // Event listeners
      pageFlipInstance.on('flip', (e: any) => {
        const newPage = e.data;
        setCurrentPage(newPage);
        onPageChange?.(newPage + 1); // Convert to 1-based for external use
      });

      pageFlipInstance.on('changeOrientation', () => {
        pageFlipInstance.updateState();
      });

      console.log('PageFlip initialized successfully with', numPages, 'pages using images');
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to initialize PageFlip:', error);
    }

    return () => {
      if (pageFlipRef.current) {
        try {
          pageFlipRef.current.destroy();
        } catch (error) {
          console.error('Error destroying PageFlip:', error);
        }
      }
    };
  }, [numPages, pageWidth, isInitialized, pageImages, onPageChange]);

  // Handle external page navigation
  const flipToPage = useCallback((page: number) => {
    if (pageFlipRef.current) {
      try {
        pageFlipRef.current.flip(page);
      } catch (error) {
        console.error('Error flipping to page:', error);
      }
    }
  }, []);

  // Expose flip methods via callback
  useEffect(() => {
    if (isInitialized && pageFlipRef.current) {
      // Store methods for external access if needed
      (window as any).__flipbookAPI = {
        flipNext: () => pageFlipRef.current?.flipNext(),
        flipPrev: () => pageFlipRef.current?.flipPrev(),
        flipToPage: (page: number) => flipToPage(page),
        getCurrentPage: () => currentPage + 1, // 1-based
      };
    }

    return () => {
      delete (window as any).__flipbookAPI;
    };
  }, [isInitialized, currentPage, flipToPage]);

  return (
    <div className="flex-1 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Hidden PDF pages for rendering to canvas */}
      {isRenderingPages && (
        <div className="absolute" style={{ left: '-9999px', top: '-9999px' }}>
          {Array.from({ length: numPages }).map((_, index) => {
            const pageNumber = index + 1;
            return (
              <Page
                key={`pdf-page-${pageNumber}`}
                pageNumber={pageNumber}
                width={pageWidth}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                onRenderSuccess={() => {
                  console.log(`Page ${pageNumber} rendered successfully`);
                  // Wait a tiny bit for canvas to be fully rendered
                  setTimeout(() => extractCanvasImage(pageNumber), 100);
                }}
                onRenderError={(error) => {
                  console.error(`Page ${pageNumber} render error:`, error);
                }}
              />
            );
          })}
        </div>
      )}

      {/* PageFlip container */}
      <div 
        ref={containerRef} 
        className="flipbook-container"
        style={{
          width: '100%',
          maxWidth: `${pageWidth * 2}px`,
          height: `${pageWidth * 1.414}px`,
        }}
      />

      {/* Loading indicator */}
      {isRenderingPages && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-lg font-poppins flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <div>Preparing pages... {pageImages.length}/{numPages}</div>
          </div>
        </div>
      )}

      {/* Zoom hint button - only show when initialized */}
      {isInitialized && (
        <button
          onClick={onZoomRequest}
          className="absolute bottom-24 right-8 px-4 py-2 bg-[#2c476e] text-white rounded-lg shadow-lg hover:bg-[#1e3050] transition-colors flex items-center gap-2 z-10"
          title="Zoom to read"
        >
          <svg
            className="h-5 w-5"
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
          <span className="text-sm font-poppins">Zoom to Read</span>
        </button>
      )}
    </div>
  );
};

export default FlipbookCore;
