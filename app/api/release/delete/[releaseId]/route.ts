import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { deleteImageFromUrl } from '@/lib/r2-server';

export async function DELETE(req: NextRequest, { params }: { params: { releaseId: string } }) {
  const { releaseId } = params;

  try {
    // First get the release to check for cover art
    const release = await prisma.musicRelease.findUnique({
      where: { id: releaseId },
      select: { cover_art: true },
    });

    // Delete the release from database
    await prisma.musicRelease.delete({
      where: { id: releaseId },
    });

    // Delete cover art from R2 if it exists
    if (release?.cover_art) {
      await deleteImageFromUrl(release.cover_art);
    }

    return NextResponse.json(
      { message: 'Release deleted successfully' },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );
  } catch (error) {
    console.error('Error deleting release:', error);
    return NextResponse.json(
      { error: 'Error deleting release' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );
  }
}
