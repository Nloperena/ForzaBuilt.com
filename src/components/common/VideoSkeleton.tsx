import React from 'react';

interface VideoSkeletonProps {
  className?: string;
  showLoadingDots?: boolean;
  backgroundGradient?: string;
}

const VideoSkeleton: React.FC<VideoSkeletonProps> = ({ 
  className = "", 
  showLoadingDots = true,
  backgroundGradient = "from-[#1B3764] to-[#2C5F8A]"
}) => {
  return (
    <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${backgroundGradient} flex items-center justify-center ${className}`}>
      {showLoadingDots && (
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-white/40 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      )}
    </div>
  );
};

export default VideoSkeleton;
