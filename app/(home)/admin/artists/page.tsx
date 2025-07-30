'use client';

import {
  ArrowDownCircle,
  ArrowUpCircle,
  Edit3,
  Facebook,
  Instagram,
  Music,
  Plus,
  Search,
  Star,
  Users,
  Youtube,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useArtists } from '@/hooks/artists/useArtists';
import { useRemoveFromCasting } from '@/hooks/artists/useRemoveFromCasting';
import { useToast } from '@/hooks/use-toast';

interface Artist {
  id: string;
  name: string;
  is_casting_artist: boolean;
  casting_artist?: {
    id: string;
    description: string;
    facebook_link?: string;
    instagram_link?: string;
    soundcloud_link?: string;
    spotify_link?: string;
    youtube_link?: string;
    flag?: string;
    picture?: string;
    slug: string;
  };
}

export default function AdminArtistsPage() {
  const { data: artists, isLoading } = useArtists();
  const removeFromCastingMutation = useRemoveFromCasting();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'casting' | 'regular'>('all');

  const filteredArtists = artists?.filter((artist: Artist) => {
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === 'all' ||
      (filter === 'casting' && artist.is_casting_artist) ||
      (filter === 'regular' && !artist.is_casting_artist);
    return matchesSearch && matchesFilter;
  });

  const handleRemoveFromCasting = async (artistId: string, artistName: string) => {
    if (window.confirm(`Remove "${artistName}" from casting roster?`)) {
      try {
        await removeFromCastingMutation.mutateAsync(artistId);
        toast({
          title: 'Success',
          description: `${artistName} removed from casting successfully!`,
        });
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: 'Failed to remove artist from casting',
          variant: 'destructive',
        });
      }
    }
  };

  const castingCount = artists?.filter((artist: Artist) => artist.is_casting_artist).length || 0;
  const regularCount = artists?.filter((artist: Artist) => !artist.is_casting_artist).length || 0;

  return (
    <div className="space-y-6 border-t pt-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Artists Management</h1>
          <p className="text-muted-foreground">Manage your artist roster and casting operations</p>
        </div>
        <Link href="/admin/artists/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Artist
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Artists</p>
                <p className="text-2xl font-bold">{artists?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Star className="h-6 w-6 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Casting Artists</p>
                <p className="text-2xl font-bold">{castingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Music className="h-6 w-6 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Regular Artists</p>
                <p className="text-2xl font-bold">{regularCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
                style={{ minWidth: '48px' }}
              >
                All
              </Button>
              <Button
                variant={filter === 'casting' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('casting')}
                style={{ minWidth: '72px' }}
              >
                Casting
              </Button>
              <Button
                variant={filter === 'regular' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('regular')}
                style={{ minWidth: '64px' }}
              >
                Regular
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Artists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredArtists?.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No artists found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Try adjusting your search' : 'Get started by adding your first artist'}
            </p>
            <Link href="/admin/artists/create">
              <Button>Add New Artist</Button>
            </Link>
          </div>
        ) : (
          filteredArtists?.map((artist: Artist) => (
            <Card key={artist.id} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Avatar */}
                    <div className="relative">
                      {artist.casting_artist?.picture ? (
                        <Image
                          src={artist.casting_artist.picture}
                          alt={artist.name}
                          width={64}
                          height={64}
                          className="h-16 w-16 rounded-full object-cover border-2 border-gray-200"
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                          {artist.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      {artist.casting_artist?.flag && (
                        <Image
                          src={artist.casting_artist.flag}
                          alt="Flag"
                          width={20}
                          height={20}
                          className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white"
                        />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg truncate">{artist.name}</h3>
                        <Badge variant={artist.is_casting_artist ? 'default' : 'secondary'}>
                          {artist.is_casting_artist ? 'Casting' : 'Regular'}
                        </Badge>
                      </div>

                      {artist.casting_artist && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {artist.casting_artist.description}
                        </p>
                      )}

                      {/* Social Links */}
                      {artist.casting_artist && (
                        <div className="flex items-center gap-2 mb-3">
                          {artist.casting_artist.facebook_link && (
                            <a
                              href={artist.casting_artist.facebook_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <Facebook className="h-4 w-4" />
                            </a>
                          )}
                          {artist.casting_artist.instagram_link && (
                            <a
                              href={artist.casting_artist.instagram_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded text-pink-600 hover:text-pink-800 transition-colors"
                            >
                              <Instagram className="h-4 w-4" />
                            </a>
                          )}
                          {artist.casting_artist.soundcloud_link && (
                            <a
                              href={artist.casting_artist.soundcloud_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded text-orange-600 hover:text-orange-800 transition-colors"
                            >
                              <Music className="h-4 w-4" />
                            </a>
                          )}
                          {artist.casting_artist.youtube_link && (
                            <a
                              href={artist.casting_artist.youtube_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded text-red-600 hover:text-red-800 transition-colors"
                            >
                              <Youtube className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Link href={`/admin/artists/edit/${artist.id}`}>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Edit3 className="h-4 w-4" />
                        Edit
                      </Button>
                    </Link>

                    {artist.is_casting_artist ? (
                      <Button
                        variant="destructive"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleRemoveFromCasting(artist.id, artist.name)}
                        disabled={removeFromCastingMutation.isPending}
                      >
                        <ArrowDownCircle className="h-4 w-4" />
                        Remove
                      </Button>
                    ) : (
                      <Link href={`/admin/artists/edit/${artist.id}`}>
                        <Button variant="secondary" size="sm" className="gap-2">
                          <ArrowUpCircle className="h-4 w-4" />
                          Add to Casting
                        </Button>
                      </Link>
                    )}
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
