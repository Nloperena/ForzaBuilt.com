import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface IndustriesCtaCardProps {
  className?: string;
  color?: string;
  size?: 'large' | 'normal';
}

export const IndustriesCtaCard: React.FC<IndustriesCtaCardProps> = ({ className, color = '#F2611D', size = 'normal' }) => (
  <Card className={`border-0 shadow-lg rounded-[2rem] overflow-hidden transition-all duration-100 hover:scale-[1.02] relative flex flex-col justify-center items-center bg-white aspect-square ${className || ''}`}>
    <div className="flex flex-col justify-center items-center h-full p-8 text-center gap-6">
      <h3 className={size === 'large' ? 'text-5xl md:text-7xl font-black font-kallisto drop-shadow-2xl text-center w-full' : 'text-2xl md:text-3xl font-black font-kallisto drop-shadow-2xl text-center w-full'} style={{ color }}>
        Don't see your industry?
      </h3>
      <p className={size === 'large' ? 'text-2xl md:text-3xl font-light max-w-xs mx-auto text-center w-full' : 'text-lg md:text-xl font-light max-w-xs mx-auto text-center w-full'} style={{ color }}>
        We can still provide purpose built solutions for your projects.
      </p>
      <Button
        asChild
        className="bg-[#F2611D] text-white hover:bg-[#F2611D]/90 font-bold rounded-full px-8 py-4 text-xl mt-4 shadow-lg transition-colors"
      >
        <a href="/contact">Contact Us</a>
      </Button>
    </div>
  </Card>
); 