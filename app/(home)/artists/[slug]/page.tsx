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
      <Card className="w-full bg-black/60 text-white backdrop-blur-md">
        <CardHeader className="flex flex-col md:flex-row items-center gap-6">
          <Image
            src={castingArtist.picture || '/default-artist.jpg'}
            alt={artistData.name}
            width={250}
            height={250}
            className="object-cover rounded-lg shadow-lg"
          />
          <div className="text-center md:text-left">
            <CardTitle className="text-3xl font-bold mb-2 flex gap-3">
              <span> {artistData.name} </span>
              {castingArtist.flag && (
                <Image src={castingArtist.flag} alt="flag" width={32} height={24} className="object-contain" />
              )}
            </CardTitle>
            <p className="text-md mb-4">{castingArtist.description}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <Button
              variant="secondary"
              disabled={!castingArtist.spotify_link}
              className="flex items-center justify-center gap-2"
              onClick={() => window.open(castingArtist.spotify_link, '_blank')}
            >
              <FaSpotify className="w-5 h-5" />
              Spotify
            </Button>
            <Button
              variant="secondary"
              disabled={!castingArtist.youtube_link}
              className="flex items-center justify-center gap-2"
              onClick={() => window.open(castingArtist.youtube_link, '_blank')}
            >
              <FaYoutube className="w-5 h-5" />
              YouTube
            </Button>
            <Button
              variant="secondary"
              disabled={!castingArtist.soundcloud_link}
              className="flex items-center justify-center gap-2"
              onClick={() => window.open(castingArtist.soundcloud_link, '_blank')}
            >
              <FaSoundcloud className="w-5 h-5" />
              SoundCloud
            </Button>
            <Button
              variant="secondary"
              disabled={!castingArtist.instagram_link}
              className="flex items-center justify-center gap-2"
              onClick={() => window.open(castingArtist.instagram_link, '_blank')}
            >
              <FaInstagram className="w-5 h-5" />
              Instagram
            </Button>
            <Button
              variant="secondary"
              disabled={!castingArtist.facebook_link}
              className="flex items-center justify-center gap-2"
              onClick={() => window.open(castingArtist.facebook_link, '_blank')}
            >
              <FaFacebook className="w-5 h-5" />
              Facebook
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Artist Releases Section */}
      <div className="mt-12 w-full">
        <ReleaseGrid
          releases={artistReleases || []}
          isLoading={isLoadingReleases}
          title={`Releases of ${artistData.name}`}
        />
      </div>
    </div>
  );
};

export default ArtistDetailsPage;
