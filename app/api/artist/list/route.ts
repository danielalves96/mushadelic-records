import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const artists = await prisma.artist.findMany({
      include: {
        casting_artist: true,
      },
    });

    return NextResponse.json(artists, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao listar os artistas' }, { status: 500 });
  }
}
