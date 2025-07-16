#!/bin/bash

# Mental Health AI Suite Deployment Script
# Usage: ./scripts/deploy.sh [environment]

set -e

ENVIRONMENT=${1:-production}
echo "🚀 Deploying Mental Health AI Suite to $ENVIRONMENT..."

# Check if required tools are installed
command -v vercel >/dev/null 2>&1 || { echo "❌ Vercel CLI is required but not installed. Run: npm i -g vercel" >&2; exit 1; }
command -v supabase >/dev/null 2>&1 || { echo "❌ Supabase CLI is required but not installed. Run: npm i -g supabase" >&2; exit 1; }

# Build and test
echo "🔨 Building application..."
npm run build

echo "🧪 Running type checks..."
npm run type-check

# Database migrations
echo "📊 Running database migrations..."
supabase db push --project-ref $SUPABASE_PROJECT_ID

# Deploy to Vercel
echo "☁️ Deploying to Vercel..."
if [ "$ENVIRONMENT" = "production" ]; then
    vercel --prod --yes
else
    vercel --yes
fi

echo "✅ Deployment completed successfully!"
echo "🌐 Your Mental Health AI Suite is now live!"

# Health check
echo "🏥 Running health check..."
sleep 10
curl -f https://your-domain.vercel.app/api/health || echo "⚠️ Health check failed - please verify manually"

echo "🎉 Deployment complete! Your AI agents are ready to help mental health practitioners."
