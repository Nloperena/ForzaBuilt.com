import React from 'react';
import ScienceTrianglesBackground from './ScienceTrianglesBackground';

interface BackgroundElement {
  variant: 'small' | 'small2' | 'large';
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  opacity: number;
  scale: number;
  delay?: number;
  blendMode?: 'multiply' | 'screen' | 'overlay' | 'soft-light' | 'hard-light' | 'color-dodge' | 'color-burn' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity' | 'normal';
}

interface MultiScienceTrianglesBackgroundProps {
  elements: BackgroundElement[];
  className?: string;
}

const MultiScienceTrianglesBackground: React.FC<MultiScienceTrianglesBackgroundProps> = ({
  elements,
  className = ''
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {elements.map((element, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            animationDelay: `${element.delay || 0}ms`
          }}
        >
          <ScienceTrianglesBackground
            variant={element.variant}
            position={element.position}
            opacity={element.opacity}
            scale={element.scale}
            blendMode={element.blendMode}
          />
        </div>
      ))}
    </div>
  );
};

export default MultiScienceTrianglesBackground;
