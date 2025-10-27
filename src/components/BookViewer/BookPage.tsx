import React from 'react';
import { Page } from 'react-pdf';

interface BookPageProps {
  pageNumber: number;
  width: number;
  showSkeleton?: boolean;
}

const PageSkeleton: React.FC<{ width: number }> = ({ width }) => {
  const height = width * 1.4;
  
  return (
    <div 
      className="relative bg-white overflow-hidden"
      style={{ width, height }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 animate-pulse" />
      
      {/* Skeleton content lines */}
      <div className="absolute inset-0 p-8 flex flex-col gap-3">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" style={{ animationDelay: '0ms' }} />
        
        {/* Content line skeletons */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="h-3 bg-gray-200 rounded animate-pulse"
            style={{ 
              width: i % 3 === 0 ? '95%' : i % 3 === 1 ? '100%' : '85%',
              animationDelay: `${i * 50}ms`
            }}
          />
        ))}
        
        {/* Paragraph break */}
        <div className="h-6" />
        
        {/* More content lines */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={`p2-${i}`}
            className="h-3 bg-gray-200 rounded animate-pulse"
            style={{ 
              width: i % 4 === 0 ? '90%' : i % 4 === 1 ? '100%' : i % 4 === 2 ? '92%' : '88%',
              animationDelay: `${(i + 12) * 50}ms`
            }}
          />
        ))}
      </div>
      
      {/* Shimmer effect overlay */}
      <div 
        className="absolute inset-0 pointer-events-none animate-shimmer"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
        }}
      />
      
      {/* Page number hint */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-300 font-mono">
        Loading...
      </div>
    </div>
  );
};

const BookPage: React.FC<BookPageProps> = ({ pageNumber, width, showSkeleton = false }) => {
  return (
    <div className="relative bg-white">
      <Page
        pageNumber={pageNumber}
        width={width}
        renderTextLayer={false}
        renderAnnotationLayer={false}
        loading={showSkeleton ? <PageSkeleton width={width} /> : <div style={{ width, height: width * 1.4, backgroundColor: '#ffffff' }} />}
      />
      
      {/* Subtle paper texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default BookPage;

