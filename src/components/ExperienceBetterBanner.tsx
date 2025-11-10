import React, { useEffect, useRef, useState } from 'react';

const ExperienceBetterBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const typeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Performance. Elevated.';
  const typingSpeed = 100; // milliseconds per character (standard typewriter speed)

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
      if (typeIntervalRef.current) {
        clearInterval(typeIntervalRef.current);
        typeIntervalRef.current = null;
      }
      return;
    }

    // Add 1 second delay before starting typewriter effect
    const delayTimeout = setTimeout(() => {
      let currentIndex = 0;
      typeIntervalRef.current = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayedText(fullText.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          if (typeIntervalRef.current) {
            clearInterval(typeIntervalRef.current);
            typeIntervalRef.current = null;
          }
        }
      }, typingSpeed);
    }, 1000); // 1 second delay

    return () => {
      clearTimeout(delayTimeout);
      if (typeIntervalRef.current) {
        clearInterval(typeIntervalRef.current);
        typeIntervalRef.current = null;
      }
    };
  }, [isInView, fullText, typingSpeed]);

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
      <div className="bg-white py-8 md:py-12 relative w-full overflow-x-hidden" style={{ zIndex: 5, overflowX: 'hidden' }}>
        <div className="w-full h-full flex items-center justify-center overflow-x-hidden" style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
          <div
            ref={containerRef}
            className="flex items-center justify-center performance-elevated-container"
            style={{ 
              width: '100%',
              maxWidth: '100%',
              paddingLeft: 'clamp(1rem, 2vw, 2rem)',
              paddingRight: 'clamp(1rem, 2vw, 2rem)',
              boxSizing: 'border-box',
              height: 'fit-content',
              position: 'relative',
              overflowX: 'hidden'
            }}
          >
            <div
              ref={textRef}
              className="performance-elevated-text"
              style={{
                width: '100%',
                maxWidth: '100%',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Invisible full text placeholder - reserves space to prevent container resize */}
              <span
                className="text-[#2c476e] font-poppins font-bold leading-[1]"
                style={{
                  fontSize: 'clamp(1.25rem, 3.5vw + 0.5rem, 3rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  opacity: 0,
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                  width: '100%',
                  textAlign: 'center'
                }}
              >
                Performance. Elevated.
              </span>

              {/* Visible animated text layers - absolutely positioned to overlay placeholder */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  overflow: 'hidden'
                }}
              >
                <span
                  className="text-[#2c476e] font-poppins font-bold leading-[1]"
                  style={{
                    fontSize: 'clamp(1.25rem, 3.5vw + 0.5rem, 3rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {performanceText}
                </span>
                {elevatedText && (
                  <span
                    className="text-[#F2611D] font-poppins font-bold leading-[1]"
                    style={{
                      fontSize: 'clamp(1.25rem, 3.5vw + 0.5rem, 3rem)',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                      marginLeft: '0.15em',
                      whiteSpace: 'nowrap'
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
