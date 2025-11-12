import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGradientMode } from '@/contexts/GradientModeContext';
import { byProductLine } from '@/utils/products';
import type { Product as DBProduct } from '@/types/products';

interface Product {
  title: string;
  description: string;
  image: string;
  slug: string;
}

interface ProductOverlayProps {
  category: 'bond' | 'seal' | 'tape';
  isOpen: boolean;
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

const InteractiveProductsSectionV4 = () => {
  const [selectedProduct, setSelectedProduct] = useState(0); // For button/link/text
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null); // For image on hover
  const [previousProduct, setPreviousProduct] = useState(0);
  const { mode } = useGradientMode();
  const [progress, setProgress] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [overlayProducts, setOverlayProducts] = useState<DBProduct[]>([]);
  const [selectedOverlayProduct, setSelectedOverlayProduct] = useState<DBProduct | null>(null);
  const [scrollStartY, setScrollStartY] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();
  const progressIntervalRef = useRef<NodeJS.Timeout>();
  const isUserInteractingRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout>();

  // Get button text based on product title
  const getButtonText = (title: string) => {
    const buttonTextMap: { [key: string]: string } = {
      'ADHESIVES': 'See Adhesive Products',
      'SEALANTS': 'See Sealant Products',
      'TAPES': 'See Tape Products',
      'CLEANERS': 'See Cleaner Products'
    };
    return buttonTextMap[title] || `See ${title} Products`;
  };

  const resetTimer = useCallback(() => {
    // Clear existing timeout
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Set flag to pause auto-cycling
    isUserInteractingRef.current = true;
    
    // Restart auto-cycling after 10 seconds
    timerRef.current = setTimeout(() => {
      isUserInteractingRef.current = false;
      setProgress(0);
    }, 10000);
  }, []);

  // Handle click - only updates button/link/text
  const handleProductClick = (index: number) => {
    if (index !== selectedProduct) {
      setPreviousProduct(selectedProduct);
      setSelectedProduct(index);
      setProgress(0);
      resetTimer();
    }
  };

  // Handle hover - only change color to orange, don't change image if something is selected
  const handleProductHover = (index: number | null) => {
    // Don't change the image on hover if something is already selected
    // This means we only show color change on hover, no image swap
  };

  // Load products for overlay
  const loadOverlayProducts = async (category: 'bond' | 'seal' | 'tape') => {
    try {
      const categoryMap: { [key: string]: 'bond' | 'seal' | 'tape' } = {
        'ADHESIVES': 'bond',
        'SEALANTS': 'seal',
        'TAPES': 'tape',
        'CLEANERS': 'seal' // Reuse sealants for cleaners/RR
      };
      const categorySlug = categoryMap[products[selectedProduct].title] || 'bond';
      const products_list = await byProductLine(categorySlug);
      setOverlayProducts(products_list);
      if (products_list.length > 0) {
        setSelectedOverlayProduct(products_list[0]);
      }
      setShowOverlay(true);
      setIsClosing(false);
      setScrollStartY(window.scrollY);
    } catch (error) {
      console.error('Failed to load overlay products:', error);
    }
  };

  // Close overlay with slide-out animation
  const closeOverlay = useCallback(() => {
    setIsClosing(true);
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setShowOverlay(false);
      setIsClosing(false);
    }, 300); // Match animation duration
  }, []);

  useEffect(() => {
    // Auto-cycle every 4 seconds
    timerRef.current = setInterval(() => {
      if (!isUserInteractingRef.current) {
        setSelectedProduct(prev => {
          const nextIndex = (prev + 1) % products.length;
          setPreviousProduct(prev);
          return nextIndex;
        });
        setProgress(0);
      }
    }, 4000);

    // Progress bar animation
    progressIntervalRef.current = setInterval(() => {
      if (!isUserInteractingRef.current) {
        setProgress(prev => {
          if (prev >= 100) return 0;
          return prev + (100 / 40); // 100% over 4000ms (40 intervals of 100ms)
        });
      }
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

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

  // IntersectionObserver to detect viewport visibility
  useEffect(() => {
    if (!sectionRef.current) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Component entered viewport - restart timer after 10 seconds
          resetTimer();
        } else {
          // Component left viewport - pause auto-cycling
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

  // Close overlay on scroll
  useEffect(() => {
    if (!showOverlay || isClosing) return;

    const handleScroll = () => {
      const scrollDelta = Math.abs(window.scrollY - scrollStartY);
      if (scrollDelta > 20) {
        closeOverlay();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showOverlay, scrollStartY, isClosing, closeOverlay]);

  return (
    <section ref={sectionRef} className="relative z-20">
      <section className="relative isolate overflow-visible">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-[#F2611D] to-orange-400 transition-all duration-100 z-50" style={{ width: `${progress}%` }} />
        
        {/* Background color grid (decorative) */}
        <div className="pointer-events-none absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-[#f3f5f7]"></div>
          <div className="bg-gradient-to-r from-[#477197] to-[#2c476e]"></div>
        </div>

        <div className="relative overflow-visible">
          {/* Two column grid - responsive layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
            {/* LEFT SIDE - Images */}
            <div className="
              relative

              min-h-[35svh] sm:min-h-[42svh] md:min-h-[45svh] lg:min-h-[43svh] xl:min-h-[60svh] 2xl:min-h-[65svh]

              flex items-center justify-center

              overflow-hidden

            ">
              {/* subtle radial depth */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04)_0%,transparent_70%)] z-20" />

              {/* label group (invisible for SEO, accessible to screen readers) */}
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
                    const displayedProduct = hoveredProduct ?? selectedProduct;
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
                const displayedProduct = hoveredProduct ?? selectedProduct;
                // Previous displayed product: if hovering, use what was displayed before hover; otherwise use previousProduct
                const previousDisplayedProduct = hoveredProduct !== null 
                  ? (previousProduct !== null ? previousProduct : selectedProduct)
                  : previousProduct;
                
                return (
                  <>
                    {/* Previous product image (stays in place) */}
                    <img
                      src={products[previousDisplayedProduct].image}
                      alt={products[previousDisplayedProduct].title}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        objectPosition: 'center 70%',
                        transform: `translateZ(0px) scale(1.05) translateY(${parallaxOffset}px)`
                      }}
                    />

                    {/* Current product image (slides over) */}
                    <img
                      key={displayedProduct}
                      src={products[displayedProduct].image}
                      alt={products[displayedProduct].title}
                      className="
                        absolute inset-0 w-full h-full object-cover

                        animate-in slide-in-from-right duration-700

                      "
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
            <div className="
              relative

              min-h-[35svh] sm:min-h-[42svh] md:min-h-[45svh] lg:min-h-[43svh] xl:min-h-[60svh] 2xl:min-h-[65svh]

              px-[clamp(14px,4vw,32px)] py-[clamp(24px,4vw,48px)]

              flex items-center justify-center

              [--gap:clamp(12px,2.4vw,24px)] [--lh-head:1.18] [--lh-head-sm:1.28] [--lh-body:1.7]

            ">
              <div className="w-full relative flex flex-col h-full">
                {/* Product list - centered and spaced evenly */}
                <div className="flex-1 flex flex-col">
                  <div className="flex flex-col justify-evenly h-full flex-shrink-0">
                    {products.map((product, index) => {
                      const displayedProduct = hoveredProduct ?? selectedProduct;
                      const isActive = displayedProduct === index;
                      
                      return (
                        <div
                          key={index}
                          onClick={() => handleProductClick(index)}
                          onMouseEnter={() => handleProductHover(index)}
                          onMouseLeave={() => handleProductHover(null)}
                          className="w-full text-left transition-all duration-500 cursor-pointer"
                        >
                          <h3 className={`leading-[var(--lh-head-sm)] md:leading-[var(--lh-head)] tracking-[-0.01em] transition-all duration-500 ease-out ${
                            mode === 'light2' ? 'font-poppins' : 'font-kallisto'
                          } ${
                            isActive
                              ? 'text-[#F2611D] font-bold'
                              : 'text-white font-normal hover:text-[#F2611D]'
                          }`}
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

                {/* Button and description fixed at bottom */}
                <div className="mt-auto pt-4 flex-shrink-0 space-y-4">
                  {(() => {
                    const displayedProduct = hoveredProduct ?? selectedProduct;
                    return (
                      <>
                        <p className={`text-white text-[clamp(14px,1.25vw,24px)] leading-relaxed transition-all duration-500 animate-in fade-in slide-in-from-right-2 ${
                          mode === 'light2' ? 'font-poppins' : ''
                        }`}
                        key={displayedProduct}>
                          {products[displayedProduct].description}
                        </p>
                        <Button 
                          onClick={() => loadOverlayProducts('bond')}
                          className="gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 inline-flex h-10 items-center justify-center rounded-full bg-[#F2611D] px-7 py-3.5 text-white text-[clamp(14px,1.1vw,18px)] font-medium hover:bg-[#F2611D]/90 shadow-lg"
                        >
                          Browse Products
                        </Button>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Overlay - Positioned over right side, animated in/out */}
        {showOverlay && (
          <div className={`absolute top-0 right-0 bottom-0 w-full lg:w-1/2 bg-gradient-to-br from-[#477197] to-[#2c476e] overflow-hidden flex flex-col shadow-2xl z-40 ${
            isClosing ? 'animate-out slide-out-to-right duration-300' : 'animate-in slide-in-from-right duration-300'
          }`}>
            {/* Header with Logo and Close Button */}
            <div className="flex items-center justify-between px-3 md:px-6 py-2 md:py-4 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-2 md:gap-4">
                <img 
                  src="/logos/Forza-Eagle-Logo-White.svg"
                  alt="Forza Logo"
                  className="h-10 md:h-16 w-auto"
                />
              </div>
              <button
                onClick={closeOverlay}
                className="text-white hover:text-white/70 transition-colors p-2 hover:bg-white/10 rounded-lg flex-shrink-0 hover:scale-110 transition-transform flex items-center gap-1"
              >
                <span className="text-sm font-semibold">on</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content Grid - Two Columns */}
            <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Left - Product List */}
              <div className="overflow-y-auto border-r border-white/10 bg-[#1b3764]/40 p-2 md:p-4 scrollbar-hide hover:scrollbar-visible [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#F2611D]/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#F2611D]/60 [&::-webkit-scrollbar-thumb]:transition-colors">
                <h3 className={`text-xs md:text-base lg:text-xs xl:text-sm 2xl:text-base font-bold text-white mb-2 md:mb-3 ${mode === 'light2' ? 'font-poppins' : 'font-kallisto'}`}>
                  {products[selectedProduct].title}
                </h3>
                <div className="space-y-1 md:space-y-2 lg:space-y-1.5">
                  {overlayProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => setSelectedOverlayProduct(product)}
                      className={`w-full text-left px-2 md:px-3 lg:px-2.5 xl:px-3 py-1.5 md:py-2 lg:py-2 xl:py-2.5 2xl:py-3 rounded transition-all duration-300 transform ${
                        selectedOverlayProduct?.id === product.id
                          ? 'bg-[#F2611D] text-white font-semibold scale-105 shadow-lg'
                          : 'text-white hover:bg-white/10 hover:scale-102'
                      }`}
                    >
                      <p className={`text-xs md:text-sm lg:text-xs xl:text-sm 2xl:text-base truncate ${mode === 'light2' ? 'font-poppins' : ''}`}>
                        {product.name || product.productCode}
                      </p>
                      {product.productCode && (
                        <p className="text-xs lg:text-[10px] xl:text-xs 2xl:text-sm text-white/60 truncate">{product.productCode}</p>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right - Product Details */}
              <div className="overflow-y-auto p-2 md:p-5 lg:p-1.5 flex flex-col bg-[#1b3764]/20 scrollbar-hide hover:scrollbar-visible [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#F2611D]/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#F2611D]/60 [&::-webkit-scrollbar-thumb]:transition-colors">
                {selectedOverlayProduct ? (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                    {/* Product Header with Code */}
                    <div className="mb-3 md:mb-6 lg:mb-1 xl:mb-2 2xl:mb-3">
                      {selectedOverlayProduct.productCode && (
                        <p className="text-[#F2611D] font-semibold text-xs mb-1 lg:mb-0.5 lg:text-[10px] xl:text-xs 2xl:text-sm uppercase tracking-wider">{selectedOverlayProduct.productCode}</p>
                      )}
                      <h3 className={`text-xl md:text-3xl lg:text-lg xl:text-2xl 2xl:text-3xl font-bold text-white leading-tight ${mode === 'light2' ? 'font-poppins' : 'font-kallisto'}`}>
                        {selectedOverlayProduct.name}
                      </h3>
                    </div>

                    {/* Large Product Image */}
                    {selectedOverlayProduct?.imageUrl && (
                      <div className="mb-3 md:mb-5 lg:mb-1.5 xl:mb-3 2xl:mb-4 rounded-lg md:rounded-xl overflow-hidden bg-gradient-to-b from-[#0f2132] to-[#1b3764] h-24 md:h-48 lg:h-20 xl:h-48 2xl:h-56 flex items-center justify-center flex-shrink-0 shadow-lg border border-white/10 animate-in zoom-in-95 duration-300 delay-75">
                        <img 
                          src={selectedOverlayProduct.imageUrl}
                          alt={selectedOverlayProduct.name}
                          className="w-full h-full object-contain p-2 lg:p-1.5 xl:p-3 2xl:p-4"
                        />
                      </div>
                    )}

                    {/* Product Description */}
                    {selectedOverlayProduct.description && (
                      <p className={`text-white/90 leading-relaxed text-xs md:text-sm lg:text-[11px] xl:text-sm 2xl:text-base mb-2 md:mb-4 lg:mb-1 xl:mb-2 2xl:mb-3 animate-in fade-in duration-300 delay-100 ${mode === 'light2' ? 'font-poppins' : ''}`}>
                        {selectedOverlayProduct.description}
                      </p>
                    )}

                    {/* Key Features Section */}
                    {selectedOverlayProduct.features && selectedOverlayProduct.features.length > 0 && (
                      <div className="mb-2 md:mb-4 lg:mb-1 xl:mb-2 2xl:mb-3 animate-in fade-in duration-300 delay-150">
                        <h4 className={`text-xs md:text-sm lg:text-[10px] xl:text-xs 2xl:text-sm font-bold text-white mb-1 md:mb-2 lg:mb-0.5 xl:mb-1 2xl:mb-2 uppercase tracking-wide ${mode === 'light2' ? 'font-poppins' : 'font-kallisto'}`}>
                          Features
                        </h4>
                        <ul className="space-y-1 lg:space-y-0.5 xl:space-y-1 2xl:space-y-1.5">
                          {selectedOverlayProduct.features.slice(0, 2).map((feature, idx) => (
                            <li key={idx} className={`text-white/80 flex items-start gap-1 text-xs lg:text-[10px] xl:text-xs 2xl:text-sm leading-tight animate-in fade-in duration-300 ${mode === 'light2' ? 'font-poppins' : ''}`} style={{ animationDelay: `${200 + idx * 50}ms` }}>
                              <span className="text-[#F2611D] font-bold flex-shrink-0">●</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Key Specifications */}
                    {selectedOverlayProduct.chemistry && (
                      <div className="mb-2 md:mb-4 lg:mb-1.5 xl:mb-2.5 2xl:mb-3 p-2 md:p-3 lg:p-1.5 xl:p-2.5 2xl:p-3.5 bg-white/5 rounded border md:rounded-lg border-white/10 animate-in fade-in duration-300 delay-200">
                        <h4 className={`text-xs lg:text-[10px] xl:text-xs 2xl:text-sm font-bold text-white mb-1 lg:mb-0.5 xl:mb-1 2xl:mb-1.5 uppercase tracking-wide ${mode === 'light2' ? 'font-poppins' : 'font-kallisto'}`}>
                          Specs
                        </h4>
                        <div className="text-xs lg:text-[10px] xl:text-xs 2xl:text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/60">Chemistry:</span>
                            <span className="text-[#F2611D] font-semibold">{selectedOverlayProduct.chemistry}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Category Navigation Button */}
                    <div className="flex gap-2 mt-auto pt-2 md:pt-4 lg:pt-1.5 xl:pt-2.5 2xl:pt-3">
                      <Link 
                        to={`/products/${selectedOverlayProduct.productCode?.toLowerCase().replace(/\s+/g, '-') || 'product'}`}
                        className="flex-1 px-2 md:px-4 lg:px-1.5 xl:px-3 2xl:px-4 py-2 lg:py-1 xl:py-1.5 2xl:py-2 bg-white/10 text-white rounded text-xs lg:text-[10px] xl:text-xs 2xl:text-sm hover:bg-white/20 transition-all duration-300 text-center animate-in fade-in slide-in-from-bottom-4 duration-300 delay-250"
                      >
                        Details
                      </Link>
                      <Link 
                        to={`/products/${products[selectedProduct].slug}`}
                        className="flex-1 px-2 md:px-4 lg:px-1.5 xl:px-3 2xl:px-4 py-2 lg:py-1 xl:py-1.5 2xl:py-2 bg-[#F2611D] text-white rounded text-xs lg:text-[10px] xl:text-xs 2xl:text-sm hover:bg-[#E6540D] transition-all duration-300 text-center flex items-center justify-center gap-1 shadow-lg hover:shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300 delay-250"
                      >
                        <span className="hidden md:inline">View All</span>
                        <span className="md:hidden">View</span>
                        <svg className="w-3 md:w-4 lg:w-2.5 xl:w-3.5 2xl:w-4 h-3 md:h-4 lg:h-2.5 xl:h-3.5 2xl:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-white/60 text-sm">
                    Select a product to view details
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </section>
  );
};

export default InteractiveProductsSectionV4;

