import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { artistId: string } }) {
  const { artistId } = params;

  try {
    const artist = await prisma.artist.findUnique({
      where: { id: artistId },
      include: {
        casting_artist: true,
      },
    });

    if (!artist) {
      return NextResponse.json(
        { message: 'Artist not found' },
        {
          status: 404,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            Pragma: 'no-cache',
            Expires: '0',
          },
        }
      );
    }

    return NextResponse.json(artist, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error) {
    console.error('Error fetching artist:', error);
    return NextResponse.json(
      { error: 'Error fetching artist' },
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
