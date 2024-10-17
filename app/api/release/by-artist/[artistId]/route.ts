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
        artists: true,
      },
    });

    if (releases.length === 0) {
      return NextResponse.json({ message: 'No releases found for this artist' }, { status: 404 });
    }

    return NextResponse.json(releases, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar releases do artista:', error);
    return NextResponse.json({ error: 'Erro ao buscar releases do artista' }, { status: 500 });
  }
}
