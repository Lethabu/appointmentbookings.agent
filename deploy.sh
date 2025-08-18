#!/bin/bash

# AppointmentBookings.co.za Vercel Deployment Script

echo "🚀 Starting deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm i -g vercel
fi

# Set environment variables (you'll need to run these once)
echo "📝 Setting up environment variables..."
echo "Run these commands manually in your terminal:"
echo "vercel env add NEXT_PUBLIC_SUPABASE_URL"
echo "vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "vercel env add TWILIO_ACCOUNT_SID"
echo "vercel env add TWILIO_AUTH_TOKEN"
echo "vercel env add TWILIO_WHATSAPP_FROM"
echo "vercel env add API_KEY"
echo "vercel env add GEMINI_API_KEY"

# Deploy to Vercel
echo "🔨 Building and deploying..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your app should be available at your Vercel domain"