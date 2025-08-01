import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { releaseId: string } }) {
  const { releaseId } = params;

  try {
    const release = await prisma.musicRelease.findUnique({
      where: { id: releaseId },
      include: {
        artists: {
          include: {
            casting_artist: true,
          },
        },
      },
    });

    if (!release) {
      return NextResponse.json(
        { message: 'Release not found' },
        {
          status: 404,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            Pragma: 'no-cache',
            Expires: '0',
          },
        }
      );
    }

    return NextResponse.json(release, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error) {
    console.error('Error fetching release:', error);
    return NextResponse.json(
      { error: 'Error fetching release' },
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
