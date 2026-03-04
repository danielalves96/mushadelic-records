# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server at http://localhost:3000
- `pnpm build` - Create production build
- `pnpm start` - Start production server
- `pnpm type-check` - Run TypeScript type checking
- `pnpm lint` - Run ESLint on all TypeScript/JavaScript files
- `pnpm format` - Format code with Prettier
- `pnpm dump-database` - Export database data using the dump script

## Architecture Overview

This is a Next.js 14 App Router application for Mushadelic Records, a psytrance music label. The app manages artists, music releases, and casting operations.

### Database & Data Layer
- **Database**: CockroachDB with Prisma ORM
- **Schema**: Three main models - `Artist`, `MusicRelease`, and `CastingArtist`
- **Connection**: Singleton Prisma client in `app/lib/prisma.ts`
- **Types**: TypeScript interfaces in `app/types/types.ts`

### API Structure
- **Pattern**: Next.js API Routes in `app/api/`
- **Endpoints**: RESTful APIs for artists and releases
  - `/api/artist/*` - Artist management and casting operations
  - `/api/release/*` - Music release operations
- **Documentation**: OpenAPI spec in `swagger/swagger.ts`
- **Caching**: Disabled with `no-store` headers across all API routes

### Frontend Architecture
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Custom hooks for server state (`useApiData`, `useApiMutation`), Zustand for client state
- **HTTP Client**: Axios for API requests
- **Theme**: Dark mode support with next-themes
- **UI Components**: Custom admin panel layout with collapsible sidebar
- **Forms**: React Hook Form with Zod validation

### Key Features
- **Artists Management**: CRUD operations with casting assignment
- **Releases Management**: Music releases with multi-artist support
- **Slug-based Routing**: SEO-friendly URLs for artists and releases
- **Admin Panel**: Full-featured admin interface with responsive design

### Path Mapping
- `@/*` maps to `./app/*` 
- `@/public/*` maps to `./public/*`

### Development Notes
- Uses pnpm as package manager
- TypeScript strict mode enabled
- ESLint and Prettier configured with Husky pre-commit hooks
- Image optimization configured for media.graphassets.com and utfs.io domains
- Caching globally disabled in next.config.js for development