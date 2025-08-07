import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageIcon, Upload, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ImageService } from '@/services/imageService';

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageChange: (imageUrl: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
}

export default function ImageUpload({ 
  currentImageUrl, 
  onImageChange, 
  onImageUpload 
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load existing images on component mount
  React.useEffect(() => {
    const loadExistingImages = async () => {
      try {
        const images = await ImageService.getExistingImages();
        setExistingImages(images);
      } catch (error) {
        console.error('Failed to load existing images:', error);
      }
    };
    loadExistingImages();
  }, []);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Use the ImageService to handle the upload
      const result = await ImageService.uploadImage(file);
      
      if (result.success && result.imageUrl) {
        onImageChange(result.imageUrl);
        
        // Show instructions for manual file placement
        alert(`Image uploaded successfully!\n\nTo complete the upload:\n1. Copy the file "${file.name}" to the "/public/product-images/" folder\n2. Rename it to "${result.imageUrl.split('/').pop()}"\n\nThis ensures the image is available on your website.`);
      } else {
        alert(result.error || 'Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveImage = () => {
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const simulateUpload = async (file: File): Promise<string> => {
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // In a real app, this would upload to your server/cloud storage
    // For now, we'll create a local URL and suggest the user copy the file to the public folder
    const fileName = `product-${Date.now()}-${file.name}`;
    const imageUrl = `/product-images/${fileName}`;
    
    // Show instructions to the user
    alert(`Image uploaded! Please copy the file "${file.name}" to the "/public/product-images/" folder and rename it to "${fileName}"`);
    
    return imageUrl;
  };

  return (
    <div className="space-y-4">
      {/* Current Image Display */}
      <div className="border rounded-md p-4 w-full flex justify-center">
        {currentImageUrl ? (
          <div className="relative">
            <img 
              src={currentImageUrl} 
              alt="Product" 
              className="max-h-[200px] object-contain"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6"
              onClick={handleRemoveImage}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="h-[200px] w-full flex items-center justify-center bg-muted">
            <ImageIcon className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      {/* Upload Controls */}
      <div className="space-y-2">
        <Label htmlFor="imageFile">Product Image</Label>
        <div className="flex items-center gap-2">
          <Input
            ref={fileInputRef}
            id="imageFile"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={isUploading}
            className="flex-1"
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" disabled={isUploading}>
                <Upload className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Product Image</DialogTitle>
                <DialogDescription>
                  Upload a new image for this product. Supported formats: JPEG, PNG, GIF. Max size: 5MB.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop an image here, or click to select
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    Choose File
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Upload Image'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Select from existing images */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Select Existing Image</DialogTitle>
                <DialogDescription>
                  Choose from existing product images
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                  {existingImages.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="aspect-square border rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                      onClick={() => {
                        onImageChange(imageUrl);
                        setShowImagePicker(false);
                      }}
                    >
                      <img
                        src={imageUrl}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-xs text-muted-foreground">
        <p>• Supported formats: JPEG, PNG, GIF</p>
        <p>• Maximum file size: 5MB</p>
        <p>• Recommended dimensions: 400x400px or larger</p>
        <p>• Images will be stored in /public/product-images/</p>
      </div>
    </div>
  );
}
