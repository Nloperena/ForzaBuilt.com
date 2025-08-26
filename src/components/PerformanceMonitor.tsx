import React, { useEffect } from 'react';

const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    // Only run in development
    if (import.meta.env.DEV) {
      // Monitor page load performance
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            console.log('🚀 Performance Metrics:', {
              'DOM Content Loaded': `${Math.round(navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart)}ms`,
              'Load Complete': `${Math.round(navEntry.loadEventEnd - navEntry.loadEventStart)}ms`,
              'Total Load Time': `${Math.round(navEntry.loadEventEnd - navEntry.fetchStart)}ms`,
              'First Paint': `${Math.round(navEntry.domContentLoadedEventEnd - navEntry.fetchStart)}ms`,
            });
          }
        }
      });

      observer.observe({ entryTypes: ['navigation'] });

      // Monitor largest contentful paint
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('🎨 Largest Contentful Paint:', `${Math.round(entry.startTime)}ms`);
          }
        }
      });

      paintObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      return () => {
        observer.disconnect();
        paintObserver.disconnect();
      };
    }
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;
