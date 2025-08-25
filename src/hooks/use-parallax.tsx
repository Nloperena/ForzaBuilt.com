import { useEffect, useState } from 'react';

interface UseParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  offset?: number;
}

export const useParallax = (options: UseParallaxOptions = {}) => {
  const { speed = 0.5, direction = 'up', offset = 0 } = options;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getParallaxTransform = () => {
    const moveDistance = scrollY * speed;
    
    switch (direction) {
      case 'up':
        return `translateY(${offset - moveDistance}px)`;
      case 'down':
        return `translateY(${offset + moveDistance}px)`;
      case 'left':
        return `translateX(${offset - moveDistance}px)`;
      case 'right':
        return `translateX(${offset + moveDistance}px)`;
      default:
        return `translateY(${offset - moveDistance}px)`;
    }
  };

  return { scrollY, getParallaxTransform };
};
