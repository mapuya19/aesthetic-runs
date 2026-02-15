# Aesthetic Runs

A modern running route app built with Next.js 16, Supabase, and Mapbox GL.

## Structure

```
aesthetic-runs/
├── app/                  # Next.js 16 app router
├── components/           # React components
├── lib/                  # Utilities (Supabase client, auth, routes)
├── public/               # Static assets
├── scripts/              # Deployment scripts
├── package.json          # Root package.json
├── tsconfig.json         # TypeScript config
└── next.config.ts         # Next.js config
```

## Development

```bash
pnpm install              # Install all dependencies
pnpm dev                # Start development server (http://localhost:3000)
pnpm build              # Build for production
pnpm seed              # Seed Supabase database with sample routes
pnpm supabase:push     # Push database migrations to remote
pnpm supabase:seed     # Reset and seed remote database
```

## Environment Variables

### Development (.env.local)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

### Production (Set in Netlify dashboard)

Set these environment variables in Netlify → Environment Variables:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon/public key
- `NEXT_PUBLIC_MAPBOX_TOKEN` - Your Mapbox public token

## Deployment

### Quick Deploy

```bash
pnpm build
```

Then connect GitHub repo to Netlify for automatic deployments.

### Manual Deploy with CLI

```bash
# Build and deploy
./scripts/deploy.sh
```

### Seed Database

Visit `/seed` in production to seed sample routes to Supabase (authentication required).

## Setup Instructions

### 1. Supabase Setup

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project or use existing one
3. Copy your project URL and anon key
4. Database schema is managed via Supabase CLI:
   - `supabase/` directory contains migrations and schemas
   - Run `pnpm supabase:push` to deploy schema changes
   - Run `pnpm supabase:seed` to reset and seed with sample routes
5. Visit `/seed` to populate routes (dev only, requires authentication in production)

### 2. Netlify Setup

1. Create a new site on [Netlify](https://app.netlify.com)
2. Connect GitHub repository
3. Build settings:
   - Base directory: `/` (root)
   - Build command: `pnpm build`
   - Publish directory: `.next`
4. Add environment variables listed above

### 3. Mapbox Setup

Get your Mapbox public access token from [Mapbox Account](https://account.mapbox.com/).

## Stack

- **Frontend**: Next.js 16 (App Router)
- **Auth**: Supabase Auth (signUp, signIn, signOut)
- **Database**: Supabase PostgreSQL
- **Maps**: Mapbox GL
- **Styling**: TailwindCSS
- **State**: Zustand
- **Forms**: React Hook Form + Zod
- **Toasts**: Sonner

## Routes

The app includes 3 sample routes:

1. **Hudson River** (hudson-river) - 5.2 miles
2. **Midtown East** (midtown-east) - 3.8 miles
3. **Central Park** (central-park) - 6.1 miles

Each route includes waypoints and step-by-step instructions.

## Notes

- Removed Express backend in favor of Supabase
- Flattened monorepo structure for simplicity
- Uses Supabase for authentication and database
- Frontend deployed to Netlify
