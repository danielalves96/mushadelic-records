'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
        picture: artist.picture || '',
      });
      setOriginalImages({
        picture: artist.picture || '',
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

      // Handle picture removal
      if (originalImages.picture && !formData.picture && !imageFiles.picture) {
        try {
          await fetch('/api/upload', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageUrl: originalImages.picture }),
          });
        } catch (err) {
          console.error('Failed to delete old picture:', err);
        }
        pictureUrl = '';
      }

      // Handle flag removal
      if (originalImages.flag && !formData.flag && !imageFiles.flag) {
        try {
          await fetch('/api/upload', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageUrl: originalImages.flag }),
          });
        } catch (err) {
          console.error('Failed to delete old flag:', err);
        }
        flagUrl = '';
      }

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
    <div className="space-y-10 pt-4 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="h-12 w-12 rounded-full border-white/10 hover:border-primary"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-sm text-foreground">Edit Artist</h1>
          <p className="text-muted-foreground text-lg mt-1">Update the details for this artist</p>
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information & Picture */}
          <Card className="glass-card border-white/10 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[60px] -z-10 pointer-events-none" />
            <CardContent className="pt-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 flex flex-col justify-center space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-base font-semibold">
                      Artist Name <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="h-14 text-lg bg-background/50 border-white/10 focus-visible:ring-primary/50"
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-3 p-4 rounded-xl border border-white/5 bg-background/30">
                    <input
                      type="checkbox"
                      id="is_casting_artist"
                      name="is_casting_artist"
                      checked={formData.is_casting_artist}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-white/20 text-primary focus:ring-primary/50 bg-background"
                    />
                    <Label htmlFor="is_casting_artist" className="text-base font-medium cursor-pointer">
                      Is Casting Artist
                    </Label>
                  </div>
                </div>

                <div className="lg:col-span-4 flex justify-center lg:justify-end">
                  <div className="w-full max-w-[250px] space-y-3">
                    <Label className="text-base font-semibold block text-center lg:text-left">Profile Picture</Label>
                    <ImageUpload
                      value={formData.picture}
                      onChange={(url) => setFormData((prev) => ({ ...prev, picture: url }))}
                      onFileChange={(file) => setImageFiles((prev) => ({ ...prev, picture: file }))}
                      label=""
                      placeholder="Upload photo"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {formData.is_casting_artist && (
            <div className="space-y-8 p-6 border border-white/5 rounded-2xl bg-card/30 mt-8 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[60px] -z-10 pointer-events-none" />
              <h3 className="font-bold text-xl text-foreground/90">Casting Information</h3>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-base font-semibold">
                  Description <span className="text-primary">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Artist description for casting"
                  required={formData.is_casting_artist}
                  rows={5}
                  className="resize-none text-base bg-background/50 border-white/10 focus-visible:ring-primary/50 p-4"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="facebook_link" className="text-base font-semibold">
                    Facebook Link
                  </Label>
                  <Input
                    id="facebook_link"
                    name="facebook_link"
                    value={formData.facebook_link}
                    onChange={handleInputChange}
                    placeholder="https://facebook.com/artist"
                    className="h-12 bg-background/50 border-white/10 focus-visible:ring-primary/50"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="instagram_link" className="text-base font-semibold">
                    Instagram Link
                  </Label>
                  <Input
                    id="instagram_link"
                    name="instagram_link"
                    value={formData.instagram_link}
                    onChange={handleInputChange}
                    placeholder="https://instagram.com/artist"
                    className="h-12 bg-background/50 border-white/10 focus-visible:ring-primary/50"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="soundcloud_link" className="text-base font-semibold">
                    SoundCloud Link
                  </Label>
                  <Input
                    id="soundcloud_link"
                    name="soundcloud_link"
                    value={formData.soundcloud_link}
                    onChange={handleInputChange}
                    placeholder="https://soundcloud.com/artist"
                    className="h-12 bg-background/50 border-white/10 focus-visible:ring-primary/50"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="spotify_link" className="text-base font-semibold">
                    Spotify Link
                  </Label>
                  <Input
                    id="spotify_link"
                    name="spotify_link"
                    value={formData.spotify_link}
                    onChange={handleInputChange}
                    placeholder="https://spotify.com/artist"
                    className="h-12 bg-background/50 border-white/10 focus-visible:ring-primary/50"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="youtube_link" className="text-base font-semibold">
                    YouTube Link
                  </Label>
                  <Input
                    id="youtube_link"
                    name="youtube_link"
                    value={formData.youtube_link}
                    onChange={handleInputChange}
                    placeholder="https://youtube.com/artist"
                    className="h-12 bg-background/50 border-white/10 focus-visible:ring-primary/50"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold">Country Flag</Label>
                  <ImageUpload
                    value={formData.flag}
                    onChange={(url) => setFormData((prev) => ({ ...prev, flag: url }))}
                    onFileChange={(file) => setImageFiles((prev) => ({ ...prev, flag: file }))}
                    label=""
                    placeholder="Upload country flag"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex w-full gap-4 justify-end mt-8">
            <Button type="submit" disabled={updateArtistMutation.isPending} className="px-8 h-12 text-lg">
              {updateArtistMutation.isPending ? 'Updating...' : 'Update Artist'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} className="px-8 h-12 text-lg">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
