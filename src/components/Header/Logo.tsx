import React from 'react';
import { Link } from 'react-router-dom';
import { useGradientMode } from '@/contexts/GradientModeContext';
import forzaLogo from '@/assets/images/forza-logo-full.png';

interface LogoProps {
  className?: string;
  isScrolled?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-10 w-auto', isScrolled = false }) => {
  const { mode } = useGradientMode();
  
  // Use blue logo for light mode, white logo for light2 mode (always white for light2), regular logo for dark mode
  const logoSrc = mode === 'light' 
    ? '/forza-logo-blue.svg' 
    : mode === 'light2'
    ? forzaLogo  // Always use white logo for light2 mode
    : forzaLogo;

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