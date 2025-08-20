import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface ColumnData {
  title: string;
  items: string[];
  image: string;
}

interface ThreeColumnServiceCardProps {
  title: string;
  icon?: string;
  image?: string;
  columns: ColumnData[];
  transform: string;
  opacity: number;
  index?: number;
}

const ThreeColumnServiceCard: React.FC<ThreeColumnServiceCardProps> = ({
  title,
  icon,
  image,
  columns,
  transform,
  opacity,
  index,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate scroll progress as a percentage (0 to 1)
      const progress = Math.min(Math.max((scrollTop / (documentHeight - windowHeight)), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate animation states based on scroll progress
  const getAnimationState = (elementIndex: number, itemIndex: number = 0) => {
    const baseDelay = elementIndex * 0.15; // Extended progression for longer animation
    const itemDelay = itemIndex * 0.08; // Extended item delay
    const totalDelay = baseDelay + itemDelay;
    
    // Trigger animation when scroll progress reaches the delay threshold
    // Elements animate in and stay permanently visible
    const shouldAnimate = scrollProgress >= totalDelay;
    
    // Once elements are visible, they stay visible forever
    if (shouldAnimate) {
      return {
        opacity: 1,
        translateY: 0,
        translateX: 0
      };
    }
    
    return {
      opacity: 0,
      translateY: 20,
      translateX: -10
    };
  };

  // Map the original data to the correct display pattern without changing content
  let displayedColumns;
  
  // For 3-2-3-2 pattern
  if (index === 0) { // First card: 3 columns (Card 1 with Value Proposition and Decades)
    displayedColumns = columns.length >= 3 
      ? columns 
      : [...columns, { title: "", items: [], image: "" }]; // Ensure 3 columns
  } else if (index === 1) { // Second card: 2 columns (Card 2 with Purpose-Built and Industry Focus)
    displayedColumns = columns.slice(0, 2); // First 2 columns only
  } else if (index === 2) { // Third card: 3 columns (Card 3 with Innovation and Integration)
    displayedColumns = columns.length >= 3 
      ? columns 
      : [...columns, { title: "", items: [], image: "" }]; // Ensure 3 columns
  } else { // Fourth card: 2 columns (Card 4 with R&D and Sustainability)
    displayedColumns = columns.slice(0, 2); // First 2 columns only
  }
  
  return (
    <div
      className="w-full"
      style={{ transform, opacity: 1 }} // Force opacity to 1 to prevent parent fade
    >
      <Card className="w-full max-h-full bg-gradient-to-br from-[#1b3764]/95 to-[#09668d]/95 backdrop-blur-xl border border-white/20 shadow-lg overflow-hidden rounded-2xl relative">
        {/* Remove the white glass overlay */}
        <div className="relative z-10">

          <div className="w-full max-w-[1000px] xl:max-w-[1100px] mx-auto flex items-center justify-center px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-12 md:py-14 lg:py-16">
            <div className={cn("grid grid-cols-1 gap-5", displayedColumns.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3")}>
              {displayedColumns.map((col, idx) => {
                return (
                  <div key={idx} className="space-y-4 text-left">
                    {/* Image with scroll-driven animation */}
                    <div 
                      className="transition-all duration-1000 ease-out"
                      style={{ 
                        opacity: getAnimationState(idx).opacity,
                        transform: `translateY(${getAnimationState(idx).translateY}px)`
                      }}
                    >
                      {col.image && (
                        <img
                          src={col.image}
                          alt={`${col.title} illustration`}
                          loading="lazy"
                          className="block h-48 w-48 md:h-56 md:w-56 lg:h-52 lg:w-52 xl:h-56 xl:w-56 opacity-100 object-contain mx-auto"
                        />
                      )}
                    </div>
                    
                    {/* Title - static, no animation */}
                    <h4 className="text-sm md:text-base lg:text-lg font-black text-white mb-4 font-kallisto tracking-tight text-center">
                      {col.title.split(' ').map((word, wordIndex) => (
                        <span key={wordIndex}>
                          {word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()}
                          {wordIndex < col.title.split(' ').length - 1 ? ' ' : ''}
                        </span>
                      ))}
                    </h4>
                    
                    {/* List items - static, no animation */}
                    <ul className="space-y-3 max-w-[85ch] xl:max-w-[110ch] mx-auto md:mx-0">
                      {col.items.map((item, i) => (
                        <li 
                          key={i} 
                          className="flex items-start justify-start gap-3 text-xs md:text-sm text-white/90"
                        >
                          <span className="text-[#f16a26] text-sm flex-shrink-0">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ThreeColumnServiceCard;
