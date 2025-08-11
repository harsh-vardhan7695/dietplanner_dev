#!/bin/bash

echo "🛑 Stopping DietPlanner App..."
echo "=================================="

# Stop processes on specific ports
echo "🔍 Finding and stopping running servers..."

# Kill processes on port 8000 (backend)
BACKEND_PIDS=$(lsof -ti:8000)
if [ ! -z "$BACKEND_PIDS" ]; then
    echo "📡 Stopping backend server (port 8000)..."
    kill $BACKEND_PIDS
    echo "✅ Backend stopped"
else
    echo "ℹ️  No backend server running on port 8000"
fi

# Kill processes on ports 8080, 8081, 8082 (frontend - multiple ports in case of conflicts)
for port in 8080 8081 8082; do
    FRONTEND_PIDS=$(lsof -ti:$port)
    if [ ! -z "$FRONTEND_PIDS" ]; then
        echo "🎨 Stopping frontend server (port $port)..."
        kill $FRONTEND_PIDS
        echo "✅ Frontend stopped"
        break
    fi
done

# Also kill any remaining npm/node processes related to this project
echo "🧹 Cleaning up any remaining processes..."
pkill -f "dietplanner-main.*node"
pkill -f "dietplanner-main.*npm"

echo "=================================="
echo "✅ All servers stopped!"
echo "==================================" 