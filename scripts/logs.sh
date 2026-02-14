#!/bin/bash

# View logs from both Render and Netlify

echo "📊 Log Viewer"
echo "============="
echo ""
echo "1. View Render (backend) logs"
echo "2. View Netlify (frontend) logs"
echo "3. View both (split screen - requires tmux)"
echo "4. Exit"
echo ""

read -p "Enter choice (1-4): " choice

case $choice in
  1)
    echo "Viewing Render logs (Ctrl+C to exit)..."
    render logs --tail
    ;;
  2)
    echo "Viewing Netlify logs (Ctrl+C to exit)..."
    cd apps/frontend && netlify logs --tail
    ;;
  3)
    if command -v tmux >/dev/null 2>&1; then
      tmux new-session -d -s logs
      tmux split-window -h
      tmux send-keys -t logs:0.0 'render logs --tail' Enter
      tmux send-keys -t logs:0.1 'cd apps/frontend && netlify logs --tail' Enter
      tmux attach-session -t logs
    else
      echo "tmux not installed. Opening logs in separate terminal windows..."
      # Try to open in new terminal windows (macOS/Linux)
      osascript -e 'tell application "Terminal" to do script "render logs --tail"' 2>/dev/null || true
      osascript -e 'tell application "Terminal" to do script "cd apps/frontend && netlify logs --tail"' 2>/dev/null || true
    fi
    ;;
  4)
    exit 0
    ;;
  *)
    echo "Invalid choice"
    ;;
esac
