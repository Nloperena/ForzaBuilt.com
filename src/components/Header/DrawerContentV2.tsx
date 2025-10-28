import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { industries as industriesData } from '@/data/industries';

interface DrawerContentV2Props {
  activeContent: string | null;
  slideDirection: number;
}

const DrawerContentV2: React.FC<DrawerContentV2Props> = ({
  activeContent,
  slideDirection,
}) => {
  
  const renderIndustriesContent = () => (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
        {industriesData.map((industry, index) => (
          <Link
            key={industry.title}
            to={`/industries/${industry.title.toLowerCase().replace(/ /g, '-')}`}
            className="group relative"
          >
            {/* Premium Card with Glass Morphism */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:scale-105"
            >
              {/* Card Content */}
              <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[120px] sm:min-h-[140px]">
                {/* Industry Icon */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4 flex items-center justify-center">
                  <img 
                    src={industry.logo} 
                    alt={`${industry.title} Logo`} 
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                
                {/* Title */}
                <h3 className="text-white text-lg sm:text-xl font-bold font-poppins group-hover:text-[#F2611D] transition-colors px-2 whitespace-normal break-words">
                  {industry.title}
                </h3>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );

  const renderProductsContent = () => {
    const products = [
      {
        title: 'Adhesives',
        subtitle: 'BOND',
        logo: '/products/brand-logos/product-line-brands-white-bond.svg',
        link: '/products/bond',
        description: 'High-performance bonding solutions'
      },
      {
        title: 'Sealants',
        subtitle: 'SEAL',
        logo: '/products/brand-logos/product-line-brands-white-seal.svg',
        link: '/products/seal',
        description: 'Premium sealing & protection'
      },
      {
        title: 'Tapes',
        subtitle: 'TAPE',
        logo: '/products/brand-logos/product-line-brands-white-tape.svg',
        link: '/products/tape',
        description: 'Specialty adhesive tapes'
      },
      {
        title: 'Cleaners',
        subtitle: 'CLEANERS',
        logo: '/products/brand-logos/product-line-brands-white-ruggedred.svg',
        link: '/products/ruggedred',
        description: 'Professional grade cleaners'
      }
    ];

    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <Link
              key={product.title}
              to={product.link}
              className="group relative"
            >
              {/* Premium Large Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="relative overflow-visible rounded-2xl sm:rounded-3xl bg-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:scale-105"
              >
                {/* Card Content */}
                <div className="p-8 sm:p-10 lg:p-12 flex flex-col items-center justify-center text-center min-h-[120px] sm:min-h-[130px]">
                  {/* Title */}
                  <h3 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold font-poppins group-hover:text-[#F2611D] transition-colors leading-tight px-4 whitespace-normal break-words">
                    {product.title}
                  </h3>
                </div>
                
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeContent) {
      case 'industries':
        return renderIndustriesContent();
      case 'products':
        return renderProductsContent();
      default:
        return null;
    }
  };

  return (
    <AnimatePresence initial={false} custom={slideDirection}>
      <motion.div
        key={activeContent}
        custom={slideDirection}
        initial="enter"
        animate="center"
        exit="exit"
        variants={{
          enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
          center: { x: 0, opacity: 1 },
          exit: (direction: number) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0 }),
        }}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {renderContent()}
      </motion.div>
    </AnimatePresence>
  );
};

export default DrawerContentV2;

