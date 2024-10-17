import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { slugify } from '@/lib/utils';

export async function PATCH(req: NextRequest, { params }: { params: { artistId: string } }) {
  const artistId = params.artistId;
  const body = await req.json();
  const {
    name,
    is_casting_artist,
    description,
    facebook_link,
    instagram_link,
    soundcloud_link,
    spotify_link,
    youtube_link,
    flag,
    picture,
  } = body;

  try {
    const updatedArtist = await prisma.artist.update({
      where: { id: artistId },
      data: {
        name: name || undefined,
        is_casting_artist: is_casting_artist !== undefined ? is_casting_artist : undefined,
      },
    });

    if (is_casting_artist === false) {
      await prisma.castingArtist.deleteMany({
        where: { artistId },
      });

      return NextResponse.json({
        ...updatedArtist,
        casting_artist: null,
      });
    }

    if (is_casting_artist === true) {
      const slug = slugify(name);

      const castingArtist = await prisma.castingArtist.upsert({
        where: { artistId },
        update: {
          description: description || undefined,
          facebook_link: facebook_link || undefined,
          instagram_link: instagram_link || undefined,
          soundcloud_link: soundcloud_link || undefined,
          spotify_link: spotify_link || undefined,
          youtube_link: youtube_link || undefined,
          flag: flag || undefined,
          picture: picture || undefined,
        },
        create: {
          artist: {
            connect: { id: artistId },
          },
          slug,
          description: description || '',
          facebook_link: facebook_link || '',
          instagram_link: instagram_link || '',
          soundcloud_link: soundcloud_link || '',
          spotify_link: spotify_link || '',
          youtube_link: youtube_link || '',
          flag: flag || '',
          picture: picture || '',
        },
      });

      return NextResponse.json({
        ...updatedArtist,
        casting_artist: castingArtist,
      });
    }

    return NextResponse.json(updatedArtist, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar o artista:', error);
    return NextResponse.json({ error: 'Erro ao atualizar o artista' }, { status: 500 });
  }
}
