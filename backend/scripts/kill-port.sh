#!/bin/bash

# Script to kill process on port 5000
PORT=5000

echo "🔍 Checking for processes on port $PORT..."

PIDS=$(lsof -ti:$PORT)

if [ -z "$PIDS" ]; then
  echo "✅ Port $PORT is free"
else
  echo "⚠️  Found processes on port $PORT: $PIDS"
  echo "🛑 Killing processes..."
  kill -9 $PIDS
  sleep 1
  echo "✅ Port $PORT has been freed"
fi

