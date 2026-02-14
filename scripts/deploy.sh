#!/bin/bash

# Deploy script for Aesthetic Runs
# Frontend-only deployment (Supabase handles backend)

set -e  # Exit on error

echo "🚀 Aesthetic Runs Deployment Script"
echo "===================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo ""
echo "📋 Checking prerequisites..."

if ! command_exists netlify; then
  echo -e "${RED}❌ Netlify CLI not found. Install with:${NC} npm install -g netlify-cli"
  exit 1
fi

echo -e "${GREEN}✅ CLI installed${NC}"

# Check if logged in
echo ""
echo "🔐 Checking authentication..."

if ! netlify whoami >/dev/null 2>&1; then
  echo -e "${YELLOW}⚠️  Not logged into Netlify. Running: netlify login${NC}"
  netlify login
fi

echo -e "${GREEN}✅ Authenticated${NC}"

# Setup environment variables
echo ""
echo "⚙️  Setting up environment variables..."

# Frontend environment variables
if [ -f apps/frontend/.env.local ]; then
  echo "Setting Netlify environment variables from frontend .env.local..."
  cd apps/frontend
  while IFS='=' read -r key value; do
    [[ -z "$key" || "$key" =~ ^# ]] && continue
    value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//')
    # Only set NEXT_PUBLIC_ vars
    if [[ "$key" == NEXT_PUBLIC_* ]]; then
      echo "  Setting $key..."
      netlify env:set "$key" "$value" 2>/dev/null || true
    fi
  done < .env.local
  cd ../..
  echo -e "${GREEN}✅ Frontend env vars set${NC}"
else
  echo -e "${YELLOW}⚠️  No apps/frontend/.env.local file found. Set env vars manually in Netlify dashboard.${NC}"
fi

# Deploy Frontend
echo ""
echo "🚀 Deploying Frontend to Netlify..."
echo "  Building frontend..."
cd apps/frontend
if ! pnpm build; then
  echo -e "${RED}❌ Frontend build failed${NC}"
  exit 1
fi
cd ../..

# Check if Netlify site is linked
if [ ! -f .netlify/state.json ]; then
  echo -e "${YELLOW}⚠️  Netlify site not linked. Run 'netlify link' first or deploy manually.${NC}"
  echo "  Manual deploy: cd apps/frontend && netlify deploy --prod --dir=.next"
  exit 1
fi

if ! netlify deploy --prod --dir=apps/frontend/.next; then
  echo -e "${RED}❌ Frontend deployment failed${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Frontend deployed${NC}"

# Get frontend URL
echo ""
echo "🌐 Your application is deployed at:"
FRONTEND_URL=$(cd apps/frontend && netlify site:info --json 2>/dev/null | grep -o '"url":"[^"]*"' | head -1 | cut -d'"' -f4)
if [ -n "$FRONTEND_URL" ]; then
  echo -e "${GREEN}Frontend: $FRONTEND_URL${NC}"
fi

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "💡 Tips:"
echo "  - View logs: netlify logs --tail"
echo "  - Open site: netlify open"
