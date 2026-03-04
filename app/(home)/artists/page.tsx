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
      <div className="mb-10 w-full max-w-md mx-auto relative group">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
        <Input
          type="search"
          placeholder="Search Artists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="relative h-12 rounded-full border-white/10 bg-background/50 backdrop-blur-md px-6 text-base focus-visible:ring-primary/50 shadow-lg"
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8 pb-12">
          {filteredArtists.map((artist: Artist) =>
            artist.casting_artist ? (
              <Link
                href={`/artists/${artist.casting_artist.slug}`}
                key={artist.id}
                className="group relative flex flex-col items-center gap-4"
              >
                <div className="relative aspect-square w-full rounded-full overflow-hidden border-2 border-white/5 bg-muted/20 shadow-xl group-hover:border-primary/50 group-hover:shadow-primary/20 transition-all duration-500">
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay rounded-full" />
                  <Image
                    src={artist.picture || '/default-artist.jpg'}
                    alt={artist.name}
                    fill
                    sizes="(max-width: 768px) 300px, 400px"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    priority={true}
                  />
                  {/* Subtle dark gradient at the bottom for image depth */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none rounded-b-full opacity-60 group-hover:opacity-30 transition-opacity" />
                </div>

                <div className="flex flex-col items-center gap-2">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight drop-shadow-sm group-hover:text-primary transition-colors duration-300">
                    {artist.name || 'Untitled'}
                  </h3>

                  {artist.casting_artist.flag && (
                    <div className="relative w-8 h-6 rounded-sm overflow-hidden shadow-sm border border-white/10">
                      <Image
                        src={artist.casting_artist.flag as string}
                        alt="Country flag"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
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
