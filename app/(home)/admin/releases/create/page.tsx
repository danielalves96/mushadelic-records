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

      <div className="relative">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-blue-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <Card className="glass-card border-white/10 bg-black/40 shadow-2xl overflow-hidden backdrop-blur-xl">
          <CardHeader className="border-b border-white/5 bg-white/5">
            <CardTitle className="text-2xl font-bold tracking-tight text-white/90">Release Details</CardTitle>
            <CardDescription className="text-muted-foreground/80">
              Complete the information below to publish a new release.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="music_name" className="text-white/80 font-medium">
                    Music Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="music_name"
                    name="music_name"
                    value={formData.music_name}
                    onChange={handleInputChange}
                    className="bg-black/50 border-white/10 focus-visible:ring-primary/50 text-white placeholder:text-white/30"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="release_date" className="text-white/80 font-medium">
                    Release Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="release_date"
                    name="release_date"
                    type="date"
                    value={formData.release_date}
                    onChange={handleInputChange}
                    className="bg-black/50 border-white/10 focus-visible:ring-primary/50 text-white placeholder:text-white/30"
                    required
                  />
                </div>

                <div className="space-y-3 md:col-span-2 p-6 rounded-xl border border-white/5 bg-black/20">
                  <ImageUpload
                    value={formData.cover_art}
                    onChange={(url) => setFormData((prev) => ({ ...prev, cover_art: url }))}
                    onFileChange={setCoverArtFile}
                    label="Cover Art"
                    placeholder="Upload high-res release cover art"
                  />
                </div>

                {/* Platforms Row */}
                <div className="space-y-3">
                  <Label htmlFor="buy_link" className="text-white/80 font-medium">
                    Buy Link (Bandcamp)
                  </Label>
                  <Input
                    id="buy_link"
                    name="buy_link"
                    value={formData.buy_link}
                    onChange={handleInputChange}
                    className="bg-black/50 border-white/10 focus-visible:ring-primary/50 text-white placeholder:text-white/30"
                    placeholder="https://bandcamp.com/..."
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="soundcloud_link" className="text-white/80 font-medium">
                    SoundCloud Link
                  </Label>
                  <Input
                    id="soundcloud_link"
                    name="soundcloud_link"
                    value={formData.soundcloud_link}
                    onChange={handleInputChange}
                    className="bg-black/50 border-white/10 focus-visible:ring-primary/50 text-white placeholder:text-white/30"
                    placeholder="https://soundcloud.com/..."
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="spotify_link" className="text-white/80 font-medium">
                    Spotify Link
                  </Label>
                  <Input
                    id="spotify_link"
                    name="spotify_link"
                    value={formData.spotify_link}
                    onChange={handleInputChange}
                    className="bg-black/50 border-white/10 focus-visible:ring-primary/50 text-white placeholder:text-white/30"
                    placeholder="https://spotify.com/..."
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="youtube_link" className="text-white/80 font-medium">
                    YouTube Link
                  </Label>
                  <Input
                    id="youtube_link"
                    name="youtube_link"
                    value={formData.youtube_link}
                    onChange={handleInputChange}
                    className="bg-black/50 border-white/10 focus-visible:ring-primary/50 text-white placeholder:text-white/30"
                    placeholder="https://youtube.com/..."
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="deezer_link" className="text-white/80 font-medium">
                    Deezer Link
                  </Label>
                  <Input
                    id="deezer_link"
                    name="deezer_link"
                    value={formData.deezer_link}
                    onChange={handleInputChange}
                    className="bg-black/50 border-white/10 focus-visible:ring-primary/50 text-white placeholder:text-white/30"
                    placeholder="https://deezer.com/..."
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="apple_link" className="text-white/80 font-medium">
                    Apple Music Link
                  </Label>
                  <Input
                    id="apple_link"
                    name="apple_link"
                    value={formData.apple_link}
                    onChange={handleInputChange}
                    className="bg-black/50 border-white/10 focus-visible:ring-primary/50 text-white placeholder:text-white/30"
                    placeholder="https://music.apple.com/..."
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-white/80 font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="bg-black/50 border-white/10 focus-visible:ring-primary/50 text-white placeholder:text-white/30 min-h-[120px]"
                  placeholder="Tell us about this release..."
                  rows={4}
                />
              </div>

              <div className="space-y-3 p-6 rounded-xl border border-white/5 bg-black/20">
                <Label className="text-white/80 font-medium">
                  Artists involved <span className="text-red-500">*</span>
                </Label>
                <div className="mt-2">
                  <MultiSelect
                    options={artists || []}
                    selectedIds={formData.artistIds}
                    onSelectionChange={(selectedIds) => setFormData((prev) => ({ ...prev, artistIds: selectedIds }))}
                    placeholder="Select artists for this release..."
                    emptyMessage="No artists found."
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-white/5 mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1 bg-transparent border-white/10 hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createReleaseMutation.isPending}
                  className="flex-1 shadow-lg shadow-primary/20 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {createReleaseMutation.isPending ? 'Creating...' : 'Publish Release'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
