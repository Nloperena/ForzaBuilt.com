import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';

interface XRayWipeProps {
  beforeSrc: string;
  afterContent: React.ReactNode;
  altBefore?: string;
  height?: number;
  wipeDirection?: 'ltr' | 'rtl' | 'ttb' | 'btt';
  className?: string;
  onProgressChange?: (progress: number) => void;
}

const XRayWipe: React.FC<XRayWipeProps> = ({
  beforeSrc,
  afterContent,
  altBefore = "Before image",
  height = 600,
  wipeDirection = 'ltr',
  className = '',
  onProgressChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  
  // Track scroll progress for this specific element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Create smooth wipe progress based on scroll - extend to 460% to accommodate all product selections
  const wipeProgress = useTransform(scrollYProgress, [0, 0.998], [0, 460]);
  
  // Track the current wipe progress value
  const currentProgress = useMotionValue(0);
  
  // Effect to monitor animation progress and control scroll behavior
  useEffect(() => {
    const unsubscribe = wipeProgress.on('change', (value) => {
      currentProgress.set(value);
      
      // Call the progress callback if provided
      if (onProgressChange) {
        onProgressChange(value);
      }
      
      // Mark animation as complete when it reaches 100% (but allow scrolling to continue to 150%)
      if (value >= 100 && !isAnimationComplete) {
        setIsAnimationComplete(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [wipeProgress, currentProgress, isAnimationComplete, onProgressChange]);

  // Effect to control scroll behavior
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Get the container's position
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerTop = rect.top;
      const containerBottom = rect.bottom;
      const viewportHeight = window.innerHeight;

      // If we're in the animation zone
      if (containerTop < viewportHeight && containerBottom > 0) {
        // Calculate the scroll range based on the actual sticky behavior
        const scrollRange = height * 14; // Extended range to cover all product selections
        const currentScroll = window.scrollY;
        const containerStart = container.offsetTop - viewportHeight / 2;
        const containerEnd = containerStart + scrollRange;

        // If we're at the end of the extended animation range and trying to scroll down
        if (currentScroll >= containerEnd && e.deltaY > 0) {
          e.preventDefault();
          return;
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerTop = rect.top;
      const containerBottom = rect.bottom;
      const viewportHeight = window.innerHeight;

      if (containerTop < viewportHeight && containerBottom > 0) {
        const scrollRange = height * 14; // Extended range to cover all product selections
        const currentScroll = window.scrollY;
        const containerStart = container.offsetTop - viewportHeight / 2;
        const containerEnd = containerStart + scrollRange;

        // Prevent arrow keys and space from scrolling past animation
        if (currentScroll >= containerEnd && 
            (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ')) {
          e.preventDefault();
          return;
        }
      }
    };

    // Add event listeners
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [height]);

  // Calculate clip path based on wipe direction
  const getClipPath = (progress: number) => {
    // Add feathering effect with a gradient transition zone
    const featherZone = 15; // Percentage of feathering
    const featherStart = Math.max(0, progress - featherZone);
    const featherEnd = Math.min(100, progress + featherZone);
    
    switch (wipeDirection) {
      case 'ltr':
        return `inset(0 ${100 - progress}% 0 0)`;
      case 'rtl':
        return `inset(0 0 0 ${100 - progress}%)`;
      case 'ttb':
        return `inset(0 0 ${100 - progress}% 0)`;
      case 'btt':
        // Create a more feathered bottom-to-top wipe
        return `inset(${100 - progress}% 0 0 0)`;
      default:
        return `inset(0 ${100 - progress}% 0 0)`;
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height: `${height * 14}px` }} // Extended height to accommodate all product selections
    >
      {/* Sticky container that holds the images */}
      <div 
        className="sticky w-full overflow-hidden rounded-lg"
        style={{ 
          height: `${height}px`,
          top: '60%',
          transform: 'translateY(-50%)',
          position: 'sticky',
          zIndex: 10
        }}
      >
        {/* Before image (background layer) */}
        <div className="absolute inset-0">
          <img
            src={beforeSrc}
            alt={altBefore}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* After image (overlay layer with clip mask) */}
        <motion.div
          className="absolute inset-0"
          style={{
            clipPath: useTransform(wipeProgress, (value) => getClipPath(value))
          }}
        >
          {afterContent}
          {/* Feathered edge overlay for bottom-to-top wipe */}
          {wipeDirection === 'btt' && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: useTransform(wipeProgress, (value) => {
                  const revealPoint = 100 - value;
                  const featherStart = Math.max(0, revealPoint - 8);
                  const featherEnd = Math.min(100, revealPoint + 2);
                  return `linear-gradient(to bottom, 
                    transparent 0%, 
                    transparent ${featherStart}%, 
                    rgba(255,255,255,0.1) ${Math.max(0, revealPoint - 4)}%, 
                    rgba(255,255,255,0.3) ${Math.max(0, revealPoint - 2)}%, 
                    rgba(255,255,255,0.6) ${revealPoint}%, 
                    transparent ${featherEnd}%, 
                    transparent 100%)`;
                })
              }}
            />
          )}
        </motion.div>

        {/* Progress indicator */}
        <motion.div 
          className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span>
            {useTransform(wipeProgress, (value) => `${Math.round(value)}%`)}
          </motion.span>
        </motion.div>

        {/* Scroll instruction */}
        <motion.div 
          className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
          style={{
            opacity: useTransform(wipeProgress, [0, 90, 100, 340], [1, 0.5, 0, 0])
          }}
        >
          {isAnimationComplete ? 'Complete!' : 'Scroll to reveal'}
        </motion.div>

        {/* Wipe direction indicator */}
        {wipeDirection === 'ltr' && (
          <motion.div
            className="absolute top-1/2 left-0 w-1 bg-white/80 shadow-lg"
            style={{
              height: '60%',
              transformOrigin: 'center',
              x: useTransform(wipeProgress, [0, 100], ['0%', '100vw'])
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}

        {wipeDirection === 'rtl' && (
          <motion.div
            className="absolute top-1/2 right-0 w-1 bg-white/80 shadow-lg"
            style={{
              height: '60%',
              transformOrigin: 'center',
              x: useTransform(wipeProgress, [0, 100], ['0%', '-100vw'])
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
          Before
        </div>
        
        <motion.div 
          className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
          style={{
            opacity: useTransform(wipeProgress, [0, 20, 80, 100], [0, 0, 1, 1])
          }}
        >
          After
        </motion.div>
      </div>

      {/* Progress bar for SVG selections - fixed at bottom of viewport */}
      <motion.div 
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-96 h-3 bg-gray-200/80 backdrop-blur-sm rounded-full overflow-hidden z-50"
        style={{
          opacity: useTransform(wipeProgress, [0, 50, 100, 440, 460], [0, 1, 1, 1, 0])
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        {/* Progress fill */}
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-orange-500 rounded-full transition-all duration-300"
          style={{
            width: useTransform(wipeProgress, [100, 460], ['0%', '100%'])
          }}
        />
        
        {/* Progress text */}
        <motion.div 
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm whitespace-nowrap"
          style={{
            opacity: useTransform(wipeProgress, [100, 120, 440, 460], [0, 1, 1, 0])
          }}
        >
          <motion.span>
            {useTransform(wipeProgress, (value) => {
              if (value < 100) return 'X-Ray Complete';
              const selectionProgress = ((value - 100) / 360) * 100;
              return `Product Selection: ${Math.round(selectionProgress)}%`;
            })}
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default XRayWipe; 