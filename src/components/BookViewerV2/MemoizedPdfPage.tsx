import React from 'react';
import { Page } from 'react-pdf';

interface MemoizedPdfPageProps {
  pageNumber: number;
  width: number;
  renderTextLayer?: boolean;
  renderAnnotationLayer?: boolean;
  isPlaceholder?: boolean;
}

const PdfPage: React.FC<MemoizedPdfPageProps> = ({
  pageNumber,
  width,
  renderTextLayer = false,
  renderAnnotationLayer = false,
  isPlaceholder = false,
}) => {
  // If it's a placeholder, render an empty div with the correct dimensions
  if (isPlaceholder) {
    return (
      <div 
        className="bg-white shadow-lg flex items-center justify-center"
        style={{ 
          width: `${width}px`, 
          height: `${width * 1.414}px`, // A4 aspect ratio
        }}
      >
        <div className="text-gray-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className="pdf-page-wrapper">
      <Page
        pageNumber={pageNumber}
        width={width}
        renderTextLayer={renderTextLayer}
        renderAnnotationLayer={renderAnnotationLayer}
        loading={
          <div 
            className="bg-gray-100 shadow-lg flex items-center justify-center animate-pulse"
            style={{ 
              width: `${width}px`, 
              height: `${width * 1.414}px`,
            }}
          >
            <div className="text-gray-400">Loading page {pageNumber}...</div>
          </div>
        }
      />
    </div>
  );
};

// Memoize to prevent expensive canvas re-renders
export const MemoizedPdfPage = React.memo(PdfPage, (prevProps, nextProps) => {
  return (
    prevProps.pageNumber === nextProps.pageNumber &&
    prevProps.width === nextProps.width &&
    prevProps.renderTextLayer === nextProps.renderTextLayer &&
    prevProps.renderAnnotationLayer === nextProps.renderAnnotationLayer &&
    prevProps.isPlaceholder === nextProps.isPlaceholder
  );
});

