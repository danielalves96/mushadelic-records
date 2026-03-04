'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { FaArrowLeft, FaFacebook, FaInstagram, FaSoundcloud, FaSpotify, FaYoutube } from 'react-icons/fa';

import { ReleaseGrid } from '@/components/releases/ReleaseGrid';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useArtistBySlug } from '@/hooks/artists/useArtistBySlug';
import { useReleasesByArtist } from '@/hooks/releases/useReleasesByArtist';

const ArtistDetailsPage: React.FC = () => {
  const router = useRouter();
  const { slug } = useParams();
  const { data: artistData, isLoading, isError } = useArtistBySlug(slug as string);

  // Get releases by this artist
  const { data: artistReleases, isLoading: isLoadingReleases } = useReleasesByArtist(artistData?.id || '');

  if (isLoading) {
    return (
      <div className="container w-full py-4 flex items-center justify-center">
        <div className="w-full">
          <Skeleton className="w-full h-64" />
          <div className="mt-6 grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !artistData) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-red-500">Something went wrong!</h2>
        <p className="text-gray-500">We were unable to load the artist details. Please try again later.</p>
      </div>
    );
  }

  const { casting_artist: castingArtist } = artistData;

  return (
    <div className="container w-full px-4 md:px-0 items-center justify-center flex flex-col">
      <div className="w-full ">
        <Button variant="ghost" size="icon" className="mb-4 flex items-center gap-2" onClick={() => router.back()}>
          <FaArrowLeft className="w-4 h-4" />
        </Button>
      </div>
      <div className="w-full relative glass-card rounded-[2.5rem] overflow-hidden p-6 md:p-12 mb-12 border border-white/5 shadow-2xl">
        {/* Subtle background glow based on primary color */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none opacity-70" />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-blue-500/10 rounded-full blur-[100px] -z-10 pointer-events-none opacity-50" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 z-10 relative">
          <div className="relative shrink-0 group">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/30 transition-all duration-500" />
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-background/50 shadow-2xl z-10">
              <Image
                src={artistData.picture || '/default-artist.jpg'}
                alt={artistData.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col text-center md:text-left pt-2 md:pt-4 w-full">
            <div className="flex flex-col md:flex-row items-center md:items-baseline gap-4 mb-4">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-sm">{artistData.name}</h1>
              {castingArtist.flag && (
                <div className="relative w-10 h-7 rounded-sm overflow-hidden shadow-md mt-2 md:mt-0">
                  <Image src={castingArtist.flag} alt="flag" fill className="object-cover" />
                </div>
              )}
            </div>

            <p className="text-lg md:text-xl text-muted-foreground/90 font-medium mb-8 max-w-3xl leading-relaxed">
              {castingArtist.description || 'No biography provided yet.'}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              {castingArtist.spotify_link && castingArtist.spotify_link !== 'None' && (
                <Button
                  variant="secondary"
                  className="gap-2 rounded-full px-6 bg-[#1DB954]/10 text-[#1DB954] hover:bg-[#1DB954] hover:text-white border border-[#1DB954]/20 transition-all"
                  onClick={() => window.open(castingArtist.spotify_link, '_blank')}
                >
                  <FaSpotify className="w-4 h-4" /> Spotify
                </Button>
              )}
              {castingArtist.youtube_link && castingArtist.youtube_link !== 'None' && (
                <Button
                  variant="secondary"
                  className="gap-2 rounded-full px-6 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white border border-red-600/20 transition-all"
                  onClick={() => window.open(castingArtist.youtube_link, '_blank')}
                >
                  <FaYoutube className="w-4 h-4" /> YouTube
                </Button>
              )}
              {castingArtist.soundcloud_link && castingArtist.soundcloud_link !== 'None' && (
                <Button
                  variant="secondary"
                  className="gap-2 rounded-full px-6 bg-[#ff5500]/10 text-[#ff5500] hover:bg-[#ff5500] hover:text-white border border-[#ff5500]/20 transition-all"
                  onClick={() => window.open(castingArtist.soundcloud_link, '_blank')}
                >
                  <FaSoundcloud className="w-4 h-4" /> SoundCloud
                </Button>
              )}
              {castingArtist.instagram_link && castingArtist.instagram_link !== 'None' && (
                <Button
                  variant="secondary"
                  className="gap-2 rounded-full px-6 bg-pink-500/10 text-pink-500 hover:bg-gradient-to-tr hover:from-pink-500 hover:to-purple-500 hover:text-white border border-pink-500/20 transition-all"
                  onClick={() => window.open(castingArtist.instagram_link, '_blank')}
                >
                  <FaInstagram className="w-4 h-4" /> Instagram
                </Button>
              )}
              {castingArtist.facebook_link && castingArtist.facebook_link !== 'None' && (
                <Button
                  variant="secondary"
                  className="gap-2 rounded-full px-6 bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white border border-blue-600/20 transition-all"
                  onClick={() => window.open(castingArtist.facebook_link, '_blank')}
                >
                  <FaFacebook className="w-4 h-4" /> Facebook
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Artist Releases Section */}
      <div className="w-full">
        <ReleaseGrid releases={artistReleases || []} isLoading={isLoadingReleases} title="Artist Releases" />
      </div>
    </div>
  );
};

export default ArtistDetailsPage;
