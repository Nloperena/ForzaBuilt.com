/**
 * Utility functions for Vercel Blob Storage URLs
 */

/**
 * Get the base URL for Vercel Blob Storage
 * Can be configured via VITE_BLOB_STORAGE_URL environment variable
 * Format: https://[account].public.blob.vercel-storage.com
 */
export function getBlobBaseUrl(): string {
  // Check for environment variable first
  const envUrl = import.meta.env.VITE_BLOB_STORAGE_URL;
  if (envUrl) {
    // Remove trailing slash if present
    return envUrl.replace(/\/$/, '');
  }
  
  // Default fallback - user should set VITE_BLOB_STORAGE_URL in their .env
  // This will fall back to local paths if not configured
  return '';
}

/**
 * Get a Vercel Blob Storage URL for a product image
 * @param imagePath - The path to the image (e.g., "ic932.png", "/product-images/ic932.png", or a full blob URL)
 * @returns The full blob URL - always uses blob storage if configured, otherwise falls back to local path
 */
export function getBlobImageUrl(imagePath: string): string {
  // If the imagePath is already a full URL (blob storage or external), return it as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  const baseUrl = getBlobBaseUrl();
  
  // Extract filename from path (handles various path formats)
  let filename = '';
  if (imagePath.includes('/')) {
    // Extract just the filename from the path
    filename = imagePath.split('/').pop() || imagePath;
  } else {
    filename = imagePath;
  }
  
  // Remove query parameters and hash if present
  filename = filename.split('?')[0].split('#')[0];
  
  // If no blob URL is configured, return local path
  if (!baseUrl) {
    // Ensure the path starts with /product-images/
    if (imagePath.startsWith('/')) {
      return imagePath;
    }
    if (imagePath.startsWith('product-images/')) {
      return `/${imagePath}`;
    }
    return `/product-images/${filename}`;
  }
  
  // Always use blob storage when configured
  // Use the filename in the product-images directory for blob storage
  const blobPath = `product-images/${filename}`;
  
  return `${baseUrl}/${blobPath}`;
}

/**
 * Check if a URL is a blob storage URL
 */
export function isBlobUrl(url: string): boolean {
  return url.includes('blob.vercel-storage.com') || url.includes('vercel-storage');
}

