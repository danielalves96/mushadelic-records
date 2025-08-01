/**
 * Upload image file to server
 * @param file - Processed image file
 * @param type - Upload type (artist, release, profile)
 * @param oldImageUrl - URL of old image to delete (optional)
 * @returns Promise<string> - New image URL
 */
export async function uploadImage(
  file: File,
  type: 'artist' | 'release' | 'profile',
  oldImageUrl?: string
): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  // Add old image URL for deletion if provided
  if (oldImageUrl) {
    formData.append('oldImageUrl', oldImageUrl);
  }

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to upload image');
  }

  const { imageUrl } = await response.json();
  return imageUrl;
}

/**
 * Delete image from server
 * @param imageUrl - URL of image to delete
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  if (!imageUrl) return;

  try {
    await fetch('/api/upload', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    });
  } catch (error) {
    console.warn('Failed to delete old image:', error);
    // Don't throw - we don't want to fail the whole operation if deletion fails
  }
}
