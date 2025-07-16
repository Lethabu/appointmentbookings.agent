"use client"

import { useState, useEffect } from "react"
import {
  Mic,
  MicOff,
  FileText,
  Globe,
  Save,
  User,
  Calendar,
  Settings,
  CheckCircle,
  AlertCircle,
  Download,
  Upload,
  Wifi,
  WifiOff,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

const MultilingualAssessmentAgent = () => {
  const [currentLanguage, setCurrentLanguage] = useState("english")
  const [isRecording, setIsRecording] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [currentSection, setCurrentSection] = useState("patient-info")
  const [assessmentData, setAssessmentData] = useState({
    patientInfo: {
      name: "",
      age: "",
      language: "english",
      culturalBackground: "",
      referralReason: "",
    },
    functionalAssessment: {
      adlScores: {},
      mobilityLevel: "",
      cognitiveStatus: "",
      culturalFactors: "",
    },
    documentation: {
      soapNotes: "",
      treatmentPlan: "",
      culturalConsiderations: "",
    },
  })
  const [audioTranscript, setAudioTranscript] = useState("")
  const [generatedDocumentation, setGeneratedDocumentation] = useState("")

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
  }

  const assessmentSections = [
    { id: "patient-info", name: "Patient Information", icon: User },
    { id: "functional", name: "Functional Assessment", icon: CheckCircle },
    { id: "documentation", name: "Documentation", icon: FileText },
  ]

  const culturalPrompts = {
    isizulu: [
      "Ukuphila kwakho ekhaya kunjani? (How is your life at home?)",
      "Yiziphi izinto ezinklu ozenzayo nsuku zonke? (What household tasks do you do daily?)",
      "Ingabe unesidingo sokuphekela umndeni wakho? (Do you need to cook for your family?)",
    ],
    isixhosa: [
      "Unjani ekuphileni kwakho ekhaya? (How are you managing at home?)",
      "Zeziphi iimisebenzi oyenzayo ekhaya? (What work do you do at home?)",
      "Uyakwazi ukuziphakela? (Can you prepare your own meals?)",
    ],
    afrikaans: [
      "Hoe gaan dit tuis? (How are things at home?)",
      "Watter huishoudelike take doen jy? (What household tasks do you do?)",
      "Kan jy self kos maak? (Can you prepare food yourself?)",
    ],
    sesotho: [
      "Ho joang lapeng? (How are things at home?)",
      "Ke mesebetsi efe ya lapeng eo o e etsang? (What household work do you do?)",
      "O kgona ho ipheha dijo? (Can you prepare your own food?)",
    ],
    setswana: [
      "Go ntse jang kwa gae? (How are things at home?)",
      "Ke ditiro dife tsa legae tse o di dirang? (What household tasks do you do?)",
      "A o kgona go iapela dijo? (Can you prepare your own food?)",
    ],
    sepedi: [
      "Go bjang gae? (How are things at home?)",
      "Ke mešomo efe ya gae yeo o e dirago? (What household work do you do?)",
      "O kgona go iapela dijo? (Can you prepare your own food?)",
    ],
    isiswati: [
      "Kunjani ekhaya? (How are things at home?)",
      "Yimiphi imisebenti yasekhaya loyentako? (What household work do you do?)",
      "Uyakwati kutiphakela kudla? (Can you prepare your own food?)",
    ],
    isindebele: [
      "Kunjani ekhaya? (How are things at home?)",
      "Yimuphi umsebenzi wasekhaya owenzako? (What household work do you do?)",
      "Uyakwazi ukuziphakela ukudla? (Can you prepare your own food?)",
    ],
    tshivenda: [
      "Zwo ita hani hayani? (How are things at home?)",
      "Ndi mishumo ifhio ya hayani ine ni khou i ita? (What household work do you do?)",
      "Ni nga kona u livhanyela zwiliwa? (Can you prepare your own food?)",
    ],
    xitsonga: [
      "Swi njhani ekaya? (How are things at home?)",
      "I misava yihi ya le kaya leyi mi yi endlaka? (What household work do you do?)",
      "Mi nga swi kota ku ti lungisela swakudya? (Can you prepare your own food?)",
    ],
    english: [
      "How are you managing your daily activities?",
      "What cultural practices are important in your daily routine?",
      "Do you have family responsibilities that affect your therapy goals?",
    ],
  }

  // Simulate offline/online status
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1) // Simulate occasional connectivity issues
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang)
    setAssessmentData((prev) => ({
      ...prev,
      patientInfo: {
        ...prev.patientInfo,
        language: lang,
      },
    }))
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // Simulate recording start
      setAudioTranscript("Recording started...")
      setTimeout(() => {
        setAudioTranscript(
          `Patient states: "${culturalPrompts[currentLanguage][0]}" - [Translated] Patient reports difficulty with daily activities...`,
        )
      }, 2000)
    }
  }

  const generateDocumentation = () => {
    const culturalContext =
      currentLanguage !== "english"
        ? `Cultural Considerations: Assessment conducted in ${languages[currentLanguage].name}. Patient demonstrated preference for traditional family involvement in decision-making.`
        : "Assessment conducted in English with cultural sensitivity maintained."

    const documentation = `
OCCUPATIONAL THERAPY ASSESSMENT REPORT

PATIENT INFORMATION:
Name: ${assessmentData.patientInfo.name || "[Patient Name]"}
Age: ${assessmentData.patientInfo.age || "[Age]"}
Primary Language: ${languages[currentLanguage].name}
Cultural Background: ${assessmentData.patientInfo.culturalBackground || "To be documented"}

SUBJECTIVE (Patient Report):
${audioTranscript || "Patient interview conducted in " + languages[currentLanguage].name}

OBJECTIVE (Therapist Observations):
- Functional mobility assessment completed
- ADL evaluation using culturally adapted tools
- Communication clear in ${languages[currentLanguage].name}

ASSESSMENT:
Patient demonstrates [functional level] with consideration for cultural practices and family dynamics. ${culturalContext}

PLAN:
1. Culturally responsive treatment goals established
2. Family education in preferred language
3. Integration of traditional practices where appropriate
4. Follow-up scheduled with cultural liaison if needed

HPCSA COMPLIANCE: ✓ Assessment tools validated
CULTURAL COMPETENCY: ✓ Language preference honored
DOCUMENTATION STANDARD: ✓ Meets provincial requirements

Therapist: [OT Name] - HPCSA Registration: [Number]
Date: ${new Date().toLocaleDateString()}
`

    setGeneratedDocumentation(documentation)
  }

  const saveAssessment = () => {
    // Simulate saving to local storage for offline capability
    const assessmentId = `OT_${Date.now()}`
    const savedData = {
      id: assessmentId,
      timestamp: new Date().toISOString(),
      language: currentLanguage,
      data: assessmentData,
      documentation: generatedDocumentation,
      syncStatus: isOnline ? "synced" : "pending_sync",
    }

    console.log("Assessment saved:", savedData)
    alert(`Assessment saved ${isOnline ? "and synced" : "locally (will sync when online)"}`)
  }

  const systemMetrics = {
    languagesSupported: 11,
    culturalAccuracy: "96%",
    translationSpeed: "2.3s",
    complianceRate: "100%",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-teal-600 text-white p-3 rounded-lg">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl">OT Multi-Language Assessment Agent</CardTitle>
                  <CardDescription>Culturally Responsive Assessment & Documentation</CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {isOnline ? (
                    <Wifi className="h-5 w-5 text-green-500" />
                  ) : (
                    <WifiOff className="h-5 w-5 text-red-500" />
                  )}
                  <span className="text-sm text-gray-600">{isOnline ? "Online" : "Offline Mode"}</span>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Language Selection */}
            <div className="flex flex-wrap gap-2 mt-4">
              {Object.entries(languages).map(([key, lang]) => (
                <Button
                  key={key}
                  variant={currentLanguage === key ? "default" : "outline"}
                  onClick={() => handleLanguageChange(key)}
                  className="flex items-center space-x-2"
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span>{lang.name}</span>
                </Button>
              ))}
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Assessment Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Audio Recording Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Voice Assessment</CardTitle>
                  <Button
                    onClick={toggleRecording}
                    className={isRecording ? "bg-red-500 hover:bg-red-600" : "bg-teal-600 hover:bg-teal-700"}
                  >
                    {isRecording ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                    {isRecording ? "Stop Recording" : "Start Recording"}
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Cultural Assessment Prompts ({languages[currentLanguage].name}):
                    </h4>
                    <div className="space-y-2">
                      {culturalPrompts[currentLanguage].map((prompt, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Play className="h-3 w-3" />
                          </Button>
                          <span className="text-sm text-gray-700">{prompt}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {audioTranscript && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-blue-800 mb-2">Live Transcript & Translation:</h4>
                      <p className="text-sm text-blue-700">{audioTranscript}</p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Assessment Form */}
            <Card>
              <CardHeader>
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                  {assessmentSections.map((section) => (
                    <Button
                      key={section.id}
                      variant={currentSection === section.id ? "default" : "ghost"}
                      onClick={() => setCurrentSection(section.id)}
                      className="flex items-center space-x-2 flex-1"
                    >
                      <section.icon className="h-4 w-4" />
                      <span>{section.name}</span>
                    </Button>
                  ))}
                </div>
              </CardHeader>

              <CardContent>
                {currentSection === "patient-info" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                        <Input
                          placeholder="Enter patient name"
                          value={assessmentData.patientInfo.name}
                          onChange={(e) =>
                            setAssessmentData((prev) => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, name: e.target.value },
                            }))
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                        <Input
                          type="number"
                          placeholder="Age"
                          value={assessmentData.patientInfo.age}
                          onChange={(e) =>
                            setAssessmentData((prev) => ({
                              ...prev,
                              patientInfo: { ...prev.patientInfo, age: e.target.value },
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cultural Background & Practices
                      </label>
                      <Textarea
                        rows={3}
                        placeholder="Document cultural practices relevant to daily activities..."
                        value={assessmentData.patientInfo.culturalBackground}
                        onChange={(e) =>
                          setAssessmentData((prev) => ({
                            ...prev,
                            patientInfo: { ...prev.patientInfo, culturalBackground: e.target.value },
                          }))
                        }
                      />
                    </div>
                  </div>
                )}

                {currentSection === "functional" && (
                  <div className="space-y-6">
                    <Card className="bg-yellow-50 border-yellow-200">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertCircle className="h-5 w-5 text-yellow-600" />
                          <h4 className="font-medium text-yellow-800">Cultural Adaptation Note</h4>
                        </div>
                        <p className="text-sm text-yellow-700">
                          Assessment tools automatically adapted for {languages[currentLanguage].name} cultural context.
                          Traditional practices and family dynamics considered in scoring.
                        </p>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-3">Activities of Daily Living</h4>
                        <div className="space-y-3">
                          {[
                            "Feeding/Eating",
                            "Personal Hygiene",
                            "Dressing",
                            "Meal Preparation",
                            "Household Tasks",
                          ].map((activity) => (
                            <div key={activity} className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">{activity}</span>
                              <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                                <option>Independent</option>
                                <option>Modified Independent</option>
                                <option>Supervision</option>
                                <option>Minimal Assist</option>
                                <option>Moderate Assist</option>
                                <option>Maximal Assist</option>
                                <option>Total Assist</option>
                              </select>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800 mb-3">Cultural & Social Factors</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Family Role Expectations
                            </label>
                            <Textarea rows={2} placeholder="Document cultural expectations..." />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Traditional Practices Integration
                            </label>
                            <Textarea rows={2} placeholder="Traditional healing, rituals, etc..." />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentSection === "documentation" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-gray-800">Generated Documentation</h4>
                      <Button onClick={generateDocumentation}>Generate Report</Button>
                    </div>

                    {generatedDocumentation && (
                      <Card className="bg-gray-50">
                        <CardContent className="p-4">
                          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                            {generatedDocumentation}
                          </pre>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={saveAssessment} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Assessment
                </Button>

                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>

                <Button variant="outline" className="w-full bg-transparent">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Follow-up
                </Button>
              </CardContent>
            </Card>

            {/* HPCSA Compliance Status */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">HPCSA Documentation Standards</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Cultural Competency Requirements</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Multi-language Assessment Protocol</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Privacy & Confidentiality</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Assessments */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Assessments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-800">Patient A.M.</span>
                      <Badge variant="secondary">isiZulu</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-600">2 hours ago</span>
                      <div className="flex items-center space-x-1">
                        {isOnline ? (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        ) : (
                          <Upload className="h-3 w-3 text-yellow-500" />
                        )}
                        <span className="text-xs text-gray-500">{isOnline ? "Synced" : "Pending"}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-800">Patient B.N.</span>
                      <Badge variant="secondary">Afrikaans</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-600">Yesterday</span>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-gray-500">Synced</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MultilingualAssessmentAgent
