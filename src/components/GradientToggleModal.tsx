import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Palette } from 'lucide-react';
import { useGradientMode } from '@/contexts/GradientModeContext';

export type GradientMode = 'dark' | 'neutral' | 'light';

interface GradientToggleModalProps {
  onModeChange: (mode: GradientMode) => void;
  currentMode: GradientMode;
}

const GradientToggleModal: React.FC<GradientToggleModalProps> = ({ 
  onModeChange, 
  currentMode 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { mode } = useGradientMode();

  // Show the toggle button after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleModeSelect = (selectedMode: GradientMode) => {
    onModeChange(selectedMode);
  };

  const modes = [
    {
      id: 'dark' as GradientMode,
      name: 'Dark',
      icon: Moon,
      description: 'Deep blue gradients'
    },
    {
      id: 'neutral' as GradientMode,
      name: 'Neutral',
      icon: Palette,
      description: 'Balanced gradients'
    },
    {
      id: 'light' as GradientMode,
      name: 'Light',
      icon: Sun,
      description: 'Clean light theme'
    }
  ];

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Mode Selector */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50"
      >
        <div className={`rounded-2xl p-2 shadow-lg ${
          mode === 'light' 
            ? 'bg-gradient-to-r from-[#1B3764] to-[#115B87] border border-white/20' 
            : 'bg-white/10 backdrop-blur-sm border border-white/20'
        }`}>
          <div className="flex flex-col gap-2">
            {modes.map((mode) => {
              const IconComponent = mode.icon;
              const isActive = mode.id === currentMode;
              
              return (
                <motion.button
                  key={mode.id}
                  onClick={() => handleModeSelect(mode.id)}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-[#F2611D] shadow-lg'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={`${mode.name} Mode - ${mode.description}`}
                  aria-label={`Switch to ${mode.name} mode`}
                >
                  <div className="relative">
                    <IconComponent 
                      className={`h-5 w-5 transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-white/70'
                      }`} 
                    />
                    {isActive && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default GradientToggleModal;
