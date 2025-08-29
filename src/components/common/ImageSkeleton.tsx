import React from 'react';

interface ImageSkeletonProps {
  className?: string;
  showLoadingDots?: boolean;
  backgroundGradient?: string;
}

const ImageSkeleton: React.FC<ImageSkeletonProps> = ({ 
  className = "", 
  showLoadingDots = true,
  backgroundGradient = "from-[#1B3764] to-[#2C5F8A]"
}) => {
  return (
    <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${backgroundGradient} flex items-center justify-center ${className}`}>
      {showLoadingDots && (
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-white/40 backdrop-blur-xl rounded-full animate-bounce border border-white/20 shadow-lg"></div>
          <div className="w-3 h-3 bg-white/40 backdrop-blur-xl rounded-full animate-bounce border border-white/20 shadow-lg" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-white/40 backdrop-blur-xl rounded-full animate-bounce border border-white/20 shadow-lg" style={{ animationDelay: '0.2s' }}></div>
        </div>
      )}
    </div>
  );
};

export default ImageSkeleton;
