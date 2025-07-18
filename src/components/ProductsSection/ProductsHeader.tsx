import React from 'react';
import SplitText from '../SplitText';

const ProductsHeader: React.FC = () => {
  return (
    <>
      <div className="text-center mb-4 sm:mb-6 md:mb-8">
        <SplitText
          text="Our Products"
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-8xl font-extrabold text-white mb-2 md:mb-4 font-kallisto"
          splitType="words"
          delay={50}
        />
      </div>
      <div className="text-center">
        <SplitText
          text="We offer the best performing and widest range of adhesive, sealant, specialty tape, and industrial cleaning solutions, including customization and environmentally friendly technologies. If we don't have it, we'll make it custom for you!"
          className="text-xs sm:text-sm md:text-lg mb-4 sm:mb-6 md:mb-8 font-light max-w-4xl mx-auto px-2 sm:px-4 md:px-0"
          splitType="words"
          delay={10}
          duration={0.4}
        />
      </div>
    </>
  );
};

export default ProductsHeader; 