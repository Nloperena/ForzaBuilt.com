import React from 'react';
import SplitText from '../SplitText';

const ProductsHeader: React.FC = () => {
  return (
    <>
      <div className="text-center">
        <SplitText
          text="Our Products"
          className="text-5xl md:text-8xl font-extrabold text-white mb-4 font-kallisto"
          splitType="words"
          delay={50}
        />
      </div>
      <div className="text-center">
        <SplitText
          text="We offer the best performing and widest range of adhesive, sealant, specialty tape, and industrial cleaning solutions, including customization and environmentally friendly technologies. If we don't have it, we'll make it custom for you!"
          className="text-lg mb-8 font-light max-w-4xl mx-auto"
          splitType="words"
          delay={10}
          duration={0.4}
        />
      </div>
    </>
  );
};

export default ProductsHeader; 