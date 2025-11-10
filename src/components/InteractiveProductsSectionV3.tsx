import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGradientMode } from '@/contexts/GradientModeContext';

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

const InteractiveProductsSectionV3 = () => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [previousProduct, setPreviousProduct] = useState(0);
  const { mode } = useGradientMode();
  const [progress, setProgress] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();
  const progressIntervalRef = useRef<NodeJS.Timeout>();
  const isUserInteractingRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleProductChange = (index: number) => {
    if (index !== selectedProduct) {
      setPreviousProduct(selectedProduct);
      setSelectedProduct(index);
      setProgress(0);
      isUserInteractingRef.current = true;
      // Reset auto-cycle after user interaction
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      timerRef.current = setTimeout(() => {
        isUserInteractingRef.current = false;
      }, 8000);
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

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden w-full">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-[#F2611D] to-orange-400 transition-all duration-100 z-50" style={{ width: `${progress}%` }} />
      
      {/* Edge-to-edge grid - two squares side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full lg:aspect-[10/7]">
        {/* LEFT SQUARE - Images */}
        <div className="relative w-full aspect-square lg:aspect-[10/7] flex items-center justify-center overflow-hidden bg-[#f3f5f7]">
          {/* subtle radial depth */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04)_0%,transparent_70%)] z-20" />

          {/* label group (invisible for SEO, accessible to screen readers) */}
          <div className="absolute top-[clamp(8px,1.5vw,16px)] left-[clamp(8px,1.5vw,16px)] text-left select-none [--lh-label:1.22] opacity-0 pointer-events-none z-20" aria-hidden="false">
            <div className={`font-bold text-white text-[clamp(14px,1.2vw,18px)] ${
              mode === 'light2' ? 'font-poppins' : 'font-kallisto'
            }`}>
              <span className="leading-[var(--lh-label)] tracking-[-0.01em]">Forza</span>
            </div>
            <div className={`font-bold text-[#F2611D] text-[clamp(12px,1vw,16px)] ${
              mode === 'light2' ? 'font-poppins' : 'font-kallisto'
            }`}>
              <span className="leading-[var(--lh-label)] tracking-[-0.01em]">{products[selectedProduct].title === 'SEALANTS' ? 'SEAL' : products[selectedProduct].title}</span>
            </div>
            <div className={`text-white text-[clamp(8px,0.7vw,11px)] ${
              mode === 'light2' ? 'font-poppins' : ''
            }`}>
              A FORCE TO BE RECKONED WITH
            </div>
          </div>

          {/* Previous product image (stays in place) */}
          <img
            src={products[previousProduct].image}
            alt={products[previousProduct].title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: 'center 70%',
              transform: `translateZ(0) scale(1.05) translateY(${parallaxOffset}px)`
            }}
          />

          {/* Current product image (slides over) */}
          <img
            key={selectedProduct}
            src={products[selectedProduct].image}
            alt={products[selectedProduct].title}
            className="
              absolute inset-0 w-full h-full object-cover
              animate-in slide-in-from-right duration-700
            "
            style={{
              objectPosition: 'center 70%',
              transform: `translateZ(0) scale(1.05) translateY(${parallaxOffset}px)`
            }}
          />
        </div>

        {/* RIGHT SQUARE - Titles and description with blue background */}
        <div className="relative w-full aspect-square lg:aspect-[10/7] px-[clamp(20px,3.5vw,40px)] py-[clamp(20px,3.5vw,40px)] flex items-center justify-center bg-gradient-to-r from-[#477197] to-[#2c476e]">
          <div className="w-full relative flex flex-col h-full justify-between">
            {/* Product list - takes up most of the space with dynamic spacing */}
            <div className="flex-1 flex flex-col justify-center min-h-0">
              <div className="flex flex-col justify-around h-full" style={{ gap: 'clamp(12px, 2.5vw, 32px)' }}>
                {products.map((product, index) => (
                  <Link
                    key={index}
                    to={`/products/${product.slug}`}
                    onClick={() => handleProductChange(index)}
                    onMouseEnter={() => handleProductChange(index)}
                    className="w-full text-left transition-all duration-500"
                    style={{
                      flex: selectedProduct === index ? '1.2' : '1'
                    }}
                  >
                    <h3 className={`leading-tight tracking-[-0.01em] ${
                      selectedProduct === index
                        ? 'text-[#F2611D] font-bold'
                        : 'text-white font-normal'
                    } hover:text-[#F2611D] transition-all duration-500 ease-out ${
                      mode === 'light2' ? 'font-poppins' : 'font-kallisto'
                    }`}
                    style={{
                      fontSize: selectedProduct === index 
                        ? 'clamp(24px, 5vw, 72px)'
                        : 'clamp(18px, 3.5vw, 48px)',
                      lineHeight: '1.1'
                    }}>
                      {product.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>

            {/* Button and description fixed at bottom with dynamic spacing */}
            <div className="flex-shrink-0" style={{ 
              paddingTop: 'clamp(16px, 2.5vw, 32px)',
              gap: 'clamp(12px, 2vw, 24px)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <p className={`text-white leading-relaxed transition-all duration-500 animate-in fade-in slide-in-from-right-2 ${
                mode === 'light2' ? 'font-poppins' : ''
              }`} 
              style={{
                fontSize: 'clamp(14px, 1.8vw, 28px)',
                lineHeight: '1.6'
              }}
              key={selectedProduct}>
                {products[selectedProduct].description}
              </p>
              <Button asChild className="inline-flex items-center justify-center rounded-full bg-[#F2611D] text-white font-medium hover:bg-[#F2611D]/90 shadow-lg"
              style={{
                height: 'clamp(36px, 3.5vw, 52px)',
                paddingLeft: 'clamp(20px, 2.5vw, 32px)',
                paddingRight: 'clamp(20px, 2.5vw, 32px)',
                fontSize: 'clamp(14px, 1.4vw, 20px)',
                alignSelf: 'flex-start'
              }}>
                <Link to={`/products/${products[selectedProduct].slug}`}>
                  SEE PRODUCT LINES
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveProductsSectionV3;

