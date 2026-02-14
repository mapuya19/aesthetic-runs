# Deployment Scripts

Helper scripts for deploying Aesthetic Runs to Render (backend) and Netlify (frontend).

## Prerequisites

Install the CLIs:

```bash
npm install -g @render/cli netlify-cli
```

Login to both:

```bash
render login
netlify login
```

## Scripts

### 1. deploy.sh

Full deployment to both platforms.

```bash
./scripts/deploy.sh
```

This will:

- ✅ Check CLI installations
- ✅ Verify authentication
- ✅ Set environment variables from .env files
- 🚀 Deploy backend to Render
- 🚀 Deploy frontend to Netlify
- 🔗 Update frontend with backend URL

### 2. env-manager.sh

Interactive environment variable management.

```bash
./scripts/env-manager.sh
```

Options:

- Set Render env vars from `.env`
- Set Netlify env vars from `.env.local`
- View current env vars on both platforms
- Import all at once

### 3. logs.sh

View logs from both platforms.

```bash
./scripts/logs.sh
```

Options:

- View Render logs
- View Netlify logs
- View both (split screen with tmux)

## Manual CLI Commands

If you prefer using the CLIs directly:

### Render (Backend)

```bash
# Deploy
cd apps/backend
render deploy

# Set env var
render env set KEY=value

# View logs
render logs --tail

# List services
render services list
```

### Netlify (Frontend)

```bash
# Deploy
cd apps/frontend
netlify deploy --prod --build

# Set env var
netlify env:set KEY value

# View logs
netlify logs --tail

# Open site
netlify open

# Link to existing site (first time)
netlify link
```

## Environment Variables

### Backend (Render)

Set in root `.env` or via CLI:

```
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret
NODE_ENV=production
PORT=10000
```

### Frontend (Netlify)

Set in `apps/frontend/.env.local` or via CLI:

```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
NEXT_PUBLIC_MAPBOX_TOKEN=your_token
```

## Deployment Configuration Files

- `render.yaml` - Render blueprint configuration
- `netlify.toml` - Netlify build configuration
- `apps/frontend/.env.production.example` - Production env template

## First-Time Deployment

1. **Deploy Backend First:**

   ```bash
   ./scripts/deploy.sh
   # Or manually:
   cd apps/backend && render deploy
   ```

2. **Copy Backend URL** from output

3. **Set Frontend API URL:**

   ```bash
   cd apps/frontend
   netlify env:set NEXT_PUBLIC_API_URL https://your-backend-url.onrender.com
   ```

4. **Deploy Frontend:**
   ```bash
   cd apps/frontend && netlify deploy --prod --build
   ```

## Troubleshooting

**"Not logged in" errors:**

```bash
render login
netlify login
```

**Environment variables not updating:**

```bash
# Set them manually
render env set KEY=value
netlify env:set KEY value
```

**Backend deployment fails:**

- Check that `DATABASE_URL` is set in Render dashboard
- Verify PostgreSQL database is accessible
- Check Render logs: `render logs --tail`

**Frontend build fails:**

- Check that `NEXT_PUBLIC_API_URL` is set
- Verify `NEXT_PUBLIC_MAPBOX_TOKEN` is valid
- Check Netlify logs: `netlify logs --tail`

## Quick Reference

```bash
# Full deploy
./scripts/deploy.sh

# Just env vars
./scripts/env-manager.sh

# Just logs
./scripts/logs.sh

# Manual backend
render deploy

# Manual frontend
netlify deploy --prod --build
```
