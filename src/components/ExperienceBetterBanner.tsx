import React, { useEffect, useRef, useState } from 'react';

const ExperienceBetterBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const performanceRef = useRef<HTMLSpanElement>(null);
  const elevatedRef = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

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
