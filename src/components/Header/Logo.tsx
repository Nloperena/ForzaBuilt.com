import React from 'react';
import { Link } from 'react-router-dom';
import { useGradientMode } from '@/contexts/GradientModeContext';
import forzaLogo from '@/assets/images/forza-logo-full.png';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-10 w-auto' }) => {
  const { mode } = useGradientMode();
  
  // Use blue logo for light modes, regular logo for dark modes
  const logoSrc = mode === 'light' || mode === 'light2' 
    ? '/forza-logo-blue.svg' 
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