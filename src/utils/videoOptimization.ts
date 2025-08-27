/**
 * Video optimization utilities for better performance on Vercel
 */

export interface VideoLoadOptions {
  preload?: 'none' | 'metadata' | 'auto';
  poster?: string;
  fallbackImage?: string;
  onLoad?: () => void;
  onError?: (error: Event) => void;
  onTimeout?: () => void;
  timeoutMs?: number;
}

/**
 * Creates an optimized video element with proper fallbacks
 */
export const createOptimizedVideo = (
  src: string,
  options: VideoLoadOptions = {}
): HTMLVideoElement => {
  const video = document.createElement('video');
  
  // Set video attributes
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.preload = options.preload || 'metadata';
  
  if (options.poster) {
    video.poster = options.poster;
  }
  
  // Add source
  const source = document.createElement('source');
  source.src = src;
  source.type = 'video/mp4';
  video.appendChild(source);
  
  // Add fallback image
  if (options.fallbackImage) {
    const img = document.createElement('img');
    img.src = options.fallbackImage;
    img.alt = 'Video fallback';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    video.appendChild(img);
  }
  
  // Add event listeners
  if (options.onLoad) {
    video.addEventListener('loadeddata', options.onLoad);
    video.addEventListener('canplay', options.onLoad);
  }
  
  if (options.onError) {
    video.addEventListener('error', options.onError);
  }
  
  // Add timeout handling
  if (options.onTimeout && options.timeoutMs) {
    const timeout = setTimeout(() => {
      options.onTimeout?.();
    }, options.timeoutMs);
    
    video.addEventListener('loadeddata', () => clearTimeout(timeout));
    video.addEventListener('canplay', () => clearTimeout(timeout));
  }
  
  return video;
};

/**
 * Preloads a video without playing it
 */
export const preloadVideo = (src: string): Promise<HTMLVideoElement> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.muted = true;
    video.preload = 'metadata';
    
    const source = document.createElement('source');
    source.src = src;
    source.type = 'video/mp4';
    video.appendChild(source);
    
    video.addEventListener('loadedmetadata', () => {
      resolve(video);
    });
    
    video.addEventListener('error', (error) => {
      reject(error);
    });
    
    video.load();
  });
};

/**
 * Checks if video format is supported
 */
export const isVideoSupported = (): boolean => {
  const video = document.createElement('video');
  return video.canPlayType('video/mp4') !== '';
};

/**
 * Gets the best video quality based on connection
 */
export const getOptimalVideoQuality = (): 'low' | 'medium' | 'high' => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return 'low';
    } else if (connection.effectiveType === '3g') {
      return 'medium';
    }
  }
  return 'high';
};

/**
 * Lazy loads videos when they come into view
 */
export const lazyLoadVideos = (videoSelector: string, options: VideoLoadOptions = {}) => {
  const videos = document.querySelectorAll(videoSelector);
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const video = entry.target as HTMLVideoElement;
        if (video.dataset.src) {
          video.src = video.dataset.src;
          video.load();
          observer.unobserve(video);
        }
      }
    });
  }, {
    rootMargin: '50px', // Start loading 50px before video comes into view
    threshold: 0.1
  });
  
  videos.forEach((video) => {
    if (video.dataset.src) {
      observer.observe(video);
    }
  });
  
  return observer;
};
