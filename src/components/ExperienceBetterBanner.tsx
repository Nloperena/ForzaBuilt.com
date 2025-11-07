import React, { useEffect, useRef, useState } from 'react';

const ExperienceBetterBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const performanceRef = useRef<HTMLSpanElement>(null);
  const elevatedRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState('clamp(2rem, 5vw, 8rem)');
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const updateFontSize = () => {
      if (containerRef.current && textRef.current) {
        // Get the actual container width
        const containerWidth = containerRef.current.offsetWidth || window.innerWidth;
        if (containerWidth === 0) return;
        
        // Reserve space for breathing room (1% on each side for balance)
        const sidePadding = containerWidth * 0.01;
        const availableWidth = containerWidth - (sidePadding * 2);
        
        // Temporarily set a large font size to measure the full text width
        const tempFontSize = '200px';
        const originalFontSize = textRef.current.style.fontSize;
        textRef.current.style.fontSize = tempFontSize;
        
        // Force a reflow to ensure accurate measurement
        void textRef.current.offsetWidth;
        
        // Measure the full width including both words and spacing
        const textWidth = textRef.current.scrollWidth;
        
        if (textWidth > 0 && availableWidth > 0) {
          // Calculate the font size needed to fit with breathing room
          const ratio = availableWidth / textWidth;
          const calculatedSize = 200 * ratio;
          setFontSize(`${calculatedSize}px`);
        }
        
        // Restore original font size temporarily (will be overridden by state)
        textRef.current.style.fontSize = originalFontSize;
      }
    };

    // Intersection Observer for scroll-triggered animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setIsAnimating(true);
            
            // Restart animations by removing and re-adding animation class
            if (performanceRef.current && elevatedRef.current) {
              // Remove animating class first
              performanceRef.current.classList.remove('animating');
              elevatedRef.current.classList.remove('animating');
              
              // Force reflow
              void performanceRef.current.offsetWidth;
              void elevatedRef.current.offsetWidth;
              
              // Re-add animating class to restart animation
              setTimeout(() => {
                if (performanceRef.current) {
                  performanceRef.current.classList.add('animating');
                }
                if (elevatedRef.current) {
                  elevatedRef.current.classList.add('animating');
                }
              }, 10);
            }
            
            // Recalculate font size after animation starts
            setTimeout(() => {
              updateFontSize();
            }, 100);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
      
      // Check if already in view on mount
      const rect = containerRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      if (isInView) {
        setIsVisible(true);
        setIsAnimating(true);
        // Trigger animation after a brief delay
        setTimeout(() => {
          if (performanceRef.current && elevatedRef.current) {
            performanceRef.current.classList.remove('animating');
            elevatedRef.current.classList.remove('animating');
            void performanceRef.current.offsetWidth;
            void elevatedRef.current.offsetWidth;
            setTimeout(() => {
              if (performanceRef.current) {
                performanceRef.current.classList.add('animating');
              }
              if (elevatedRef.current) {
                elevatedRef.current.classList.add('animating');
              }
            }, 10);
          }
        }, 100);
      }
    }

    // Initial calculation
    const timeoutId1 = setTimeout(() => {
      updateFontSize();
    }, 100);
    
    const timeoutId2 = setTimeout(() => {
      updateFontSize();
    }, 300);

    // Resize observer for font size updates
    const resizeObserver = new ResizeObserver(() => {
      updateFontSize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', updateFontSize);
    
    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateFontSize);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeInSlideUp {
          from {
            opacity: 0;
            transform: translateY(150px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .performance-elevated-container {
          animation: fadeInSlideUp 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          opacity: 0;
        }
        
        .performance-elevated-container.visible {
          opacity: 1;
        }
        
        .performance-elevated-text {
          animation: fadeInSlideUp 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.1s forwards;
          opacity: 0;
        }
        
        .performance-elevated-text.visible {
          opacity: 1;
        }
        
        .performance-word {
          opacity: 1;
        }
        
        .performance-word.animating {
          animation: fadeInSlideUp 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          opacity: 0;
        }
        
        .elevated-word {
          opacity: 1;
        }
        
        .elevated-word.animating {
          animation: fadeInSlideUp 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.5s forwards;
          opacity: 0;
        }
      `}</style>
      <div className="bg-white py-8 md:py-12 relative w-full overflow-x-hidden" style={{ zIndex: 5 }}>
        <div className="w-full h-full flex items-center overflow-x-hidden">
          <div
            ref={containerRef}
            className={`flex items-center performance-elevated-container ${isVisible ? 'visible' : ''}`}
            style={{ 
              width: '100%',
              paddingLeft: '1vw',
              paddingRight: '1vw',
              boxSizing: 'border-box',
              height: 'fit-content',
              justifyContent: 'flex-start',
              position: 'relative',
              maxWidth: '100%'
            }}
          >
            <div
              ref={textRef}
              className={`performance-elevated-text ${isVisible ? 'visible' : ''}`}
              style={{
                fontSize: fontSize,
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                width: 'fit-content',
                minWidth: 0,
                maxWidth: '100%',
                overflow: 'hidden'
              }}
            >
              <span
                ref={performanceRef}
                className={`text-[#2c476e] font-poppins font-bold leading-[1] inline-block performance-word ${isVisible && isAnimating ? 'animating' : ''}`}
                style={{
                  fontSize: '1em',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  flexShrink: 0
                }}
              >
                Performance
              </span>
              <span
                ref={elevatedRef}
                className={`text-[#F2611D] font-poppins font-bold leading-[1] inline-block elevated-word ${isVisible && isAnimating ? 'animating' : ''}`}
                style={{
                  fontSize: '1em',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  marginLeft: '0.15em',
                  flexShrink: 0
                }}
              >
                Elevated
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperienceBetterBanner;
