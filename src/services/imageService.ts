// Image service for handling product image uploads and management

import { ImageMappingService } from './imageMappingService';

export interface ImageUploadResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export class ImageService {
  /**
   * Simulates uploading an image file
   * In a real application, this would upload to a server or cloud storage
   */
  static async uploadImage(file: File): Promise<ImageUploadResult> {
    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        return {
          success: false,
          error: 'Please select an image file (JPEG, PNG, GIF, etc.)'
        };
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return {
          success: false,
          error: 'File size must be less than 5MB'
        };
      }

      // Generate a unique filename
      const timestamp = Date.now();
      const fileExtension = file.name.split('.').pop();
      const fileName = `product-${timestamp}.${fileExtension}`;
      const imageUrl = `/product-images/${fileName}`;

      // In a real app, you would upload the file to your server here
      // For now, we'll simulate the upload and provide instructions
      
      return {
        success: true,
        imageUrl: imageUrl
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to upload image. Please try again.'
      };
    }
  }

  /**
   * Gets a list of existing product images
   */
  static async getExistingImages(): Promise<string[]> {
    // Use the ImageMappingService to get available images
    return ImageMappingService.getAvailableImages();
  }

  /**
   * Validates if an image URL is accessible
   */
  static async validateImageUrl(imageUrl: string): Promise<boolean> {
    try {
      const response = await fetch(imageUrl, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Gets image dimensions
   */
  static getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = () => {
        resolve({ width: 0, height: 0 });
      };
      img.src = URL.createObjectURL(file);
    });
  }
}
