import React from 'react';
import ProductCard from './ProductCard';

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

interface ProductsGridProps {
  products: Product[];
  hoveredIndex: number | null;
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
  // Indices: 0 = ADHESIVES, 1 = SEALANTS, 2 = INDUSTRIAL CLEANING, 3 = TAPES
  // Desired order: 0, 1, 3, 2
  const renderOrder = [0, 1, 3, 2];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
      {renderOrder.map((i) => {
        const product = products[i];
        const index = i;
        const isHovered = hoveredIndex === index;
        const isTopRow = renderOrder.indexOf(i) < 2; // First two items are top row in the grid

        return (
          <ProductCard
            key={index}
            product={product}
            index={index}
            isHovered={isHovered}
            breatheValue={breatheValue}
            isTopRow={isTopRow}
            onMouseEnter={() => onMouseEnter(index)}
            onMouseLeave={onMouseLeave}
          />
        );
      })}
    </div>
  );
};

export default ProductsGrid; 