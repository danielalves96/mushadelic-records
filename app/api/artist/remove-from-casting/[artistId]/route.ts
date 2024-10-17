import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function DELETE(req: NextRequest, { params }: { params: { artistId: string } }) {
  try {
    const artistId = params.artistId;

    const artist = await prisma.artist.findUnique({
      where: { id: artistId },
    });

    if (!artist) {
      return NextResponse.json({ error: 'Artista não encontrado' }, { status: 404 });
    }

    const castingArtist = await prisma.castingArtist.findUnique({
      where: { artistId },
    });

    if (!castingArtist) {
      return NextResponse.json({ error: 'Artista não está no casting' }, { status: 404 });
    }

    await prisma.castingArtist.delete({
      where: { artistId },
    });

    await prisma.artist.update({
      where: { id: artistId },
      data: { is_casting_artist: false },
    });

    return NextResponse.json({ message: 'Artista removido do casting com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao remover o artista do casting:', error);
    return NextResponse.json({ error: 'Erro ao remover o artista do casting' }, { status: 500 });
  }
}
