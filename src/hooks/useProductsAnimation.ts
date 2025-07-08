import { useState, useEffect } from 'react';

export const useProductsAnimation = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [breatheValue, setBreatheValue] = useState(0);
  
  // Make the breathing animation half as fast
  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      // Breathing is now half as fast
      const value = (Math.sin(Date.now() / 333) + 1) / 2;
      setBreatheValue(value);
      animationFrame = requestAnimationFrame(animate);
    };
    if (hoveredIndex !== null) {
      animate();
    }
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [hoveredIndex]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return {
    hoveredIndex,
    breatheValue,
    handleMouseEnter,
    handleMouseLeave,
  };
}; 