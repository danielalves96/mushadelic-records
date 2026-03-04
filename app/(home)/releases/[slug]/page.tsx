'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { FaArrowLeft, FaDeezer, FaSoundcloud, FaSpotify, FaYoutube } from 'react-icons/fa';
import { SiApplemusic, SiBeatport } from 'react-icons/si';

import { ReleaseCarousel } from '@/components/releases/ReleaseCarousel';
import { Button } from '@/components/ui/button';
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
      <div className="w-full relative glass-card rounded-3xl overflow-hidden p-6 md:p-12 mb-12">
        {/* Subtle background glow based on cover art positioning */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center md:items-start z-10 relative">
          <div className="relative shrink-0 group">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-2xl group-hover:bg-primary/30 transition-all duration-500" />
            <Image
              src={musicData.cover_art || '/default-cover.jpg'}
              alt={musicData.music_name}
              width={320}
              height={320}
              priority
              className="object-cover rounded-2xl shadow-2xl relative z-10 border border-white/5"
            />
          </div>

          <div className="flex flex-col text-center md:text-left pt-2 md:pt-6 w-full">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-sm">
              {musicData.music_name}
            </h1>

            <p className="text-2xl md:text-3xl font-medium text-muted-foreground mb-6">
              {musicData.artists?.map((artist: Artist) => artist.name).join(', ') || 'Unknown Artist'}
            </p>

            <div className="inline-flex items-center justify-center md:justify-start px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold w-max mx-auto md:mx-0 mb-10">
              Released on{' '}
              {new Date(musicData.release_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>

            <h3 className="text-lg font-semibold text-foreground/80 mb-4 uppercase tracking-widest text-sm">
              Listen & Buy
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 w-full">
              <Button
                variant="outline"
                size="lg"
                disabled={musicData.spotify_link === 'None' || !musicData.spotify_link}
                className="flex items-center justify-center gap-3 h-14 bg-card/40 border-white/10 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 rounded-xl"
                onClick={() => window.open(musicData.spotify_link, '_blank')}
              >
                <FaSpotify className="w-5 h-5" />
                <span className="font-semibold">Spotify</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                disabled={musicData.youtube_link === 'None' || !musicData.youtube_link}
                className="flex items-center justify-center gap-3 h-14 bg-card/40 border-white/10 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 rounded-xl"
                onClick={() => window.open(musicData.youtube_link, '_blank')}
              >
                <FaYoutube className="w-5 h-5" />
                <span className="font-semibold">YouTube</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                disabled={musicData.apple_link === 'None' || !musicData.apple_link}
                className="flex items-center justify-center gap-3 h-14 bg-card/40 border-white/10 hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all duration-300 rounded-xl"
                onClick={() => window.open(musicData.apple_link, '_blank')}
              >
                <SiApplemusic className="w-5 h-5" />
                <span className="font-semibold">Apple Music</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                disabled={musicData.soundcloud_link === 'None' || !musicData.soundcloud_link}
                className="flex items-center justify-center gap-3 h-14 bg-card/40 border-white/10 hover:bg-[#ff5500] hover:text-white hover:border-[#ff5500] transition-all duration-300 rounded-xl"
                onClick={() => window.open(musicData.soundcloud_link, '_blank')}
              >
                <FaSoundcloud className="w-5 h-5" />
                <span className="font-semibold">SoundCloud</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                disabled={musicData.deezer_link === 'None' || !musicData.deezer_link}
                className="flex items-center justify-center gap-3 h-14 bg-card/40 border-white/10 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300 rounded-xl"
                onClick={() => window.open(musicData.deezer_link, '_blank')}
              >
                <FaDeezer className="w-5 h-5" />
                <span className="font-semibold">Deezer</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                disabled={musicData.buy_link === 'None' || !musicData.buy_link}
                className="flex items-center justify-center gap-3 h-14 bg-card/40 border-white/10 hover:bg-green-400 hover:text-black hover:border-green-400 transition-all duration-300 rounded-xl"
                onClick={() => window.open(musicData.buy_link, '_blank')}
              >
                <SiBeatport className="w-5 h-5" />
                <span className="font-semibold">Beatport</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Releases Section */}
      <div className="mt-8 w-full max-w-[100vw]">
        <ReleaseCarousel releases={relatedReleases} isLoading={isLoadingRelated} title="Related Releases" />
      </div>
    </div>
  );
};

export default ReleaseDetailsPage;
