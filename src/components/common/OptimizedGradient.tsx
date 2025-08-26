import React from 'react';

interface OptimizedGradientProps {
  variant?: 'main' | 'left' | 'right' | 'mirrored';
  opacity?: number;
  className?: string;
}

const OptimizedGradient: React.FC<OptimizedGradientProps> = ({ 
  variant = 'main', 
  opacity = 0.8,
  className = ''
}) => {
  const getGradientStyle = () => {
    switch (variant) {
      case 'main':
        return {
          background: `linear-gradient(135deg, 
            rgba(27, 55, 100, ${opacity}) 0%, 
            rgba(44, 95, 138, ${opacity * 0.8}) 25%, 
            rgba(242, 97, 29, ${opacity * 0.6}) 50%, 
            rgba(242, 97, 29, ${opacity * 0.4}) 75%, 
            rgba(27, 55, 100, ${opacity * 0.2}) 100%)`,
        };
      case 'left':
        return {
          background: `linear-gradient(90deg, 
            rgba(27, 55, 100, ${opacity}) 0%, 
            rgba(44, 95, 138, ${opacity * 0.8}) 30%, 
            rgba(242, 97, 29, ${opacity * 0.6}) 60%, 
            transparent 100%)`,
        };
      case 'right':
        return {
          background: `linear-gradient(270deg, 
            rgba(27, 55, 100, ${opacity}) 0%, 
            rgba(44, 95, 138, ${opacity * 0.8}) 30%, 
            rgba(242, 97, 29, ${opacity * 0.6}) 60%, 
            transparent 100%)`,
        };
      case 'mirrored':
        return {
          background: `linear-gradient(225deg, 
            rgba(27, 55, 100, ${opacity}) 0%, 
            rgba(44, 95, 138, ${opacity * 0.8}) 25%, 
            rgba(242, 97, 29, ${opacity * 0.6}) 50%, 
            rgba(242, 97, 29, ${opacity * 0.4}) 75%, 
            rgba(27, 55, 100, ${opacity * 0.2}) 100%)`,
        };
      default:
        return {
          background: `linear-gradient(135deg, 
            rgba(27, 55, 100, ${opacity}) 0%, 
            rgba(44, 95, 138, ${opacity * 0.8}) 25%, 
            rgba(242, 97, 29, ${opacity * 0.6}) 50%, 
            rgba(242, 97, 29, ${opacity * 0.4}) 75%, 
            rgba(27, 55, 100, ${opacity * 0.2}) 100%)`,
        };
    }
  };

  return (
    <div 
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
      style={{
        ...getGradientStyle(),
        mixBlendMode: 'overlay'
      }}
    />
  );
};

export default OptimizedGradient;
