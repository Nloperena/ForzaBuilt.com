import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGradientMode } from '@/contexts/GradientModeContext';

const MSHeroBanner = () => {
  const { mode } = useGradientMode();
  const [isSticky, setIsSticky] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && imageRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Only apply sticky when section is in viewport
        if (sectionRect.top < windowHeight && sectionRect.bottom > 0) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }

        // Calculate parallax offset
        const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - sectionRect.top) / window.innerHeight));
        setParallaxOffset(scrollProgress * 120); // Very strong parallax effect (120px max offset)
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="bg-gray-50 w-full relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        {/* Left side - Text content */}
        <div className="flex items-center justify-center p-8 md:p-20 lg:p-24 bg-gray-50 relative z-10">
          <div className="max-w-2xl w-full">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#2c476e] mb-6 leading-tight font-poppins">
              MS: The Future of
              <br />
              Adhesive Chemistry
            </h3>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed font-poppins">
              Engineered for today's toughest applications, MS technology delivers powerful adhesion, superior flexibility, and lasting durability—without isocyanates, shrinkage, or compromise.
            </p>
            <Link
              to="/products/ms"
              className="inline-block bg-[#F2611D] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#E05A17] transition-colors uppercase tracking-wide"
            >
              Learn More
            </Link>
          </div>
        </div>
        
        {/* Right side - Sticky Image */}
        <div ref={imageRef} className={`relative w-full h-[676px] lg:h-auto min-h-[676px] transition-transform duration-300 ${isSticky ? 'lg:sticky lg:top-0' : ''} overflow-hidden`}>
          <img
            ref={imgRef}
            src="/MS Page Images/Forza MS Page Header.jpg"
            alt="MS Technology - Industrial Adhesive Mixing"
            className="w-full h-full object-cover"
            style={{
              transform: `scale(1.3) translateY(${parallaxOffset}px)`,
              transition: 'transform 0.1s ease-out',
              objectPosition: 'center 30%'
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/MS Page Images/MS Construction.jpg';
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default MSHeroBanner;

