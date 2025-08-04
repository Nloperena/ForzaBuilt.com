import React, { useState, useEffect, useCallback, useRef } from 'react';

interface ChemistryMoleculeV2Props {
  className?: string;
  strokeWidth?: number;
}

const ChemistryMoleculeV2: React.FC<ChemistryMoleculeV2Props> = ({ 
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
            <circle cx="100" cy="100" r="20" fill="#09668d" stroke="#09668d" stroke-width="${strokeWidth}"/>
            <circle cx="200" cy="150" r="15" fill="#09668d" stroke="#09668d" stroke-width="${strokeWidth}"/>
            <circle cx="300" cy="200" r="25" fill="#09668d" stroke="#09668d" stroke-width="${strokeWidth}"/>
            <path d="M100,100 L200,150 L300,200" stroke="#09668d" stroke-width="${strokeWidth}" fill="none"/>
            <path d="M150,50 L250,100 L350,150" stroke="#09668d" stroke-width="${strokeWidth}" fill="none"/>
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
          <div className="animate-pulse text-[#09668d]">Loading...</div>
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
          <linearGradient id="moleculeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#09668d" stopOpacity="1" />
            <stop offset="85%" stopColor="#09668d" stopOpacity="1" />
            <stop offset="100%" stopColor="#09668d" stopOpacity="0" />
          </linearGradient>
          <mask id="scrollMaskMolecule">
            <rect width="1627" height="3192" fill="black" />
            <rect 
              width="1627" 
              height={`${maskHeight}%`} 
              fill="url(#moleculeGradient)"
              y="0"
              style={{ willChange: 'height' }}
            />
          </mask>
        </defs>
        
        <g
          mask="url(#scrollMaskMolecule)"
          style={{
            filter: 'drop-shadow(0 0 4px rgba(9, 102, 141, 0.8)) drop-shadow(0 0 12px rgba(9, 102, 141, 0.6))'
          }}
          dangerouslySetInnerHTML={{ 
            __html: svgContent
              .replace(/#3b82f6/g, '#09668d')
              .replace(/#1e40af/g, '#09668d')
              .replace(/#6366f1/g, '#09668d')
              .replace(/#4f46e5/g, '#09668d')
          }}
        />
      </svg>
    </div>
  );
};

export default ChemistryMoleculeV2; 