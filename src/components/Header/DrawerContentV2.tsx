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
    <div className="w-full max-w-[1600px] mx-auto px-0 py-0">
      <div className="grid grid-cols-6 bg-[#2c476e] shadow-xl">
        {industriesData.map((industry, index) => (
          <Link
            key={industry.title}
            to={`/industries/${industry.title.toLowerCase().replace(/ /g, '-')}`}
            className="group relative flex flex-col items-center justify-center py-6 lg:py-7 text-white transition-colors hover:bg-[#F2611D]"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.25 }}
              className="flex flex-col items-center justify-center"
            >
              <img src={industry.logo} alt={`${industry.title} Logo`} className="w-12 h-12 object-contain mb-3" />
              <span className="font-poppins text-lg font-normal group-hover:font-bold">
                {industry.title.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
              </span>
            </motion.div>
            {index < industriesData.length - 1 && (
              <span className="absolute right-0 top-3 bottom-3 w-px bg-white/20" aria-hidden />
            )}
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
      <div className="w-full max-w-[1200px] mx-auto px-0 py-0">
        <div className="grid grid-cols-4 bg-[#2c476e] shadow-xl">
          {products.map((product, index) => (
            <Link
              key={product.title}
              to={product.link}
              className="group relative flex items-center justify-center py-5 lg:py-6 text-white transition-colors hover:bg-[#F2611D]"
            >
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04, duration: 0.25 }}
                className="font-poppins text-xl font-normal group-hover:font-bold"
              >
                {product.title}
              </motion.span>
              {index < products.length - 1 && (
                <span className="absolute right-0 top-3 bottom-3 w-px bg-white/20" aria-hidden />
              )}
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

