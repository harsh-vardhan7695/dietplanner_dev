#!/bin/bash

# Kill any processes on the backend port if they exist
lsof -ti:8000 | xargs kill -9 2>/dev/null

# Start the backend server in the background
cd backend
echo "Starting backend server..."
python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ..

# Wait a moment for the backend to start
sleep 2

# Start the frontend
echo "Starting frontend..."
npm run dev

# When the frontend is stopped, also stop the backend
kill $BACKEND_PID 