"use client"

import { useState, useEffect } from "react"
import {
  Mic,
  MicOff,
  FileText,
  Save,
  CheckCircle,
  Download,
  Wifi,
  WifiOff,
  Volume2,
  Eye,
  Edit3,
  Send,
  Brain,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const ClinicalDocumentationAgent = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [currentSession, setCurrentSession] = useState("active")
  const [sessionTime, setSessionTime] = useState(0)
  const [aiProcessingStatus, setAiProcessingStatus] = useState("listening")
  const [liveTranscript, setLiveTranscript] = useState("")
  const [generatedNotes, setGeneratedNotes] = useState({
    soap: "",
    treatmentPlan: "",
    progressNotes: "",
  })
  const [clinicalTerms, setClinicalTerms] = useState([])
  const [sessionData, setSessionData] = useState({
    patientId: "PT-2025-001",
    patientName: "Sarah M.",
    sessionType: "Individual Therapy",
    clinician: "Dr. Jane Smith, LCSW",
    date: new Date().toLocaleDateString(),
    startTime: "2:00 PM",
    duration: "50 minutes",
  })

  const processingStates = {
    listening: { icon: Mic, color: "text-green-500", bg: "bg-green-50", text: "Listening & Analyzing" },
    processing: { icon: Brain, color: "text-blue-500", bg: "bg-blue-50", text: "Processing Clinical Content" },
    generating: { icon: Zap, color: "text-purple-500", bg: "bg-purple-50", text: "Generating Documentation" },
    complete: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", text: "Documentation Ready" },
  }

  const sampleTranscript = `Therapist: "How have you been feeling since our last session?"

Patient: "I've been having more anxiety attacks, especially at work. The breathing exercises helped a bit, but I'm still struggling with the panic when I have to give presentations."

Therapist: "I hear that the coping strategies we discussed are providing some relief. Let's explore what specifically triggers these panic responses during presentations. Can you walk me through what happens in your body when you start to feel anxious?"

Patient: "My heart starts racing, my palms get sweaty, and I feel like I can't breathe. It's like everyone is staring at me and judging everything I say."

Therapist: "Those are classic symptoms of panic disorder. The catastrophic thinking patterns we've identified - especially the fear of judgment - seem to be intensifying your physical symptoms. Let's work on some cognitive restructuring techniques today."`

  // Simulate session timer
  useEffect(() => {
    let interval
    if (isRecording) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  // Simulate AI processing
  useEffect(() => {
    if (isRecording) {
      const states = ["listening", "processing", "generating"]
      let currentIndex = 0

      const interval = setInterval(() => {
        setAiProcessingStatus(states[currentIndex % states.length])
        currentIndex++
      }, 3000)

      // Simulate live transcript updates
      const transcriptInterval = setInterval(() => {
        setLiveTranscript((prev) => {
          const words = sampleTranscript.split(" ")
          const currentLength = prev.split(" ").length
          if (currentLength < words.length) {
            return words.slice(0, currentLength + 5).join(" ") + "..."
          }
          return prev
        })
      }, 1000)

      // Detect clinical terms
      setTimeout(() => {
        setClinicalTerms([
          { term: "Anxiety Attacks", category: "Symptom", confidence: 95 },
          { term: "Panic Disorder", category: "Diagnosis", confidence: 88 },
          { term: "Cognitive Restructuring", category: "Intervention", confidence: 92 },
          { term: "Catastrophic Thinking", category: "Cognitive Pattern", confidence: 90 },
        ])
      }, 5000)

      return () => {
        clearInterval(interval)
        clearInterval(transcriptInterval)
      }
    }
  }, [isRecording])

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      setSessionTime(0)
      setLiveTranscript("")
      setClinicalTerms([])
      setAiProcessingStatus("listening")
    } else {
      setAiProcessingStatus("complete")
      generateClinicalNotes()
    }
  }

  const generateClinicalNotes = () => {
    const soapNote = `SUBJECTIVE:
Client reports increased frequency of anxiety attacks since last session, particularly in work environments involving presentations. States that previously taught breathing exercises provide "some relief" but panic responses persist. Describes physical symptoms including rapid heartbeat, diaphoresis, and dyspnea. Reports catastrophic thinking patterns regarding peer judgment.

OBJECTIVE:
Client appeared alert and oriented x3. Affect congruent with reported anxiety. Speech clear and goal-directed. No evidence of thought disorder. Demonstrates good insight into symptom patterns and triggers. Cooperative with therapeutic interventions.

ASSESSMENT:
Client continues to experience symptoms consistent with Panic Disorder (F41.0). Shows partial response to previously introduced coping strategies. Cognitive distortions related to fear of judgment appear to be primary maintaining factors. Treatment compliance good.

PLAN:
1. Continue cognitive restructuring techniques focusing on catastrophic thinking patterns
2. Introduce exposure therapy protocols for presentation anxiety
3. Review and reinforce breathing/grounding techniques
4. Assign homework: thought record for panic episodes
5. Next session scheduled in one week to monitor progress

Risk Assessment: Low risk for self-harm. No safety concerns identified.`

    const treatmentPlan = `TREATMENT PLAN UPDATE

Primary Diagnosis: Panic Disorder (F41.0)
Session Focus: Cognitive restructuring and exposure preparation

SHORT-TERM GOALS (2-4 weeks):
• Reduce panic attack frequency from daily to 2-3 per week
• Implement cognitive restructuring techniques with 80% accuracy
• Complete thought records for all panic episodes

LONG-TERM GOALS (3-6 months):
• Eliminate avoidance of work presentations
• Maintain panic-free status for 30 consecutive days
• Demonstrate mastery of anxiety management techniques

INTERVENTIONS THIS SESSION:
✓ Cognitive Behavioral Therapy techniques
✓ Psychoeducation on panic disorder
✓ Breathing technique reinforcement
✓ Cognitive restructuring practice

HOMEWORK ASSIGNED:
• Daily thought records using provided worksheet
• Practice 4-7-8 breathing technique twice daily
• Gradual exposure to presentation scenarios (imagination)

NEXT SESSION FOCUS:
Review thought records, introduce systematic desensitization hierarchy for presentations.`

    const progressNotes = `PROGRESS NOTE - Session 8 of 12

RESPONSE TO TREATMENT:
Client demonstrates good engagement and partial symptom improvement. Anxiety management skills showing 60% effectiveness based on self-report. Continued work needed on cognitive restructuring to address core beliefs about judgment and performance.

CLINICAL OBSERVATIONS:
• Improved awareness of trigger patterns
• Demonstrates motivation for exposure work
• Good therapeutic alliance maintained
• No medication side effects reported

BARRIERS TO PROGRESS:
• Perfectionistic tendencies interfering with cognitive work
• Work environment stressors increasing symptom frequency
• Limited practice time for homework assignments

TREATMENT MODIFICATIONS:
Adjusted homework to accommodate client's schedule constraints. Will introduce graded exposure next session to build confidence before full presentation exposure.

SESSION EFFECTIVENESS: 8/10
Client showed clear understanding of concepts and expressed optimism about continued progress.`

    setGeneratedNotes({
      soap: soapNote,
      treatmentPlan: treatmentPlan,
      progressNotes: progressNotes,
    })
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const saveToEHR = () => {
    alert("Documentation saved to EHR system (SimplePractice integration)")
  }

  const currentState = processingStates[aiProcessingStatus]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 text-white p-3 rounded-lg">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl">AI Clinical Documentation Agent</CardTitle>
                  <CardDescription>Real-time Session Documentation & SOAP Note Generation</CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {isOnline ? (
                    <Wifi className="h-5 w-5 text-green-500" />
                  ) : (
                    <WifiOff className="h-5 w-5 text-red-500" />
                  )}
                  <span className="text-sm text-gray-600">EHR Connected</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{formatTime(sessionTime)}</div>
                  <div className="text-sm text-gray-500">Session Duration</div>
                </div>
              </div>
            </div>

            {/* Session Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 rounded-lg p-4 mt-4">
              <div>
                <div className="text-sm font-medium text-gray-600">Patient</div>
                <div className="text-gray-800">{sessionData.patientName}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">Session Type</div>
                <div className="text-gray-800">{sessionData.sessionType}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">Clinician</div>
                <div className="text-gray-800">{sessionData.clinician}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">Date</div>
                <div className="text-gray-800">{sessionData.date}</div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Recording Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recording Controls */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Session Recording</CardTitle>
                  <Button
                    onClick={toggleRecording}
                    className={`${
                      isRecording ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"
                    } transform hover:scale-105 transition-all`}
                  >
                    {isRecording ? <MicOff className="h-5 w-5 mr-2" /> : <Mic className="h-5 w-5 mr-2" />}
                    {isRecording ? "End Session" : "Start Recording"}
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                {/* AI Processing Status */}
                {isRecording && (
                  <Card className={`${currentState.bg} border-gray-200 mb-6`}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <currentState.icon className={`h-5 w-5 ${currentState.color} animate-pulse`} />
                        <div>
                          <div className="font-medium text-gray-800">{currentState.text}</div>
                          <div className="text-sm text-gray-600">
                            AI is actively analyzing speech patterns and clinical terminology
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Live Transcript */}
                <Card className="bg-gray-50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Live Transcript</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Volume2 className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Real-time transcription</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white rounded border p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
                      {liveTranscript ? (
                        <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {liveTranscript}
                          {isRecording && <span className="animate-pulse">|</span>}
                        </div>
                      ) : (
                        <div className="text-gray-400 italic">
                          {isRecording
                            ? "Listening for speech..."
                            : 'Click "Start Recording" to begin session documentation'}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Generated Documentation */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Generated Documentation</CardTitle>
                  <div className="flex space-x-2">
                    <Button onClick={saveToEHR} className="bg-green-600 hover:bg-green-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save to EHR
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* SOAP Notes */}
                <Card>
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="text-lg">SOAP Note</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {generatedNotes.soap ? (
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">{generatedNotes.soap}</pre>
                    ) : (
                      <div className="text-gray-400 italic">SOAP note will be generated after session completion</div>
                    )}
                  </CardContent>
                </Card>

                {/* Treatment Plan Update */}
                <Card>
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="text-lg">Treatment Plan Update</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {generatedNotes.treatmentPlan ? (
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                        {generatedNotes.treatmentPlan}
                      </pre>
                    ) : (
                      <div className="text-gray-400 italic">Treatment plan updates will be generated automatically</div>
                    )}
                  </CardContent>
                </Card>

                {/* Progress Notes */}
                <Card>
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="text-lg">Progress Notes</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {generatedNotes.progressNotes ? (
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                        {generatedNotes.progressNotes}
                      </pre>
                    ) : (
                      <div className="text-gray-400 italic">
                        Progress notes will include session effectiveness metrics
                      </div>
                    )}
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Clinical Terms Detection */}
            <Card>
              <CardHeader>
                <CardTitle>Clinical Terms Detected</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {clinicalTerms.length > 0 ? (
                  clinicalTerms.map((term, index) => (
                    <Card key={index} className="bg-blue-50 border-blue-200">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-blue-800">{term.term}</span>
                          <Badge className="bg-blue-100 text-blue-700">{term.confidence}%</Badge>
                        </div>
                        <div className="text-sm text-blue-600">{term.category}</div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-gray-400 italic text-sm">
                    Clinical terms will be automatically identified during the session
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Session Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Session Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card className="bg-gradient-to-r from-green-50 to-green-100">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">87%</div>
                    <div className="text-sm text-green-700">Documentation Accuracy</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">12min</div>
                    <div className="text-sm text-blue-700">Time Saved</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">4</div>
                    <div className="text-sm text-purple-700">Interventions Identified</div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Integration Status */}
            <Card>
              <CardHeader>
                <CardTitle>Integration Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">SimplePractice Connected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">HIPAA Compliant Recording</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Auto-backup Enabled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Clinical Standards Met</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  Review Previous Session
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Documentation
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Send className="h-4 w-4 mr-2" />
                  Send to Supervisor
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClinicalDocumentationAgent
