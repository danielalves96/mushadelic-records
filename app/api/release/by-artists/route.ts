import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

// Force dynamic rendering - no cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const { artistIds, excludeReleaseId } = await request.json();

    if (!Array.isArray(artistIds) || artistIds.length === 0) {
      return NextResponse.json(
        { error: 'artistIds array is required' },
        {
          status: 400,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            Pragma: 'no-cache',
            Expires: '0',
          },
        }
      );
    }

    const releases = await prisma.musicRelease.findMany({
      where: {
        artists: {
          some: {
            id: {
              in: artistIds,
            },
          },
        },
        ...(excludeReleaseId && {
          id: {
            not: excludeReleaseId,
          },
        }),
      },
      include: {
        artists: {
          include: {
            casting_artist: true,
          },
        },
      },
      orderBy: {
        release_date: 'desc',
      },
    });

    return NextResponse.json(releases, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error) {
    console.error('Error fetching releases by artists:', error);
    return NextResponse.json(
      { error: 'Error fetching releases' },
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
