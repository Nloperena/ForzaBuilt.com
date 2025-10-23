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
    description: "Discover our premium industrial adhesive solutions engineered for performance and reliability across all industries.",
    image: "/ProductHeroPhotos-Homepage/Forza Bond Hero Shot.jpg",
    slug: "bond"
  },
  {
    title: "SEALANTS", 
    description: "Discover our premium industrial seal solutions engineered for performance and reliability across all industries.",
    image: "/ProductHeroPhotos-Homepage/Forza Seal Hero Shot.jpg",
    slug: "seal"
  },
  {
    title: "TAPES",
    description: "Discover our premium industrial tape solutions engineered for performance and reliability across all industries.",
    image: "/ProductHeroPhotos-Homepage/Forza Tape Hero Shot.jpg",
    slug: "tape"
  },
  {
    title: "CLEANERS",
    description: "Discover our premium industrial cleaning solutions engineered for performance and reliability across all industries.",
    image: "/ProductHeroPhotos-Homepage/Forza Cleaners Hero Shot.jpg",
    slug: "ruggedred"
  }
];

const InteractiveProductsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [previousProduct, setPreviousProduct] = useState(0);
  const { mode } = useGradientMode();
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();
  const progressIntervalRef = useRef<NodeJS.Timeout>();
  const isUserInteractingRef = useRef(false);

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

  return (
    <section className="relative isolate overflow-visible">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-[#F2611D] to-orange-400 transition-all duration-100 z-50" style={{ width: `${progress}%` }} />
      
      {/* background halves */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-gradient-to-r from-[#477197] to-[#2c476e]" />
        <div className="bg-[#f3f5f7]" />
      </div>

      <div className="relative overflow-visible">
        {/* two scalable squares */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
          {/* LEFT SQUARE */}
          <div className="
            relative
            min-h-[62svh] md:min-h-[68svh] lg:min-h-[74svh]
            px-[clamp(14px,4vw,32px)] py-[clamp(32px,6vw,64px)]
            flex items-center justify-center
            [--gap:clamp(12px,2.4vw,24px)] [--lh-head:1.18] [--lh-head-sm:1.28] [--lh-body:1.7]
          ">
            <div className="w-full">
              <div className="space-y-[var(--gap)] mb-[var(--gap)]">
                {products.map((product, index) => (
                  <button
                    key={index}
                    onClick={() => handleProductChange(index)}
                    className="w-full text-left transition-all duration-500"
                  >
                    <h3 className={`leading-[var(--lh-head-sm)] md:leading-[var(--lh-head)] tracking-[-0.01em] ${
                      selectedProduct === index
                        ? 'text-[#F2611D] text-[clamp(28px,4vw,128px)] font-bold'
                        : 'text-white text-[clamp(22px,3.2vw,48px)] font-normal'
                    } hover:text-[#F2611D] transition-all duration-500 ease-out ${
                      mode === 'light2' ? 'font-poppins' : 'font-kallisto'
                    }`}>
                      {product.title}
                    </h3>
                  </button>
                ))}
              </div>

              <p className={`text-white text-[clamp(14px,1.25vw,24px)] leading-relaxed mb-[calc(var(--gap)*0.9)] transition-all duration-500 animate-in fade-in slide-in-from-left-2 ${
                mode === 'light2' ? 'font-poppins' : ''
              }`} key={selectedProduct}>
                {products[selectedProduct].description}
              </p>

              <Button asChild className="inline-flex h-10 items-center justify-center rounded-full bg-[#F2611D] px-7 py-3.5 text-white text-[clamp(14px,1.1vw,18px)] font-medium hover:bg-[#F2611D]/90 shadow-lg mt-[calc(var(--gap)*0.2)]">
                <Link to={`/products/${products[selectedProduct].slug}`}>
                  SEE PRODUCTS
                </Link>
              </Button>
            </div>
          </div>

          {/* RIGHT SQUARE */}
          <div className="
            relative
            min-h-[62svh] md:min-h-[68svh] lg:min-h-[74svh]
            flex items-center justify-center
            overflow-hidden
          ">
            {/* subtle radial depth */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04)_0%,transparent_70%)] z-20" />

            {/* label group (invisible for SEO, accessible to screen readers) */}
            <div className="absolute top-[clamp(16px,2.6vw,40px)] right-[clamp(16px,2.6vw,40px)] text-right select-none [--lh-label:1.22] opacity-0 pointer-events-none z-20" aria-hidden="false">
              <div className={`font-bold text-white text-[clamp(18px,1.6vw,24px)] ${
                mode === 'light2' ? 'font-poppins' : 'font-kallisto'
              }`}>
                <span className="leading-[var(--lh-label)] tracking-[-0.01em]">Forza</span>
              </div>
              <div className={`font-bold text-[#F2611D] text-[clamp(16px,1.4vw,22px)] ${
                mode === 'light2' ? 'font-poppins' : 'font-kallisto'
              }`}>
                <span className="leading-[var(--lh-label)] tracking-[-0.01em]">{products[selectedProduct].title === 'SEALANTS' ? 'SEAL' : products[selectedProduct].title}</span>
              </div>
              <div className={`text-white text-[clamp(10px,0.95vw,14px)] ${
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
                transform: 'translateZ(0) scale(1.05)'
              }}
            />

            {/* Current product image (slides over) */}
            <img
              key={selectedProduct}
              src={products[selectedProduct].image}
              alt={products[selectedProduct].title}
              className="
                absolute inset-0 w-full h-full object-cover
                animate-in slide-in-from-left duration-700
              "
              style={{
                objectPosition: 'center 70%',
                transform: 'translateZ(0) scale(1.05)'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveProductsSection;
