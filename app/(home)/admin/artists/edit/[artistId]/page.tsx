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
import { useArtistById } from '@/hooks/artists/useArtistById';
import { useUpdateArtist } from '@/hooks/artists/useUpdateArtist';
import { useToast } from '@/hooks/use-toast';

export default function EditArtistPage({ params }: { params: { artistId: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const updateArtistMutation = useUpdateArtist();
  const { data: artist, isLoading, error } = useArtistById(params.artistId);

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

  const [originalImages, setOriginalImages] = useState({
    picture: '',
    flag: '',
  });

  useEffect(() => {
    if (artist) {
      setFormData({
        name: artist.name || '',
        is_casting_artist: artist.is_casting_artist || false,
        description: artist.casting_artist?.description || '',
        facebook_link: artist.casting_artist?.facebook_link || '',
        instagram_link: artist.casting_artist?.instagram_link || '',
        soundcloud_link: artist.casting_artist?.soundcloud_link || '',
        spotify_link: artist.casting_artist?.spotify_link || '',
        youtube_link: artist.casting_artist?.youtube_link || '',
        flag: artist.casting_artist?.flag || '',
        picture: artist.casting_artist?.picture || '',
      });
      setOriginalImages({
        picture: artist.casting_artist?.picture || '',
        flag: artist.casting_artist?.flag || '',
      });
    }
  }, [artist]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load artist data',
        variant: 'destructive',
      });
    }
  }, [error, toast]);

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
        if (originalImages.picture) {
          uploadFormData.append('oldImageUrl', originalImages.picture);
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
        if (originalImages.flag) {
          uploadFormData.append('oldImageUrl', originalImages.flag);
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
