-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create enum types
CREATE TYPE practitioner_type AS ENUM (
  'psychologist',
  'counsellor', 
  'coach',
  'therapist',
  'social_worker',
  'holistic',
  'school'
);

CREATE TYPE language_code AS ENUM (
  'en', 'af', 'zu', 'xh', 'st', 'tn', 'nso', 'ss', 'nr', 've', 'ts', 'sasl'
);

CREATE TYPE urgency_level AS ENUM ('low', 'medium', 'high', 'crisis');

CREATE TYPE session_status AS ENUM ('scheduled', 'in_progress', 'completed', 'cancelled', 'no_show');

-- Practitioners table
CREATE TABLE practitioners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  type practitioner_type NOT NULL,
  license_number VARCHAR(100),
  languages language_code[] DEFAULT ARRAY['en'],
  specializations TEXT[],
  bio TEXT,
  avatar_url TEXT,
  phone VARCHAR(20),
  practice_name VARCHAR(255),
  practice_address TEXT,
  hpcsa_number VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Patients table
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  date_of_birth DATE,
  gender VARCHAR(20),
  preferred_language language_code DEFAULT 'en',
  cultural_background TEXT,
  emergency_contact_name VARCHAR(255),
  emergency_contact_phone VARCHAR(20),
  medical_aid_scheme VARCHAR(100),
  medical_aid_number VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Intake sessions table
CREATE TABLE intake_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  practitioner_id UUID REFERENCES practitioners(id) ON DELETE CASCADE,
  language_used language_code DEFAULT 'en',
  urgency_level urgency_level DEFAULT 'low',
  mood_score INTEGER CHECK (mood_score >= 1 AND mood_score <= 10),
  presenting_concerns TEXT,
  cultural_factors TEXT,
  triage_results JSONB,
  responses JSONB,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clinical assessments table
CREATE TABLE clinical_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  practitioner_id UUID REFERENCES practitioners(id) ON DELETE CASCADE,
  assessment_type VARCHAR(50) NOT NULL, -- PHQ-9, GAD-7, DASS-21, etc.
  scores JSONB NOT NULL,
  interpretation TEXT,
  recommendations TEXT[],
  administered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  practitioner_id UUID REFERENCES practitioners(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 50,
  session_type VARCHAR(50) DEFAULT 'individual',
  status session_status DEFAULT 'scheduled',
  notes TEXT,
  soap_notes JSONB,
  transcription TEXT,
  treatment_plan_updates TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crisis interventions table
CREATE TABLE crisis_interventions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  practitioner_id UUID REFERENCES practitioners(id),
  risk_level urgency_level NOT NULL,
  safety_plan JSONB,
  interventions_taken TEXT[],
  emergency_contacts_notified BOOLEAN DEFAULT false,
  follow_up_scheduled TIMESTAMP WITH TIME ZONE,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Billing records table
CREATE TABLE billing_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  practitioner_id UUID REFERENCES practitioners(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  amount_cents INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'ZAR',
  cpt_code VARCHAR(10),
  description TEXT,
  invoice_number VARCHAR(50),
  payment_status VARCHAR(20) DEFAULT 'pending',
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_practitioners_type ON practitioners(type);
CREATE INDEX idx_practitioners_languages ON practitioners USING GIN(languages);
CREATE INDEX idx_patients_language ON patients(preferred_language);
CREATE INDEX idx_intake_sessions_urgency ON intake_sessions(urgency_level);
CREATE INDEX idx_sessions_scheduled_at ON sessions(scheduled_at);
CREATE INDEX idx_sessions_status ON sessions(status);
CREATE INDEX idx_crisis_interventions_risk ON crisis_interventions(risk_level);
CREATE INDEX idx_billing_records_status ON billing_records(payment_status);

-- Row Level Security (RLS)
ALTER TABLE practitioners ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE intake_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinical_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE crisis_interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_records ENABLE ROW LEVEL SECURITY;

-- RLS Policies (basic examples - customize based on your auth system)
CREATE POLICY "Practitioners can view their own data" ON practitioners
  FOR ALL USING (auth.uid()::text = id::text);

CREATE POLICY "Practitioners can view their patients" ON patients
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM sessions 
      WHERE sessions.patient_id = patients.id 
      AND sessions.practitioner_id::text = auth.uid()::text
    )
  );

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_practitioners_updated_at BEFORE UPDATE ON practitioners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_intake_sessions_updated_at BEFORE UPDATE ON intake_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crisis_interventions_updated_at BEFORE UPDATE ON crisis_interventions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_billing_records_updated_at BEFORE UPDATE ON billing_records
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
