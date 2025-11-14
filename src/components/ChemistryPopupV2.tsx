import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ChemistryData {
  id: string;
  abbreviation: string;
  name: string;
  description: string;
  features: string[];
  iconSrc: string;
}

interface ChemistryPopupV2Props {
  chemistry: ChemistryData | null;
  onClose: () => void;
  autoCloseDelay?: number; // in milliseconds, default 6000
  shouldStartTimer?: boolean; // Whether to start the auto-close timer
}

const ChemistryPopupV2: React.FC<ChemistryPopupV2Props> = ({ 
  chemistry, 
  onClose, 
  autoCloseDelay = 6000,
  shouldStartTimer = false
}) => {
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef<number>(0);

  useEffect(() => {
    // Clear any existing timer
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }

    // Only start timer if shouldStartTimer is true and chemistry exists
    if (chemistry && shouldStartTimer) {
      autoCloseTimerRef.current = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
    }

    // Cleanup on unmount or when chemistry changes
    return () => {
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
    };
  }, [chemistry, shouldStartTimer, onClose, autoCloseDelay]);

  // Handle scroll to close modal
  useEffect(() => {
    if (!chemistry) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Close modal if user scrolls (any scroll movement)
      if (Math.abs(currentScrollY - lastScrollYRef.current) > 5) {
        onClose();
      }
      lastScrollYRef.current = currentScrollY;
    };

    // Set initial scroll position
    lastScrollYRef.current = window.scrollY;

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [chemistry, onClose]);

  const handleClose = () => {
    // Clear timer when manually closed
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }
    onClose();
  };

  // Render modal content using React Portal
  const modalContent = (
    <AnimatePresence mode="wait">
      {chemistry && (
        <motion.div
          ref={popupRef}
          key={chemistry.id}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.25, 0.46, 0.45, 0.94],
            opacity: { duration: 0.3 }
          }}
          className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none"
          style={{ zIndex: 99999 }}
          onMouseEnter={() => {
            // Pause auto-close when hovering over popup
            if (autoCloseTimerRef.current) {
              clearTimeout(autoCloseTimerRef.current);
              autoCloseTimerRef.current = null;
            }
          }}
          onMouseLeave={() => {
            // Resume auto-close when leaving popup (only if shouldStartTimer is true)
            if (chemistry && shouldStartTimer) {
              autoCloseTimerRef.current = setTimeout(() => {
                onClose();
              }, autoCloseDelay);
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.1
            }}
            className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 max-w-md w-full shadow-2xl pointer-events-auto relative"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 text-xl sm:text-2xl font-bold z-10 cursor-pointer transition-colors"
              aria-label="Close"
            >
              ×
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <img 
                src={chemistry.iconSrc} 
                alt={chemistry.name} 
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
              />
            </div>

            {/* Content */}
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-normal text-[#2c476e] mb-2 font-poppins">
                {chemistry.name}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 font-normal font-poppins">
                {chemistry.description}
              </p>
            </div>

            {/* Features */}
            <div className="mb-4 sm:mb-6">
              <ul className="text-xs sm:text-sm md:text-base text-gray-700 list-disc list-outside text-left space-y-1 font-poppins pl-5">
                {chemistry.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Use React Portal to render at document.body level
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return null;
};

export default ChemistryPopupV2;

