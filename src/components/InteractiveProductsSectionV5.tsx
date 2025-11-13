import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGradientMode } from '@/contexts/GradientModeContext';
import { byProductLine } from '@/utils/products';
import ProductModalV3 from '@/components/ProductModal/ProductModalV3';
import type { Product as DBProduct } from '@/types/products';

interface Product {
  title: string;
  description: string;
  image: string;
  slug: string;
}

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
    image: "/images/homepage-heroes/Forza Cleaners Hero Shot.jpg",
    slug: "ruggedred"
  }
];

const InteractiveProductsSectionV5 = () => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [previousProduct, setPreviousProduct] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const { mode } = useGradientMode();
  const [progress, setProgress] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const [modalProducts, setModalProducts] = useState<DBProduct[]>([]);
  const [selectedModalProduct, setSelectedModalProduct] = useState<DBProduct | null>(null);
  const [scrollStartY, setScrollStartY] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();
  const progressIntervalRef = useRef<NodeJS.Timeout>();
  const isUserInteractingRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
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

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    isUserInteractingRef.current = true;
    timerRef.current = setTimeout(() => {
      isUserInteractingRef.current = false;
      setProgress(0);
    }, 10000);
  }, []);

  const handleProductClick = (index: number) => {
    if (index !== selectedProduct) {
      setPreviousProduct(selectedProduct);
      setSelectedProduct(index);
      setProgress(0);
      setIsLocked(true);
      setHoveredProduct(null); // Clear any active hover effect immediately
      resetTimer();
    }
  };

  const loadModalProducts = async (category: 'bond' | 'seal' | 'tape') => {
    try {
      const categoryMap: { [key: string]: 'bond' | 'seal' | 'tape' } = {
        'ADHESIVES': 'bond',
        'SEALANTS': 'seal',
        'TAPES': 'tape',
        'CLEANERS': 'seal'
      };
      const categorySlug = categoryMap[products[selectedProduct].title] || 'bond';
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

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!isUserInteractingRef.current && !isLocked) {
        setSelectedProduct(prev => {
          const nextIndex = (prev + 1) % products.length;
          setPreviousProduct(prev);
          return nextIndex;
        });
        setProgress(0);
      }
    }, 4000);

    progressIntervalRef.current = setInterval(() => {
      if (!isUserInteractingRef.current) {
        setProgress(prev => {
          if (prev >= 100) return 0;
          return prev + (100 / 40);
        });
      }
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isLocked]);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
        setParallaxOffset(scrollProgress * 15);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          resetTimer();
        } else {
          isUserInteractingRef.current = true;
          if (timerRef.current) clearTimeout(timerRef.current);
        }
      },
      { threshold: 0.1 }
    );

    io.observe(sectionRef.current);

    return () => {
      io.disconnect();
    };
  }, [resetTimer]);

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
        <div className="pointer-events-none absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-[#f3f5f7]"></div>
          <div className="bg-gradient-to-r from-[#477197] to-[#2c476e]"></div>
        </div>

        <div className="relative overflow-visible">
          {/* Two column grid - responsive layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
            {/* LEFT SIDE - Images */}
            <div className="relative min-h-[35svh] sm:min-h-[42svh] md:min-h-[45svh] lg:min-h-[43svh] xl:min-h-[60svh] 2xl:min-h-[65svh] flex items-center justify-center overflow-hidden">
              {/* Subtle radial depth */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04)_0%,transparent_70%)] z-20" />

              {/* Label group */}
              <div className="absolute top-[clamp(16px,2.6vw,40px)] left-[clamp(16px,2.6vw,40px)] text-left select-none [--lh-label:1.22] opacity-0 pointer-events-none z-20" aria-hidden="false">
                <div className={`font-bold text-white text-[clamp(18px,1.6vw,24px)] ${
                  mode === 'light2' ? 'font-poppins' : 'font-kallisto'
                }`}>
                  <span className="leading-[var(--lh-label)] tracking-[-0.01em]">Forza</span>
                </div>
                <div className={`font-bold text-[#F2611D] text-[clamp(16px,1.4vw,22px)] ${
                  mode === 'light2' ? 'font-poppins' : 'font-kallisto'
                }`}>
                  <span className="leading-[var(--lh-label)] tracking-[-0.01em]">{(() => {
                    const displayedProduct = isLocked ? selectedProduct : (hoveredProduct ?? selectedProduct);
                    return products[displayedProduct].title === 'SEALANTS' ? 'SEAL' : products[displayedProduct].title;
                  })()}</span>
                </div>
                <div className={`text-white text-[clamp(10px,0.95vw,14px)] ${
                  mode === 'light2' ? 'font-poppins' : ''
                }`}>
                  A FORCE TO BE RECKONED WITH
                </div>
              </div>

              {(() => {
                const displayedProduct = isLocked ? selectedProduct : (hoveredProduct ?? selectedProduct);
                const previousDisplayedProduct = hoveredProduct !== null && !isLocked
                  ? (previousProduct !== null ? previousProduct : selectedProduct)
                  : previousProduct;

                return (
                  <>
                    {/* Previous product image */}
                    <img
                      src={products[previousDisplayedProduct].image}
                      alt={products[previousDisplayedProduct].title}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        objectPosition: 'center 70%',
                        transform: `translateZ(0px) scale(1.05) translateY(${parallaxOffset}px)`
                      }}
                    />

                    {/* Current product image */}
                    <img
                      key={displayedProduct}
                      src={products[displayedProduct].image}
                      alt={products[displayedProduct].title}
                      className="absolute inset-0 w-full h-full object-cover animate-in slide-in-from-right duration-700"
                      style={{
                        objectPosition: 'center 70%',
                        transform: `translateZ(0px) scale(1.05) translateY(${parallaxOffset}px)`
                      }}
                    />
                  </>
                );
              })()}
            </div>

            {/* RIGHT SIDE - Titles, description, and button */}
            <div className="relative min-h-[35svh] sm:min-h-[42svh] md:min-h-[45svh] lg:min-h-[43svh] xl:min-h-[60svh] 2xl:min-h-[65svh] px-[clamp(14px,4vw,32px)] py-[clamp(24px,4vw,48px)] flex items-center justify-center [--gap:clamp(12px,2.4vw,24px)] [--lh-head:1.18] [--lh-head-sm:1.28] [--lh-body:1.7]">
              <div className="w-full relative flex flex-col h-full">
                {/* Product list */}
                <div className="flex-1 flex flex-col">
                  <div className="flex flex-col justify-evenly h-full flex-shrink-0">
                    {products.map((product, index) => {
                      const displayedProduct = isLocked ? selectedProduct : (hoveredProduct ?? selectedProduct);
                      const isActive = displayedProduct === index;

                      return (
                        <div
                          key={index}
                          onClick={() => handleProductClick(index)}
                          onMouseEnter={isLocked ? undefined : () => setHoveredProduct(index)}
                          onMouseLeave={isLocked ? undefined : () => setHoveredProduct(null)}
                          className="w-full text-left transition-all duration-500 cursor-pointer"
                        >
                          <h3 className={`leading-[var(--lh-head-sm)] md:leading-[var(--lh-head)] tracking-[-0.01em] transition-all duration-500 ease-out ${
                            mode === 'light2' ? 'font-poppins' : 'font-kallisto'
                          } ${
                            isActive
                              ? 'text-[#F2611D] font-bold'
                              : 'text-white font-normal'
                          } ${!isLocked && !isActive ? 'hover:text-[#F2611D]' : ''}`}
                          style={{
                            fontSize: isActive
                              ? 'clamp(28px, 4vw, 128px)'
                              : 'clamp(22px, 3.2vw, 48px)',
                          }}>
                            {product.title}
                          </h3>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Button and description at bottom */}
                <div className="mt-auto pt-4 flex-shrink-0 space-y-4">
                  {(() => {
                    const displayedProduct = isLocked ? selectedProduct : (hoveredProduct ?? selectedProduct);
                    return (
                      <>
                        <p className={`text-white text-[clamp(14px,1.25vw,24px)] leading-relaxed transition-all duration-500 animate-in fade-in slide-in-from-right-2 ${
                          mode === 'light2' ? 'font-poppins' : ''
                        }`}
                        key={displayedProduct}>
                          {products[displayedProduct].description}
                        </p>
                        <Button
                          onClick={() => loadModalProducts('bond')}
                          className="gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 inline-flex h-10 items-center justify-center rounded-full bg-[#F2611D] px-7 py-3.5 text-white text-[clamp(14px,1.1vw,18px)] font-medium hover:bg-[#F2611D]/90 shadow-lg"
                        >
                          {getButtonText(products[displayedProduct].title)}
                        </Button>
                      </>
                    );
                  })()}
                </div>
              </div>
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
            return categoryMap[products[selectedProduct].title] || 'bond';
          })()}
        />
      </section>
    </section>
  );
};

export default InteractiveProductsSectionV5;

