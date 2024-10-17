import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const releases = await prisma.musicRelease.findMany({
      include: {
        artists: true,
      },
      orderBy: {
        release_date: 'desc',
      },
    });

    return NextResponse.json(releases, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao listar os releases' }, { status: 500 });
  }
}
