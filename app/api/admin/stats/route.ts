import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

// Force dynamic rendering - no cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface AdminStats {
  totalArtists: number;
  totalReleases: number;
  castingArtists: number;
}

export async function GET() {
  try {
    // Use efficient count queries instead of fetching all data
    const [totalArtists, totalReleases, castingArtists] = await Promise.all([
      prisma.artist.count(),
      prisma.musicRelease.count(),
      prisma.artist.count({
        where: {
          is_casting_artist: true,
        },
      }),
    ]);

    const stats: AdminStats = {
      totalArtists,
      totalReleases,
      castingArtists,
    };

    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Error fetching stats' },
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
