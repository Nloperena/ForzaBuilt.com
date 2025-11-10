import React, { useEffect, useRef, useState } from 'react';

const ExperienceBetterBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Performance. Elevated.';
  const typingSpeed = 100; // milliseconds per character

  useEffect(() => {
    // Intersection Observer for scroll-triggered animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
            // Reset when leaving viewport so it can re-animate when entering again
            setDisplayedText('');
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
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!isInView) {
      setDisplayedText('');
      return;
    }

    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, typingSpeed);

    return () => {
      clearInterval(typeInterval);
    };
  }, [isInView, fullText]);

  // Split the displayed text into "Performance." and "Elevated." parts
  const performanceText = displayedText.substring(0, 13); // "Performance."
  const elevatedText = displayedText.length > 13 ? displayedText.substring(13) : '';

  return (
    <>
      <style>{`
        .performance-elevated-container {
          opacity: 1;
          transition: opacity 0.3s ease-out;
        }
        
        .performance-elevated-text {
          opacity: 1;
        }
      `}</style>
      <div className="bg-white py-8 md:py-12 relative w-full overflow-x-hidden" style={{ zIndex: 5 }}>
        <div className="w-full h-full flex items-center justify-center overflow-x-hidden">
          <div
            ref={containerRef}
            className="flex items-center justify-center performance-elevated-container"
            style={{ 
              width: '100%',
              paddingLeft: '1vw',
              paddingRight: '1vw',
              boxSizing: 'border-box',
              height: 'fit-content',
              position: 'relative',
              maxWidth: '100%'
            }}
          >
            <div
              ref={textRef}
              className="performance-elevated-text text-fluid-display"
              style={{
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                minWidth: 0,
                maxWidth: '100%',
                overflow: 'hidden'
              }}
            >
              {/* Invisible full text placeholder - reserves space to prevent container resize */}
              <span
                className="text-[#2c476e] font-poppins font-bold leading-[1] inline-block"
                style={{
                  fontSize: '1em',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  flexShrink: 0,
                  opacity: 0,
                  pointerEvents: 'none',
                  position: 'relative',
                  width: '100%',
                  height: 'auto'
                }}
              >
                Performance. Elevated.
              </span>

              {/* Visible animated text layers - absolutely positioned to overlay placeholder */}
              <div
                style={{
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%'
                }}
              >
                <span
                  className="text-[#2c476e] font-poppins font-bold leading-[1] inline-block"
                  style={{
                    fontSize: '1em',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    flexShrink: 0
                  }}
                >
                  {performanceText}
                </span>
                {elevatedText && (
                  <span
                    className="text-[#F2611D] font-poppins font-bold leading-[1] inline-block"
                    style={{
                      fontSize: '1em',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                      marginLeft: '0.15em',
                      flexShrink: 0
                    }}
                  >
                    {elevatedText}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperienceBetterBanner;
