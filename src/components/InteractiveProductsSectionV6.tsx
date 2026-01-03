import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGradientMode } from '@/contexts/GradientModeContext';
import { byProductLine } from '@/utils/products';
import ProductModalV3 from '@/components/ProductModal/ProductModalV3';
import type { Product as DBProduct } from '@/types/products';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  title: string;
  description: string;
  image: string;
  slug: string;
}

// Function to convert ALL CAPS to Title Case
const toTitleCase = (str: string): string => {
  return str.toLowerCase().split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

const products: Product[] = [
  {
    title: "ADHESIVES",
    description: "Engineered for strength and speed — our industrial adhesives create lasting bonds that keep your production moving.",
    image: "/images/homepage-heroes/Forza Bond Hero Shot.jpg",
    slug: "bond"
  },
  {
    title: "SEALANTS", 
    description: "Dependable sealing solutions designed to protect, perform, and endure in even the toughest manufacturing environments.",
    image: "/images/homepage-heroes/Forza Seal Hero Shot.jpg",
    slug: "seal"
  },
  {
    title: "TAPES",
    description: "Precision tapes that deliver clean application, consistent performance, and unmatched versatility across industries.",
    image: "/images/homepage-heroes/Forza Tape Hero Shot.jpg",
    slug: "tape"
  },
  {
    title: "CLEANERS",
    description: "Industrial-grade cleaners formulated to cut through residue fast — keeping your equipment and processes running at peak efficiency.",
    image: "/images/homepage-heroes/Forza-Cleaners-Hero-Shot1.jpg",
    slug: "ruggedred"
  }
];

const InteractiveProductsSectionV6 = () => {
  // State for the "locked" selection (clicked)
  const [lockedIndex, setLockedIndex] = useState(0);
  // State for the "hovered" selection
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // The index to display: hover takes precedence, otherwise locked
  const activeIndex = hoveredIndex !== null ? hoveredIndex : lockedIndex;

  // Refs for auto-rotation
  const timerRef = useRef<NodeJS.Timeout>();
  const isUserInteractingRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { mode } = useGradientMode();
  const [progress, setProgress] = useState(0);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const [modalProducts, setModalProducts] = useState<DBProduct[]>([]);
  const [selectedModalProduct, setSelectedModalProduct] = useState<DBProduct | null>(null);
  const [scrollStartY, setScrollStartY] = useState(0);
  const closeTimeoutRef = useRef<NodeJS.Timeout>();

  const getButtonText = (title: string) => {
    const buttonTextMap: { [key: string]: string } = {
      'ADHESIVES': 'Browse Adhesives',
      'SEALANTS': 'Browse Sealants',
      'TAPES': 'Browse Tapes',
      'CLEANERS': 'Browse Cleaners'
    };
    return buttonTextMap[title] || `Browse ${title}`;
  };

  // Reset the auto-rotation timer
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    isUserInteractingRef.current = true;
    // Resume auto-rotation after 10 seconds of no interaction
    timerRef.current = setTimeout(() => {
      isUserInteractingRef.current = false;
      setProgress(0);
    }, 10000);
  }, []);

  // Auto-rotation logic
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      if (!isUserInteractingRef.current && hoveredIndex === null) {
        setLockedIndex((prev) => (prev + 1) % products.length);
        setProgress(0);
      }
      }, 4000);

    const progressInterval = setInterval(() => {
      if (!isUserInteractingRef.current && hoveredIndex === null) {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + (100 / 40); // 100% over 40 ticks (4000ms / 100ms)
        });
    } else {
        setProgress(0);
    }
    }, 100);

    return () => {
      clearInterval(rotationInterval);
      clearInterval(progressInterval);
    };
  }, [hoveredIndex]);


  // Modal helpers
  const loadModalProducts = async (category: 'bond' | 'seal' | 'tape' | 'ruggedred') => {
    try {
      const categorySlug = category === 'ruggedred' ? 'seal' : category;
      const productsList = await byProductLine(categorySlug);
      setModalProducts(productsList);
      if (productsList.length > 0) {
        setSelectedModalProduct(productsList[0]);
      }
      setShowModal(true);
      setIsClosingModal(false);
      setScrollStartY(window.scrollY);
    } catch (error) {
      console.error('Failed to load modal products:', error);
    }
  };

  const closeModal = useCallback(() => {
    setIsClosingModal(true);
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setShowModal(false);
      setIsClosingModal(false);
    }, 300);
  }, []);

  // Handle scroll closing modal
  useEffect(() => {
    if (!showModal || isClosingModal) return;
    const handleScroll = () => {
      const scrollDelta = Math.abs(window.scrollY - scrollStartY);
      if (scrollDelta > 20) {
        closeModal();
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showModal, scrollStartY, isClosingModal, closeModal]);

  return (
    <section ref={sectionRef} className="relative z-20">
      <section className="relative isolate overflow-visible">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-[#F2611D] to-orange-400 transition-all duration-100 z-50" style={{ width: `${progress}%` }} />

        {/* Background color grid */}
        <div className="pointer-events-none absolute inset-0 md:grid md:grid-cols-2">
          <div className="bg-[#f3f5f7]"></div>
          <div className="bg-gradient-to-r from-[#477197] to-[#2c476e]"></div>
        </div>

        <div className="relative overflow-visible">
          {/* Mobile: Stack vertically (product selections first, then image) | Desktop: 2 columns side-by-side */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-0 overflow-hidden">
            
            {/* RIGHT SIDE - Product selections, description, and button (first on mobile, right on desktop) */}
            <div className="relative bg-gradient-to-r from-[#477197] to-[#2c476e] px-3 py-3 md:px-5 md:py-5 flex flex-col justify-between order-1 md:order-2 md:aspect-[5/4]">
              
              {/* Product list - Optimized spacing */}
              <div className="flex flex-col justify-center flex-1" style={{ gap: 'clamp(6px, 1.2vw, 12px)' }}>
                {products.map((product, index) => {
                  const isActive = activeIndex === index;
                  
                  return (
                    <button
                      key={index}
                      onMouseEnter={() => {
                        setHoveredIndex(index);
                        resetTimer();
                      }}
                      onMouseLeave={() => {
                        setHoveredIndex(null);
                      }}
                      onClick={() => {
                        setLockedIndex(index);
                        setHoveredIndex(null);
                        resetTimer();
                      }}
                      className="w-full text-left transition-all duration-500 cursor-pointer"
                    >
                      <h3 className={`leading-[1.1] tracking-[-0.01em] transition-all duration-500 ease-out ${
                        mode === 'light2' ? 'font-poppins' : 'font-kallisto'
                      } ${
                        isActive
                          ? 'text-[#F2611D] font-bold'
                          : 'text-white font-normal'
                      } ${!isActive ? 'hover:text-[#F2611D]' : ''}`}
                      style={{
                        fontSize: isActive 
                          ? 'clamp(18px, 3.5vw, 56px)' 
                          : 'clamp(14px, 2vw, 32px)',
                      }}>
                        {toTitleCase(product.title)}
                      </h3>
                    </button>
                  );
                })}
              </div>

              {/* Description and button */}
              <div className="mt-auto pb-3 md:pb-0" style={{ gap: 'clamp(8px, 1.2vw, 12px)', display: 'flex', flexDirection: 'column' }}>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className={`text-white ${
                      mode === 'light2' ? 'font-poppins' : ''
                    }`}
                    style={{
                      fontSize: 'clamp(11px, 1.3vw, 15px)',
                      lineHeight: '1.5'
                    }}>
                      {products[activeIndex].description}
                    </p>
                    <Button
                      asChild
                      className="mt-2 gap-1 md:gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 inline-flex items-center justify-center rounded-full bg-[#F2611D] text-white font-medium hover:bg-[#F2611D]/90 shadow-lg"
                      style={{
                        height: 'clamp(28px, 2.5vw, 36px)',
                        paddingLeft: 'clamp(12px, 1.8vw, 20px)',
                        paddingRight: 'clamp(12px, 1.8vw, 20px)',
                        fontSize: 'clamp(11px, 1.2vw, 14px)'
                      }}
                    >
                      <Link to={`/products/${products[activeIndex].slug}`}>
                        {getButtonText(products[activeIndex].title)}
                      </Link>
                    </Button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* LEFT SIDE - Images (second on mobile, left on desktop) */}
            <div className="relative w-full aspect-square md:aspect-[5/4] flex items-center justify-center overflow-hidden bg-[#f3f5f7] order-2 md:order-1">
              {/* Images with AnimatePresence for smooth transitions */}
              <div className="absolute inset-0 w-full h-full z-10">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={activeIndex}
                    src={products[activeIndex].image}
                    alt={products[activeIndex].title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      objectPosition: 'center 70%',
                      transform: 'translateZ(0px) scale(1.05)',
                    }}
                  />
                </AnimatePresence>
              </div>
              
              {/* Subtle radial depth - above images */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04)_0%,transparent_70%)] z-20" />
            </div>
          </div>
        </div>

        {/* Product Modal */}
        <ProductModalV3
          isOpen={showModal}
          products={modalProducts}
          selectedProduct={selectedModalProduct}
          onProductSelect={setSelectedModalProduct}
          onClose={closeModal}
          categorySlug={(() => {
            const categoryMap: { [key: string]: string } = {
              'ADHESIVES': 'bond',
              'SEALANTS': 'seal',
              'TAPES': 'tape',
              'CLEANERS': 'seal'
            };
            return categoryMap[products[activeIndex].title] || 'bond';
          })()}
        />
      </section>
    </section>
  );
};

export default InteractiveProductsSectionV6;

