# Aesthetic Runs

A modern running route app built with Next.js 16, Supabase, and Mapbox GL.

## Development

```bash
pnpm install              # Install all dependencies
pnpm dev                  # Start development server (http://localhost:3000)
pnpm build                # Build for production
pnpm lint                 # Run ESLint
pnpm format               # Format code with Prettier
```

## Environment Variables

Create `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

## Stack

- **Frontend**: Next.js 16 (App Router)
- **Auth**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Maps**: Mapbox GL
- **Styling**: TailwindCSS 4
- **State**: Zustand
- **Toasts**: Sonner
