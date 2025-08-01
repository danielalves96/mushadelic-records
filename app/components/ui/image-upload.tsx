'use client';

import { Image as ImageIcon, Loader2, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';

import { processImage } from '@/lib/image-processor';
import { Button } from './button';
import { Label } from './label';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onFileChange?: (file: File | null) => void;
  label?: string;
  placeholder?: string;
}

export function ImageUpload({ value, onChange, onFileChange, label, placeholder }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(value || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    setIsProcessing(true);

    try {
      // Process image: resize and convert to WebP
      const processedFile = await processImage(file, 500, 0.8);

      // Show preview of processed image
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(processedFile);

      // Notify parent component about processed file
      if (onFileChange) {
        onFileChange(processedFile);
      }
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onFileChange) {
      onFileChange(null);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {label && <Label>{label}</Label>}

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        {isProcessing ? (
          <div className="text-center">
            <Loader2 className="mx-auto h-12 w-12 text-blue-500 animate-spin" />
            <p className="mt-4 text-sm text-gray-600">Processing image...</p>
          </div>
        ) : preview ? (
          <div className="relative">
            <img src={preview} alt="Preview" className="max-w-full h-32 object-cover rounded-lg mx-auto" />
            <div className="flex gap-2 mt-4 justify-center">
              <Button type="button" variant="outline" onClick={handleRemove} size="sm" disabled={isProcessing}>
                <X className="h-4 w-4" />
                Remove
              </Button>
              <Button type="button" variant="outline" onClick={openFileDialog} size="sm" disabled={isProcessing}>
                <Upload className="h-4 w-4" />
                Change
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <Button type="button" variant="outline" onClick={openFileDialog} disabled={isProcessing}>
                <Upload className="h-4 w-4 mr-2" />
                Choose Image
              </Button>
            </div>
            {placeholder && <p className="mt-2 text-sm text-gray-500">{placeholder}</p>}
            <p className="mt-2 text-xs text-gray-400">
              Images will be automatically resized and converted to WebP
              <br />
              <span className="text-amber-600">Upload happens when you submit the form</span>
            </p>
          </div>
        )}
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
    </div>
  );
}
