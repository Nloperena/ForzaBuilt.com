import React from 'react';
import SkeletonLoader from './SkeletonLoader';

const HeaderSkeleton: React.FC = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/50 backdrop-blur-2xl border-b border-white/60 shadow-2xl">
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo Skeleton */}
          <div className="flex-shrink-0">
            <SkeletonLoader 
              variant="rectangular" 
              width={120} 
              height={40} 
              className="rounded"
            />
          </div>
          
          {/* Desktop Navigation Skeleton */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Navigation Items */}
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonLoader 
                key={i}
                variant="text" 
                width={80} 
                height={20} 
                className="rounded"
              />
            ))}
            
            {/* Search Bar Skeleton */}
            <SkeletonLoader 
              variant="rectangular" 
              width={200} 
              height={40} 
              className="rounded-full"
            />
            
            {/* Contact Button Skeleton */}
            <SkeletonLoader 
              variant="rectangular" 
              width={120} 
              height={48} 
              className="rounded-full"
            />
          </div>

          {/* Mobile Menu Button Skeleton */}
          <div className="flex items-center lg:hidden">
            <SkeletonLoader 
              variant="rectangular" 
              width={40} 
              height={40} 
              className="rounded"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderSkeleton;
