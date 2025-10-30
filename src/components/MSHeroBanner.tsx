import React from 'react';
import { Link } from 'react-router-dom';
import { useGradientMode } from '@/contexts/GradientModeContext';

const MSHeroBanner = () => {
  const { mode } = useGradientMode();

  return (
    <section className="bg-white w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        {/* Left side - Text content */}
        <div className="flex items-center justify-center p-8 md:p-12 lg:p-16 bg-gray-50">
          <div className="max-w-2xl w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2c476e] mb-6 leading-tight font-poppins">
              MS: The Future of
              <br />
              Adhesive Chemistry
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed font-poppins">
              Engineered for today's toughest applications, MS technology delivers powerful adhesion, superior flexibility, and lasting durability—without isocyanates, shrinkage, or compromise.
            </p>
            <Link
              to="/products/ms"
              className="inline-block bg-[#F2611D] text-white font-semibold px-8 py-4 rounded-md hover:bg-[#E05A17] transition-colors uppercase tracking-wide"
            >
              Learn More
            </Link>
          </div>
        </div>
        
        {/* Right side - Image */}
        <div className="relative w-full h-[400px] lg:h-auto min-h-[400px]">
          <img
            src="/MS Page Images/Forza MS Page Header.jpg"
            alt="MS Technology - Industrial Adhesive Mixing"
            className="w-full h-full object-cover"
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

