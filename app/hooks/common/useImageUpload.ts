import { useState } from 'react';

import { uploadImage } from '@/lib/image-upload';

type UploadType = 'artist' | 'release' | 'profile';

interface UseImageUploadOptions {
  type: UploadType;
  onSuccess?: (imageUrl: string) => void;
  onError?: (error: string) => void;
}

export function useImageUpload({ type, onSuccess, onError }: UseImageUploadOptions) {
  const [isUploading, setIsUploading] = useState(false);

  const upload = async (file: File, oldImageUrl?: string): Promise<string> => {
    setIsUploading(true);

    try {
      const imageUrl = await uploadImage(file, type, oldImageUrl);
      onSuccess?.(imageUrl);
      return imageUrl;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      onError?.(errorMessage);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    upload,
    isUploading,
  };
}
