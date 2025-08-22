import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/data/productsSection';

interface ProductsGridProps {
  products: Product[];
  hoveredIndex: number;
  breatheValue: number;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
  products,
  hoveredIndex,
  breatheValue,
  onMouseEnter,
  onMouseLeave,
}) => {
  // Order: Bond (0), Seal (1), Tape (3), Rugged Red (2) - Swapped positions 2 and 3
  const renderOrder = [0, 1, 3, 2];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
      {renderOrder.map((i) => {
        const product = products[i];
        const index = i;
        const isHovered = hoveredIndex === index;

        return (
          <ProductCard
            key={index}
            product={product}
            index={index}
            isHovered={isHovered}
            breatheValue={breatheValue}
            onMouseEnter={() => onMouseEnter(index)}
            onMouseLeave={onMouseLeave}
          />
        );
      })}
    </div>
  );
};

export default ProductsGrid; 