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
 * Normalize industry name for blob storage paths
 * Converts to Capitalized format to match production blob storage structure
 * Production uses: product-images/{CapitalizedIndustry}/filename.png
 * Examples: "industrial_industry" -> "Industrial", "construction_industry" -> "Construction"
 */
function normalizeIndustryName(industry: string | string[] | undefined): string | undefined {
  if (!industry) return undefined;
  
  const industryStr = Array.isArray(industry) ? industry[0] : industry;
  if (!industryStr) return undefined;
  
  // Normalize: remove "_industry" suffix, replace underscores/spaces with spaces, then capitalize
  let normalized = industryStr.trim();
  normalized = normalized.replace(/_industry$/i, ''); // Remove "_industry" suffix (case insensitive)
  normalized = normalized.replace(/_/g, ' '); // Replace underscores with spaces
  normalized = normalized.replace(/\s+/g, ' '); // Collapse multiple spaces
  
  // Capitalize first letter of each word (Title Case)
  normalized = normalized
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
  
  // Handle common industry names that might need special formatting
  const industryMap: Record<string, string> = {
    'industrial': 'Industrial',
    'construction': 'Construction',
    'marine': 'Marine',
    'transportation': 'Transportation',
    'composites': 'Composites',
    'insulation': 'Insulation',
  };
  
  return industryMap[normalized.toLowerCase()] || normalized;
}

/**
 * Get a Vercel Blob Storage URL for a product image
 * @param imagePath - The path to the image (e.g., "ic932.png", "/product-images/ic932.png", or a full blob URL)
 * @param industry - Optional industry name or array for blob storage path organization (e.g., "marine", "construction")
 * @returns The full blob URL - always uses blob storage if configured, otherwise falls back to local path
 */
export function getBlobImageUrl(imagePath: string, industry?: string | string[]): string {
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
  
  // If no blob URL is configured, return local path (always use flat /product-images/ structure locally)
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
  
  // When blob storage is configured, use the production structure
  // Production uses: product-images/{CapitalizedIndustry}/filename.png (plural "product-images" with capitalized industry subfolder)
  // Example: product-images/Industrial/FRP 3.5 gal pail.png
  // Local uses: /product-images/filename.png (plural "product-images" flat)
  const normalizedIndustry = normalizeIndustryName(industry);
  
  let blobPath: string;
  if (normalizedIndustry) {
    // Production blob storage structure: product-images/{CapitalizedIndustry}/filename.png
    blobPath = `product-images/${normalizedIndustry}/${filename}`;
  } else {
    // Fallback to flat structure if no industry provided
    blobPath = `product-images/${filename}`;
  }
  
  return `${baseUrl}/${blobPath}`;
}

/**
 * Check if a URL is a blob storage URL
 */
export function isBlobUrl(url: string): boolean {
  return url.includes('blob.vercel-storage.com') || url.includes('vercel-storage');
}

