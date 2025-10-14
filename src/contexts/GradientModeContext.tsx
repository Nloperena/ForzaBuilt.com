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
  // Always use light2 mode - no switching allowed
  const [mode] = useState<GradientMode>('light2');

  // Clear any old theme preferences from localStorage
  useEffect(() => {
    localStorage.removeItem('gradientMode');
  }, []);

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
        default: 'from-[#115B87] via-[#1b3764] to-[#1b3764]',
        marine: 'from-[#137875] via-[#1b3764] to-[#1b3764]',
        industrial: 'from-[#F16A26] via-[#1b3764] to-[#1b3764]',
        transportation: 'from-[#b83d35] via-[#1b3764] to-[#1b3764]',
        construction: 'from-[#fec770] via-[#1b3764] to-[#1b3764]',
        composites: 'from-[#c7c8c9] via-[#1b3764] to-[#1b3764]',
        insulation: 'from-[#d0157d] via-[#1b3764] to-[#1b3764]'
      },
      light2: {
        default: 'from-[#115B87] via-[#1b3764] to-[#1b3764]',
        marine: 'from-[#137875] via-[#1b3764] to-[#1b3764]',
        industrial: 'from-[#F16A26] via-[#1b3764] to-[#1b3764]',
        transportation: 'from-[#b83d35] via-[#1b3764] to-[#1b3764]',
        construction: 'from-[#fec770] via-[#1b3764] to-[#1b3764]',
        composites: 'from-[#c7c8c9] via-[#1b3764] to-[#1b3764]',
        insulation: 'from-[#d0157d] via-[#1b3764] to-[#1b3764]'
      }
    };

    const modeGradients = baseGradients[mode];
    const industryKey = industry?.toLowerCase() as keyof typeof modeGradients;
    
    return modeGradients[industryKey] || modeGradients.default;
  };

  const getTextClasses = (): string => {
    const textColors = {
      dark: 'text-white',
      light: 'text-white',
      light2: 'text-white'
    };
    return textColors[mode];
  };

  const getTextSecondaryClasses = (): string => {
    const textSecondaryColors = {
      dark: 'text-white/90',
      light: 'text-white/90',
      light2: 'text-white/90'
    };
    return textSecondaryColors[mode];
  };

  const value: GradientModeContextType = {
    mode,
    setMode: () => {}, // No-op function - theme switching disabled
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
