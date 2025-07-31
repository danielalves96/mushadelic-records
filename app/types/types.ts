export interface Artist {
  id: string;
  name: string;
  is_casting_artist: boolean;
  music_releases: Release[];
  casting_artist: {
    id: string;
    artistId: string;
    description?: string;
    soundcloud_link?: string;
    spotify_link?: string;
    youtube_link?: string;
    instagram_link?: string;
    facebook_link?: string;
    slug?: string;
    flag?: string;
    picture?: string;
  };
}

export interface Release {
  id: string;
  music_name: string;
  description?: string;
  slug: string;
  soundcloud_link?: string;
  spotify_link?: string;
  youtube_link?: string;
  deezer_link?: string;
  apple_link?: string;
  buy_link?: string;
  cover_art?: string;
  release_date: string;
  artists: Artist[];
}
