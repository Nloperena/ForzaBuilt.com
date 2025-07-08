import React from 'react';
import { colors } from '@/lib/design-system';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'primary' | 'white' | 'transparent';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  textColor?: 'white' | 'primary' | 'secondary';
}

const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  background = 'primary',
  padding = 'lg',
  maxWidth = 'lg',
  textColor = 'white',
}) => {
  const backgroundClasses = {
    primary: `bg-[${colors.primary}]`,
    white: 'bg-white',
    transparent: 'bg-transparent',
  };

  const paddingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-20',
  };

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  };

  const textColorClasses = {
    white: 'text-white',
    primary: `text-[${colors.primary}]`,
    secondary: `text-[${colors.secondary}]`,
  };

  return (
    <section
      className={`
        ${backgroundClasses[background]}
        ${paddingClasses[padding]}
        ${textColorClasses[textColor]}
        ${className}
      `}
    >
      <div className={`w-full px-4 ${maxWidthClasses[maxWidth]} mx-auto`}>
        {children}
      </div>
    </section>
  );
};

export default Section; 