import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

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

    return NextResponse.json(castingArtists, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao listar os artistas do casting' }, { status: 500 });
  }
}
