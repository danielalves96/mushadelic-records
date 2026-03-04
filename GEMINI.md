# Mushadelic Records Website - Gemini Steering Guide

This document provides a comprehensive guide for the Gemini AI assistant to ensure all contributions to the Mushadelic Records website project are consistent, idiomatic, and adhere to established project standards.

## 1. Core Mandates & Philosophy

- **Convention over Configuration:** Always prioritize existing project conventions. Before writing any code, analyze the surrounding files, components, and tests to understand and replicate the established patterns.
- **Mimic Existing Style:** Code style (formatting, naming), structure, framework usage, and architectural patterns must be consistent with the existing codebase.
- **Proactive & Thorough:** Fulfill requests completely, including reasonable, directly-implied follow-up actions. For instance, after creating a component, automatically integrate it where it's clearly intended to be used.
- **Verify, Then Trust:** Do not assume libraries or frameworks are available. Verify their presence in `package.json` and observe their usage patterns before employing them.

## 2. Technical & Architectural Guidelines

### 2.1. Technologies

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **UI:**
    - **Styling:** Tailwind CSS
    - **Component Library:** Shadcn UI (components located in `app/components/ui`)
    - **Class Merging:** Use the `cn` utility from `app/lib/utils.ts` for merging Tailwind classes.
- **State Management:**
    - **Client-side:** React Query (`@tanstack/react-query`) for server state management (fetching, caching). Use custom hooks (e.g., `useArtists`) for data fetching logic.
    - **Global UI State:** Zustand for simple, global UI state (e.g., sidebar toggle).
- **Database & ORM:**
    - **Database:** CockroachDB
    - **ORM:** Prisma. The schema is the source of truth (`prisma/schema.prisma`).
- **Authentication:** NextAuth.js, configured in `app/lib/auth.ts`.
- **Package Manager:** `pnpm`

### 2.2. Architectural Patterns

- **API Routes:** Located in `app/api/...`. Follow the file-based routing of the Next.js App Router. API handlers should be concise, handling only the request and response logic. Business logic should be delegated to service functions where appropriate.
- **Data Fetching:**
    - **Client Components:** Use custom hooks built with `@tanstack/react-query`. These hooks encapsulate the `fetch` call and provide `data`, `isLoading`, `isError` states. (e.g., `app/hooks/artists/useArtists.ts`).
    - **Server Components:** Fetch data directly, preferably using Prisma Client.
- **Component Structure:**
    - **UI Components (`app/components/ui`):** Generic, reusable components from Shadcn.
    - **Domain Components (`app/components`):** Application-specific components that might compose multiple UI components.
    - **Pages (`app/(home)/...`):** Entry points for routes, responsible for layout and data fetching orchestration. Use Client Components (`'use client';`) when interactivity or hooks are needed.
- **Error Handling:**
    - **API Routes:** Use `try...catch` blocks. Return a JSON response with an appropriate error message and HTTP status code (e.g., 500 for server errors).
    - **Client-side:** Utilize the `isError` state from React Query hooks to display user-friendly error messages in the UI.

## 3. Code Style & Conventions

### 3.1. TypeScript

- **Typing:** Use the types defined in `app/types/types.ts` and `types/next-auth.d.ts`. Leverage Prisma's generated types where possible.
- **Imports:**
    - Use absolute paths with aliases (`@/*`, `@/public/*`) as configured in `tsconfig.json`.
    - Imports should be sorted. The `@ianvs/prettier-plugin-sort-imports` plugin handles this automatically.

### 3.2. React

- **Component Naming:** Use PascalCase (e.g., `ArtistsPage`, `AdminNavbar`).
- **File Naming:** Use `kebab-case` for files and folders, except for React components which should be `PascalCase.tsx` or have their own folder.
- **Hooks:** Custom hooks should be prefixed with `use` (e.g., `useArtists`).

### 3.3. API & Data

- **Slugs:** Use the `slugify` utility from `app/lib/utils.ts` to generate URL-friendly slugs.
- **Responses:** API routes should return JSON objects using `NextResponse.json()`.

### 3.4. Git & Commits

- **Commit Messages:** Must follow the **Conventional Commits** specification. This is enforced by `commitlint` (see `.commitlintrc.json`).
    - **Format:** `type(scope): subject` (e.g., `feat(artists): add search functionality`, `fix(api): correct release sorting`).
    - **Allowed Types:** `feat`, `fix`, `build`, `chore`, `ci`, `docs`, `style`, `refactor`, `perf`, `test`.

## 4. Development Workflow Commands

- **Install Dependencies:** `pnpm install`
- **Run Dev Server:** `pnpm dev`
- **Type Checking:** `pnpm type-check`
- **Linting:** `pnpm lint`
- **Formatting:** `pnpm format`

By adhering to this guide, Gemini will act as a consistent and reliable pair programmer, ensuring the quality and integrity of the Mushadelic Records codebase.