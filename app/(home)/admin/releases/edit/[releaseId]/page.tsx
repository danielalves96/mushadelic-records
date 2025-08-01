'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useArtists } from '@/hooks/artists/useArtists';
import { useReleaseById } from '@/hooks/releases/useReleaseById';
import { useUpdateRelease } from '@/hooks/releases/useUpdateRelease';
import { useToast } from '@/hooks/use-toast';
import { uploadImage } from '@/lib/image-upload';

export default function EditReleasePage({ params }: { params: { releaseId: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const updateReleaseMutation = useUpdateRelease();
  const { data: artists } = useArtists();
  const { data: release, isLoading, error } = useReleaseById(params.releaseId);

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
  const [originalCoverArt, setOriginalCoverArt] = useState<string>('');

  useEffect(() => {
    if (release) {
      const newFormData = {
        music_name: release.music_name || '',
        description: release.description || '',
        buy_link: release.buy_link || '',
        cover_art: release.cover_art || '',
        soundcloud_link: release.soundcloud_link || '',
        spotify_link: release.spotify_link || '',
        youtube_link: release.youtube_link || '',
        deezer_link: release.deezer_link || '',
        apple_link: release.apple_link || '',
        release_date: release.release_date ? release.release_date.split('T')[0] : '',
        artistIds: release.artists?.map((artist: any) => artist.id) || [],
      };
      setFormData(newFormData);
      setOriginalCoverArt(release.cover_art || '');
    }
  }, [release]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load release data',
        variant: 'destructive',
      });
    }
  }, [error, toast]);

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

      // Upload new cover art if file is selected
      if (coverArtFile) {
        coverArtUrl = await uploadImage(coverArtFile, 'release', originalCoverArt);
      }

      const updateData = {
        ...formData,
        cover_art: coverArtUrl,
      };

      await updateReleaseMutation.mutateAsync({
        releaseId: params.releaseId,
        data: updateData,
      });
      toast({
        title: 'Success',
        description: 'Release updated successfully!',
      });
      router.push('/admin/releases');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to update release',
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Release</h1>
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Release Information</CardTitle>
            <CardDescription>Update the details for this release</CardDescription>
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
                <Button type="submit" disabled={updateReleaseMutation.isPending} className="flex-1">
                  {updateReleaseMutation.isPending ? 'Updating...' : 'Update Release'}
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
