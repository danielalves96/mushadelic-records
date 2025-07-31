import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function DELETE(request: Request, { params }: { params: { artistId: string } }) {
  try {
    const { artistId } = params;

    // Check if artist exists
    const existingArtist = await prisma.artist.findUnique({
      where: { id: artistId },
      include: {
        music_releases: true,
        casting_artist: true,
      },
    });

    if (!existingArtist) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 });
    }

    // Check if artist has releases
    if (existingArtist.music_releases.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete artist with existing releases. Please remove all releases first.' },
        { status: 400 }
      );
    }

    // Delete casting artist data if exists
    if (existingArtist.casting_artist) {
      await prisma.castingArtist.delete({
        where: { artistId: artistId },
      });
    }

    // Delete the artist
    await prisma.artist.delete({
      where: { id: artistId },
    });

    return NextResponse.json(
      { message: 'Artist deleted successfully' },
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
    console.error('Error deleting artist:', error);

    return NextResponse.json(
      { error: 'Failed to delete artist' },
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
