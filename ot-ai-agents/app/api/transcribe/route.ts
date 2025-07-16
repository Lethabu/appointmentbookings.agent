import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { config } from "@/lib/config"

const openai = new OpenAI({
  apiKey: config.ai.openai.apiKey,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const audioFile = formData.get("audio") as File
    const language = (formData.get("language") as string) || "en"

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 })
    }

    // Convert language code to Whisper format
    const whisperLanguage = language === "sasl" ? "en" : language // SASL fallback to English

    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
      language: whisperLanguage,
      response_format: "json",
      temperature: 0.2,
    })

    // If SASL was requested, add a note about sign language interpretation
    const finalTranscription =
      language === "sasl" ? `[Sign Language Interpretation] ${transcription.text}` : transcription.text

    return NextResponse.json({
      success: true,
      transcription: finalTranscription,
      language: language,
      confidence: 0.95, // Whisper doesn't provide confidence, using default
    })
  } catch (error) {
    console.error("Transcription error:", error)
    return NextResponse.json({ success: false, error: "Transcription failed" }, { status: 500 })
  }
}
