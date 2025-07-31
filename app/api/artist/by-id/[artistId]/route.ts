import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { artistId: string } }) {
  const { artistId } = params;

  try {
    const artist = await prisma.artist.findUnique({
      where: {
        id: artistId,
      },
      include: {
        casting_artist: true,
        music_releases: {
          orderBy: {
            release_date: 'desc',
          },
        },
      },
    });

    if (!artist) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 });
    }

    return NextResponse.json(artist, { status: 200 });
  } catch (error) {
    console.error('Error fetching artist by ID:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
