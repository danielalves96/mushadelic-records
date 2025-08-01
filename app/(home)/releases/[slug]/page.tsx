'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { FaArrowLeft, FaDeezer, FaSoundcloud, FaSpotify, FaYoutube } from 'react-icons/fa';
import { SiApplemusic, SiBeatport } from 'react-icons/si';

import { ReleaseGrid } from '@/components/releases/ReleaseGrid';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useReleaseBySlug } from '@/hooks/releases/useReleaseBySlug';
import { useReleasesByArtists } from '@/hooks/releases/useReleasesByArtists';
import { Artist } from '@/types/types';

const ReleaseDetailsPage: React.FC = () => {
  const router = useRouter();
  const { slug } = useParams();
  const { data: musicData, isLoading, isError } = useReleaseBySlug(slug as string);

  // Get artist IDs for related releases
  const artistIds = musicData?.artists?.map((artist) => artist.id) || [];
  const { data: relatedReleases, isLoading: isLoadingRelated } = useReleasesByArtists(artistIds, musicData?.id);

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

  if (isError) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-red-500">Something went wrong!</h2>
        <p className="text-gray-500">We were unable to load the release details. Please try again later.</p>
      </div>
    );
  }

  if (!musicData) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-bold text-gray-700">No release data available</h2>
      </div>
    );
  }

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
            src={musicData.cover_art || '/default-cover.jpg'}
            alt={musicData.music_name}
            width={270}
            height={270}
            className="object-cover rounded-lg shadow-lg"
          />
          <div className="text-center md:text-left">
            <CardTitle className="text-3xl font-bold mb-2">{musicData.music_name}</CardTitle>
            <p className="text-xl mb-4">
              {musicData.artists?.map((artist: Artist) => artist.name).join(', ') || 'Unknown Artist'}
            </p>
            <p className="text-sm dark:text-green-600">
              Released on {new Date(musicData.release_date).toLocaleDateString()}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <Button
              variant="secondary"
              disabled={musicData.spotify_link === 'None' || !musicData.spotify_link}
              className="flex items-center justify-center gap-2"
              onClick={() => window.open(musicData.spotify_link, '_blank')}
            >
              <FaSpotify className="w-5 h-5" />
              Spotify
            </Button>
            <Button
              variant="secondary"
              disabled={musicData.youtube_link === 'None' || !musicData.youtube_link}
              className="flex items-center justify-center gap-2"
              onClick={() => window.open(musicData.youtube_link, '_blank')}
            >
              <FaYoutube className="w-5 h-5" />
              YouTube
            </Button>
            <Button
              variant="secondary"
              disabled={musicData.apple_link === 'None' || !musicData.apple_link}
              className="flex items-center justify-center gap-2"
              onClick={() => window.open(musicData.apple_link, '_blank')}
            >
              <SiApplemusic className="w-5 h-5" />
              Apple Music
            </Button>
            <Button
              variant="secondary"
              disabled={musicData.soundcloud_link === 'None' || !musicData.soundcloud_link}
              className="flex items-center justify-center gap-2"
              onClick={() => window.open(musicData.soundcloud_link, '_blank')}
            >
              <FaSoundcloud className="w-5 h-5" />
              SoundCloud
            </Button>
            <Button
              variant="secondary"
              disabled={musicData.deezer_link === 'None' || !musicData.deezer_link}
              className="flex items-center justify-center gap-2"
              onClick={() => window.open(musicData.deezer_link, '_blank')}
            >
              <FaDeezer className="w-5 h-5" />
              Deezer
            </Button>
            <Button
              variant="secondary"
              disabled={musicData.buy_link === 'None' || !musicData.buy_link}
              className="flex items-center justify-center gap-2"
              onClick={() => window.open(musicData.buy_link, '_blank')}
            >
              <SiBeatport className="w-5 h-5" />
              Beatport
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Related Releases Section */}
      <div className="mt-12 w-full ">
        <ReleaseGrid releases={relatedReleases} isLoading={isLoadingRelated} title="Related Releases" limit={12} />
      </div>
    </div>
  );
};

export default ReleaseDetailsPage;
