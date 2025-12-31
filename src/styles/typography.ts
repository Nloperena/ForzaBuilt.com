/**
 * Centralized Typography Configuration
 * 
 * All heading font sizes are managed from this file.
 * To change font sizes globally, update the values below.
 */

export const typography = {
  /**
   * Hero Section - Main homepage hero heading
   * Mobile: 1.5rem (24px), Desktop: 3.5rem (56px)
   */
  hero: {
    fontSize: 'clamp(1.5rem, 2.5vw + 0.5rem, 3.5rem)',
  },

  /**
   * Section Headings - Standard section titles
   * Mobile: 22px, Desktop: 44px
   */
  sectionHeading: {
    fontSize: 'clamp(22px, 2vw + 0.5rem, 44px)',
  },

  /**
   * Industries We Serve - Matches section heading size
   * Mobile: 22px, Desktop: 44px
   */
  industriesHeading: {
    fontSize: 'clamp(22px, 2vw + 0.5rem, 44px)',
  },

  /**
   * Page Headings - Page-level titles
   * Mobile: 20px, Desktop: 40px
   */
  pageHeading: {
    fontSize: 'clamp(20px, 2vw + 0.5rem, 40px)',
  },

  /**
   * Subsection Headings - Smaller section titles
   * Mobile: 1.5rem (24px), Desktop: 2rem (32px)
   */
  subsectionHeading: {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
  },

  /**
   * Industry Page Headings - Industry-specific page titles
   * Mobile: 22px, Desktop: 44px
   */
  industryPageHeading: {
    fontSize: 'clamp(22px, 2.5vw, 44px)',
  },

  /**
   * Banner/Display Text - Large display text
   * Mobile: 18px, Desktop: 64px
   */
  bannerText: {
    fontSize: 'clamp(18px, 2vw + 0.5rem, 64px)',
  },
} as const;

/**
 * Helper function to get font size style object
 */
export const getFontSize = (type: keyof typeof typography): { fontSize: string } => {
  return { fontSize: typography[type].fontSize };
};

/**
 * Helper function to get font size string value
 */
export const getFontSizeValue = (type: keyof typeof typography): string => {
  return typography[type].fontSize;
};

