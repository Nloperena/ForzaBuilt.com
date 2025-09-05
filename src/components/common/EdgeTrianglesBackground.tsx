import React from 'react';
import { useGradientMode } from '@/contexts/GradientModeContext';

interface EdgeTrianglesBackgroundProps {
  leftImage?: string;
  rightImage?: string;
  opacity?: number;
  scale?: number;
  leftRotation?: number;
  rightRotation?: number;
  leftFlipH?: boolean;
  leftFlipV?: boolean;
  rightFlipH?: boolean;
  rightFlipV?: boolean;
  blendMode?: 'multiply' | 'screen' | 'overlay' | 'soft-light' | 'hard-light' | 'color-dodge' | 'color-burn' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity' | 'normal';
  className?: string;
}

const EdgeTrianglesBackground: React.FC<EdgeTrianglesBackgroundProps> = ({
  leftImage = '/Gradients and Triangles/Small Science Triangles 2.png',
  rightImage = '/Gradients and Triangles/Small Science Triangles.png',
  opacity = 0.6,
  scale = 1.2,
  leftRotation = 0,
  rightRotation = 0,
  leftFlipH = false,
  leftFlipV = false,
  rightFlipH = false,
  rightFlipV = false,
  blendMode = 'overlay',
  className = ''
}) => {
  const { mode } = useGradientMode();
  // Helper function to build transform string with flips
  const buildTransform = (translateX: string, rotation: number, flipH: boolean, flipV: boolean) => {
    const transforms = [
      'translateY(-50%)',
      `scale(${scale})`,
      translateX,
      `rotate(${rotation}deg)`
    ];
    
    if (flipH) transforms.push('scaleX(-1)');
    if (flipV) transforms.push('scaleY(-1)');
    
    return transforms.join(' ');
  };

  // Helper function to get blend mode CSS class
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
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Left side image - positioned further outside left edge, will overflow and be cropped */}
      <div
        className="absolute top-1/2 left-0 transform -translate-y-1/2"
        style={{
          transform: buildTransform('translateX(-30%)', leftRotation, leftFlipH, leftFlipV),
          opacity: mode === 'light' ? opacity * 0.8 : opacity * 0.6,
        }}
      >
        {mode === 'light' ? (
          <img
            src={leftImage}
            alt="Left Edge Triangles"
            className="object-contain"
            style={{
              opacity: 0,
            }}
          />
        ) : (
          <img
            src={leftImage}
            alt="Left Edge Triangles"
            className={`object-contain ${getBlendModeClass()}`}
            style={{
              opacity: opacity * 0.6,
            }}
          />
        )}
      </div>
      
      {/* Right side image - positioned further outside right edge, will overflow and be cropped */}
      <div
        className="absolute top-1/2 right-0 transform -translate-y-1/2"
        style={{
          transform: buildTransform('translateX(30%)', rightRotation, rightFlipH, rightFlipV),
          opacity: mode === 'light' ? opacity * 0.8 : opacity * 0.6,
        }}
      >
        {mode === 'light' ? (
          <img
            src={rightImage}
            alt="Right Edge Triangles"
            className="object-contain"
            style={{
              opacity: 0,
            }}
          />
        ) : (
          <img
            src={rightImage}
            alt="Right Edge Triangles"
            className={`object-contain ${getBlendModeClass()}`}
            style={{
              opacity: opacity * 0.6,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default EdgeTrianglesBackground;
