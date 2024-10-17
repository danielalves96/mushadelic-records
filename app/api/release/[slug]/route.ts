import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const release = await prisma.musicRelease.findUnique({
      where: { slug },
      include: {
        artists: true,
      },
    });

    if (!release) {
      return NextResponse.json({ message: 'Release not found' }, { status: 404 });
    }

    return NextResponse.json(release);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching release' }, { status: 500 });
  }
}
