import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGradientMode } from '@/contexts/GradientModeContext';

interface NavigationItemProps {
  item: {
    name: string;
    href: string;
  };
  isOverlayOpen: boolean;
  activeOverlayContent: string | null;
  onMouseEnter: (content: string) => void;
  onMouseLeave: () => void;
  onClick: (content: string) => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  item,
  isOverlayOpen,
  activeOverlayContent,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const location = useLocation();
  const { mode } = useGradientMode();
  const hasDropdown = ['Industries', 'Products'].includes(item.name);
  const isActive = (isOverlayOpen && activeOverlayContent === item.name.toLowerCase()) || 
                   location.pathname.startsWith(item.href);
  
  // Use white text for light2 mode, blue for light mode, white for dark mode
  const defaultTextColor = mode === 'light2' ? 'text-white' : mode === 'light' ? 'text-[#293350]' : 'text-white';

  if (hasDropdown) {
    return (
      <div
        onMouseEnter={() => onMouseEnter(item.name.toLowerCase())}
        onMouseLeave={onMouseLeave}
      >
        <button
          type="button"
          onClick={() => onClick(item.name.toLowerCase())}
          className={`flex items-center space-x-1 text-xl font-medium transition-colors hover:text-[#F2611D] ${
            isActive ? 'text-[#F2611D]' : defaultTextColor
          }`}
        >
          <span>{item.name}</span>
          <motion.svg
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-5 h-5"
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
      </div>
    );
  }

  return (
    <Link
      to={item.href}
      className={`text-xl font-medium transition-colors hover:text-[#F2611D] ${
        location.pathname === item.href 
          ? 'text-[#F2611D] bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg' 
          : defaultTextColor
      }`}
    >
      {item.name}
    </Link>
  );
};

export default NavigationItem; 