import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { deleteImagesFromUrls } from '@/lib/r2-server';

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
      select: { picture: true, flag: true },
    });

    if (!castingArtist) {
      return NextResponse.json({ error: 'Artista não está no casting' }, { status: 404 });
    }

    // Delete casting artist record
    await prisma.castingArtist.delete({
      where: { artistId },
    });

    // Delete images from R2 if they exist
    await deleteImagesFromUrls([castingArtist.picture, castingArtist.flag]);

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
