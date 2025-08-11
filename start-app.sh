#!/bin/bash

echo "🚀 Starting DietPlanner App..."
echo "=================================="

# Function to check if a port is in use
check_port() {
    lsof -i :$1 > /dev/null 2>&1
    return $?
}

# Start backend server
echo "📡 Starting Backend Server..."
cd /Users/harsh/Downloads/dietplanner-main/backend

# Check if backend is already running
if check_port 8000; then
    echo "⚠️  Backend already running on port 8000"
else
    echo "🔄 Activating virtual environment and starting backend..."
    source venv/bin/activate
    python3 main.py &
    BACKEND_PID=$!
    echo "✅ Backend started (PID: $BACKEND_PID)"
fi

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo "🎨 Starting Frontend Server..."
cd /Users/harsh/Downloads/dietplanner-main

# Check if frontend is already running
if check_port 8080; then
    echo "⚠️  Frontend already running on port 8080"
else
    echo "🔄 Starting frontend development server..."
    npm run dev &
    FRONTEND_PID=$!
    echo "✅ Frontend started (PID: $FRONTEND_PID)"
fi

echo "=================================="
echo "🎉 App is starting up!"
echo "📡 Backend API: http://localhost:8000"
echo "🎨 Frontend: http://localhost:8080 (or next available port)"
echo "🔍 Health Check: http://localhost:8000/api/health"
echo "=================================="
echo "💡 Press Ctrl+C to stop all servers"

# Wait for user interrupt
wait 