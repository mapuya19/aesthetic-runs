# Aesthetic Runs

A modern running route app that helps you discover beautiful paths through parks, waterfronts, and urban gems. Built with Next.js 16, Supabase, and Mapbox GL.

![Aesthetic Runs](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)
![Mapbox](https://img.shields.io/badge/Mapbox-000000?style=flat&logo=mapbox)

## Features

- **Beautiful Routes** - Curated running routes with scenic views and urban gems
- **Interactive Maps** - Mapbox GL integration with smooth navigation
- **Step-by-Step Guide** - Clear turn-by-turn directions with waypoints
- **Progress Tracking** - Track completed routes with celebration animations
- **Modern UI** - Dark mode support with navy/purple/pink color palette
- **Authentication** - Secure email/password auth with Supabase

## Tech Stack

- **Frontend**: Next.js 16 (App Router) + React 19
- **Styling**: TailwindCSS 4
- **Maps**: Mapbox GL JS + react-map-gl
- **Database**: Supabase PostgreSQL
- **Auth**: Supabase Auth
- **State**: Zustand
- **Forms**: React Hook Form + Zod
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm/yarn
- Supabase account
- Mapbox access token

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/aesthetic-runs.git
   cd aesthetic-runs
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

   # Mapbox
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
   ```

4. **Set up Supabase**

   Create a Supabase project at [supabase.com](https://supabase.com):

   - Enable Email Auth in your project settings
   - Run the database migrations (see [Database Setup](#database-setup) below)
   - Get your project URL and anon key from Settings → API

5. **Get a Mapbox token**

   - Sign up at [mapbox.com](https://mapbox.com)
   - Create an access token with public scopes
   - Add it to your `.env.local`

6. **Run the development server**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the app.

## Database Setup

### Option 1: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run each migration file in order from `supabase/migrations/`:
   - `20260214204624_init_schema.sql`
   - `20260214204625_rls_policies.sql`
   - `20260214204626_add_steps_table.sql`
   - `20260214204627_add_image_url.sql`

### Option 2: Using CLI

```bash
# Install Supabase CLI (if not already installed)
# macOS
brew install supabase/tap/supabase

# Link to your project
supabase link --project-ref your-project-ref

# Push migrations
pnpm supabase:push

# Seed sample routes
pnpm seed
```

### Schema Overview

**Tables:**
- `routes` - Running routes with metadata (name, description, distance, coordinates)
- `waypoints` - Navigation waypoints for each route
- `steps` - Step-by-step instructions for route guidance

**Indexes:**
- Routes indexed by slug for fast lookups

## Project Structure

```
aesthetic-runs/
├── app/                    # Next.js app router pages
│   ├── home/              # Dashboard with route cards
│   ├── map/[route]/       # Route navigation page
│   ├── login/             # Authentication pages
│   ├── register/
│   └── globals.css        # Global styles & design tokens
├── components/             # React components
│   ├── ui/               # Reusable UI components (Button, Input, etc.)
│   ├── MapView.tsx       # Mapbox GL map with route visualization
│   ├── RouteStepper.tsx  # Step-by-step navigation guide
│   └── ProtectedRoute.tsx # Auth wrapper
├── lib/                   # Utility functions
│   ├── routes.ts         # Route API calls
│   ├── supabase.ts       # Supabase client
│   └── seed-cli.ts       # Database seeding script
├── store/                 # State management
│   └── authStore.ts      # Auth state (Zustand)
├── types/                 # TypeScript type definitions
├── supabase/             # Database migrations & seeds
└── DESIGN_SYSTEM.md      # Design tokens and component patterns
```

## Available Scripts

```bash
# Development
pnpm dev              # Start development server (http://localhost:3000)
pnpm build            # Build for production
pnpm start            # Start production server

# Code quality
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier

# Database
pnpm seed             # Seed sample routes to database
pnpm supabase:push    # Push database migrations
pnpm supabase:seed    # Reset database with seed data
```

## Design System

This project uses a custom design system with:
- **Colors**: Navy base with indigo, purple, and pink accents
- **Shadows**: Subtle layered approach for premium feel
- **Radius**: 6px-24px scale for different elements
- **Spacing**: 4px base unit
- **Animations**: Smooth transitions with ease-out easing

See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for complete documentation.

## Deployment

### Netlify

This project includes a `netlify.toml` configuration for easy deployment:

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add environment variables in Netlify dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_MAPBOX_TOKEN`
4. Deploy automatically on push

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add environment variables in Vercel dashboard
4. Deploy

### Manual Deployment

```bash
pnpm build
pnpm start
```

## Usage

### For Users

1. **Sign up** - Create an account with email and password
2. **Explore routes** - Browse available running routes on the home page
3. **Run a route** - Click "Run Route" to open the navigation view
4. **Follow directions** - Use the step-by-step guide and map to navigate
5. **Track progress** - Mark waypoints complete and finish your run
6. **Celebrate** - See completion animation when you finish!

### For Developers

- **Adding routes**: Use the seed script or insert directly into database
- **Styling**: Modify design tokens in `app/globals.css`
- **Adding features**: Follow existing patterns in `components/ui/`

## Troubleshooting

**Database connection failed** - Verify Supabase credentials in `.env.local`

**Map not loading** - Verify Mapbox token is valid

**Auth issues** - Confirm Email Auth is enabled in Supabase dashboard

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT