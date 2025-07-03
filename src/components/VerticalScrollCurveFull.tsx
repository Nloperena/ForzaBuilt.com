import React, { useState, useEffect, useCallback, useRef } from 'react';

interface VerticalScrollCurveFullProps {
  className?: string;
  strokeWidth?: number;
}

const VerticalScrollCurveFull: React.FC<VerticalScrollCurveFullProps> = ({ 
  className = '', 
  strokeWidth = 3
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [svgContent, setSvgContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const animationFrameRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  const updateScrollProgress = useCallback(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current.parentElement;
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const containerTop = containerRect.top + window.scrollY;
    const containerHeight = container.offsetHeight;
    
    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    const startTrigger = containerTop - viewportHeight;
    const endTrigger = containerTop + containerHeight - viewportHeight;
    
    const relativeScroll = Math.max(0, scrollTop - startTrigger);
    const totalScrollRange = endTrigger - startTrigger;
    
    const progress = Math.min(Math.max(relativeScroll / totalScrollRange, 0), 1);
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateScrollProgress]);

  useEffect(() => {
    const fetchSVG = async () => {
      try {
        const response = await fetch('https://images.ctfassets.net/hdznx4p7ef81/qUy3g4AREIBKdZc3RdIiB/23b5902cea0bee036e8715d7bdc60e1c/ChemistryMolecule.svg');
        const svgText = await response.text();
        
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        const svgElement = svgDoc.querySelector('svg');
        
        if (svgElement) {
          const innerContent = svgElement.innerHTML;
          
          let processedContent = innerContent
            .replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}"`)
            .replace(/stroke-linecap="[^"]*"/g, 'stroke-linecap="round"')
            .replace(/stroke-linejoin="[^"]*"/g, 'stroke-linejoin="round"');
          
          setSvgContent(processedContent);
        } else {
          throw new Error('No SVG element found');
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch SVG:', error);
        setSvgContent(`
          <g>
            <circle cx="100" cy="100" r="20" fill="#3b82f6" stroke="#1e40af" stroke-width="${strokeWidth}"/>
            <circle cx="200" cy="150" r="15" fill="#3b82f6" stroke="#1e40af" stroke-width="${strokeWidth}"/>
            <circle cx="300" cy="200" r="25" fill="#3b82f6" stroke="#1e40af" stroke-width="${strokeWidth}"/>
            <path d="M100,100 L200,150 L300,200" stroke="#3b82f6" stroke-width="${strokeWidth}" fill="none"/>
            <path d="M150,50 L250,100 L350,150" stroke="#3b82f6" stroke-width="${strokeWidth}" fill="none"/>
          </g>
        `);
        setIsLoading(false);
      }
    };

    fetchSVG();
  }, [strokeWidth]);

  const maskHeight = scrollProgress * 100;
  
  const svgTranslateY = -scrollProgress * 20;

  if (isLoading) {
    return (
      <div ref={containerRef} className={`absolute top-0 left-0 w-full h-full z-10 pointer-events-none ${className}`}>
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse text-blue-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`absolute top-0 left-0 w-full h-full z-10 pointer-events-none overflow-hidden ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1627 3192"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block"
        preserveAspectRatio="xMidYMin slice"
        style={{
          transform: `translateY(${svgTranslateY}px)`,
          willChange: 'transform'
        }}
      >
        <defs>
          <linearGradient id="featherGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="85%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="scrollMaskFull">
            <rect width="1627" height="3192" fill="black" />
            <rect 
              width="1627" 
              height={`${maskHeight}%`} 
              fill="url(#featherGradient)"
              y="0"
              style={{ willChange: 'height' }}
            />
          </mask>
        </defs>
        
        <g
          mask="url(#scrollMaskFull)"
          style={{
            filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 1)) drop-shadow(0 0 12px rgba(255, 255, 255, 1)) drop-shadow(0 0 24px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.7))'
          }}
          dangerouslySetInnerHTML={{ 
            __html: svgContent
              .replace(/#3b82f6/g, '#ffffff')
              .replace(/#1e40af/g, '#ffffff')
              .replace(/#6366f1/g, '#ffffff')
              .replace(/#4f46e5/g, '#ffffff')
          }}
        />
        
        <g
          style={{
            filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))'
          }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </svg>
    </div>
  );
};

export default VerticalScrollCurveFull; 