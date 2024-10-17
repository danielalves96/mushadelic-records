import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function PATCH(req: NextRequest, { params }: { params: { releaseId: string } }) {
  const releaseId = params.releaseId;
  const body = await req.json();

  const {
    music_name,
    description,
    buy_link,
    cover_art,
    soundcloud_link,
    spotify_link,
    youtube_link,
    deezer_link,
    apple_link,
    release_date,
    artistIds,
  } = body;

  try {
    const updatedRelease = await prisma.musicRelease.update({
      where: { id: releaseId },
      data: {
        music_name: music_name || undefined,
        description: description || undefined,
        buy_link: buy_link || undefined,
        cover_art: cover_art || undefined,
        soundcloud_link: soundcloud_link || undefined,
        spotify_link: spotify_link || undefined,
        youtube_link: youtube_link || undefined,
        deezer_link: deezer_link || undefined,
        apple_link: apple_link || undefined,
        release_date: release_date ? new Date(release_date) : undefined,
        artists: artistIds
          ? {
              set: artistIds.map((id: string) => ({ id })),
            }
          : undefined,
      },
    });

    return NextResponse.json(updatedRelease, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar o release:', error);
    return NextResponse.json({ error: 'Erro ao atualizar o release' }, { status: 500 });
  }
}
