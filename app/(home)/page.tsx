'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useReleases } from '@/hooks/releases/useReleases';
import { Artist, Release } from '@/types/types';

const HomePage = () => {
  const { data: releases, isLoading, isError } = useReleases();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReleases, setFilteredReleases] = useState<Release[]>([]);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = releases?.filter((release) =>
        release.music_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredReleases(filtered || []);
    } else {
      setFilteredReleases(releases || []);
    }
  }, [searchTerm, releases]);

  return (
    <div className="w-full container py-8 px-4 sm:px-8 mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Catalog</h1>
          <p className="text-muted-foreground mt-2">Explore our latest psytrance releases.</p>
        </div>
        <div className="w-full md:w-72 relative">
          <Input
            type="search"
            placeholder="Search releases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-card/50 backdrop-blur-md border-white/10 focus-visible:ring-primary focus-visible:border-primary transition-all duration-300 rounded-full px-6 h-12 shadow-sm glow-hover"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {Array.from({ length: 30 }).map((_, index) => (
            <Skeleton key={index} className="aspect-square w-full rounded-xl bg-card/50" />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-20 glass-card rounded-2xl">
          <h2 className="text-2xl font-bold text-destructive mb-2">Something went wrong!</h2>
          <p className="text-muted-foreground">We were unable to load the releases. Please try again later.</p>
        </div>
      ) : filteredReleases.length === 0 && searchTerm.length > 1 ? (
        <div className="flex flex-col items-center justify-center py-20 glass-card rounded-2xl">
          <h2 className="text-xl font-bold text-foreground mb-2">No releases found</h2>
          <p className="text-muted-foreground">Try adjusting your search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {filteredReleases.map((release: Release) => (
            <Link
              href={`/releases/${release.slug}`}
              key={release.id}
              className="group relative aspect-square rounded-xl overflow-hidden bg-card border border-white/5 shadow-lg transition-all duration-500 hover:scale-[1.03] hover:shadow-primary/20 hover:border-primary/50"
            >
              <Image
                src={release.cover_art as string}
                alt={release.music_name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-700 group-hover:scale-110"
                priority={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 z-10" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 backdrop-blur-[2px]">
                <div className="flex flex-col justify-center items-center p-4 text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-extrabold text-lg leading-tight mb-1 drop-shadow-md">
                    {release.music_name || 'Untitled'}
                  </h3>
                  <span className="text-sm text-white font-medium tracking-wide">
                    {release.artists.map((artist: Artist) => artist.name).join(', ')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
