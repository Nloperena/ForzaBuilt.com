import React from 'react';
import { Link } from 'react-router-dom';
import { useGradientMode } from '@/contexts/GradientModeContext';
import forzaLogo from '@/assets/svg/Forza-Eagle-Logo-Blue.svg';

interface LogoProps {
  className?: string;
  isScrolled?: boolean;
  isWhiteBackground?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-10 w-auto', isScrolled = false, isWhiteBackground = false }) => {
  const { mode } = useGradientMode();
  
  // Use white logo when transparent, blue logo when white background
  const logoSrc = mode === 'light' 
    ? isWhiteBackground ? '/Forza-Eagle-Logo-Blue.svg' : '/Forza-Eagle-Logo-White.svg'
    : mode === 'light2'
    ? isWhiteBackground ? '/Forza-Eagle-Logo-Blue.svg' : '/Forza-Eagle-Logo-White.svg'
    : '/Forza-Eagle-Logo-White.svg';

  return (
    <Link to="/" className="flex items-center">
      <img 
        src={logoSrc}
        alt="Forza Logo"
        className={className}
      />
    </Link>
  );
};

export default Logo; 