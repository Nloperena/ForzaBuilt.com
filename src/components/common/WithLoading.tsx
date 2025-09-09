import React, { useState, useEffect } from 'react';
import { useLoading } from '@/contexts/LoadingContext';

interface WithLoadingProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
  loadingKey?: string;
  delay?: number;
  minLoadingTime?: number;
}

const WithLoading: React.FC<WithLoadingProps> = ({
  children,
  fallback,
  loadingKey = 'default',
  delay = 0,
  minLoadingTime = 500
}) => {
  const { isComponentLoading, setLoadingState } = useLoading();
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLocalLoading(false);
      setLoadingState(loadingKey, false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, loadingKey, setLoadingState]);

  useEffect(() => {
    if (!isLocalLoading) {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsed);
      
      if (remainingTime > 0) {
        const timer = setTimeout(() => {
          setLoadingState(loadingKey, false);
        }, remainingTime);
        
        return () => clearTimeout(timer);
      } else {
        setLoadingState(loadingKey, false);
      }
    }
  }, [isLocalLoading, startTime, minLoadingTime, loadingKey, setLoadingState]);

  const isLoading = isComponentLoading(loadingKey) || isLocalLoading;

  if (isLoading) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default WithLoading;
