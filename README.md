# AppointmentBookings SaaS

A production-ready, multi-tenant appointment booking platform for salons and service businesses.

## Features
- Multi-tenant architecture (salon isolation, RLS)
- Supabase Auth (OAuth, Magic Link, RBAC)
- Stripe, Netcash, Payflex payments
- Real-time calendar sync (Supabase Realtime)
- AI agents: Nia (GPT-4o booking), Orion (Gemini Pro recommendations)
- WhatsApp reminders
- Vercel edge deployment, Docker support
- Redis caching for performance
- Nightly backup scripts
- Modern, responsive UI/UX

## Getting Started
1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables (see `.env.example`):
   - Supabase keys/URL
   - Stripe, Netcash, Payflex credentials
   - Redis URL
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)

## Deployment
- Deploy to Vercel (recommended) or Docker (`Dockerfile` included)
- Configure environment variables in Vercel dashboard or `.env`

## Testing
- Run tests with:
  ```bash
  npx jest --coverage
  ```

## Database
- Schema and RLS: `database/schema.sql`, `database/rls_policies.sql`
- Nightly backup: `scripts/backup.sql`

## Payments
- Configure Stripe, Netcash, Payflex in your environment
- Webhooks handled in `/api/payments/*` and `/api/webhooks/*`

## AI Agents
- Nia (bookings): `/components/AI/NiaChat.jsx`
- Orion (recommendations): `/components/AI/OrionChat.jsx`
- WhatsApp reminders: `/components/AI/WhatsAppReminderSetup.jsx`

## RBAC & Admin
- Owner, staff, and admin roles enforced via Supabase RLS and UI
- Admin dashboard: `/app/admin/page.jsx`

## UI/UX
- Modern, accessible, mobile-friendly
- Customizable via Tailwind CSS

## Contributing
PRs and issues welcome!

---

© 2025 AppointmentBookings.co.za
