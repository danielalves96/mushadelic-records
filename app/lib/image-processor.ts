/**
 * Calculate new dimensions maintaining aspect ratio with minimum side constraint
 */
function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  minSide: number
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight;

  // Determine which side is smaller
  const isWidthSmaller = originalWidth < originalHeight;

  let newWidth: number;
  let newHeight: number;

  if (isWidthSmaller) {
    // Width is smaller, set it to minSide
    newWidth = minSide;
    newHeight = Math.round(minSide / aspectRatio);
  } else {
    // Height is smaller, set it to minSide
    newHeight = minSide;
    newWidth = Math.round(minSide * aspectRatio);
  }

  return { width: newWidth, height: newHeight };
}

/**
 * Convert filename to WebP extension
 */
function getWebPFileName(originalName: string): string {
  const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
  return `${nameWithoutExt}.webp`;
}

/**
 * Processes an image file: resizes and converts to WebP format
 * @param file - The original image file
 * @param minSide - Minimum side size (default: 500px)
 * @param quality - WebP quality (0-1, default: 0.8)
 * @returns Promise<File> - Processed WebP file
 */
export async function processImage(file: File, minSide: number = 500, quality: number = 1): Promise<File> {
  return new Promise((resolve, reject) => {
    // Create canvas and context
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Canvas context not supported'));
      return;
    }

    // Create image element
    const img = new Image();

    img.onload = () => {
      try {
        // Calculate new dimensions
        const { width: newWidth, height: newHeight } = calculateDimensions(img.width, img.height, minSide);

        // Set canvas size
        canvas.width = newWidth;
        canvas.height = newHeight;

        // Draw resized image
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Convert to WebP blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to convert image to WebP'));
              return;
            }

            // Create new File with WebP extension
            const processedFile = new File([blob], getWebPFileName(file.name), { type: 'image/webp' });

            resolve(processedFile);
          },
          'image/webp',
          quality
        );
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // Load the image
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Check if browser supports WebP
 */
export function supportsWebP(): boolean {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}
