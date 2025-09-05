import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Product {
  title: string;
  fullTitle: string;
  image: string;
  hoverImage: string;
  color: string;
  slug?: string;
  external?: boolean;
  link?: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
  isHovered: boolean;
  breatheValue: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  isHovered,
  breatheValue,
  onMouseEnter,
  onMouseLeave,
}) => {
  const isTapes = product.title === 'TAPE';
  const isRuggedRed = product.title === 'RUGGED RED';
  
  // Get product display title
  const getDisplayTitle = () => {
    switch (product.title) {
      case 'BOND':
        return 'INDUSTRIAL ADHESIVES';
      case 'SEAL':
        return 'INDUSTRIAL SEALANTS';
      case 'TAPE':
        return 'INDUSTRIAL TAPES';
      case 'RUGGED RED':
        return 'INDUSTRIAL\nCLEANING';
      default:
        return product.title;
    }
  };

  // Image transform calculations based on product
  const getImageTransform = () => {
    switch (product.title) {
      case 'BOND':
        return 'transform scale-[1.43] -translate-x-2/3';
      case 'SEAL':
        return 'transform scale-[2.3] -translate-x-0 -translate-y-1/3';
      case 'RUGGED RED':
        return 'transform scaleX(-1.8) scaleY(1.8) translateX(-5.6667%)';
      case 'TAPE':
        return 'transform scale-[1.43] -translate-x-2/3';
      default:
        return 'transform scale-[1.43] -translate-x-2/3';
    }
  };

  const getImageStyle = () => {
    const baseStyle = {
      pointerEvents: 'none' as const,
      filter: 'drop-shadow(rgba(0, 0, 0, 0.7) 0px 8px 32px)' as const,
    };

    switch (product.title) {
      case 'BOND':
        return { ...baseStyle, transform: 'scale(1.43) translateX(-66.67%)' };
      case 'SEAL':
        return { ...baseStyle, transform: 'scale(2.3) translateX(0) translateY(-33.33%)' };
      case 'RUGGED RED':
        return { ...baseStyle, transform: 'scaleX(-1.8) scaleY(1.8) translateX(-5.67%)' };
      case 'TAPE':
        return { ...baseStyle, transform: 'scale(1.43) translateX(-66.67%)' };
      default:
        return baseStyle;
    }
  };

  const getTitlePosition = () => {
    switch (product.title) {
      case 'BOND':
      case 'SEAL':
        return 'flex items-center justify-start pl-8 sm:pl-16';
      case 'RUGGED RED':
        return 'flex items-center justify-start pl-8 sm:pl-16';
      case 'TAPE':
        return 'flex items-center justify-end pr-8 sm:pr-16';
      default:
        return 'flex items-center justify-start pl-8 sm:pl-16';
    }
  };

  const renderMainContent = () => (
    <div className="absolute inset-0 flex flex-row items-center" style={{ opacity: isHovered ? 0 : 1, zIndex: 1, transition: '0.3s ease-in-out' }}>
      <div className="w-full h-full flex flex-row items-center justify-center">
        <div className="w-2/3 h-2/3 relative z-10">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
            style={getImageStyle()}
          />
        </div>
        <div className={`absolute inset-0 z-10 ${getTitlePosition()}`}>
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-black text-white font-kallisto text-center drop-shadow-2xl whitespace-pre-line leading-tight">
            {getDisplayTitle()}
          </h3>
        </div>
      </div>
    </div>
  );

  const renderHoverContent = () => (
    <div 
      className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-center gap-2${isRuggedRed ? ' scale-x-[-1]' : ''}`}
      style={{ 
        opacity: isHovered ? 1 : 0, 
        zIndex: 2, 
        transition: '0.3s ease-in-out', 
        backgroundColor: '#1b3764' 
      }}
    >
      <img
        src={product.hoverImage}
        alt={`${product.title} hover image`}
        className="w-full object-contain"
      />
      <span style={{ opacity: 0, transform: 'translateY(20px)', transition: '0.3s ease-in-out' }}>
        <Button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-8 sm:h-10 bg-[#F2611D] hover:bg-[#F2611D]/80 text-white rounded-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-xl border border-[#F2611D]">
          LEARN MORE
        </Button>
      </span>
    </div>
  );

  const cardContent = (
    <div 
      className="bg-card text-card-foreground border-0 shadow-lg rounded-[1rem] sm:rounded-[2rem] overflow-hidden transition-all duration-100 hover:scale-[1.02] relative hover:bg-transparent"
      style={{
        backgroundColor: product.color,
        transition: 'box-shadow 0.1s linear',
        boxShadow: 'none',
      }}
    >
      <div className={`relative aspect-square w-full${isRuggedRed ? ' scale-x-[-1]' : ''}`}>
        {renderMainContent()}
        {renderHoverContent()}
      </div>
    </div>
  );

  if (product.external) {
    return (
      <a
        href={product.link}
        className="group"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {cardContent}
    </Link>
  );
};

export default ProductCard; 