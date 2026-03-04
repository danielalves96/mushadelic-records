'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Release } from '@/types/types';
import { Skeleton } from '../ui/skeleton';

interface ReleaseCarouselProps {
  releases?: Release[];
  isLoading: boolean;
  title: string;
}

export function ReleaseCarousel({ releases, isLoading, title }: ReleaseCarouselProps) {
  if (isLoading) {
    return (
      <div className="w-full py-8">
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-center md:text-left drop-shadow-sm px-4 md:px-0">
          {title}
        </h2>
        <div className="flex gap-6 overflow-hidden px-4 md:px-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="min-w-[250px] space-y-4">
              <Skeleton className="w-[250px] h-[250px] rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!releases || releases.length === 0) return null;

  // Duplicate the array of releases a few times to create an infinite scroll effect
  // without gaps if there are few items. (Usually 2-3 copies is enough).
  const duplicatedReleases = [...releases, ...releases, ...releases, ...releases];

  return (
    <div className="w-full py-8">
      <h2 className="text-3xl font-extrabold tracking-tight mb-10 text-center md:text-left drop-shadow-sm px-4 md:px-0">
        {title}
      </h2>

      <div className="relative flex overflow-x-hidden w-full group py-4">
        {/* Gradients to fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex space-x-6 animate-marquee group-hover:[animation-play-state:paused] hover:cursor-pointer transition-all ease-linear w-max">
          {duplicatedReleases.map((release, i) => (
            <Link
              href={`/releases/${release.slug}`}
              key={`${release.id}-${i}`}
              className="flex-shrink-0 group/card w-[220px] sm:w-[260px] md:w-[280px]"
            >
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden glass-card border border-white/10 shadow-lg group-hover/card:border-primary/50 transition-all duration-300 group-hover/card:shadow-primary/20 group-hover/card:-translate-y-2">
                <Image
                  src={release.cover_art || '/default-cover.jpg'}
                  alt={release.music_name}
                  fill
                  sizes="(max-width: 768px) 250px, 300px"
                  className="object-cover transform group-hover/card:scale-105 transition-transform duration-700"
                />

                {/* Dark gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 md:opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

                {/* Content over image */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-8 md:opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300 ease-out">
                  <h3 className="font-bold text-lg md:text-xl text-white truncate drop-shadow-md">
                    {release.music_name}
                  </h3>
                  <p className="text-white/80 text-sm truncate font-medium mt-1">
                    {release.artists.map((a) => a.name).join(', ')}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
