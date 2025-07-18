import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

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
  mobile?: boolean;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  item,
  isOverlayOpen,
  activeOverlayContent,
  onMouseEnter,
  onMouseLeave,
  onClick,
  mobile = false,
}) => {
  const location = useLocation();
  const hasDropdown = ['Industries', 'Products', 'Tools'].includes(item.name);
  const isActive = (isOverlayOpen && activeOverlayContent === item.name.toLowerCase()) || 
                   location.pathname.startsWith(item.href);

  if (mobile) {
    return (
      <Link
        to={item.href}
        className={`text-white text-xs sm:text-sm font-medium transition-colors hover:text-[#F2611D] whitespace-nowrap ${
          location.pathname === item.href 
            ? 'text-[#F2611D]' 
            : 'text-white'
        }`}
      >
        {item.name}
      </Link>
    );
  }

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
            isActive ? 'text-[#F2611D]' : 'text-white'
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
          : 'text-white'
      }`}
    >
      {item.name}
    </Link>
  );
};

export default NavigationItem; 