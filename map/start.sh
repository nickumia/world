#!/bin/bash
# Docker container startup script for travel animator
# This script starts Xvfb (virtual display) and then executes the main command

# Start Xvfb in background for headless Chrome
Xvfb :99 -screen 0 1920x1080x24 &
export DISPLAY=:99

# Wait a moment for Xvfb to start
sleep 2

# Execute the command passed to the container
exec "$@"
