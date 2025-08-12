import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface ColumnData {
  title: string;
  items: string[];
}

interface ThreeColumnServiceCardProps {
  title: string;
  icon?: string;
  image?: string;
  columnImages?: string[];
  columns: [ColumnData, ColumnData, ColumnData];
  transform: string;
  opacity: number;
  index?: number;
}

const ThreeColumnServiceCard: React.FC<ThreeColumnServiceCardProps> = ({
  title,
  icon,
  image,
  columnImages,
  columns,
  transform,
  opacity,
  index,
}) => {
  // For the 2-3-2-3 pattern: index 0 and 2 show 2 columns, index 1 and 3 show 3 columns
  const displayedColumns = (index === 0 || index === 2) ? columns.slice(0, 2) : columns;
  
  return (
    <div
      className="w-full"
      style={{ transform, opacity }}
    >
      <Card className="w-full max-h-full bg-gradient-to-br from-[#1b3764]/95 to-[#09668d]/95 backdrop-blur-xl border border-white/20 shadow-lg overflow-hidden rounded-2xl relative">
        {/* Remove the white glass overlay */}
        <div className="relative z-10">
          {/* Main card title only - no image or emoji */}
          <div className="w-full bg-gradient-to-r from-[#1b3764] to-[#09668d] py-8">
            <div className="flex items-center justify-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white font-kallisto tracking-tight text-center">
                {title}
              </h2>
            </div>
          </div>

          <div className="w-full max-w-[860px] xl:max-w-[900px] mx-auto flex items-center justify-center px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-12 md:py-14 lg:py-16">
            <div className={cn("grid grid-cols-1 gap-8 md:gap-10 lg:gap-14", displayedColumns.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3")}>
              {displayedColumns.map((col, idx) => (
                <div key={idx} className="space-y-3 text-left">
                  <img
                    src={columnImages?.[idx] || '/placeholder.svg'}
                    alt={`${col.title} illustration`}
                    loading="lazy"
                    className="block h-40 w-40 md:h-48 md:w-48 opacity-90 object-contain mx-auto filter brightness-0 saturate-100 invert-100 sepia-0 saturate-0 hue-rotate-0 mix-blend-multiply"
                  />
                  <h4 className="text-sm md:text-base lg:text-lg font-black text-white mb-3 font-kallisto tracking-tight text-center">
                    {col.title}
                  </h4>
                  <ul className="space-y-2">
                    {col.items.map((item, i) => (
                      <li key={i} className="flex items-start justify-start gap-2 text-xs md:text-xs text-white/90">
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
