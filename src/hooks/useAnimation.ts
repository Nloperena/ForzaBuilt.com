import { useState, useEffect, useCallback } from 'react';

interface UseAnimationOptions {
  duration?: number;
  delay?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

export const useAnimation = (options: UseAnimationOptions = {}) => {
  const { duration = 300, delay = 0, easing = 'ease-in-out' } = options;
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationValue, setAnimationValue] = useState(0);

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
    setAnimationValue(0);
    
    setTimeout(() => {
      setAnimationValue(1);
      setTimeout(() => {
        setIsAnimating(false);
      }, duration);
    }, delay);
  }, [duration, delay]);

  const stopAnimation = useCallback(() => {
    setIsAnimating(false);
    setAnimationValue(0);
  }, []);

  return {
    isAnimating,
    animationValue,
    startAnimation,
    stopAnimation,
    animationStyle: {
      transition: `all ${duration}ms ${easing}`,
    },
  };
};

export const useBreathingAnimation = (isActive: boolean, speed: number = 1000) => {
  const [breatheValue, setBreatheValue] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    
    const animate = () => {
      const value = (Math.sin(Date.now() / speed) + 1) / 2;
      setBreatheValue(value);
      animationFrame = requestAnimationFrame(animate);
    };

    if (isActive) {
      animate();
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isActive, speed]);

  return breatheValue;
};

export const useHoverAnimation = (delay: number = 300) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setIsHovered(true);
  }, [hoverTimeout]);

  const handleMouseLeave = useCallback(() => {
    const timeout = setTimeout(() => {
      setIsHovered(false);
    }, delay);
    setHoverTimeout(timeout);
  }, [delay]);

  return {
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
  };
}; 