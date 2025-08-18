@echo off
echo 🚀 Deploying AppointmentBookings to Vercel...

REM Check if logged in to Vercel
vercel whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Not logged in to Vercel. Please run: vercel login
    pause
    exit /b 1
)

REM Deploy to production
echo 📦 Building and deploying...
npm run deploy

echo ✅ Deployment complete!
echo 🌐 Check your Vercel dashboard for the live URL
pause