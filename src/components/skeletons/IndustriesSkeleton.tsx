import React from 'react';
import SkeletonLoader from './SkeletonLoader';

const IndustriesSkeleton: React.FC = () => {
  return (
    <section className="relative py-16 px-4 bg-gradient-to-b from-[#115B87] to-[#1B3764]">
      <div className="max-w-7xl mx-auto">
        {/* Title Skeleton */}
        <div className="text-center mb-12">
          <SkeletonLoader 
            variant="text" 
            width="60%" 
            height={48} 
            className="mx-auto rounded mb-4"
          />
          <SkeletonLoader 
            variant="text" 
            width="40%" 
            height={24} 
            className="mx-auto rounded"
          />
        </div>
        
        {/* Industries Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white/10 rounded-lg p-6">
              {/* Industry Icon Skeleton */}
              <SkeletonLoader 
                variant="circular" 
                width={60} 
                height={60} 
                className="mx-auto mb-4"
              />
              
              {/* Industry Title Skeleton */}
              <SkeletonLoader 
                variant="text" 
                width="80%" 
                height={20} 
                className="mx-auto mb-3 rounded"
              />
              
              {/* Industry Description Skeleton */}
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
                <SkeletonLoader 
                  variant="text" 
                  width="70%" 
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

export default IndustriesSkeleton;
