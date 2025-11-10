import React from 'react';
import { Link } from 'react-router-dom';
import { useGradientMode } from '@/contexts/GradientModeContext';

interface LogoProps {
  className?: string;
  isScrolled?: boolean;
  isWhiteBackground?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-10 w-auto', isScrolled = false, isWhiteBackground = false }) => {
  const { mode } = useGradientMode();
  
  // Use white logo when transparent, blue logo when white background
  const logoSrc = mode === 'light' 
    ? isWhiteBackground ? '/logos/Forza-Eagle-Logo-Blue.svg' : '/logos/Forza-Eagle-Logo-White.svg'
    : mode === 'light2'
    ? isWhiteBackground ? '/logos/Forza-Eagle-Logo-Blue.svg' : '/logos/Forza-Eagle-Logo-White.svg'
    : '/logos/Forza-Eagle-Logo-White.svg';

  return (
    <Link to="/" className="flex items-center pb-1 md:pb-1.5">
      <img 
        src={logoSrc}
        alt="Forza Logo"
        className={className}
      />
    </Link>
  );
};  

export default Logo; 