
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';

interface XRayWipeProps {
  beforeSrc: string;
  afterSrc: string;
  altBefore?: string;
  altAfter?: string;
  height?: number;
  wipeDirection?: 'ltr' | 'rtl' | 'ttb' | 'btt';
  className?: string;
}

const XRayWipe: React.FC<XRayWipeProps> = ({
  beforeSrc,
  afterSrc,
  altBefore = "Before image",
  altAfter = "After image",
  height = 600,
  wipeDirection = 'ltr',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress for this specific element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Create smooth wipe progress based on scroll
  const wipeProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  // Calculate clip path based on wipe direction
  const getClipPath = (progress: number) => {
    switch (wipeDirection) {
      case 'ltr':
        return `inset(0 ${100 - progress}% 0 0)`;
      case 'rtl':
        return `inset(0 0 0 ${100 - progress}%)`;
      case 'ttb':
        return `inset(0 0 ${100 - progress}% 0)`;
      case 'btt':
        return `inset(${100 - progress}% 0 0 0)`;
      default:
        return `inset(0 ${100 - progress}% 0 0)`;
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height: `${height * 3}px` }} // Extra height for scroll range
    >
      {/* Sticky container that holds the images */}
      <div 
        className="sticky top-1/2 -translate-y-1/2 w-full overflow-hidden rounded-lg shadow-2xl"
        style={{ height: `${height}px` }}
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
          <img
            src={afterSrc}
            alt={altAfter}
            className="w-full h-full object-cover"
            loading="lazy"
          />
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

        {wipeDirection === 'ttb' && (
          <motion.div
            className="absolute top-0 left-1/2 h-1 bg-white/80 shadow-lg"
            style={{
              width: '60%',
              transformOrigin: 'center',
              y: useTransform(wipeProgress, [0, 100], ['0%', '100vh'])
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}

        {wipeDirection === 'btt' && (
          <motion.div
            className="absolute bottom-0 left-1/2 h-1 bg-white/80 shadow-lg"
            style={{
              width: '60%',
              transformOrigin: 'center',
              y: useTransform(wipeProgress, [0, 100], ['0%', '-100vh'])
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
    </div>
  );
};

export default XRayWipe; 