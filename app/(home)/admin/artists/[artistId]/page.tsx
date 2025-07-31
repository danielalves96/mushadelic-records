'use client';

import { ArrowLeft, Edit, Facebook, Instagram, Music, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useArtistById } from '@/hooks/artists/useArtistById';

interface Props {
  params: {
    artistId: string;
  };
}

function ArtistDetailSkeleton() {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="relative h-32 bg-muted/40">
              <div className="absolute bottom-0 left-6 translate-y-1/2">
                <Skeleton className="h-28 w-28 rounded-full" />
              </div>
            </CardHeader>
            <CardContent className="pt-16 space-y-2">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="flex gap-4">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function ArtistDetailPage({ params }: Props) {
  const router = useRouter();
  const { data: artist, isLoading } = useArtistById(params.artistId);

  if (isLoading) {
    return <ArtistDetailSkeleton />;
  }

  if (!artist) {
    return (
      <div className="w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Artist Not Found</h1>
        <p className="text-muted-foreground">The requested artist could not be found.</p>
        <Button onClick={() => router.push('/admin/artists')}>Back to Artists</Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Artist Profile</h1>
        </div>
        <Button
          variant="default"
          onClick={() => router.push(`/admin/artists/edit/${params.artistId}`)}
          className="flex items-center gap-2"
        >
          <Edit className="h-4 w-4" />
          Editar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content: Artist Profile Card */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="relative h-32 bg-muted/40">
              <div className="absolute bottom-0 left-6 translate-y-1/2">
                <Avatar className="h-28 w-28 border-4 border-background">
                  <AvatarImage src={artist.casting_artist?.picture || ''} alt={artist.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-4xl">
                    {artist.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
            <CardContent className="pt-16">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold">{artist.name}</h2>
                  {artist.casting_artist?.flag && (
                    <Image
                      src={artist.casting_artist.flag}
                      alt="Country flag"
                      width={32}
                      height={24}
                      className="object-contain"
                    />
                  )}
                </div>
                <Badge variant={artist.casting_artist ? 'default' : 'secondary'}>
                  {artist.casting_artist ? 'Casting Artist' : 'Regular Artist'}
                </Badge>
                {artist.casting_artist?.description && (
                  <p className="text-muted-foreground pt-2">{artist.casting_artist.description}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: Social Links & Releases */}
        <div className="space-y-6">
          {artist.casting_artist && (
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>Follow the artist on social media.</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                {artist.casting_artist.facebook_link && (
                  <a href={artist.casting_artist.facebook_link} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon">
                      <Facebook className="h-5 w-5 text-blue-600" />
                    </Button>
                  </a>
                )}
                {artist.casting_artist.instagram_link && (
                  <a href={artist.casting_artist.instagram_link} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon">
                      <Instagram className="h-5 w-5 text-pink-600" />
                    </Button>
                  </a>
                )}
                {artist.casting_artist.soundcloud_link && (
                  <a href={artist.casting_artist.soundcloud_link} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon">
                      <Music className="h-5 w-5 text-orange-600" />
                    </Button>
                  </a>
                )}
                {artist.casting_artist.youtube_link && (
                  <a href={artist.casting_artist.youtube_link} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon">
                      <Youtube className="h-5 w-5 text-red-600" />
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Music Releases</CardTitle>
              <CardDescription>Total of {artist.music_releases.length} releases.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {artist.music_releases.length > 0 ? (
                  artist.music_releases.map((release) => (
                    <Link href={`/releases/${release.slug}`} key={release.id}>
                      <div className="flex items-center gap-4 hover:bg-muted/50 p-2 rounded-md transition-colors -ml-2">
                        <div className="w-12 h-12 bg-muted rounded-md flex-shrink-0">
                          {release.cover_art && (
                            <Image
                              src={release.cover_art}
                              alt={release.music_name}
                              width={48}
                              height={48}
                              className="object-cover rounded-md"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">{release.music_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(release.release_date).getFullYear()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No releases found for this artist.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
