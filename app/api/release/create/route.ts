import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { slugify } from '@/lib/utils';

export async function POST(req: NextRequest) {
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
    const slug = slugify(music_name);

    const newRelease = await prisma.musicRelease.create({
      data: {
        music_name,
        description,
        buy_link,
        cover_art,
        soundcloud_link,
        spotify_link,
        youtube_link,
        deezer_link,
        apple_link,
        release_date: new Date(release_date),
        slug,
        artists: {
          connect: artistIds.map((id: string) => ({ id })),
        },
      },
    });

    return NextResponse.json(newRelease, {
      status: 201,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error) {
    console.error('Erro ao criar o release:', error);
    return NextResponse.json(
      { error: 'Erro ao criar o release' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );
  }
}
