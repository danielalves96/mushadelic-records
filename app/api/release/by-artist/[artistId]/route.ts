import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { artistId: string } }) {
  const { artistId } = params;

  try {
    const releases = await prisma.musicRelease.findMany({
      where: {
        artists: {
          some: {
            id: artistId,
          },
        },
      },
      include: {
        artists: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        release_date: 'desc',
      },
    });

    return NextResponse.json(releases, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error) {
    console.error('Erro ao buscar releases do artista:', error);
    return NextResponse.json({ error: 'Erro ao buscar releases do artista' }, { status: 500 });
  }
}
