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
  const [overlayProducts, setOverlayProducts] = useState<DBProduct[]>([]);
  const [selectedOverlayProduct, setSelectedOverlayProduct] = useState<DBProduct | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const progressIntervalRef = useRef<NodeJS.Timeout>();
  const isUserInteractingRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    } catch (error) {
      console.error('Failed to load overlay products:', error);
    }
  };

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

        {/* Product Overlay - Positioned over right side, animated in */}
        {showOverlay && (
          <div className="absolute top-0 right-0 bottom-0 w-full lg:w-1/2 bg-gradient-to-br from-[#477197] to-[#2c476e] overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-right duration-500 z-40">
            {/* Header with Logo and Close Button */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-4">
                <img 
                  src="/logos/Forza-Eagle-Logo-White.svg"
                  alt="Forza Logo"
                  className="h-16 w-auto"
                />
              </div>
              <button
                onClick={() => setShowOverlay(false)}
                className="text-white hover:text-white/70 transition-colors p-2 hover:bg-white/10 rounded-lg flex-shrink-0"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content Grid - Two Columns */}
            <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Left - Product List */}
              <div className="overflow-y-auto border-r border-white/10 bg-[#1b3764]/40 p-4">
                <h3 className={`text-base font-bold text-white mb-3 ${mode === 'light2' ? 'font-poppins' : 'font-kallisto'}`}>
                  {products[selectedProduct].title}
                </h3>
                <div className="space-y-2">
                  {overlayProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => setSelectedOverlayProduct(product)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 ${
                        selectedOverlayProduct?.id === product.id
                          ? 'bg-[#F2611D] text-white font-semibold'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <p className={`text-xs truncate ${mode === 'light2' ? 'font-poppins' : ''}`}>
                        {product.name || product.productCode}
                      </p>
                      {product.productCode && (
                        <p className="text-xs text-white/60 truncate">{product.productCode}</p>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right - Product Details */}
              <div className="overflow-y-auto p-4 flex flex-col bg-[#1b3764]/20">
                {selectedOverlayProduct ? (
                  <>
                    {/* Product Header */}
                    <div className="mb-4">
                      <h3 className={`text-lg font-bold text-white mb-1 ${mode === 'light2' ? 'font-poppins' : 'font-kallisto'}`}>
                        {selectedOverlayProduct.name}
                      </h3>
                      {selectedOverlayProduct.productCode && (
                        <p className="text-[#F2611D] font-semibold text-xs">{selectedOverlayProduct.productCode}</p>
                      )}
                    </div>

                    {/* Product Image Thumbnail */}
                    {selectedOverlayProduct?.imageUrl && (
                      <div className="mb-4 rounded-lg overflow-hidden bg-[#0f2132] h-32 flex items-center justify-center flex-shrink-0">
                        <img 
                          src={selectedOverlayProduct.imageUrl}
                          alt={selectedOverlayProduct.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}

                    {/* Product Description */}
                    <div className="space-y-3 flex-1 text-xs">
                      {selectedOverlayProduct.description && (
                        <p className={`text-white/90 leading-relaxed ${mode === 'light2' ? 'font-poppins' : ''}`}>
                          {selectedOverlayProduct.description}
                        </p>
                      )}

                      {/* Key Features */}
                      {selectedOverlayProduct.features && selectedOverlayProduct.features.length > 0 && (
                        <div>
                          <h4 className={`text-xs font-bold text-white mb-1 ${mode === 'light2' ? 'font-poppins' : 'font-kallisto'}`}>
                            Features
                          </h4>
                          <ul className="space-y-1">
                            {selectedOverlayProduct.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className={`text-white/80 flex items-start gap-1 ${mode === 'light2' ? 'font-poppins' : ''}`}>
                                <span className="text-[#F2611D] font-bold flex-shrink-0">•</span>
                                <span className="text-xs">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Chemistry */}
                      {selectedOverlayProduct.chemistry && (
                        <div>
                          <h4 className={`text-xs font-semibold text-[#F2611D] mb-1 ${mode === 'light2' ? 'font-poppins' : 'font-kallisto'}`}>
                            Chemistry: {selectedOverlayProduct.chemistry}
                          </h4>
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Link 
                      to={`/products/${selectedOverlayProduct.productCode?.toLowerCase().replace(/\s+/g, '-') || 'product'}`}
                      className="mt-4 inline-block px-3 py-2 bg-[#F2611D] text-white rounded-full font-semibold text-xs hover:bg-[#F2611D]/90 transition-colors text-center flex-shrink-0"
                    >
                      View Details
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-white/60 text-xs">
                    Select a product
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

