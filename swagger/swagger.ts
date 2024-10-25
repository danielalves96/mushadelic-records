import { OpenAPIV3 } from 'openapi-types';

export const swaggerSpec: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'Mushadelic Records API',
    version: '1.0.0',
    description: 'API for managing artists, releases, and castings for Mushadelic Records',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
    },
  ],
  tags: [
    {
      name: 'Artists',
      description: 'Operations related to artists',
    },
    {
      name: 'Releases',
      description: 'Operations related to music releases',
    },
  ],
  paths: {
    '/artist/create': {
      post: {
        summary: 'Create a new artist',
        tags: ['Artists'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                },
                required: ['name'],
              },
              example: {
                name: 'Artista Exemplo',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Artist created successfully',
            content: {
              'application/json': {
                example: {
                  id: 'cm2cda4uy0000k6pe5ac9fy5p',
                  name: 'Artista Exemplo 3',
                  is_casting_artist: false,
                },
              },
            },
          },
          '400': {
            description: 'Bad Request - Invalid input or missing data',
          },
          '500': {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/artist/{slug}': {
      get: {
        summary: 'Get casting artist by slug',
        tags: ['Artists'],
        parameters: [
          {
            name: 'slug',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'Slug of the casting artist',
          },
        ],
        responses: {
          '200': {
            description: 'Casting artist details retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    facebook_link: { type: 'string' },
                    instagram_link: { type: 'string' },
                    soundcloud_link: { type: 'string' },
                    spotify_link: { type: 'string' },
                    youtube_link: { type: 'string' },
                    flag: { type: 'string' },
                    picture: { type: 'string' },
                  },
                },
                example: {
                  id: 'cm2dbm1qw002flrwkpi0f1491',
                  name: 'Casting Artist Example',
                  description: 'Description of the casting artist',
                  facebook_link: 'https://facebook.com/casting_artist',
                  instagram_link: 'https://instagram.com/casting_artist',
                  soundcloud_link: 'https://soundcloud.com/casting_artist',
                  spotify_link: 'https://spotify.com/casting_artist',
                  youtube_link: 'https://youtube.com/casting_artist',
                  flag: 'https://link-to-flag.com/flag.png',
                  picture: 'https://link-to-picture.com/picture.png',
                },
              },
            },
          },
          '404': {
            description: 'Casting artist not found',
            content: {
              'application/json': {
                example: {
                  message: 'Release not found',
                },
              },
            },
          },
          '500': {
            description: 'Error fetching casting artist',
            content: {
              'application/json': {
                example: {
                  error: 'Error fetching release',
                },
              },
            },
          },
        },
      },
    },
    '/artist/update/{artistId}': {
      patch: {
        summary: 'Update an existing artist',
        tags: ['Artists'],
        parameters: [
          {
            name: 'artistId',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'ID of the artist to update',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  is_casting_artist: { type: 'boolean' },
                  description: { type: 'string' },
                  facebook_link: { type: 'string' },
                  instagram_link: { type: 'string' },
                  soundcloud_link: { type: 'string' },
                  spotify_link: { type: 'string' },
                  youtube_link: { type: 'string' },
                  flag: { type: 'string' },
                  picture: { type: 'string' },
                },
              },
              example: {
                name: 'Novo Nome do Artista',
                is_casting_artist: true,
                description: 'Nova descrição do artista no casting',
                facebook_link: 'https://facebook.com/artista',
                instagram_link: 'https://instagram.com/artista',
                soundcloud_link: 'https://soundcloud.com/artista',
                spotify_link: 'https://spotify.com/artista',
                youtube_link: 'https://youtube.com/artista',
                flag: 'https://link-para-flag.com/flag.png',
                picture: 'https://link-para-picture.com/picture.png',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Artist updated successfully',
            content: {
              'application/json': {
                example: {
                  id: 'cm2cda4uy0000k6pe5ac9fy5p',
                  name: 'Novo Nome do Artista',
                  is_casting_artist: true,
                  description: 'Nova descrição do artista no casting',
                  facebook_link: 'https://facebook.com/artista',
                  instagram_link: 'https://instagram.com/artista',
                  soundcloud_link: 'https://soundcloud.com/artista',
                  spotify_link: 'https://spotify.com/artista',
                  youtube_link: 'https://youtube.com/artista',
                  flag: 'https://link-para-flag.com/flag.png',
                  picture: 'https://link-para-picture.com/picture.png',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request - Invalid input or missing data',
          },
          '404': {
            description: 'Artist not found',
          },
          '500': {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/artist/remove-from-casting/{artistId}': {
      delete: {
        summary: 'Remove an artist from the casting',
        tags: ['Artists'],
        parameters: [
          {
            name: 'artistId',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'ID of the artist to remove from casting',
          },
        ],
        responses: {
          '200': {
            description: 'Artist removed from casting successfully',
            content: {
              'application/json': {
                example: {
                  message: 'Artist removed from casting successfully',
                },
              },
            },
          },
          '404': {
            description: 'Artist not found in casting',
          },
          '500': {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/release/create': {
      post: {
        summary: 'Create a new release',
        tags: ['Releases'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  music_name: { type: 'string' },
                  description: { type: 'string' },
                  buy_link: { type: 'string' },
                  cover_art: { type: 'string' },
                  soundcloud_link: { type: 'string' },
                  spotify_link: { type: 'string' },
                  youtube_link: { type: 'string' },
                  deezer_link: { type: 'string' },
                  apple_link: { type: 'string' },
                  release_date: { type: 'string', format: 'date' },
                  artistIds: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                },
                required: ['music_name', 'release_date', 'artistIds'],
              },
              example: {
                music_name: 'Nome da Músicasa',
                description: 'Descrição do lançamento',
                buy_link: 'https://buy-link.com',
                cover_art: 'https://cover-art-link.com',
                soundcloud_link: 'https://soundcloud.com/release',
                spotify_link: 'https://spotify.com/release',
                youtube_link: 'https://youtube.com/release',
                release_date: '2024-10-16',
                deezer_link: 'https://deezer.com/release',
                apple_link: 'https://apple.com/release',
                artistIds: ['cm2cda4uy0000k6pe5ac9fy5p'],
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Release created successfully',
            content: {
              'application/json': {
                example: {
                  id: 'cm2cdbjge0002k6peui67hjvk',
                  music_name: 'Nome da Músicasa',
                  description: 'Descrição do lançamento',
                  buy_link: 'https://buy-link.com',
                  cover_art: 'https://cover-art-link.com',
                  soundcloud_link: 'https://soundcloud.com/release',
                  slug: 'nome-da-msicasa',
                  spotify_link: 'https://spotify.com/release',
                  youtube_link: 'https://youtube.com/release',
                  release_date: '2024-10-16T00:00:00.000Z',
                  deezer_link: 'https://deezer.com/release',
                  apple_link: 'https://apple.com/release',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request - Invalid input or missing data',
          },
          '500': {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/release/{slug}': {
      get: {
        summary: 'Get release by slug',
        tags: ['Releases'],
        parameters: [
          {
            name: 'slug',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'Slug of the release',
          },
        ],
        responses: {
          '200': {
            description: 'Release details retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    music_name: { type: 'string' },
                    description: { type: 'string' },
                    artists: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                        },
                      },
                    },
                  },
                },
                example: {
                  id: 'cm2dbm1qw002flrwkpi0f1491',
                  music_name: 'Frequency',
                  description: 'Psytrance release by Bonne',
                  artists: [{ name: 'Bonne' }],
                },
              },
            },
          },
          '404': {
            description: 'Release not found',
          },
          '500': {
            description: 'Error fetching release',
          },
        },
      },
    },

    '/release/update/{releaseId}': {
      patch: {
        summary: 'Update an existing release',
        tags: ['Releases'],
        parameters: [
          {
            name: 'releaseId',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'ID of the release to update',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  music_name: { type: 'string' },
                  description: { type: 'string' },
                  buy_link: { type: 'string' },
                  cover_art: { type: 'string' },
                  soundcloud_link: { type: 'string' },
                  spotify_link: { type: 'string' },
                  youtube_link: { type: 'string' },
                  deezer_link: { type: 'string' },
                  apple_link: { type: 'string' },
                  release_date: { type: 'string', format: 'date' },
                  artistIds: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                },
              },
              example: {
                music_name: 'Novo Nome da Música',
                description: 'Nova descrição do lançamento',
                buy_link: 'https://buy-link.com',
                cover_art: 'https://cover-art-link.com',
                soundcloud_link: 'https://soundcloud.com/novo-release',
                spotify_link: 'https://spotify.com/novo-release',
                youtube_link: 'https://youtube.com/novo-release',
                release_date: '2024-11-01',
                deezer_link: 'https://deezer.com/novo-release',
                apple_link: 'https://apple.com/novo-release',
                artistIds: ['cm2cda4uy0000k6pe5ac9fy5p'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Release updated successfully',
            content: {
              'application/json': {
                example: {
                  id: 'cm2cdbjge0002k6peui67hjvk',
                  music_name: 'Novo Nome da Música',
                  description: 'Nova descrição do lançamento',
                  buy_link: 'https://buy-link.com',
                  cover_art: 'https://cover-art-link.com',
                  soundcloud_link: 'https://soundcloud.com/novo-release',
                  slug: 'novo-nome-da-msica',
                  spotify_link: 'https://spotify.com/novo-release',
                  youtube_link: 'https://youtube.com/novo-release',
                  release_date: '2024-11-01T00:00:00.000Z',
                  deezer_link: 'https://deezer.com/novo-release',
                  apple_link: 'https://apple.com/novo-release',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request - Invalid input or missing data',
          },
          '404': {
            description: 'Release not found',
          },
          '500': {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/artist/assign-to-casting/{artistId}': {
      post: {
        summary: 'Assign an artist to the casting',
        tags: ['Artists'],
        parameters: [
          {
            name: 'artistId',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'ID of the artist to assign to casting',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  description: { type: 'string' },
                  facebook_link: { type: 'string' },
                  instagram_link: { type: 'string' },
                  soundcloud_link: { type: 'string' },
                  spotify_link: { type: 'string' },
                  youtube_link: { type: 'string' },
                  flag: { type: 'string' },
                  picture: { type: 'string' },
                },
              },
              example: {
                description: 'Descrição do artista no casting',
                facebook_link: 'https://facebook.com/artista',
                instagram_link: 'https://instagram.com/artista',
                soundcloud_link: 'https://soundcloud.com/artista',
                spotify_link: 'https://spotify.com/artista',
                youtube_link: 'https://youtube.com/artista',
                flag: 'https://link-para-flag.com/flag.png',
                picture: 'https://link-para-picture.com/picture.png',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Artist assigned to casting successfully',
            content: {
              'application/json': {
                example: {
                  id: 'cm2cdb1js0001k6pea8t0sco6',
                  artistId: 'cm2cda4uy0000k6pe5ac9fy5p',
                  description: 'Descrição do artista no casting',
                  facebook_link: 'https://facebook.com/artista',
                  flag: 'https://link-para-flag.com/flag.png',
                  instagram_link: 'https://instagram.com/artista',
                  picture: 'https://link-para-picture.com/picture.png',
                  soundcloud_link: 'https://soundcloud.com/artista',
                  slug: 'artista-exemplo-3',
                  spotify_link: 'https://spotify.com/artista',
                  youtube_link: 'https://youtube.com/artista',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request - Invalid input or missing data',
          },
          '404': {
            description: 'Artist not found',
          },
          '500': {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/release/list': {
      get: {
        summary: 'Get all releases',
        tags: ['Releases'],
        responses: {
          '200': {
            description: 'A list of releases',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      music_name: { type: 'string' },
                      description: { type: 'string' },
                      artists: {
                        type: 'array',
                        items: { type: 'string' },
                      },
                    },
                  },
                },
                example: [
                  {
                    id: 'cm2cdbjge0002k6peui67hjvk',
                    music_name: 'Nome da Músicasa',
                    description: 'Descrição do lançamento',
                    artists: ['cm2cda4uy0000k6pe5ac9fy5p'],
                  },
                ],
              },
            },
          },
          '500': {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/artist/list': {
      get: {
        summary: 'Get all artists',
        tags: ['Artists'],
        responses: {
          '200': {
            description: 'A list of artists',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      name: { type: 'string' },
                      is_casting_artist: { type: 'boolean' },
                    },
                  },
                },
                example: [
                  {
                    id: 'cm2cda4uy0000k6pe5ac9fy5p',
                    name: 'Artista Exemplo 3',
                    is_casting_artist: false,
                  },
                ],
              },
            },
          },
          '500': {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/casting/list': {
      get: {
        summary: 'Get all casting artists',
        tags: ['Artists'],
        responses: {
          '200': {
            description: 'A list of casting artists',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      name: { type: 'string' },
                      description: { type: 'string' },
                      facebook_link: { type: 'string' },
                      instagram_link: { type: 'string' },
                      soundcloud_link: { type: 'string' },
                      spotify_link: { type: 'string' },
                      youtube_link: { type: 'string' },
                      flag: { type: 'string' },
                      picture: { type: 'string' },
                    },
                  },
                },
                example: [
                  {
                    id: 'cm2cda4uy0000k6pe5ac9fy5p',
                    name: 'Artista Exemplo 3',
                    description: 'Descrição do artista no casting',
                    facebook_link: 'https://facebook.com/artista',
                    instagram_link: 'https://instagram.com/artista',
                    soundcloud_link: 'https://soundcloud.com/artista',
                    spotify_link: 'https://spotify.com/artista',
                    youtube_link: 'https://youtube.com/artista',
                    flag: 'https://link-para-flag.com/flag.png',
                    picture: 'https://link-para-picture.com/picture.png',
                  },
                ],
              },
            },
          },
          '500': {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/release/by-artist/{artistId}': {
      get: {
        summary: 'Get all releases for a specific artist',
        tags: ['Releases'],
        parameters: [
          {
            name: 'artistId',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'ID of the artist to filter releases',
          },
        ],
        responses: {
          '200': {
            description: 'A list of releases for the artist',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      music_name: { type: 'string' },
                      description: { type: 'string' },
                      artists: {
                        type: 'array',
                        items: { type: 'string' },
                      },
                    },
                  },
                },
                example: [
                  {
                    id: 'cm2cdbjge0002k6peui67hjvk',
                    music_name: 'Nome da Músicasa',
                    description: 'Descrição do lançamento',
                    artists: ['cm2cda4uy0000k6pe5ac9fy5p'],
                  },
                ],
              },
            },
          },
          '404': {
            description: 'No releases found for this artist',
          },
          '500': {
            description: 'Internal Server Error',
          },
        },
      },
    },
  },
};
