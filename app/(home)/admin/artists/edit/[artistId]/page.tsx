'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateArtist } from '@/hooks/artists/useUpdateArtist';
import { useToast } from '@/hooks/use-toast';

export default function EditArtistPage({ params }: { params: { artistId: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const updateArtistMutation = useUpdateArtist();

  const [isLoading, setIsLoading] = useState(true);
  const [, setArtist] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    is_casting_artist: false,
    description: '',
    facebook_link: '',
    instagram_link: '',
    soundcloud_link: '',
    spotify_link: '',
    youtube_link: '',
    flag: '',
    picture: '',
  });

  const [imageFiles, setImageFiles] = useState<{
    picture: File | null;
    flag: File | null;
  }>({
    picture: null,
    flag: null,
  });

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`/api/artist/by-id/${params.artistId}`);
        if (response.ok) {
          const artistData = await response.json();
          setArtist(artistData);
          setFormData({
            name: artistData.name || '',
            is_casting_artist: artistData.is_casting_artist || false,
            description: artistData.casting_artist?.description || '',
            facebook_link: artistData.casting_artist?.facebook_link || '',
            instagram_link: artistData.casting_artist?.instagram_link || '',
            soundcloud_link: artistData.casting_artist?.soundcloud_link || '',
            spotify_link: artistData.casting_artist?.spotify_link || '',
            youtube_link: artistData.casting_artist?.youtube_link || '',
            flag: artistData.casting_artist?.flag || '',
            picture: artistData.casting_artist?.picture || '',
          });
        }
      } catch (error) {
        console.error('Error fetching artist:', error);
        toast({
          title: 'Error',
          description: 'Failed to load artist data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtist();
  }, [params.artistId, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast({
        title: 'Error',
        description: 'Artist name is required',
        variant: 'destructive',
      });
      return;
    }

    if (formData.is_casting_artist && !formData.description.trim()) {
      toast({
        title: 'Error',
        description: 'Description is required for casting artists',
        variant: 'destructive',
      });
      return;
    }

    try {
      let pictureUrl = formData.picture;
      let flagUrl = formData.flag;

      // Upload new images if files are selected
      if (imageFiles.picture) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', imageFiles.picture);
        uploadFormData.append('type', 'artist');
        if (formData.picture) {
          uploadFormData.append('oldImageUrl', formData.picture);
        }

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        if (response.ok) {
          const { imageUrl } = await response.json();
          pictureUrl = imageUrl;
        }
      }

      if (imageFiles.flag) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', imageFiles.flag);
        uploadFormData.append('type', 'artist');
        if (formData.flag) {
          uploadFormData.append('oldImageUrl', formData.flag);
        }

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        if (response.ok) {
          const { imageUrl } = await response.json();
          flagUrl = imageUrl;
        }
      }

      const updateData = {
        ...formData,
        picture: pictureUrl,
        flag: flagUrl,
      };

      await updateArtistMutation.mutateAsync({
        artistId: params.artistId,
        data: updateData,
      });
      toast({
        title: 'Success',
        description: 'Artist updated successfully!',
      });
      router.push('/admin/artists');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to update artist',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64 mb-8" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-96" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Edit Artist</h1>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Artist Information</CardTitle>
            <CardDescription>Update the details for this artist</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Artist Name *</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_casting_artist"
                  name="is_casting_artist"
                  checked={formData.is_casting_artist}
                  onChange={handleInputChange}
                  className="rounded"
                />
                <Label htmlFor="is_casting_artist">Is Casting Artist</Label>
              </div>

              {formData.is_casting_artist && (
                <div className="space-y-6 p-4 border rounded-lg bg-muted/50">
                  <h3 className="font-semibold">Casting Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Artist description for casting"
                      required={formData.is_casting_artist}
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="facebook_link">Facebook Link</Label>
                      <Input
                        id="facebook_link"
                        name="facebook_link"
                        value={formData.facebook_link}
                        onChange={handleInputChange}
                        placeholder="https://facebook.com/artist"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="instagram_link">Instagram Link</Label>
                      <Input
                        id="instagram_link"
                        name="instagram_link"
                        value={formData.instagram_link}
                        onChange={handleInputChange}
                        placeholder="https://instagram.com/artist"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="soundcloud_link">SoundCloud Link</Label>
                      <Input
                        id="soundcloud_link"
                        name="soundcloud_link"
                        value={formData.soundcloud_link}
                        onChange={handleInputChange}
                        placeholder="https://soundcloud.com/artist"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="spotify_link">Spotify Link</Label>
                      <Input
                        id="spotify_link"
                        name="spotify_link"
                        value={formData.spotify_link}
                        onChange={handleInputChange}
                        placeholder="https://spotify.com/artist"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="youtube_link">YouTube Link</Label>
                      <Input
                        id="youtube_link"
                        name="youtube_link"
                        value={formData.youtube_link}
                        onChange={handleInputChange}
                        placeholder="https://youtube.com/artist"
                      />
                    </div>

                    <div className="space-y-2">
                      <ImageUpload
                        value={formData.flag}
                        onChange={(url) => setFormData((prev) => ({ ...prev, flag: url }))}
                        onFileChange={(file) => setImageFiles((prev) => ({ ...prev, flag: file }))}
                        label="Country Flag"
                        placeholder="Upload country flag"
                      />
                    </div>

                    <div className="space-y-2">
                      <ImageUpload
                        value={formData.picture}
                        onChange={(url) => setFormData((prev) => ({ ...prev, picture: url }))}
                        onFileChange={(file) => setImageFiles((prev) => ({ ...prev, picture: file }))}
                        label="Profile Picture"
                        placeholder="Upload artist profile picture"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex w-full gap-4 justify-end">
                <Button type="submit" disabled={updateArtistMutation.isPending}>
                  {updateArtistMutation.isPending ? 'Updating...' : 'Update Artist'}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
