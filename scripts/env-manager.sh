#!/bin/bash

# Quick environment variable management script

set -e

echo "🔧 Environment Variable Manager"
echo "==============================="
echo ""

# Function to check CLI
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

show_menu() {
  echo "What would you like to do?"
  echo ""
  echo "1. Set Render (backend) environment variables from .env"
  echo "2. Set Netlify (frontend) environment variables from .env.local"
  echo "3. View Render environment variables"
  echo "4. View Netlify environment variables"
  echo "5. Import all environment variables"
  echo "6. Exit"
  echo ""
}

set_render_env() {
  if [ ! -f .env ]; then
    echo "❌ No .env file found in root directory"
    return 1
  fi
  
  echo "Setting Render environment variables..."
  while IFS='=' read -r key value; do
    [[ -z "$key" || "$key" =~ ^# ]] && continue
    value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//')
    echo "  Setting $key..."
    render env set "$key=$value" 2>/dev/null || echo "    ⚠️  Failed to set $key"
  done < .env
  echo "✅ Done!"
}

set_netlify_env() {
  if [ ! -f apps/frontend/.env.local ]; then
    echo "❌ No apps/frontend/.env.local file found"
    return 1
  fi
  
  echo "Setting Netlify environment variables..."
  cd apps/frontend
  while IFS='=' read -r key value; do
    [[ -z "$key" || "$key" =~ ^# ]] && continue
    value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//')
    echo "  Setting $key..."
    netlify env:set "$key" "$value" 2>/dev/null || echo "    ⚠️  Failed to set $key"
  done < .env.local
  cd ../..
  echo "✅ Done!"
}

view_render_env() {
  echo "Render environment variables:"
  echo "-----------------------------"
  render env list 2>/dev/null || echo "❌ Failed to fetch. Are you logged in?"
}

view_netlify_env() {
  echo "Netlify environment variables:"
  echo "------------------------------"
  cd apps/frontend
  netlify env:list 2>/dev/null || echo "❌ Failed to fetch. Are you logged in?"
  cd ../..
}

import_all() {
  set_render_env
  echo ""
  set_netlify_env
}

# Check CLIs
if ! command_exists render; then
  echo "❌ Render CLI not found. Install: npm install -g @render/cli"
  exit 1
fi

if ! command_exists netlify; then
  echo "❌ Netlify CLI not found. Install: npm install -g netlify-cli"
  exit 1
fi

# Main loop
while true; do
  show_menu
  read -p "Enter choice (1-6): " choice
  
  case $choice in
    1) set_render_env ;;
    2) set_netlify_env ;;
    3) view_render_env ;;
    4) view_netlify_env ;;
    5) import_all ;;
    6) echo "Goodbye!"; exit 0 ;;
    *) echo "Invalid choice" ;;
  esac
  
  echo ""
  read -p "Press Enter to continue..."
  echo ""
done
