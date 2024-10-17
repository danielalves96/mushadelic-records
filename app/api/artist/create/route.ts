import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name } = body;

  try {
    const newArtist = await prisma.artist.create({
      data: {
        name,
      },
    });

    return NextResponse.json(newArtist, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao criar o artista' }, { status: 500 });
  }
}
