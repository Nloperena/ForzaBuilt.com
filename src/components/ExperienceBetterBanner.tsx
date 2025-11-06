import React, { useEffect, useRef, useState } from 'react';

const ExperienceBetterBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState('clamp(2rem, 5vw, 8rem)');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateFontSize = () => {
      if (containerRef.current && textRef.current) {
        // Get the actual container width (should be 100vw)
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
          animation: fadeInSlideUp 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          opacity: 0;
        }
        
        .performance-word.visible {
          opacity: 1;
        }
        
        .elevated-word {
          animation: fadeInSlideUp 1.2s cubic-bezier(0.19, 1, 0.22, 1) 0.15s forwards;
          opacity: 0;
        }
        
        .elevated-word.visible {
          opacity: 1;
        }
      `}</style>
      <div className="bg-white py-8 md:py-12 relative w-full" style={{ overflow: 'visible', zIndex: 5 }}>
        <div className="w-full h-full flex items-center" style={{ paddingLeft: 0, paddingRight: 0, width: '100vw', overflow: 'visible' }}>
          <div
            ref={containerRef}
            className={`flex items-center performance-elevated-container ${isVisible ? 'visible' : ''}`}
            style={{ 
              width: '100vw',
              paddingLeft: '1vw',
              paddingRight: '1vw',
              boxSizing: 'border-box',
              height: 'fit-content',
              justifyContent: 'flex-start',
              position: 'relative',
              overflow: 'visible'
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
                minWidth: 0
              }}
            >
              <span
                className={`text-[#2c476e] font-poppins font-bold leading-[1] inline-block performance-word ${isVisible ? 'visible' : ''}`}
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
                className={`text-[#F2611D] font-poppins font-bold leading-[1] inline-block elevated-word ${isVisible ? 'visible' : ''}`}
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
