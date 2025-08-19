import React from 'react';

const ProductsHeader: React.FC = () => {
  return (
    <>
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-7xl font-black text-white mb-2 sm:mb-3 font-kallisto leading-none break-words">
          Our Products
        </h2>
      </div>
      <div className="text-center mb-6 sm:mb-8">
        <p className="text-sm sm:text-base md:text-lg font-light max-w-4xl mx-auto px-2 sm:px-4">
          We offer the best performing and widest range of adhesive, sealant, specialty tape, and industrial cleaning solutions, including customization and environmentally friendly technologies. If we don't have it, we'll make it custom for you!
        </p>
      </div>
    </>
  );
};

export default ProductsHeader; 