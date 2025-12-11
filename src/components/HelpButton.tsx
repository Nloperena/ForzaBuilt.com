import React, { useState } from 'react';
import { HelpCircle, X, Mail, Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const HelpButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <>
      {/* Floating Help Button */}
      <motion.button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 z-50 bg-[#F2611D] hover:bg-[#E6540D] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 font-poppins font-normal flex items-center gap-2 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Get Help"
      >
        <HelpCircle className="w-6 h-6" />
        <span className="hidden sm:inline-block">Help</span>
      </motion.button>

      {/* Help Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/50 z-[60]"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-6 right-6 z-[70] w-[90vw] max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#477197] to-[#2c476e] text-white p-6 relative">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-poppins font-normal mb-2">How can we help you?</h2>
                <p className="text-white/90 text-sm font-poppins">Get support and find answers to your questions</p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Contact Options */}
                <div className="space-y-3">
                  <Link
                    to="/contact"
                    onClick={handleClose}
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#F2611D] hover:bg-[#F2611D]/5 transition-all duration-200 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F2611D]/10 flex items-center justify-center group-hover:bg-[#F2611D] transition-colors">
                      <Mail className="w-5 h-5 text-[#F2611D] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-poppins font-normal text-[#1B3764] group-hover:text-[#F2611D] transition-colors">
                        Contact Us
                      </h3>
                      <p className="text-sm text-gray-600 font-poppins">
                        Send us a message and we'll get back to you
                      </p>
                    </div>
                  </Link>

                  <a
                    href="tel:+14027319300"
                    onClick={handleClose}
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#F2611D] hover:bg-[#F2611D]/5 transition-all duration-200 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F2611D]/10 flex items-center justify-center group-hover:bg-[#F2611D] transition-colors">
                      <Phone className="w-5 h-5 text-[#F2611D] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-poppins font-normal text-[#1B3764] group-hover:text-[#F2611D] transition-colors">
                        Call Us
                      </h3>
                      <p className="text-sm text-gray-600 font-poppins">
                        402.731.9300
                      </p>
                    </div>
                  </a>

                  <Link
                    to="/blog"
                    onClick={handleClose}
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#F2611D] hover:bg-[#F2611D]/5 transition-all duration-200 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F2611D]/10 flex items-center justify-center group-hover:bg-[#F2611D] transition-colors">
                      <MessageCircle className="w-5 h-5 text-[#F2611D] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-poppins font-normal text-[#1B3764] group-hover:text-[#F2611D] transition-colors">
                        Learning Center
                      </h3>
                      <p className="text-sm text-gray-600 font-poppins">
                        Browse articles and resources
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Quick Links */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm font-poppins font-normal text-gray-700 mb-3">Quick Links</p>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to="/about"
                      onClick={handleClose}
                      className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-[#F2611D] hover:text-white text-gray-700 rounded-full transition-colors font-poppins font-normal"
                    >
                      About Us
                    </Link>
                    <Link
                      to="/products"
                      onClick={handleClose}
                      className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-[#F2611D] hover:text-white text-gray-700 rounded-full transition-colors font-poppins font-normal"
                    >
                      Products
                    </Link>
                    <Link
                      to="/tools"
                      onClick={handleClose}
                      className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-[#F2611D] hover:text-white text-gray-700 rounded-full transition-colors font-poppins font-normal"
                    >
                      Tools
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HelpButton;

