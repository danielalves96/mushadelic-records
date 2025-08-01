import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

// Force dynamic rendering - no cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const castingArtists = await prisma.artist.findMany({
      where: {
        is_casting_artist: true,
      },
      include: {
        casting_artist: true,
      },
    });

    return NextResponse.json(castingArtists, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, private, max-age=0',
        Pragma: 'no-cache',
        Expires: '0',
        ETag: `"${Date.now()}"`,
        'Last-Modified': new Date().toUTCString(),
        Vary: '*',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Erro ao listar os artistas do casting' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, private, max-age=0',
          Pragma: 'no-cache',
          Expires: '0',
          ETag: `"${Date.now()}"`,
          'Last-Modified': new Date().toUTCString(),
          Vary: '*',
        },
      }
    );
  }
}
