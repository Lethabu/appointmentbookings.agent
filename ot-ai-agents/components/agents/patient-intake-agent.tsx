"use client"

import { useState, useEffect } from "react"
import {
  MessageCircle,
  User,
  ClipboardList,
  CreditCard,
  CheckCircle,
  AlertTriangle,
  Brain,
  Clock,
  FileText,
  Send,
  Mic,
  Type,
  ArrowRight,
  ArrowLeft,
  Home,
  Download,
  Eye,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

const PatientIntakeAgent = () => {
  const [currentStep, setCurrentStep] = useState("welcome")
  const [communicationMode, setCommunicationMode] = useState("text")
  const [responses, setResponses] = useState({})
  const [assessmentScores, setAssessmentScores] = useState({})
  const [riskLevel, setRiskLevel] = useState("low")
  const [insuranceStatus, setInsuranceStatus] = useState("verifying")
  const [treatmentRecommendations, setTreatmentRecommendations] = useState([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentAssessment, setCurrentAssessment] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const steps = [
    { id: "welcome", title: "Welcome", icon: Home, description: "Introduction & Consent" },
    { id: "demographics", title: "Demographics", icon: User, description: "Basic Information" },
    { id: "presenting-concerns", title: "Concerns", icon: MessageCircle, description: "Chief Complaints" },
    { id: "history", title: "History", icon: Clock, description: "Medical & Mental Health" },
    { id: "assessments", title: "Assessments", icon: ClipboardList, description: "Standardized Tools" },
    { id: "insurance", title: "Insurance", icon: CreditCard, description: "Benefits Verification" },
    { id: "summary", title: "Summary", icon: FileText, description: "Review & Recommendations" },
  ]

  const getCurrentStepIndex = () => steps.findIndex((step) => step.id === currentStep)

  // PHQ-9 Questions
  const phq9Questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself or that you are a failure",
    "Trouble concentrating on things",
    "Moving or speaking slowly or being fidgety",
    "Thoughts that you would be better off dead",
  ]

  // GAD-7 Questions
  const gad7Questions = [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it is hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid, as if something awful might happen",
  ]

  const welcomeMessages = [
    {
      sender: "ai",
      text: "Hello! I'm your AI intake assistant. I'm here to help gather some important information before your first therapy session. This process typically takes 15-20 minutes and will help us provide you with the best possible care.",
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      sender: "ai",
      text: "Everything you share with me is confidential and secure. You can communicate with me through text or voice - whatever feels most comfortable for you. Would you like to get started?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]

  useEffect(() => {
    if (currentStep === "welcome") {
      setChatHistory(welcomeMessages)
    }
  }, [currentStep])

  // Simulate AI typing effect
  const simulateAIResponse = (message, delay = 2000) => {
    setIsTyping(true)
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "ai",
          text: message,
          timestamp: new Date().toLocaleTimeString(),
        },
      ])
      setIsTyping(false)
    }, delay)
  }

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return

    setChatHistory((prev) => [
      ...prev,
      {
        sender: "user",
        text: currentMessage,
        timestamp: new Date().toLocaleTimeString(),
      },
    ])

    processUserResponse(currentMessage)
    setCurrentMessage("")
  }

  const processUserResponse = (message) => {
    setResponses((prev) => ({
      ...prev,
      [currentStep]: message,
    }))

    let aiResponse = ""
    switch (currentStep) {
      case "welcome":
        aiResponse =
          "Perfect! Let's start with some basic information. Could you please tell me your full name, age, and preferred contact method?"
        break
      case "demographics":
        aiResponse =
          "Thank you for sharing that information. Now I'd like to understand what brought you to seek therapy today. Can you tell me about your main concerns or what you'd like to work on?"
        break
      case "presenting-concerns":
        aiResponse =
          "I appreciate you sharing that with me. It takes courage to reach out for help. Let's talk about your background a bit. Have you received mental health treatment before?"
        break
      case "history":
        aiResponse =
          "That's helpful context. Now I'd like to ask you some standardized questions that help us understand your current symptoms better. These are tools we use with all clients to get a clear picture of how you're doing."
        break
      default:
        aiResponse = "Thank you for that information. Let's continue with the next section."
    }

    simulateAIResponse(aiResponse)
  }

  const calculatePHQ9Score = () => {
    const scores = Object.values(assessmentScores.phq9 || {}).map(Number)
    return scores.reduce((sum, score) => sum + score, 0)
  }

  const calculateGAD7Score = () => {
    const scores = Object.values(assessmentScores.gad7 || {}).map(Number)
    return scores.reduce((sum, score) => sum + score, 0)
  }

  const getRiskAssessment = () => {
    const phq9 = calculatePHQ9Score()
    const gad7 = calculateGAD7Score()

    if (phq9 >= 15 || gad7 >= 15) return "high"
    if (phq9 >= 10 || gad7 >= 10) return "moderate"
    return "low"
  }

  const generateTreatmentRecommendations = () => {
    const phq9 = calculatePHQ9Score()
    const gad7 = calculateGAD7Score()
    const risk = getRiskAssessment()

    const recommendations = []

    if (phq9 >= 10) {
      recommendations.push({
        type: "Depression Treatment",
        priority: "high",
        suggestion: "Cognitive Behavioral Therapy (CBT) or Interpersonal Therapy (IPT)",
        frequency: "Weekly sessions recommended",
      })
    }

    if (gad7 >= 10) {
      recommendations.push({
        type: "Anxiety Treatment",
        priority: "high",
        suggestion: "CBT with exposure therapy components",
        frequency: "Weekly sessions recommended",
      })
    }

    if (risk === "high") {
      recommendations.push({
        type: "Crisis Intervention",
        priority: "urgent",
        suggestion: "Immediate safety planning and crisis intervention",
        frequency: "Immediate assessment required",
      })
    }

    return recommendations
  }

  const handleAssessmentResponse = (questionIndex, score) => {
    const assessmentType = currentAssessment
    setAssessmentScores((prev) => ({
      ...prev,
      [assessmentType]: {
        ...prev[assessmentType],
        [questionIndex]: score,
      },
    }))
  }

  const nextStep = () => {
    const currentIndex = getCurrentStepIndex()
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id)
    }
  }

  const prevStep = () => {
    const currentIndex = getCurrentStepIndex()
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id)
    }
  }

  const startAssessment = (type) => {
    setCurrentAssessment(type)
    setCurrentQuestionIndex(0)
  }

  const nextQuestion = () => {
    const questions = currentAssessment === "phq9" ? phq9Questions : gad7Questions
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setCurrentAssessment(null)
      setCurrentQuestionIndex(0)
    }
  }

  const renderProgressBar = () => (
    <Progress value={((getCurrentStepIndex() + 1) / steps.length) * 100} className="mb-6" />
  )

  const renderStepIndicator = () => (
    <div className="flex justify-between items-center mb-8 px-4">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep
        const isCompleted = index < getCurrentStepIndex()
        const Icon = step.icon

        return (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : isCompleted
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-400"
              }`}
            >
              {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
            </div>
            <span className={`text-xs text-center ${isActive ? "text-blue-600 font-medium" : "text-gray-500"}`}>
              {step.title}
            </span>
          </div>
        )
      })}
    </div>
  )

  const renderChatInterface = () => (
    <Card className="h-96">
      <CardHeader className="bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg">AI Intake Assistant</CardTitle>
            <CardDescription>Here to help with your intake</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4 overflow-y-auto space-y-4 h-64">
        {chatHistory.map((message, index) => (
          <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your response..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!currentMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex justify-center mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCommunicationMode(communicationMode === "text" ? "voice" : "text")}
          >
            {communicationMode === "text" ? <Mic className="w-4 h-4" /> : <Type className="w-4 h-4" />}
            <span className="ml-2">Switch to {communicationMode === "text" ? "Voice" : "Text"}</span>
          </Button>
        </div>
      </div>
    </Card>
  )

  const renderAssessmentInterface = () => {
    if (!currentAssessment) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Standardized Assessments</CardTitle>
            <CardDescription>
              We'll now conduct some brief standardized assessments to better understand your current symptoms.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">PHQ-9 (Depression Screening)</h4>
                <p className="text-sm text-gray-600 mb-3">
                  9 questions about depressive symptoms over the past 2 weeks
                </p>
                <Button onClick={() => startAssessment("phq9")}>Start PHQ-9</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">GAD-7 (Anxiety Screening)</h4>
                <p className="text-sm text-gray-600 mb-3">7 questions about anxiety symptoms over the past 2 weeks</p>
                <Button onClick={() => startAssessment("gad7")}>Start GAD-7</Button>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )
    }

    const questions = currentAssessment === "phq9" ? phq9Questions : gad7Questions
    const currentQuestion = questions[currentQuestionIndex]

    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {currentAssessment === "phq9" ? "PHQ-9 Depression Assessment" : "GAD-7 Anxiety Assessment"}
          </CardTitle>
          <CardDescription>
            Question {currentQuestionIndex + 1} of {questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-lg mb-4">
              Over the last 2 weeks, how often have you been bothered by: <strong>{currentQuestion}</strong>
            </p>

            <div className="space-y-2">
              {["Not at all", "Several days", "More than half the days", "Nearly every day"].map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => {
                    handleAssessmentResponse(currentQuestionIndex, index)
                    nextQuestion()
                  }}
                >
                  <span className="font-medium">{index}: </span>
                  {option}
                </Button>
              ))}
            </div>
          </div>

          <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} />
        </CardContent>
      </Card>
    )
  }

  const renderInsuranceVerification = () => (
    <Card>
      <CardHeader>
        <CardTitle>Insurance Verification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Benefits Verification</h4>
              <Badge
                className={
                  insuranceStatus === "verified"
                    ? "bg-green-100 text-green-800"
                    : insuranceStatus === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                }
              >
                {insuranceStatus}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">We're verifying your insurance benefits in real-time</p>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Deductible:</span>
                <span className="font-medium">$500 / $1,200</span>
              </div>
              <div className="flex justify-between">
                <span>Copay:</span>
                <span className="font-medium">$25</span>
              </div>
              <div className="flex justify-between">
                <span>Sessions Covered:</span>
                <span className="font-medium">12 remaining</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button onClick={() => setInsuranceStatus("verified")} className="w-full">
          Verify Insurance
        </Button>
      </CardContent>
    </Card>
  )

  const renderSummary = () => {
    const phq9Score = calculatePHQ9Score()
    const gad7Score = calculateGAD7Score()
    const risk = getRiskAssessment()
    const recommendations = generateTreatmentRecommendations()

    return (
      <Card>
        <CardHeader>
          <CardTitle>Assessment Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Assessment Scores</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>PHQ-9 (Depression):</span>
                    <span className={`font-medium ${phq9Score >= 10 ? "text-red-600" : "text-green-600"}`}>
                      {phq9Score}/27
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>GAD-7 (Anxiety):</span>
                    <span className={`font-medium ${gad7Score >= 10 ? "text-red-600" : "text-green-600"}`}>
                      {gad7Score}/21
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Risk Assessment</h4>
                <div className="flex items-center space-x-2">
                  {risk === "high" && <AlertTriangle className="w-5 h-5 text-red-500" />}
                  {risk === "moderate" && <AlertCircle className="w-5 h-5 text-yellow-500" />}
                  {risk === "low" && <CheckCircle className="w-5 h-5 text-green-500" />}
                  <span
                    className={`font-medium capitalize ${
                      risk === "high" ? "text-red-600" : risk === "moderate" ? "text-yellow-600" : "text-green-600"
                    }`}
                  >
                    {risk} Risk
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h4 className="font-medium mb-3">Treatment Recommendations</h4>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <Card key={index}>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{rec.type}</span>
                      <Badge
                        className={
                          rec.priority === "urgent"
                            ? "bg-red-100 text-red-800"
                            : rec.priority === "high"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-blue-100 text-blue-800"
                        }
                      >
                        {rec.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{rec.suggestion}</p>
                    <p className="text-xs text-gray-500 mt-1">{rec.frequency}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <Button className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Eye className="w-4 h-4 mr-2" />
              Preview for Clinician
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "welcome":
      case "demographics":
      case "presenting-concerns":
      case "history":
        return renderChatInterface()
      case "assessments":
        return renderAssessmentInterface()
      case "insurance":
        return renderInsuranceVerification()
      case "summary":
        return renderSummary()
      default:
        return renderChatInterface()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Intake Assessment</h1>
          <p className="text-gray-600">AI-powered comprehensive intake and assessment system</p>
        </div>

        {renderProgressBar()}
        {renderStepIndicator()}

        <div className="mb-6">{renderCurrentStep()}</div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={getCurrentStepIndex() === 0}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button onClick={nextStep} disabled={getCurrentStepIndex() === steps.length - 1}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PatientIntakeAgent
