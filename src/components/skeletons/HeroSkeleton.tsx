import React from 'react';
import SkeletonLoader from './SkeletonLoader';

const HeroSkeleton: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1B3764] to-[#115B87]">
      {/* Video Background Skeleton */}
      <div className="absolute inset-0 w-full h-full">
        <SkeletonLoader 
          variant="rectangular" 
          width="100%" 
          height="100%" 
          className="w-full h-full"
        />
      </div>
      
      {/* Content Skeleton */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="space-y-6">
          {/* Main Title Skeleton */}
          <div className="space-y-4">
            <SkeletonLoader 
              variant="text" 
              width="80%" 
              height={60} 
              className="mx-auto rounded"
            />
            <SkeletonLoader 
              variant="text" 
              width="60%" 
              height={60} 
              className="mx-auto rounded"
            />
          </div>
          
          {/* Subtitle Skeleton */}
          <SkeletonLoader 
            variant="text" 
            width="70%" 
            height={24} 
            className="mx-auto rounded"
          />
          
          {/* CTA Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <SkeletonLoader 
              variant="rectangular" 
              width={200} 
              height={48} 
              className="rounded-full"
            />
            <SkeletonLoader 
              variant="rectangular" 
              width={200} 
              height={48} 
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
