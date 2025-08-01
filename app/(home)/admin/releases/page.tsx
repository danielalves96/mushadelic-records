'use client';

import { ArrowLeft, Edit, Music, Plus, Search, Trash, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { FaApple, FaBandcamp, FaDeezer, FaSoundcloud, FaSpotify, FaYoutube } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useDeleteRelease } from '@/hooks/releases/useDeleteRelease';
import { useReleases } from '@/hooks/releases/useReleases';
import { useToast } from '@/hooks/use-toast';
import { Release } from '@/types/types';

// --- Reusable Components ---

function ReleaseGrid({
  releases,
  handleDeleteRelease,
}: {
  releases: Release[];
  handleDeleteRelease: (id: string, name: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {releases.map((release) => (
        <Card key={release.id} className="flex flex-col overflow-hidden">
          <CardHeader className="relative h-32 p-0 border-b">
            {/* Blurred Background */}
            {release.cover_art && (
              <Image
                src={release.cover_art}
                alt={release.music_name}
                fill
                sizes="(max-width: 768px) 500px, (max-width: 1200px) 500px, 500px"
                className="object-cover blur-lg brightness-50"
              />
            )}
            {/* Main Cover Art */}
            <div className="relative flex items-end h-full p-4">
              <div className="w-24 h-24 relative flex-shrink-0">
                {release.cover_art && (
                  <Image
                    src={release.cover_art}
                    alt={release.music_name}
                    fill
                    sizes="(max-width: 768px) 500px, (max-width: 1200px) 500px, 500px"
                    className="object-cover rounded-md border-2 border-white/50"
                  />
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 flex-grow flex flex-col">
            <h3 className="font-semibold text-lg truncate">{release.music_name}</h3>

            {/* Artist Tags */}
            <div className="flex flex-wrap items-center gap-x-1 mt-1">
              {release.artists.map((artist, index) => (
                <span key={artist.id}>
                  <Link href={`/admin/artists/${artist.id}`}>
                    <span className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      {artist.name}
                    </span>
                  </Link>
                  {index < release.artists.length - 1 && <span className="text-xs text-muted-foreground">, </span>}
                </span>
              ))}
            </div>

            <p className="text-xs text-muted-foreground mt-2">{new Date(release.release_date).toLocaleDateString()}</p>

            {/* Platform Icons */}
            <div className="flex items-center gap-3 mt-auto pt-4">
              {release.spotify_link && (
                <a href={release.spotify_link} target="_blank">
                  <FaSpotify className="h-5 w-5 text-green-500" />
                </a>
              )}
              {release.apple_link && (
                <a href={release.apple_link} target="_blank">
                  <FaApple className="h-5 w-5" />
                </a>
              )}
              {release.soundcloud_link && (
                <a href={release.soundcloud_link} target="_blank">
                  <FaSoundcloud className="h-5 w-5 text-orange-500" />
                </a>
              )}
              {release.youtube_link && (
                <a href={release.youtube_link} target="_blank">
                  <FaYoutube className="h-5 w-5 text-red-500" />
                </a>
              )}
              {release.deezer_link && (
                <a href={release.deezer_link} target="_blank">
                  <FaDeezer className="h-5 w-5 text-blue-400" />
                </a>
              )}
              {release.buy_link && (
                <a href={release.buy_link} target="_blank">
                  <FaBandcamp className="h-5 w-5" />
                </a>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-2 border-t bg-muted/50 flex justify-end gap-1">
            <Link href={`/admin/releases/edit/${release.id}`}>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500"
              onClick={() => handleDeleteRelease(release.id, release.music_name)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function ReleaseGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="flex flex-col overflow-hidden">
          <CardHeader className="relative h-32 p-0 border-b bg-muted/40">
            <div className="relative flex items-end h-full p-4">
              <Skeleton className="w-24 h-24 rounded-md" />
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-grow">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-1" />
            <div className="flex gap-2 mt-3">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
            <div className="flex gap-2 mt-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
          </CardContent>
          <CardFooter className="p-2 border-t bg-muted/50 flex justify-end gap-1">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function EmptyState({ searchTerm }: { searchTerm: string }) {
  const message = searchTerm ? `No releases found for "${searchTerm}".` : `There are no releases to display.`;

  return (
    <Card>
      <CardContent className="text-center p-12">
        <Music className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Releases Found</h3>
        <p className="text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}

export default function AdminReleasesPage() {
  const router = useRouter();
  const { data: releases, isLoading } = useReleases();
  const deleteReleaseMutation = useDeleteRelease();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteRelease = async (releaseId: string, releaseName: string) => {
    if (window.confirm(`Are you sure you want to delete the release "${releaseName}"?`)) {
      try {
        await deleteReleaseMutation.mutateAsync(releaseId);
        toast({ title: 'Success', description: 'Release deleted successfully!' });
      } catch (error) {
        console.error(error);
        toast({ title: 'Error', description: 'Failed to delete release', variant: 'destructive' });
      }
    }
  };

  const filteredReleases = useMemo(() => {
    if (!releases) return [];
    return releases.filter(
      (release) =>
        release.music_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        release.artists.some((artist) => artist.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [releases, searchTerm]);

  const totalArtists = useMemo(() => {
    if (!releases) return 0;
    const artistIds = new Set(releases.flatMap((r) => r.artists.map((a) => a.id)));
    return artistIds.size;
  }, [releases]);

  return (
    <div className="space-y-8 mt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push('/admin')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Releases</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search releases or artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Link href="/admin/releases/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Release
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Music className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Releases</p>
                <p className="text-2xl font-bold">{releases?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Unique Artists</p>
                <p className="text-2xl font-bold">{totalArtists}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Releases Grid */}
      <section>
        {isLoading ? (
          <ReleaseGridSkeleton />
        ) : filteredReleases.length > 0 ? (
          <ReleaseGrid releases={filteredReleases} handleDeleteRelease={handleDeleteRelease} />
        ) : (
          <EmptyState searchTerm={searchTerm} />
        )}
      </section>
    </div>
  );
}
