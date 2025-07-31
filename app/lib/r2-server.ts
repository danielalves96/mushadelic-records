// Server-side R2 utilities
import { DeleteObjectCommand } from '@aws-sdk/client-s3';

import { R2_BUCKET_NAME, R2_PUBLIC_URL, r2Client } from './r2';

export async function deleteImageFromUrl(imageUrl: string): Promise<void> {
  if (!imageUrl || !imageUrl.includes(R2_PUBLIC_URL)) {
    return; // Not our image, skip deletion
  }

  const fileName = imageUrl.replace(`${R2_PUBLIC_URL}/`, '');
  if (!fileName) return;

  try {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fileName,
    });
    await r2Client.send(deleteCommand);
  } catch (error) {
    console.error('Error deleting image:', error);
    // Don't throw - this shouldn't break the main operation
  }
}

export async function deleteImagesFromUrls(imageUrls: (string | null | undefined)[]): Promise<void> {
  const validUrls = imageUrls.filter((url): url is string => Boolean(url));
  await Promise.all(validUrls.map((url) => deleteImageFromUrl(url)));
}
