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
    <div className="w-full container py-4 mx-4 sm:m-0">
      <div className="mb-8 w-60">
        <Input
          type="search"
          placeholder="Search Releases..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full container mx-4 sm:m-0">
          {Array.from({ length: 30 }).map((_, index) => (
            <Skeleton key={index} className="min-h-32 aspect-square w-full rounded-lg" />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-red-500">Something went wrong!</h2>
          <p className="text-gray-500">We were unable to load the releases. Please try again later.</p>
        </div>
      ) : filteredReleases.length === 0 && searchTerm.length > 1 ? (
        <div className="text-center py-8 container">
          <h2 className="text-xl font-bold text-gray-700">No releases found</h2>
          <p className="text-gray-500">Try adjusting your search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredReleases.map((release: Release) => (
            <Link href={`/releases/${release.slug}`} key={release.id} className="relative aspect-square">
              <Image
                src={release.cover_art as string}
                alt={release.music_name}
                fill
                sizes="(max-width: 768px) 500px, (max-width: 1200px) 500px, 500px"
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
                priority={true}
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center rounded-md justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="flex flex-col justify-center items-center">
                  <h3 className="text-white text-center font-bold">{release.music_name || 'Untitled'}</h3>
                  <span className="text-xs text-white">
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
