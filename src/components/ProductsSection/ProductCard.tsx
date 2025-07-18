import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SplitText from '../SplitText';

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
  isTopRow: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  isHovered,
  breatheValue,
  isTopRow,
  onMouseEnter,
  onMouseLeave,
}) => {
  const isTapes = product.title === 'TAPES';
  
  // Breathing effect calculations
  const baseBlur = 20;
  const maxBlur = 30;
  const baseSpread = 15;
  const maxSpread = 20;
  const blur = isHovered ? baseBlur + breatheValue * (maxBlur - baseBlur) : 0;
  const spread = isHovered ? baseSpread + breatheValue * (maxSpread - baseSpread) : 0;

  // Image transform calculations
  const getImageTransform = () => {
    if (index === 1) return 'transform scale-[3.45] -translate-x-0 -translate-y-1/3';
    if (index === 3) return 'transform scaleX(-2.7) scaleY(2.7) translateX(-5.6667%)';
    if (index === 2) return 'transform scaleX(2.145) scaleY(2.145) translateX(2.67%)';
    return 'transform scale-[2.145] -translate-x-2/3';
  };

  const getMobileImageTransform = () => {
    if (index === 1) return 'transform scale-[1.65] -translate-x-0 -translate-y-1/6';
    if (index === 3) return 'transform scaleX(-1.65) scaleY(1.65) translateX(-1%)';
    if (index === 2) return 'transform scaleX(1.575) scaleY(1.575) translateX(0.5%)';
    return 'transform scale-[1.575] -translate-x-1/4';
  };

  const getImageStyle = () => {
    const baseStyle = {
      pointerEvents: 'none' as const,
      filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))' as const,
    };

    if (index === 3) {
      return { ...baseStyle, transform: 'scaleX(-2.7) scaleY(2.7) translateX(-5.6667%)' };
    }
    if (index === 2) {
      return { ...baseStyle, transform: 'scaleX(2.145) scaleY(2.145) translateX(2.67%)' };
    }
    return baseStyle;
  };

  const getMobileImageStyle = () => {
    const baseStyle = {
      pointerEvents: 'none' as const,
      filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.7))' as const,
    };

    if (index === 3) {
      return { ...baseStyle, transform: 'scaleX(-1.65) scaleY(1.65) translateX(-1%)' };
    }
    if (index === 2) {
      return { ...baseStyle, transform: 'scaleX(1.575) scaleY(1.575) translateX(0.5%)' };
    }
    return baseStyle;
  };

  const renderTopRowContent = () => (
    <div className="w-full h-full flex flex-row items-center justify-center">
      <div className="w-2/3 h-2/3 relative z-10">
        <img
          src={product.image}
          alt={product.title}
          className={`w-full h-full object-contain ${getMobileImageTransform()} md:${getImageTransform()}`}
          style={getMobileImageStyle()}
        />
      </div>
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 md:p-6">
          <img
            src={product.hoverImage}
            alt={`${product.title} logo`}
            className="w-64 h-32 md:w-96 md:h-48 object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );

  const renderBottomRowContent = () => {
    if (product.title === "INDUSTRIAL CLEANING") {
      return (
        <div className="w-full h-full flex flex-row items-center justify-center">
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 md:p-6">
              <img
                src={product.hoverImage}
                alt={`${product.title} logo`}
                className="w-64 h-32 md:w-96 md:h-48 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
          <div className="w-2/3 h-2/3 relative z-10">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain transform scale-[1.65] md:scale-[2.145] -translate-x-1/3 scale-x-[-1]"
              style={{
                pointerEvents: 'none',
                filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.7))'
              }}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full flex flex-row items-center justify-center flex-row-reverse">
        <div className="w-2/3 h-2/3 relative z-10">
          <img
            src={product.image}
            alt={product.title}
            className={`w-full h-full object-contain ${getMobileImageTransform()} md:${getImageTransform()}`}
            style={getMobileImageStyle()}
          />
        </div>
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 md:p-6">
            <img
              src={product.hoverImage}
              alt={`${product.title} logo`}
              className="w-64 h-32 md:w-96 md:h-48 object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderHoverContent = () => (
    <motion.div
      className={`absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8 text-center gap-4${isTapes ? ' scale-x-[-1]' : ''}`}
      style={{
        opacity: isHovered ? 1 : 0,
        zIndex: 2,
        transition: 'all 0.3s ease-in-out',
        backgroundColor: '#1b3764'
      }}
    >
      <div className="flex-1 flex items-center justify-center">
        <img
          src={product.hoverImage}
          alt={`${product.title} hover image`}
          className="w-3/4 h-auto max-h-1/2 object-contain"
        />
      </div>
      <motion.span
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <Button className="bg-white hover:bg-white/80 text-[#1b3764] rounded-full px-4 md:px-8 py-2 md:py-4 text-sm md:text-xl">
          LEARN MORE
        </Button>
      </motion.span>
    </motion.div>
  );

  const cardContent = (
    <Card
      className="border-0 shadow-lg rounded-[1rem] md:rounded-[2rem] overflow-hidden transition-all duration-100 hover:scale-[1.02] relative hover:bg-transparent"
      style={{
        backgroundColor: product.color,
        transition: 'box-shadow 0.1s linear',
        boxShadow: isHovered
          ? `0 0 ${blur}px ${spread}px ${product.color}`
          : 'none',
      }}
    >
      <div className={`relative aspect-square w-full${isTapes ? ' scale-x-[-1]' : ''}`}>
        <motion.div
          className={`absolute inset-0 ${isTopRow ? 'flex flex-row items-center' : 'flex flex-col justify-end items-center'}${isTapes ? ' scale-x-[-1]' : ''}`}
          style={{
            opacity: isHovered ? 0 : 1,
            zIndex: 1,
            transition: 'all 0.3s ease-in-out'
          }}
        >
          {isTopRow || index === 2 || index === 3 ? renderTopRowContent() : renderBottomRowContent()}
        </motion.div>
        {renderHoverContent()}
      </div>
    </Card>
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