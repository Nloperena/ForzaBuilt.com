import React from 'react';
import SkeletonLoader from './SkeletonLoader';

const ChemistrySkeleton: React.FC = () => {
  return (
    <section className="w-full py-16 px-4 relative overflow-hidden bg-gradient-to-br from-[#F16022] via-[#E8551C] to-[#F16022]">
      <div className="max-w-screen-2xl mx-auto relative z-10">
        {/* Title Skeleton */}
        <div className="text-center mb-12">
          <SkeletonLoader 
            variant="text" 
            width="70%" 
            height={60} 
            className="mx-auto rounded mb-4"
          />
          <SkeletonLoader 
            variant="text" 
            width="50%" 
            height={60} 
            className="mx-auto rounded"
          />
        </div>
        
        {/* Chemistry Grid Skeleton - 4-4-3 Layout */}
        <div className="max-w-7xl mx-auto">
          {/* First Row - 4 chemistry icons */}
          <div className="grid grid-cols-2 md:flex md:justify-center md:items-center gap-4 sm:gap-6 md:gap-12 lg:gap-16 mb-6 md:mb-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Chemistry Icon Skeleton */}
                <div className="relative mb-2 md:mb-6">
                  <SkeletonLoader 
                    variant="circular" 
                    width={64} 
                    height={64} 
                    className="sm:w-20 sm:h-20 md:w-36 md:h-36 lg:w-44 lg:h-44"
                  />
                </div>
                
                {/* Chemistry Name Skeleton */}
                <SkeletonLoader 
                  variant="text" 
                  width={80} 
                  height={16} 
                  className="rounded"
                />
              </div>
            ))}
          </div>

          {/* Second Row - 4 chemistry icons */}
          <div className="grid grid-cols-2 md:flex md:justify-center md:items-center gap-4 sm:gap-6 md:gap-12 lg:gap-16 mb-6 md:mb-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Chemistry Icon Skeleton */}
                <div className="relative mb-2 md:mb-6">
                  <SkeletonLoader 
                    variant="circular" 
                    width={64} 
                    height={64} 
                    className="sm:w-20 sm:h-20 md:w-36 md:h-36 lg:w-44 lg:h-44"
                  />
                </div>
                
                {/* Chemistry Name Skeleton */}
                <SkeletonLoader 
                  variant="text" 
                  width={80} 
                  height={16} 
                  className="rounded"
                />
              </div>
            ))}
          </div>

          {/* Third Row - 3 chemistry icons */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-12 lg:gap-16">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Chemistry Icon Skeleton */}
                <div className="relative mb-2 md:mb-6">
                  <SkeletonLoader 
                    variant="circular" 
                    width={64} 
                    height={64} 
                    className="sm:w-20 sm:h-20 md:w-36 md:h-36 lg:w-44 lg:h-44"
                  />
                </div>
                
                {/* Chemistry Name Skeleton */}
                <SkeletonLoader 
                  variant="text" 
                  width={80} 
                  height={16} 
                  className="rounded"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChemistrySkeleton;
