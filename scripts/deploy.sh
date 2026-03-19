#!/bin/bash
# Idempotent Continuous Deployment Script
# Safely deploy the latest GitHub code, build it, and restart application instances gracefully.

PROJECT_DIR="$HOME/zenvy"

if [ ! -d "$PROJECT_DIR" ]; then
  echo "❌ Project directory $PROJECT_DIR does not exist. Please clone the repository first."
  exit 1
fi

cd "$PROJECT_DIR" || exit

echo "🔄 Pulling latest changes from main branch..."
git pull origin main

echo "----------------------------------------"
echo "🚀 Deploying Backend Subservice"
echo "----------------------------------------"
cd server || exit
npm ci
npx prisma generate

# Idempotently check PM2 status to either spin up brand new instance or gently restart an existing one
if pm2 status zenvy-server | grep -q 'online'; then
  echo "zenvy-server is running. Restarting..."
  pm2 restart zenvy-server
else
  echo "zenvy-server is not active in PM2. Starting up..."
  pm2 start server.js --name zenvy-server
fi

echo "----------------------------------------"
echo "🚀 Deploying Frontend Subservice"
echo "----------------------------------------"
cd ../client || exit
npm ci
npm run build

# Idempotently check Next.js PM2 status
if pm2 status zenvy-client | grep -q 'online'; then
  echo "zenvy-client is running. Restarting..."
  pm2 restart zenvy-client
else
  echo "zenvy-client is not active in PM2. Starting up..."
  pm2 start npm --name zenvy-client -- start
fi

echo "✅ All subservices successfully deployed!"
