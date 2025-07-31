'use client';

import { ArrowLeft, Edit, Eye, Plus, Search, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  const router = useRouter();
  const { data: artists, isLoading } = useArtists();
  const removeFromCastingMutation = useRemoveFromCasting();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');

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

  const castingArtists = artists?.filter(
    (artist: Artist) => artist.is_casting_artist && artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const otherArtists = artists?.filter(
    (artist: Artist) => !artist.is_casting_artist && artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 mt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push('/admin')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Artists</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Link href="/admin/artists/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Artist
            </Button>
          </Link>
        </div>
      </div>

      {/* Casting Artists Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold tracking-tight">Casting Roster</h2>
          <Badge variant="secondary">{castingArtists?.length || 0}</Badge>
        </div>
        {isLoading ? (
          <ArtistGridSkeleton />
        ) : castingArtists && castingArtists.length > 0 ? (
          <ArtistGrid
            artists={castingArtists}
            handleRemoveFromCasting={handleRemoveFromCasting}
            removeFromCastingMutation={removeFromCastingMutation}
          />
        ) : (
          <EmptyState type="casting" searchTerm={searchTerm} />
        )}
      </section>

      {/* Other Artists Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold tracking-tight">Other Artists</h2>
          <Badge variant="secondary">{otherArtists?.length || 0}</Badge>
        </div>
        {isLoading ? (
          <ArtistGridSkeleton />
        ) : otherArtists && otherArtists.length > 0 ? (
          <ArtistGrid
            artists={otherArtists}
            handleRemoveFromCasting={handleRemoveFromCasting}
            removeFromCastingMutation={removeFromCastingMutation}
          />
        ) : (
          <EmptyState type="other" searchTerm={searchTerm} />
        )}
      </section>
    </div>
  );
}

// --- Reusable Components ---

function ArtistGrid({ artists, handleRemoveFromCasting, removeFromCastingMutation }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {artists.map((artist: Artist) => (
        <Card key={artist.id} className="flex flex-col">
          <CardContent className="p-6 flex-grow">
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16 border">
                <AvatarImage src={artist.casting_artist?.picture} alt={artist.name} />
                <AvatarFallback className="text-xl font-semibold bg-muted">
                  {artist.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{artist.name}</h3>
                {artist.casting_artist?.description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{artist.casting_artist.description}</p>
                )}
              </div>
            </div>
          </CardContent>
          <div className="p-4 border-t bg-muted/50 flex justify-end gap-2">
            <Link href={`/admin/artists/${artist.id}`}>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4 mr-2" /> View
              </Button>
            </Link>
            <Link href={`/admin/artists/edit/${artist.id}`}>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4 mr-2" /> Edit
              </Button>
            </Link>
            {artist.is_casting_artist && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveFromCasting(artist.id, artist.name)}
                disabled={removeFromCastingMutation.isPending}
              >
                Remove from Casting
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}

function ArtistGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="flex flex-col">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Skeleton className="w-16 h-16 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </CardContent>
          <div className="p-4 border-t bg-muted/50 flex justify-end gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </Card>
      ))}
    </div>
  );
}

function EmptyState({ type, searchTerm }: { type: 'casting' | 'other'; searchTerm: string }) {
  const message = searchTerm
    ? `No ${type} artists found for "${searchTerm}".`
    : `There are no ${type} artists to display.`;

  return (
    <Card className="col-span-full">
      <CardContent className="text-center p-12">
        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Artists Found</h3>
        <p className="text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}
