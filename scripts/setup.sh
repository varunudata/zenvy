#!/bin/bash
# Idempotent Environment Setup Script
# This script ensures that executing it multiple times leaves the system in the same correct state without crashing.

echo "--- Creating required directories ---"
# Uses -p to safely create directories only if they do not exist
mkdir -p logs
mkdir -p tmp/cache

echo "--- Setting up Server environment variables ---"
if [ ! -f server/.env ]; then
  if [ -f server/.env.example ]; then
    echo "Creating server .env from example..."
    cp server/.env.example server/.env
  else
    echo "Creating empty server .env file... Please fill it out."
    touch server/.env
  fi
else
  echo "server/.env already exists. Skipping copy to preserve existing secrets."
fi

echo "--- Setting up Client environment variables ---"
if [ ! -f client/.env ]; then
  if [ -f client/.env.example ]; then
    echo "Creating client .env from example..."
    cp client/.env.example client/.env
  else
    echo "Creating empty client .env file... Please fill it out."
    touch client/.env
  fi
else
  echo "client/.env already exists. Skipping copy to preserve existing secrets."
fi

echo "Setup perfectly complete!"
