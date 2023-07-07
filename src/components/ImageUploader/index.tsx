import React, { useState, ChangeEvent } from 'react';

interface ImageUploaderProps {
  onImageChange: (dataUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement(`canvas`);
        const maxWidth = 400;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          const scaleFactor = maxWidth / width;
          width = maxWidth;
          height = Math.floor(height * scaleFactor);
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext(`2d`);
        ctx?.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL(`image/jpeg`);
        setSelectedImage(dataUrl);
        onImageChange(dataUrl);
      };

      img.src = e.target?.result as string;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: `flex`, flexDirection: `column`, gap: `20px` }}>
      {selectedImage && (
        <img
          style={{ border: `1px solid #9ef300` }}
          width={200}
          src={selectedImage}
          alt="Preview"
        />
      )}
      <input type="file" accept="image/*" onChange={handleImageUpload} />
    </div>
  );
};

export default ImageUploader;
