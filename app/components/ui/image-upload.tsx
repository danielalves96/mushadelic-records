'use client';

import { Image as ImageIcon, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Notify parent component about file selection
    if (onFileChange) {
      onFileChange(file);
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
        {preview ? (
          <div className="relative">
            <img src={preview} alt="Preview" className="max-w-full h-32 object-cover rounded-lg mx-auto" />
            <div className="flex gap-2 mt-4 justify-center">
              <Button type="button" variant="outline" onClick={handleRemove} size="sm">
                <X className="h-4 w-4" />
                Remove
              </Button>
              <Button type="button" variant="outline" onClick={openFileDialog} size="sm">
                <Upload className="h-4 w-4" />
                Change
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <Button type="button" variant="outline" onClick={openFileDialog}>
                <Upload className="h-4 w-4 mr-2" />
                Choose Image
              </Button>
            </div>
            {placeholder && <p className="mt-2 text-sm text-gray-500">{placeholder}</p>}
          </div>
        )}
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
    </div>
  );
}
