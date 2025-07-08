// Design System - Centralized design tokens
export const colors = {
  primary: '#1b3764',
  secondary: '#F2611D',
  white: '#ffffff',
  black: '#000000',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  red: {
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
  },
  green: {
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
  },
  orange: {
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
  }
} as const;

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
  '5xl': '8rem',
} as const;

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    kallisto: ['Kallisto', 'sans-serif'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
    '10xl': '9rem',
  },
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Common class combinations
export const commonClasses = {
  primaryBackground: `bg-[${colors.primary}]`,
  primaryText: `text-[${colors.primary}]`,
  secondaryBackground: `bg-[${colors.secondary}]`,
  secondaryText: `text-[${colors.secondary}]`,
  whiteText: 'text-white',
  sectionPadding: 'py-20',
  containerMaxWidth: 'max-w-[1200px]',
  containerPadding: 'px-4',
} as const;

// Animation durations
export const animations = {
  fast: '0.1s',
  normal: '0.3s',
  slow: '0.5s',
  slower: '0.7s',
} as const; 