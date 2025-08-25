import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '../../hooks/use-mobile';

interface ScienceTrianglesBackgroundProps {
  variant?: 'small' | 'small2' | 'large';
  className?: string;
  opacity?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  scale?: number;
  animation?: 'float-gentle' | 'float-subtle' | 'pulse-soft' | 'none';
  parallax?: boolean;
  parallaxIntensity?: number;
  blendMode?: 'multiply' | 'screen' | 'overlay' | 'soft-light' | 'hard-light' | 'color-dodge' | 'color-burn' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity' | 'normal';
}

const ScienceTrianglesBackground: React.FC<ScienceTrianglesBackgroundProps> = ({
  variant = 'small',
  className = '',
  opacity = 0.1,
  position = 'center',
  scale = 1,
  animation = 'none',
  parallax = false,
  parallaxIntensity = 0.1,
  blendMode = 'overlay'
}) => {
  const isMobile = useIsMobile();
  
  // Parallax effect
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, parallax ? parallaxIntensity * 100 : 0]);
  
  const getImageSrc = () => {
    switch (variant) {
      case 'small':
        return '/Gradients and Triangles/Small Science Triangles.png';
      case 'small2':
        return '/Gradients and Triangles/Small Science Triangles 2.png';
      case 'large':
        return '/Gradients and Triangles/Large Science Triangles.png';
      default:
        return '/Gradients and Triangles/Small Science Triangles.png';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-0';
      case 'top-right':
        return 'top-0 right-0';
      case 'bottom-left':
        return 'bottom-0 left-0';
      case 'bottom-right':
        return 'bottom-0 right-0';
      case 'center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      default:
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
    }
  };

  const getAnimationClass = () => {
    switch (animation) {
      case 'float-gentle':
        return 'science-triangles-float-gentle';
      case 'float-subtle':
        return 'science-triangles-float-subtle';
      case 'pulse-soft':
        return 'science-triangles-pulse-soft';
      default:
        return '';
    }
  };

  const getBlendModeClass = () => {
    switch (blendMode) {
      case 'overlay':
        return 'science-triangles-overlay';
      case 'soft-light':
        return 'science-triangles-soft-light';
      case 'multiply':
        return 'science-triangles-multiply';
      case 'screen':
        return 'science-triangles-screen';
      case 'hard-light':
        return 'science-triangles-hard-light';
      case 'color-dodge':
        return 'science-triangles-color-dodge';
      case 'exclusion':
        return 'science-triangles-exclusion';
      case 'difference':
        return 'science-triangles-difference';
      case 'hue':
        return 'science-triangles-hue';
      case 'luminosity':
        return 'science-triangles-luminosity';
      case 'saturation':
        return 'science-triangles-saturation';
      default:
        return '';
    }
  };

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} style={{ zIndex: 0 }}>
      <motion.img
        src={getImageSrc()}
        alt="Science Triangles Background"
        className={`absolute ${getPositionClasses()} ${getAnimationClass()} ${getBlendModeClass()} object-contain transition-all duration-1000 ease-in-out`}
        style={{
          opacity: isMobile ? opacity * 0.7 : opacity,
          maxWidth: '100%',
          maxHeight: '100%',
          zIndex: 0,
          mixBlendMode: blendMode
        }}
        animate={{
          y: parallax ? parallaxY : 0,
          scale: isMobile ? scale * 0.8 : scale
        }}
        transition={{
          duration: 0.1,
          ease: "linear"
        }}
        loading="lazy"
      />
    </div>
  );
};

export default ScienceTrianglesBackground;
