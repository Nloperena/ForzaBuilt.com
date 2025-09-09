import React from 'react';
import SkeletonLoader from './SkeletonLoader';

const NewsletterSkeleton: React.FC = () => {
  return (
    <section className="relative py-16 px-4 bg-gradient-to-br from-[#1B3764] to-[#115B87]">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title Skeleton */}
        <SkeletonLoader 
          variant="text" 
          width="60%" 
          height={48} 
          className="mx-auto rounded mb-4"
        />
        
        {/* Subtitle Skeleton */}
        <SkeletonLoader 
          variant="text" 
          width="80%" 
          height={24} 
          className="mx-auto rounded mb-8"
        />
        
        {/* Form Skeleton */}
        <div className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Email Input Skeleton */}
            <SkeletonLoader 
              variant="rectangular" 
              width="100%" 
              height={48} 
              className="rounded-full"
            />
            
            {/* Subscribe Button Skeleton */}
            <SkeletonLoader 
              variant="rectangular" 
              width={120} 
              height={48} 
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSkeleton;
