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

    return NextResponse.json(releases, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error) {
    console.error('Erro ao listar os releases:', error);

    return NextResponse.json(
      { error: 'Erro ao listar os releases' },
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
