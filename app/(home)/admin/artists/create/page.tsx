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
      let pictureUrl = formData.picture;

      // Ensure picture is uploaded FIRST so we can create the base Artist with it
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

      const newArtist = await createArtistMutation.mutateAsync({ name: formData.name, picture: pictureUrl });

      if (formData.is_casting_artist) {
        let flagUrl = formData.flag;

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
    <div className="space-y-10 pt-4 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-white/5 pb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="h-12 w-12 rounded-full border-white/10 hover:border-primary"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-sm text-foreground">Create New Artist</h1>
          <p className="text-muted-foreground text-lg mt-1">Add a new artist to your roster</p>
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information & Picture */}
          <Card className="glass-card border-white/10 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[60px] -z-10 pointer-events-none" />
            <CardHeader className="border-b border-white/5 bg-card/30">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                  <User className="h-6 w-6 text-primary" strokeWidth={2} />
                </div>
                <div>
                  <CardTitle className="text-xl">Basic Information</CardTitle>
                  <CardDescription className="text-base mt-1">
                    Essential artist details and profile picture
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 pt-8 relative z-10">
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
                      placeholder="Enter artist name"
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
                      Add to casting roster
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

          {/* Casting Information */}
          {formData.is_casting_artist && (
            <Card className="glass-card border-white/10 shadow-xl overflow-hidden relative">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[60px] -z-10 pointer-events-none" />
              <CardHeader className="border-b border-white/5 bg-card/30">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                    <Music className="h-6 w-6 text-primary" strokeWidth={2} />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Casting Information</CardTitle>
                    <CardDescription className="text-base mt-1">Details for the casting portfolio</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8 pt-8 relative z-10">
                <div className="space-y-3">
                  <Label htmlFor="description" className="text-base font-semibold">
                    Artist Description <span className="text-primary">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the artist's style, background, and musical approach..."
                    rows={5}
                    className="resize-none text-base bg-background/50 border-white/10 focus-visible:ring-primary/50 p-4"
                    required={formData.is_casting_artist}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
