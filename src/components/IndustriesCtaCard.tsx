import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLandscapeValues } from '@/hooks/use-landscape';

interface IndustriesCtaCardProps {
  className?: string;
  color?: string;
  size?: 'large' | 'normal';
}

export const IndustriesCtaCard: React.FC<IndustriesCtaCardProps> = ({ className, color = '#F2611D', size = 'normal' }) => {
  // Landscape optimization values
  const { isLandscape } = useLandscapeValues();
  
  // Check if this is mobile layout (height-based detection)
  const isMobileLayout = className?.includes('h-24') || className?.includes('h-28');
  
  if (isMobileLayout) {
    // Mobile layout - horizontal card like Amazon listing
    return (
      <Card className={`bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl group cursor-pointer w-full ${className || ''}`}>
        <div className="flex h-24 sm:h-28">
          {/* Icon/Image Section */}
          <div className="relative w-24 sm:w-28 h-full flex-shrink-0 bg-gradient-to-br from-[#F2611D]/20 to-[#1b3764]/30 flex items-center justify-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#F2611D] rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="flex-1 flex flex-col justify-center px-4 py-3">
            <h3 className="font-black font-kallisto text-lg sm:text-xl text-left w-full mb-1" style={{ color }}>
              Don't see your industry?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-light">
              We can still provide purpose built solutions
            </p>
          </div>
          
          {/* Arrow indicator */}
          <div className="flex items-center justify-center w-8 h-full text-gray-400 group-hover:text-[#F2611D] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Card>
    );
  }

  // Desktop layout - original card design
  return (
    <Card className={`bg-white shadow-2xl rounded-[1rem] sm:rounded-[2rem] border border-gray-200 overflow-hidden aspect-square transition-all duration-300 hover:scale-105 group cursor-pointer w-full h-full ${className || ''}`}>
      <div className="relative w-full h-full overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F2611D]/20 to-[#1b3764]/30 pointer-events-none"></div>
        
        {/* Content container */}
        <div className="absolute inset-0 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 text-center">
          <h3 className={`font-black font-kallisto drop-shadow-2xl text-center w-full mb-2 sm:mb-3 md:mb-4 ${
            isLandscape ? 'text-2xl md:text-3xl lg:text-4xl xl:text-5xl' : 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'
          }`} style={{ color }}>
            Don't see your industry?
          </h3>
          <p className={`font-light max-w-xs mx-auto text-center w-full mb-4 sm:mb-6 md:mb-8 ${
            isLandscape ? 'text-sm md:text-base lg:text-lg xl:text-xl' : 'text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl'
          }`} style={{ color }}>
            We can still provide purpose built solutions for your projects.
          </p>
          <Button
            asChild
            className={`bg-[#F2611D] text-white hover:bg-[#F2611D]/90 font-bold rounded-full shadow-lg transition-colors ${
              isLandscape 
                ? 'px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 text-base md:text-lg lg:text-xl' 
                : 'px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg'
            }`}
          >
            <a href="/contact">Contact Us</a>
          </Button>
        </div>
        
        {/* Bottom text container like other cards */}
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-b-[1rem] sm:rounded-b-[2rem] h-[60px] sm:h-[72px] flex items-center px-4 sm:px-8 pointer-events-none">
          <h3 className="font-black font-kallisto drop-shadow-2xl text-left w-full text-sm sm:text-base md:text-lg lg:text-xl" style={{ color: '#F2611D' }}>
            Contact Us
          </h3>
        </div>
      </div>
    </Card>
  );
}; 