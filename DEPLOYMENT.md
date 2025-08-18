# Vercel Deployment Guide

## Quick Deploy

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

## Environment Variables Setup

Add these environment variables in Vercel dashboard or via CLI:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add TWILIO_ACCOUNT_SID
vercel env add TWILIO_AUTH_TOKEN
vercel env add TWILIO_WHATSAPP_FROM
vercel env add API_KEY
vercel env add GEMINI_API_KEY
```

## Domain Configuration

For multi-tenant setup:
1. Add your custom domain in Vercel dashboard
2. Configure DNS records for subdomains
3. Update `next.config.js` with your domains

## Build Settings

- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## Troubleshooting

- Ensure all environment variables are set
- Check build logs for missing dependencies
- Verify Supabase connection settings