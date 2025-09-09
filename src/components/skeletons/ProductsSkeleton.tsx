import React from 'react';
import SkeletonLoader from './SkeletonLoader';

const ProductsSkeleton: React.FC = () => {
  return (
    <section className="relative py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title Skeleton */}
        <div className="text-center mb-12">
          <SkeletonLoader 
            variant="text" 
            width="50%" 
            height={48} 
            className="mx-auto rounded mb-4"
          />
          <SkeletonLoader 
            variant="text" 
            width="30%" 
            height={24} 
            className="mx-auto rounded"
          />
        </div>
        
        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="group cursor-pointer">
              {/* Product Image Skeleton */}
              <div className="relative mb-6">
                <SkeletonLoader 
                  variant="rectangular" 
                  width="100%" 
                  height={200} 
                  className="rounded-lg"
                />
              </div>
              
              {/* Product Title Skeleton */}
              <SkeletonLoader 
                variant="text" 
                width="80%" 
                height={24} 
                className="mb-3 rounded"
              />
              
              {/* Product Description Skeleton */}
              <div className="space-y-2">
                <SkeletonLoader 
                  variant="text" 
                  width="100%" 
                  height={16} 
                  className="rounded"
                />
                <SkeletonLoader 
                  variant="text" 
                  width="90%" 
                  height={16} 
                  className="rounded"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSkeleton;
