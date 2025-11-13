import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGradientMode } from '@/contexts/GradientModeContext';
import { motion, AnimatePresence } from 'framer-motion';

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

const InteractiveProductsSectionV6 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { mode } = useGradientMode();
  const timerRef = useRef<NodeJS.Timeout>();

  // Auto-cycling logic
  useEffect(() => {
    if (!isLocked && !isHovering) {
      timerRef.current = setInterval(() => {
        setActiveIndex(prevIndex => (prevIndex + 1) % products.length);
      }, 4000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isLocked, isHovering]);

  const handleMouseEnter = (index: number) => {
    if (isLocked) return; // Completely disable hover when locked
    setIsHovering(true);
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    if (isLocked) return; // Completely disable hover when locked
    setIsHovering(false);
  };

  const handleClick = (index: number) => {
    setActiveIndex(index);
    setIsLocked(true);
  };

  const activeProduct = products[activeIndex];

  return (
    <section className="relative z-20">
      <section className="relative isolate overflow-visible">
        <div className="pointer-events-none absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-[#f3f5f7]"></div>
          <div className="bg-gradient-to-r from-[#477197] to-[#2c476e]"></div>
        </div>

        <div className="relative overflow-visible">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
            {/* LEFT SIDE - Images */}
            <div className="relative min-h-[35svh] sm:min-h-[42svh] md:min-h-[45svh] lg:min-h-[43svh] xl:min-h-[60svh] 2xl:min-h-[65svh] flex items-center justify-center overflow-hidden">
              <AnimatePresence>
                <motion.img
                  key={activeIndex}
                  src={activeProduct.image}
                  alt={activeProduct.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: 'center 70%' }}
                />
              </AnimatePresence>
            </div>

            {/* RIGHT SIDE - Titles, description, and button */}
            <div className="relative min-h-[35svh] sm:min-h-[42svh] md:min-h-[45svh] lg:min-h-[43svh] xl:min-h-[60svh] 2xl:min-h-[65svh] px-[clamp(14px,4vw,32px)] py-[clamp(24px,4vw,48px)] flex items-center justify-center">
              <div className="w-full relative flex flex-col h-full">
                <div className="flex-1 flex flex-col">
                  <div className="flex flex-col justify-evenly h-full flex-shrink-0">
                    {products.map((product, index) => {
                      const isActive = activeIndex === index;
                      
                      return (
                        <div
                          key={index}
                          onClick={() => handleClick(index)}
                          onMouseEnter={isLocked ? undefined : () => handleMouseEnter(index)}
                          onMouseLeave={isLocked ? undefined : handleMouseLeave}
                          className="w-full text-left transition-all duration-500 cursor-pointer"
                        >
                          <h3 className={`leading-tight tracking-[-0.01em] transition-all duration-500 ease-out ${
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

                <div className="mt-auto pt-4 flex-shrink-0 space-y-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className={`text-white text-[clamp(14px,1.25vw,24px)] leading-relaxed ${
                        mode === 'light2' ? 'font-poppins' : ''
                      }`}>
                        {activeProduct.description}
                      </p>
                      <Button asChild className="mt-4 gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 inline-flex h-10 items-center justify-center rounded-full bg-[#F2611D] px-7 py-3.5 text-white text-[clamp(14px,1.1vw,18px)] font-medium hover:bg-[#F2611D]/90 shadow-lg">
                        <Link to={`/products/${activeProduct.slug}`}>
                          Browse Products
                        </Link>
                      </Button>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default InteractiveProductsSectionV6;
