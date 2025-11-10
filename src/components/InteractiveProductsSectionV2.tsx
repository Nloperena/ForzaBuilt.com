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

const InteractiveProductsSectionV2 = () => {
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
    <section ref={sectionRef} className="relative isolate overflow-visible">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-[#F2611D] to-orange-400 transition-all duration-100 z-50" style={{ width: `${progress}%` }} />
      
      {/* background halves */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-[#f3f5f7]" />
        <div className="bg-gradient-to-r from-[#477197] to-[#2c476e]" />
      </div>

      <div className="relative overflow-visible max-w-6xl mx-auto px-2 md:px-4 lg:px-6">
        {/* Square container - both sides are square */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden aspect-square lg:max-w-4xl lg:mx-auto">
          {/* LEFT SQUARE - Images */}
          <div className="relative aspect-square flex items-center justify-center overflow-hidden">
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
          <div className="relative aspect-square px-[clamp(8px,2vw,16px)] py-[clamp(16px,3vw,28px)] flex items-center justify-center [--gap:clamp(8px,1.5vw,16px)] [--lh-head:1.18] [--lh-head-sm:1.28] [--lh-body:1.7]">
            <div className="w-full relative flex flex-col h-full">
              <div className="flex-1 flex flex-col">
                <div className="flex flex-col justify-evenly h-full flex-shrink-0 gap-1">
                  {products.map((product, index) => (
                    <Link
                      key={index}
                      to={`/products/${product.slug}`}
                      onClick={() => handleProductChange(index)}
                      onMouseEnter={() => handleProductChange(index)}
                      className="w-full text-left transition-all duration-500"
                    >
                      <h3 className={`leading-[var(--lh-head-sm)] md:leading-[var(--lh-head)] tracking-[-0.01em] ${
                        selectedProduct === index
                          ? 'text-[#F2611D] text-[clamp(18px,2.5vw,48px)] font-bold'
                          : 'text-white text-[clamp(14px,2vw,28px)] font-normal'
                      } hover:text-[#F2611D] transition-all duration-500 ease-out ${
                        mode === 'light2' ? 'font-poppins' : 'font-kallisto'
                      }`}>
                        {product.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Button and description fixed at bottom - doesn't move */}
              <div className="mt-auto pt-2 flex-shrink-0 space-y-2">
                <p className={`text-white text-[clamp(11px,0.9vw,16px)] leading-relaxed transition-all duration-500 animate-in fade-in slide-in-from-right-2 ${
                  mode === 'light2' ? 'font-poppins' : ''
                }`} key={selectedProduct}>
                  {products[selectedProduct].description}
                </p>
                <Button asChild className="inline-flex h-8 items-center justify-center rounded-full bg-[#F2611D] px-5 py-2 text-white text-[clamp(11px,0.85vw,14px)] font-medium hover:bg-[#F2611D]/90 shadow-lg">
                  <Link to={`/products/${products[selectedProduct].slug}`}>
                    SEE PRODUCT LINES
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveProductsSectionV2;

