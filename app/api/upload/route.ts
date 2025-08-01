import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { R2_BUCKET_NAME, R2_PUBLIC_URL, r2Client } from '@/lib/r2';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'artist', 'release', or 'user'
    const oldImageUrl = formData.get('oldImageUrl') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!type || !['artist', 'release', 'user'].includes(type)) {
      return NextResponse.json({ error: 'Invalid type. Must be "artist", "release", or "user"' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    // Generate unique filename with folder structure
    const fileExtension = file.name.split('.').pop();
    const folder = type === 'artist' ? 'artists_images' : type === 'release' ? 'releases_images' : 'user_images';
    const fileName = `${folder}/${uuidv4()}.${fileExtension}`;

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to R2
    const putCommand = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
      ACL: 'public-read',
    });

    await r2Client.send(putCommand);

    // Delete old image if it exists and is in our bucket
    if (oldImageUrl && oldImageUrl.includes(R2_PUBLIC_URL)) {
      const oldFileName = oldImageUrl.replace(`${R2_PUBLIC_URL}/`, '');
      if (oldFileName && oldFileName !== fileName) {
        try {
          const deleteCommand = new DeleteObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: oldFileName,
          });
          await r2Client.send(deleteCommand);
        } catch (deleteError) {
          console.error('Error deleting old image:', deleteError);
          // Continue even if delete fails
        }
      }
    }

    const imageUrl = `${R2_PUBLIC_URL}/${fileName}`;

    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json({ error: 'No image URL provided' }, { status: 400 });
    }

    // Only delete images from our bucket
    if (!imageUrl.includes(R2_PUBLIC_URL)) {
      return NextResponse.json({ error: 'Invalid image URL' }, { status: 400 });
    }

    const fileName = imageUrl.replace(`${R2_PUBLIC_URL}/`, '');

    const deleteCommand = new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fileName,
    });

    await r2Client.send(deleteCommand);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
