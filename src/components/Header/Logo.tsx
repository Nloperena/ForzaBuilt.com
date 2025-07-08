import React from 'react';
import { Link } from 'react-router-dom';
import forzaLogo from '@/assets/images/forza-logo-full.png';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-10 w-auto' }) => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src={forzaLogo}
        alt="Forza Logo"
        className={className}
      />
    </Link>
  );
};

export default Logo; 