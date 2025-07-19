"use client"

import { useState, useEffect } from "react"
import {
  MessageCircle,
  User,
  Globe,
  Phone,
  Mail,
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
  Shield,
  Heart,
  Star,
  Activity,
  Zap,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const SmartIntakeAgent = () => {
  const [currentStep, setCurrentStep] = useState("welcome")
  const [communicationMode, setCommunicationMode] = useState("text")
  const [selectedLanguage, setSelectedLanguage] = useState("english")
  const [practitionerType, setPractitionerType] = useState("psychologist")
  const [responses, setResponses] = useState({})
  const [triageResults, setTriageResults] = useState({})
  const [currentMessage, setCurrentMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [urgencyLevel, setUrgencyLevel] = useState("low")
  const [moodScore, setMoodScore] = useState(5)
  const [culturalFactors, setCulturalFactors] = useState([])

  const languages = {
    english: { name: "English", code: "en", flag: "🇿🇦" },
    afrikaans: { name: "Afrikaans", code: "af", flag: "🇿🇦" },
    isizulu: { name: "isiZulu", code: "zu", flag: "🇿🇦" },
    isixhosa: { name: "isiXhosa", code: "xh", flag: "🇿🇦" },
    sesotho: { name: "Sesotho", code: "st", flag: "🇿🇦" },
    setswana: { name: "Setswana", code: "tn", flag: "🇿🇦" },
    sepedi: { name: "Sepedi", code: "nso", flag: "🇿🇦" },
    isiswati: { name: "isiSwati", code: "ss", flag: "🇿🇦" },
    isindebele: { name: "isiNdebele", code: "nr", flag: "🇿🇦" },
    tshivenda: { name: "Tshivenda", code: "ve", flag: "🇿🇦" },
    xitsonga: { name: "Xitsonga", code: "ts", flag: "🇿🇦" },
    sasl: { name: "SA Sign Language", code: "sasl", flag: "🤟" },
  }

  const practitionerTypes = [
    { id: "psychologist", name: "Psychologist", icon: Brain, color: "bg-blue-500" },
    { id: "counsellor", name: "Counsellor", icon: Heart, color: "bg-pink-500" },
    { id: "coach", name: "Wellness Coach", icon: Star, color: "bg-yellow-500" },
    { id: "therapist", name: "Therapist", icon: Users, color: "bg-green-500" },
    { id: "social_worker", name: "Social Worker", icon: Shield, color: "bg-purple-500" },
    { id: "holistic", name: "Holistic Healer", icon: Zap, color: "bg-orange-500" },
    { id: "school", name: "School Wellness", icon: Activity, color: "bg-indigo-500" },
  ]

  const steps = [
    { id: "welcome", title: "Welcome", icon: Home, description: "Introduction & Language Selection" },
    { id: "demographics", title: "Demographics", icon: User, description: "Basic Information" },
    { id: "presenting-concerns", title: "Concerns", icon: MessageCircle, description: "Main Issues" },
    { id: "triage", title: "Triage", icon: AlertTriangle, description: "Urgency Assessment" },
    { id: "cultural", title: "Cultural", icon: Globe, description: "Cultural Factors" },
    { id: "consent", title: "Consent", icon: Shield, description: "Privacy & Consent" },
    { id: "summary", title: "Summary", icon: FileText, description: "Review & Next Steps" },
  ]

  const getCurrentStepIndex = () => steps.findIndex((step) => step.id === currentStep)

  const culturalPrompts = {
    isizulu: [
      "Ngicela ungitshele ngendlela yokuziphatha kwakho emphakathini. (Please tell me about your cultural practices.)",
      "Ingabe kukhona amasiko noma izinkolo eziphazamisa ukwelapha kwakho? (Are there any traditions or beliefs that affect your treatment?)",
      "Umndeni wakho uyakweseka yini ekufuneni usizo? (Does your family support you in seeking help?)",
    ],
    isixhosa: [
      "Nceda undixelele ngezithethe zakho. (Please tell me about your traditions.)",
      "Ingaba kukho izithethe okanye iinkolelo ezichaphazela unyango lwakho? (Are there traditions or beliefs affecting your treatment?)",
      "Usapho lwakho luyakuxhasa na ekufuneni uncedo? (Does your family support you in seeking help?)",
    ],
    afrikaans: [
      "Vertel my asseblief van jou kulturele agtergrond. (Please tell me about your cultural background.)",
      "Is daar kulturele praktyke wat jou behandeling kan beïnvloed? (Are there cultural practices that might affect your treatment?)",
      "Ondersteun jou familie jou om hulp te soek? (Does your family support you in seeking help?)",
    ],
    english: [
      "Please tell me about any cultural or spiritual practices that are important to you.",
      "Are there any cultural factors that might influence your treatment preferences?",
      "How does your family or community view mental health support?",
    ],
  }

  const welcomeMessages = [
    {
      sender: "ai",
      text: `Hello! I'm your AI intake assistant for ${practitionerTypes.find((p) => p.id === practitionerType)?.name || "mental wellness"} services. I'm here to help gather some important information before your first session. This process typically takes 10-15 minutes and will help us provide you with the best possible care.`,
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      sender: "ai",
      text: `I can communicate with you in any of South Africa's 12 official languages, including Sign Language. Everything you share with me is completely confidential and secure. Would you like to continue in ${languages[selectedLanguage].name}?`,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]

  useEffect(() => {
    if (currentStep === "welcome") {
      setChatHistory(welcomeMessages)
    }
  }, [currentStep, selectedLanguage, practitionerType])

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

    // Simulate mood and urgency analysis
    if (currentStep === "presenting-concerns") {
      const urgencyKeywords = ["urgent", "crisis", "emergency", "suicide", "harm", "danger"]
      const moodKeywords = ["depressed", "anxious", "hopeless", "overwhelmed", "panic"]

      const hasUrgency = urgencyKeywords.some((keyword) => message.toLowerCase().includes(keyword))
      const hasMoodConcerns = moodKeywords.some((keyword) => message.toLowerCase().includes(keyword))

      setUrgencyLevel(hasUrgency ? "high" : hasMoodConcerns ? "medium" : "low")
      setMoodScore(hasUrgency ? 2 : hasMoodConcerns ? 4 : 6)
    }

    let aiResponse = ""
    switch (currentStep) {
      case "welcome":
        aiResponse = `Perfect! Let's start with some basic information. Could you please tell me your full name, age, and how you'd prefer us to contact you?`
        break
      case "demographics":
        aiResponse = `Thank you for sharing that information. Now I'd like to understand what brought you to seek ${practitionerTypes.find((p) => p.id === practitionerType)?.name.toLowerCase()} support today. Can you tell me about your main concerns or what you'd like to work on?`
        break
      case "presenting-concerns":
        if (urgencyLevel === "high") {
          aiResponse =
            "I notice you've mentioned some urgent concerns. Your safety is our top priority. I'm going to connect you with immediate support resources while we continue this process. Can you tell me if you're in a safe place right now?"
        } else {
          aiResponse =
            "Thank you for sharing that with me. It takes courage to reach out for help. Let me ask a few quick questions to help us understand the urgency of your situation and match you with the right level of care."
        }
        break
      case "triage":
        aiResponse = `Based on what you've shared, I'd like to understand more about your cultural background and any practices that are important to you. This helps us provide culturally sensitive care.`
        break
      case "cultural":
        aiResponse =
          "Thank you for sharing that cultural information. Now I need to go over some important consent and privacy information with you before we proceed."
        break
      case "consent":
        aiResponse =
          "Excellent! We're almost done. Let me summarize what we've discussed and outline the next steps for your care."
        break
      default:
        aiResponse = "Thank you for that information. Let's continue with the next section."
    }

    simulateAIResponse(aiResponse)
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

  const getUrgencyColor = (level) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderProgressBar = () => (
    <Progress value={((getCurrentStepIndex() + 1) / steps.length) * 100} className="mb-6" />
  )

  const renderStepIndicator = () => (
    <div className="flex justify-between items-center mb-8 px-4 overflow-x-auto">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep
        const isCompleted = index < getCurrentStepIndex()
        const Icon = step.icon

        return (
          <div key={step.id} className="flex flex-col items-center min-w-[80px]">
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
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">Smart Intake Assistant</CardTitle>
              <CardDescription>Culturally aware, multilingual support</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(languages).map(([key, lang]) => (
                  <SelectItem key={key} value={key}>
                    {lang.flag} {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4 overflow-y-auto space-y-4 h-64">
        {chatHistory.map((message, index) => (
          <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "bg-gray-100 text-gray-800"
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
            placeholder={`Type your response in ${languages[selectedLanguage].name}...`}
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

  const renderTriageInterface = () => (
    <Card>
      <CardHeader>
        <CardTitle>Smart Triage Assessment</CardTitle>
        <CardDescription>AI-powered urgency and mood assessment</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            className={`border-2 ${urgencyLevel === "high" ? "border-red-500" : urgencyLevel === "medium" ? "border-yellow-500" : "border-green-500"}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle
                  className={`h-5 w-5 ${urgencyLevel === "high" ? "text-red-500" : urgencyLevel === "medium" ? "text-yellow-500" : "text-green-500"}`}
                />
                <h4 className="font-medium">Urgency Level</h4>
              </div>
              <Badge className={getUrgencyColor(urgencyLevel)}>{urgencyLevel.toUpperCase()}</Badge>
              <p className="text-sm text-gray-600 mt-2">
                {urgencyLevel === "high"
                  ? "Immediate attention required - crisis intervention protocols activated"
                  : urgencyLevel === "medium"
                    ? "Elevated concerns - priority scheduling recommended"
                    : "Standard intake process - routine scheduling appropriate"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="h-5 w-5 text-pink-500" />
                <h4 className="font-medium">Mood Assessment</h4>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-pink-600">{moodScore}/10</span>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${moodScore * 10}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Based on language analysis and reported symptoms</p>
            </CardContent>
          </Card>
        </div>

        {urgencyLevel === "high" && (
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-red-600" />
                <h4 className="font-medium text-red-800">Crisis Intervention Activated</h4>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-red-700">• Crisis counselor has been notified</p>
                <p className="text-sm text-red-700">• Emergency contacts will be reached if consented</p>
                <p className="text-sm text-red-700">• Safety planning resources are being prepared</p>
              </div>
              <div className="mt-4 flex space-x-2">
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Crisis Line
                </Button>
                <Button size="sm" variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat with Counselor
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )

  const renderCulturalInterface = () => (
    <Card>
      <CardHeader>
        <CardTitle>Cultural Considerations</CardTitle>
        <CardDescription>Understanding your cultural context for personalized care</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h4 className="font-medium text-blue-800 mb-2">Cultural Prompts ({languages[selectedLanguage].name}):</h4>
            <div className="space-y-2">
              {(culturalPrompts[selectedLanguage] || culturalPrompts.english).map((prompt, index) => (
                <div key={index} className="text-sm text-blue-700 bg-white rounded p-2">
                  {prompt}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Traditional Healing Practices</label>
            <Textarea
              rows={3}
              placeholder="Please share any traditional healing practices that are important to you..."
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Family & Community Support</label>
            <Textarea
              rows={3}
              placeholder="Tell us about your family and community support systems..."
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cultural Preferences for Treatment</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              "Same-gender practitioner",
              "Cultural liaison present",
              "Family involvement",
              "Traditional practices integration",
              "Religious considerations",
              "Language interpreter",
              "Community elder consultation",
              "Flexible scheduling for cultural events",
            ].map((preference) => (
              <label key={preference} className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">{preference}</span>
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderSummary = () => (
    <Card>
      <CardHeader>
        <CardTitle>Intake Summary</CardTitle>
        <CardDescription>Review and next steps for your mental wellness journey</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Practitioner Match</h4>
              <div className="flex items-center space-x-2">
                {(() => {
                  const type = practitionerTypes.find((p) => p.id === practitionerType)
                  const Icon = type?.icon || Brain
                  return (
                    <>
                      <div className={`w-8 h-8 ${type?.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium">{type?.name}</span>
                    </>
                  )
                })()}
              </div>
              <p className="text-sm text-gray-600 mt-2">Matched based on your concerns and preferences</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Language & Culture</h4>
              <div className="flex items-center space-x-2">
                <span className="text-lg">{languages[selectedLanguage].flag}</span>
                <span className="font-medium">{languages[selectedLanguage].name}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">Culturally adapted care in your preferred language</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Priority Level</h4>
              <Badge className={getUrgencyColor(urgencyLevel)}>{urgencyLevel.toUpperCase()} PRIORITY</Badge>
              <p className="text-sm text-gray-600 mt-2">
                {urgencyLevel === "high"
                  ? "Immediate scheduling within 24 hours"
                  : urgencyLevel === "medium"
                    ? "Priority scheduling within 3-5 days"
                    : "Standard scheduling within 1-2 weeks"}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <h4 className="font-medium text-green-800 mb-2">Next Steps</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700">Intake completed and securely stored</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700">Practitioner match confirmed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700">Appointment scheduling in progress</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700">Confirmation will be sent via your preferred method</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-3">
          <Button className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Download Summary
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            <Users className="w-4 h-4 mr-2" />
            Schedule Appointment
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            <MessageCircle className="w-4 w-4 mr-2" />
            Contact Support
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "welcome":
      case "demographics":
      case "presenting-concerns":
      case "consent":
        return renderChatInterface()
      case "triage":
        return renderTriageInterface()
      case "cultural":
        return renderCulturalInterface()
      case "summary":
        return renderSummary()
      default:
        return renderChatInterface()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Smart Intake Agent</h1>
              <p className="text-gray-600">AI-powered multilingual intake for mental wellness practitioners</p>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={practitionerType} onValueChange={setPractitionerType}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {practitionerTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <SelectItem key={type.id} value={type.id}>
                        <div className="flex items-center space-x-2">
                          <Icon className="h-4 w-4" />
                          <span>{type.name}</span>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
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

export default SmartIntakeAgent
