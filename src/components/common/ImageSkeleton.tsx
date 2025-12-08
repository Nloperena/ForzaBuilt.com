import React from 'react';

interface ImageSkeletonProps {
  className?: string;
  showLoadingDots?: boolean;
  backgroundGradient?: string;
  backgroundColor?: 'blue' | 'white';
}

const ImageSkeleton: React.FC<ImageSkeletonProps> = ({ 
  className = "", 
  showLoadingDots = true,
  backgroundGradient,
  backgroundColor = 'blue'
}) => {
  // Determine dot colors based on background
  // White dots on blue background, blue dots on white background
  const dotColor = backgroundColor === 'white' ? 'bg-[#1B3764]' : 'bg-white';
  
  return (
    <div className={`absolute inset-0 w-full h-full flex items-center justify-center ${className}`}>
      {showLoadingDots && (
        <div className="flex space-x-2">
          <div className={`w-3 h-3 ${dotColor} rounded-full animate-bounce`}></div>
          <div className={`w-3 h-3 ${dotColor} rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
          <div className={`w-3 h-3 ${dotColor} rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
        </div>
      )}
    </div>
  );
};

export default ImageSkeleton;
