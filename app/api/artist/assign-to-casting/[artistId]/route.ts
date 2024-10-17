import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { slugify } from '@/lib/utils';

export async function POST(req: NextRequest, { params }: { params: { artistId: string } }) {
  const body = await req.json();
  const { description, facebook_link, instagram_link, soundcloud_link, spotify_link, youtube_link, flag, picture } =
    body;

  try {
    const artistId = params.artistId;

    const artist = await prisma.artist.findUnique({
      where: { id: artistId },
    });

    if (!artist) {
      return NextResponse.json({ error: 'Artista não encontrado' }, { status: 404 });
    }

    const slug = slugify(artist.name);

    const castingArtist = await prisma.castingArtist.create({
      data: {
        artist: {
          connect: { id: artistId },
        },
        description,
        facebook_link,
        instagram_link,
        soundcloud_link,
        spotify_link,
        youtube_link,
        slug,
        flag,
        picture,
      },
    });

    await prisma.artist.update({
      where: { id: artistId },
      data: { is_casting_artist: true },
    });

    return NextResponse.json(castingArtist, { status: 201 });
  } catch (error) {
    console.error('Erro ao atribuir o artista ao casting:', error);
    return NextResponse.json({ error: 'Erro ao atribuir o artista ao casting' }, { status: 500 });
  }
}
