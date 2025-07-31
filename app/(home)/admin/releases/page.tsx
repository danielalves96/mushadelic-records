'use client';

import { ArrowLeft, Calendar, Download, Edit3, Music, Plus, Search, Trash2, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaApple, FaDeezer, FaSoundcloud, FaSpotify, FaYoutube } from 'react-icons/fa';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useDeleteRelease } from '@/hooks/releases/useDeleteRelease';
import { useReleases } from '@/hooks/releases/useReleases';
import { useToast } from '@/hooks/use-toast';

export default function AdminReleasesPage() {
  const router = useRouter();
  const { data: releases, isLoading } = useReleases();
  const deleteReleaseMutation = useDeleteRelease();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');

  const filteredReleases = releases?.filter(
    (release) =>
      release.music_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      release.artists.some((artist) => artist.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDeleteRelease = async (releaseId: string, releaseName: string) => {
    if (window.confirm(`Are you sure you want to delete "${releaseName}"? This action cannot be undone.`)) {
      try {
        await deleteReleaseMutation.mutateAsync(releaseId);
        toast({
          title: 'Success',
          description: `"${releaseName}" deleted successfully!`,
        });
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: 'Failed to delete release',
          variant: 'destructive',
        });
      }
    }
  };

  const currentYear = new Date().getFullYear();
  const thisYearReleases =
    releases?.filter((release) => new Date(release.release_date).getFullYear() === currentYear).length || 0;

  return (
    <div className="space-y-8 mt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push('/admin')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Releases Management</h1>
            <p className="text-muted-foreground">Manage your music catalog and streaming links</p>
          </div>
        </div>
        <Link href="/admin/releases/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Release
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Music className="h-6 w-6 text-green-600" />
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
              <Calendar className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">This Year</p>
                <p className="text-2xl font-bold">{thisYearReleases}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Artists</p>
                <p className="text-2xl font-bold">
                  {releases?.reduce((acc, release) => {
                    release.artists.forEach((artist) => acc.add(artist.id));
                    return acc;
                  }, new Set()).size || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search releases or artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Releases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <div className="aspect-square">
                <Skeleton className="w-full h-full rounded-t-lg" />
              </div>
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))
        ) : filteredReleases?.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Music className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No releases found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Try adjusting your search' : 'Get started by adding your first release'}
            </p>
            <Link href="/admin/releases/create">
              <Button>Add New Release</Button>
            </Link>
          </div>
        ) : (
          filteredReleases?.map((release) => (
            <Card key={release.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
              {/* Cover Art */}
              <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                {release.cover_art ? (
                  <Image
                    src={release.cover_art}
                    alt={release.music_name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Music className="h-16 w-16 text-gray-400" />
                  </div>
                )}

                {/* Overlay with Quick Actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                  {release.spotify_link && (
                    <a
                      href={release.spotify_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600"
                      title="Listen on Spotify"
                    >
                      <FaSpotify className="h-4 w-4" />
                    </a>
                  )}
                  {release.soundcloud_link && (
                    <a
                      href={release.soundcloud_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600"
                      title="Listen on SoundCloud"
                    >
                      <FaSoundcloud className="h-4 w-4" />
                    </a>
                  )}
                  {release.youtube_link && (
                    <a
                      href={release.youtube_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                      title="Watch on YouTube"
                    >
                      <FaYoutube className="h-4 w-4" />
                    </a>
                  )}
                  {release.apple_link && (
                    <a
                      href={release.apple_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-900"
                      title="Listen on Apple Music"
                    >
                      <FaApple className="h-4 w-4" />
                    </a>
                  )}
                  {release.deezer_link && (
                    <a
                      href={release.deezer_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-purple-500 text-white hover:bg-purple-600"
                      title="Listen on Deezer"
                    >
                      <FaDeezer className="h-4 w-4" />
                    </a>
                  )}
                  {release.buy_link && (
                    <a
                      href={release.buy_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                      title="Buy/Download"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Title and Date */}
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-1" title={release.music_name}>
                      {release.music_name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(release.release_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>

                  {/* Artists */}
                  <div className="flex flex-wrap gap-1">
                    {release.artists.map((artist) => (
                      <Badge key={artist.id} variant="secondary" className="text-xs">
                        {artist.name}
                      </Badge>
                    ))}
                  </div>

                  {/* Description */}
                  {release.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{release.description}</p>
                  )}

                  {/* Streaming Links */}
                  <div className="flex items-center gap-2 pt-2">
                    <div className="flex gap-1">
                      {release.spotify_link && (
                        <Badge variant="outline" className="text-xs">
                          Spotify
                        </Badge>
                      )}
                      {release.soundcloud_link && (
                        <Badge variant="outline" className="text-xs">
                          SoundCloud
                        </Badge>
                      )}
                      {release.youtube_link && (
                        <Badge variant="outline" className="text-xs">
                          YouTube
                        </Badge>
                      )}
                      {release.apple_link && (
                        <Badge variant="outline" className="text-xs">
                          Apple
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Link href={`/admin/releases/edit/${release.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full gap-2">
                        <Edit3 className="h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteRelease(release.id, release.music_name)}
                      disabled={deleteReleaseMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
