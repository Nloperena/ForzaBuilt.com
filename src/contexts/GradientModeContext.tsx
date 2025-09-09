import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GradientMode } from '@/components/GradientToggleModal';

interface GradientModeContextType {
  mode: GradientMode;
  setMode: (mode: GradientMode) => void;
  getGradientClasses: (industry?: string) => string;
  getTextClasses: () => string;
  getTextSecondaryClasses: () => string;
}

const GradientModeContext = createContext<GradientModeContextType | undefined>(undefined);

interface GradientModeProviderProps {
  children: ReactNode;
}

export const GradientModeProvider: React.FC<GradientModeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<GradientMode>('dark');

  // Load saved mode from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('gradientMode') as GradientMode;
    if (savedMode && ['dark', 'light', 'light2'].includes(savedMode)) {
      setMode(savedMode);
    }
  }, []);

  // Save mode to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('gradientMode', mode);
  }, [mode]);

  const getGradientClasses = (industry?: string): string => {
    const baseGradients = {
      dark: {
        default: 'from-[#115B87] via-[#1b3764] to-[#1b3764]',
        marine: 'from-[#137875] via-[#1b3764] to-[#1b3764]',
        industrial: 'from-[#F16A26] via-[#1b3764] to-[#1b3764]',
        transportation: 'from-[#b83d35] via-[#1b3764] to-[#1b3764]',
        construction: 'from-[#fec770] via-[#1b3764] to-[#1b3764]',
        composites: 'from-[#c7c8c9] via-[#1b3764] to-[#1b3764]',
        insulation: 'from-[#d0157d] via-[#1b3764] to-[#1b3764]'
      },
      light: {
        default: 'from-gray-100 via-gray-50 to-gray-100',
        marine: 'from-gray-100 via-gray-50 to-teal-50',
        industrial: 'from-gray-100 via-gray-50 to-orange-50',
        transportation: 'from-gray-100 via-gray-50 to-red-50',
        construction: 'from-gray-100 via-gray-50 to-yellow-50',
        composites: 'from-gray-100 via-gray-50 to-gray-50',
        insulation: 'from-gray-100 via-gray-50 to-pink-50'
      },
      light2: {
        default: 'from-gray-100 via-gray-50 to-gray-100',
        marine: 'from-gray-100 via-gray-50 to-teal-50',
        industrial: 'from-gray-100 via-gray-50 to-orange-50',
        transportation: 'from-gray-100 via-gray-50 to-red-50',
        construction: 'from-gray-100 via-gray-50 to-yellow-50',
        composites: 'from-gray-100 via-gray-50 to-gray-50',
        insulation: 'from-gray-100 via-gray-50 to-pink-50'
      }
    };

    const modeGradients = baseGradients[mode];
    const industryKey = industry?.toLowerCase() as keyof typeof modeGradients;
    
    return modeGradients[industryKey] || modeGradients.default;
  };

  const getTextClasses = (): string => {
    const textColors = {
      dark: 'text-white',
      light: 'text-[#1B3764]',
      light2: 'text-[#1B3764]'
    };
    return textColors[mode];
  };

  const getTextSecondaryClasses = (): string => {
    const textSecondaryColors = {
      dark: 'text-white/90',
      light: 'text-[#1B3764]/80',
      light2: 'text-[#1B3764]/80'
    };
    return textSecondaryColors[mode];
  };

  const value: GradientModeContextType = {
    mode,
    setMode,
    getGradientClasses,
    getTextClasses,
    getTextSecondaryClasses
  };

  return (
    <GradientModeContext.Provider value={value}>
      {children}
    </GradientModeContext.Provider>
  );
};

export const useGradientMode = (): GradientModeContextType => {
  const context = useContext(GradientModeContext);
  if (context === undefined) {
    throw new Error('useGradientMode must be used within a GradientModeProvider');
  }
  return context;
};
