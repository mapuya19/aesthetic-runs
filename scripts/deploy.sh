#!/bin/bash

# Deploy script for Aesthetic Runs
# Handles both Render (backend) and Netlify (frontend) deployments

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

if ! command_exists render; then
  echo -e "${RED}❌ Render CLI not found. Install with:${NC} npm install -g @render/cli"
  exit 1
fi

if ! command_exists netlify; then
  echo -e "${RED}❌ Netlify CLI not found. Install with:${NC} npm install -g netlify-cli"
  exit 1
fi

echo -e "${GREEN}✅ CLIs installed${NC}"

# Check if logged in
echo ""
echo "🔐 Checking authentication..."

if ! render whoami >/dev/null 2>&1; then
  echo -e "${YELLOW}⚠️  Not logged into Render. Running: render login${NC}"
  render login
fi

if ! netlify whoami >/dev/null 2>&1; then
  echo -e "${YELLOW}⚠️  Not logged into Netlify. Running: netlify login${NC}"
  netlify login
fi

echo -e "${GREEN}✅ Authenticated${NC}"

# Setup environment variables
echo ""
echo "⚙️  Setting up environment variables..."

# Backend environment variables
if [ -f .env ]; then
  echo "Setting Render environment variables from root .env..."
  while IFS='=' read -r key value; do
    # Skip empty lines and comments
    [[ -z "$key" || "$key" =~ ^# ]] && continue
    # Remove quotes if present
    value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//')
    echo "  Setting $key..."
    render env set "$key=$value" --service web 2>/dev/null || true
  done < .env
  echo -e "${GREEN}✅ Backend env vars set${NC}"
else
  echo -e "${YELLOW}⚠️  No root .env file found. Set env vars manually in Render dashboard.${NC}"
fi

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

# Deploy Backend
echo ""
echo "🚀 Deploying Backend to Render..."
cd apps/backend
if ! render deploy; then
  echo -e "${RED}❌ Backend deployment failed${NC}"
  exit 1
fi
cd ../..
echo -e "${GREEN}✅ Backend deployed${NC}"

# Get backend URL
BACKEND_URL=$(render services list --format json 2>/dev/null | grep -o '"url":"[^"]*"' | head -1 | cut -d'"' -f4)
if [ -n "$BACKEND_URL" ]; then
  echo -e "${GREEN}Backend URL: $BACKEND_URL${NC}"
  
  # Update frontend env var with backend URL
  echo ""
  echo "🔗 Updating frontend with backend URL..."
  cd apps/frontend
  netlify env:set NEXT_PUBLIC_API_URL "$BACKEND_URL" 2>/dev/null || true
  cd ../..
fi

# Deploy Frontend
echo ""
echo "🚀 Deploying Frontend to Netlify..."
cd apps/frontend
if ! netlify deploy --prod --build; then
  echo -e "${RED}❌ Frontend deployment failed${NC}"
  exit 1
fi
cd ../..
echo -e "${GREEN}✅ Frontend deployed${NC}"

# Get frontend URL
echo ""
echo "🌐 Your applications are deployed at:"
FRONTEND_URL=$(cd apps/frontend && netlify site:info --json 2>/dev/null | grep -o '"url":"[^"]*"' | head -1 | cut -d'"' -f4)
if [ -n "$FRONTEND_URL" ]; then
  echo -e "${GREEN}Frontend: $FRONTEND_URL${NC}"
fi
if [ -n "$BACKEND_URL" ]; then
  echo -e "${GREEN}Backend:  $BACKEND_URL${NC}"
fi

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "💡 Tips:"
echo "  - View logs: render logs --tail"
echo "  - View logs: netlify logs --tail"
echo "  - Open site: netlify open"
