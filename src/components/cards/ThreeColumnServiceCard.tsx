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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations when card becomes visible
    if (opacity > 0.1) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [opacity]);

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
      style={{ transform, opacity }}
    >
      <Card className="w-full max-h-full bg-gradient-to-br from-[#1b3764]/95 to-[#09668d]/95 backdrop-blur-xl border border-white/20 shadow-lg overflow-hidden rounded-2xl relative">
        {/* Remove the white glass overlay */}
        <div className="relative z-10">

          <div className="w-full max-w-[860px] xl:max-w-[900px] mx-auto flex items-center justify-center px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-12 md:py-14 lg:py-16">
            <div className={cn("grid grid-cols-1 gap-8 md:gap-10 lg:gap-14", displayedColumns.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3")}>
              {displayedColumns.map((col, idx) => (
                <div key={idx} className="space-y-3 text-left">
                  {/* Image with staggered animation */}
                  <div 
                    className={cn(
                      "transition-all duration-700 ease-out",
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    )}
                    style={{ transitionDelay: `${200 + (idx * 100)}ms` }}
                  >
                    {col.image && (
                      <img
                        src={col.image}
                        alt={`${col.title} illustration`}
                        loading="lazy"
                        className="block h-40 w-40 md:h-48 md:w-48 lg:h-40 lg:w-40 xl:h-44 xl:w-44 opacity-100 object-contain mx-auto"
                      />
                    )}
                  </div>
                  
                  {/* Title with staggered animation */}
                  <h4 
                    className={cn(
                      "text-sm md:text-base lg:text-lg font-black text-white mb-3 font-kallisto tracking-tight text-center transition-all duration-700 ease-out",
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                    style={{ transitionDelay: `${400 + (idx * 100)}ms` }}
                  >
                    {col.title.split(' ').map((word, wordIndex) => (
                      <span key={wordIndex}>
                        {word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()}
                        {wordIndex < col.title.split(' ').length - 1 ? ' ' : ''}
                      </span>
                    ))}
                  </h4>
                  
                  {/* List items with staggered animation */}
                  <ul className="space-y-2 max-w-[52ch] xl:max-w-[64ch] mx-auto md:mx-0">
                    {col.items.map((item, i) => (
                      <li 
                        key={i} 
                        className={cn(
                          "flex items-start justify-start gap-2 text-xs md:text-xs text-white/90 transition-all duration-700 ease-out",
                          isVisible ? "opacity-100 translate-y-0 translate-x-0" : "opacity-0 translate-y-4 -translate-x-4"
                        )}
                        style={{ transitionDelay: `${600 + (idx * 100) + (i * 200)}ms` }}
                      >
                        <span className="text-[#f16a26] text-sm">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ThreeColumnServiceCard;
