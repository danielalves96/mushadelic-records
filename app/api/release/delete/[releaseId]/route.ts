import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function DELETE(req: NextRequest, { params }: { params: { releaseId: string } }) {
  const { releaseId } = params;

  try {
    await prisma.musicRelease.delete({
      where: { id: releaseId },
    });

    return NextResponse.json(
      { message: 'Release deleted successfully' },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );
  } catch (error) {
    console.error('Error deleting release:', error);
    return NextResponse.json(
      { error: 'Error deleting release' },
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
