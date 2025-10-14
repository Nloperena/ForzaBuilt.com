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
    image: "/Bond Heroic Image 1.png",
    slug: "bond"
  },
  {
    title: "SEALANTS", 
    description: "Discover our premium industrial seal solutions engineered for performance and reliability across all industries.",
    image: "/Seal Heroic Image 1.png",
    slug: "seal"
  },
  {
    title: "TAPES",
    description: "Discover our premium industrial tape solutions engineered for performance and reliability across all industries.",
    image: "/Tape Heroic Image 1.png",
    slug: "tape"
  },
  {
    title: "CLEANERS",
    description: "Discover our premium industrial cleaning solutions engineered for performance and reliability across all industries.",
    image: "/assets/images/RR Hand Spraying.png",
    slug: "ruggedred"
  }
];

const InteractiveProductsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const { mode } = useGradientMode();
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = -rect.top;
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate overflow-visible">
      {/* background halves */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-[#293350]" />
        <div className="bg-[#f3f5f7]" />
      </div>

      <div className="relative mx-auto px-6 sm:px-8 lg:px-10 2xl:px-14 py-8 md:py-12 overflow-visible">
        {/* two scalable squares */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-visible">
          {/* LEFT SQUARE */}
          <div className="
            relative
            min-h-[62svh] md:min-h-[68svh] lg:min-h-[74svh]
            p-[clamp(14px,4vw,32px)]
            flex items-center justify-center
            [--gap:clamp(12px,2.4vw,24px)] [--lh-head:1.18] [--lh-head-sm:1.28] [--lh-body:1.7]
          ">
            <div className="w-full">
              <div className="space-y-[var(--gap)] mb-[var(--gap)]">
                {products.map((product, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedProduct(index)}
                    className="w-full text-left transition-all duration-300"
                  >
                    <h3 className={`font-normal leading-[var(--lh-head-sm)] md:leading-[var(--lh-head)] tracking-[-0.01em] ${
                      selectedProduct === index
                        ? 'text-[#F2611D] text-[clamp(28px,4vw,64px)]'
                        : 'text-white text-[clamp(22px,3.2vw,48px)]'
                    } hover:text-[#F2611D] transition-colors duration-300 ${
                      mode === 'light2' ? 'font-poppins' : 'font-kallisto'
                    }`}>
                      {product.title}
                    </h3>
                  </button>
                ))}
              </div>

              <p className={`text-white text-[clamp(14px,1.25vw,18px)] leading-[var(--lh-body)] mb-[calc(var(--gap)*0.9)] ${
                mode === 'light2' ? 'font-poppins' : ''
              }`}>
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
            p-[clamp(14px,4vw,32px)] pr-[clamp(12px,3.5vw,40px)]
            flex items-center justify-center
            overflow-visible
          " style={{ overflow: 'visible' }}>
            {/* subtle radial depth */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04)_0%,transparent_70%)]" />

            {/* label group (kept, but centered within the square) */}
            <div className="absolute top-[clamp(16px,2.6vw,40px)] right-[clamp(16px,2.6vw,40px)] text-right select-none [--lh-label:1.22] hidden sm:block">
              <div className={`font-bold text-white text-[clamp(18px,1.6vw,24px)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
                mode === 'light2' ? 'font-poppins' : 'font-kallisto'
              }`}>
                <span className="leading-[var(--lh-label)] tracking-[-0.01em]">Forza</span>
              </div>
              <div className={`font-bold text-[#F2611D] text-[clamp(16px,1.4vw,22px)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
                mode === 'light2' ? 'font-poppins' : 'font-kallisto'
              }`}>
                <span className="leading-[var(--lh-label)] tracking-[-0.01em]">{products[selectedProduct].title === 'SEALANTS' ? 'SEAL' : products[selectedProduct].title}</span>
              </div>
              <div className={`text-white text-[clamp(10px,0.95vw,14px)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${
                mode === 'light2' ? 'font-poppins' : ''
              }`}>
                A FORCE TO BE RECKONED WITH
              </div>
            </div>

            {/* product image */}
            <img
              src={products[selectedProduct].image}
              alt={products[selectedProduct].title}
              className="
                block w-auto object-contain
                max-h-[min(62svh,32rem)] md:max-h-[min(66svh,36rem)] lg:max-h-[min(70svh,42rem)]
                max-w-[min(90vw,800px)]
                drop-shadow-2xl
                opacity-0 translate-y-3 transition-all duration-700 will-change-transform
                data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0
              "
              data-inview="true" /* toggle this in your intersection observer */
              style={{
                transform: `translateY(${scrollY * 0.3}px)`,
                transition: 'transform 0.1s ease-out'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveProductsSection;
