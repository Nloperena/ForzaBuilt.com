import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BookViewerContextType {
  isBookOpen: boolean;
  setIsBookOpen: (open: boolean) => void;
}

const BookViewerContext = createContext<BookViewerContextType | undefined>(undefined);

export const BookViewerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isBookOpen, setIsBookOpen] = useState(false);

  return (
    <BookViewerContext.Provider value={{ isBookOpen, setIsBookOpen }}>
      {children}
    </BookViewerContext.Provider>
  );
};

export const useBookViewer = () => {
  const context = useContext(BookViewerContext);
  if (context === undefined) {
    throw new Error('useBookViewer must be used within a BookViewerProvider');
  }
  return context;
};
















