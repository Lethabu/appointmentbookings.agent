export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "Mental Wellness AI",
    version: "1.0.0",
    description: "AI-powered mental wellness platform for South African practitioners",
    url: process.env.NEXTAUTH_URL || "https://localhost:3000",
  },

  languages: {
    supported: (process.env.NEXT_PUBLIC_LANGUAGES || "English").split(", "),
    default: "English",
  },

  ai: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY!,
      model: "gpt-4-turbo-preview",
      whisperUrl: process.env.WHISPER_API_URL || "https://api.openai.com/v1/audio/transcriptions",
    },
  },

  database: {
    supabase: {
      url: process.env.SUPABASE_URL!,
      anonKey: process.env.SUPABASE_ANON_KEY!,
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    },
  },

  integrations: {
    ehr: {
      endpoint: process.env.EHR_API_ENDPOINT!,
    },
    payments: {
      payfast: {
        apiKey: process.env.PAYFAST_API_KEY!,
        merchantId: process.env.PAYFAST_MERCHANT_ID!,
        merchantKey: process.env.PAYFAST_MERCHANT_KEY!,
        sandbox: process.env.VERCEL_ENV !== "production",
      },
    },
    communications: {
      whatsapp: {
        apiUrl: process.env.WHATSAPP_API_URL!,
        token: process.env.WHATSAPP_TOKEN!,
      },
      twilio: {
        apiKey: process.env.TWILIO_API_KEY!,
        accountSid: process.env.TWILIO_ACCOUNT_SID!,
        authToken: process.env.TWILIO_AUTH_TOKEN!,
      },
    },
  },

  analytics: {
    googleAnalytics: process.env.GOOGLE_ANALYTICS_ID,
    posthog: {
      apiKey: process.env.POSTHOG_API_KEY!,
      host: "https://app.posthog.com",
    },
  },

  features: {
    crisisMode: process.env.NEXT_PUBLIC_ENABLE_CRISIS_MODE === "true",
    offlineMode: process.env.NEXT_PUBLIC_ENABLE_OFFLINE_MODE === "true",
    voiceNotes: process.env.NEXT_PUBLIC_ENABLE_VOICE_NOTES === "true",
  },

  mobile: {
    syncEndpoint: process.env.MOBILE_SYNC_ENDPOINT!,
  },
}

// Validation
const requiredEnvVars = ["OPENAI_API_KEY", "SUPABASE_URL", "SUPABASE_ANON_KEY", "EHR_API_ENDPOINT"]

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
}
