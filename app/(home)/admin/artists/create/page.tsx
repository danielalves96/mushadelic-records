'use client';

import { ArrowLeft, Globe, Music, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAssignToCasting } from '@/hooks/artists/useAssignToCasting';
import { useCreateArtist } from '@/hooks/artists/useCreateArtist';
import { useToast } from '@/hooks/use-toast';

export default function CreateArtistPage() {
  const router = useRouter();
  const { toast } = useToast();
  const createArtistMutation = useCreateArtist();
  const assignToCastingMutation = useAssignToCasting();

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
      const newArtist = await createArtistMutation.mutateAsync({ name: formData.name });

      if (formData.is_casting_artist) {
        let pictureUrl = formData.picture;
        let flagUrl = formData.flag;

        // Upload images if files are selected
        if (imageFiles.picture) {
          const uploadFormData = new FormData();
          uploadFormData.append('file', imageFiles.picture);
          uploadFormData.append('type', 'artist');

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

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: uploadFormData,
          });

          if (response.ok) {
            const { imageUrl } = await response.json();
            flagUrl = imageUrl;
          }
        }

        await assignToCastingMutation.mutateAsync({
          artistId: newArtist.id,
          data: {
            description: formData.description,
            facebook_link: formData.facebook_link,
            instagram_link: formData.instagram_link,
            soundcloud_link: formData.soundcloud_link,
            spotify_link: formData.spotify_link,
            youtube_link: formData.youtube_link,
            flag: flagUrl,
            picture: pictureUrl,
          },
        });
      }

      toast({
        title: 'Success',
        description: `Artist "${formData.name}" created successfully!`,
      });
      router.push('/admin/artists');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to create artist',
        variant: 'destructive',
      });
    }
  };

  const isLoading = createArtistMutation.isPending || assignToCastingMutation.isPending;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Artist</h1>
          <p className="text-muted-foreground">Add a new artist to your roster</p>
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <CardTitle>Basic Information</CardTitle>
              </div>
              <CardDescription>Essential artist details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Artist Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter artist name"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_casting_artist"
                  name="is_casting_artist"
                  checked={formData.is_casting_artist}
                  onChange={handleInputChange}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="is_casting_artist" className="text-sm font-medium">
                  Add to casting roster
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Casting Information */}
          {formData.is_casting_artist && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Music className="h-5 w-5" />
                  <CardTitle>Casting Information</CardTitle>
                </div>
                <CardDescription>Details for the casting portfolio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description">Artist Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the artist's style, background, and musical approach..."
                    rows={4}
                    required={formData.is_casting_artist}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <ImageUpload
                      value={formData.picture}
                      onChange={(url) => setFormData((prev) => ({ ...prev, picture: url }))}
                      onFileChange={(file) => setImageFiles((prev) => ({ ...prev, picture: file }))}
                      label="Profile Picture"
                      placeholder="Upload artist profile picture"
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
                </div>
              </CardContent>
            </Card>
          )}

          {/* Social Media Links */}
          {formData.is_casting_artist && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  <CardTitle>Social Media & Streaming</CardTitle>
                </div>
                <CardDescription>Connect artist&apos;s online presence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="facebook_link">Facebook</Label>
                    <Input
                      id="facebook_link"
                      name="facebook_link"
                      value={formData.facebook_link}
                      onChange={handleInputChange}
                      placeholder="https://facebook.com/artist"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagram_link">Instagram</Label>
                    <Input
                      id="instagram_link"
                      name="instagram_link"
                      value={formData.instagram_link}
                      onChange={handleInputChange}
                      placeholder="https://instagram.com/artist"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="soundcloud_link">SoundCloud</Label>
                    <Input
                      id="soundcloud_link"
                      name="soundcloud_link"
                      value={formData.soundcloud_link}
                      onChange={handleInputChange}
                      placeholder="https://soundcloud.com/artist"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="spotify_link">Spotify</Label>
                    <Input
                      id="spotify_link"
                      name="spotify_link"
                      value={formData.spotify_link}
                      onChange={handleInputChange}
                      placeholder="https://open.spotify.com/artist/..."
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="youtube_link">YouTube</Label>
                    <Input
                      id="youtube_link"
                      name="youtube_link"
                      value={formData.youtube_link}
                      onChange={handleInputChange}
                      placeholder="https://youtube.com/@artist"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'Creating...' : 'Create Artist'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
