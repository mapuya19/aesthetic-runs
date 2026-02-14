# Monorepo for Aesthetic Runs

## Structure

- `apps/backend` - Express API server with Prisma
- `apps/frontend` - Next.js 16 frontend

## Development

```bash
pnpm install          # Install all dependencies
pnpm dev              # Start both backend and frontend
pnpm dev:backend      # Start only backend (port 8000)
pnpm dev:frontend     # Start only frontend (port 3000)
```

## Environment Variables

### Development (root .env)

```
DATABASE_URL=postgresql://...
JWT_SECRET=your_jwt_secret
PORT=8000
NODE_ENV=development
```

### Frontend (apps/frontend/.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

## Production Deployment

### Backend (Render)

1. Connect your GitHub repo to Render
2. Select "Blueprint" and use `render.yaml`
3. Set environment variables in Render dashboard:
   - `DATABASE_URL`: Your Supabase PostgreSQL URL
   - `JWT_SECRET`: Generate a secure random string
   - `NODE_ENV`: production
4. Deploy

### Frontend (Netlify)

1. Connect your GitHub repo to Netlify
2. Build settings (automatic from netlify.toml):
   - Base directory: `apps/frontend`
   - Build command: `pnpm build`
   - Publish directory: `.next`
3. Set environment variables in Netlify:
   - `NEXT_PUBLIC_API_URL`: Your Render backend URL
   - `NEXT_PUBLIC_MAPBOX_TOKEN`: Your Mapbox token
4. Deploy

### Manual Build

```bash
# Build for production
pnpm build

# Frontend only
cd apps/frontend && pnpm build
```

## Notes

- Uses pnpm workspaces for dependency management
- Backend: Express + Prisma + PostgreSQL
- Frontend: Next.js 16 + React + TailwindCSS + Mapbox
- Legacy `front-end` folder has been removed
- Monorepo structure prevents dependency conflicts

## Deployment Files

- `render.yaml` - Render deployment configuration
- `netlify.toml` - Netlify deployment configuration
