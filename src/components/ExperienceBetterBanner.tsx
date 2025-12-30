import React, { useEffect, useRef, useState } from 'react';
import { getFontSizeValue } from '@/styles/typography';

interface ExperienceBetterBannerProps {
  textColor?: string;
  highlightColor?: string;
}

const ExperienceBetterBanner = ({ textColor = '#1B3764', highlightColor = '#F2611D' }: ExperienceBetterBannerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const [isInView, setIsInView] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [fadeOut, setFadeOut] = useState(false);
  const fullText = 'Performance. Elevated.';
  const typingSpeed = 50; // milliseconds per character
  const holdTimeAfterTyping = 2000; // 2 seconds - hold time after text is fully typed
  const fadeOutDuration = 800; // fade out duration in ms
  const delayBetweenCycles = 500; // delay before restarting cycle

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
            setDisplayedText('');
            setFadeOut(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Animation cycle: type character by character -> hold -> fade out all at once -> repeat
  useEffect(() => {
    if (!isInView) {
      // Clear all timeouts
      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current = [];
      setDisplayedText('');
      setFadeOut(false);
      return;
    }

    const runAnimationCycle = () => {
      // Reset states
      setFadeOut(false);
      setDisplayedText('');
      
      // Step 1: Type character by character
      for (let i = 0; i <= fullText.length; i++) {
        const timeout = setTimeout(() => {
          setDisplayedText(fullText.substring(0, i));
          
          // Step 2: After typing completes, hold then fade out
          if (i === fullText.length) {
            const holdTimeout = setTimeout(() => {
              // Step 3: Trigger fade out
              setFadeOut(true);
              
              // Step 4: After fade completes, reset and restart
              const restartTimeout = setTimeout(() => {
                runAnimationCycle();
              }, fadeOutDuration + delayBetweenCycles);
              
              timeoutRefs.current.push(restartTimeout);
            }, holdTimeAfterTyping);
            
            timeoutRefs.current.push(holdTimeout);
        }
        }, i * typingSpeed);
        
        timeoutRefs.current.push(timeout);
      }
    };

    // Start animation
    runAnimationCycle();

    return () => {
      // Cleanup all timeouts
      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current = [];
    };
  }, [isInView]);

  // Split the displayed text into "Performance." and "Elevated." parts
  const performanceText = displayedText.substring(0, 13); // "Performance."
  const elevatedText = displayedText.length > 13 ? displayedText.substring(13) : '';

  return (
    <>
      <style>{`
        .performance-elevated-text {
          opacity: 1;
          transition: opacity ${fadeOutDuration}ms ease-out;
        }
        
        .performance-elevated-text.fade-out {
          opacity: 0;
        }
      `}</style>
      <div className="bg-transparent py-6 md:py-16 lg:py-20 relative w-full overflow-x-hidden" style={{ zIndex: 5, overflowX: 'hidden' }}>
        <div className="w-full h-full flex items-center justify-center overflow-x-hidden" style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
          <div
            ref={containerRef}
            className="flex items-center justify-center"
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
              className={`performance-elevated-text ${fadeOut ? 'fade-out' : ''}`}
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
                className="font-poppins font-bold leading-[1]"
                style={{
                  fontSize: getFontSizeValue('bannerText'),
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  opacity: 0,
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                  width: '100%',
                  textAlign: 'center',
                  color: textColor
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
                  className="font-poppins font-bold leading-[1]"
                  style={{
                    fontSize: getFontSizeValue('bannerText'),
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                    color: textColor
                  }}
                >
                  {performanceText}
                </span>
                {elevatedText && (
                  <span
                    className="font-poppins font-bold leading-[1]"
                    style={{
                      fontSize: getFontSizeValue('bannerText'),
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                      marginLeft: '0.15em',
                      whiteSpace: 'nowrap',
                      color: highlightColor
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
