'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useArtists } from '@/hooks/artists/useArtists';
import { Artist } from '@/types/types';

const ArtistsPage = () => {
  const { data: artists, isLoading, isError } = useArtists();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = artists?.filter((artist: Artist) =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredArtists(filtered || []);
    } else {
      setFilteredArtists(artists || []);
    }
  }, [searchTerm, artists]);

  return (
    <div className="w-full container py-4 mx-4 sm:m-0">
      <div className="mb-8 w-60">
        <Input
          type="search"
          placeholder="Search Artists..."
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
          <p className="text-gray-500">We were unable to load the artists. Please try again later.</p>
        </div>
      ) : filteredArtists.length === 0 && searchTerm.length > 1 ? (
        <div className="text-center py-8 container">
          <h2 className="text-xl font-bold text-gray-700">No artists found</h2>
          <p className="text-gray-500">Try adjusting your search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredArtists.map((artist: Artist) =>
            artist.casting_artist ? (
              <Link href={`/artists/${artist.casting_artist.slug}`} key={artist.id} className="relative aspect-square">
                <div className="relative w-full h-full">
                  <Image
                    src={artist.casting_artist.picture as string}
                    alt={artist.name}
                    fill
                    sizes="(max-width: 768px) 500px, (max-width: 1200px) 500px, 500px"
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                    priority={true}
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center rounded-md justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="flex flex-col justify-center items-center">
                    <h3 className="text-white text-center font-bold">{artist.name || 'Untitled'}</h3>
                    {artist.casting_artist.flag && (
                      <div className="mt-2">
                        <Image
                          src={artist.casting_artist.flag as string}
                          alt="flag"
                          width={32}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default ArtistsPage;
