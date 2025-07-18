import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';

interface ConstructionXRayProps {
  height?: number;
  wipeDirection?: 'ltr' | 'rtl' | 'ttb' | 'btt';
  className?: string;
  onProgressChange?: (progress: number) => void;
}

const ConstructionXRay: React.FC<ConstructionXRayProps> = ({
  height = 700,
  wipeDirection = 'btt',
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
        {/* Before image (background layer) - Construction site before */}
        <div className="absolute inset-0">
          <img
            src="https://forzabuilt.com/wp-content/uploads/2023/06/Forza-Built-House-Construction.jpg"
            alt="Construction site before completion"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* After content (overlay layer with clip mask) - Construction solutions */}
        <motion.div
          className="absolute inset-0"
          style={{
            clipPath: useTransform(wipeProgress, (value) => getClipPath(value))
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-orange-600/90 to-blue-600/90 flex items-center justify-center">
            <div className="text-center text-white p-8 max-w-4xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-6 font-kallisto">
                Construction Solutions
              </h2>
              <p className="text-lg md:text-xl mb-8 leading-relaxed">
                Forza offers an ideal custom-formulated line of construction-related bonding, sealing, and adhering chemistries and applications to drive construction project success over the long haul.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="text-xl font-bold mb-4">Building Envelope & Materials</h3>
                  <ul className="space-y-2 text-sm md:text-base">
                    <li>• Insulation installation for Building Envelope and HVAC/Pipe Wrapping</li>
                    <li>• Concrete applications including Tilt-Up, Precast, Crack Repair</li>
                    <li>• Interior and Below Grade Exterior Waterproofing</li>
                    <li>• Structural Fixturing Applications</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Custom Formulations & R&D</h3>
                  <ul className="space-y-2 text-sm md:text-base">
                    <li>• Full R&D formulations lab for custom solutions</li>
                    <li>• Global vendor network for comprehensive material access</li>
                    <li>• US-based manufacturing and packaging capabilities</li>
                    <li>• Rugged solutions for demanding construction environments</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8">
                <p className="text-lg font-semibold">
                  Materials: fiberglass, foam, MDF, rubber, wood, plastic, metal, concrete
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress indicator */}
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

      {/* Progress bar for construction solutions - fixed at bottom of viewport */}
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
          className="h-full bg-gradient-to-r from-orange-600 to-blue-600 rounded-full transition-all duration-300"
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
              return `Construction Solutions: ${Math.round(selectionProgress)}%`;
            })}
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ConstructionXRay; 