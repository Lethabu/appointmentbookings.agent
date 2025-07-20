import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { config } from "../../../lib/config";

const supabase = createClient(config.database.supabase.url, config.database.supabase.serviceRoleKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      patientData,
      responses,
      triageResults,
      urgencyLevel,
      moodScore,
      culturalFactors,
      language,
      practitionerType,
    } = body

    // Create or update patient record
    const { data: patient, error: patientError } = await supabase
      .from("patients")
      .upsert({
        name: patientData.name,
        email: patientData.email,
        phone: patientData.phone,
        preferred_language: language,
        cultural_background: culturalFactors,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (patientError) {
      throw new Error(`Patient creation failed: ${patientError.message}`)
    }

    // Create intake session record
    const { data: intakeSession, error: intakeError } = await supabase
      .from("intake_sessions")
      .insert({
        patient_id: patient.id,
        language_used: language,
        urgency_level: urgencyLevel,
        mood_score: moodScore,
        presenting_concerns: responses.presenting_concerns,
        cultural_factors: culturalFactors,
        triage_results: triageResults,
        responses: responses,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (intakeError) {
      throw new Error(`Intake session creation failed: ${intakeError.message}`)
    }

    // If high urgency, create crisis intervention record
    if (urgencyLevel === "high" || urgencyLevel === "crisis") {
      const { error: crisisError } = await supabase.from("crisis_interventions").insert({
        patient_id: patient.id,
        risk_level: urgencyLevel,
        safety_plan: { immediate_actions: ["Crisis counselor notified", "Safety assessment initiated"] },
        interventions_taken: ["Immediate triage", "Crisis protocol activated"],
      })

      if (crisisError) {
        console.error("Crisis intervention creation failed:", crisisError)
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        patient,
        intakeSession,
        nextSteps: {
          urgencyLevel,
          recommendedAction: urgencyLevel === "high" ? "immediate_scheduling" : "standard_scheduling",
          estimatedWaitTime: urgencyLevel === "high" ? "24 hours" : "1-2 weeks",
        },
      },
    })
  } catch (error) {
    console.error("Intake API error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
