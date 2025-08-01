import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const artist = await prisma.artist.findFirst({
      where: {
        casting_artist: {
          slug: slug,
        },
      },
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
