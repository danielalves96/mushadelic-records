-- CreateTable
CREATE TABLE "MusicRelease" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "music_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "buy_link" TEXT,
    "cover_art" TEXT,
    "soundcloud_link" TEXT,
    "slug" TEXT NOT NULL,
    "spotify_link" TEXT,
    "youtube_link" TEXT,
    "release_date" DATETIME NOT NULL,
    "deezer_link" TEXT,
    "apple_link" TEXT
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "is_casting_artist" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "CastingArtist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "artistId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "facebook_link" TEXT,
    "flag" TEXT,
    "instagram_link" TEXT,
    "picture" TEXT,
    "soundcloud_link" TEXT,
    "slug" TEXT NOT NULL,
    "spotify_link" TEXT,
    "youtube_link" TEXT,
    CONSTRAINT "CastingArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ArtistToMusicRelease" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ArtistToMusicRelease_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ArtistToMusicRelease_B_fkey" FOREIGN KEY ("B") REFERENCES "MusicRelease" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "MusicRelease_slug_key" ON "MusicRelease"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CastingArtist_artistId_key" ON "CastingArtist"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "CastingArtist_slug_key" ON "CastingArtist"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistToMusicRelease_AB_unique" ON "_ArtistToMusicRelease"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistToMusicRelease_B_index" ON "_ArtistToMusicRelease"("B");
