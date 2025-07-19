# Mental Health AI Suite 🧠

A comprehensive AI-powered platform for mental health and wellness practitioners in South Africa, supporting all 12 official languages and culturally adapted care.

## 🚀 Quick Start

### 1. Clone and Setup
\`\`\`bash
git clone https://github.com/LethabuDigital/mental-health-ai-saas-template
cd mental-health-ai-saas-template
npm install
\`\`\`

### 2. Environment Setup
Copy `.env.example` to `.env.local` and fill in your values:

\`\`\`bash
cp .env.example .env.local
\`\`\`

### 3. Database Setup
\`\`\`bash
# Install Supabase CLI
npm install -g supabase

# Initialize Supabase
supabase init

# Start local development
supabase start

# Run migrations
supabase db push
\`\`\`

### 4. Development
\`\`\`bash
npm run dev
\`\`\`

## 🌍 Supported Languages

- **English** - Primary language
- **isiZulu** - Most spoken SA language
- **isiXhosa** - Second most spoken
- **Afrikaans** - Third most spoken
- **Sepedi** - Northern Sotho
- **Sesotho** - Southern Sotho
- **Setswana** - Tswana
- **isiNdebele** - Southern Ndebele
- **Xitsonga** - Tsonga
- **Tshivenda** - Venda
- **isiSwati** - Swazi
- **SASL** - South African Sign Language

## 🏥 Supported Practitioner Types

- **Psychologists** - Clinical assessments, diagnostic tools
- **Counsellors** - Therapeutic support, progress tracking
- **Wellness Coaches** - Goal setting, motivation tracking
- **Therapists** - Treatment planning, session documentation
- **Social Workers** - Family assessments, community support
- **Holistic Healers** - Alternative practices, energy work
- **School Wellness Staff** - Child assessments, educational support

## 🤖 AI Agents

### 1. Smart Intake Agent
- Multi-lingual intake forms
- Cultural adaptation
- Smart triage with urgency detection
- WhatsApp/SMS integration

### 2. Clinical Assessment Agent
- PHQ-9, GAD-7, DASS-21 support
- Custom assessment tools
- Risk assessment with escalation
- Personalized recommendations

### 3. Documentation Agent
- Real-time Whisper transcription
- Auto-SOAP note generation
- EHR integration
- Clinical terminology recognition

### 4. Crisis Intervention Agent
- 24/7 crisis assessment
- Automated safety planning
- Emergency contact notifications
- Crisis hotline integration

### 5. Feedback & Follow-Up Agent
- Post-session check-ins
- Progress tracking
- Relapse prevention alerts
- Voice/video messaging

### 6. Insurance & Billing Agent
- Automatic CPT code assignment
- Claims submission & appeals
- Payment plan management
- Denial prediction

### 7. Smart Scheduling Agent
- Cultural preference matching
- Resource optimization
- Waitlist automation
- No-show prediction

### 8. Treatment Adherence Agent
- Dropout risk prediction
- Engagement monitoring
- Personalized retention strategies
- Homework tracking

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for AI features | ✅ |
| `SUPABASE_URL` | Supabase project URL | ✅ |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ |
| `EHR_API_ENDPOINT` | EHR integration endpoint | ✅ |
| `PAYFAST_API_KEY` | PayFast payment gateway | ❌ |
| `WHATSAPP_API_URL` | WhatsApp Business API | ❌ |
| `TWILIO_API_KEY` | Twilio for SMS/Voice | ❌ |

### Feature Flags

\`\`\`env
NEXT_PUBLIC_ENABLE_CRISIS_MODE=true
NEXT_PUBLIC_ENABLE_OFFLINE_MODE=true
NEXT_PUBLIC_ENABLE_VOICE_NOTES=true
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
\`\`\`

### Environment Variables in Vercel
Add these in your Vercel dashboard:

\`\`\`
NEXT_PUBLIC_APP_NAME=MentalWellnessAI
NEXT_PUBLIC_LANGUAGES=English, isiZulu, isiXhosa, Afrikaans, Sepedi, Sesotho, Setswana, isiNdebele, Xitsonga, Tshivenda, SASL
OPENAI_API_KEY=sk-xxx
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
EHR_API_ENDPOINT=https://ehr-sa-api.lethabudigital.co.za
PAYFAST_API_KEY=your-payfast-key
GOOGLE_ANALYTICS_ID=G-XXXXXX
WHATSAPP_API_URL=https://api.ultramsg.com
TWILIO_API_KEY=twilio-xxxx
POSTHOG_API_KEY=phc_XXX
MOBILE_SYNC_ENDPOINT=https://api.mh-mobile-sync.lethabudigital.co.za
\`\`\`

## 📊 Pricing

- **Starter**: R799/month - Solo practitioners
- **Pro**: R1,799/month - Growing practices
- **Scale**: R3,499/month - Clinics & wellness centers
- **Enterprise**: Custom - Hospitals/NGOs/Schools

## 🔒 Compliance

- ✅ **POPIA** - Protection of Personal Information Act
- ✅ **HPCSA** - Health Professions Council standards
- ✅ **HIPAA** - International healthcare compliance
- ✅ **ISO 27001** - Information security management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📞 Support

- **Email**: support@lethabudigital.co.za
- **WhatsApp**: +27 XX XXX XXXX
- **Documentation**: https://docs.mentalwellnessai.co.za

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Lethabo Digital](https://lethabudigital.co.za) for South African mental health practitioners.
