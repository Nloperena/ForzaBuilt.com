import React from 'react';
import { products } from '@/data/productsSection';
import { useProductsAnimation } from '@/hooks/useProductsAnimation';
import ProductsHeader from './ProductsSection/ProductsHeader';
import ProductsGrid from './ProductsSection/ProductsGrid';

const ProductsSection = () => {
  const {
    hoveredIndex,
    breatheValue,
    handleMouseEnter,
    handleMouseLeave,
  } = useProductsAnimation();

  return (
    <section className="py-16 bg-[#1b3764] text-white">
      <div className="w-full px-4 max-w-[1200px] mx-auto">
        <ProductsHeader />
        <ProductsGrid
          products={products}
          hoveredIndex={hoveredIndex}
          breatheValue={breatheValue}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
    </section>
  );
};

export default ProductsSection; 