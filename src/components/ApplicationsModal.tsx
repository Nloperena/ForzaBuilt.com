import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ApplicationsModalProps {
  isVisible: boolean;
  onClose: () => void;
  opacity?: number;
}

const ApplicationsModal: React.FC<ApplicationsModalProps> = ({ isVisible, onClose, opacity = 1 }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: opacity }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-gradient-to-r from-[#1b3764] to-[#147974] text-white p-8 rounded-2xl shadow-2xl max-w-4xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl font-extrabold mb-3 font-kallisto">
                Explore Applications
              </h3>
              <p className="text-xl md:text-2xl mb-6 font-semibold">
                Hover over blue areas or continue scrolling to see our industry applications
              </p>
              <div className="flex justify-center">
                <button
                  onClick={onClose}
                  className="bg-[#ff5c1a] hover:bg-[#e54d17] text-white px-8 py-3 rounded-full text-lg font-bold transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Close Window
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ApplicationsModal; 