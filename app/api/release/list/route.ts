import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

// Force dynamic rendering - no cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, private, max-age=0',
        Pragma: 'no-cache',
        Expires: '0',
        ETag: `"${Date.now()}"`,
        'Last-Modified': new Date().toUTCString(),
        Vary: '*',
      },
    });
  } catch (error) {
    console.error('Erro ao listar os releases:', error);

    return NextResponse.json(
      { error: 'Erro ao listar os releases' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, private, max-age=0',
          Pragma: 'no-cache',
          Expires: '0',
          ETag: `"${Date.now()}"`,
          'Last-Modified': new Date().toUTCString(),
          Vary: '*',
        },
      }
    );
  }
}
