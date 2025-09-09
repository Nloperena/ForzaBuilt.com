import React from 'react';
import SkeletonLoader from './SkeletonLoader';

const FooterSkeleton: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info Column */}
          <div className="space-y-4">
            {/* Logo Skeleton */}
            <SkeletonLoader 
              variant="rectangular" 
              width={120} 
              height={40} 
              className="rounded"
            />
            
            {/* Description Skeleton */}
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
                width="80%" 
                height={16} 
                className="rounded"
              />
            </div>
          </div>
          
          {/* Navigation Columns */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-4">
              {/* Section Title Skeleton */}
              <SkeletonLoader 
                variant="text" 
                width={100} 
                height={20} 
                className="rounded"
              />
              
              {/* Links Skeleton */}
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, j) => (
                  <SkeletonLoader 
                    key={j}
                    variant="text" 
                    width={120} 
                    height={16} 
                    className="rounded"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom Bar Skeleton */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <SkeletonLoader 
            variant="text" 
            width={200} 
            height={16} 
            className="rounded"
          />
          
          {/* Social Links Skeleton */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonLoader 
                key={i}
                variant="circular" 
                width={32} 
                height={32} 
                className="rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSkeleton;
