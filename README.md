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

Root `.env` file is used for both apps:

- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_MAPBOX_TOKEN` - Mapbox access token (frontend)

## Notes

- Uses pnpm workspaces for dependency management
- Backend: Express + Prisma + PostgreSQL
- Frontend: Next.js 16 + React + TailwindCSS + Mapbox
- Legacy `front-end` folder (React app with CRA) has been removed
