import React, { useEffect, useRef, useState } from 'react';

const ExperienceBetterBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const performanceRef = useRef<HTMLSpanElement>(null);
  const elevatedRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState('clamp(2rem, 5vw, 8rem)');
  const [isInView, setIsInView] = useState(false);

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
            setIsInView(true);
            // Recalculate font size after entering view
            setTimeout(() => {
              updateFontSize();
            }, 100);
          } else {
            setIsInView(false);
            // Reset when leaving viewport so it can re-animate when entering again
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
      
      // Check if already in view on mount
      const rect = containerRef.current.getBoundingClientRect();
      const isInViewOnMount = rect.top < window.innerHeight && rect.bottom > 0;
      if (isInViewOnMount) {
        setIsInView(true);
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
        .performance-elevated-container {
          opacity: 1;
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }
        
        .performance-elevated-text {
          opacity: 1;
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }
        
        .performance-word {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 1.2s cubic-bezier(0.19, 1, 0.22, 1), transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .performance-word.entering {
          opacity: 1;
          transform: translateY(150px);
        }
        
        .performance-word.entered {
          opacity: 1;
          transform: translateY(0);
        }
        
        .elevated-word {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.5s, transform 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.5s;
        }
        
        .elevated-word.entering {
          opacity: 1;
          transform: translateY(150px);
        }
        
        .elevated-word.entered {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      <div className="bg-white py-8 md:py-12 relative w-full overflow-x-hidden" style={{ zIndex: 5 }}>
        <div className="w-full h-full flex items-center overflow-x-hidden">
          <div
            ref={containerRef}
            className="flex items-center performance-elevated-container"
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
              className="performance-elevated-text"
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
                className={`text-[#2c476e] font-poppins font-bold leading-[1] inline-block performance-word ${isInView ? 'entered' : 'entering'}`}
                style={{
                  fontSize: '1em',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  flexShrink: 0
                }}
              >
                Performance.
              </span>
              <span
                ref={elevatedRef}
                className={`text-[#F2611D] font-poppins font-bold leading-[1] inline-block elevated-word ${isInView ? 'entered' : 'entering'}`}
                style={{
                  fontSize: '1em',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  marginLeft: '0.15em',
                  flexShrink: 0
                }}
              >
                Elevated.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperienceBetterBanner;
