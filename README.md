# Aesthetic Runs

A modern running route app built with Next.js 16, Supabase, and Mapbox GL.

## Development

```bash
pnpm install              # Install all dependencies
pnpm dev                  # Start development server (http://localhost:3000)
pnpm build                # Build for production
pnpm seed                 # Seed Supabase database with sample routes
pnpm supabase:push        # Push database migrations to remote
pnpm supabase:seed        # Reset and seed remote database
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

Set these same variables in Netlify → Environment Variables for production.

## Setup

### 1. Supabase Setup

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Copy your project URL and anon key
4. Run `pnpm supabase:push` to deploy schema
5. Run `pnpm seed` to populate with sample routes

### 2. Netlify Setup

1. Create site on [Netlify](https://app.netlify.com)
2. Connect GitHub repo
3. Build settings:
   - Base directory: `/`
   - Build command: `pnpm build`
   - Publish directory: `.next`
4. Add environment variables

### 3. Mapbox Setup

Get token from [Mapbox Account](https://account.mapbox.com/)

## Deployment

### Automatic Deploy

Connect GitHub to Netlify for automatic deployments on push.

### Manual Deploy

```bash
./scripts/deploy.sh
```

## Stack

- **Frontend**: Next.js 16 (App Router)
- **Auth**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Maps**: Mapbox GL
- **Styling**: TailwindCSS
- **State**: Zustand + React Query
- **Forms**: React Hook Form + Zod
- **Toasts**: Sonner

## Sample Routes

1. Hudson River - 5.2 miles
2. Midtown East - 3.8 miles
3. Central Park - 6.1 miles
