'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import { Textarea } from '@/components/ui/textarea';
import { useArtists } from '@/hooks/artists/useArtists';
import { useCreateRelease } from '@/hooks/releases/useCreateRelease';
import { useToast } from '@/hooks/use-toast';
import { uploadImage } from '@/lib/image-upload';

export default function CreateReleasePage() {
  const router = useRouter();
  const { toast } = useToast();
  const createReleaseMutation = useCreateRelease();
  const { data: artists } = useArtists();

  const [formData, setFormData] = useState({
    music_name: '',
    description: '',
    buy_link: '',
    cover_art: '',
    soundcloud_link: '',
    spotify_link: '',
    youtube_link: '',
    deezer_link: '',
    apple_link: '',
    release_date: '',
    artistIds: [] as string[],
  });

  const [coverArtFile, setCoverArtFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.music_name || !formData.release_date || formData.artistIds.length === 0) {
      toast({
        title: 'Error',
        description: 'Please fill in required fields (name, date, and at least one artist)',
        variant: 'destructive',
      });
      return;
    }

    try {
      let coverArtUrl = formData.cover_art;

      // Upload cover art if file is selected
      if (coverArtFile) {
        coverArtUrl = await uploadImage(coverArtFile, 'release');
      }

      const releaseData = {
        ...formData,
        cover_art: coverArtUrl,
      };

      await createReleaseMutation.mutateAsync(releaseData);
      toast({
        title: 'Success',
        description: 'Release created successfully!',
      });
      router.push('/admin/releases');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to create release',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Create New Release</h1>
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Release Information</CardTitle>
            <CardDescription>Fill in the details for the new release</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="music_name">Music Name *</Label>
                  <Input
                    id="music_name"
                    name="music_name"
                    value={formData.music_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="release_date">Release Date *</Label>
                  <Input
                    id="release_date"
                    name="release_date"
                    type="date"
                    value={formData.release_date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <ImageUpload
                    value={formData.cover_art}
                    onChange={(url) => setFormData((prev) => ({ ...prev, cover_art: url }))}
                    onFileChange={setCoverArtFile}
                    label="Cover Art"
                    placeholder="Upload release cover art"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buy_link">Buy Link</Label>
                  <Input
                    id="buy_link"
                    name="buy_link"
                    value={formData.buy_link}
                    onChange={handleInputChange}
                    placeholder="https://store.example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="soundcloud_link">SoundCloud Link</Label>
                  <Input
                    id="soundcloud_link"
                    name="soundcloud_link"
                    value={formData.soundcloud_link}
                    onChange={handleInputChange}
                    placeholder="https://soundcloud.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="spotify_link">Spotify Link</Label>
                  <Input
                    id="spotify_link"
                    name="spotify_link"
                    value={formData.spotify_link}
                    onChange={handleInputChange}
                    placeholder="https://spotify.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="youtube_link">YouTube Link</Label>
                  <Input
                    id="youtube_link"
                    name="youtube_link"
                    value={formData.youtube_link}
                    onChange={handleInputChange}
                    placeholder="https://youtube.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deezer_link">Deezer Link</Label>
                  <Input
                    id="deezer_link"
                    name="deezer_link"
                    value={formData.deezer_link}
                    onChange={handleInputChange}
                    placeholder="https://deezer.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apple_link">Apple Music Link</Label>
                  <Input
                    id="apple_link"
                    name="apple_link"
                    value={formData.apple_link}
                    onChange={handleInputChange}
                    placeholder="https://music.apple.com/..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Artists *</Label>
                <MultiSelect
                  options={artists || []}
                  selectedIds={formData.artistIds}
                  onSelectionChange={(selectedIds) => setFormData((prev) => ({ ...prev, artistIds: selectedIds }))}
                  placeholder="Select artists for this release..."
                  emptyMessage="No artists found."
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={createReleaseMutation.isPending} className="flex-1">
                  {createReleaseMutation.isPending ? 'Creating...' : 'Create Release'}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
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
