'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Skeleton } from '@/components/ui/skeleton';
import { Artist, Release } from '@/types/types';

interface ReleaseGridProps {
  releases: Release[];
  isLoading?: boolean;
  title?: string;
  limit?: number;
}

export function ReleaseGrid({ releases, isLoading, title, limit }: ReleaseGridProps) {
  const displayReleases = limit ? releases.slice(0, limit) : releases;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {title && <h2 className="text-2xl font-bold">{title}</h2>}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {Array.from({ length: limit || 10 }).map((_, index) => (
            <Skeleton key={index} className="aspect-square w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!releases.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      {title && <h2 className="text-2xl font-bold">{title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {displayReleases.map((release: Release) => (
          <Link href={`/releases/${release.slug}`} key={release.id} className="relative aspect-square">
            <Image
              src={release.cover_art as string}
              alt={release.music_name}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
              sizes="(max-width: 768px) 500px, (max-width: 1200px) 500px, 500px"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center rounded-md justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="flex flex-col justify-center items-center">
                <h3 className="text-white text-center font-bold">{release.music_name || 'Untitled'}</h3>
                <span className="text-xs text-white">
                  {release.artists?.map((artist: Artist) => artist.name).join(', ') || 'Unknown Artist'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
